## Simple Caching

在实际生产环境中，您对 CDN360 的需求或许不仅仅是生成一个固定字符串然后返回给客户端而已。一个典型的 CDN 需求通常是需要 CDN360 作为代理服务器从源站获取一些文件并保持一段时间的缓存，以供终端客户前来请求和检索该文件。假设您需要加速主机名“faster.cdnetworks.com”，此时源服务器的主机名是 "[www.cdnetworks.com](https://www.cdnetworks.com)" 。默认情况下，您希望 CDN360 作为代理服务器根据源站响应头中的 `cache-control` 和 `expires` 来缓存对应的文件。如果源没有指定该文件的缓存时间，则缓存 10 分钟。同时，由于您已经提前预知了 HTML、CSS、PNG、JS 和 JPEG 文件不会经常更新，因此您希望此类文件至少能够缓存1天（即便在源给的缓存规则小于1天的情况下）。此时， CDN360 上的边缘逻辑配置如下：
```nginx
location / { # the default location
  proxy_cache_valid 10m; # cache for 10 min if no instruction from the origin
  origin_pass www_origin; # fetch content from this origin
}
location ~ /.*\.(html?|css|png|js|jpe?g) { # static content
  proxy_cache_valid 1d; # cache for a day if no instruction from the origin
  proxy_cache_min_age 1d; # cache for a day even if origin's 
                          # max-age is less than a day.
  origin_pass www_origin; # fetch content from this origin
}
```
There are two "[location](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)" directives:

*   The first is a prefix matching.
*   The second is a regular expression matching. 

Based on the description of the directive in the [official NGINX documentation](http://nginx.org/en/docs/http/ngx_http_core_module.html#location), the regex matching has higher priority than the prefix matching. So all the matching file types are handled with the settings in the second location block, while the others are handled by the first one. 
*   [`proxy_cache_valid`](</docs/edge-logic/supported-directives.md#proxy_cache_valid>) – this directive is the standard NGINX way of specifying cache time for objects without caching instructions from the origin. By default, the specified cache time (in this case, 10 minutes) is applied to origin responses with status codes 200, 301, and 302. Again, you can follow the [official NGINX documentation](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_valid) to apply it to other status codes. 
*   [`proxy_cache_min_age`](</docs/edge-logic/supported-directives.md#proxy_cache_min_age>)  – this is a CDN360-proprietary directive that takes one parameter. If the "max-age" value from origin is smaller than the specified value, it makes sure the content is cached for at least the specified duration. 
*   [`origin_pass`](</docs/edge-logic/supported-directives.md#origin_pass>) – this is another proprietary directive to access the origin. It is a wrapper of NGINX’s "[proxy_pass](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass)", "[proxy_set_header](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header)", "[proxy_ssl_name](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ssl_name)", and a few other proxy directives. 
*   `www_origin` – this is the name you assign to the origin, which should be defined in the "origins" field of the property.
