## How to support WebSocket?

Use the directive [`enable_websocket`](</docs/edge-logic/supported-directives.md#enable_websocket>) in the location where the WebSocket protocol is needed. Make sure the client uses HTTP/1.1 (not HTTP/2) to connect. This directive also sets the read and send timeouts to 21s by default. They can be changed using the [`origin_read_timeout`](</docs/edge-logic/supported-directives.md#origin_read_timeout>) or [`origin_send_timeout`](</docs/edge-logic/supported-directives.md#origin_send_timeout>) directives.
