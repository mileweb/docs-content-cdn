## Built-in Variables

The table below lists all the built-in variables supported by the CDN360 servers. You can use them in Edge Logic or the real-time log. Please notice that not all variables are supported in both places. The variables with numerical values are tagged with <span class="badge small" title="numerical value">#</span>.
If you use the CDN360 portal to edit the property, the autocompletion feature will list all the supported variables if you type `$` at a position where a variable is allowed.

| **Variable Name** | **Description** | **Edge Logic** | **[Real-Time Log](/docs/portal/edge-configurations/creating-property#real-time-log)** |
| ---- | ---- | ---- | ---- |
| $arg__name_| query parameter with the specified name | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $args | the full query string from client | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $bytes_received |<span class="badge small" title="numerical value">#</span> bytes received from client | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $body_bytes_sent |<span class="badge small" title="numerical value">#</span> body bytes sent to client | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $bytes_sent |<span class="badge small" title="numerical value">#</span> total response bytes to client | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $cache_misc | parameters to add to the cache key | <span class="badge green">Yes</span> | <span class="badge yellow">No</span> |
| $client_country_code | client’s ISO 3166 country code | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $client_http_version | client's HTTP version, like "HTTP/1.1" | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $client_ip_version | client's IP version <br> 4: for IPv4 <br> 6: for IPv6 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $client_isp | client's ISP information | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $client_province_code | client's China province code | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $client_real_ip | client's IP address | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $connection_requests |<span class="badge small" title="numerical value">#</span> current number of requests in the connection | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $content_length |<span class="badge small" title="numerical value">#</span> request's Content-Length header | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $content_type | request's Content-Type header | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $cookie__name_ | cookie with the specified name received from client | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $dollar_sign | a literal dollar sign | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $error_code | error about client and origin | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $host | host header, same as $http_host | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $hostname | server's hostname | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $http__name_ | request header with the specified name | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $http_host | request's Host header | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $invalid_referer | empty string if the “Referer” request header field value is considered valid; otherwise “1” | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $is_args | empty or "?", when query string exists | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $msec |<span class="badge small" title="numerical value">#</span> current time in seconds with milliseconds resolution | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $sec |<span class="badge small" title="numerical value">#</span> current unix time in integer seconds | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $origin_host | origin's hostname | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $origin_ip | origin's IP | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $origin_status_code | origin's status code | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $pid | process ID of the service | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $pipe | "p" if request is pipelined, or "." otherwise. | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $qtl_req_id | a unique ID for the request | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $qtl_upstream_cache_status | edge cache HIT, MISS, etc. | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $realtime_log_ds_factor |<span class="badge small" title="numerical value">#</span> RT log downsample factor. A value N means one log entry for every N requests| <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $realtime_log_ds_ratio |<span class="badge small" title="numerical value">#</span> RT log downsample ratio. The value should be 1/N, as a decimal number between 0 and 1. (ETA: May 2021)| <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $remote_user | user name supplied with Basic authentication | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $request | full HTTP request line | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $request_length |<span class="badge small" title="numerical value">#</span> length of request line, header and body | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $request_method | HTTP method: GET, POST, etc. | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $request_scheme | "http" or "https" | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $request_time |<span class="badge small" title="numerical value">#</span> request processing time in seconds with milliseconds resolution; time elapsed since the first byte was read from the client | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $request_uri | request URI with query string received from client | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $sc_completed |<span class="badge small" title="numerical value">#</span> 1: if last byte was served <br> 0: if last byte was not served  | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $sc_initial |<span class="badge small" title="numerical value">#</span> 1: if first byte was served <br> 0: if first byte was not served | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $sent\_http\__name_ | header with the specified name sent to client | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $sent_http_content_length |<span class="badge small" title="numerical value">#</span> Content-Length to client | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $served_from_cache |<span class="badge small" title="numerical value">#</span> 1: HIT on edge <br> 0: MISS on edge | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $server_addr | IP address of the edge server | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $server_protocol | HTTP/1.1 or HTTP/2.0 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $service_port |<span class="badge small" title="numerical value">#</span> port number that received the request | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $sorted_querystring_args | variable providing an ASCII-based sorted list of input query parameters; it can be modified by the "[sorted_querystring_filter_parameter](/docs/edge-logic/supported-directives#sorted_querystring_filter_parameter)" directive | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $ssl_cipher | TLS cipher suite used | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $ssl_protocol | returns protocol name like "TLSv1.1" | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $ssl_server_name | TLS SNI servername | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $status | HTTP status code to client | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $tcpinfo_delivery_rate |<span class="badge small" title="numerical value">#</span> TCP connection performance metrics, in bytes/s, to report the rate at which the sent data is acknowledged | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $tcpinfo_min_rtt |<span class="badge small" title="numerical value">#</span> minimum RTT, in microseconds, observed by TCP stack for the connection | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $tcpinfo_rtt |<span class="badge small" title="numerical value">#</span> latest RTT, in microseconds, observed by TCP stack for the connection | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $time_http | current time in RFC7231 format that can be used for HTTP Date header (ETA: May 2021)| <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_bytes_received |<span class="badge small" title="numerical value">#</span> number of bytes received from an upstream server | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_bytes_sent |<span class="badge small" title="numerical value">#</span> number of bytes sent to an upstream server | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_connect_time |<span class="badge small" title="numerical value">#</span> time spent in seconds with millisecond resolution establishing a connection with the upstream server | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream\_cookie\__name_ | cookie with the specified name sent by the upstream server in the “Set-Cookie” response header field | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_header_time |<span class="badge small" title="numerical value">#</span> time spent in seconds with millisecond resolution receiving the response header from the upstream server | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream\_http\__name_ | header with the specified name received from origin | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_response_time |<span class="badge small" title="numerical value">#</span> time spent in seconds with millisecond resolution receiving the complete response from the upstream server | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_status | status code from upstream | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $uri | request $uri without query string. In Edge Logic, it may be modified by the "[rewrite](/docs/edge-logic/supported-directives#rewrite)" directive | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |