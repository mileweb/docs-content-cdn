## Built-in Variables

Here are all the built-in variables supported by the CDN360 servers. You can use them in Edge Logic or the real-time log. Please notice that not all variables are supported in both cases.

| **Variable Name** | **Description** | **Supported in Edge Logic** | **Supported in Real-Time Log** |
| ---- | ---- | ---- | ---- |
| $arg_name| one query parameter | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $args | the full query string from client | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $bytes_received | bytes received from client | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $body_bytes_sent | body bytes sent to client | FALSE | <span class="badge green">TRUE</span> |
| $bytes_sent| total response bytes to client | FALSE | <span class="badge green">TRUE</span> |
| $cache_misc | to set the parameters to cache key | <span class="badge green">TRUE</span> |FALSE |
| $client_country_code | client’s ISO 3166 country code | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $client_http_version | client's HTTP version, HTTP/1.1 or HTTP/2.0 etc. | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $client_ip_version | client's IP version <br> 4: for IPv4 <br> 6: for IPv6 | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $client_isp | client's ISP information | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $client_province_code | client's Chine province code | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $client_real_ip | IP of the client | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $connection_requests | current number of requests in the connection | FALSE | <span class="badge green">TRUE</span> |
| $content_length | request content-length header | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $content_type | request content-type header | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $cookie_* | one cookie value | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $dollar_sign | a literal dollar sign | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $error_code | error about client and origin | FALSE | <span class="badge green">TRUE</span> |
| $host | host header or matched server_name | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $hostname | server's hostname | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $http_* | one request header | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $http_host | request Host header | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $invalid_referer | empty string, if the “Referer” request header field value is considered valid, otherwise “1” | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $is_args | empty or ?, when query string exists | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $msec | current time in seconds with the milliseconds resolution | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $sec | current unix time in integer seconds | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $origin_host | origin's hostname | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $origin_ip | origin's IP | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $origin_status_code | origin's status code | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $pid | process ID of the service | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $pipe | p if request is pipelined, or . otherwise. | FALSE | <span class="badge green">TRUE</span> |
| $qtl_req_id | unique ID for the request | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $qtl_upstream_cache_status | edge cache HIT, MISS etc. | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $realtime_log_ds_factor | RT log downsample factor N | FALSE | <span class="badge green">TRUE</span> |
| $realtime_log_ds_ratio | RT log downsample ratio 0.xx | FALSE | <span class="badge green">TRUE</span> |
| $remote_user | user name supplied with the Basic authentication | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $request | full HTTP request line | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $request_length | length of request line, header and body | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $request_method | HTTP method: GET, POST, etc. | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $request_scheme | http or https | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $request_time | request processing time in seconds with a milliseconds resolution; <br> time elapsed since the first bytes were read from the client | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $request_uri | URI with query string | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $sc_completed | 1: if last byte was served <br> 0: if last byte was not served  | FALSE | <span class="badge green">TRUE</span> |
| $sc_initial | 1: if first byte was served <br> 0: if first byte was not served | FALSE | <span class="badge green">TRUE</span> |
| $sent_http__name_ | one header sent to client | FALSE | <span class="badge green">TRUE</span> |
| $sent_http_content_length | Content-Length to client | FALSE | <span class="badge green">TRUE</span> |
| $served_from_cache | 1: HIT on edge <br> 0: MISS on edge | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $server_addr | IP address of the edge server | FALSE | <span class="badge green">TRUE</span> |
| $server_protocol | HTTP/1.1 or HTTP/2.0 | FALSE | <span class="badge green">TRUE</span> |
| $service_port | port number that received the request | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $sorted_querystring_args | variable providing an ASCII-based sorted list of input query parameters; <br> it can be modified by directive 'sorted_querystring_filter_parameter'| <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $ssl_cipher | TLS cipher suite used | FALSE | <span class="badge green">TRUE</span> |
| $ssl_protocol | returns protocol name like: TLSv1.1 | FALSE | <span class="badge green">TRUE</span> |
| $ssl_server_name | TLS SNI servername | FALSE | <span class="badge green">TRUE</span> |
| $status | HTTP status code to client | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $tcpinfo_delivery_rate | TCP connection performance metrics to report the rate at which the sent data is acknowledged in bytes/s | FALSE | <span class="badge green">TRUE</span> |
| $tcpinfo_min_rtt | minimal rtt observed by TCP stack for the flow in microseconds | FALSE | <span class="badge green">TRUE</span> |
| $tcpinfo_rtt | RTT in microseconds | FALSE | <span class="badge green">TRUE</span> |
| $time_rfc822 | current time in RFC822 | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $upstream_bytes_received | number of bytes received from an upstream server | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $upstream_bytes_sent | number of bytes sent to an upstream server | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $upstream_connect_time | keeps time spent on establishing a connection with the upstream server; <br> the time is kept in seconds with millisecond resolution | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $upstream_cookie_* | cookie with the specified name sent by the upstream server in the “Set-Cookie” response header field | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $upstream_header_time | keeps time spent on receiving the response header from the upstream server; <br> the time is kept in seconds with millisecond resolution | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $upstream_http_* | one header received from origin | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $upstream_response_length | response length | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $upstream_response_time | keeps time spent on receiving the response from the upstream server; <br> the time is kept in seconds with millisecond resolution | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
| $upstream_status | status code from upstream | <span class="badge green">TRUE</span> | <span class="badge green">TRUE</span> |
