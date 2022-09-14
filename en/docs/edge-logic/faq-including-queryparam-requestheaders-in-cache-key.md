## How do I include query parameters, request headers and body in the cache key?

By default, the CDN Pro cache key includes only the hostname and URI without the query string. It also includes a special variable that is accessible in the Edge Logic: `$cache_misc`. Therefore, if you want to add anything to the cache key, add it to this variable. For example, to keep the entire query string in the cache key:
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
The POST method is often used today to query information with complex or long parameters. A prominent example is the [GraphQL](https://en.wikipedia.org/wiki/GraphQL). In these cases, the POST requests are idempotent and safe as the GET requests, and the response are well cacheable. The only question is how to include the parameters in the request body to the cache key. CDN Pro created the proprietary directive [`proxy_request_body_in_cache_key`](/docs/edge-logic/supported-directives.md#proxy_request_body_in_cache_key) for this exact purpose. When this feature is turned on, our server would calculate an MD5 hash from the request body and append it to the cache key. Due to performance considerations, this only happens when the body size is less than 4kB, otherwise the cache key is not appended and the variable $ignored_body_in_cache_key is set to 1 to indicate this fact. You can use this variable with [`proxy_cache_bypass`](/docs/edge-logic/supported-directives.md#proxy_cache_bypass) to avoid serving incorrect cached content. If you really need to include larger request body in the cache key, you are advised to calculate a hash of the request body in the client and pass it through the request header. You can then use the method introduced earlier to include it in the cache key via $cache_misc.

Last but not least, don't forget to use the [`proxy_cache_methods`](/docs/edge-logic/supported-directives.md#proxy_cache_methods) directive to enable the caching of POST requests.

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
