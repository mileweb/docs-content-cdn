## Frequently Asked Questions

### How do you include query parameters and/or request headers in the cache key?

CDN360 defines the following special variable that is accessible in the Edge Logic: `$cache_misc`. This variable is part of the cache key. If you want to add anything to the cache key, add it to this variable. For example, to keep the entire query string in the cache key:
```nginx
set $cache_misc "?$sorted_querystring_args";
```
If you want to include only some of the query parameters, the following example shows how to add parameters "abc" and "def" to the cache key:
```nginx
set $cache_misc "?abc=$arg_abc&def=$arg_def";
```
Similarly, the following example shows how to include some request headers in cache key:
```nginx
set $cache_misc "hdr1=$http_header1&hdr2=$http_header2";
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
If you need to add, modify, or delete some header fields in the response to clients, use the [`add_header`](</docs/edge-logic/supported-directives.md#add_header>) directive. For example:
```nginx
add_header CDN-Name Quantil;
```
We created a proprietary directive [`origin_header_modify`](</docs/edge-logic/supported-directives.md#origin_header_modify>) to manipulate the response header from origin, before all the other processings happen to the response. This is very useful if you want to override some settings (such as cache time) from the origin that may affect how CDN servers process the response.
In order to consolidate the responses from the origin to improve the cache hit ratio, we also created a dedicated directive [`sanitize_accept_encoding`](</docs/edge-logic/supported-directives.md#sanitize_accept_encoding>) to modify the `accept-encoding` request header received from the client.

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

### How to support websocket?

Use the directive [`enable_websocket`](</docs/edge-logic/supported-directives.md#enable_websocket>) in the location where websocket is needed. Make sure the client uses HTTP/1.1 (not HTTP/2) to connect. This directive also sets the read and send timeouts to 21s by default. They can be changed using the [`origin_read_timeout`](</docs/edge-logic/supported-directives.md#origin_read_timeout>) or [`origin_send_timeout`](</docs/edge-logic/supported-directives.md#origin_send_timeout>) directives.

### What about dynamic content?

Dynamic contents are generated on-the-fly for the specific visitor. The responses are usually different between different visitors. Some examples are:
* Realtime stock prices, sports game scores
* Search results based on keywords entered by the visitor
* API calls that has lots of query parameters

If you only have the origin server at a central data center or cloud, the performances will be very poort if the visitor is far away from or does not have good connection to the data center. How can we accelerate those contents through CDN360? Here are the things you can do:
* Simply using a CDN can shave a few seconds

If you use CDN360, your clients will connect to our PoP that is closest to them. The round trip time (RTT) can be a few hundred milliseconds smaller compared to connecting to the origin server directly. The TCP and TLS handshakes usually take 3-4 RTTs which can easily be a second faster through CDN. The CDN360 servers by default maintain persistent connections to the origin. You can increase the [keep-alive timeout](/docs/portal/edge-configurations/managing-origins) to up to 10 minutes in the origin configurations.
* #### Cache the response!

"Dynamic" does not mean the content is not cacheable at all. In many cases, the end users will not feel the difference if you cache the NBA score for 1 second. If you have 10 requests per second to get the score, you could save 90% of the bandwidth and processing power. If the response depends on some query paremeter or request header values, you need to make sure those variables are [included in the cache key](#how-do-you-include-query-parameters-andor-request-headers-in-the-cache-key).
* Enable Fast Route to origin

CDN360 has a directive [`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>) to enable a "Fast Route" to access the origin. This is one of the most powerful features of CDN360. We created this based on our award-wining [High-speed Data Transmission](https://www.cdnetworks.com/enterprise-applications/high-speed-data-transmission/) (HDT) technology. It ensures our servers will have the best possible channel to reach your origin even under the most difficult situations. This directive can also be used for highly cacheable contents if the origin is hard to reach from certain networks, or when the cache miss performance is critical to you. However, the traffic served through the ""Fast Route" may be charged with a high price due to the higher cost associated to it. Please contact our support team if you want to give it a try.
