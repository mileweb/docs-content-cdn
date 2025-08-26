## 边缘节点架构升级

### 目标

几年前，当我们启动CDN Pro项目时，我们设计了一个两级的[边缘节点架构](lb7-es-structure)。第一级是7层负载均衡器（LB7），它负责终止TLS连接，进行一些初步处理，并根据缓存策略分发请求到后端。第二级是边缘服务器（ES），它负责从源站获取内容并按需缓存内容。让我们来回顾下这个LB7-ES两级架构的工作原理：

* 用户通过[加速项目](/docs/portal/edge-configurations/creating-property)对象在CDN Pro上配置域名加速。该对象包含了loadBalancerLogic（负载均衡器逻辑）和edgeLogic（边缘逻辑）字段以及其他一些字段。LB7执行的逻辑配置在负载均衡器逻辑中，而ES执行的逻辑配在边缘逻辑中。
* 在验证加速项目之前，加速项目的内容将被转换为Nginx配置。负载均衡器逻辑和边缘逻辑中的脚本分别被各自转换为Nginx **server**块的配置。
* 当一个请求到达CDN Pro边缘节点时，LB7根据负载均衡器逻辑的配置进行一些预处理。然后，LB7将请求转发到ES，ES再根据边缘逻辑的配置进一步处理请求。

这个LB7-ES架构实现了预期的设计目标。然而，它也引入了一些“副作用”，尤其是：

* 尽管负载均衡器逻辑在加速项目中是选配的，负载均衡器逻辑和边缘逻辑并存意味着我们的用户仍然需要对这个LB7-ES架构有所了解。例如，您需要知道某个[指令](supported-directives)或[内置变量](built-in-variables)是否仅在LB7，仅在ES，或者两者中使用。对于一些请求的处理，您可能需要考虑如何将处理逻辑拆分为两部分。在边缘节点处理请求的过程中，有些信息仅在LB7中可用，如果ES也需要这些信息，则必须将该信息从LB7传递到ES（使用[proxy_set_header](supported-directives#proxy_set_header)指令）。同样，您可能需要将信息从ES传递给LB7（使用[add_header](supported-directives#add_header)/[add_trailer](supported-directives#add_trailer)指令）。虽然现有的方式能满足需求，但需要用户理解边缘节点的架构，增加了用户学习的难度。有些情况下，由于用户对架构不够了解提交了错误的配置，导致请求处理不符合预期。理想情况下，边缘节点的架构应该对用户完全透明，用户可以在同一个地方配置域名加速。

* 如[边缘节点架构](lb7-es-structure)所示，一个边缘节点由一组7层负载均衡器和一组边缘服务器组成。这只是逻辑上的划分。这些LB7和ES本质上是运行在相同物理服务器组上相同的Nginx进程组。这样的架构充分利用了Nginx同时作为负载均衡器、反向代理和存储服务器的能力。但对于CDN的使用场景来说，这并不是性能最优的设计。CDN Pro从一开始就使用Nginx的proxy_cache模块来提供存储能力。随着CDN Pro的不断发展，这个模块现在正面临性能挑战。我们需要优化系统以应对不断增长的流量规模。

### 新架构

下图展示了边缘节点的新架构：

<p align=center><img src="/docs/edge-logic/edge-node-structure.png" alt="边缘节点架构升级" width="600"></p>

如上图所示，ES之前不再有LB7阶段。在新架构下，ES接入请求并处理所有HTTP层的事务，包括回父节点或回源获取内容，以及任何对请求和响应的修改。缓存则由专门的存储服务来处理，其唯一目的是尽可能快地读写内容。

实际上，这是我们最初为CDN Pro设计的架构。然而，在2017年当时我们未能找到满足要求的分布式存储。所以，我们决定先实现LB7-ES架构，以免延误CDN Pro的上线计划。与此同时，我们在内部开发自研的存储系统。经过多年的开发和测试，我们已经做好准备开始改用理想中的节点架构。我们内部的压力测试表明，与使用Nginx的proxy_cache模块相比，新架构大大提升了请求处理的吞吐量，且显著降低了延迟。以50KB大小的文件为例，新架构下写操作的吞吐量最多可增加300%，读操作最多可增加50%，而延迟则最多可减少达80%！

### 架构升级进展

自2024年第二季度起，我们开始将CDN Pro生产环境升级到新架构。升级过程分为以下三个阶段：

**阶段 1**：开发一个配置转换器，将负载均衡器逻辑和边缘逻辑中的脚本合并到一个Nginx **server**块下。这种转换能确保无论加速项目是否使用了负载均衡器逻辑，都能被部署到新架构下的边缘节点，即便新架构并没有LB7这一级。配置合并对用户透明，且同一个客户端请求，无论请求在新架构还是旧架构下的服务器处理，其预期结果保持一致。

**阶段 2**：按照新架构另外部署一套边缘节点，并逐步将线上流量灰度迁移到这些节点。这些新部署的边缘节点，在资源覆盖上与现有架构完全匹配甚至更优。

**阶段 3**：下线LB7-ES旧架构。

截至2024年12月，升级已经完成，且阶段2实现了无缝迁移，客户无感知。下一步是废弃“负载均衡器逻辑”字段。

### 我们需要您的支持

上述升级过程对客户是完全透明的，但我们需要您的支持才能尽快将其完成以使我们的平台保持简洁和稳定。当“负载均衡器逻辑”字段被废弃后，您在创建新加速项目或为现有加速项目创建新版本时，如果配置中包含该字段，请求将被拒绝。

基于以上原因，请避免在新的加速项目中使用“负载均衡器逻辑”。更重要的是，如果您现有的加速项目有用到这个字段，请尽快将其中的脚本迁移合并到边缘逻辑中。在大多数情况下，您只需复制其中的内容并将其插入到边缘逻辑的脚本之前。不过，有一些细节处理值得注意。我们建议按以下的指引处理配置合并。

**指令**

以下是负载均衡器逻辑中支持的指令列表。请参考以下建议，将负载均衡器逻辑合并到边缘逻辑中。

| 指令 | 配置合并 |
|----------|----------|
| if/elseif/else | 复制配置并插入到边缘逻辑现有脚本之前 |
| set | 复制配置并插入到边缘逻辑现有脚本之前 |
| return | 复制配置并插入到边缘逻辑现有脚本之前 |
| rewrite | 复制配置并插入到边缘逻辑现有脚本之前 |
| eval_func | 复制配置并插入到边缘逻辑现有脚本之前 |
| access_log_sampling | 复制配置并插入到边缘逻辑现有脚本之前 |
| keepalive_timeout | 复制配置并插入到边缘逻辑现有脚本之前 |
| proxy_ignore_client_abort | 复制配置并插入到边缘逻辑现有脚本之前 |
| client_max_body_size | 将指令合并到边缘逻辑中。如果您在负载均衡器逻辑和边缘逻辑中分别配置了不同的值，在LB7-ES架构下实际生效的是较小的值。在合并后的配置中，您需要去除重复指令并在**server**和**location**块下使用较小的值。 |
| proxy_request_buffering | 将指令合并到边缘逻辑中。如果您在负载均衡器逻辑和边缘逻辑中都配置了该指令，在LB7-ES架构下以负载均衡器逻辑的配置为准。在合并后的配置中，您需要去除重复指令并在**server**和**location**中使用负载均衡器逻辑中的设置。 |
| custom_log_field | 将指令合并到边缘逻辑中。如果同一个自定义的日志字段在负载均衡器逻辑和边缘逻辑中均有配置，在LB7-ES架构下以负载均衡器逻辑的配置为准。在合并后的配置中，您需要去除重复的日志字段并在**server**、**location**和**if in location**（如果有的话）中使用负载均衡器逻辑的设置。 |
| proxy_set_header | 此指令用于从LB7向ES传递信息。由于新架构不再有LB7，该指令需要删掉。您可能还需要修改边缘逻辑，改成直接从ES获取所需信息。 |
| allow | 复制配置并插入到边缘逻辑 **server**块下现有脚本之前。<br>如果您在**location**中也有配置allow或deny指令，则复制的配置还需要插入到那些**location**块下现有脚本之前。 |
| deny | 复制配置并插入到边缘逻辑 **server**块下现有脚本之前。<br>如果您在**location**中也有配置allow或deny指令，则复制的配置还需要插入到那些**location**块下现有脚本之前。 |
| add_header | 复制配置并插入到边缘逻辑 **server**块下现有脚本之后。<br>如果某个相同的头部也在边缘逻辑中**location**和**if in location**块配置，则复制的配置还应插入到那些**location**和**if in location**块现有脚本之后。如果在LB7和ES配置某个相同的头部是为了从ES向LB7传递信息，则应删掉相应配置，改成直接从ES中访问所需信息。 |

if/elseif/else、set、return、rewrite和eval_func，这些指令属于[rewrite](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)模块。它们在请求处理的早期阶段以强制式的方式执行。在LB7-ES架构下，这些在LB7中配置的指令总是首先执行，然后才会执行边缘逻辑中的指令。将LB7这些指令插入到边缘逻辑 **server**块现有脚本之前，可以确保这些指令在合并后的配置中仍然被首先执行。

access_log_sampling、keepalive_timeout和proxy_ignore_client_abort，这些指令在LB7-ES架构下仅在负载均衡器逻辑中可用，因此没有任何现有加速项目会在边缘逻辑和负载均衡器逻辑中同时配置这些指令。只需简单地将这些指令从负载均衡器逻辑迁移到边缘逻辑 **server**块下即可。

client_max_body_size、proxy_request_buffering和custom_log_field，这些指令在负载均衡器逻辑和边缘逻辑中都可用。将负载均衡器逻辑合并到边缘逻辑时，应去除重复的指令并调整设置，确保合并配置后不会引起缓存服务器行为的变化。

allow和deny这2个指令在负载均衡器逻辑和边缘逻辑中都可用。负载均衡器逻辑本质上是提供了一个**server**块。因此，在负载均衡器逻辑中，两个指令在**server**级别生效。在边缘逻辑中，这两个指令则可以在**server**和**location**块使用。Nginx在处理访问控制的逻辑时，按以下方式判断某个请求所适用的allow/deny规则：
* 如果**location**块中没有配置allow或deny规则，则默认以**server**块的规则为准。
* 如果**location**块配置了allow或deny规则，则匹配该location的请求将以此处配置的规则为准，忽略**server**块的规则。

在LB7-ES架构下，一个请求总是首先由LB7处理，并且负载均衡器逻辑中定义的allow/deny规则总是适用于所有请求，无论请求匹配哪个location。由于新架构不再有LB7这一层，如果仅仅将负载均衡器逻辑中定义的allow/deny规则插入到边缘逻辑，并不能确保这些规则对所有请求生效。对于在边缘逻辑中存在allow/deny规则的**location**，负载均衡器逻辑中定义的allow/deny规则还应被并插入到这些**location**，以确保合并后服务器行为一致。以下是一个示例：

```nginx
## 合并前的负载均衡器逻辑
deny 103.15.234.251;
deny 104.23.161.214; 
 
## 合并前的边缘逻辑
location / { 
    deny 18.16.236.115;  
    deny 193.2.13.203/32;
    allow all;
    origin_pass myorigin;
}
location /abc {
    origin_pass myorigin;
}
```
```nginx
## 把负载均衡器逻辑合并到边缘逻辑后的配置
# 从负载均衡器逻辑复制规则并插入到边缘逻辑server块之前
deny 103.15.234.251;
deny 104.23.161.214;  

location / {
# 从负载均衡器逻辑复制规则并插入到边缘逻辑location块之前。如果没有插入以下2条规则，则来自104.15.234.251和104.23.161.214的请求将被允许 
    deny 103.15.234.251;
    deny 104.23.161.214; 
 
    deny 18.16.236.115;  
    deny 193.2.13.203/32;
    allow all;
    origin_pass myorigin;
}
location /abc { # 无变化。继承server块的规则
    origin_pass myorigin;
}
```

add_header指令是在服务器构建响应的阶段执行。在LB7-ES架构下，服务器总是先执行边缘逻辑中的指令，再执行在LB7中的add_header。在合并后的配置中，从负载均衡器逻辑复制的add_header指令应追加到边缘逻辑的**server**块中，确保执行顺序保持不变。如果某个头部在边缘逻辑的**location**和**if in location**块中也有配置，则从负载均衡器逻辑复制的add_header指令还应追加到那些**location**和**if in location**块。这是因为相同头部的配置，以**location**和**if in location**块为准。以下是一个示例：

```nginx
## 合并前的负载均衡器逻辑
add_header X-Custom-Header “value-from-lb” policy=overwrite always;
 
## 合并前的边缘逻辑
location / { 
    origin_pass myorigin;
    add_header X-Custom-Header “value-from-es” policy=overwrite always;
}
location /abc {
    origin_pass myorigin;
}
```
```nginx
## 把负载均衡器逻辑合并到边缘逻辑后的配置
location / {
    origin_pass myorigin;
    add_header X-Custom-Header “value-from-es” policy=overwrite always;
    add_header X-Custom-Header “value-from-lb” policy=overwrite always; # 从负载均衡器逻辑复制配置追加到边缘逻辑location块。如果没有此处的配置，客户端将看到 X-Custom-Header头部的值为“value-from-es”，但预期的值为“value-from-lb”。
}
location /abc { # 无变化。继承server块的配置
    origin_pass myorigin;
}

# 从负载均衡器逻辑复制的配置追加到边缘逻辑server块
add_header X-Custom-Header “value-from-lb” policy=overwrite always;
```

**变量**

除了指令外，有些变量的使用也需要调整。

| 变量 | 配置处理 |
|----------|----------|
| $upstream\_http\_*name* | 在边缘逻辑中可以用add\_header指令通过头部从ES传递信息给LB7。所传递的信息可以在LB7中通过$upstream\_http\_*name*变量获取。<br>新架构不再有LB7，负载均衡器逻辑中的配置也需要被合并到边缘逻辑中。因此，任何与在ES和LB7之间传递信息相关的逻辑都应该调整，应改成直接从ES中获取信息，而不是依赖于add\_header和$upstream\_http\_*name*。 |
| $upstream\_trailer\_*name* | add\_trailer指令是从ES向LB7传递信息的另一种方式。所传递的信息可以在LB7中通过$upstream\_trailer\_*name*变量获取。<br>与$upstream\_http\_*name*类似，任何与传递信息相关的逻辑都应该调整，应改成直接从ES获取信息，而不是依赖于add\_trailer和$upstream\_trailer\_*name*。 |

如果您对以上变更有任何疑问，请随时联系我们的[技术支持](https://www.{{siteDomain}}/cn/support/)。加速愉快！
