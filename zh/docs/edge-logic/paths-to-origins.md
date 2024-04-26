## 访问源站须知

CDN Pro 设计目标是能同时分发静态可缓存的文件以及动态私有的内容。
不同类型的内容对于源站的访问有着不同的需求。
本文将对与此相关的功能特性做一个介绍，包括如何配置以获得最佳加速效果，

### 为静态内容设计的多级缓存

行业发展早期，CDN 带来的加速效果完全得益于将静态内容缓存在离终端用户较近的服务器内。
同时缓存可以大大降低源站服务器的负载。所以对于静态内容，我们希望尽可能地利用缓存提供服务，避免访问源站。
为此 CDN Pro 实现了一个“边缘-父”的层级式缓存结构。当一份静态内容在边缘节点不存在时，边缘服务器会先
尝试访问父节点的缓存。如果命中，则会拉取下来缓存在本地，并响应客户端。只有当该内容在父节点也不存在时
才会访问源站。我们把全球的节点依据地理位置和运营商划分成了若干个“缓存大区”，每个大区内都有一组独立的父节点。
边缘服务器会对请求缓存key做一致性哈希来选取一个本大区内的父节点。这样的机制可以确保同样的内容在每个大区只会
产生一次回源请求。
要启用源站的父级缓存，您需要将其“直接连接”设置配置为“不直连”。下图展示了如何在控制台上做该项配置：
<p align=center><img src="/docs/edge-logic/origin-no-direct.png" alt="始终使用父节点" width="400"></p>

如果一定要将源站的流量控制在可能的最低限度，您可以启用“源站Shield”。这个高级功能实际上创建了一个源站的镜像，确保每个文件只会被访问一次。
Shield的另一个用处的极大地减少了访问源站的IP数量，这一点在源站只允许非常短的IP白名单进行访问控制时非常有用。
一般来说，您希望选择一个靠近源站的 Shield 节点 以获得更好的性能：
<p align=center><img src="/docs/edge-logic/origin-shield-selection.png" alt="选择一个源站的Shield" width="300"></p>
如果您需要使用此功能，请联系我们的支持团队。

### 动态内容直接回源

对于不可缓存的动态内容，例如 API 调用或应用程序的交互性数据，我们需要尽快地向/从源站发送/获取。
从边缘到源站的直接连接几乎总是具有最小的延迟。
尽管在某些情况下，中间服务器可能带来一些路由优势，但额外的处理时间通常会导致延时更大。
因此，如果您事先知道一个源站是用于动态内容，应将其“直接连接”设置配置为“始终直连”以获得最佳性能：
<p align=center><img src="/docs/edge-logic/origin-always-direct.png" alt="始终直接回源" width="400"></p>

请注意，“直接连接”设置仅在最大努力下受到尊重。在极端情况下，当没有父服务器可用时，即使设置为“不直连”，边缘服务器也将尝试直接访问源站。同样的，当无法直接访问源站时，边缘服务器可能会重试父服务器，即使设置为“始终直连”。您可以在边缘逻辑里使用指令 [`upstream_origin_only`](/docs/edge-logic/supported-directives#upstream_origin_only) 来严格避免访问任何父服务器。

### 混合内容的源站

如果您有一个同时提供静态和动态内容的源站，最佳选择是将其“直接连接”配置为“自动”。
在此模式下，边缘服务器将根据请求的可缓存性动态决定是否需要尝试父节点。
为此您需要在边缘逻辑中指定规则，用来判断每个请求是否可缓存。这可以通过 [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) 指令来完成。
对于具有混合内容的加速项目，我们强烈建议您使用此指令，结合业务逻辑指定每个请求的可缓存性，以实现最佳性能。
一个简单的方法是将内容按类型组织在不同的目录下：
```nginx
location /dynamic { # 动态内容目录
  proxy_cache_bypass 1; # 对于动态内容关闭缓存
  proxy_no_cache 1;
  origin_pass my_mixed_origin;
}

location / { # 其他可缓存内容目录
  origin_pass my_mixed_origin;
}
```

### 快速回源路径

对于动态和静态内容仍然存在一个问题：如果CDN Pro服务器与源站之间的连接不稳定怎么办？
当发生互联网拥塞和故障时，我们希望最大限度地减少对业务的影响。这就是“快速回源路径”功能可以提供极大帮助的地方。
当您在边缘逻辑中使用[`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>)指令启用它时，与源站之间的数据将通过我们的高速数据传输（HDT）平台进行加速。
该服务采用基于UDP的专有协议和智能路由技术，确保在公共互联网波动的情况下保持稳定的第4层性能。

如果您需要尝试此服务，请联系我们的客户支持。由于HDT的成本较高，通过该通道传输的流量将与边缘分发流量分开计费。

### 性能相关的高级功能
#### $server_level 变量
这是一个在负载均衡器逻辑中可用的变量，表示当前处理是在边缘服务器（值=1）还是父节点服务器（值=2）。 该变量的一个主要用途是允许您在父节点服务器上跳过复杂的访问控制逻辑（ACL），以节省时间和成本。
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
#### 能降低回源的指令
* 下面这几个指令可以在内容过期不太久的情况下继续用它们提供服务:
[`proxy_cache_use_stale`](</docs/edge-logic/supported-directives.md#proxy_cache_use_stale>)
[`proxy_cache_background_update`](</docs/edge-logic/supported-directives.md#proxy_cache_background_update>)
[`proxy_cache_max_stale`](</docs/edge-logic/supported-directives.md#proxy_cache_max_stale>)
* 下面的指令可以暂缓发送回源请求，如果已经有一个相同的回源请求还没有返回的情况下:
[`proxy_cache_lock_timeout`](</docs/edge-logic/supported-directives.md#proxy_cache_lock_timeout>)

#### 源站相关配置
* "IP选择算法（peerSelectionAlgorithm）" 字段可以优化回源选择算法。使用"轮询"可以平衡源站服务器的负载,
使用"性能优先"可以获得最好的连接性能, 而"一致性哈希"可以最大限度地利用源站的缓存。
* "IP失败挂起（peerFailureTimeout）" 字段可以设置当源站的一些IP地址不可用的时候如何进行重试和挂起的策略。
<p align=center><img src="/docs/edge-logic/origin-peer-failure-timeout.png" alt="降低重试源站的不可用IP" width="300"></p>

"不可用"或者"unsuccessful attempt"的定义是由 [`proxy_next_upstream`](</docs/edge-logic/supported-directives#proxy_next_upstream>) 指令来确定的。这个指令本身也可以用来提高对源站的容错性能.

* "最大连接数（maxConnections）" 字段可以用来设置与源站的连接数上限，以避免源站过载。
