## 访问源站须知

CDN Pro 设计目标是能同时分发静态可缓存的文件以及动态私有的内容。
不同类型的内容对于源站的访问有着不同的需求。
本文将对与此相关的功能特性做一个介绍，包括如何配置以获得最佳加速效果，

### 为静态内容设计的多级缓存

行业发展早期，CDN 带来的加速效果完全得益于将静态内容缓存在离终端用户较近的服务器内。
同时缓存可以大大降低源站服务器的负载。所以对于静态内容，我们希望尽可能地利用缓存提供服务，避免访问源站。
CDN Pro has implemented an edge-parent structure in which a static object not
available on an edge server will be first looked up in the cache of a parent server.
If there is a hit, cache the object on the edge, and respond to the end user.
The origin will be accessed only when the parent is also missing the object.
Based on geography and ISP, our global PoPs are organized into a few "cache zones", with each zone having its own group of designated parent servers.
In case of a cache miss at the edge, a parent within the zone is chosen based on the consistent hash of the object's cache key.
As a result, each object will only be fetched once from the origin by each cache zone.
To enable the parent cache for an origin, you need to configure its "directConnect" setting to "No Direct".
Here is how to do this on the portal:
<p align=center><img src="/docs/edge-logic/origin-no-direct.png" alt="始终使用父节点" width="400"></p>
If it is very important to keep the origin traffic at the minimum possible level, you can enable the "origin shield". This advanced feature essentially
creates a mirror of the origin such that each object will only be accessed once.
A shield is also useful when the origin only allows a very short IP whitelist for access control.
In general, you want to pick a shield PoP that is close to your origin for performance:
<p align=center><img src="/docs/edge-logic/origin-shield-selection.png" alt="选择一个源站的Shield" width="300"></p>
If you require this feature, please contact our support team.

### 动态内容直接回源

For dynamic content that are not cacheable, such as API calls or interactive data of an app, we need to send/fetch as quickly as possible to/from the origin.
A direct connection from the edge to the origin almost always results in the smallest latency.
An intermediate server may provide some routing advantage in some cases, but the extra processing time usually kills it.
So if you know an origin is used for dynamic content, you should configure its "directConnect" setting to "Always Direct" for best performance:
<p align=center><img src="/docs/edge-logic/origin-always-direct.png" alt="始终直接回源" width="400"></p>

Please note that the setting of "directConnect" is respected with best effort only. In extreme cases when none of the parent servers is available, edge servers will try the origin directly, even if the setting is "No Direct". Likewise, when an origin is not accessible directly, edge servers might retry a parent server, even if the setting is "Always Direct". The directive [`upstream_origin_only`](/docs/edge-logic/supported-directives#upstream_origin_only) can be used in the edge logic to strictly avoid access to any parent server.

### 混合内容的源站

If you have an origin that serves both static and dynamic content, your best choice is to configure its "directConnect" to "Auto".
In this mode, the edge servers will dynamically decide if a parent needs to be tried based on the cacheability of the request.
You will need to specify the rules in the edge logic for the server to determine if a request is cacheable or not.
This is done through the [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) directive.
For a property with mixed content, we highly recommend that you use this directive to specify the cacheability of each request
based on the design of your business logic. This is very important to achieve the best possible performance.
One simple way is to organize the content under different directories:
```nginx
location /dynamic {
  proxy_cache_bypass 1; # disable caching for dynamic content
  proxy_no_cache 1;
  origin_pass my_mixed_origin;
}

location / { # caching is enabled by default for all other directories
  origin_pass my_mixed_origin;
}
```

### 快速回源路径

There is still one remaining issue for both dynamic and static content: What if the connectivity between the CDN Pro server and the origin is not stable?
When internet congestions and outages happen, we want to minimize their impact on our business. Here is where the "Fast Route to Origin"
feature can help greatly. When you enable it in the edge logic with the [`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>) directive, the data to and from the origin will be 
accelerated by our high-speed data transmission (HDT) platform. This service features our proprietary protocol based on UDP and smart routing technology to ensure stable layer-4 performance regardless of any fluctuation in the public internet.

Please contact our customer support if you need to try this service. Due to the higher cost of HDT, the traffic transmitted through this channel is charged seperately from the edge delivery traffic.

### 性能相关的高级功能
#### $server_level 变量
This variable is available in the load balancer logic and indicates if you are on an edge server (value=1) or a parent server (value=2).
The main use of this variable is to allow you to skip complicated access control logic on the parent servers to save time and cost:
```nginx
if ($server_level = 2) {
  break;  # skip the complicated ACL algorithm below
}
# the complicated ACL algorithm:
eval_func $var RSA_VERIFY ...
...
if ($result = 0) {
  return 403 "You failed the ACL!\n";
}
```
#### 能降低回源的指令
* You may want to read about these directives on serving recently expired content:
[`proxy_cache_use_stale`](</docs/edge-logic/supported-directives.md#proxy_cache_use_stale>)
[`proxy_cache_background_update`](</docs/edge-logic/supported-directives.md#proxy_cache_background_update>)
[`proxy_cache_max_stale`](</docs/edge-logic/supported-directives.md#proxy_cache_max_stale>)
* This directive holds off requests fetching the same object from origin if one is already on the way:
[`proxy_cache_lock_timeout`](</docs/edge-logic/supported-directives.md#proxy_cache_lock_timeout>)

#### 源站相关配置
* The "peerSelectionAlgorithm" field can be used to optimize the choice of origin servers. Use "round_robin" to balance among all the server instances,
"sorted_list" to get the best connectivity, and "consistent_hash" to maximize caching on the origin.
* The "peerFailureTimeout" field can be used to specify the detailed retry and backoff policy if an IP address of the origin is not accessible.
<p align=center><img src="/docs/edge-logic/origin-peer-failure-timeout.png" alt="limit retry of failed origin peer" width="300"></p>

The definition of "not accessible" or "unsuccessful attempt" is determined by the [`proxy_next_upstream`](</docs/edge-logic/supported-directives#proxy_next_upstream>) directive, which by itself can be used to improve the fault-tolerance of the origin.

* The "maxConnections" field sets the maximum number of simultaneous connections that can be made to the origin to avoid overloading.
