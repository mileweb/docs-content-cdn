## 如何遵循源站的跳转请求（301、302等）?

当源站响应 30x 并携带一个Location重定向跳转时，您或许不希望 CDN Pro 仅是将该 30x 状态码以及跳转地址缓存并响应给客户端，而是希望 CDN Pro 继续对这个 Location 重定向跳转地址发起请求直至获取到实际的响应文件后再进行缓存和客户端响应。这时您可以使用指令 [`origin_follow_redirect`](</docs/edge-logic/supported-directives.md#origin_follow_redirect>) 来开启此“拉取跳转后的文件”功能。需要注意的是，开启该功能可能会给此类回源请求带来额外的时间消耗。