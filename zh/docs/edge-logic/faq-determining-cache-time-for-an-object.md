## CDN Pro 如何决定一个文件能否缓存，缓存多久?

在边缘逻辑（Edge Logic）中，我们提供了多个指令用于设置文件的缓存规则（如 [proxy_no_cache](/docs/edge-logic/supported-directives#proxy_no_cache) / [proxy_ignore_cache_control](/docs/edge-logic/supported-directives#proxy_ignore_cache_control) / [proxy_ignore_headers](/docs/edge-logic/supported-directives#proxy_ignore_headers)等等）。如果加速项中没有使用到任何相关指令，那么 CDN Pro 的默认行为是“遵循源站”，即按照源站响应头中 `Cache-Control` 和 `Expires` 字段的取值来判断文件是否可以缓存以及缓存时长。需要注意的是，如果源站给的响应头中有 `Set-Cookie` 字段，CDN Pro 将不会缓存该文件。

与此同时我们优化了开源 Nginx 以使 CDN Pro 严格遵循有关“零时缓存”的 HTTP 标准：
如果源站的 Cache-Control 响应头中存在 no-cache 或 max-age=0 参数，文件仍会被 CDN Pro 缓存但会被判断为立即过期。对该文件的后续请求将触发 CDN Pro 携带 If-Modified-Since 头部对源发起重新验证。但如果源站的 Cache-Control 响应头中包含 no-store，则该文件不会被缓存。

HTTP 协议规定 Date 响应头应保存源站生成响应的时间。因此在默认情况下，来自源站的 `Date` 响应头会被 [一路透传](</docs/edge-logic/supported-directives.md#proxy_pass_header>) 至客户端。类似的原则也被运用到了对响应头 `Age` 的处理过程中。即便在采用了多层级缓存 架构的情况下，CDN Pro 平台的 `Age` 头也可正确反映文件从源站上取回后经过了多长时间。

如果上述关于缓存的默认规则并不是您所期待的，您可以使用本文开头提到的那些指令来对缓存规则进行修改。

* [`proxy_ignore_headers`](</docs/edge-logic/supported-directives.md#proxy_ignore_headers>)指令可以用来让 CDN Pro 强制忽略源站响应头里的 Cache-Control\Expire\Set-Cookie 三个字段。例如：
```nginx
proxy_ignore_headers Set-Cookie;
```
这种情况下，源站的 `Set-Cookie` 响应头将不会对缓存行为产生任何影响。
* [`proxy_cache_valid`](</docs/edge-logic/supported-directives.md#proxy_cache_valid>) 指令用于设置当源站未返回 Cache-Control\Expire\Set-Cookie 这三个字段，或者这些字段被强制忽略时，CDN Pro 的缓存时长。该指令支持针对不同状态码的文件设置不同缓存时长。例如：
```nginx
location / { # 默认 location
    proxy_cache_valid 5m; # 针对200、301、302状态码请求缓存5分钟
    proxy_cache_valid 404 2m; # 针对404状态码请求缓存2分钟
}
location /no-cache {
    proxy_cache_valid 200 0; # 针对200状态码进行缓存，但是立即过期
}
```
* [`proxy_ignore_cache_control`](</docs/edge-logic/supported-directives.md#proxy_ignore_cache_control>) 指令的功能与 [`proxy_ignore_headers`](</docs/edge-logic/supported-directives.md#proxy_ignore_headers>)十分相似。两者的区别在于前者可以选择性忽略源站 Cache-Control 头中的指定参数值。例如：
```nginx
proxy_ignore_cache_control no-cache no-store; # 忽略源站 Cache-Control 响应头中的 no-cache 和 no-store 参数
```
* [`proxy_cache_min_age`](</docs/edge-logic/supported-directives.md#proxy_cache_min_age>) 指令用于设置 CDN Pro 文件缓存时间的最小值。当源站给的 Cache-Control 头中的 max-age 值小于 proxy_cache_min_age 指令的配置值时，该 max-age 将被 CDN Pro 忽略，而使用该指令配置值作为文件的缓存时间。
* [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) 指令用于设置 CDN Pro 不响应缓存文件给客户端，而是每次都从源站获取文件。该指令经常与 [`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 一起使用来达到“强制文件不缓存”的效果。
* [`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 指令用于设置 CDN Pro 从源站拿到文件后不缓存到本地。该指令经常与 [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) 一起使用来达到“强制文件不缓存”的效果。

如果您对 CDN Pro 的缓存行为感兴趣，您可能也希望了解 [如何设置自定义缓存Key](#如何将问号后参数或者请求头加入到缓存key中) 以及 [CDN Pro 对 `Vary` 头部的处理方式](#关于-vary-响应头的处理方式)。