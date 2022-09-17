## 如何开启websocket功能?

您可以在希望开启 WebSocket 协议的location下使用指令 [`enable_websocket`](</docs/edge-logic/supported-directives.md#enable_websocket>)。需要确保客户端使用的是 HTTP/1.1（非 HTTP/2）协议来与服务器建连。该指令默认会将读取和发送超时时间设置为21秒。你可以通过[`origin_read_timeout`](</docs/edge-logic/supported-directives.md#origin_read_timeout>) 和 [`origin_send_timeout`](</docs/edge-logic/supported-directives.md#origin_send_timeout>) 这两个指令对其进行修改。