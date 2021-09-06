## 常见问题

### CDN如何判定一个文件能否缓存，缓存多久?

在边缘逻辑（Edge Logic）中，我们提供了多个配置项用于设置文件是否应被CDN缓存（如[proxy_no_cache](/docs/edge-logic/supported-directives#proxy_no_cache)/[proxy_ignore_cache_control](/docs/edge-logic/supported-directives#proxy_ignore_cache_control)/[proxy_ignore_headers](/docs/edge-logic/supported-directives#proxy_ignore_headers)等等）。如果所有相关配置项都没有在加速项中被使用到，那么CDN360节点的默认行为是“遵循源站”，即按照源站响应头中的`Cache-Control`和`Expires` 头来判断文件是否可以缓存以及缓存时长。需要注意的是，如果源站给的响应头中有`Set-Cookie`头，CDN360将不会对该文件进行缓存。

同时我们优化了开源 NGINX 从而让CDN360严格遵循有关“零时缓存”的 HTTP 标准：
如果源站的 Cache-Control 响应头中存在 no-cache 或 max-age=0 ，则文件仍会被CDN360缓存但CDN360会判断其立即过期，对该对象的后续请求将触发CDN360携带 If-Modified-Since 头部对源发起重新验证。
如果源站的 Cache-Control 响应头中为 no-store，则该文件不会被缓存。

在缓存时间上，CDN360同样遵循上述规则。默认情况下 CDN360 节点会缓存并提供源站的 `Date` 以及 `Age` 头部值给客户端，因此即便是采用了多层级Cache架构，CDN360也可以做到全平台缓存时间一致。

如果上述关于是否缓存、缓存时间的默认缓存规则并不是您期待的，那么您也可以使用本文开头的那些配置项来进行缓存规则改写。

* 配置项[`proxy_ignore_headers`](</docs/edge-logic/supported-directives.md#proxy_ignore_headers>)用于让 CDN360 强制忽略源站的 Cache-Control\Expire\Set-Cookie 三个头部。例如：
```nginx
proxy_ignore_headers Set-Cookie;
```
这种情况下，CDN360 将按照源未提供`Set-Cookie` 响应头来判断文件是否可以缓存以及缓存时间。
* 配置项[`proxy_cache_valid`](</docs/edge-logic/supported-directives.md#proxy_cache_valid>) 用于设置当源未提供或者CDN360忽略源的 Cache-Control\Expire\Set-Cookie 三个头部时 CDN360 的缓存时长，该配置项支持针对不同状态码的文件设置不同缓存时长。例如：
```nginx
location / { # 默认 location
    proxy_cache_valid 5m; # 针对200、301、302状态码请求缓存5分钟
    proxy_cache_valid 404 2m; # 针对404状态码请求缓存2分钟
}
location /no-cache {
    proxy_cache_valid 200 0; # 针对200状态码进行缓存，但是该立即过期
}
```
* 配置项[`proxy_ignore_cache_control`](</docs/edge-logic/supported-directives.md#proxy_ignore_cache_control>)的功能与[`proxy_ignore_headers`](</docs/edge-logic/supported-directives.md#proxy_ignore_headers>)十分相似，两者的区别在于[`proxy_ignore_cache_control`](</docs/edge-logic/supported-directives.md#proxy_ignore_cache_control>)仅可用于设置 CDN360 忽略源 Cache-Control 头中的指定参数值。例如：
```nginx
proxy_ignore_cache_control no-cache no-store; # 忽略源给的 Cache-Control 响应头中的 no-cache 和 no-store
```
* 配置项[`proxy_cache_min_age`](</docs/edge-logic/supported-directives.md#proxy_cache_min_age>) 用于改写源站给的 `Cache-Control` 响应头中的 `max-age` 参数值，从而让 CDN360 按改写后的`max-age` 值进行缓存
* 配置项 [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) 用于设置 CDN360 不响应缓存文件给客户端，而是每次都从源站获取文件。该配置项经常与[`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>)一起使用来达到“强制文件不缓存”的效果。
* [`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 用于设置 CDN360 从源站拿去到文件后不缓存到本地。该配置项经常与 [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) 一起使用来达到“强制文件不缓存”的效果。
鉴于您对 CDN360 的缓存行为感兴趣，您可能同时也对[如何设置自定义缓存Key](#how-to-include-query-parameters-andor-request-headers-in-the-cache-key) 和 [CDN360 对 `Vary` 头部的处理方式](#the-support-and-non-support-of-vary) 感兴趣

### 如何将问号后参数或者请求头加入到缓存Key中?

By default, the CDN360 cache key includes only the hostname and URI without the query string in the request. It also includes a special variable that is accessible in the Edge Logic: `$cache_misc`. Therefore, if you want to add anything to the cache key, add it to this variable. For example, to keep the entire query string in the cache key:
```nginx
set $cache_misc "?$sorted_querystring_args";
```
If you want to include only some of the query parameters, the following example shows how to add parameters "abc" and "def" to the cache key:
```nginx
set $cache_misc "?abc=$arg_abc&def=$arg_def";
```
Similarly, the following example shows how to include some request headers in cache key:
```nginx
set $cache_misc "ae=$http_accept_encoding";
set $cache_misc $cache_misc."hdr1=$http_header1&hdr2=$http_header2";
```
If you want to keep any previously assigned value, you can append to this variable:
```nginx
set $cache_misc "${cache_misc}hdr1=$http_header1&hdr2=$http_header2";
```

### HTTP Header Manipulation

If you need to add, modify, or delete some header fields in the request to the origin, use the [`origin_set_header`](</docs/edge-logic/supported-directives.md#origin_set_header>) directive. For example:
```nginx
origin_set_header CDN-Name Quantil;
```
In particular, this is the code to send the client's IP address to the origin server:
```nginx
origin_set_header Client-IP $client_real_ip;
```
In order to consolidate the responses from the origin to improve the cache hit ratio, we created a dedicated directive [`sanitize_accept_encoding`](</docs/edge-logic/supported-directives.md#sanitize_accept_encoding>) to modify the `accept-encoding` request header received from the client.

If you need to add, modify, or delete some header fields in the response to clients, use the [`add_header`](</docs/edge-logic/supported-directives.md#add_header>) directive. For example:
```nginx
add_header CDN-Name Quantil;
```
We also created a proprietary directive [`origin_header_modify`](</docs/edge-logic/supported-directives.md#origin_header_modify>) to manipulate the response header from the origin prior to processing the response. This can be very useful if you need to override a header value (such as cache time) from the origin that may affect the CDN servers' behavior.


### The support (and non-support) of `Vary`

By default, CDN360 servers remove any `Vary` header in the response from origin servers. Therefore, every URL will have no more than one cached version. If you want to cache different versions based on a request header or cookie values, put them explicitly into the cache key by setting the `$cache_misc` variable mentioned above. For example:
```nginx
set $cache_misc "ae=$http_accept_encoding";
```
If you want to send a `Vary` header to the clients to make sure they cache different variations properly, use the [`add_header`](</docs/edge-logic/supported-directives.md#add_header>) directive. If you have to pass the `Vary` header from the origin to the client, use the following configuration to "undo" the default removal of the header:
```nginx
# preserve the Vary header from origin
origin_header_modify Vary "" policy=preserve;
# ignore the Vary header, just pass it to the client
proxy_ignore_headers Vary; 
```
In this case, the servers cache the content as if the `Vary` header does not exist. Without `proxy_ignore_headers Vary`, the preserved `Vary` header would prevent the response from being cached because [`proxy_cache_vary off`](</docs/edge-logic/supported-directives.md#proxy_cache_vary>) is configured by default. If it is absolutely important for the CDN360 servers to cache multiple versions based on the `Vary` header, contact CDNetworks customer support to obtain permission to set `proxy_cache_vary on`.

### How to follow redirections from origin?

When the origin responds with a 30x redirect, you may want the CDN servers to chase it until the redirection stops. Passing the redirection to the client takes more time to get the final content. If you want to turn on this feature, use the directive [`origin_follow_redirect`](</docs/edge-logic/supported-directives.md#origin_follow_redirect>) in the location where it is needed.

### China Delivery and Beian

The Chinese Ministry of Industry and Information Technology (MIIT) requires every domain served from a server in Mainland China to have a record in its system. This is called [ICP Beian (备案)](https://beian.miit.gov.cn/). For certain domains, a [Security Beian](https://www.beian.gov.cn/) is also required. As a CDN provider, CDNetworks cannot use our servers in China to serve domains without ICP Beian. Any violation may result in our China-based servers being blocked. Customers are responsible for filing and obtaining Beian for any domain that needs local delivery in China. We can provide consulting services to assist with this process. For domains without Beian, CDNetworks can use servers located in close proximity to Mainland China (for example, Hong Kong, Korea, and Japan) to deliver content to clients in Mainland China; however, the performance will not be as good as local delivery.

If you have one or more domains with ICP Beian and want them to be accelerated in China, contact customer service to ensure we have all the required information on file about your business. After confirming that we have the necessary information, your China Delivery service will be enabled. You can then perform the following steps to enable local delivery of domains in Mainland China: 

1. Create an [Edge Hostname](</docs/portal/traffic-management/creating-edge-hostname.md>) with "hasBeian" set to true, and use this edge hostname for the domain to be accelerated. This ensures that GSLB will direct traffic of this domain to our servers in Mainland China. 

2. Set "hasBeian" to true in the [property](</docs/portal/edge-configurations/creating-property.md>) of this domain. This ensures the configuration will be deployed to servers in China and that those servers will handle client requests to this domain. Otherwise, they will return status code 451.

### How to support WebSocket?

Use the directive [`enable_websocket`](</docs/edge-logic/supported-directives.md#enable_websocket>) in the location where the WebSocket protocol is needed. Make sure the client uses HTTP/1.1 (not HTTP/2) to connect. This directive also sets the read and send timeouts to 21s by default. They can be changed using the [`origin_read_timeout`](</docs/edge-logic/supported-directives.md#origin_read_timeout>) or [`origin_send_timeout`](</docs/edge-logic/supported-directives.md#origin_send_timeout>) directives.

### What about dynamic content?

Dynamic contents are usually generated on-the-fly for each request and are different for different visitors. Some examples are:
* Realtime stock prices, sports game scores
* Search results based on keywords entered by the visitor
* API calls that have lots of query parameters

If you only have the origin server in a central data center or in the cloud, the performance can be quite poor if the visitor is far away from or does not have a good connection to the data center. How can we accelerate those contents through CDN360? Here are a few things you can do:
* **Simply using CDN360 can shave off a few seconds**

If you use CDN360, your clients will connect to the PoP that is closest to them. The round trip time (RTT) can be a few hundred milliseconds faster than directly connecting to the origin server. The TCP and TLS handshakes usually take 3-4 RTTs which can be a second faster through the CDN. By default, the CDN360 servers maintain persistent connections to the origin. You can increase the [keep-alive timeout](/docs/portal/edge-configurations/managing-origins) to up to 10 minutes in the origin configurations. In the meantime, if you know the content is not cacheable at all, use [`proxy_no_cache 1;`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) and [`proxy_cache_bypass 1;`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) to completely skip caching to minimize latency.
* **Cache the response!**

In many cases, "dynamic" does not mean the content is not cacheable. For example, end users will not experiance the difference if you cache the score of a basketball game for 1 second. If you have 10 requests per second to fetch the score, you can save 90% of the bandwidth and processing power. If the response depends on some query parameter or request header values, make sure those variables are [included in the cache key](#how-do-you-include-query-parameters-andor-request-headers-in-the-cache-key).
* **Enable Fast Route to origin**

CDN360 has a directive [`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>) that enables a "Fast Route" to access the origin. This powerful feature is based on our award-winning [High-speed Data Transmission](https://www.cdnetworks.com/enterprise-applications/high-speed-data-transmission/) (HDT) technology. It ensures that our servers always have the best possible channel to reach your origin, even under challenging situations. This directive can also be used for highly cacheable contents if the origin is hard to reach from certain networks or when the cache-miss performance is critical to you. However, the traffic served through the ""Fast Route" may be charged a higher price due to the extra cost associated with it. To try out this feature, contact the CDN360 support team.
