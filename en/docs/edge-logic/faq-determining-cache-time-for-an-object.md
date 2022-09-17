## How is the cache time for an object determined?

There are many directives you can use in the Edge Logic to control the cache time. If none of them is configured, the default behavior of CDN Pro edge servers is to "honor the origin". That is, the instructions in the `Cache-Control` and `Expires` header fields are followed. If these two fields are not present in a response from the origin, the response is not cached. The presence of the `Set-Cookie` header field also prevents caching of the response. 

We modified the open-source NGINX to strictly follow the HTTP standard regarding 'zero-time cache'. When `no-cache` or `max-age=0` is present in the `Cache-Control` header field, the response is still cached but expires immediately. Any subsequent request for this object will result in a revalidation request to the origin with the `If-Modified-Since` header. If `no-store` is in the `Cache-Control` header field, the response will not be cached.

By default, the `Date` header field is [passed all the way](</docs/edge-logic/supported-directives.md#proxy_pass_header>) from the origin to the edge servers. Efforts have also been made to ensure the `Age` header field reflects the time since the response is retrieved from the origin, even when parent cache is used.

If the default behavior mentioned above does not meet your requirement, use the following directives to alter it.

* To ignore one or more of the three special header fields above, you can use the [`proxy_ignore_headers`](</docs/edge-logic/supported-directives.md#proxy_ignore_headers>) directive. For example:
```nginx
proxy_ignore_headers Set-Cookie;
```
In this case, the servers will behave as if the `Set-Cookie` header does not exist.
* [`proxy_cache_valid`](</docs/edge-logic/supported-directives.md#proxy_cache_valid>) can be used to set a cache time if the three special header fields are not present or ignored. You can use it multiple times to set different cache times for different status codes. For example:
```nginx
location / { # the default location
    proxy_cache_valid 5m; # cache 200, 301 and 302 for 5 minutes
    proxy_cache_valid 404 2m; # cache 404 for 2 minutes
}
location /no-cache {
    proxy_cache_valid 200 0; # cache 200 response, but revalidate every time.
}
```
* While [`proxy_ignore_headers`](</docs/edge-logic/supported-directives.md#proxy_ignore_headers>) ignores the specified header fields altogether, [`proxy_ignore_cache_control`](</docs/edge-logic/supported-directives.md#proxy_ignore_cache_control>) can be used to ignore specific directives in the `Cache-Control` header field. For example:
```nginx
proxy_ignore_cache_control no-cache no-store;
```
* The CDN Pro proprietary directive [`proxy_cache_min_age`](</docs/edge-logic/supported-directives.md#proxy_cache_min_age>) can be used to override the `max-age` in the `Cache-Control` header field to enforce a minimum cache time.
* If you don't want a request to be served from the cache, you can use the [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) directive. [`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) can be used to prevent a response from being cached.

Since you are interested in the caching behavior of CDN Pro, you may want to also learn how to [customized the cache key](#how-to-include-query-parameters-andor-request-headers-in-the-cache-key) and how [the `Vary` header is treated](#the-support-and-non-support-of-vary).
