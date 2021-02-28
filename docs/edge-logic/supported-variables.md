## Built-in Variables

Here are all the built-in variables supported by the CDN360 servers. You can use them in Edge Logic or the real-time log. Please notice that not all variables are supported in both cases.
| **Variable Name** | **Description** | **Supported in Edge Logic** | **Supported in Real-Time Log** |
| ---- | ---- | ---- | ---- |
| $arg_name| one query parameter | TRUE | TRUE |
| $args | the full query string from client | TRUE | TRUE |
| $bytes_received | bytes received from client | TRUE | TRUE |
| $body_bytes_sent | body bytes sent to client | FALSE | TRUE |
| $bytes_sent| total response bytes to client | FALSE | TRUE |
| $cache_misc | to set the parameters to cache key | TRUE |FALSE |
| $client_country_code | client’s ISO 3166 country code | TRUE | TRUE |
| $client_http_version | client's HTTP version, HTTP/1.1 or HTTP/2.0 etc. | TRUE | TRUE |
| $client_ip_version | client's IP version <br> 4: for IPv4 <br> 6: for IPv6 | TRUE | TRUE |
| $client_isp | client's ISP information | TRUE | TRUE |
| $client_province_code | client's Chine province code | TRUE | TRUE |
| $client_real_ip | IP of the client | TRUE | TRUE |
| $connection_requests | current number of requests in the connection | FALSE | TRUE |
| $content_length | request content-length header | TRUE | TRUE |
| $content_type | request content-type header | TRUE | TRUE |
| $cookie_* | one cookie value | TRUE | TRUE |
| $dollar_sign | a literal dollar sign | TRUE | TRUE |
| $error_code | error about client and origin | FALSE | TRUE |
| $host | host header or matched server_name | TRUE | TRUE |
| $hostname | server's hostname | TRUE | TRUE |
| $http_* | one request header | TRUE | TRUE |
| $http_host | request Host header | TRUE | TRUE |
| $invalid_referer | empty string, if the “Referer” request header field value is considered valid, otherwise “1” | TRUE | TRUE |
| $is_args | empty or ?, when query string exists | TRUE | TRUE |
| $msec | current time in seconds with the milliseconds resolution | TRUE | TRUE |
| $sec | current unix time in integer seconds | TRUE | TRUE |
| $origin_host | origin's hostname | TRUE | TRUE |
| $origin_ip | origin's IP | TRUE | TRUE |
| $origin_status_code | origin's status code | TRUE | TRUE |
| $pid | process ID of the service | TRUE | TRUE |
| $pipe | p if request is pipelined, or . otherwise. | FALSE | TRUE |
| $qtl_req_id | unique ID for the request | TRUE | TRUE |
| $qtl_upstream_cache_status | edge cache HIT, MISS etc. | TRUE | TRUE |
| $realtime_log_ds_factor | RT log downsample factor N | FALSE | TRUE |
| $realtime_log_ds_ratio | RT log downsample ratio 0.xx | FALSE | TRUE |
| $remote_user | user name supplied with the Basic authentication | TRUE | TRUE |
| $request | full HTTP request line | TRUE | TRUE |
| $request_length | length of request line, header and body | TRUE | TRUE |
| $request_method | HTTP method: GET, POST, etc. | TRUE | TRUE |
| $request_scheme | http or https | TRUE | TRUE |
| $request_time | request processing time in seconds with a milliseconds resolution; <br> time elapsed since the first bytes were read from the client | TRUE | TRUE |
| $request_uri | URI with query string | TRUE | TRUE |
| $sc_completed | 1: if last byte was served <br> 0: if last byte was not served  | FALSE | TRUE |
| $sc_initial | 1: if first byte was served <br> 0: if first byte was not served | FALSE | TRUE |
| $sent_http__name_ | one header sent to client | FALSE | TRUE |
| $sent_http_content_length | Content-Length to client | FALSE | TRUE |
| $served_from_cache | 1: HIT on edge <br> 0: MISS on edge | TRUE | TRUE |
| $server_addr | IP address of the edge server | FALSE | TRUE |
| $server_protocol | HTTP/1.1 or HTTP/2.0 | FALSE | TRUE |
| $service_port | port number that received the request | TRUE | TRUE |
| $sorted_querystring_args | variable providing an ASCII-based sorted list of input query parameters; <br> it can be modified by directive 'sorted_querystring_filter_parameter'| TRUE | TRUE |
| $ssl_cipher | TLS cipher suite used | FALSE | TRUE |
| $ssl_protocol | returns protocol name like: TLSv1.1 | FALSE | TRUE |
| $ssl_server_name | TLS SNI servername | FALSE | TRUE |
| $status | HTTP status code to client | TRUE | TRUE |
| $tcpinfo_delivery_rate | TCP connection performance metrics to report the rate at which the sent data is acknowledged in bytes/s | FALSE | TRUE |
| $tcpinfo_min_rtt | minimal rtt observed by TCP stack for the flow in microseconds | FALSE | TRUE |
| $tcpinfo_rtt | RTT in microseconds | FALSE | TRUE |
| $time_rfc822 | current time in RFC822 | TRUE | TRUE |
| $upstream_bytes_received | number of bytes received from an upstream server | TRUE | TRUE |
| $upstream_bytes_sent | number of bytes sent to an upstream server | TRUE | TRUE |
| $upstream_connect_time | keeps time spent on establishing a connection with the upstream server; <br> the time is kept in seconds with millisecond resolution | TRUE | TRUE |
| $upstream_cookie_* | cookie with the specified name sent by the upstream server in the “Set-Cookie” response header field | TRUE | TRUE |
| $upstream_header_time | keeps time spent on receiving the response header from the upstream server; <br> the time is kept in seconds with millisecond resolution | TRUE | TRUE |
| $upstream_http_* | one header received from origin | TRUE | TRUE |
| $upstream_response_length | response length | TRUE | TRUE |
| $upstream_response_time | keeps time spent on receiving the response from the upstream server; <br> the time is kept in seconds with millisecond resolution | TRUE | TRUE |
| $upstream_status | status code from upstream | TRUE | TRUE |
