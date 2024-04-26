## 访问源站须知

CDN Pro 设计目标是能同时分发静态可缓存的文件以及动态私有的内容。
不同类型的内容对于源站的访问有着不同的需求。
本文将对与此相关的功能特性做一个介绍，包括如何配置以获得最佳加速效果。

### 为静态内容设计的多级缓存

行业发展早期，CDN 带来的加速效果完全得益于将静态内容缓存在离终端用户较近的服务器内。
CDN 缓存除了实现加速效果，还大大降低了源站服务器的负载。所以，对于静态内容，我们希望尽可能地利用缓存提供服务，避免访问源站。
为此，CDN Pro 实现了一个“边缘-父”的层级式缓存结构。当一份静态内容在边缘节点不存在时，边缘服务器会先
尝试访问父节点的缓存。如果命中，则边缘服务器会从父节点拉取下来缓存在本地，并响应给客户端。只有当该内容在父节点也不存在时，CDN Pro 
才会访问源站。

我们把全球的节点按照地理位置和运营商划分成了若干个“缓存大区”，每个大区内都有一组独立的父节点。
当一个请求在边缘未命中缓存时，边缘服务器会根据缓存key通过一致性哈希算法来选取一个本大区内的父节点。这样的机制可以确保同样的内容在每个大区只会
产生一次回源请求。
要启用父级缓存、减少回源，您需要将源站配置中的“直接连接”配置项设置为“不直连”。下图展示了如何在控制台上做该项配置：
<p align=center><img src="/docs/edge-logic/origin-no-direct.png" alt="始终使用父节点" width="400"></p>

如果要进一步控制回源流量，您可以启用“源站Shield”。使用这个功能，相当于创建了一个源站的镜像，确保每个文件只会被访问一次。
Shield的另一个用处是极大地减少了访问源站的IP数量。如果源站只允许加白极少数的回源IP，可使用Shield来减少回源IP，方便源站做访问控制。
通常情况下，您可以选择一个靠近源站的 Shield 节点，来获得更好的性能：

<p align=center><img src="/docs/edge-logic/origin-shield-selection.png" alt="选择一个源站的Shield" width="300"></p>
Shield 是个高级功能柜。如果您需要使用此功能，请联系我们的支持团队。

### 动态内容直接回源

对于不可缓存的动态内容，例如 API 调用或应用程序的交互性数据，我们需要尽快地向源站发送请求以及从源站获取响应。
对于动态内容，从边缘直连源站往往总体延迟更小。
尽管在某些情况下，通过父节点中转回源可能带来一些路由上的优势，但在中间层额外的处理时间通常会导致总体延时更大。
因此，如果您已知一个源站是用于服务动态内容，您应该将源站配置中的“直接连接”配置项设为“始终直连”，以获得最佳性能：

<p align=center><img src="/docs/edge-logic/origin-always-direct.png" alt="始终直接回源" width="400"></p>

注意：“直接连接”的设置未必会被严格遵循。在极端情况下，当没有父节点服务器可用时，即使设置值是“不直连”，边缘服务器也将尝试直接访问源站。同样的，当无法直接访问源站时，边缘服务器可能会向父节点服务器发起重试请求，即使设置值为“始终直连”。您可以在边缘逻辑里使用指令 [`upstream_origin_only`](/docs/edge-logic/supported-directives#upstream_origin_only) 来强制直连源站。

### 动静态混合的源站

如果您的源站同时提供静态和动态内容，最佳选择是将“直接连接”配置项设置为“自动”。
在自动选择的模式下，边缘服务器将根据请求是否可缓存来动态决定是否需要向父节点发起请求。
您需要在边缘逻辑中使用 [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) 指令来声明某个请求是否可缓存。
对于混合了动静态内容的加速项目，我们强烈建议您使用此指令，结合业务逻辑声明每个请求是否可缓存，以实现最佳性能。
一个简单的方法是按类型将内容放在不同的目录下：
```nginx
location /dynamic { # 动态内容目录
  proxy_cache_bypass 1; # 对于动态内容不缓存
  proxy_no_cache 1;
  origin_pass my_mixed_origin;
}

location / { # 其他可缓存内容的目录
  origin_pass my_mixed_origin;
}
```

### 快速回源路由

不管是动态还是静态内容，回源链路都面临一个共同的问题：如果CDN Pro服务器与源站之间的连接不稳定怎么办？
当发生网络拥塞和故障时，我们希望最大限度地减少对业务的影响。为此，我们引入了“快速回源路由”的功能。
当您在边缘逻辑中使用[`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>)指令开启“快速回源路由”功能时，CDN Pro 服务器与源站之间的数据传输将通过我们的高速数据传输（HDT）平台进行加速。
该平台使用了基于UDP的私有协议和智能路由技术，能确保在网络波动的情况下保持稳定的4层传输性能。

“快速回源路由”是个高级功能柜。如果您需要使用此功能，请联系我们的支持团队。由于HDT的成本较高，通过该通道传输的流量将与边缘流量分开计费。

### 其它性能相关的高级功能
#### $server_level 变量
这是一个在负载均衡器逻辑中可用的变量，表示当前处理请求的服务器的层级。值=1表示边缘服务器，值=2表示父节点服务器。 该变量的一个主要用途是：可以基于变量值做判断，在父节点服务器上跳过复杂的访问控制逻辑（ACL），以节省时间和成本。
```nginx
if ($server_level = 2) {
  break;  # 跳过下面的复杂访问控制逻辑
}
# 下面是一个复杂的访问控制逻辑:
eval_func $var RSA_VERIFY ...
...
if ($result = 0) {
  return 403 "您没有通过我们的访问控制认证!\n";
}
```
#### 能减少回源的指令
* 使用下面这几个指令，可以设置使用过期的缓存提供服务:
[`proxy_cache_use_stale`](</docs/edge-logic/supported-directives.md#proxy_cache_use_stale>)
[`proxy_cache_background_update`](</docs/edge-logic/supported-directives.md#proxy_cache_background_update>)
[`proxy_cache_max_stale`](</docs/edge-logic/supported-directives.md#proxy_cache_max_stale>)
* 使用下面的指令，可以合并回源请求:
[`proxy_cache_lock_timeout`](</docs/edge-logic/supported-directives.md#proxy_cache_lock_timeout>)

#### 源站相关配置
* "IP选择算法（peerSelectionAlgorithm）" 配置项可以设置回源选择算法。使用"轮询"可以平衡源站服务器的负载,
使用"性能优先"可以获得最好的连接性能, 而"一致性哈希"可以最大限度地利用源站的缓存。
* "IP失败挂起（peerFailureTimeout）" 配置项可以设置当源站的一些IP地址不可用的时候进行重试和挂起的策略。
<p align=center><img src="/docs/edge-logic/origin-peer-failure-timeout.png" alt="降低重试源站的不可用IP" width="300"></p>

"不可用"或者"unsuccessful attempt"的定义是由 [`proxy_next_upstream`](</docs/edge-logic/supported-directives#proxy_next_upstream>) 指令来确定的。这个指令本身也可以用来提高对源站的容错性能。

* "最大连接数（maxConnections）" 字段可以用来设置与源站的连接数上限，以避免源站过载。