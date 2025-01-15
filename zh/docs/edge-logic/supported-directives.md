## 支持的指令

这一页列出了您可以在CDN Pro的边缘逻辑和7层负载均衡器(LB7)逻辑里使用的全部指令。部分指令是未经修改的开源版本，部分指令经过了我们的<span class="badge green">修改增强</span>以更好地满足CDN服务的需求。同时我们也引入了大量<span class="badge primary">全新特有</span>的指令来完善开源版本作为CDN服务器的不足。

在下面的文档里，我们为所有非特有的指令提供了到开源版公开文档的直接链接。每一个被修改增强过的指令，我们都提供了详细的描述，包括新增的功能，参数，以及对参数取值范围的限制。

以下列表中，标记为<span class="badge">标准</span>的指令对所有的客户都开放。它们应该可以满足绝大部分常见的CDN配置需求。标记为<span class="badge dark">高级</span>的指令通常会消耗更多的资源。对于这些指令，我们需要逐一审核来明确需求。如果您需要用到这些指令，请联系客服。您有可能需要为它们额外付费。

**注意:** 由于边缘节点架构升级，7层负载均衡器逻辑即将被废弃。请避免使用7层负载均衡器逻辑。所有支持的指令应全部在边缘逻辑中配置。更多信息，请查看[该文档](</docs/edge-logic/edge-node-structure-upgrade.md>)。

### [`add_header`](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header)

<span class="badge">标准</span> <span class="badge green">修改增强</span> <span class="badge">LBLogic</span>

**使用语法：** `add_header name value [policy=...] [if(...)] [always];`<br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if in location

本指令的功能是修改发往客户端的响应头部。默认只在状态码为200, 201, 204, 206, 301-304, 307 或 308时生效。当配置了'always'参数时，则对全部状态码生效。我们在[开源版本](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header)的基础上做了如下重大改进:

1. 引入了```policy=```参数来更精确地控制指令的行为:
```nginx
add_header X-My-Header $header_value policy=repeat|overwrite|preserve
```
```overwrite```: 添加一个头部。如果该头部名称已经存在，则覆盖原有的值。如果value是空字符串，则会将该头部删除。

```preserve```: 如果头部名称不存在，则添加。否则不做任何操作，保留原头部不变。

```repeat```: (默认行为) 添加一个头部。如果该头部名称已经存在，则新增一条。不支持新增以下头部。如果在边缘逻辑中指定重复添加以下任何头部，加速项目的验证会失败。

Server, Date, Content-Encoding, Location, Refresh, Last-Modified, Content-Range, Accept-Ranges, WWW-Authenticate, Expires, ETag, Content-Length, Content-Type, Transfer-Encoding, Connection, Keep-Alive, Accept, Accept-Charset, Accept-Encoding, Accept-Language, Age, Allow, Authorization, Content-Language, Content-Location, Content-MD5, Expect, From, Host, If-Match, If-Modified-Since, If-None-Match, If-Range, If-Unmodified-Since, Max-Forwards, Pragma, Proxy-Authenticate, Proxy-Authorization, Range, Referer, Retry-After, If-Match, TE, Trailer, Upgrade, User-Agent, Vary


**局限：** 对于下面这几个“特殊”头部，本指令的行为是固定的，不受policy参数的控制：

| **"特殊"头部名称** | **行为** |
| ---- | ---- |
| ```Cache-Control``` | ```repeat``` |
| ```Link``` | ```repeat``` |
| ```Last-Modified``` | ```overwrite``` |
| ```ETag``` | ```overwrite``` |
| ```Transfer-Encoding``` | ```preserve``` |
| ```Connection``` | ```preserve``` |
| ```Keep-Alive``` | ```preserve``` |


如果需要的话，可以使用[proxy_hide_header](#proxy_hide_header)指令来删除从源站收到的 "Cache-Control"或"Link"响应头部。

使用举例:
```nginx
add_header X-Cache-Status $upstream_cache_status policy=preserve;
```
使用变量的例子:
```nginx
set $cache_status_method "preserve";  
if ($arg_debug = cache_status) {
    set $cache_status_method "overwrite";
}
add_header X-Cache-Status $upstream_cache_status policy=$cache_status_method;
```

2. 引入了```if(condition)```参数来控制本指令生效的条件。只有当条件为真的时候，本指令才会修改发往客户端的头部，否则完全不起作用。这个```if()```参数必须出现在本指令的末尾。```condition```可以是如下条件表达式:

*   变量名，如果该变量不存在或者其值为‘0’或空，则条件不成立，否则条件成立；
*   用"="或者"!="来比较一个变量是否等于一个字符串；
*   用"\~"(区分大小写)或者"\~\*"(不区分大小写)来对一个变量进行正则匹配。也支持用"!\~"或者"!\~\*"来进行反向匹配。请注意如果正则表达式包含‘}’或‘;’字符，则需要用引号来包裹该表达式。

使用举例:
```nginx
add_header X-Upstream-Status-OK 1 if($upstream_response_status = 200);
add_header X-Status-Good 1 if($upstream_response_status ~ ^[23]);
```

3. 针对该指令的另一个改进是支持合并不同层级(server/location/if)里的配置。但是如果同一个头部名称出现在了不同的层级里，则只有最内层的配置会生效。

### [`add_trailer`](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_trailer)

<span class="badge">标准</span> <span class="badge green">修改增强</span>

**使用语法：** `add_trailer name value [always];`<br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if in location

该指令可用于在响应正文之后添加一个尾部（trailer）。默认只在状态码为200, 201, 206, 301, 302, 303, 307或308时生效。当携带 “always” 参数时，则对所有状态码生效。参数 value 可以是变量。CDN Pro 在 [开源版本](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_trailer) 的基础上做了如下修改和增强：

1. 该指令的主要设计用途是可以在边缘逻辑里传递一些数据给7层负载均衡器，从而使实时日志可以用 [$upstream\_trailer\_*](/cdn/docs/edge-logic/built-in-variables#upstream_trailer_) 变量来获取这些数据。尽管大部分的数据都可以用 [`add_header`](#add_header) 指令通过响应头来传递，有些数据在生成响应头时还并不存在，比如：[$upstream_bytes_received](/cdn/docs/edge-logic/built-in-variables#upstream_bytes_received)，[$upstream_bytes_sent](/cdn/docs/edge-logic/built-in-variables#upstream_bytes_sent)，[$upstream_response_time](/cdn/docs/edge-logic/built-in-variables#upstream_response_time)，[$request_cpu_time](/cdn/docs/edge-logic/built-in-variables#request_cpu_time)。这些数据必须要等到响应正文结束以后才完整。使用本指令是唯一可以将这些数据传递给实时日志的方法。

2. 如果来自源站的响应携带有 `Content-Length` 头，开源版本会将其去掉，并且把 `Transfer-Encoding` 改成 “chunked”。CDN Pro 修改了这个逻辑以确保客户端收到的响应保持正常编码，并仍然携带 `Content-Length` 头。本指令添加的尾部并不会出现在发给客户的响应里。

### [`allow`](http://nginx.org/en/docs/http/ngx_http_access_module.html#allow)

<span class="badge">标准</span> <span class="badge green">修改增强</span> <span class="badge">LBLogic</span>

**使用语法：** `allow address | CIDR | all;`<br/>
**默认设置：** `-` <br/>
**可用位置：** server, location

允许来自指定的网址或者网段的客户访问，该指令通常会和 [`deny`](#deny) 指令一起使用。
CDN Pro 在 [nginx 开源版本](http://nginx.org/en/docs/http/ngx_http_access_module.html#allow) 基础上上进行了部分代码优化，使其能更好地适配 CDN 分层缓存结构。


### [`auth_request`](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request)

<span class="badge dark">高级</span> <span class="badge green">修改增强</span>

**使用语法：** `auth_request uri | off`;<br/>
**默认设置：** `auth_request off;`<br/>
**可用位置：** server, location

本指令支持指定一个URI路径来进行访问控制。CDN Pro 服务器将发起针对该 URI 的鉴权子请求，并根据该子请求的结果对原始请求进行访问控制。我们对 Nginx [开源版本](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request)做了改进以允参数里包含变量。这使得用户可以把URL里的参数传递给鉴权逻辑：
```nginx
auth_request /auth$is_args$args;
```
如果鉴权响应 2xx 状态码，则认为请求合法，如果响应 401 或者 403 则请求会被拒绝。其它状态码会被认为是错误，导致客户端收到 500 "internal error"。

### [`auth_request_set`](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request_set)

<span class="badge dark">高级</span>

**使用语法：** `auth_request_set $variable value;`<br/>
**默认设置：** `—`<br/>
**可用位置：** server, location

须与 [`auth_request`](#auth_request) 指令一起使用，在鉴权子请求完成后将响应中的某些数据值（如响应头，状态码等）赋值给变量。代码逻辑源自 Nginx [开源版本](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request_set)，无改动。下面的例子展示了如何将远端鉴权服务器返回的 etag 值加入到 cache key 里：
```nginx
auth_request /auth$is_args$args;
auth_request_set $cache_misc $cache_misc.etag=$upstream_http_etag;

location = /auth {
  internal;
  proxy_method HEAD;
  # 配置鉴权服务器和URI
  origin_pass remote_auth_server/auth-req$is_args$args;
  # 将客户端请求URI发给鉴权服务器
  origin_set_header client-request-uri $request_uri;
}
```

### [`break`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#break)

<span class="badge">标准</span>

**使用语法：** `break;`<br/>
**默认设置：** `—`<br/>
**可用位置：** server, location, if

终止执行当前 nginx [rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)的指令。代码逻辑源自 Nginx 开源版本，无改动。
该指令属于 nginx [rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)。在 CDN Pro 对请求处理的早期阶段中，它将与同一模块中的其他指令一同被执行。

**注意:** 如果一个 [location](#location) 中包含了 break 指令，它有可能使之后的"[return](#return)"指令失效。因此我们要求该 location 必须直接包含一个 [origin_pass](</docs/edge-logic/supported-directives.md#origin_pass>) 指令来确保正确生成响应。

### [`brotli`](https://github.com/google/ngx_brotli#brotli)

<span class="badge dark">高级</span>

**使用语法:** `brotli on|off;`<br/>
**默认设置:** `brotli off;` <br/>
**可用位置:** server, location, if

开启或关闭对响应进行即时压缩。 

### [`brotli_types`](https://github.com/google/ngx_brotli#brotli_types)

<span class="badge dark">高级</span>

**使用语法:** `brotli_types <mime_type> [...];`<br/>
**默认设置:** text/html <br/>
**可用位置:** server, location

指定对什么MIME类型的响应进行即时压缩。 可以指定 * ，表示匹配任何MIME类型。 text/html类型的响应总会被压缩。

尽管当前支持使用 [`gzip_types`](#gzip_types) 和 `brotli_types`指令给gzip和br压缩算法指定不同的MIME类型，在不久的将来我们计划将gzip和br压缩适用的MIME类型做合并。如果您同时开启了gzip和br压缩，建议给`gzip_types` 和 `brotli_types`设置相同的MIME类型值。

### `client_body_timeout`

<span class="badge dark">高级</span> <span class="badge green">修改增强</span>

**使用语法：** `client_body_timeout time;`<br/>
**默认设置：** 匹配 `origin_send_timeout` 的设置（如果存在），或 20s<br/>
**可用位置：** server

该指令用于设置 CDN Pro 边缘服务器从客户端接收请求正文时的最长空闲等待时间。如果您需要在加速项中更改它的默认值，请联系我们的技术支持团队。可设最大值为 60 秒。


### `client_header_timeout`

<span class="badge dark">高级</span> <span class="badge green">修改增强</span>

**使用语法：** `client_header_timeout time;`<br/>
**默认设置：** `client_header_timeout 10;`<br/>
**可用位置：** server

该指令设置 CDN Pro 边缘服务器从客户端接收完整请求头的最长空闲等待时间。如果您需要在加速项中更改它的默认值，请联系我们的技术支持团队。可设最大值为 60 秒。请注意，该配置对`Host` 请求头无效，因为CDN Pro 服务器需要其值来确定对应的Edge Logic。如果在 10 秒内没有收到来自客户端的 `Host` 请求头，CDN Pro 服务器将关闭连接。

### [`client_max_body_size`](http://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size)

<span class="badge dark">高级</span> <span class="badge">LBLogic</span>

**使用语法:** `client_max_body_size size;`<br/>
**默认设置:** `client_max_body_size 128m;`<br/>
**可用位置:** server, location

设置允许的最大请求正文。如果请求正文超过此大小，则向客户端返回错误码413 (Request Entity Too Large)。请注意部分浏览器无法正确显示该错误。 如果把 size 配置成 0 则会停止检查请求正文大小。

一般来说，您需要在 Load Balancer 和 Edge Logic 里同时配置本指令。

### `client_send_timeout`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `client_send_timeout time;`<br/>
**默认设置：** matches `origin_read_timeout` if it is set, or 20s <br/>
**可用位置：** server

该指令与开源版本的 [`send_timeout`](http://nginx.org/en/docs/http/ngx_http_core_module.html#send_timeout) 指令非常相似，用于设置向客户端发送响应时的最大空闲等待时间。如果您需要在加速项中更改它的默认值，请联系我们的技术支持团队。可设最大值为 60 秒。

### `custom_log_field`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span> <span class="badge">LBLogic</span>

**使用语法：** `custom_log_field id value;`<br/>
**默认设置：** `-`<br/>
**可用位置：** server, location, if in location

该指令允许您将最多 2 个自定义字段添加到访问日志中。id的值可以是1或者2，value的值可以包含变量。您在自定义日志下载格式，或使用我们的高级分析工具时，可以通过关键字 “custom_1” 和 “custom_2” 来引用这两个字段。当同一个字段同时在 LB7 和 ES 里被定义，LB7 有优先权。 如果您需要开启此功能，请联系我们的技术支持团队。

示例:
```nginx
location / {
  custom_log_field 1 $http_x_data; # 将请求头X-Data的值保存到custom_1
  custom_log_field 2 $cookie_abc; # 将cookie abc的值保存到custom_2
  ...
}
```

### [`default_type`](http://nginx.org/en/docs/http/ngx_http_core_module.html#default_type)

<span class="badge">标准</span> <span class="badge">LBLogic</span>

**使用语法:** `default_type <mime-type>;`<br/>
**默认设置:** `default_type application/octet-stream`<br/>
**可用位置:** server, location

设置给客户端的响应的默认类型。代码逻辑源自 Nginx 开源版本，除了默认值，无其它改动。
Defines the default MIME type of a response. No change to the public version, except the default value.

### [`deny`](http://nginx.org/en/docs/http/ngx_http_access_module.html#deny)

<span class="badge">标准</span> <span class="badge green">修改增强</span> <span class="badge">LBLogic</span>

**使用语法：** `deny address | CIDR | all;`<br/>
**默认设置：** `—`<br/>
**可用位置：** server, location

拒绝（返回 403）来自指定网络或地址的访问请求。该指令通常与 [`allow`](#allow) 一起使用。 CDN Pro 在 [nginx 开源版本](http://nginx.org/en/docs/http/ngx_http_access_module.html#deny) 基础上进行了部分代码优化，使其能更好适配 CDN 分层缓存结构。

### `enable_websocket`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `enable_websocket;`<br/>
**默认设置：** `-`<br/>
**可用位置：** server, location

该指令用于开启 WebSocket 协议。客户端需要使用HTTP/1.1来与服务端通信，不能用其它HTTP协议版本。默认读取和发送超时设置为 60 秒，您也可以使用 `origin_read_timeout` 或 `origin_send_timeout` 指令修改超时时间。

### [`error_page`](http://nginx.org/en/docs/http/ngx_http_core_module.html#error_page)

<span class="badge dark">高级</span>

**使用语法：** `error_page code ... uri;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if in location

本指令允许您将源站的响应状态码作为条件来跳转到一个指定的URI。本指令可依照以下顺序，携带3组参数：
第一组：（必填项）作为判定条件的一个或多个原始状态码，以空格隔开。比如 "400 401 402 403 404 406 501 502 503 504"；
第二组：（非必填）设置一个新的响应状态码，格式为 "=200"。也可以用 "=" 使用新的URI返回的状态码；
第三组：（必填项）设置新的响应正文，格式为 URI 或者一个完整的 URL。比如 "@error"(named URI) 或 "http://www.abc.com" (完整URL)。当使用完整 URL 时，会把响应状态码改为302（除非第二组参数为 "=301"，则新响应状态码为301，其余情况下皆为302）。；
代码逻辑源自 [Nginx 开源版本](http://nginx.org/en/docs/http/ngx_http_core_module.html#error_page)无改动。 同时 CDN Pro 默认开启了 [`proxy_intercept_errors on`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_intercept_errors) 来支持将源的响应状态码作为判断条件。

例如，下述指令可以在第一个源站返回状态码 401或403 时尝试第二个源站：
```nginx
location /abc {
  origin_pass my-origin1;
  error_page 401 403 = @try_origin2;
}
location @try_origin2 {
  origin_pass my-origin2;
}
```

### `eval_func`

<span class="badge">标准</span> <span class="badge primary">全新特有</span> <span class="badge">LBLogic</span>

**使用语法：** `eval_func $result {function name} {parameters};` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if

该指令用于执行一些常见的编码、解码、哈希计算、HMAC、加解密和变量对比操作。CDN Pro将其添加到了[rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html) 中。目前支持的功能有：

| **Type** | **Name** | **Syntax** |
|----------|----------|------------| 
| 计算哈希值 | **SHA256**, **MD5**<br>CRC32 | ```eval_func $output SHA256 $input;```<br>SHA256 和 MD5 返回二进制串; CRC32 返回文本串|
| BASE64<br>编解码 | BASE64_ENCODE<br>**BASE64_DECODE** | ```eval_func $output BASE64_ENCODE $input;``` |
| URL<br>编解码 | URL_ENCODE<br>URI_ESCAPE<br>ARG_ESCAPE<br>**URL_DECODE** | ```eval_func $output URL_ENCODE $input;```<br>```eval_func $output URI_ESCAPE $input;```<br>```eval_func $output ARG_ESCAPE $input;```<br>这三个函数都使用百分号(```%```)对 ```$input``` 进行编码。```URL_ENCODE``` 转义最多的特殊字符，包括 ```/?=&```。它适用于对 URL 里的一个目录或者文件名进行编码。```ARG_ESCAPE``` 转义的特殊字符要少一些。它不转义 ```/=```，因此适用于对查询串的参数进行编码，如 ```key=val```。```URI_ESCAPE``` 转义的特殊字符更少，但是它仍转义问号(```?```)。它适用于对不包含查询串的整个URL进行编码，比如 nginx 变量```$uri```。|
| HEX<br>编解码 | HEX_ENCODE<br>**HEX_DECODE**<br>**LITTLE_ENDIAN_BYTES** | ```eval_func $output HEX_ENCODE $input;```<br>```eval_func $output LITTLE_ENDIAN_BYTES $int $len;```<br>```LITTLE_ENDIAN_BYTES``` 会将整数 ```$int``` 从字符串格式转换为一个长度为 ```$len``` 的字节串。例如 ```eval_func $output LITTLE_ENDIAN_BYTES 260 3;``` 会把 ```$output``` 赋值为一个长度为3的字节串：```0x04, 0x01, 0x00```。|
| AES<br>加解密 | **ENCRYPT_AES_256_CBC**<br>**DECRYPT_AES_256_CBC** |```eval_func $output ENCRYPT_AES_256_CBC $key $iv $message;```<br>```$key```和```$iv```都应为32字节的二进制串。|
| 加解密 | **ENCRYPT_SYMM**<br>**DECRYPT_SYMM** | ```eval_func $output ENCRYPT_SYMM $key $iv $message $mode;```<br>```$key```和```$iv```都应为二进制串。```$mode```可以是 *openssl list -cipher-commands* 返回的任意一个密码，例如'aes-128-cbc'。|
| 计算<br>HMAC | **HMAC**<br>**HMAC_HEXKEY** | ```eval_func $output HMAC $key $message {dgst-alg};```<br>```eval_func $output HMAC_HEXKEY $hexkey $msg {dgst-alg};```<br>```{dgst-alg}``` 可以是 ```MD5```, ```SHA1```, ```SHA256``` |
| RSA<br>签名 | **RSA_SIGN**<br>RSA_VERIFY | ```eval_func $sig RSA_SIGN {dgst-alg} $msg $privkey;```<br>```eval_func $ok RSA_VERIFY {dgst-alg} $msg $sig $pubkey;```<br>```{dgst-alg}``` 目前只支持 ```SHA256```。|
| 比较<br>整数 | COMPARE_INT | ```eval_func $output COMPARE_INT $data1 $data2;```<br>```当 ```$data1 > $data2```时 $output``` 的值为 "1"，相等时为 "0"，小于时为 “-1”。|
| 整数<br>计算器 | CALC_INT | ```eval_func $output CALC_INT "$integer + 1000";```<br>计算这个表达式并把结果赋予 ```$output```. 仅支持整数的 +, -, *, / 操作。非法的输入表达式会导致结果为 "NAN"。|
| 整数<br>绝对值 | ABS_INT | ```eval_func $output ABS_INT $integer;```<br>```$output``` 会被赋予 ```$integer``` 的绝对值。非法输入会导致结果为空。|
| 字符串<br>替换 | REPLACE | ```eval_func $output REPLACE <old> <new> $input;``` |
| 字符串<br>修改 | TO_UPPER | ```eval_func $output TO_UPPER $input;```<br>把输入字符串转成大写。|
| 字符串<br>修改 | TO_LOWER | ```eval_func $output TO_LOWER $input;```<br>把输入字符串转成小写。|
| 字符串<br>修改 | SUBSTR | ```eval_func $output SUBSTR <start> <length> $input;```<br>获取输入字符串的一个子串，长度为```<length>```，起始位置为```<start>```。```<start>```可以是一个负数，就像Javascript的[substr()](https://www.w3schools.com/jsref/jsref_substr.asp)函数一样。|
| 一日之内<br>的时间| DAY_PERIOD| ```eval_func $out DAY_PERIOD 19:00+0800 12h CN-night;```<br>如果时间在19:00+0800之后的12小时内，则返回'CN-night'，否则返回空字符串。|

**注意:** 使用**加粗字体** 标记的函数的输出值是一个可能无法打印的二进制字符串。因此您需要使用 BASE64_ENCODE、URL_ENCODE 或 HEX_ENCODE 将其转换为可打印格式。

样例：
```nginx
    eval_func $secret_key SHA256 "mySecret123!";
    eval_func $text HEX_ENCODE $secret_key;
    #the value of $text should be 
    #"ad8fdcda140f607697ec80a8c38e86af19f4bb79ee7f7544abcfaadd827901af"
    eval_func $aseout ENCRYPT_AES_256_CBC $secret_key $iv $message;
    eval_func $hmacout HMAC $secret_key $message SHA256;
    eval_func $hmacout1 HMAC_HEXKEY $text $message SHA256;
    #$hmacout and $hmacout1 should be equal
```
该指令属于 nginx [rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)。在 CDN Pro 对请求处理的早期阶段中，它将与同一模块中的其他指令一同被执行。

### [`expires`](http://nginx.org/en/docs/http/ngx_http_headers_module.html#expires)

<span class="badge">标准</span>

**使用语法：** `expires time;
           expires epoch | max | off;` <br/>
**默认设置：** `expires off;` <br/>
**可用位置：** server, location, if in location


该指令用于控制 CDN Pro 根据所配时长，在发给客户的响应中添加并修改“ Expires ”和“ Cache-Control ”头部。代码逻辑源自 [NGINX 开源版本](http://nginx.org/en/docs/http/ngx_http_headers_module.html#expires) ，无改动。该指令仅影响发送到客户端的响应头，它不会改变CDN Pro本身对内容的缓存时间。

### [`gzip`](https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip)

<span class="badge">标准</span>

**使用语法:** `gzip on|off;` <br/>
**默认设置:** `gzip on;` <br/>
**可用位置:** server, location, if in location

该指令用于开启或者关闭 CDN Pro 的自动压缩响应功能。源自 [NGINX 开源版本](https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip)，无改动。

### [`gzip_types`](http://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_types)

<span class="badge dark">高级</span> <span class="badge green">修改增强</span>

**使用语法：** `gzip_types <mime-type> [...];` <br/>
**默认设置：** `gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/javascript application/xml;` <br/>
**可用位置：** server, location

CDN Pro 默认支持上述 MIME 类型文件（匹配不区分大小写）的 gzip 压缩响应（仅当响应正文大小大于 1000 字节时才压缩功能才会生效）。该默认行为应该适用于大多数用户。
该指令可用于对其他类型启用压缩。CDN Pro 对开源版本进行了改进以支持形如 `text/*` 和 `*javascript` 的前、后缀模糊匹配。该指令最多支持20个模糊匹配参数。

尽管当前支持使用 `gzip_types` 和 [`brotli_types`](#brotli_types)指令给gzip和br压缩算法指定不同的MIME类型，在不久的将来我们计划将gzip和br压缩适用的MIME类型做合并。如果您同时开启了gzip和br压缩，建议给`gzip_types` 和 `brotli_types`设置相同的MIME类型值。

### [`if/elseif/else`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#if)

<span class="badge">标准</span> <span class="badge green">修改增强</span> <span class="badge">LBLogic</span>

**使用语法：** `if (condition) { ... }
           elseif (condition) { ... }
           else {...}`<br/>
**默认设置：** `—`<br/>
**可用位置：** server, location

根据指定条件控制 CDN Pro 配置的执行流程。使用之前请确保您完全了解 [rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#if) 控制流的工作原理。为此我们还编写了[使用指导](</docs/edge-logic/multiple-origins.md#ifcaution>)，并在其中推荐了关于该指令的最佳使用方式。同时 CDN Pro 对该指令进行了一些重大改进：

*  支持`&&` 运算符，用于执行子条件的逻辑“与”判断。例如：

```nginx
if ($http_x = 1 && $http_y != 2abc && $http_z) { ... }
```
*  支持`||` 运算符，用于执行子条件的逻辑“或”判断。例如：
```nginx
if ($http_x = 1 || $http_y != 2abc && $http_z) { ... }
```
请注意，当被一起使用时，`&&` 的优先级高于`||`。该指令不支持使用括号对子条件进行分组。
我们最多支持 9 个子条件的判断，edge logic的执行逻辑会智能跳过不影响最终结果的子条件。
*  支持字符串前缀匹配。 如果变量`$s1` 的值以 `$s2`开始，那么判断条件 `$s1 ^ $s2` 将会返回 true 。 `$s1 !^ $s2` 将会返回 false.
*  支持用 `<`、`<=`、`>`、`>=` 进行整数值比较。请确保两个操作数都是有效整数，否则结果将是 `false`。有效整数可以是十进制数字或者是前缀为“0x”的十六进制数字。
*  支持多个 `elseif` 和 `else` 语法。例如：
```nginx
if ($http_x = 1) { ... }
elseif ($http_x = 2) { ... }
elseif ($http_x >= 0xa) { ... }
else { ... }
```
该指令属于 nginx [rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)。在 CDN Pro 对请求处理的早期阶段中，它将与同一模块中的其他指令一同被执行。

### `ignore_invalid_range`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法:** `ignore_invalid_range on|off;` <br/>
**默认设置:** `ignore_invalid_range off;` <br/>
**可用位置:** server, location <br/>

指定是否应忽略无效的Range请求头。 开启时，无效的Range请求头将被忽略，向客户端返回200状态码和完整内容。 否则，客户端将收到 416 状态码。

### [`internal`](http://nginx.org/en/docs/http/ngx_http_core_module.html#internal)

<span class="badge">标准</span>

**使用语法：** `internal;` <br/>
**默认设置：** `—` <br/>
**可用位置：** location <br/>

指定某个 location 块内的逻辑只能用于内部请求，不允许被客户端直接访问。代码逻辑源自 Nginx 开源版本，无改动。

### [`keepalive_timeout`](http://nginx.org/en/docs/http/ngx_http_core_module.html#keepalive_timeout)

<span class="badge">标准</span> <span class="badge">LB logic</span>

**Syntax:** `keepalive_timeout timeout [header_timeout];`<br/>
**Default:** `keepalive_timeout 30s;`<br/>
**Context:** server (仅限在LB7)

第一个参数设置 CDN Pro 服务器与客户端 keep-alive 连接的最长空闲超时。CDN Pro 服务器会关闭空闲过长的连接。设置为 0 将会禁用 keep-alive 连接。第二个参数（非必填）用于设置 “Keep-Alive: timeout=time” 这个响应头里的值。这两个参数的数值可以不同，但皆不能超过300s。

### [`limit_rate`](http://nginx.org/en/docs/http/ngx_http_core_module.html#limit_rate)

<span class="badge">标准</span>

**使用语法：** `limit_rate rate;` <br/>
**默认设置：** `limit_rate 32m;` <br/>
**可用位置：** server, location, if in location

限制对客户端的响应传输速率，以字节/秒为单位。可配范围为 [0-32]m 或 [0-32768]k。默认值为 32MByte/s。

### [`limit_rate_after`](http://nginx.org/en/docs/http/ngx_http_core_module.html#limit_rate_after)

<span class="badge">标准</span>

**使用语法：** `limit_rate_after size;` <br/>
**默认设置：** `limit_rate_after 4m;` <br/>
**可用位置：** server, location, if in location

响应正文给客户端时，配置值以内的正文将不进行限速，超过配置的值之后的响应的将受到速率限制。可配范围为 [1-8]m，单位为字节。

### [`location`](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)

<span class="badge">标准</span>

**使用语法：** `location [ = | ~ | ~* | ^~ ] pattern { ... }` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location

按照请求 URI(不带问号后参数) 进行分类匹配，并在 {} 中设置此类请求的处理逻辑。代码源自[NGINX 开源版本](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)，无变更。为了确保CDN Pro 服务器能正确生成响应，我们要求每个 [locaiton](#location) 里须直接（不在嵌套的if或location里）包含一个 [return](#return) 或者 [origin_pass](#origin_pass) 指令。如果一个 location 里包含了 [break](#break) 指令，则其必须直接包含 origin_pass。

### `origin_connect_timeout`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `origin_connect_timeout time;` <br/>
**默认设置：** `origin_connect_timeout 5s;` <br/>
**可用位置：** server

该指令是 [proxy_connect_timeout](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_connect_timeout) 的增强版本。它设置了 CDN Pro 服务器与源站建立连接的超时时间。该值仅限于 [1,15] 中的整数，后跟“s”。 CDN Pro 已确保回源链路上所有节点都遵守此超时值。该指令不能出现在 location 配置块中。


### `origin_fast_route`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `origin_fast_route on|off;` <br/>
**默认设置：** `origin_fast_route off;` <br/>
**可用位置：** server, location, if in location

该指令用于在访问源站时开启使用**快速路由**功能。此功能由我们专有的 HDT 技术提供支持，可提供更稳定的连接并减少延迟。通过**快速路由**传输的回源流量可能会被收取比边缘流量更高的费率。通过**快速路由**传输的流量限速3 MByte/s。如果您需要提高速率，请联系我们的技术支持。


### `origin_follow_redirect`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `origin_follow_redirect;` <br/>
**默认设置：** - <br/>
**可用位置：** location

当源站响应 30x 状态码并携带一个 Location 跳转地址时，您或许希望 CDN360 继续对这个地址发起请求直至获取到实际的响应文件，然后再进行缓存和客户端响应。如果将跳转地址传递给客户端来发起新请求会导致更长的时间来获取最终内容。如果需要实现上述行为，您可以在任意一个配置了 [origin_pass](</docs/edge-logic/supported-directives.md#origin_pass>) location 块中使用本指令。

### `origin_header_modify`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `origin_header_modify field value policy=value if(condition);` <br/>
**默认设置：**  - <br/>
**可用位置：** server, location, if in location

该指令可用于在所有其他处理**之前**对源站的响应头进行添加、删除或者改写。换句话说，其他指令看到的源站响应头部和值都可能受到该指令的影响。该指令支持使用 nginx 变量作为配置值。

policy 的可能取值是 ```repeat```,```overwrite```, 以及 ```preserve```。 默认的策略是```repeat```。

*   ```repeat``` 不管指定响应头原先是否存在，强制添加响应头部和值到上游响应中。不支持重复添加以下头部。如果在边缘逻辑中指定重复添加以下任何头部，加速项目的验证会失败。

Status, Content-Type, Content-Length, Date, Last-Modified, ETag, Server, WWW-Authenticate, Location, Refresh, Content-Disposition, Expires, Accept-Ranges, Content-Range, Vary, X-Accel-Expires, X-Accel-Redirect, X-Accel-Limit-Rate, X-Accel-Buffering, X-Accel-Charset, Content-Encoding, Transfer-Encoding, Connection, Keep-Alive, X-Ws-buffer-length, Cache_state, Accept, Accept-Charset, Accept-Encoding, Accept-Language, Age, Allow, Authorization, Content-Language, Content-Location, Content-MD5, Expect, From, Host, If-Match, If-Modified-Since, If-None-Match, If-Range, If-Unmodified-Since, Max-Forwards, Pragma, Proxy-Authenticate, Proxy-Authorization, Range, Referer, Retry-After, TE, Trailer, Upgrade, User-Agent

*   ```overwrite``` 如果指定响应头已存在，则对已有响应头的值进行改写；否则将配置响应头和值添加到上游响应中。不支持改写这3个头部：Transfer-Encoding, Connection, Keep-Alive。
*   ```preserve``` 仅当指定响应头不存在时，才将配置的响应头和值加到上游响应中。

指令后最后的参数 ```if``` 可用于设置该指令的生效条件。条件可以是以下之一：

*   变量名；如果变量的值为空字符串或"0"，则为 false。
*   使用“=”和“!=”运算符将变量与字符串进行比较。
*   用"\~"(区分大小写)或者"\~\*"(不区分大小写)来对一个变量进行正则匹配。也支持用"!\~"或者"!\~\*"来进行反向匹配。请注意如果正则表达式包含‘}’或‘;’字符，则需要用引号来包裹该表达式。

示例: 

根据源站的响应状态码，添加一个响应头 ```X-Status```
```nginx
origin_header_modify X-Status Good if($upstream_response_status ~ "^[23]");
origin_header_modify X-Status ClientErr if($upstream_response_status ~ "^4");
origin_header_modify X-Status ServerErr if($upstream_response_status ~ "^5");
```
删除源站响应的 ```Cache-Control```响应头
```nginx
origin_header_modify Cache-Control "" policy=overwrite;
```
该指令可跨不同层级（http/server/location/location if）合并。如果不同层级存在针对相同的响应头的配置，则最内层的配置生效。

尽管 CDN360 具有分层缓存结构，该指令仅更改源站响应中的头部（不会更改来自中间节点的响应头）。

### `origin_limit_rate`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `origin_limit_rate rate;`<br>
**默认设置：** `origin_limit_rate 30m;`<br>
**可用位置：** server, location

该指令在 [proxy_limit_rate](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_limit_rate) 指令基础上进行了优化提升，用于限制从源服务器读取正文的速度。以字节/秒为单位。


### `origin_pass`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `origin_pass _origin_name[URI];`<br>
**默认设置：** none <br>
**可用位置：** location, if in location

该指令用于指定获取内容的源站以及URI。它在 nginx [proxy_pass](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass) 指令的基础上进行了优化提升。该指令携带的参数是在加速项“源站配置”中提前设置好的源站名。源站名后可以选择配置一个 URI，该 URI 中支持使用变量。如果未指定 URI，则 CDN Pro 会用携带问号后参数的完整 URI（可能已被 `rewrite` 指令更改） 发起对源站的请求。如果您希望回源时去掉问号后参数，可以使用[rewrite](#rewrite)指令并在第二个参数（替换路径）的末尾加上一个问号，例如：
```nginx
# 如果没有配置URI，
# origin_pass my_origin; nginx会自动添加URI转义过的$uri以及查询参数
rewrite ^(.*) $1?; # 末尾的问号将阻止自动添加查询参数
origin_pass my_origin; # 回源请求不会携带查询参数
```
请注意nginx变量`$uri`的值是被URL解码过的，所以其有可能包含二进制格式，比如UTF-8，或者不可显示的特殊字符，例如0x0D和0x0A。
为了避免可能的异常，您需要先将变量中的特殊字符进行转义，然后才能将其添加到本指令的URI部分。下面的例子展示了另外一种去除查询参数的方法：
```nginx
eval_func $escaped_uri URI_ESCAPE $uri; # 对特殊字符进行转义
origin_pass my_origin$escaped_uri; # 回源请求不会携带查询参数
```

### `origin_read_timeout`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `origin_read_timeout time;` <br/>
**默认设置：**  `origin_read_timeout 20s;` <br/>
**可用位置：** server

该指令在 [proxy_read_timeout](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_read_timeout) 指令的基础上进行了优化提升。它定义了 CDN Pro 从源服务器读取响应的超时时间。可配值仅限于 [1,60] 中的整数，后跟“s”。CDN Pro 已确保回源链路上所有节点都都遵守此超时值。此指令不支持在 location {}中使用。

### `origin_send_timeout`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `origin_send_timeout time;` <br/>
**默认设置：** `origin_send_timeout 20s;` <br/>
**可用位置：** server

该指令在 [proxy_send_timeout](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_send_timeout) 指令的基础上进行了优化提升。它设置了将回源请求从 CDN Pro 节点发送到源站的超时时间。该值仅限于 [1,60] 中的整数，后跟“s”。CDN Pro 已确保回源链路上所有节点都都遵守此超时值。此指令不支持在 location {}中使用。


### [`origin_set_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header)

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：**  `origin_set_header field value [flag=any if(condition)];` <br/>
**默认设置：** `none` <br/>
**可用位置：** server, location, if in location

该指令在 [proxy_set_header](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header) 的指令基础上进行了优化提升，用于增、删、改回源请求头。CDN Pro 对开源版本代码进行了以下提升：


1. 不同层级（server/location/if）的配置会被合并。但是，如果同一个回源请求头出现在上述不同位置，则只有配置最内层的指令才会生效。
2. CDN Pro 采用了[分层缓存结构](/cdn/docs/edge-logic/paths-to-origins)。此指令的设置默认仅在回源站时才会生效。如果您需要它也对发往父节点的请求生效，请加上 `flag=any` 这个参数。
3. 使用参数 ```if(判定条件)``` 来设置生效条件。如果条件为真，该指令才生效。```if``` 参数需要配置在该指令的末尾。条件可以是以下之一：

*   变量名，如果该变量不存在或者其值为‘0’或空，则条件不成立，否则条件成立；
*   用"="或者"!="来比较一个变量是否等于一个字符串；
*   用"\~"(区分大小写)或者"\~\*"(不区分大小写)来对一个变量进行正则匹配。也支持用"!\~"或者"!\~\*"来进行反向匹配。请注意如果正则表达式包含‘}’或‘;’字符，则需要用引号来包裹该表达式。

使用本指令需要注意以下事项：

1. 由于 CDN Pro 采用了分层缓存结构，因此不能使用内置变量 $scheme 和 $remote_addr 作为该指令中 if 的判断条件。如果您需要将客户端使用的协议或 IP 地址传递给源服务器，请使用以下变量：

*   [$request_scheme](/cdn/docs/edge-logic/built-in-variables#request_scheme): 客户端请求协议（http 或者 https）
*   [$client_real_ip](/cdn/docs/edge-logic/built-in-variables#client_real_ip):  客户端IP地址
*   [$client_country_code](/cdn/docs/edge-logic/built-in-variables#client_country_code):  客户端的 ISO 3166 国家码（比如 CN/US）

示例如下:
```nginx
origin_set_header X-Client-IP $client_real_ip; # 将客户端IP添加到 X-Client-IP 回源请求头中并传递给源站
```
2. 不要使用该指令修改传给源站的 `Host` 请求头。这个需求请使用 [加速项配置](/cdn/apidocs#operation/createPropertyVersion) 中的“origins.hostHeader”字段来完成。否则在配置校验环节将出现校验失败。
3. CDN Pro 的边缘服务器会默认将来自客户端的大多数请求头部原样传递给父服务器和源站，只有这几个例外：`If-Modified-Since`，`If-Unmodified-Since`，`If-None-Match`，`If-Match`，`Range`，以及 `If-Range`。对于可缓存的请求，CDN Pro 服务器在回源的时候会根据缓存策略自动重新生成这些头部。例如，当开启[分片缓存](#slice)时，服务器会根据所设置的分片大小自动生成`Range`头部。所以，不要使用该指令修改传给源站的`Range`请求头。对于不可缓存的请求，这些请求头部则仍然会原样传递给父服务器和源站。

### [`proxy_cache_background_update`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_background_update)

<span class="badge">标准</span>

**使用语法：** `proxy_cache_background_update on | off;;` <br/>
**默认设置：** `proxy_cache_background_update off;` <br/>
**可用位置：** server, location

该指令用于允许 CDN Pro 先将旧缓存响应给客户端，同时通过后台子请求的方式来更新过期缓存。在分发某些需要较长时间才能从源站获取完整数据的大文件时，该配置项有助于提高响应能力，减少客户端的等待时长。通常情况下，它应该与带有 `updating` 选项的 [`proxy_cache_use_stale`](#proxy_cache_use_stale) 指令结合使用。CDN Pro 引入了 [`proxy_cache_max_stale`](#proxy_cache_max_stale) 指令来设置一个最大过期时间，以避免将过于陈旧的内容返回给客户端。

### [`proxy_cache_bypass`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_bypass)

<span class="badge">标准</span>

**使用语法：** `proxy_cache_bypass string ...;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 不使用已有缓存（意味着必须回源）来响应符合条件的请求。如果字符串参数中至少有一个值不为空且不等于“0”，则 CDN Pro 不会从缓存中取出响应。您可以使用它来强制某些请求回源获取最新的响应，样例如下：

```nginx
proxy_cache_bypass $cookie_nocache $arg_nocache$arg_comment;
proxy_cache_bypass $http_pragma    $http_authorization;
```
该指令不会阻止将源站给的响应保存在 cache 缓存中。这个 "保存"行为是由另一个指令 [`proxy_no_cache`](#proxy_no_cache) 控制的。一般情况下这两个配置项会同时使用来实现某些文件不缓存。

### [`proxy_cache_lock`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock)

<span class="badge dark">高级</span>

**使用语法：** `proxy_cache_lock on/off;` <br/>
**默认设置：** `proxy_cache_lock on;` <br/>
**可用位置：** server, location

当该指令被启用时，如果有多个客户端同时请求同一个缓存中不存在，或者过期的文件，CDN Pro 服务器只会“放行”一个请求至源站去获取内容并填充缓存。其他请求会等待该请求得到结果之后在缓存中读取文件。但是如果等待时间超过 [proxy_cache_lock_timeout](#proxy_cache_lock_timeout) 指令设置的时间后也会被“放行”至源站。默认情况下，出于减少对源站带宽消耗的考虑，CDN Pro 将该指令设置为开启。同时为了避免该功能在大部分内容不可缓存时引入不必要的延迟，我们将 `proxy_cache_lock_timeout` 默认值设置为 0。如果您已事先预知了大部分内容是可缓存的，您可以增加该超时的值来降低源站负载。如果您可以通过请求里的变量来鉴别不可缓存的内容，那么请使用 `proxy_cache_bypass` 和 `proxy_no_cache` 来跳过缓存处理操作并尽可能降低处理延迟。

### [`proxy_cache_lock_age`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock_age)

<span class="badge">标准</span>

**使用语法：** `proxy_cache_lock_age time;` <br/>
**默认设置：** `proxy_cache_lock_age 15s;` <br/>
**可用位置：** server, location

前一个“放行”至源站的请求，没有在该指令设置的时间内完成，则 CDN Pro 将会放行下一个请求用来填充缓存。逻辑源自开源[公共版本](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock_age)，无变更。

### [`proxy_cache_lock_timeout`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock_timeout)

<span class="badge">标准</span>

**使用语法：** `proxy_cache_lock_timeout time;` <br/>
**默认设置：** `proxy_cache_lock_timeout 0s;` <br/>
**可用位置：** server, location

该指令为 `proxy_cache_lock` 指令设置一个超时时间。如果客户端请求等待时间超过该设置，则 CDN Pro 服务器将“放行”等待请求至源站。但响应的内容不会被用来填充缓存。（`proxy_cache_lock_age` 决定应该多久发送一次请求来填充缓存。）逻辑源自[公共版本](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock_timeout)，无变更。出于优化延迟的考虑默认值为 0s。如果您事先知道该域名下大部分内容都是可缓存的并希望减少源站流量，则可以将其更改为更高的值。

### `proxy_cache_max_stale`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法:** `proxy_cache_max_stale if_error=$time while_revalidate=$time;` <br/>
**默认设置:** `-` <br/>
**可用位置:** server, location

本指令允许CDN Pro 边缘服务器返回缓存中过期不太久的内容，以提高终端用户的体验。他的的功能和 `Cache-Control` 响应头里的 `stale-if-error`和 `stale-while-revalidate`参数相同。但是优先级低于该响应头。

'if_error=' 参数要求 [`proxy_cache_use_stale`](#proxy_cache_use_stale) 的配置里包含 ‘error’。参数 'while_revalidate=' 必须和 [`proxy_cache_background_update on;`](#proxy_cache_background_update) 一同配置，同时要求 `proxy_cache_use_stale` 的配置里包含 'updating'。

### [`proxy_cache_methods`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_methods)

<span class="badge">标准</span>

**使用语法：** `proxy_cache_methods GET | HEAD | POST;` <br/>
**默认设置：** `proxy_cache_methods GET HEAD;` <br/>
**可用位置：** server, location

该指令用于配置可被 CDN Pro 缓存的客户端请求方法，默认情况下 “GET” 和 “HEAD” 这两种方法将会被配置为可缓存。支持GET, HEAD以及POST这3种方法。

### `proxy_cache_min_age` 

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `proxy_cache_min_age time;` <br/>
**默认设置：** `proxy_cache_min_age 0s;` <br/>
**可用位置：** server, location, if in location

Description:

该指令允许您为响应文件配置最小缓存时间。如果源给的 Cache-Control 响应头中的 max-age 小于所指定的参数值，则使用指定的参数值作为缓存时间。例如，如果源站的 Cache-Control 响应头中的max-age值为100s，而该指令配置的值为200s，则内容的有效缓存时间为200s。

CDN Pro 服务器将根据源站提供的响应头以及 nginx 指令按照以下优先顺序确定缓存时间：

X-Accel-Expires > Cache-Control (max-age)，proxy_cache_min_age > Expires > proxy_cache_valid

当 nginx 根据 Cache-Control 头中的 max-age 值计算缓存时间时，它将该值与 proxy_cache_min_age 中配置的值进行比较，并按照两者的最大值进行内容缓存。
当 nginx 不根据 Cache-Control 头中的 max-age 值计算缓存时间时（例如通过 proxy_ignore_headers 忽略了 Cache-Control 响应头 ）， proxy_cache_min_age 指令中的值将不起作用。

注意：该指令中的时间变量可以是带有以下后缀之一的数字，或以下后缀组合而成的数字：

*   s = 秒 (默认值, 例如: 10s)
*   m = 分 (例如: 5m)
*   h = 小时 (例如: 1h)
*   d = 天 (例如: 1d)
*   w = 周 (例如: 1w)
*   M = 月 (例如: 2M)
*   y = 年 (例如: 1y)

如果配置的时间参数没有后缀，则该配置项的单位会被视为秒。

### [`proxy_cache_use_stale`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_use_stale)

<span class="badge">标准</span>

**使用语法：** `proxy_cache_use_stale error | timeout | invalid_header | updating | http_500 | http_502 | http_503 | http_504 | http_403 | http_404 | http_429 | off ...;` <br/>
**默认设置：** `proxy_cache_use_stale error timeout;` <br/>
**可用位置：** server, location

该指令用于确定 CDN Pro 在哪些情况下可以响应过期的缓存给客户端。 逻辑源自 [NGINX 开源版本](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_use_stale) ，没有变化。根据默认设置，当 CDN Pro 与源建立连接时出现问题时，会响应过期的缓存内容。

### [`proxy_cache_valid`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_valid)

<span class="badge">标准</span> <span class="badge green">修改增强</span>

**使用语法：** `proxy_cache_valid [code ...] time;` <br/>
**默认设置：** — <br/>
**可用位置：** server, location

该指令用于给不同的响应状态码设置缓存时间。如果没有显式配置状态码，默认值为200， 301和302。只有当源站提供的响应头中没有缓存规则时（如 Cache-Control\Expire 响应头）时，该配置项才会生效。换句话说，源站的响应头字段 `Cache-Control`、`Expires`、`Set-Cookie` 等具有更高的优先级，除非这些响应头被 [`proxy_ignore_cache_control`](#proxy_ignore_cache_control) 或 [`proxy_ignore_headers`](#proxy_ignore_headers) 忽略。CDN Pro 在[NGINX 开源版本](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_valid) 基础上上进行了部分代码优化以支持使用变量来设置缓存时间。变量的值如果不是一个合法的时间参数，则该指令不生效，内容不会缓存。参数值 0 表示缓存响应并将其视为已过期。如果您可以根据请求中的某些参数识别动态/不可缓存的内容，请使用 [`proxy_cache_bypass`](#proxy_cache_bypass) 和 [`proxy_no_cache`](#proxy_no_cache) 来绕过缓存执行过程并提高性能。

当 location 模块中没有该配置项时，上一层（ server 层）的配置才会被继承到 location 中。如果你需要同时在location模块和server层用该指令设置不同的缓存，可以用下面的代码来实现：

```nginx
proxy_cache_valid 404 10s;  # server 层, 缓存404状态码响应10秒钟
proxy_cache_valid $cache_time;
set $cache_time '';
location / { 
  set $cache_time 1d;   # Location 模块, 缓存200，301，302 状态码响应一天
  ...
 } 
```

### `proxy_cache_vary`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `proxy_cache_vary on | off;` <br/>
**默认设置：** `proxy_cache_vary off;` <br/>
**可用位置：** server, location

如果该指令的参数值为“on”，则 CDN Pro 将遵循源站的 `Vary` 响应头来区分缓存不同版本的响应正文。请注意，开启了该配置项后的对应缓存需使用“目录刷新”方式来清除。

如果该指令的参数值为“off”，则 CDN Pro 将不会缓存任何携带 Vary 头的响应。

相关信息请查阅：[关于 Vary 响应头的处理方式](</zh/cdn/docs/edge-logic/faq#关于-vary-响应头的处理方式>)。

### [`proxy_cookie_domain`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cookie_domain)

<span class="badge dark">高级</span>

**使用语法：** `proxy_cookie_domain off;
       proxy_cookie_domain {domain} {replacement};` <br/>
**默认设置：** `proxy_cookie_domain off;` <br/>
**可用位置：** server, location

该指令用于转换源站 set-cookie 响应头中的 domain 选项，将其中原本设置的域名（参数1）转换成更新后的域名（参数2）。源自 NGINX 开源版本，无变更。

### [`proxy_cookie_path`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cookie_path)

<span class="badge dark">高级</span>

**使用语法：** `proxy_cookie_path off;
       proxy_cookie_path {path} {replacement};` <br/>
**默认设置：** `proxy_cookie_path off;` <br/>
**可用位置：** server, location

该指令用于转换源站 set-cookie 响应头中的 path 选项，将其中原本设置的path（参数1）转换成更新后的path（参数2）。源自NGINX 开源版本，无变更。

### [`proxy_hide_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_hide_header)

<span class="badge">标准</span>

**使用语法：**	`proxy_hide_header {field};` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location

该指令用于隐藏掉某些响应头，从而让这些信息对客户端不可见。源自NGINX 开源版本，无变更。您可以使用该指令来隐藏掉多个响应头。当 location 模块中没有该配置项时，上一层（ server 层）的配置会被继承到 location 中。


### `proxy_ignore_cache_control`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `proxy_ignore_cache_control directives…;` <br/>
**默认设置：** none <br/>
**可用位置：** server, location, if in location

该指令用于设置 CDN Pro 忽略来自源站 `cache-control` 响应头中的某些参数。可以忽略以下指令：

*   no-cache
*   no-store
*   private
*   max-age
*   s-maxage
*   stale-while-revalidate
*   stale-if-error

示例：忽略掉来自源响应头中的 no-cache 和 no-store：
```nginx
proxy_ignore_cache_control no-cache no-store;
```
注意：该指令并不会修改或者重写 `cache-control` 响应头。

### [`proxy_ignore_client_abort`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ignore_client_abort)

<span class="badge">高级</span> <span class="badge">LB logic</span>

**使用语法:** `proxy_ignore_client_abort on | off;` <br/>
**默认设置:** `proxy_ignore_client_abort off;` <br/>
**可用位置:** server (仅限在 LB7)

设置在客户端中止连接的时候，是否要中止与源站的连接。配置成 `on` 意味着忽略客户端的中止行为，继续保持与源站的连接和数据传输。`off` 意味着中止从源站接收数据，如果数据是不可缓存的。可缓存的数据会继续完成传输，不受本指令影响。本指令只能在 [load balancer logic](lb7-es-structure) 里使用。

### [`proxy_ignore_headers`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ignore_headers)

<span class="badge">标准</span>

**使用语法：** `proxy_ignore_headers field ...;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 忽略掉来自源站的某些响应头。最常用的情景是用于忽略缓存相关标记，例如 “Cache-Control” 或 “Expires” 响应头。 源自 [NGINX 开源版本](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ignore_headers) 无修改。如果您只需要忽略 `cache-control` 响应头中的部分值，请使用 [`proxy_ignore_cache_control`](#proxy_ignore_cache_control) 指令。

### [`proxy_method`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_method)

<span class="badge">标准</span>

**使用语法：** `proxy_method {method};` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 向源站发起回源请求时的 HTTP 协议方法，其参数值可以包含变量。对 [开源版本](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_method) 无修改。


### [`proxy_next_upstream`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream)

<span class="badge">标准</span>

**使用语法：** `proxy_next_upstream error | timeout | invalid_header | http_500 | http_502 | http_503 | http_504 | http_403 | http_404 | http_429 | non_idempotent | off ...;` <br/>
**默认设置：** `proxy_next_upstream error timeout;` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 在哪些情况下向源站配置里的下一个服务器发起重试请求。本指令的一个重要功能是为源站的 [`peerFailureTimeout`](/cdn/docs/edge-logic/paths-to-origins#origin-configurations) 配置定义了什么叫“失败的请求”。源自 NGINX 公共版本没有变化。


### [`proxy_next_upstream_timeout`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream_timeout)

<span class="badge dark">高级</span>

**使用语法：** `proxy_next_upstream_timeout {time};` <br/>
**默认设置：** `proxy_next_upstream_timeout 0;` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 向源站配置里的下一个服务器发起重试请求的超时时间。默认配置‘0’表示没有超时限制。源自 NGINX 公共版本没有变化。


### [`proxy_next_upstream_tries`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream_tries)

<span class="badge dark">高级</span>

**使用语法：** `proxy_next_upstream_tries {number};` <br/>
**默认设置：** `proxy_next_upstream_tries 0;` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 向源站配置里的下一个服务器发起重试请求的尝试次数。默认配置‘0’表示没有次数限制。源自 NGINX 公共版本没有变化。

### [`proxy_no_cache`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_no_cache)

<span class="badge">标准</span>

**使用语法：** `proxy_no_cache string ...;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 不对响应进行缓存的条件。如果携带的参数值至少有一个不为空且不为0，则此响应将不被缓存：

```nginx
proxy_no_cache $cookie_nocache $arg_nocache$arg_comment; 
proxy_no_cache $http_pragma    $http_authorization;
```
由于响应没有被保存，所以在相同条件下也没有必要检索缓存。因此，该指令通常搭配 [`proxy_cache_bypass`](#proxy_cache_bypass) 指令一起使用。

### [`proxy_pass_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass_header)

<span class="badge">标准</span>

**使用语法：**	`proxy_pass_header {field};` <br/>
**默认设置：** `proxy_pass_header Date;` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 将指定的某个 [Nginx 默认隐藏的响应头](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_hide_header) 传递给客户端。默认设置会将源站返回的 `Date` 响应头传递给客户端。该响应头携带了 CDN Pro 从源站获取响应的时间点。该指令支持多次配置以传递多个不同的响应头给客户端。只有当一个 location 配置块中没有该指令时，上一层（server 层）的配置才会被继承到 location 中，否则上层的配置会被忽略。

### [`proxy_pass_request_body`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass_request_body)

<span class="badge">标准</span>

**使用语法：** `proxy_pass_request_body on | off;` <br/>
**默认设置：** `proxy_pass_request_body on;` <br/>
**可用位置：** server, location

该指令用于允许或禁止将客户端的请求正文传递给源站。源自 NGINX 开源版本，无变更。

### [`proxy_pass_request_headers`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass_request_headers)

<span class="badge">标准</span>

**使用语法：** `proxy_pass_request_headers on | off;` <br/>
**默认设置：** `proxy_pass_request_headers on;` <br/>
**可用位置：** server, location

该指令用于允许或禁止将客户端的请求头传递给源站。源自 NGINX 开源版本，无变更。

### [`proxy_redirect`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_redirect)

<span class="badge dark">高级</span>

**使用语法：** `proxy_redirect default;
       proxy_redirect off;
       proxy_redirect redirect replacement;` <br/>
**默认设置：** `proxy_redirect default;` <br/>
**可用位置：** server, location

该指令用于修改 CDN Pro 传给客户端的"Location"和"Refresh"响应头中的内容。源自 NGINX 开源版本，无变更。

### [`proxy_request_buffering`](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_request_buffering)

<span class="badge dark">高级</span> <span class="badge">LB logic</span>

**使用语法:** `proxy_request_buffering on/off;` <br/>
**默认设置:** `proxy_request_buffering off` <br/>
**使用位置:** server, location

开启或关闭对客户端请求体的缓冲。与开源版本基本一致，不同的是CDN Pro默认关闭缓冲。该配置项需要在边缘逻辑和负载均衡器逻辑中同时配置。如果您需要使用[将请求体附加到缓存键](#proxy_request_body_in_cache_key)的功能，需要通过该指令将客户端请求体缓冲同时开启。

### `proxy_request_body_in_cache_key`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法:** `proxy_request_body_in_cache_key on/off;` <br/>
**默认设置:** `proxy_request_body_in_cache_key off` <br/>
**可用位置:** server, location, if in location

当参数值是 'on'（支持变量）时，CDN Pro 服务器将计算请求正文的 MD5 哈希值并将其加到缓存 key 的末尾。此指令主要针对使用 POST 请求来查询信息，并且查询参数携带在请求正文的情形。这类请求通常跟 GET 一样是 idempotent 和安全的，而且其响应也是可缓存的。请注意您需要使用 [`proxy_cache_methods`](#proxy_cache_methods) 指令来启用对 POST 请求的缓存。此外，您还需要通过[`proxy_request_buffering`](#proxy_request_buffering)指令开启对客户端请求体的缓冲。

此指令的一个限制是它只在请求正文小于4kB时生效。当请求正文大于此门限时，不会有哈希值被添加到缓存 key 中，同时变量 [`$ignored_body_in_cache_key`](/docs/edge-logic/built-in-variables#ignored_body_in_cache_key) 的值会被设为 '1'。为了避免可能由此带来的缓存冲突，您可以将此变量用于 [`proxy_cache_bypass`](#proxy_cache_bypass) 指令来避免缓存这样的请求。如果一定要把更大的请求正文添加到缓存 key 里，您需要在客户端计算哈希值，并通过请求头传递到CDN Pro 服务器，然后将其添加到 $cache_misc 变量中。

### `proxy_set`

<span class="badge">标准</span> <span class="badge primary">全新特有</span> <span class="badge">LB logic</span>

**使用语法：** `proxy_set $variable value [if(...)];`<br>
**默认设置：** none <br>
**可用位置：** server, location, if in location

该指令将参数 `value` 的值赋值给变量 `$variable`。`value` 可以是另一个变量或变量和字符串的组合。该指令与 [`set`](#set) 指令非常相似，但是它们在请求处理的不同阶段被执行。`set` 指令是在收到请求后很早的 “rewrite” 阶段中被执行。而 `proxy_set` 是在从源接收到响应头（在缓存未命中的情况下）或从缓存中读取完毕后才被执行。因此，proxy_set 指令可以将响应头中的信息赋值给目标变量。请注意，响应头有可能被 [`origin_header_modify`](#origin_header_modify) 指令修改过。此外，该指令支持 `if()` 参数，用于指定该指令生效的条件。示例如下：
```nginx
set $cache_time 1d; # 设置cache_time变量的默认值为 1d
# 如果源站的响应中有 “cachetime” 响应头，则使用该响应头覆盖掉上述默认值
proxy_set $cache_time $upstream_http_cachetime if($upstream_http_cachetime);
proxy_cache_valid $cache_time;
# 截取源站响应头 “version” 中的一段，并发送给客户端
proxy_set $version_number $1 if($upstream_http_version ~ "Version:(.*)$");
add_header version-number $version_number;
# 如果源站响应了 301 或者 302 ，则该响应不缓存 
proxy_set $no_store 1 if($upstream_response_status ~ 30[12]);
proxy_no_cache $no_store;
```
该指令会跨不同层级（server/location/location if）合并。如果不同层级中使用该指令试图对同一个变量进行赋值，则只有最内层的配置生效。

### [`proxy_set_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header)

<span class="badge">标准</span> <span class="badge green">修改增强</span> <span class="badge">LB logic</span>

**使用语法：**  `proxy_set_header field value if(condition);` <br/>
**默认设置：** `-` <br/>
**可用位置：** server (仅限在LB7)

This is an enhanced version of the [open-source version](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header). It supports condition and can be used only in the [load balancer logic](lb7-es-structure) to pass data to the ES.

### [`proxy_ssl_protocols`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ssl_protocols)

<span class="badge dark">高级</span>

**使用语法：** `proxy_ssl_protocols [SSLv2] [SSLv3] [TLSv1] [TLSv1.1] [TLSv1.2] [TLSv1.3];` <br/>
**默认设置：** `proxy_ssl_protocols TLSv1 TLSv1.1 TLSv1.2;` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 回源时的握手协议。源自 Nginx 开源版本，无变更。

### `range_reorder`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法:** `range_reorder on | off [coalescing];` <br/>
**默认设置:** `range_reorder off` <br/>
**可用位置:** server, location

该指令用于指示CDN Pro 服务器是否对range请求中指定的多个字节范围进行重新排序和合并。 当range_reorder开启时，如果请求中的Range值为降序排序，CDN Pro 服务器将对Range值按升序重新排列。 当range_reorder开启且带有coalescing参数时，如果请求中的Range值存在重叠的范围或者2个范围之间的间隔小于发送多部分内容（multipart）的开销，则这些范围将被合并。开启重新排序和合并，可确保CDN Pro 服务器响应206状态码和部分内容给客户端。 当range_reorder未开启时，CDN Pro 服务器可能响应200状态代码和完整内容给客户端，即便客户端发送了range请求。

### `realtime_log_downsample`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `realtime_log_downsample factor;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location

该指令用于覆盖加速项配置 [实时日志](/docs/portal/edge-configurations/creating-property#real-time-log) 的“采样率”。 其参数 `factor` 可以是一个 [0, 65535] 中的整数或一个变量。值 0 表示关闭实时日志功能；1 表示不对实时日志进行采样；N>1 表示每 N 个请求才生成一条实时日志。如果该指令的变量值为空，则指令不生效，维持配置项里的默认值；如果变量值无法被正常解析（非整数的字符串），则该参数将被视为100。最终生效的采样率可通过内置变量 [`$realtime_log_ds_factor`](/docs/edge-logic/built-in-variables#realtime_log_ds_factor) 记录到实时日志中。本指令只能在 Edge Logic里使用。

### [`return`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return)

<span class="badge">标准</span> <span class="badge">LBLogic</span>

**使用语法：** `return code [text];
       return code URL;
       return URL;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if

停止当前的请求处理，并将指定的响应状态码以及正文（如有配置text或URL）返回给客户端。 对 [开源版本](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return) 没有修改。

该指令属于nginx的 [rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)。它在请求处理的早期阶段同该模块里的其他指令一道被顺序（imperatively）执行。


### [`rewrite`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite)

<span class="badge">标准</span>

**使用语法：** `rewrite regex replacement [flag];` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if

如果请求URI匹配正则表达式`regex`，则将其改写为`replacement`的值。功能上和[开源版本](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite)完全一致。请注意该指令匹配的对象是变量`$uri`，一个经过[归一化](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)，不带query string的请求URI。如果匹配成功，则会把`replacement`的值赋给变量`$uri`.

该指令属于nginx的[rewrite模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)。它在请求处理的早期阶段同该模块里的其他指令一道被顺序（imperatively）执行。

### [`satisfy`](http://nginx.org/en/docs/http/ngx_http_core_module.html#satisfy)

<span class="badge">标准</span>

**使用语法：** `satisfy all | any;` <br/>
**默认设置：** `satisfy all;` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 对多个访问控制功能的校验方式。当配置值为 all 时，只有当边缘逻辑中所有的 [`allow`](#allow), [`deny`](#deny) 以及 [`auth_request`](#auth_request) 的结果都为 pass 时，请求才会通过校验。配置值为 any 时，只要上述指令结果有一个为 pass ，请求就可通过校验。代码逻辑源自 NGINX 开源版本，无变更。
请注意，所有这些校验指令都在 rewrite 模块指令之后才被执行。

### `sanitize_accept_encoding`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `sanitize_accept_encoding enc1 enc2 … ;` <br/>
**默认设置：** `sanitize_accept_encoding gzip;` <br/>
**可用位置：** server

该指令用于修改 `Accept-Encoding` 请求头，确保其可能的取值不超过5个以提高缓存的利用率。此指令最多可以携带4个参数，每个参数都是一个或多个（以逗号为分隔的）“内容编码格式”，例如“gzip,br”或“br”。对于每个请求，CDN Pro 会把接收到的 `Accept-Encoding` 请求头与本指令的参数从左至右逐个进行匹配。如果一个参数里的所有格式都出现在了此请求头里，则用该参数值替换掉请求头的值。如果没有能匹配的参数，则将该请求头删除，表示只接受无压缩的版本。

示例如下：假设边缘逻辑中的配置是：
```nginx
sanitize_accept_encoding "gzip,br" "gzip" "deflate" "br";
```
那么处理逻辑将是：
```php
if (A-E-header.contains("gzip") && A-E-header.contains("br"))
    A-E-header="gzip,br";
else if (A-E-header.contains("gzip")) A-E-header="gzip";
else if (A-E-header.contains("deflate")) A-E-header="deflate";
else if (A-E-header.contains("br")) A-E-header="br";
else remove A-E-header;
```
不难看出，该指令的默认设置（"gzip"）会将请求头 `Accept-Encoding` 的值重写为“gzip”或删除。结合 CDN Pro 的[默认缓存策略](/docs/edge-logic/faq.md#the-support-and-non-support-of-vary)，CDN Pro 服务器将仅缓存这两种编码格式中的一种。如果客户端请求另一种格式，CDN Pro 服务器将会通过把缓存的版本在线压缩或解压缩来响应。

如果您使用了此指令，那么很可能您还希望 CDN Pro 能根据 `Accept-Encoding` 请求头的值来区别缓存响应。您可以通过将该请求头的值添加到cache key中来实现此目的：

```nginx
set $cache_misc $cache_misc."ae=$http_accept_encoding";
```

### [`secure_link`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link)

<span class="badge dark">高级</span>

**使用语法：** `secure_link expression;` <br/>
**默认设置：** `—` <br/>
**可用位置：** server, location

该指令定义一个带有变量的字符串，CDN Pro 将从中提取该请求链接的校验值和生存期。代码逻辑源自 Nginx 开源版本，无改动。


### [`secure_link_md5`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_md5)

<span class="badge dark">高级</span>

**使用语法：** `secure_link_md5 expression;` <br/>
**默认设置：** `—` <br/>
**可用位置：** server, location

该指令定义一个用于进行 MD5 哈希计算的表达式，计算出的哈希值将与请求中传递的值进行比较。源自 Nginx 开源版本，无改动。

### [`secure_link_secret`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_secret)

<span class="badge dark">高级</span>

**使用语法：** `secure_link_secret word;` <br/>
**默认设置：** `—` <br/>
**可用位置：** location

该指令定义了检查请求合法性的秘钥。代码逻辑源自 Nginx 开源版本，无改动。

### [`set`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#set)

<span class="badge">标准</span> <span class="badge">LBLogic</span>

**使用语法：**	`set $variable value;` <br/>
**默认设置：**	`-` <br/>
**可用位置：** server, location, if

该指令为指定的变量赋值。代码逻辑源自 Nginx 开源版本，无改动。CDN Pro 定义了一个特殊的变量 `$cache_misc`。用户可以通过给这个变量赋值来 [自定义](/docs/edge-logic/faq.md#how-do-you-include-query-parameters-andor-request-headers-in-the-cache-key) 缓存键。

该指令属于 nginx [rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)。它在请求处理的早期阶段与同一模块中的其他指令一道被顺序（imperatively）执行。

### [`slice`](http://nginx.org/en/docs/http/ngx_http_slice_module.html#slice)

<span class="badge">标准</span> <span class="badge green">修改增强</span>

**使用语法：**	`slice size;` <br/>
**默认设置：** `slice 0;` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 从源获取大文件时切片的大小。合法的参数值可以是 0（禁用切片），或一个介于 512k 和 512m 之间（含）的[nginx 尺寸](http://nginx.org/en/docs/syntax.html) 。源站必须支持 range 请求并响应 206 状态码。如果需要将切片的响应进行缓存，请使用指令 `proxy_cache_valid 206 ...` 来启用对 206 状态码缓存。同时我们在开源版本的基础上对该指令进行了以下修改和增强：
* CDN Pro 要求所有缓存的切片都携带相同的 ETag 值，以确保这些切片归属于同一个原始文件。当从源站新获取的切片与先前已缓存切片有不同的 Etag 值时，当前与客户端的响应传输将被终止，并且所有已缓存的切片都会立即清除。因此源站在一个文件内容未发生变更的情况下，请务必确保该文件的 ETag 值不会变化。在确实必要的情况下，您可以使用 `slice_ignore_etag on;` 指令来禁用此校验。
* 启用切片功能后，CDN Pro 会自动在回源请求里删除 “Accept-Encoding” 头来避免获取压缩响应。如果此行为被其他指令覆盖，例如，`origin_set_header Accept-Encoding ...` 指令，那么客户端可能会收到异常的响应。
* 不支持Nginx原生变量$slice_range。启用切片功能后，CDN Pro 会根据设置的切片大小自动在回源请求里加上“Range”请求头。如果此行为被其他指令覆盖，例如，`origin_set_header Range ...` 指令，那么客户端可能会收到异常的响应。


### `slice_ignore_etag`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `slice_ignore_etag on/off;` <br/>
**默认设置：** `slice_ignore_etag off;` <br/>
**可用位置：** server

该指令用于关闭切片文件的 ETag 一致性检查。如果源无法确保为同一文件生成相同的 ETag 值时，可用该指令作为临时解决方案。

### `slice_verify_header`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法:** `slice_verify_header header_name;` <br/>
**默认设置:** - <br/>
**可用位置:** server, location

指定头部用来检查切片文件的一致性。 此处指定的头部会与Etag一起用于一致性检查。如果您希望忽略Etag仅检查指定的头部，可将该指令与[`slice_ignore_etag`](#slice_ignore_etag)结合使用。

header_name的值不能是“etag”。该值不区分大小写。


### `sorted_querystring_filter_parameter`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `sorted_querystring_filter_parameter {param1} {param2} … ;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if in location

从变量```$sorted_querystring_args``` 中删除一些查询参数。这里配置的参数名称是区分大小写的。
此功能是基于这个 [开源模块](https://github.com/wandenberg/nginx-sorted-querystring-module) 实现的。


### [`sub_filter`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter)

<span class="badge dark">高级</span>

**使用语法：** `sub_filter {string} {replacement};` <br/>
**默认设置：** `—` <br/>
**可用位置：** server, location

该指令用于实现响应正文内容的替换。参数一为期待被替换的原始字符串，参数二为用于替换参数一的新字符串。对 NGINX 开源版本无变更。请注意，当响应被压缩时，搜索和替换操作可能无法正常工作。这时候您可以使用 [`origin_set_header`](#origin_set_header) 指令来清除发往源站和父节点的 `Accept-Encoding` 请求头，以确保边缘节点收到的响应是没有压缩的:
```nginx
  # 清除发往源站和父节点的 `Accept-Encoding` 请求头
  origin_set_header accept-encoding '' flag=any;
  sub_filter 'match-string' 'replacement string';
```

### [`sub_filter_last_modified`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter_last_modified)

<span class="badge dark">高级</span>

**使用语法：** `sub_filter_last_modified on | off;` <br/>
**默认设置：** `sub_filter_last_modified off;` <br/>
**可用位置：** server, location

该指令允许在替换期的同时保留原始响应中的 `Last-Modified` 头字段，以便于响应缓存。代码源自NGINX开源版本，无变更。

### [`sub_filter_once`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter_once)

<span class="badge dark">高级</span>

**使用语法：** `sub_filter_once on | off;` <br/>
**默认设置：** `sub_filter_once on;` <br/>
**可用位置：** server, location

该指用于配置只替换第一次匹配的字符串，还是反复匹配替换。代码源自NGINX开源版本，无变更。

### [`sub_filter_types`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter_types)

<span class="badge">标准</span>

**使用语法：** `sub_filter_types <mime-type> [...];` <br/>
**默认设置：** `sub_filter_types text/html;` <br/>
**可用位置：** server, location

该指令表示允许替换的文件类型，默认值为 “text/html” 。您可以使用该指令添加除 “text/html” 以外其他需要执行替换操作的MIME类型。代码源自NGINX开源版本，无变更。

### `upstream_origin_only`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法:** `upstream_origin_only on|off;` <br/>
**默认设置:** `upstream_origin_only off` <br/>
**可用位置:** server, location, if in location

启用或禁用直接回源。 当开启时，用户请求将被直接转发到源站，不经过任何中间缓存节点，包括 [shield节点](/cdn/apidocs#operation/get-cdn-shields)。 当您在加速项目的源站配置中指定回源方式为"不直连"或"自动选择"时，可以使用该指令将部分请求（例如鉴权请求）直接转发到源站。即使你指定回源方式为“总是直连”，CDN Pro 边缘服务器仍然会在直连源站失败的时候尝试将请求发往中间缓存节点。使用本指令 `upstream_origin_only on;` 完全消除了这个可能性。

### [`valid_referers`](http://nginx.org/en/docs/http/ngx_http_referer_module.html#valid_referers)

<span class="badge">标准</span>

**使用语法：** `valid_referers none | blocked | server_names | {string} ...;` <br/>
**默认设置：** `—` <br/>
**可用位置：** server, location

该指令用于设置将内置变量 $invalid_referer 赋值为的空字符串的条件。当请求头 `Referer` 的值不满足这些条件的时候，内置变量 $invalid_referer 将被赋值为1。代码源自NGINX开源版本，无变更。


### `access_log_sampling`

<span class="badge">标准</span> <span class="badge">LBLogic</span> <span class="badge primary">全新特有</span>

**使用语法：** `access_log_sampling factor;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server (仅限在LB7)

本指令用于设置对保存访问日志进行采样的“因子”。数值 N 意味着平均每 N 个请求生产一条访问日志。它可用于减少从 Portal 或 API 下载的访问日志量。可以在日志中用 `%samplerate` 关键字记录该采样“因子”。该指令对CDN Pro 边缘服务器的行为没有影响，包括实时日志（实时日志的采样由 [`realtime_log_downsample`](#realtime_log_downsample) 控制）。在极端情况下，我们可能对某些请求量巨大的域名使用该本令来避免日志系统过载。本指令只能在Load Balancer Logic里使用。
