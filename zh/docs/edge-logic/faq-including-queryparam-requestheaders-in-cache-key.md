## 如何将问号后参数，请求头，或者请求正文加入到缓存Key中?

CDN Pro 的默认行为是将域名和不包含问号后参数的请求URI加到缓存 key 中。同时 CDN Pro 也会将一个在边缘逻辑（Edge Logic）中可编辑的内置变量 [`$cache_misc`](</docs/edge-logic/built-in-variables.md#$cache_misc>) 加入到缓存 key 中。因此您可以通过这个内置变量将关键参数加入缓存 Key。例如，将所有问号后参数加入到缓存 key ：
```nginx
set $cache_misc "?$sorted_querystring_args";
```
您也可以仅提取出问号后参数中的部分指定变量值加入到缓存 key ，以下示例显示如何将问号后参数中的 "abc" 和 "def" 加入到缓存 key ：
```nginx
set $cache_misc "?abc=$arg_abc&def=$arg_def";
```
您也可以将部分请求 header 值加入到缓存 key :
```nginx
set $cache_misc "ae=$http_accept_encoding";
```
在配置的过程中，如果您想保留当前边缘逻辑中的 $cache_misc 值，可以将新数据添加在 $cache_misc 末尾，例如：
```nginx
set $cache_misc "${cache_misc}hdr1=$http_header1&hdr2=$http_header2";
```
POST 方法在今天经常被用来实现需要提供大量参数的查询操作，一个典型的例子是 [GraphQL](https://en.wikipedia.org/wiki/GraphQL)。 在这种情况下，POST 请求和 GET 一样都是 idempotent 和安全的，而且响应也都是可缓存的。唯一的问题就是如何把请求正文里的参数添加到缓存 key 中。CDN Pro 为此专门开发了 [`proxy_request_body_in_cache_key`](/docs/edge-logic/supported-directives.md#proxy_request_body_in_cache_key) 指令来实现这个目的。当这项功能被启用的时候，服务器会为收到的请求正文计算一个 MD5 哈希值，并将其添加到缓存 key 的末尾。出于性能考虑，这些操作只会在请求正文小于 4kB 的时候发生。当请求正文大于此门限时，不会有哈希值被添加到缓存 key 中，同时变量 [`$ignored_body_in_cache_key`](/docs/edge-logic/built-in-variables#ignored_body_in_cache_key) 的值会被设为 '1'。为了避免可能由此带来的缓存冲突，您可以将此变量用于 [`proxy_cache_bypass`](/docs/edge-logic/supported-directives.md#proxy_cache_bypass)指令来避免缓存这样的请求。如果一定要把更大的请求正文添加到缓存 key 里，您需要在客户端计算哈希值，并通过请求头传递到服务器，然后将其添加到 $cache_misc 变量中。

最后给您的提醒是，不要忘了使用 [`proxy_cache_methods`](/docs/edge-logic/supported-directives.md#proxy_cache_methods) 指令来开启对 POST 请求的缓存.
