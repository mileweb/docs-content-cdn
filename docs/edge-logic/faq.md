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

If you need to add/modify/delete some headers to the request to the origin, you need the [`origin_set_header`](</docs/edge-logic/supported-directives.md#origin_set_header>) directive. For example:
```nginx
origin_set_header CDN-Name Quantil;
```
In particular, this is the code to send the client's IP address to the origin server:
```nginx
origin_set_header Client-IP $client_real_ip;
```
If you need to add/modify/delete some headers to the response to clients, you need to use the [`add_header`](</docs/edge-logic/supported-directives.md#add_header>) directive. For example:
```nginx
add_header CDN-Name Quantil;
```
### The support (and non-support) of `Vary`

CDN360 servers by default remove any `Vary` header in the response from origin servers. Therefore, every URL will have no more than one cached version. If you want to have different versions cached based on some request header or cookie values, put them explicitly into the cache key using the `$cache_misc` variable mentioned above. For example:
```nginx
set $cache_misc "ae=$http_accept_encoding";
```
If you want to send a `Vary` header to the clients to make sure they cache different variations properly, you can use the [`add_header`](</docs/edge-logic/supported-directives.md#add_header>) directive to do so. If you have to pass the `Vary` header from the origin to the client, the following configuration can be used to "undo" the default removal of the header:
```nginx
origin_header_modify Vary "" policy=preserve;
```
However, preserving a `Vary` header prevents the response from being cached because [`proxy_cache_vary off`](</docs/edge-logic/supported-directives.md#proxy_cache_vary>) is configured by default. If it is absolutely important for the CDN360 servers to cache multiple versions based on the `Vary` header, contact our customer support to obtain permission to set `proxy_cache_vary on`.

### How to chase redirections from origin?

When the origin responds with 30x redirection, you may want the CDN servers to chase it until the redirection stops, instead of passing the redirection to the client, which takes more time to get the final content. If you want to turn it on, you just need to do the following:
```
TBD
```

### China Delivery and Beian

The Chinese Ministry of Industry and Information Technology (MIIT) requires every domain served from a server in Mainland China to have a record in its system. This is called [ICP Beian (备案)](http://www.beian.miit.gov.cn/). For certain domains, a [Security Beian](http://www.beian.gov.cn/) is also required. As a CDN provider, we cannot use our servers in China to serve domains without ICP Beian. Any violation may result in our China-based servers being blocked. Customers are responsible for filing and obtaining Beian for any domain that needs local delivery in China. We can provide consulting services to assist with this process. For domains without Beian, we can use servers located in close proximity to Mainland China (for example, Hong Kong, Korea and Japan) to deliver content to clients in Mainland China; however, the performance will not be as good as local delivery.

Assuming you have a domain with ICP Beian, perform the following steps to enable local delivery in Mainland China: 

1. Create a [CNAME](<../../apidocs#operation/createCNAME>) with "hasBeian" set to true, and use this CNAME for the domain to be accelerated. This ensures that GSLB will direct traffic of this domain to our servers in Mainland China. 

2. Set "hasBeian" to true in the [property](/apidocs#operation/createProperty) of this domain. This ensures the configuration will be deployed to servers in China and that those servers will handle client requests to this domain. 

### How to support websocket?

What you need to do is to use the directive [`enable_websocket`](</docs/edge-logic/supported-directives.md#enable_websocket>) in the location where websocket is needed. Make sure the client will be using HTTP/1.1 (not HTTP/2) to connect.
