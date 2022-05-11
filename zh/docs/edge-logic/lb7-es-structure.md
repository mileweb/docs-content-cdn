## 7层负载均衡与边缘服务器级联的架构

CDN Pro 的边缘网络包含遍布全球的数百个节点。每个节点中都有一个物理服务器集群。
为了最有效地利用这些服务器，我们的设计需要能满足以下两个条件：

1. 服务负载需要尽可能均匀地分布在所有服务器上。这
里的“负载”包括网络带宽、CPU 功率和磁盘的使用。
2. 对于可缓存的内容，避免在同一个节点中重复缓存。

我们在每个边缘节点中设计了以下逻辑架构：
<p align=center><img src="/docs/edge-logic/lb7-es-structure.png" alt="节点逻辑架构" width="600"></p>
路由器接纳的每个请求首先经过四层防火墙和负载均衡器到达
第 7 层负载均衡器 (LB7)。 LB7 完成 TLS 连接，并对 HTTP 请求进行一些初始处理
，然后将其分发到边缘服务器 (ES) 进行进一步处理。”分发“是
基于一致性哈希算法，哈希键包括请求 URI 和[可自定义的](/docs/portal/edge-configurations/creating-property#advanced-settings)
的变量以确保 ES 被均匀加载。 ES 负责请求处理的大部分工作，包括
我们放入边缘逻辑中的所有内容。它还负责发起对源站、父节点或
外部服务的请求以获取必要的数据。任何可缓存的内容也都存储在 ES 中。

基于这种结构，我们可以看到一些任务会更适合在 LB7 中执行。如果一个请求可以在
LB7 被响应，可以节省将其传递给 ES 所需的开销。为了实现这一目标，我们允许
用户通过加速项配置里的 “loadBalancerLogic” 字段将处理逻辑插入 LB7 中。
loadBalancerLogic 中允许的所有指令都在 [支持的指令集](supported-directives) 页面上带有
<span class="badge">LB logic</span> 标签。为了支持在 LB7 中有效地构建响应，大部分的访问控制指令
以及 rewrite 模块中的指令都可以在其中使用。

此外，由于客户端的 TCP 和 TLS 连接在 LB7 中完成，一些
客户端信息仅在 LB7 中可用。例如，如果您的处理逻辑依赖
[TLS 密码](built-in-variables#ssl_cipher) 或 [服务协议](built-in-variables#server_protocol)等信息，
那么它只能在 LB7 中实现。