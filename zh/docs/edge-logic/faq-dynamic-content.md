## 动态文件的支持情况?

动态内容通常是针对每个请求即时生成，并且对于不同的客户端的响应是不同的。部分示例如下：
* 实时股价、体育比赛比分查询
* 根据客户端输入的关键字进行搜索请求
* 携带大量查询参数的 API 调用请求

如果您的源站服务器位于数据中心或云服务器上，那么远离源站或与源站的网络链路不佳的客户端得到的响应性能可能会非常差。此时该如何通过 CDN Pro 来加速这些动态内容呢？ 以下操作将极大提升此类动态响应性能：
* **使用 CDN Pro 来为您的业务争取数秒的宝贵时间**

当您使用 CDN Pro 时，您的客户端将会被全局调度系统（GSLB）引导与最近的边缘服务器建连。客户端与边缘服务器之间的往返时间 (RTT) 可能比客户端直连源服务器快几百毫秒。 TCP 和 TLS 握手通常需要 3-4 个 RTT，这样便可以通过 CDN 来提升1秒的响应性能。默认情况下，CDN Pro 与源站之间会保持长链接，您可以使用指令 [keep-alive timeout](/docs/portal/edge-configurations/managing-origins) 来设置长达10分钟的长链接时间。同时如果您已提前规划了某些业务不需要缓存，那么您可以使用指令 [`proxy_no_cache 1;`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 和 [`proxy_cache_bypass 1;`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 来跳过缓存处理步骤以最大程度减少 CDN Pro 上的延迟。
* **将动态文件转换成可缓存文件**

在许多情况下，“动态文件”并不意味着内容完全不可缓存。例如，如果您将篮球比赛的得分缓存 1 秒，客户端几乎体验不到任何差异。如果每秒有 10 个请求来获取分数，则可以节省 90% 的源站带宽和CDN执行损耗。需要注意的是，如果客户端收到的响应需要根据请求 URL 中的问号后参数或者请求头部值而不同的话，请确保[相关参数或者请求头已被添加到缓存 key 中](#如何将问号后参数或者请求头加入到缓存key中)。
* **回源时开启HDT链路加速配置**

CDN Pro 使用指令 [`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>) 来进行回源时与源站之间的加速。 这个强大的功能基于我们屡获殊荣的 [High-speed Data Transmission](https://www.cdnetworks.com/enterprise-applications/high-speed-data-transmission/) (HDT) 技术。它确保了 CDN Pro 的服务器使用最优的回源链路，即使在某些极端恶劣的网络链路情况下也能保证服务的稳定性。此指令亦可用于某些源站链路不佳，但是首次 MISS 请求性能又极其重要的可缓存业务上。通过 [`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>) 服务的流量会因其带来额外成本而收取更高的费用。要试用此功能，请联系网宿（CDNetworks）技术支持。
