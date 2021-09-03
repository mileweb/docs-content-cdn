## 内置变量

下表列出了 CDN360 服务器支持的所有内置变量。您可以在 Edge Logic 或实时日志中使用它们，但请注意并非所有变量都支持配置在这两个地方。 其中<span class="badge small" title="numerical value">#</span>标记表明该内置变量的格式为数字型。当您在调试Edge Logic的过程中需要使用到内置变量时，您可以输入`$`，系统的自动补齐功能将会为您列举出所有当前位置可支持的内置变量。

| **变量名称** | **描述** | **边缘逻辑** | **[实时日志](/docs/portal/edge-configurations/creating-property#real-time-log)** |
| ---- | ---- | ---- | ---- |
| <span id="arg_"></span><span class="var">$arg_<em>name</em></span> | URL问号后参数中的指定参数内容 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="args"></span><span class="var">$args</span> | 请求URL中所有问号后参数内容 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="bytes_received"></span><span class="var">$bytes_received</span> |<span class="badge small" title="numerical value">#</span> 收到的客户端请求大小 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="body_bytes_sent"></span><span class="var">$body_bytes_sent</span> |<span class="badge small" title="numerical value">#</span> 响应给客户端的文件body大小 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="bytes_sent"></span><span class="var">$bytes_sent</span> |<span class="badge small" title="numerical value">#</span> 响应给客户端的数据大小（包含header） | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="cache_misc"></span><span class="var">$cache_misc</span> | 添加到缓存key中的参数 | <span class="badge green">Yes</span> | <span class="badge yellow">No</span> |
| <span id="client_country_code"></span><span class="var">$client_country_code</span> | 客户端的国家码（ISO 3166 格式） | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="client_http_version"></span><span class="var">$client_http_version</span> | 客户端请求的HTTP协议版本，例如 "HTTP/1.1" | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="client_ip_version"></span><span class="var">$client_ip_version</span> | <span class="badge small" title="numerical value">#</span> 客户端IP 版本：4代表IPv4；6代表IPv6 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="client_isp"></span><span class="var">$client_isp</span> | 客户端的ISP运营商信息 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="client_province_code"></span><span class="var">$client_province_code</span> | 客户端的中国城市代码 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="client_real_ip"></span><span class="var">$client_real_ip</span> | 客户端IP | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="connection_requests"></span><span class="var">$connection_requests</span> |<span class="badge small" title="numerical value">#</span> 本次connection中包含的请求次数 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="content_length"></span><span class="var">$content_length</span> |<span class="badge small" title="numerical value">#</span> 请求中 Content-Length 头部的值 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="content_type"></span><span class="var">$content_type</span> | 请求中 Content-Type 头部的值 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="cookie_"></span><span class="var">$cookie_<em>name</em></span> | 客户端请求中指定的cookie参数值 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="dollar_sign"></span><span class="var">$dollar_sign</span> | 代表“$”字段 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="error_code"></span><span class="var">$error_code</span> | error about client and origin | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="host"></span><span class="var">$host</span> | 请求的host头部，和$http_host有相同含义 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="hostname"></span><span class="var">$hostname</span> | CDN服务器别名 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="http_"></span><span class="var">$http_<em>name</em></span> | 客户端请求中指定的请求头参数值 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="http_host"></span><span class="var">$http_host</span> | 请求的host头部，和$host有相同含义 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="invalid_referer"></span><span class="var">$invalid_referer</span> | 用于标记请求Referer的合法性，如“Referer”被判定为合法则值为空 ; 否则值为 “1” | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="is_args"></span><span class="var">$is_args</span> | 当客户端请求携带问号后参数时，值为 "?" ；否则值为空 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="msec"></span><span class="var">$msec</span> |<span class="badge small" title="numerical value">#</span> 当前unix时间戳，精度到毫秒 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="sec"></span><span class="var">$sec</span> |<span class="badge small" title="numerical value">#</span> 当前unix时间戳，精度到秒 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="origin_host"></span><span class="var">$origin_host</span> | 回源时携带的host头部值 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="origin_ip"></span><span class="var">$origin_ip</span> | 源站IP和端口，格式为IP:端口号 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="origin_status_code"></span><span class="var">$origin_status_code</span> | 回源状态码 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="pid"></span><span class="var">$pid</span> | CDN进程ID号 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="pipe"></span><span class="var">$pipe</span> | 如果请求来自管道通信，值为“p”，否则为“.” | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="property_ver"></span><span class="var">$property_ver</span> |<span class="badge small" title="numerical value">#</span> 配置版本号 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="qtl_req_id"></span><span class="var">$qtl_req_id</span> | 请求的唯一标识ID | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="qtl_upstream_cache_status"></span><span class="var">$qtl_upstream_cache_status</span> | [缓存状态](https://www.nginx.com/blog/nginx-caching-guide/#Frequently-Asked-Questions-(FAQ)): HIT, MISS, BYPASS, EXPIRED, STALE, UPDATING, REVALIDATED. | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="realtime_log_ds_factor"></span><span class="var">$realtime_log_ds_factor</span> |<span class="badge small" title="numerical value">#</span> 实时日志采样参数，值为N代表每N个请求会生产1条实时日志| <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="realtime_log_ds_ratio"></span><span class="var">$realtime_log_ds_ratio</span> |<span class="badge small" title="numerical value">#</span> 实时日志采样率，$realtime_log_ds_factor的百分比形式，值为介于0~1之间的小数。 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="remote_user"></span><span class="var">$remote_user</span> | 基础鉴权中的用户名 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="request"></span><span class="var">$request</span> | 完整的http请求行 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="request_cpu_time"></span><span class="var">$request_cpu_time</span> |<span class="badge small" title="numerical value">#</span> 处理该请求时所消耗的CPU时间, 在Edge Logic中被使用时表示Cache层的执行消耗（不包含LB7的分发消耗），当在实时日志中被使用时标识包含LB7层的总执行消耗(ETA: July 2021)，单位为纳秒| <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="request_length"></span><span class="var">$request_length</span> |<span class="badge small" title="numerical value">#</span> 请求的长度 (包括请求的地址, http 请求头和请求主体) | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="request_method"></span><span class="var">$request_method</span> | HTTP 请求方式，例如 ：GET, POST | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="request_scheme"></span><span class="var">$request_scheme</span> | 请求协议，值为"http" 或者 "https" | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="request_time"></span><span class="var">$request_time</span> |<span class="badge small" title="numerical value">#</span> 以毫秒为单位的请求处理时间，标记从客户端读取第一个字节以来经过的时间 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="request_uri"></span><span class="var">$request_uri</span> | 包含问号后参数的客户端请求URI | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="sc_completed"></span><span class="var">$sc_completed</span> |<span class="badge small" title="numerical value">#</span> 如果本次请求的所有数据都已响应给客户端则值为1，否则值为0  | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="sc_initial"></span><span class="var">$sc_initial</span> |<span class="badge small" title="numerical value">#</span> 如果本次请求的第一个字节已响应给客户端则值为1，否则值为0| <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="sent_http_"></span><span class="var">$sent\_http\_<em>name</em></span> | 响应给客户端的指定参数值 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="sent_http_content_length"></span><span class="var">$sent_http_content_length</span> |<span class="badge small" title="numerical value">#</span> 响应给客户端的Content-Length 头部值 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="served_from_cache"></span><span class="var">$served_from_cache</span> |<span class="badge small" title="numerical value">#</span> 如该请求在边缘的命中状态是HIT，则值是1；否则值为0 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="server_addr"></span><span class="var">$server_addr</span> | 边缘服务器的IP地址 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="server_protocol"></span><span class="var">$server_protocol</span> | HTTP/1.1 or HTTP/2.0 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="service_port"></span><span class="var">$service_port</span> |<span class="badge small" title="numerical value">#</span> 接收请求的CDN边缘节点端口号 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="sorted_querystring_args"></span><span class="var">$sorted_querystring_args</span> | 该变量以 ASCII 格式输出排序后的请求URL中的问号后参数内容，它可以通过该配置项进行修改 "[sorted_querystring_filter_parameter](/docs/edge-logic/supported-directives#sorted_querystring_filter_parameter)" directive | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="ssl_cipher"></span><span class="var">$ssl_cipher</span> | 本次SSL请求中所使用的 TLS 加密套件 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="ssl_cpu_time"></span><span class="var">$ssl_cpu_time</span> |<span class="badge small" title="numerical value">#</span> 处理该请求时，在ssl握手阶段所消耗的CPU时间，单位为纳秒 (ETA: July 2021)| <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="ssl_protocol"></span><span class="var">$ssl_protocol</span> | SSL握手协议， 例如"TLSv1.1" | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="ssl_server_name"></span><span class="var">$ssl_server_name</span> | TLS中SNI携带的servername| <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="status"></span><span class="var">$status</span> | 响应给客户端的HTTP状态码 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="tcpinfo_delivery_rate"></span><span class="var">$tcpinfo_delivery_rate</span> |<span class="badge small" title="numerical value">#</span> 客户端接收数据的速率，单位为bytes/s | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="tcpinfo_min_rtt"></span><span class="var">$tcpinfo_min_rtt</span> |<span class="badge small" title="numerical value">#</span> 本次请求中由tcp协议栈统计到的最小RTT, 单位为微妙 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="tcpinfo_rtt"></span><span class="var">$tcpinfo_rtt</span> |<span class="badge small" title="numerical value">#</span> 本次请求中由tcp协议栈统计到的最后一次RTT, 单位为微妙 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="time_http"></span><span class="var">$time_http</span> | RFC 7231格式下的当前系统时间，可用于响应中的Date 头部值 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="upstream_bytes_received"></span><span class="var">$upstream_bytes_received</span> |<span class="badge small" title="numerical value">#</span> 从中间层节点或者源站收到的回上层数据大小，单位为bytes | <span class="badge green">Yes</span> | <span class="badge yellow">No</span> |
| <span id="upstream_bytes_sent"></span><span class="var">$upstream_bytes_sent</span> |<span class="badge small" title="numerical value">#</span> 向中间层节点或者源站发送的请求数据大小，单位为bytes | <span class="badge green">Yes</span> | <span class="badge yellow">No</span> |
| <span id="upstream_connect_time"></span><span class="var">$upstream_connect_time</span> |<span class="badge small" title="numerical value">#</span> 向中间层或者源站发起请求时的建联时间，单位为微秒 | <span class="badge green">Yes</span> | <span class="badge yellow">No</span> |
| <span id="upstream_cookie_"></span><span class="var">$upstream\_cookie\_<em>name</em></span> | 从中间层或者源站拿到的cookie值，通常该值会以"Set-Cookie"的形式传递，可能源自中间层的HIT已缓存数据 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="upstream_header_time"></span><span class="var">$upstream_header_time</span> |<span class="badge small" title="numerical value">#</span> 从中间层或者源站请求数据时，接收响应header过程消耗的时间，单位为微秒 | <span class="badge green">Yes</span> | <span class="badge yellow">No</span> |
| <span id="upstream_http_"></span><span class="var">$upstream\_http\_<em>name</em></span> | 从中间层或者源站拿到的响应头，可能源自中间层的HIT已缓存数据 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
| <span id="upstream_response_status"></span><span class="var">$upstream_response_status</span> | 从中间层或者源站拿到的响应状态码，如本请求没有发起回源则该变量值为0 | <span class="badge green">Yes</span> | <span class="badge yellow">No</span> |
| <span id="upstream_response_time"></span><span class="var">$upstream_response_time</span> |<span class="badge small" title="numerical value">#</span> 从中间层或者源站获取完整响应数据所消耗的时间，单位为微秒 | <span class="badge green">Yes</span> | <span class="badge yellow">No</span> |
| <span id="upstream_server_type"></span><span class="var">$upstream_server_type</span> | 'O' 代表回源站; 'C' 代表回中间层节点. | <span class="badge green">Yes</span> | <span class="badge yellow">No</span> |
| <span id="upstream_trailer_"></span><span class="var">$upstream\_trailer\_<em>name</em></span> | 由上层添加的trailer头部值，通常该值会通过上层的[add_trailer](/docs/edge-logic/supported-directives#add_trailer) 配置项设置 | <span class="badge yellow">No</span> | <span class="badge green">Yes</span> |
| <span id="uri"></span><span class="var">$uri</span> | [归一化的](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)请求uri，不包含query string。在边缘逻辑里，其值会被"[rewrite](/docs/edge-logic/supported-directives#rewrite)"指令修改。 | <span class="badge green">Yes</span> | <span class="badge green">Yes</span> |
