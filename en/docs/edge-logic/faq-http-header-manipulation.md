## HTTP Header Manipulation

### Update headers in the request to the origin

If you need to add, modify, or delete some header fields in the request to the origin, use the [`origin_set_header`](</docs/edge-logic/supported-directives.md#origin_set_header>) directive. For example:
```nginx
origin_set_header CDN-Name Quantil;
```
In particular, this is the code to send the client's IP address to the origin server:
```nginx
origin_set_header Client-IP $client_real_ip;
```
In order to consolidate the responses from the origin to improve the cache hit ratio, we created a dedicated directive [`sanitize_accept_encoding`](</docs/edge-logic/supported-directives.md#sanitize_accept_encoding>) to modify the `accept-encoding` request header received from the client.


### Update headers in the response to clients

If you need to add, modify, or delete some header fields in the response to clients, use the [`add_header`](</docs/edge-logic/supported-directives.md#add_header>) directive. For example:
```nginx
add_header CDN-Name Quantil;
```
We also created a proprietary directive [`origin_header_modify`](</docs/edge-logic/supported-directives.md#origin_header_modify>) to manipulate the response header from the origin prior to processing the response. This can be very useful if you need to override a header value (such as cache time) from the origin that may affect the CDN servers' behavior.

