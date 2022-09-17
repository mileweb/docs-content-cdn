## HTTP 头部管理

当您需要 CDN Pro 在回源时添加，修改，或者删除某些头部值时，您可以使用指令[`origin_set_header`](</docs/edge-logic/supported-directives.md#origin_set_header>) 。示例如下：
```nginx
origin_set_header CDN-Name Quantil;
```
另外一个典型的场景如下，它可以让 CDN Pro 把客户端 IP 添加到 Client-IP 这个头部中并发送给源站：
```nginx
origin_set_header Client-IP $client_real_ip;
```
出于整合 cache 上文件编码格式从而提升缓存命中率的考虑，CDN Pro 开发并提供了指令 [`sanitize_accept_encoding`](</docs/edge-logic/supported-directives.md#sanitize_accept_encoding>)。该指令将在回源时修改客户端请求中的 `accept-encoding` 头部值，并携带修改后的值请求源站。

当您需要 CDN Pro 在响应客户端时添加，修改，或者删除某些头部值时，您可以使用指令 [`add_header`](</docs/edge-logic/supported-directives.md#add_header>)。示例如下：
```nginx
add_header CDN-Name Quantil;
```
同时 CDN Pro 开发并提供了指令 [`origin_header_modify`](</docs/edge-logic/supported-directives.md#origin_header_modify>) ，此指令将在其他所有处理源站响应的操作之前修改掉源站的响应头。当您需要改写某些可能影响 CDN 服务器行为的源站响应头（例如缓存时间）时，这个指令将非常有用。