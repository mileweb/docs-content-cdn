## Built-in Variables

Here are all the built-in variables supported by the CDN360 servers. You can use them in Edge Logic or the real-time log. Please notice that not all variables are supported in both places.
If you use the CDN360 portal to edit the property, the autocompletion feature will bring up all the supported variables if you type a `$` at the right place.

| **Variable Name** | **Description** | **Supported in Edge Logic** | **Supported in Real-Time Log** |
| ---- | ---- | ---- | ---- |
| $arg__name_| query parameter with the specified name | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $args | the full query string from client | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $bytes_received | bytes received from client | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $body_bytes_sent | body bytes sent to client | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $bytes_sent| total response bytes to client | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $cache_misc | to set the parameters to cache key | <span class="badge green">Yes</span> | <span class="badge yellow">No</span> |
| $client_country_code | client’s ISO 3166 country code | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $client_http_version | client's HTTP version, HTTP/1.1 or HTTP/2.0 etc. | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $client_ip_version | client's IP version <br> 4: for IPv4 <br> 6: for IPv6 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $client_isp | client's ISP information | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $client_province_code | client's Chine province code | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $client_real_ip | IP of the client | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $connection_requests | current number of requests in the connection | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $content_length | request content-length header | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $content_type | request content-type header | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $cookie__name_ | cookie with the specified name received from client | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $dollar_sign | a literal dollar sign | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $error_code | error about client and origin | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $host | host header or matched server_name | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $hostname | server's hostname | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $http__name_ | request header with the specified name | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $http_host | request Host header | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $invalid_referer | empty string, if the “Referer” request header field value is considered valid, otherwise “1” | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $is_args | empty or ?, when query string exists | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $msec | current time in seconds with the milliseconds resolution | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $sec | current unix time in integer seconds | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $origin_host | origin's hostname | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $origin_ip | origin's IP | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $origin_status_code | origin's status code | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $pid | process ID of the service | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $pipe | p if request is pipelined, or . otherwise. | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $qtl_req_id | unique ID for the request | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $qtl_upstream_cache_status | edge cache HIT, MISS etc. | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $realtime_log_ds_factor | RT log downsample factor N | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $realtime_log_ds_ratio | RT log downsample ratio 0.xx | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $remote_user | user name supplied with the Basic authentication | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $request | full HTTP request line | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $request_length | length of request line, header and body | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $request_method | HTTP method: GET, POST, etc. | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $request_scheme | http or https | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $request_time | request processing time in seconds with a milliseconds resolution; <br> time elapsed since the first bytes were read from the client | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $request_uri | URI with query string | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $sc_completed | 1: if last byte was served <br> 0: if last byte was not served  | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $sc_initial | 1: if first byte was served <br> 0: if first byte was not served | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $sent\_http\__name_ | header with the specified name sent to client | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $sent_http_content_length | Content-Length to client | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $served_from_cache | 1: HIT on edge <br> 0: MISS on edge | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $server_addr | IP address of the edge server | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $server_protocol | HTTP/1.1 or HTTP/2.0 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $service_port | port number that received the request | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $sorted_querystring_args | variable providing an ASCII-based sorted list of input query parameters; <br> it can be modified by directive 'sorted_querystring_filter_parameter'| <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $ssl_cipher | TLS cipher suite used | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $ssl_protocol | returns protocol name like: TLSv1.1 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $ssl_server_name | TLS SNI servername | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $status | HTTP status code to client | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $tcpinfo_delivery_rate | TCP connection performance metrics to report the rate at which the sent data is acknowledged in bytes/s | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $tcpinfo_min_rtt | minimal rtt observed by TCP stack for the flow in microseconds | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $tcpinfo_rtt | RTT in microseconds | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| $time_rfc822 | current time in RFC822 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_bytes_received | number of bytes received from an upstream server | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_bytes_sent | number of bytes sent to an upstream server | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_connect_time | keeps time spent on establishing a connection with the upstream server; <br> the time is kept in seconds with millisecond resolution | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream\_cookie\__name_ | cookie with the specified name sent by the upstream server in the “Set-Cookie” response header field | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_header_time | keeps time spent on receiving the response header from the upstream server; <br> the time is kept in seconds with millisecond resolution | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream\_http\__name_ | header with the specified name received from origin | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_response_length | response length | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_response_time | keeps time spent on receiving the response from the upstream server; <br> the time is kept in seconds with millisecond resolution | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| $upstream_status | status code from upstream | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
