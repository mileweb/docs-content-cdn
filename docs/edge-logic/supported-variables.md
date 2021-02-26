## Supported Variables

### CDN360-defined Variables

CDN360 Edge Logic supports variables defined by the open-source nginx. In addition, we also introduced the following ones::

| **Variable** | **Description** |
| ---- | ---- |
| $cache_misc | A variable for adding extra information to default cache key |
| $client_real_ip | Client’s IP address |
| $client_country_code | Client’s ISO 3166 country code |
| $client_ip_version | Client IP version |
| $client_http_version | Client HTTP version |
| $client_isp | ISP information based on MaxMind |
| $request_scheme | Scheme used by client |
| $sorted_querystring_arg | Variable providing an ASCII-based sorted list of input query parameters <br> It can be modified by directive 'sorted_querystring_filter_parameter' |
| $tcpinfo_delivery_rate | TCP connection performance metrics to report the rate at which the sent data is acknowledged in bytes per second <br> This delivery rate information can be useful for applications to get the current throughput of the TCP connection |
| $tcpinfo_min_rtt | TCP connection performance metrics to report the minimal rtt observed by TCP stack for the flow in usec unit ｜
| $time_rfc822 | Variable to keep the current time in the RFC822 time zone format <br> - for example: "Mon, 28 Sep 1970 06:00:00 GMT" |

### Alphabetical Index of Variables

[$arg_](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_arg_)
[$args](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_args)
[$body_bytes_sent](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_body_bytes_sent)
[$bytes_received](http://nginx.org/en/docs/stream/ngx_stream_core_module.html#var_bytes_received)
[$bytes_sent](http://nginx.org/en/docs/http/ngx_http_log_module.html#var_bytes_sent) (ngx_http_log_module)
[$cache_misc](<#CDN360-defined-Variables>)
[$client_real_ip](<#CDN360-defined-Variables>)
[$client_country_code](<#CDN360-defined-Variables>)
[$client_ip_version](<#CDN360-defined-Variables>)
[$client_http_version](<#CDN360-defined-Variables>)
[$client_isp](<#CDN360-defined-Variables>)
[$connection](http://nginx.org/en/docs/http/ngx_http_log_module.html#var_connection) (ngx_http_log_module) (RTLog Only)
[$connection_requests](http://nginx.org/en/docs/http/ngx_http_log_module.html#var_connection_requests) (ngx_http_log_module) (RTLog Only)
[$content_length](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_content_length)
[$content_type](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_content_type)
[$cookie_](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_cookie_)
[$date_gmt](http://nginx.org/en/docs/http/ngx_http_ssi_module.html#var_date_gmt)
[$date_local](http://nginx.org/en/docs/http/ngx_http_ssi_module.html#var_date_local)
[$gzip_ratio](http://nginx.org/en/docs/http/ngx_http_gzip_module.html#var_gzip_ratio)
[$host](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_host)
[$hostname](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_hostname) (ngx_http_core_module)
[$http2](http://nginx.org/en/docs/http/ngx_http_v2_module.html#var_http2) (RTLog Only)
[$http_](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_http_)
[$https](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_https) (RTLog Only)
[$invalid_referer](http://nginx.org/en/docs/http/ngx_http_referer_module.html#var_invalid_referer)
[$is_args](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_is_args)
[$limit_rate](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_limit_rate)
[$msec](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_msec) (ngx_http_core_module)
[$msie](http://nginx.org/en/docs/http/ngx_http_browser_module.html#var_msie)
[$nginx_version](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_nginx_version) (ngx_http_core_module)
[$pid](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_pid) (ngx_http_core_module)
[$pipe](http://nginx.org/en/docs/http/ngx_http_log_module.html#var_pipe) (ngx_http_log_module)
[$proxy_add_x_forwarded_for](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#var_proxy_add_x_forwarded_for)
[$proxy_host](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#var_proxy_host)
[$proxy_port](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#var_proxy_port)
[$query_string](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_query_string)
[$remote_user](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_remote_user)
[$request](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_request)
[$request_completion](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_request_completion)
[$request_length](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_request_length) (ngx_http_core_module)
[$request_method](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_request_method)
[$request_scheme](<#CDN360-defined-Variables>)
[$request_time](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_request_time) (ngx_http_core_module)
[$request_uri](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_request_uri)
[$secure_link](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#var_secure_link)
[$secure_link_expires](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#var_secure_link_expires)
[$sent_http_](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_sent_http_)
[$sent_trailer_](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_sent_trailer_)
[$server_addr](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_server_addr) (ngx_http_core_module)(RTLog Only)
[$server_name](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_server_name)
[$slice_range](http://nginx.org/en/docs/http/ngx_http_slice_module.html#var_slice_range)
[$sorted_querystring_arg](<#CDN360-defined-Variables>)
[$ssl_cipher](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_cipher) (ngx_http_ssl_module) (RTLog Only)
[$ssl_ciphers](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_ciphers) (ngx_http_ssl_module) (RTLog Only)
[$ssl_client_escaped_cert](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_client_escaped_cert) (RTLog Only)
[$ssl_client_fingerprint](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_client_fingerprint) (ngx_http_ssl_module)(RTLog Only)
[$ssl_client_i_dn_legacy](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_client_i_dn_legacy) (RTLog Only)
[$ssl_client_raw_cert](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_client_raw_cert) (ngx_http_ssl_module) (RTLog Only)
[$ssl_client_s_dn_legacy](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_client_s_dn_legacy) (RTLog Only) (RTLog Only)
[$ssl_client_serial](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_client_serial) (ngx_http_ssl_module) (RTLog Only)
[$ssl_client_v_end](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_client_v_end) (ngx_http_ssl_module) (RTLog Only)
[$ssl_client_v_remain](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_client_v_remain) (ngx_http_ssl_module) (RTLog Only)
[$ssl_client_v_start](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_client_v_start) (ngx_http_ssl_module) (RTLog Only)
[$ssl_client_verify](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_client_verify) (ngx_http_ssl_module) (RTLog Only)
[$ssl_curves](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_curves) (ngx_http_ssl_module) (RTLog Only)
[$ssl_early_data](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_early_data) (RTLog Only)
[$ssl_protocol](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_protocol) (ngx_http_ssl_module) (RTLog Only)
[$ssl_server_name](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_server_name) (ngx_http_ssl_module) (RTLog Only)
[$ssl_session_id](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_session_id) (ngx_http_ssl_module) (RTLog Only)
[$ssl_session_reused](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#var_ssl_session_reused) (ngx_http_ssl_module) (RTLog Only)
[$status](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_status) (ngx_http_core_module)
[$tcpinfo_delivery_rate](<#CDN360-defined-Variables>)
[$tcpinfo_min_rtt](<#CDN360-defined-Variables>)
[$tcpinfo_rtt](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_tcpinfo_) (RTLog Only)
[$tcpinfo_rttvar](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_tcpinfo_) (RTLog Only)
[$tcpinfo_snd_cwnd](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_tcpinfo_) (RTLog Only)
[$tcpinfo_rcv_space](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_tcpinfo_) (RTLog Only)
[$time_iso8601](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_time_iso8601) (ngx_http_core_module)
[$time_local](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_time_local) (ngx_http_core_module)
[$time_rfc822](<#CDN360-defined-Variables>)
[$upstream_addr](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_addr) (ngx_http_upstream_module)
[$upstream_bytes_received](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_bytes_received) (ngx_http_upstream_module)
[$upstream_bytes_sent](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_bytes_sent) (ngx_http_upstream_module)
[$upstream_cache_status](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_cache_status)
[$upstream_connect_time](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_connect_time) (ngx_http_upstream_module)
[$upstream_cookie_](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_cookie_)
[$upstream_header_time](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_header_time)
[$upstream_http_](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_http_)
[$upstream_queue_time](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_queue_time)
[$upstream_response_length](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_response_length)
[$upstream_response_time](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_response_time)
[$upstream_status](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_status)
[$upstream_trailer_](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_trailer_)
[$uri](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_uri)