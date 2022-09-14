## 关于 `Vary` 响应头的处理方式

默认情况下， CDN Pro 会将删掉所有来自源站的 `Vary` 响应头，因此所有的URL在 CDN Pro 的服务器上仅保留一份缓存版本。如果您希望 CDN Pro 按照请求头或者请求cookie值来缓存不同的缓存版本，您可以将这些请求头或者cookie头加入到变量 `$cache_misc` 中。示例如下：
```nginx
set $cache_misc "ae=$http_accept_encoding";
```
如果您期望发送 `Vary` 响应头给客户端以便客户端按照这个头部值来区分缓存，您可以使用指令 [`add_header`](</docs/edge-logic/supported-directives.md#add_header>)。如果您需要将源站的 `Vary` 响应头透传给客户端，您可以使用以下配置来让默认的行为（删掉所有来自源站的 `Vary` 响应头）失效：
```nginx
# 保留源站提供的响应头 `Vary` 
origin_header_modify Vary "" policy=preserve;
# Cache不对 `Vary` 做任何操作，仅透传给客户端
proxy_ignore_headers Vary; 
```
在这种情况下，CDN Pro 将按照响应头 `Vary` 完全不存在来处理缓存。如果仅配置了 `origin_header_modify Vary "" policy=preserve` 而没有配置 `proxy_ignore_headers Vary` ，那么由于默认生效的配置 [`proxy_cache_vary off`](</docs/edge-logic/supported-directives.md#proxy_cache_vary>) ，您的文件将不会被缓存在 CDN Pro 平台上。如果您的业务的确需要 CDN Pro 按照响应头 `Vary` 来区分不同缓存版本，请联系网宿（CDNetworks）技术支持为您开通配置`proxy_cache_vary on` 的权限。