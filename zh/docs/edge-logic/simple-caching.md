## 简单缓存

在实际生产环境中，您对 CDN Pro 的需求绝不会仅仅是生成一个固定字符串返回给客户端而已。一个典型的 CDN 需求通常需要 CDN Pro 作为代理服务器从源站获取一些文件并缓存一段时间，以供终端客户前来请求和检索该文件。
假设您需要加速主机名 “faster.cdnetworks.com”，源站服务器的主机名是 "[www.cdnetworks.com](https://www.cdnetworks.com)" 。
默认情况下，您希望 CDN Pro 作为代理服务器根据源站响应头中的 `cache-control` 和 `expires` 来缓存对应的文件。如果源没有指定该文件的缓存时间，则缓存 10 分钟。
同时，由于您已经提前预知了 HTML、CSS、PNG、JS 和 JPEG 文件不会经常更新，因此您希望此类文件至少能够缓存1天（即便源站给的缓存规则小于1天）。
为了实现以上需求，CDN Pro 的边缘逻辑配置如下：
```nginx
location / { # 默认 / 目录配置
  proxy_cache_valid 10m; # 如果源没有给缓存指示（通常是Cache-Control或者Expire头部中），则缓存10分钟
  origin_pass www_origin; # 从www_origin这个源站获取文件
}
location ~ /.*\.(html?|css|png|js|jpe?g) { # 静态文件
  proxy_cache_valid 1d; # 如果源没有给缓存指示（通常是Cache-Control或者Expire头部中），则缓存1天
  proxy_cache_min_age 1d; # 至少能够缓存1天（即便源给的缓存规则小于1天）
  origin_pass www_origin; # 从www_origin这个源站获取文件
}
```
从上述实例，您也许注意到了 Edge Logic 里对注释的支持。我们认为这对于管理复杂的配置是十分重要的。 这段代码里有2个 "[location](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)" 指令:

*   第一个是前缀匹配模式
*   第二个是正则匹配模式

根据 [Nginx 官方文档](http://nginx.org/en/docs/http/ngx_http_core_module.html#location) 中对 location 指令的描述，相比前缀匹配模式正则模式有更高的优先级。因此，所有匹配到第二个location中的静态文件都将按照第二个 location 块中的逻辑来处理，而其他文件类型则由第一个 location 块处理。这个例子里还有其他几个有趣的指令：
*   [`proxy_cache_valid`](</docs/edge-logic/supported-directives.md#proxy_cache_valid>) – 该指令用于在源站没有给缓存指示时，指定 CDN Pro 的缓存时间。默认情况下，只对 200/301/302 状态码的响应生效（在本例中静态文件缓存1天，其余文件缓存10分钟）。同时，您也可以按照 [Nginx 官方文档](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_valid) 中的描述设置其他状态码的缓存时间。如果希望进一步了解 CDN Pro 对缓存时间的控制，请参阅我们在[常见问题](</docs/edge-logic/faq.md#how-the-cache-time-for-an-object-is-determined>)中的答案.
*   [`proxy_cache_min_age`](</docs/edge-logic/supported-directives.md#proxy_cache_min_age>)  – 这是一个需要携带一个参数的 CDN Pro 专有指令。如果来自源站的 "max-age" 值小于指定值，则确保 CDN Pro 按照该指令的参数值对内容进行缓存。
*   [`origin_pass`](</docs/edge-logic/supported-directives.md#origin_pass>) – 这是指定源站的专有指令。该指令封装自 Nginx 的 "[proxy_pass](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass)", "[proxy_set_header](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header)", "[proxy_ssl_name](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ssl_name)" 以及一些其他代理缓存指令。
*   `www_origin` – 这是您分配给源站的名称，该名称需要事先在加速项的“源站”配置中进行设置。
