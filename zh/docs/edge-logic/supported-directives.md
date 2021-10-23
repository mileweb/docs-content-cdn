## 支持的指令

这一页列出了你可以在CDN Pro的边缘逻辑里使用的全部指令。部分指令是未经修改的开源版本，部分指令经过了我们的<span class="badge green">修改增强</span>以更好地满足CDN服务的需求。同时我们也引入了大量<span class="badge primary">全新特有</span>的指令来完善开源版本作为CDN服务器的不足。

在下面的文档里，我们为所有非特有的指令提供了到开源版公开文档的直接链接。每一个被修改增强过的指令，我们都提供了详细的描述，包括新增的功能，参数，以及对参数取值范围的限制。

以下列表中，标记为<span class="badge">标准</span>的指令对所有的客户都开放。它们应该可以满足绝大部分常见的CDN配置需求。标记为<span class="badge dark">高级</span>的指令通常会消耗更多的资源。对于这些指令，我们需要逐一审核来明确需求。如果您需要用到这些指令，请联系客服。您有可能需要为它们额外付费。

### [`add_header`](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header)

<span class="badge">标准</span> <span class="badge green">修改增强</span>

**使用语法：** `add_header name value [policy=...] [if(...)] [always];`<br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if in location

本指令的功能是修改发往客户端的响应头部。我们在[开源版本](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header)的基础上做了如下重大改进:

1. 引入了```policy=```参数来更精确地控制指令的行为:
```nginx
add_header X-My-Header $header_value policy=repeat|overwrite|preserve
```
```overwrite```: 添加一个头部。如果该头部名称已经存在，则覆盖原有的值。如果value是空字符串，则会将该头部删除。

```preserve```: 如果头部名称不存在，则添加。否则不做任何操作，保留原头部不变。

```repeat```: (默认行为) 添加一个头部。如果该头部名称已经存在，则新增一条。

该参数支持变量，其取值必须是上面3者之一。

**局限：** 对于下面这几个“特殊”头部，本指令的行为是固定的，不受policy参数的控制：

| **"特殊"头部名称** | **行为** |
| ---- | ---- |
| ```Cache-Control``` | ```repeat``` |
| ```Link``` | ```repeat``` |
| ```Last-Modified``` | ```overwrite``` |
| ```ETag``` | ```overwrite``` |


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

Adds the specified field to the end of a response provided that the response code equals 200, 201, 206, 301, 302, 303, 307, or 308. When "always" is specified, the trailer is added regardless of the status code. Parameter value can contain variables. We made the following changes to the [open-source version](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_trailer):

1. This directive is intended to be used in the edge logic to pass a variable to the L7 load balancer so the real-time logger can access it with a [$upstream\_trailer\_*](/cdn/docs/edge-logic/built-in-variables#upstream_trailer_) variable. Although most variables can be passed by the [`add_header`](#add_header) directive, some of them do not have their values ready when the response header is being constructed. Here are a few of them:  [$upstream_bytes_received](/cdn/docs/edge-logic/built-in-variables#upstream_bytes_received), [$upstream_bytes_sent](/cdn/docs/edge-logic/built-in-variables#upstream_bytes_sent), [$upstream_response_time](/cdn/docs/edge-logic/built-in-variables#upstream_response_time), [$request_cpu_time](/cdn/docs/edge-logic/built-in-variables#request_cpu_time). The only way to pass them to the real-time logger is using this directive when the entire response is completed.

2. If the response from upstream has a `Content-Length` header, the open-source version would remove it and convert the Transfer-Encoding to 'chunked'. We enhanced the logic to restore the `Content-Length` header and the regular encoding before sending the response to the client.

### [`allow`](http://nginx.org/en/docs/http/ngx_http_access_module.html#allow)

<span class="badge">标准</span> <span class="badge green">修改增强</span>

**使用语法：** `allow address | CIDR | all;`<br/>
**默认设置：** `-` <br/>
**可用位置：** server, location

允许来自指定的网址或者网段的客户访问，该指令通常会和 [`deny`](#deny) 指令一起使用。
CDN Pro 在 [nginx 开源版本](http://nginx.org/en/docs/http/ngx_http_access_module.html#allow) 基础上上进行了部分代码优化，使其能更好地适配 CDN 分层缓存结构。


### [`auth_request`](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request)

<span class="badge dark">高级</span>

**使用语法：** `auth_request uri | off`;<br/>
**默认设置：** `auth_request off;`<br/>
**可用位置：** server, location

本指令支持指定一个URI路径来进行访问控制。CDN Pro 服务器将发起针对该 URI 的鉴权子请求，并根据该子请求的结果对原始请求进行访问控制。代码逻辑源自 Nginx [开源版本](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request)，无改动。

### [`auth_request_set`](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request_set)

<span class="badge dark">高级</span>

**使用语法：** `auth_request_set $variable value;`<br/>
**默认设置：** `—`<br/>
**可用位置：** server, location

须与 [`auth_request`](#auth_request) 指令一起使用，在鉴权子请求完成后将响应中的某些数据值（如响应头，状态码等）赋值给变量。代码逻辑源自 Nginx [开源版本](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request_set)，无改动。

### [`break`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#break)

<span class="badge">标准</span>

**使用语法：** `break;`<br/>
**默认设置：** `—`<br/>
**可用位置：** server, location, if

终止执行当前 nginx [rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)的指令。代码逻辑源自 Nginx 开源版本，无改动。
该指令属于 nginx [rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)。在 CDN Pro 对请求处理的早期阶段中，它将与同一模块中的其他指令一同被执行。

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

该指令设置 CDN Pro 边缘服务器从客户端接收完整请求头的最长空闲等待时间。如果您需要在加速项中更改它的默认值，请联系我们的技术支持团队。可设最大值为 60 秒。请注意，该配置对`Host` 请求头无效，因为服务器需要其值来确定对应的Edge Logic。如果在 10 秒内没有收到来自客户端的 `Host` 请求头，服务器将关闭连接。


### `client_send_timeout`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `client_send_timeout time;`<br/>
**默认设置：** matches `origin_read_timeout` if it is set, or 20s <br/>
**可用位置：** server

该指令与开源版本的 [`send_timeout`](http://nginx.org/en/docs/http/ngx_http_core_module.html#send_timeout) 指令非常相似，用于设置向客户端发送响应时的最大空闲等待时间。如果您需要在加速项中更改它的默认值，请联系我们的技术支持团队。可设最大值为 60 秒。

### `custom_log_field`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `custom_log_field {custom log field id} {value or variable};`<br/>
**默认设置：** `-`<br/>
**可用位置：** server, location, if in location

该指令允许您将最多 2 个自定义字段添加到访问日志中。该指令生效后，当您配置自定义日志下载的格式或使用我们的高级流量分析工具时，可以通过关键字 “custom1” 和 “custom2” 来引用它们。如果您需要开启此功能，请联系我们的技术支持团队。

### [`deny`](http://nginx.org/en/docs/http/ngx_http_access_module.html#deny)

<span class="badge">标准</span> <span class="badge green">修改增强</span>

**使用语法：** `deny address | CIDR | all;`<br/>
**默认设置：** `—`<br/>
**可用位置：** server, location

拒绝（返回 403）来自指定网络或地址的访问请求。该指令通常与 [`allow`](#allow) 一起使用。 CDN Pro 在 [nginx 开源版本](http://nginx.org/en/docs/http/ngx_http_access_module.html#deny) 基础上进行了部分代码优化，使其能更好适配 CDN 分层缓存结构。

### `enable_websocket`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `enable_websocket;`<br/>
**默认设置：** `-`<br/>
**可用位置：** server, location

该指令用于开启 WebSocket 协议。客户端必须确保不使用 HTTP/2。默认读取和发送超时设置为 21 秒，您也可以使用 `origin_read_timeout` 或 `origin_send_timeout` 指令修改超时时间。

### [`error_page`](http://nginx.org/en/docs/http/ngx_http_core_module.html#error_page)

<span class="badge dark">高级</span>

**使用语法：** `error_page code ... uri;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if in location

本指令允许您将源站的响应状态码作为条件来跳转到一个指定的URI。本指令可依照以下顺序，携带3组参数：
第一组：（必填项）作为判定条件的一个或多个原始状态码，以空格隔开。比如 "400 401 402 403 404 406 501 502 503 504"；
第二组：（非必填）设置一个新的响应状态码，格式为 "=200"。如有配，则原始状态码将被替换为新状态码响应客户端；
第三组：（必填项）设置新的响应正文，格式为 URI 或者一个完整的 URL。比如 "@error"(named URI) 或 "http://www.abc.com" (完整URL)。当使用完整 URL 时，会把响应状态码改为302（除非第二组参数为 "=301"，则新响应状态码为301，其余情况下皆为302）。；
代码逻辑源自 [Nginx 开源版本](http://nginx.org/en/docs/http/ngx_http_core_module.html#error_page)无改动。 同时 CDN Pro 默认开启了 [`proxy_intercept_errors on`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_intercept_errors) 来支持将源的响应状态码作为判断条件。

例如，下述指令可以在第一个源站返回状态码 403 时尝试第二个源站：
```nginx
location /abc {
  origin_pass my-origin1;
  error_page 403 = @try_origin1;
}
location @try_origin1 {
  origin_pass my-origin2;
}
```

### `eval_func`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `eval_func $result {function name} {parameters};` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if

该指令用于执行一些常见的编码、解码、哈希计算、HMAC、加解密和变量对比操作。CDN Pro将其添加到了[rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html) 中。目前支持的功能有：

| **Type** | **Name** | **Syntax** |
|----------|----------|------------| 
| hash | **SHA256**, **MD5** | ```eval_func $output SHA256 $input;``` |
| BASE64<br>codec | BASE64_ENCODE<br>**BASE64_DECODE** | ```eval_func $output BASE64_ENCODE $input;``` |
| URL<br>codec | URL_ENCODE<br>**URL_DECODE** | ```eval_func $output URL_ENCODE $input;``` |
| HEX<br>codec | HEX_ENCODE<br>**HEX_DECODE** | ```eval_func $output HEX_ENCODE $input;``` |
| AES<br>cipher | **ENCRYPT_AES_256_CBC**<br>**DECRYPT_AES_256_CBC** |```eval_func $output ENCRYPT_AES_256_CBC $key $iv $message;```<br>```$key```和```$iv```都应为32字节的二进制串. |
| HMAC<br>generation | **HMAC**<br>**HMAC_HEXKEY** | ```eval_func $output HMAC $key $message {dgst-alg};```<br>```eval_func $output HMAC_HEXKEY $hexkey $msg {dgst-alg};```<br>```{dgst-alg}``` can be ```MD5```, ```SHA1```, ```SHA256``` |
| integer<br>comparator | COMPARE_INT | ```eval_func $output COMPARE_INT $data1 $data2;```<br>```$output``` will be "1" when ```$data1 > $data2```. "0" and "-1" for the other cases. |
| integer<br>calculator | CALC_INT | ```eval_func $output CALC_INT "$integer + 1000";```<br>The expression will be evaluated and the result be assigned to ```$output``` . The expression only supports +, -, *, / of integers. Invalid input results in "NAN" in the output variable.|
| integer<br>absolute value | ABS_INT | ```eval_func $output ABS_INT $integer;```<br>```$output``` will be the absolute value of ```$integer```. Invalid input results in empty string. |
| 字符串<br>修改 | REPLACE | ```eval_func $output REPLACE <old> <new> $input;``` |
| 字符串<br>修改 | TO_UPPER | ```eval_func $output TO_UPPER $input;```<br>把输入字符串转成大写。|
| 字符串<br>修改 | TO_LOWER | ```eval_func $output TO_LOWER $input;```<br>把输入字符串转成小写。|
| 字符串<br>修改 | SUBSTR | ```eval_func $output SUBSTR <start> <length> $input;```<br>获取输入字符串的一个子串，长度为```<length>```，起始位置为```<start>```。```<start>```可以是一个负数，就像Javascript的[substr()](https://www.w3schools.com/jsref/jsref_substr.asp)函数一样.|

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

### [`gzip_types`](http://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_types)

<span class="badge dark">高级</span> <span class="badge green">修改增强</span>

**使用语法：** `gzip_types mime-type ...;` <br/>
**默认设置：** `gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/javascript application/xml;` <br/>
**可用位置：** server, location

CDN Pro 默认支持上述 MIME 类型文件（匹配不区分大小写）的 gzip 压缩响应（仅当响应正文大小大于 1000 字节时才压缩功能才会生效）。该默认行为应该适用于大多数用户。
该指令可用于对其他类型启用压缩。CDN Pro 对开源版本进行了改进以支持形如 `text/*` 和 `*javascript` 的前、后缀模糊匹配。该指令最多支持20个模糊匹配参数。

### [`if`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#if)

<span class="badge">标准</span> <span class="badge green">修改增强</span>

**使用语法：** `if (condition) { ... }`<br/>
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

### [`internal`](http://nginx.org/en/docs/http/ngx_http_core_module.html#internal)

<span class="badge dark">高级</span>

**使用语法：** `internal;` <br/>
**默认设置：** `—` <br/>
**可用位置：** location <br/>

指定某个 location 块内的逻辑只能用于内部请求，不允许被客户端直接访问。代码逻辑源自 Nginx 开源版本，无改动。

### [`limit_rate`](http://nginx.org/en/docs/http/ngx_http_core_module.html#limit_rate)

<span class="badge">标准</span>

**使用语法：** `limit_rate rate;` <br/>
**默认设置：** `limit_rate 4m;` <br/>
**可用位置：** server, location, if in location

限制对客户端的响应传输速率，以字节/秒为单位。可配范围为 [1-8]m 或 [1-8192]k。默认值为 4MByte/s。


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

按照请求 URI(不带问号后参数) 进行分类匹配，并在 {} 中设置此类请求的处理逻辑。代码源自[NGINX 开源版本](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)，无变更。

### `origin_connect_timeout`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `origin_connect_timeout time;` <br/>
**默认设置：** `origin_connect_timeout 5s;` <br/>
**可用位置：** server

该指令是 [proxy_connect_timeout](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_connect_timeout) 的增强版本。它设置了 CDN Pro 与源站服务器建立连接的超时时间。该值仅限于 [1,15] 中的整数，后跟“s”。 CDN Pro 已确保回源链路上所有节点都遵守此超时值。该指令不能出现在 location 配置块中。


### `origin_fast_route`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `origin_fast_route on|off;` <br/>
**默认设置：** `origin_fast_route off;` <br/>
**可用位置：** server, location, if in location

该指令用于在访问源站时开启使用**快速路由**功能。此功能由我们专有的 HDT 技术提供支持，可提供更稳定的连接并减少延迟。通过**快速路由**传输的回源流量可能会被收取比边缘流量更高的费率。


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

policy 的可能取值是 ```repeat,overwrite,``` 以及 ```preserve。``` policy 参数同样支持使用变量作为值。默认的策略是```repeat```。

*   ```repeat``` 不管指定响应头原先是否存在，强制添加响应头部和值到上游响应中。
*   ```overwrite``` 如果指定响应头已存在，则对已有响应头的值进行改写；否则将配置响应头和值添加到上游响应中。
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
**默认设置：** `origin_limit_rate 0;`<br>
**可用位置：** server, location

该指令在 [proxy_limit_rate](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_limit_rate) 指令基础上进行了优化提升，用于限制从源服务器读取正文的速度。


### `origin_pass`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `origin_pass _origin_name[URI];`<br>
**默认设置：** none <br>
**可用位置：** location, if in location

该指令用于指定获取内容的源站以及URI。它在 nginx [proxy_pass](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass) 指令的基础上进行了优化提升。该指令携带的参数是在加速项“源站配置”中提前设置好的源站名。源站名后可以选择配置一个 URI，该 URI 中支持使用变量。如果未指定 URI，则 CDN Pro 将以携带问号后参数的完整 URI（可能已被 `rewrite` 指令更改） 发起对源站的请求。如果您希望回源时去掉问号后参数，请在源名称后添加 `$uri`。例如：
```nginx
# 如果没有配置URI，nginx会自动添加URL编码过的$uri以及query string。
origin_pass my_origin;
eval_func $uri_uenc URL_ENCODE $uri;
origin_pass my_origin$uri_uenc$is_args$args; #效果完全同上
origin_pass my_origin$uri_uenc; #不带query string回源
origin_pass my_origin/abc$uri_uenc;
```
请注意nginx变量`$uri`的值是被URL解码过的，所以其有可能包含二进制格式，比如UTF-8。
如果源站无法处理二进制的URL，您可以使用`eval_func`将其URL编码后再用来生成回源请求。

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


### `origin_selection_algorithm`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `origin_selection_algorithm {algorithm name};` <br/>
**默认设置：** `origin_selection_algorithm round_robin;` <br/>
**可用位置：** server, location

当源站的域名解析为多个 IP 地址时，该指令用于设置使用哪个算法来选择源站IP。有效值为：

* round_robin : 轮询回源，默认设置，它尝试将回源流量均匀分配到所有的源站IP上。
* consistent_hash : 一致性哈希回源，基于回源 URL 的哈希值。如果源站有缓存，可以提高其命中率。
* sorted_list : 优选回源，按照源站的链路质量状况回最优的源IP。当源站IP地理分布广泛时，此回源方式有助于确保回源性能稳定。


### [`origin_set_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header)

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：**  `origin_set_header field value if(condition);` <br/>
**默认设置：** `origin_set_header host $host;` <br/>
**可用位置：** server, location, if in location

该指令在 [proxy_set_header](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header) 的指令基础上进行了优化提升，用于增、删、改回源请求头。CDN Pro 对开源版本代码进行了以下提升：


1. 不同层级（server/location/if）的配置会被合并。但是，如果同一个回源请求头出现在上述不同位置，则只有配置最内层的指令才会生效。
2. CDN Pro 采用了分层缓存结构，我们确保此指令设置仅在回源站时（而不是回上传父节点时）才会生效。
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
2. 如果要使用该指令修改传给源站的 `Host` 请求头，则需要确保 [加速项配置](/cdn/apidocs#operation/createPropertyVersion) 中的“origins.hostHeader”字段配置为空。否则在配置校验环节将出现校验失败。
3. CDN Pro 的边缘服务器会默认将来自客户端的大多数请求头部原样传递给父服务器和源站，只有这几个例外：`If-Modified-Since`，`If-Unmodified-Since`，`If-None-Match`，`If-Match`，`Range`，以及 `If-Range`。对于可缓存的请求，服务器在回源的时候会根据缓存策略自动重新生成这些头部。对于不可缓存的请求，如果您希望将这些请求头部原样传递给源站，请参考下面这个示例使用本指令：
```nginx
proxy_no_cache 1;      # 不要缓存
proxy_cache_bypass 1;  # 不使用缓存文件响应客户
# 将客户端的If-Modified-Since请求头传递给源站
origin_set_header If-Modified-Since $http_if_modified_since;
origin_pass My-Dynamic-Origin;
```
由于本指令对发往父节点的请求不生效，您需要将源站配置里的"direct connection"选项设为"always direct"来确保边缘服务器会直接联系源站。否则发往父节点的请求仍会缺失这些头部。

### [`proxy_buffering`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffering)

<span class="badge">标准</span>

**使用语法：** `proxy_buffering on | off;` <br/>
**默认设置：** `proxy_buffering on;` <br/>
**可用位置：** server, location

启用或禁用 CDN Pro 的响应缓冲功能。代码源自 [NGINX 开源版本](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffering)，无变更。

### [`proxy_cache_background_update`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_background_update)

<span class="badge">标准</span>

**使用语法：** `proxy_cache_background_update on | off;;` <br/>
**默认设置：** `proxy_cache_background_update off;` <br/>
**可用位置：** server, location

该指令用于允许 CDN Pro 先将旧缓存响应给客户端，同时通过后台子请求的方式来更新过期缓存。在分发某些需要较长时间才能从源站获取完整数据的大文件时，该配置项有助于提高响应能力，减少客户端的等待时长。通常情况下，它应该与带有 `updating` 选项的 [`proxy_cache_use_stale'](#proxy_cache_use_stale) 指令结合使用。

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

### [`proxy_cache_methods`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_methods)

<span class="badge">标准</span>

**使用语法：** `proxy_cache_methods GET | HEAD | POST ...;` <br/>
**默认设置：** `proxy_cache_methods GET HEAD;` <br/>
**可用位置：** server, location

该指令用于配置可被 CDN Pro 缓存的客户端请求方法，默认情况下 “GET” 和 “HEAD” 这两种方法将会被配置为可缓存。逻辑源自 [NGINX 开源版本](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_methods) ，无变更。

### proxy_cache_min_age 

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `proxy_cache_min_age time;` <br/>
**默认设置：** `proxy_cache_min_age 0s;` <br/>
**可用位置：** server, location, if in location

Description:

该指令允许您为响应文件配置最小缓存时间。如果源给的 Cache-Control 响应头中的 max-age 小于所指定的参数值，则使用指定的参数值作为缓存时间。例如，如果源站的 Cache-Control 响应头中的max-age值为100s，而该指令配置的值为200s，则内容的有效缓存时间为200s。

CDN Pro服务器将根据源站提供的响应头以及 nginx 指令按照以下优先顺序确定缓存时间：

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

该指令用于给不同的响应状态码设置缓存时间。只有当源站提供的响应头中没有缓存规则时（如 Cache-Control\Expire 响应头）时，该配置项才会生效。换句话说，源站的响应头字段 `Cache-Control`、`Expires`、`Set-Cookie` 等具有更高的优先级，除非这些响应头被 [`proxy_ignore_cache_control`](#proxy_ignore_cache_control) 或 [`proxy_ignore_headers`](#proxy_ignore_headers) 忽略。CDN Pro 在[NGINX 开源版本](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_valid) 基础上上进行了部分代码优化以支持使用变量来设置缓存时间。变量的值如果不是一个合法的时间参数，则该指令不生效，内容不会缓存。参数值 0 表示缓存响应并将其视为已过期。当 location 模块中没有该配置项时，上一层（ server 层）的配置会被继承到 location 中。如果您可以根据请求中的某些参数识别动态/不可缓存的内容，请使用 [`proxy_cache_bypass`](#proxy_cache_bypass) 和 [`proxy_no_cache`](#proxy_no_cache) 来绕过缓存执行过程并提高性能。

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

<span class="badge dark">高级</span>

**使用语法：** `proxy_next_upstream error | timeout | invalid_header | http_500 | http_502 | http_503 | http_504 | http_403 | http_404 | http_429 | non_idempotent | off ...;` <br/>
**默认设置：** `proxy_next_upstream error timeout;` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 在哪些情况下向源站配置里的下一个服务器发起重试请求。源自 NGINX 公共版本没有变化。


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

该指令用于设置 CDN Pro 不对响应进行缓存的条件。如果携带的参数值至少有一个不为空且不为0，则此次响应将不被缓存：

```nginx
proxy_no_cache $cookie_nocache $arg_nocache$arg_comment; 
proxy_no_cache $http_pragma    $http_authorization;
```
由于响应没有被保存，所以在节点上检索该响应也是无意义的行为。因此，该指令通常搭配 [`proxy_cache_bypass`](#proxy_cache_bypass) 指令一起使用。

### [`proxy_pass_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass_header)

<span class="badge">标准</span>

**使用语法：**	`proxy_pass_header {field};` <br/>
**默认设置：** `proxy_pass_header Date;` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 将指定的某个 [Nginx 默认隐藏的响应头](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_hide_header) 传递给客户端。CDN Pro 默认将源站提供的的 `Date` 响应头传递给客户端，该响应头携带了 CDN Pro 从源站获取对应响应的时间点。该指令支持多次配置，可用于设置 CDN Pro 传递多个不同的响应头给客户端。当 location 模块中没有该配置项时，上一层（ server 层）的配置会被继承到 location 中。

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

该指令用于修改 CDN Pro 传给客户端的响应答头中的"Location"和"Refresh"内容。源自 NGINX 开源版本，无变更。

### `proxy_set`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `proxy_set $variable value [if(...)];`<br>
**默认设置：** none <br>
**可用位置：** server, location, if in location

该指令将参数 `value` 的值赋值给变量 `$variable` ， `value` 可以是另一个变量或变量和字符的组合。该指令与另一个 [`set`](#set) 指令非常相似，两者的区别是它们位于 CDN Pro 的不同处理阶段中。 `set` 指令是在流程早期的的 “rewrite” 阶段中被执行——几乎是在 CDN Pro 接收到客户端请求之后就立即执行。相反，`proxy_set` 是在 CDN Pro 从源接收到响应头（在缓存未命中的情况下）或从缓存中检索完毕后才被执行。因此，proxy_set 指令可以将响应头中的信息赋值给目标变量参数（如果使用了 [`origin_header_modify`](#origin_header_modify) 指令，则取到的header值为 [`origin_header_modify`](#origin_header_modify) 指令修改后的新值）。此外，该指令支持 `if()` 参数，用于指定该指令生效的条件。示例如下：
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
该指令可跨不同层级（http/server/location/location if）合并。如果不同层级中使用该指令对同一个变量进行了赋值，则最内层的配置生效。

### [`proxy_ssl_protocols`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ssl_protocols)

<span class="badge dark">高级</span>

**使用语法：** `proxy_ssl_protocols [SSLv2] [SSLv3] [TLSv1] [TLSv1.1] [TLSv1.2] [TLSv1.3];` <br/>
**默认设置：** `proxy_ssl_protocols TLSv1 TLSv1.1 TLSv1.2;` <br/>
**可用位置：** server, location

该指令用于设置 CDN Pro 回源时的握手协议。源自 Nginx 开源版本，无变更。

### `realtime_log_downsample`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `realtime_log_downsample factor;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location

该指令用于覆盖掉加速项配置 [实时日志](/docs/portal/edge-configurations/creating-property#real-time-log) 中设置的“采样率”。 其参数 `factor` 可以是 [0, 65535] 中的整数或变量。值 0 表示关闭实时日志功能； 1 表示不对实时日志进行采样； N>1 表示每 N 个请求将生成一条实时日志。如果该指令的参数值为空字符串，则指令不生效；如果该指令的参数值无法被正常解析（如非整数的字符串），则该参数将被视为100。最终生效的采样率可通过内置变量 [`$realtime_log_ds_factor`](/docs/edge-logic/built-in-variables#realtime_log_ds_factor) 记录到实时日志中。

### [`return`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return)

<span class="badge">标准</span>

**使用语法：** `return code [text];
       return code URL;
       return URL;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if

停止当前的代码处理，并将指定的响应状态码以及响应正文（如有配置text或URL）返回给客户端。 源自 [开源版本](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return) 没有变化。

该指令属于nginx的 [rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)。它在请求处理的早期阶段同该模块里的其他指令一道被顺序（imperatively）执行。


### [`rewrite`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite)

<span class="badge">标准</span>

**使用语法：** `rewrite regex replacement [flag];` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if

如果请求URI匹配正则表达式`regex`，则将其改写为`replacement`的值。功能上和[开源版本](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite)完全一致。 请注意该指令匹配的对象是变量`$uri`，一个经过[归一化](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)，不带query string的请求URI。如果匹配成功，则会把`replacement`的值赋给`$uri`.

该指令属于nginx的[rewrite模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)。它在请求处理的早期阶段同该模块里的其他指令一道被顺序（imperatively）执行。

### [`satisfy`](http://nginx.org/en/docs/http/ngx_http_core_module.html#satisfy)

<span class="badge">标准</span>

**使用语法：** `satisfy all | any;` <br/>
**默认设置：** `satisfy all;` <br/>
**可用位置：** server, location

Allows access if all (all) or at least one (any) of the ngx_http_access_module ([`allow`](#allow), [`deny`](#deny)), ngx_http_auth_request_module ([`auth_request`](#auth_request)) modules allows access. No change to the public version.

### `sanitize_accept_encoding`

<span class="badge dark">高级</span> <span class="badge primary">全新特有</span>

**使用语法：** `sanitize_accept_encoding enc1 enc2 … ;` <br/>
**默认设置：** `sanitize_accept_encoding gzip;` <br/>
**可用位置：** server

This directive processes the incoming `Accept-Encoding` header field to consolidate its value. You can specify up to four parameters after this directive. Each parameter is a comma-separated combination of one or more `content-encoding` algorithms, such as "gzip,br" or "br". For each request from the clients, the CDN Pro edge server tries to match the received `Accept-Encoding` header field value with the specified combinations from left to right. If all the algorithms in a combination are found in the header, the header value is replaced with that combination. If no match is found, the header value is set to "identity".

For example: if the configuration is:
```nginx
sanitize_accept_encoding "gzip,br" "gzip" "deflate" "br";
```
The processing logic will be:
```php
if (A-E-header.contains("gzip") && A-E-header.contains("br"))
    A-E-header="gzip,br";
else if (A-E-header.contains("gzip")) A-E-header="gzip";
else if (A-E-header.contains("deflate")) A-E-header="deflate";
else if (A-E-header.contains("br")) A-E-header="br";
else A-E-header="identity";
```
It is not hard to see that the default setting of this directive rewrites the header value to either "gzip" or "identity". Combined with the default caching policy, each server would [cache the response in only one of the two encoded formats](/docs/edge-logic/faq.md#the-support-and-non-support-of-vary). If a client's request is asking for the other format, the server would compress or decompress the cached version on-the-fly to fulfill it.

If you use this directive and override the default setting, most likely you also want to cache the response in different encodings separately. You can achieve this by adding the header field value into the cache key:
```nginx
set $cache_misc $cache_misc."ae=$http_accept_encoding";
```

### [`secure_link`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link)

<span class="badge dark">高级</span>

**使用语法：** `secure_link expression;` <br/>
**默认设置：** `—` <br/>
**可用位置：** server, location

Defines a string with variables from which the checksum value and lifetime of a link will be extracted. No change to the public version.

### [`secure_link_md5`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_md5)

<span class="badge dark">高级</span>

**使用语法：** `secure_link_md5 expression;` <br/>
**默认设置：** `—` <br/>
**可用位置：** server, location

Defines an expression for which the MD5 hash value will be computed and compared with the value passed in a request. No change to the public version.

### [`secure_link_secret`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_secret)

<span class="badge dark">高级</span>

**使用语法：** `secure_link_secret word;` <br/>
**默认设置：** `—` <br/>
**可用位置：** location

Defines a secret word used to check authenticity of requested links. No change to the public version.

### [`set`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#set)

<span class="badge">标准</span>

**使用语法：**	`set $variable value;` <br/>
**默认设置：**	`-` <br/>
**可用位置：** server, location, if

Assigns a value to the specified variable. No change to the public version. In particular, the cache key [can be customized](/docs/edge-logic/faq.md#how-do-you-include-query-parameters-andor-request-headers-in-the-cache-key) by assigning a value to the `$cache_misc` variable.

This directive belongs to the nginx [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html). It is executed `imperatively` with the other directives in the same module in an early phase of the request processing.

### [`slice`](http://nginx.org/en/docs/http/ngx_http_slice_module.html#slice)

<span class="badge">标准</span> <span class="badge green">修改增强</span>

**使用语法：**	`slice size;` <br/>
**默认设置：** `slice 0;` <br/>
**可用位置：** server

Sets the size of the slices when fetching large files from the origin. The valid values are 0, which disables slicing, OR an [nginx size](http://nginx.org/en/docs/syntax.html) that is between `512k` and `512m`, inclusive. The origin has to support range requests and respond with status code 206. If caching is desired, use the statement `proxy_cache_valid 206 ...` to enable caching of the partial responses. We made the following changes to this directive on top of the open-source version:
* We disallowed this directive in any "location" block to ensure the entire domain has the same slice size. This is to avoid potential problems when a request needs to be processed in multiple locations with different slice sizes.
* CDN Pro requires all cached slices to carry the same ETag value to ensure the content is consistent. When a slice fetched from the origin has a value that is different from the cached ones, any in-progress transfers to clients are terminated and all the cached slices are purged immediately. Please make sure the ETag value of each file on origin does not change unless the file's content has changed. This behavior can be disabled using `slice_ignore_etag on;`.
* When slicing is enabled, the server automatically removes the `Accept-Encoding` header in the request to origin to disable compression. If this behavior is overridden, for example, by the `origin_set_header Accept-Encoding ...` directive, the client may receive a corrupted response.

### `slice_ignore_etag`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `slice_ignore_etag on/off;` <br/>
**默认设置：** `slice_ignore_etag off;` <br/>
**可用位置：** server

This directive can be used to disable the ETag consistency check of sliced files. Use it only as a workaround if the origin generates different ETag values for the same file.

### `sorted_querystring_filter_parameter`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `sorted_querystring_filter_parameter {param1} {param2} … ;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server, location, if in location

Removes some query parameters from the variable ```$sorted_querystring_args```.
This feature is implemented on top of this [open-source project](https://github.com/wandenberg/nginx-sorted-querystring-module).

### [`sub_filter`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter)

<span class="badge dark">高级</span>

**使用语法：** `sub_filter {string} {replacement};` <br/>
**默认设置：** `—` <br/>
**可用位置：** server, location

Sets a string to replace in the response and a replacement string. No change to the public version. Note that when the response is compressed, the search and replace may not work as desired.

### [`sub_filter_last_modified`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter_last_modified)

<span class="badge dark">高级</span>

**使用语法：** `sub_filter_last_modified on | off;` <br/>
**默认设置：** `sub_filter_last_modified off;` <br/>
**可用位置：** server, location

Allows preserving the “Last-Modified” header field from the original response during replacement to facilitate response caching. No change to the public version.

### [`sub_filter_once`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter_once)

<span class="badge dark">高级</span>

**使用语法：** `sub_filter_once on | off;` <br/>
**默认设置：** `sub_filter_once on;` <br/>
**可用位置：** server, location

Indicates whether to look for each string to replace once or repeatedly. No change to the public version.

### [`sub_filter_types`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter_types)

<span class="badge">标准</span>

**使用语法：** `sub_filter_types {mime-type} ...;` <br/>
**默认设置：** `sub_filter_types text/html;` <br/>
**可用位置：** server, location

Enables string replacement in responses with the specified MIME types in addition to “text/html”. No change to the public version.


### [`valid_referers`](http://nginx.org/en/docs/http/ngx_http_referer_module.html#valid_referers)

<span class="badge">标准</span>

**使用语法：** `valid_referers none | blocked | server_names | {string} ...;` <br/>
**默认设置：** `—` <br/>
**可用位置：** server, location

Specifies the “Referer” request header field values that will cause the embedded $invalid_referer variable to be set to an empty string. No change to the public version.

### `access_log_downsample`

<span class="badge">标准</span> <span class="badge primary">全新特有</span>

**使用语法：** `access_log_downsample factor;` <br/>
**默认设置：** `-` <br/>
**可用位置：** server

Downsamples the local access log. A `factor` of N means one log entry for every N requests. It can be used to reduce the amount of access log to download from the portal or API. A log field can be defined with the keyword `%samplerate` to show this factor. This directive has no effect on the edge servers' behavior, including the real-time log, whose downsampling is controlled by [`realtime_log_downsample`](#realtime_log_downsample). We may also use this directive to avoid properties with large request volume to overload the log processing system.
