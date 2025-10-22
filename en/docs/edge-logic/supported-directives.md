## Supported Directives

This section lists all the directives you can use in the CDN Pro Edge Logic. While some of them are unmodified from the open-source version of nginx, many have been <span class="badge green">enhanced</span> to better suit the needs of a CDN proxy server. {{title}} also introduced some <span class="badge primary">proprietary</span> directives.

Each non-proprietary directive includes a direct link to the official nginx documentation. A detailed description is provided if the directive has been modified from the original version, such as limitations on the parameters of some directives.

In the following list, the <span class="badge">standard</span> directives are available to all customers and should cover the most common use cases. The <span class="badge dark">advanced</span> directives are usually more resource-consuming than the standard ones and will be granted on a case-by-case basis. If you need one or more of them, contact {{title}} customer service.

**Note:** Some directives were previously also available in Load Balancer Logic. However, following the [upgrade of the edge node structure](</docs/edge-logic/edge-node-structure-upgrade.md>), Load Balancer Logic has been deprecated. The Load Balancer Logic should no longer be used.

### `access_log_downsample`

<span class="badge">standard</span> <span class="badge primary">proprietary</span>

**Syntax:** `access_log_downsample factor;` <br/>
**Default:** `-` <br/>
**Contexts:** server, location, if in location

Downsamples the local access logs. A `factor` of N means one log entry for every N requests. The factor specified can be a positive integer or a variable. The default value of 1, meaning no downsampling, is used if the directive is not configured or when the variable value is invalid. This directive can be used to reduce the amount of access logs to download from the portal or API. A log field can be defined with the keyword `%samplerate` to show this factor. This directive has no effect on the real-time log, whose downsampling is controlled by [`realtime_log_downsample`](#realtime_log_downsample). We may also use this directive to prevent properties with large request volume from overloading the log processing system.

### [`add_header`](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header) 

<span class="badge">standard</span> <span class="badge green">Enhanced</span> 

**Syntax:** `add_header name value [policy=...] [always] [if(...)];`<br/>
**Default:** `-` <br/>
**Context:** server, location, if in location

This directive modifies the response headers to the client when the status code is 200, 201, 204, 206, 301-304, 307, or 308. When the 'always' parameter is present, it works for all status codes. {{title}} has made the following major changes to the [open-source version](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header):

1. A parameter ```policy=``` has been introduced to control the behavior more precisely:
```nginx
add_header X-My-Header $header_value policy=repeat|overwrite|preserve;
```
```overwrite```: If the header being added exists in the upstream response, the local configuration overrides the header value. If you want to remove a header, set the value to an empty string.

```preserve```: If the header being added exists in the upstream response, the header value is not changed;

```repeat```: (default) Add the header to the client response, regardless of whether the header exists in the upstream response. Repeating the headers below is not allowed. The property validation will fail if any of these headers is specified with 'policy=repeat': 

Server, Date, Content-Encoding, Location, Refresh, Last-Modified, Content-Range, Accept-Ranges, WWW-Authenticate, Expires, ETag, Content-Length, Content-Type, Transfer-Encoding, Connection, Keep-Alive, Accept, Accept-Charset, Accept-Encoding, Accept-Language, Age, Allow, Authorization, Content-Language, Content-Location, Content-MD5, Expect, From, Host, If-Match, If-Modified-Since, If-None-Match, If-Range, If-Unmodified-Since, Max-Forwards, Pragma, Proxy-Authenticate, Proxy-Authorization, Range, Referer, Retry-After, If-Match, TE, Trailer, Upgrade, User-Agent, and Vary.

**Limitation:** For the following "built-in" headers, the behavior is always fixed, regardless of the configured policy:

| **"built-in" Header Name** | **Behavior** |
| ---- | ---- |
| ```Cache-Control``` | ```repeat``` |
| ```Link``` | ```repeat``` |
| ```Last-Modified``` | ```overwrite``` |
| ```ETag``` | ```overwrite``` |
| ```Transfer-Encoding``` | ```preserve``` |
| ```Connection``` | ```preserve``` |
| ```Keep-Alive``` | ```preserve``` |


If needed, use [proxy_hide_header](#proxy_hide_header) to remove the "Cache-Control" or "Link" headers from the origin.

Example configurations:
```nginx
add_header X-Cache-Status $upstream_cache_status policy=preserve;
```

2. The new parameter ```if(condition)``` has been introduced to allow adding the header based on some condition. If the condition is true, the ```add_header``` directive adds the header and the value to the downstream response based on the policy. The ```if``` parameter should always be at the end of the directive configuration. A condition may be any of the following:

*   A variable name; false if the value of a variable is an empty string.
*   Comparison of a variable with a string using the "=" and "!=" operators.
*   Matching a variable against a regular expression using the operators "\~" (for case-sensitive matching) and "\~\*" (for case-insensitive matching). Negative operators "!\~" and "!\~\*" are also available. If a regular expression includes the "}" or ";" characters, enclose the whole expression in single or double quotes.

Example:
```nginx
add_header X-Upstream-Status-OK 1 if($upstream_response_status = 200);
add_header X-Status-Good 1 if($upstream_response_status ~ ^[23]);
```

3. Another change made to this directive is the ability to merge the configurations across different levels (server/location/if). However, if the same header name appears in multiple levels, the configuration of only the deepest layer takes effect for that header.

### [`add_trailer`](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_trailer) (Deprecated)

<span class="badge">standard</span> <span class="badge green">Enhanced</span>

**Syntax:** `add_trailer name value [always];`<br/>
**Default:** `-` <br/>
**Context:** server, location, if in location

Adds the specified field to the end of a response provided that the response code equals 200, 201, 206, 301, 302, 303, 307, or 308. When "always" is specified, the trailer is added regardless of the status code. Parameter value can contain variables. We made the following changes to the [open-source version](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_trailer):

1. This directive is intended to be used in the Edge Logic to pass a variable to the L7 load balancer so the real-time logger can access it with a [$upstream\_trailer\_*](/cdn/docs/edge-logic/built-in-variables#upstream_trailer_) variable. Although most variables can be passed by the [`add_header`](#add_header) directive, some of them do not have their values ready when the response header is being constructed. Here are a few of them:  [$upstream_bytes_received](/cdn/docs/edge-logic/built-in-variables#upstream_bytes_received), [$upstream_bytes_sent](/cdn/docs/edge-logic/built-in-variables#upstream_bytes_sent), [$upstream_response_time](/cdn/docs/edge-logic/built-in-variables#upstream_response_time), [$request_cpu_time](/cdn/docs/edge-logic/built-in-variables#request_cpu_time). The only way to pass them to the real-time logger is using this directive when the entire response is completed.

2. If the response from upstream has a `Content-Length` header, the open-source version would remove it and convert the `Transfer-Encoding` to 'chunked'. We enhanced the logic to restore the `Content-Length` header and the regular encoding before sending the response to the client. The added trailer won't appear in the response to the client.

This directive is deprecated. Refer to the [upgrade of edge node structure](</docs/edge-logic/edge-node-structure-upgrade.md>).

### [`allow`](http://nginx.org/en/docs/http/ngx_http_access_module.html#allow)

<span class="badge">standard</span> <span class="badge green">Enhanced</span> 

**Syntax:** `allow address | CIDR | all;`<br/>
**Default:** `-` <br/>
**Context:** server, location

Allows access from the specified network or address. Usually used together with [`deny`](#deny). Enhanced the [open-source version](http://nginx.org/en/docs/http/ngx_http_access_module.html#allow) to make it work with the hierarchical cache structure.


### [`auth_request`](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request)

<span class="badge dark">advanced</span> <span class="badge green">Enhanced</span>

**Syntax:** `auth_request uri | off`;<br/>
**Default:** `auth_request off;`<br/>
**Context:** server, location

Enables authorization based on the result of a subrequest and sets the URI to which the subrequest will be sent. We have enhanced this directive on top of the [open-source version](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request) to allow variables in the parameter. This enables you to pass the query parameters to the authorization logic:
```nginx
auth_request /auth$is_args$args;
```
The request will be granted if the auth response returns a 2xx status code or rejected if the auth response returns a 401 or 403 status code. Other status codes are considered an error and return a 500 "internal error" to the client.

Variables in the subrequest context are handled separately from the main request. This avoids variables in the main request context being polluted. 

The Content-Length header (if any) is removed, as an auth request is not supposed to carry a request body.

### [`auth_request_set`](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request_set)

<span class="badge dark">advanced</span>

**Syntax:** `auth_request_set $variable value;`<br/>
**Default:** `—`<br/>
**Context:** server, location

Sets the request variable to the given value after the authorization request completes. No change to the [open-source version](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request_set).
The first parameter is a variable in the context of the main request.
Any variables that appear in the second parameter are from the context of the auth sub-request.
Here is an example to add something returned from the remote auth server to the cache key:
```nginx
auth_request /auth$is_args$args;
auth_request_set $cache_misc $cache_misc.etag=$upstream_http_etag;

location = /auth {
  internal;
  proxy_method HEAD;
  # specify remote auth server and URI
  origin_pass remote_auth_server/auth-req$is_args$args;
  # send the request URI to the auth server
  origin_set_header client-request-uri $request_uri;
}
```

### [`break`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#break)

<span class="badge">standard</span>

**Syntax:** `break;`<br/>
**Default:** `—`<br/>
**Context:** server, location, if

Stops processing the current set of ngx_http_rewrite_module directives. No change to the public version. 

This directive belongs to the nginx [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html). It is executed `imperatively` with the other directives in the same module in an early phase of the request processing.

**NOTE:** If this directive appears in a [location](#location) block, any "[return](#return)" directive after it may not be executed. Hence we require the location block to directly contain an [origin_pass](<#origin_pass>) directive.

### [`brotli`](https://github.com/google/ngx_brotli#brotli)

<span class="badge dark">advanced</span>

**Syntax:** `brotli on|off;`<br/>
**Default:** `brotli on;` <br/>
**Context:** server, location, if

Enables or disables on-the-fly compression of responses. 

### [`brotli_types`](https://github.com/google/ngx_brotli#brotli_types)  (Deprecated)

<span class="badge dark">advanced</span>

**Syntax:** `brotli_types <mime_type> [...];`<br/>
**Default:** `brotli_types text/plain text/css text/xml text/javascript application/x-javascript application/javascript application/xml;` <br/>
**Context:** server, location

Enables on-the-fly compression of responses for the specified MIME types in addition to text/html. Compression is activated only when the response body size is greater than 1024 bytes. The default behavior should work well for most users. The search and match are case-insensitive. We improved the public version to support wildcards like `text/*` and `*javascript`. 

Note: Although it is currently allowed to set different MIME types for gzip and brotli compression by using [`gzip_types`](#gzip_types-deprecated) and `brotli_types`, the types set for the two directives are merged, and the merged types apply to both gzip and brotli compression. Please set the same value for the two directives if both gzip and brotli compression are enabled.

`gzip_types` and `brotli_types` have been deprecated. Please use [`compress_types`](#compress_types) instead.

### `client_body_timeout`

<span class="badge dark">advanced</span> <span class="badge green">Enhanced</span>

**Syntax:** `client_body_timeout time;`<br/>
**Default:** matches `origin_send_timeout` if it is set, or 20s <br/>
**Context:** server

This directive sets the maximum idle time when receiving the request body from the client. If you need to change the default value for your property, please contact our support team. The maximum value is 60s.

### `client_header_timeout`

<span class="badge dark">advanced</span> <span class="badge green">Enhanced</span>

**Syntax:** `client_header_timeout time;`<br/>
**Default:** `client_header_timeout 10;`<br/>
**Context:** server

This directive sets the maximum wait time for the complete request header from the client. If you need to change the default value for your property, please contact our support team. The maximum value is 60s. Please notice that if the `Host` header is not received within the default 10s, the server will close the connection and the setting in the Edge Logic will not take effect.

### [`client_max_body_size`](http://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size)

<span class="badge dark">advanced</span> 

**Syntax:** `client_max_body_size size;`<br/>
**Default:** `client_max_body_size 128m;`<br/>
**Context:** server, location

Sets the maximum allowed size of the client request body. If the size in a request exceeds the configured value, the 413 (Request Entity Too Large) error is returned to the client. Please be aware that browsers cannot correctly display this error. Setting size to 0 disables checking of the client request body size.

### `client_send_timeout`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `client_send_timeout time;`<br/>
**Default:** matches `origin_read_timeout` if it is set, or 20s <br/>
**Context:** server

This directive is very similar to the [`send_timeout`](http://nginx.org/en/docs/http/ngx_http_core_module.html#send_timeout) directive of the open-source version. It sets the maximum idle time when transmitting the response to the client. If you need to change the default value for your property, please contact our support team. The maximum value is 60s.

### `compress_types`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `compress_types <mime_type> [...];`<br/>
**Default:** `compress_types text/plain text/css text/xml text/javascript application/x-javascript application/javascript application/xml;`<br/>
**Context:** server, location

Enables on-the-fly compression of responses for the specified MIME types in addition to text/html. The specified MIME types apply to both brotli and gzip compression. MIME type matching is case-insensitive and supports fuzzy matching of prefixes and suffixes such as `text/*` and `*javascript`. Compression is activated only when the response body size is greater than 1024 bytes. The default behavior should work well for most users.

This directive replaces `gzip_types` and `brotli_types`.

### `custom_log_field`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span> 

**Syntax:** `custom_log_field id value;`<br/>
**Default:** `-`<br/>
**Context:** server, location, if in location

This directive allows you to add up to two customized fields into the access log. The id can be either 1 or 2. The value can contain variables. Refer to the two fields using the keywords "custom_1" and "custom_2" when configuring the download log format.

Examples:
```nginx
location / {
  custom_log_field 1 $http_x_data; # save the request header value X-Data to custom_1
  custom_log_field 2 $cookie_abc; # save the value of cookie abc to custom_2
  ...
}
```
### [`default_type`](http://nginx.org/en/docs/http/ngx_http_core_module.html#default_type)

<span class="badge">standard</span>

**Syntax:** `default_type <mime-type>;`<br/>
**Default:** `default_type application/octet-stream;`<br/>
**Context:** server, location

Defines the default MIME type of a response. No change to the public version, except the default value.

### [`deny`](http://nginx.org/en/docs/http/ngx_http_access_module.html#deny)

<span class="badge">standard</span> <span class="badge green">Enhanced</span> 

**Syntax:** `deny address | CIDR | all;`<br/>
**Default:** `—`<br/>
**Context:** server, location

Denies access from the specified network or address. Usually used together with [`allow`](#allow). Enhanced the [open-source version](http://nginx.org/en/docs/http/ngx_http_access_module.html#deny) to make it work with the hierarchical cache structure.

### `enable_websocket`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `enable_websocket;`<br/>
**Default:** `-`<br/>
**Context:** server, location

This directive enables proxying the WebSocket protocol. The client must use HTTP/1.1, not the other HTTP protocol versions. The default read and send timeouts are set to 60s and can be changed using the `origin_read_timeout` or `origin_send_timeout` directives.

When `enable_websocket` is not configured, requests with "Upgrade: websocket" header will be rejected and the status code 403 will be returned.

### [`error_page`](http://nginx.org/en/docs/http/ngx_http_core_module.html#error_page)

<span class="badge dark">advanced</span>

**Syntax:** `error_page code ... uri;` <br/>
**Default:** `-` <br/>
**Context:** server, location, if in location

Defines the URI to redirect to when the current processing results in one of the specified status codes. No change to the [public version](http://nginx.org/en/docs/http/ngx_http_core_module.html#error_page). We configured [`proxy_intercept_errors on`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_intercept_errors) to make it also respond to status codes returned from the origin.

For example, the following configuration would try a second origin when the first one returns 401 or 403:
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

<span class="badge">standard</span> <span class="badge primary">Proprietary</span> 

**Syntax:** `eval_func $result {function name} {parameters};` <br/>
**Default:** `-` <br/>
**Context:** server, location, if

This is a directive to perform some common encoding, decoding, hash, hash-mac, encryption, decryption and comparison algorithms. It is added to the [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html).  Supported functions are:

| **Type** | **Name** | **Syntax** |
|----------|----------|------------| 
| hash | **SHA256**, **MD5**<br>CRC32 | ```eval_func $output SHA256 $input;```<br>SHA256 and MD5 return a binary string; CRC32 returns a text string |
| BASE64<br>codec | BASE64_ENCODE<br>**BASE64_DECODE** | ```eval_func $output BASE64_ENCODE $input;``` |
| URL<br>codec | URL_ENCODE<br>URI_ESCAPE<br>ARG_ESCAPE<br>**URL_DECODE** | ```eval_func $output URL_ENCODE $input;```<br>```eval_func $output URI_ESCAPE $input;```<br>```eval_func $output ARG_ESCAPE $input;```<br>These 3 functions encode ```$input``` with the percent sign(```%```). ```URL_ENCODE``` escapes the most special characters, including ```/?=&```. It should be used for a component of the URL, such as a directory or filename. ```ARG_ESCAPE``` escapes fewer characters. In particular, it does not escape ```/=```. It should be used for encoding a query string argument like ```key=val```. ```URI_ESCAPE``` escapes even fewer, but it still escapes the question mark(```?```). It can be used to encode the URL without query string, for example, the variable ```$uri```.|
| HEX<br>codec | HEX_ENCODE<br>**HEX_DECODE**<br>**LITTLE_ENDIAN_BYTES** | ```eval_func $output HEX_ENCODE $input;```<br>```eval_func $output LITTLE_ENDIAN_BYTES $int $len;```<br>```LITTLE_ENDIAN_BYTES``` converts an integer ```$int``` from string format to a byte array of length ```$len```. For example, ```eval_func $output LITTLE_ENDIAN_BYTES 260 3;``` would assign ```$output``` an array of 3 bytes: ```0x04, 0x01, 0x00```.|
| AES<br>cipher | **ENCRYPT_AES_256_CBC**<br>**DECRYPT_AES_256_CBC** |```eval_func $output ENCRYPT_AES_256_CBC $key $iv $message;```<br>```$key``` and ```$iv``` should both be binary strings of 32 bytes.|
| cipher | **ENCRYPT_SYMM**<br>**DECRYPT_SYMM** | ```eval_func $output ENCRYPT_SYMM $key $iv $message $mode;```<br>```$key``` and ```$iv``` should both be binary strings. ```$mode``` can be any of the ciphers returned by <i>openssl list -cipher-commands</i>, for example, 'aes-128-cbc'. |
| HMAC<br>generation | **HMAC**<br>**HMAC_HEXKEY** | ```eval_func $output HMAC $key $message {dgst-alg};```<br>```eval_func $output HMAC_HEXKEY $hexkey $msg {dgst-alg};```<br>```{dgst-alg}``` can be ```MD5```, ```SHA1```, ```SHA256``` |
| RSA<br>signature | **RSA_SIGN**<br>RSA_VERIFY | ```eval_func $sig RSA_SIGN {dgst-alg} $msg $privkey;```<br>```eval_func $ok RSA_VERIFY {dgst-alg} $msg $sig $pubkey;```<br>```{dgst-alg}``` can only be ```SHA256```.|
| integer<br>comparator | COMPARE_INT | ```eval_func $output COMPARE_INT $data1 $data2;```<br>```$output``` will be "1" when ```$data1 > $data2```. "0" and "-1" for the other cases. |
| integer<br>calculator | CALC_INT | ```eval_func $output CALC_INT "$integer + 1000";```<br>The expression will be evaluated and the result be assigned to ```$output``` . The expression only supports +, -, *, / of integers. Invalid input results in "NAN" in the output variable.|
| integer<br>absolute value | ABS_INT | ```eval_func $output ABS_INT $integer;```<br>```$output``` will be the absolute value of ```$integer```. Invalid input results in empty string. |
| string<br>manipulation | REPLACE | ```eval_func $output REPLACE <old> <new> $input;``` |
| string<br>manipulation | TO_UPPER | ```eval_func $output TO_UPPER $input;```<br>Convert the input string to upper case.|
| string<br>manipulation | TO_LOWER | ```eval_func $output TO_LOWER $input;```<br>Convert the input string to lower case.|
| string<br>manipulation | SUBSTR | ```eval_func $output SUBSTR <start> <length> $input;```<br>Get a sub-string of ```<length>``` from position ```<start>``` of the input. ```<start>``` can be negative, same as [substr()](https://www.w3schools.com/jsref/jsref_substr.asp) of Javascript.|
| time period<br>in a day| DAY_PERIOD| ```eval_func $out DAY_PERIOD 19:00-0700 12h USA-night;```<br>return 'USA-night' when time is within 12 hours after 19:00-0700, or an empty string. |

**NOTE:** The output value of the functions in **bold** is a binary string that may not be printable. You need to use the BASE64_ENCODE, URL_ENCODE, or HEX_ENCODE to convert it to a printable format.

Examples:
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
This directive belongs to the nginx [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html). It is executed `imperatively` with the other directives in the same module in an early phase of the request processing.

### [`expires`](http://nginx.org/en/docs/http/ngx_http_headers_module.html#expires)

<span class="badge">standard</span>

**Syntax:** `expires time;
        expires epoch | max | off;` <br/>
**Default:** `expires off;` <br/>
**Context:** server, location, if in location

Enables or disables adding or modifying the “Expires” and “Cache-Control” response header fields. No change to the [public version](http://nginx.org/en/docs/http/ngx_http_headers_module.html#expires). This directive affects only the header fields sent to the client. It does not change the cache time of the content on the server.

### [`gzip`](https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip)

<span class="badge">standard</span>

**Syntax:** `gzip on|off;` <br/>
**Default:** `gzip on;` <br/>
**Context:** server, location, if in location

Enables or disables gzipping of responses. No change to the [public version](https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip)


### [`gzip_types`](http://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_types) (Deprecated)

<span class="badge dark">advanced</span> <span class="badge green">Enhanced</span>

**Syntax:** `gzip_types <mime-type> [...];` <br/>
**Default:** `gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/javascript application/xml;` <br/>
**Context:** server, location

CDN Pro always uses gzip and applies it to the default MIME types above. In addition, compression is activated only when the response body size is greater than 1024 bytes. The default behavior should work well for most users. This directive can be used to enable compression on other types. The search and match are case-insensitive. We improved the public version to support wildcards like `text/*` and `*javascript`. Responses with the “text/html” type are always compressed, regardless of the setting for this directive. 

Note: Although it is currently allowed to set different MIME types for gzip and brotli compression by using `gzip_types` and [`brotli_types`](#brotli_types--deprecated), the types set for the two directives are merged, and the merged types apply to both gzip and brotli compression. Please set the same value for the two directives if both gzip and brotli compression are enabled.

`gzip_types` and `brotli_types` have been deprecated. Please use [`compress_types`](#compress_types) instead.

### [`http2_max_concurrent_streams`](https://nginx.org/en/docs/http/ngx_http_v2_module.html#http2_max_concurrent_streams)

<span class="badge dark">advanced</span>

**Syntax:** `http2_max_concurrent_streams number;` <br/>
**Default:** `http2_max_concurrent_streams 32;` <br/>
**Context:** server

Sets the maximum number of concurrent HTTP/2 streams in a connection. No change to the open source version, except that the default value is set to 32.

### [`if/elseif/else`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#if)

<span class="badge">standard</span> <span class="badge green">Enhanced</span> 

**Syntax:** `if (condition) { ... }
        elseif (condition) { ... }
        else {...}`<br/>
**Default:** `—`<br/>
**Context:** server, location

Control the server behavior based on the specified condition. Make sure you fully understand how the [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#if) control flow works. We also wrote [some guidelines](</docs/edge-logic/multiple-origins.md#ifcaution>) about the best practices with this directive. We made some significant improvements to this directive:
*  Support the `&&` operator, which performs logical AND of two sub-conditions. For example:

```nginx
if ($http_x = 1 && $http_y != 2abc && $http_z) { ... }
```
*  Support the `||` operator, which performs logical OR of two sub-conditions. For example:
```nginx
if ($http_x = 1 || $http_y != 2abc && $http_z) { ... }
```
Please notice that when used together, `&&` has higher precedence than `||` and using parentheses to group sub-conditions is not supported.
We support up to 9 sub-conditions and the evaluation logic automatically skips the ones that are not affecting the final result.
*  Support of string prefix check. The condition `$s1 ^ $s2` returns `true` if `$s1` begins with `$s2`. `$s1 !^ $s2` does the opposite.
*  Support of integer value comparison with `<`, `<=`, `>`, `>=`. Make sure both operands are valid integers; otherwise, the result will be `false`. A valid integer can be either decimal or hexadecimal with a leading '0x'.
*  Support multiple `elseif` and a final `else` after an `if` block. For example:
```nginx
if ($http_x = 1) { ... }
elseif ($http_x = 2) { ... }
elseif ($http_x >= 0xa) { ... }
else { ... }
```
This directive belongs to the nginx [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html). It is executed `imperatively` with the other directives in the same module in an early phase of the request processing.

### `ignore_invalid_range`  (Deprecated)

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `ignore_invalid_range on|off;` <br/>
**Default:** `ignore_invalid_range off;` <br/>
**Context:** server, location <br/>

Specifies whether to ignore an invalid Range header. When turned on, an invalid Range header is ignored, and a 200 response with full content is returned to the client. Otherwise, the client will receive a 416 status code. This directive is deprecated. Please use the `ignore_range` directive instead.

### `ignore_range`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `ignore_range on|off|invalid;` <br/>
**Default:** `ignore_range off;` <br/>
**Context:** server, location <br/>

This directive lets you control when to ignore ranger headers from the client.
When set to `on`, range headers from the client will be ignored, and the request will not be treated as a range request.
When set to `invalid`, an invalid Range header is ignored, and a 200 response with full content is returned to the client. Otherwise, the client will receive a 416 status code.

### [`internal`](http://nginx.org/en/docs/http/ngx_http_core_module.html#internal)

<span class="badge">standard</span>

**Syntax:** `internal;` <br/>
**Default:** `—` <br/>
**Context:** location <br/>

Specifies that a given location can be used for internal requests only. No change to the public version.

### [`keepalive_timeout`](http://nginx.org/en/docs/http/ngx_http_core_module.html#keepalive_timeout)

<span class="badge">standard</span> 

**Syntax:** `keepalive_timeout timeout [header_timeout];`<br/>
**Default:** `keepalive_timeout 30s;`<br/>
**Context:** server, location

The first parameter sets a timeout during which a keep-alive client connection will stay open on the server side. The zero value disables keep-alive client connections. The optional second parameter sets a value in the “Keep-Alive: timeout=time” response header field. The two parameters may differ, but they should be no greater than 300s.

### [`limit_rate`](http://nginx.org/en/docs/http/ngx_http_core_module.html#limit_rate)

<span class="badge">standard</span>

**Syntax:** `limit_rate rate;` <br/>
**Default:** `limit_rate 32m;` <br/>
**Context:** server, location, if in location

Limits the rate of response transmission to a client, in bytes/sec. Valid values are [0-32]m or [0-32768]k. The default setting is 32MByte/s.

### [`limit_rate_after`](http://nginx.org/en/docs/http/ngx_http_core_module.html#limit_rate_after)

<span class="badge">standard</span>

**Syntax:** `limit_rate_after size;` <br/>
**Default:** `limit_rate_after 4m;` <br/>
**Context:** server, location, if in location

Sets the initial amount of traffic (in bytes) after which the further transmission of a response to a client will be rate limited. We limit the value to an integer in [1-8] followed by ‘m’.

### [`location`](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)

<span class="badge">standard</span>

**Syntax:** `location [ = | ~ | ~* | ^~ ] pattern { ... }` <br/>
**Default:** `-` <br/>
**Context:** server, location

Sets configuration depending on the request URI without query string. No change to the [public version](http://nginx.org/en/docs/http/ngx_http_core_module.html#location). We require each location block to directly (not in a nested if or location block) contain a "[return](#return)" and/or "[origin_pass](#origin_pass)" directive to generate the response. When a location contains a "[break](#break)" directive, "[origin_pass](#origin_pass)" is required.

### `origin_connect_timeout`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `origin_connect_timeout time;` <br/>
**Default:** `origin_connect_timeout 5s;` <br/>
**Context:** server, location

This is an enhancement of the [proxy_connect_timeout](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_connect_timeout) directive. It defines a timeout for establishing a connection with the origin server. The value is limited to an integer in [1,15] followed by ‘s’. We made sure that the entire chain of connections respects this timeout value. Currently, this directive is not supported at the location level.

### `origin_fast_route`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `origin_fast_route on|off;` <br/>
**Default:** `origin_fast_route off;` <br/>
**Context:** server, location, if in location

This directive enables a fast route to be used to access the origin. It is powered by our proprietary HDT technology which provides more reliable connection with reduced latency. The traffic transferred through this fast route may be charged at a higher rate than the edge traffic. The traffic is restricted to a rate of 3 MByte/s. Please contact our customer support if a higher limit is required.

### `origin_follow_redirect`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `origin_follow_redirect;` <br/>
**Default:** `-` <br/>
**Context:** location

When the origin responds with a 30x redirect, you may want the CDN servers to chase it until the redirection stops. Passing the redirection to the client takes more time to get the final content. If you want to turn it on, you can use this directive in a location block that uses [origin_pass](</docs/edge-logic/supported-directives.md#origin_pass>) to access an origin.


### `origin_header_modify`

<span class="badge">standard</span> <span class="badge primary">Proprietary</span>

**Syntax:** `origin_header_modify field value [policy=...] [if(condition)];` <br/>
**Default:** `-` <br/>
**Context:** server, location, if in location

Use this directive to add, delete, or overwrite the response header fields from the origin **before** any other processing. In other words, the value of any $upstream\_http\_* variable seen by other directives can be affected by this directive. The directive supports nginx variables.

Possible values of policy are ```repeat```, ```overwrite```, and ```preserve```. The default policy is ```repeat```.

*   The ```repeat``` policy always adds the header and the value into the upstream response. Repeating the headers below is not allowed. The property validation will fail if any of these headers is specified with 'policy=repeat': 

Status, Content-Type, Content-Length, Date, Last-Modified, ETag, Server, WWW-Authenticate, Location, Refresh, Content-Disposition, Expires, Accept-Ranges, Content-Range, Vary, X-Accel-Expires, X-Accel-Redirect, X-Accel-Limit-Rate, X-Accel-Buffering, X-Accel-Charset, Content-Encoding, Transfer-Encoding, Connection, Keep-Alive, X-Ws-buffer-length, Cache_state, Accept, Accept-Charset, Accept-Encoding, Accept-Language, Age, Allow, Authorization, Content-Language, Content-Location, Content-MD5, Expect, From, Host, If-Match, If-Modified-Since, If-None-Match, If-Range, If-Unmodified-Since, Max-Forwards, Pragma, Proxy-Authenticate, Proxy-Authorization, Range, Referer, Retry-After, TE, Trailer, Upgrade, and User-Agent.

*   The ```overwrite``` policy overwrites the value if the header already exists in the upstream response. Otherwise, it adds the header and the value into the upstream response. Overwriting these 3 headers is not allowed: Transfer-Encoding, Connection, and Keep-Alive.
*   The ```preserve``` policy adds the header and the value into the upstream response only if the header does not exist in the upstream response.

The parameter ```if``` is introduced to add the header based on the condition. A condition can be one of the following:

*   A variable name; false if the value of a variable is an empty string.
*   A comparison of a variable with a string using the "=" and "!=" operators.
*   The matching of a variable against a regular expression using the operators "\~" (for case-sensitive matching) and "\~\*" (for case-insensitive matching). Negative operators "!\~" and "!\~\*" are also available. If a regular expression includes the "}" or ";" characters, enclose the whole expression in single or double quotes.

Examples: 

Added a header ```X-Status``` based on origin's status code:
```nginx
origin_header_modify X-Status Good if($upstream_response_status ~ "^[23]");
origin_header_modify X-Status ClientErr if($upstream_response_status ~ "^4");
origin_header_modify X-Status ServerErr if($upstream_response_status ~ "^5");
```
Delete the ```Cache-Control``` header in the origin's response:
```nginx
origin_header_modify Cache-Control "" policy=overwrite;
```
The directive is merged across different levels (http/server/location/location if). If the same header name exists in different levels, the configuration for that header name in the innermost level takes effect.

Although CDN Pro has a hierarchical cache structure, the directive changes the header only in the origin response. 

### `origin_limit_rate`

<span class="badge">standard</span> <span class="badge primary">Proprietary</span>

**Syntax:** `origin_limit_rate rate;`<br>
**Default:** `origin_limit_rate 30m;`<br>
**Context:** server, location

This is a wrapper of the [proxy_limit_rate](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_limit_rate) directive. It limits the speed at which the response is read from the origin server. Measured in bytes/sec.

### `origin_pass`

<span class="badge">standard</span> <span class="badge primary">Proprietary</span>

**Syntax:** `origin_pass _origin_name[URI];`<br>
**Default:** `-` <br>
**Context:** location, if in location

This directive specifies the origin from which to fetch the content. It is a wrapper of the nginx [proxy_pass](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass) and a few other directives. It takes one parameter that is an origin name specified in the "origins" field of the property JSON. The origin name can optionally be followed by a URI which can contain variables. If no URI is specified, the full normalized and escaped request URI (which may have been modified by the `rewrite` directive) plus the query string are appended when accessing the origin. To drop the query string, one can use the [rewrite](#rewrite) directive with a question mark at the end of the replacement URI. Examples:
```nginx
# when URI is not specified, 
# origin_pass my_origin; # URI-escaped $uri and the query string will be appended by default
rewrite ^(.*) $1? break; # the question mark at the end prevents query strings from being appended
origin_pass my_origin; # no query string will be forwarded to the origin
```
Please notice that the variable `$uri` is the original URL decoded by nginx, which may have a binary format such as UTF-8, or contain
special unprintable characters, such as 0x0D, 0x0A. Therefore, you need to escape those characters in the variable before including
it in the URI part of this directive. For example, this is another way to drop the query string:
```nginx
eval_func $escaped_uri URI_ESCAPE $uri; # escape the special characters
origin_pass my_origin$escaped_uri; # no query string will be forwarded to the origin
```

### `origin_read_timeout`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `origin_read_timeout time;` <br/>
**Default:**  `origin_read_timeout 20s;` <br/>
**Context:** server, location

This is an enhancement of the [proxy_read_timeout](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_read_timeout) directive. It defines a timeout for reading a response from the origin server. The value is limited to an integer in [1,60] followed by ‘s’. We made sure that the entire chain of connections respects this timeout value. Currently, this directive is not supported at the location level. 

### `origin_send_timeout`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `origin_send_timeout time;` <br/>
**Default:** `origin_send_timeout 20s;` <br/>
**Context:** server, location

This is an enhancement of the [proxy_send_timeout](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_send_timeout) directive. It sets a timeout for transmitting a request to the origin server. The value is limited to an integer in [1,60] followed by ‘s’. We made sure that the entire chain of connections respects this timeout value. Currently, this directive is not supported at the location level.

### [`origin_set_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header)

<span class="badge">standard</span> <span class="badge primary">Proprietary</span>

**Syntax:**  `origin_set_header field value [flag=any] [policy=...] [if(condition)];` <br/>
**Default:** `-` <br/>
**Contexts:** server, location, if in location

This is a wrapper of the [proxy_set_header](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header) directive to allow redefining (overwriting) or appending fields to the request header passed to the origin server. The following changes were made to the open-source version:

1. A parameter ```policy=``` has been introduced to control the behavior more precisely:
```nginx
origin_set_header X-My-Header $header_value policy=repeat|overwrite|preserve;
```
```overwrite```: If the header being added exists in the request, the local configuration overrides the header value. If you want to remove a header, set the value to an empty string. Overwriting these 2 headers is not allowed: Transfer-Encoding and Content-Length.

```preserve```: If the header being added exists in the request, the header value is not changed.

```repeat```: (default) Add the header to the client request, regardless of whether the header exists in the request. Repeating the headers below is not allowed. The property validation will fail if any of these headers is specified with 'policy=repeat': 

Server, Date, Content-Encoding, Location, Refresh, Last-Modified, Content-Range, Accept-Ranges, WWW-Authenticate, Expires, ETag, Content-Length, Content-Type, Transfer-Encoding, Connection, Keep-Alive, Accept, Accept-Charset, Accept-Encoding, Accept-Language, Age, Allow, Authorization, Content-Language, Content-Location, Content-MD5, Expect, From, Host, If-Match, If-Modified-Since, If-None-Match, If-Range, If-Unmodified-Since, Max-Forwards, Pragma, Proxy-Authenticate, Proxy-Authorization, Range, Referer, Retry-After, If-Match, TE, Trailer, Upgrade, User-Agent, Vary.

2. This directive merges the configurations across different levels (server/location/if). However, if the same header name appears in multiple levels, only the deepest layer’s configuration takes effect for that header.
3. CDN Pro has a [hierarchical cache structure](/cdn/docs/edge-logic/paths-to-origins). By default, the headers set by this directive appear only in the requests to the origin servers. If you need it to also affect the requests to parent servers, use the `flag=any` parameter.
4. Use the new parameter  ```if(condition)``` to set the header based on some conditions. If the condition is true, the directive takes effect. The ```if``` parameter should always be configured at the end of the directive configuration. A condition may be one of the following:

*   A variable name; false if the value of a variable is an empty string.
*   Comparison of a variable with a string using the "=" and "!=" operators.
*   Matching a variable against a regular expression using the operators "\~" (for case-sensitive matching) and "\~\*" (for case-insensitive matching). Negative operators "!\~" and "!\~\*" are also available. If a regular expression includes the "}" or ";" characters, enclose the whole expression in single or double quotes.

There are a few things to note when using this directive:

1. Because of the hierarchical cache structure, the built-in variables $scheme and $remote_addr cannot be used. If you need to pass the scheme or IP address used by the client to the origin servers, use the following variables:

*   [$request_scheme](/cdn/docs/edge-logic/built-in-variables#request_scheme): scheme used by the client
*   [$client_real_ip](/cdn/docs/edge-logic/built-in-variables#client_real_ip):  client’s IP address
*   [$client_country_code](/cdn/docs/edge-logic/built-in-variables#client_country_code):  client’s ISO 3166 country code

For example:
```nginx
origin_set_header X-Client-IP $client_real_ip;
```
2. Do not use this directive to set the `Host` header to origin. Instead, use the "origins.hostHeader" field of [the property JSON](/cdn/apidocs#operation/createPropertyVersion). Otherwise, you will get a validation error.
3. The edge servers forward most client request header fields to the parent servers and the origin, except for these ones: `If-Modified-Since`, `If-Unmodified-Since`, `If-None-Match`, `If-Match`, `Range`, and `If-Range`. For cacheable requests, the servers will automatically regenerate these fields based on the cache policy when fetching from the origin. For example, when [slicing](#slice) is enabled, the servers will automatically generate the `Range` header based on size of slices. Thus, the directive shall not be used to set the `Range` header to origin. For non-cacheable requests, those client request headers will still be forwarded to upstream.

### [`proxy_cache_background_update`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_background_update)

<span class="badge">standard</span>

**Syntax:** `proxy_cache_background_update on | off;` <br/>
**Default:** `proxy_cache_background_update off;` <br/>
**Context:** server, location

Turning it on allows a background subrequest to be fired to update an expired cache item while a stale cached response is returned to the client. It should help with the responsiveness when serving popular large files which might take a while to fetch from the origin. It should be used in conjunction with the [`proxy_cache_use_stale`](#proxy_cache_use_stale) directive with the `updating` option. CDN Pro introduced the [`proxy_cache_max_stale`](#proxy_cache_max_stale) directive to set a maximum staleness to avoid serving too old objects to the clients.

### [`proxy_cache_bypass`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_bypass)

<span class="badge">standard</span>

**Syntax:** `proxy_cache_bypass string ...;` <br/>
**Default:** `-` <br/>
**Context:** server, location

Defines conditions under which the response will not be taken from cache. If at least one value of the string parameters is not empty and is not equal to “0”, the response will not be taken from the cache. This should be used if you know the content is not cacheable according to the conditions above. Examples:
```nginx
proxy_cache_bypass $cookie_nocache $arg_nocache$arg_comment;
proxy_cache_bypass $http_pragma    $http_authorization;
```
This directive does not prevent the response from being saved in the cache.
That behavior is controlled by another directive [`proxy_no_cache`](#proxy_no_cache), and usually the two should be used together.

### [`proxy_cache_convert_head`](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_convert_head)

<span class="badge">standard</span>

**Syntax:** `proxy_cache_convert_head on | off;` <br/>
**Default:** `proxy_cache_convert_head on;` <br/>
**Context:** server, location

Enables or disables the conversion of the “HEAD” method to “GET” for caching. When enabled, CDN Pro cache servers will convert “HEAD” method to “GET” when reading from cache or sending upstream requests to the origin. If your origin expects HEAD requests and this conversion might cause requests to break, you should disable the conversion. For example, if your origin enforces authentication which takes the request method as a factor when computing the signature for authentication, the conversion of the request method is likely to cause unexpected authentication failures.

### [`proxy_cache_lock_timeout`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock_timeout)

<span class="badge">standard</span> <span class="badge green">Enhanced</span>

**Syntax:** `proxy_cache_lock_timeout time;` <br/>
**Default:** `proxy_cache_lock_timeout 0s;` <br/>
**Context:** server, location

Sets a timeout for [`proxy_cache_lock`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock). CDN Pro turns on `proxy_cache_lock` platform wide to better control the traffic to the origin servers. It allows only one request to the origin at a time to populate a cache element for the same cache key. Other requests hitting the same cache element will either wait for a response to appear in the cache or the timeout value set by this `proxy_cache_lock_timeout` directive. We set the default value to 0 to avoid introducing unnecessary latency to uncacheable contents. If you know that most of the contents are cacheable, you can set it to some higher value to reduce origin traffic. In the meantime, if you have a way to accurately identify uncacheable content, use `proxy_cache_bypass` and `proxy_no_cache` to skip caching to get the least latency possible. 

We modified the open source version so that requests released by this directive may be used to populate the cache element.

### `proxy_cache_max_stale`

<span class="badge">standard</span> <span class="badge primary">Proprietary</span>

**Syntax:** `proxy_cache_max_stale if_error=$time while_revalidate=$time;` <br/>
**Default:** `-` <br/>
**Context:** server, location

This directive allows serving of stale content that did not expire too long ago to give the end user a better experience. It has the same functionality as the parameters `stale-if-error` and `stale-while-revalidate` in the `Cache-Control` header field. Its priority is lower than the header value.

The parameter 'if_error=' requires 'error' to be specified in the [`proxy_cache_use_stale`](#proxy_cache_use_stale) directive. The parameter 'while_revalidate=' only works with [`proxy_cache_background_update on;`](#proxy_cache_background_update), which needs 'updating' to be specified in `proxy_cache_use_stale`.

### [`proxy_cache_methods`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_methods)

<span class="badge">standard</span>

**Syntax:** `proxy_cache_methods GET | HEAD | POST;` <br/>
**Default:** `proxy_cache_methods GET HEAD;` <br/>
**Context:** server, location

If the client request method is listed in this directive, the response will be cached. “GET” and “HEAD” methods are always added to the list, though it is recommended to specify them explicitly. The methods supported are GET, HEAD and POST.

### `proxy_cache_min_age`

<span class="badge">standard</span> <span class="badge primary">Proprietary</span>

**Syntax:** `proxy_cache_min_age time;` <br/>
**Default:** `proxy_cache_min_age 0s;` <br/>
**Context:** server, location, if in location

Description:

This directive allows you to configure the minimum cache time. If the received max-age from the origin is less than the specified minimum age, the max-age value is set to the configured minimum age value. For example, if the max-age value in the received HTTP header is 100s and the configured minimum age value is 200s, the effective cache time will be 200s. 

CDN Pro calculates the cache time from the headers in the upstream response or from the nginx directives in the following order:

X-Accel-Expires > Cache-Control (max-age), proxy_cache_min_age > Expires > proxy_cache_valid (nginx directive)

 When nginx calculates the cache time from max-age value in the Cache-Control header, it compares the value with the value configured in the  proxy_cache_min_age and updates the cache time accordingly. Otherwise, nginx ignores the value in the proxy_cache_min_age directive.

 Note: The time variable in this directive can have a number with one of the following suffixes or a combination of the following suffixes:

*   s = seconds (default, example: 10s)
*   m = minutes (example: 5m)
*   h = hours (example: 1h)
*   d = days (example: 1d)
*   w = weeks (example: 1w)
*   M = months (example: 2M)
*   y = years (example: 1y)

If there is no suffix in the time, the configured value is considered in seconds.

### [`proxy_cache_use_stale`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_use_stale)

<span class="badge">standard</span>

**Syntax:** `proxy_cache_use_stale error | timeout | invalid_header | updating | http_500 | http_502 | http_503 | http_504 | http_403 | http_404 | http_429 | off ...;` <br/>
**Default:** `proxy_cache_use_stale error timeout;` <br/>
**Context:** server, location

Determines in which cases a stale cached response can be used during communication with the upstream server. No change to the [public version](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_use_stale). Based on the default setting, the CDN Pro edge server would return stale cached content if there is any problem establishing connection to the origin.

### [`proxy_cache_valid`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_valid)

<span class="badge">standard</span> <span class="badge green">Enhanced</span>

**Syntax:** `proxy_cache_valid [code ...] time;` <br/>
**Default:** `-` <br/>
**Context:** server, location

Sets cache time for different response codes. If no code is explicitly specified, the cache time applies to 200, 301, and 302 response codes. The specified time is applied only to responses without caching instructions from the origin. Response header fields `Cache-Control`, `Expires`, `Set-Cookie`, etc. have higher precedence unless ignored by [`proxy_ignore_cache_control`](#proxy_ignore_cache_control) or [`proxy_ignore_headers`](#proxy_ignore_headers). We enhanced the [open-source version](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_valid) to support setting `time` with a variable. If the variable value is not a valid time, this directive does not do anything. A value of 0 means cache the response and treat it as expired. If you can identify dynamic/non-cacheable contents based on certain parameters in the request, use [`proxy_cache_bypass`](#proxy_cache_bypass) and [`proxy_no_cache`](#proxy_no_cache) to bypass caching and improve performance. 

The configuration at the server level is inherited by a location block only when this directive is not present in the location block. If you need to use the proxy_cache_valid directive at both the server level and in a location block, use the following example as a guide:

```nginx
# server level, cache 404 status code for 10 seconds
proxy_cache_valid 404 10s;  
proxy_cache_valid $cache_time;
set $cache_time '';
location / { 
  # Location block, cache status codes 200, 301, and 302 for a day
  set $cache_time 1d;
  ...
 } 
```

### `proxy_cache_vary`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `proxy_cache_vary on | off;` <br/>
**Default:** `proxy_cache_vary off;` <br/>
**Context:** server, location

If `proxy_cache_vary` is "on", the CDN Pro cache servers honor the `Vary` response header from the origin and cache different variations separately. However, the varied contents should be purged using "directory purge".

If `proxy_cache_vary` is "off", the CDN Pro cache servers do not cache any response with the `Vary` header.

Related reading: [The support (and non-support) of "Vary"](</docs/edge-logic/faq.md#the-support-and-non-support-of-vary>).

### [`proxy_cookie_domain`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cookie_domain)

<span class="badge dark">advanced</span>

**Syntax:** `proxy_cookie_domain off;
       proxy_cookie_domain {domain} {replacement};` <br/>
**Default:** `proxy_cookie_domain off;` <br/>
**Context:** server, location

Sets a text that should be changed in the domain attribute of the `Set-Cookie` header fields of an origin server response. No change to the public version. 

### [`proxy_cookie_path`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cookie_path)

<span class="badge dark">advanced</span>

**Syntax:** `proxy_cookie_path off;
       proxy_cookie_path {path} {replacement};` <br/>
**Default:** `proxy_cookie_path off;` <br/>
**Context:** server, location

Sets a text that should be changed in the path attribute of the `Set-Cookie` header fields of an origin server response. No change to the public version. 

### [`proxy_hide_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_hide_header)

<span class="badge">standard</span>

**Syntax:**	`proxy_hide_header {field};` <br/>
**Default:** `-` <br/>
**Context:** server, location

Sets response header fields that will not be passed to the client. No change to the public version. Use this directive multiple times to hide multiple fields. The configuration at the server level is inherited by a location block only when this directive is not present in the location block.

### `proxy_ignore_cache_control`

<span class="badge">standard</span> <span class="badge primary">Proprietary</span>

**Syntax:** `proxy_ignore_cache_control directives…;` <br/>
**Default:** `-` <br/>
**Contexts:** server, location, if in location

Disables processing of certain `cache-control` directives in the response from the origin. The following directives can be ignored:

*   no-cache
*   no-store
*   private
*   max-age
*   s-maxage
*   stale-while-revalidate
*   stale-if-error

Examples: ignore the no-cache and no-store directives:
```nginx
proxy_ignore_cache_control no-cache no-store;
```
Note: This directive does not modify the "Cache-Control" header from the origin.

### [`proxy_ignore_client_abort`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ignore_client_abort)

<span class="badge dark">advanced</span> 

**Syntax:** `proxy_ignore_client_abort on | off;` <br/>
**Default:** `proxy_ignore_client_abort off;` <br/>
**Context:** server, location

Determines whether the connection with an upstream server should be closed when a client closes the connection without waiting for a response. Value `on` means ignore the client abort and continue the connection and data transfer with the upstream server. `off` means abort the upstream transfer as soon as the client side aborts, if the response is not cacheable. The transfer of cacheable responses always continues.

### [`proxy_ignore_headers`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ignore_headers)

<span class="badge">standard</span>

**Syntax:** `proxy_ignore_headers field ...;` <br/>
**Default:** `-` <br/>
**Context:** server, location

Disables processing of certain response header fields in the response from the origin. It is most commonly used to ignore caching instructions such as the `Cache-Control` and `Expires` fields from the origin. No change to the [open-source version](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ignore_headers), except that we couple `Cache-Control` and `Expires` together. Configuring this directive to ignore `Cache-Control` will cause `Expires` to be also ignored, or vice versa. If you need to ignore only some of the `cache-control` directives, use the [`proxy_ignore_cache_control`](#proxy_ignore_cache_control) directive.

### [`proxy_method`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_method)

<span class="badge">standard</span>

**Syntax:** `proxy_method {method};` <br/>
**Default:** `-` <br/>
**Context:** server, location

Specifies the HTTP method to use in requests forwarded to the origin server instead of the method from the client request. Parameter value can contain variables.

### [`proxy_next_upstream`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream)

<span class="badge">standard</span>

**Syntax:** `proxy_next_upstream error | timeout | invalid_header | http_500 | http_502 | http_503 | http_504 | http_403 | http_404 | http_429 | non_idempotent | off ...;` <br/>
**Default:** `proxy_next_upstream error timeout;` <br/>
**Context:** server, location

Specifies in which cases a request should be passed to the next server in the origin configuration. One important function of this directive is to
define an "unsuccessful attempt" for the [`peerFailureTimeout`](/cdn/docs/edge-logic/paths-to-origins#origin-configurations) settings of the origin. No change to the public version. 

### [`proxy_next_upstream_timeout`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream_timeout)

<span class="badge dark">advanced</span>

**Syntax:** `proxy_next_upstream_timeout {time};` <br/>
**Default:** `proxy_next_upstream_timeout 0;` <br/>
**Context:** server, location

Limits the time during which a request can be passed to the next server in the origin configuration. A value of "0" disables the limit. No change to the public version.

### [`proxy_next_upstream_tries`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream_tries)

<span class="badge dark">advanced</span>

**Syntax:** `proxy_next_upstream_tries {number};` <br/>
**Default:** `proxy_next_upstream_tries 0;` <br/>
**Context:** server, location

Limits the number of possible tries for passing a request to the next server in the origin configuration. A value of "0" disables the limit. No change to the public version. 

### [`proxy_no_cache`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_no_cache)

<span class="badge">standard</span>

**Syntax:** `proxy_no_cache string ...;` <br/>
**Default:** `-` <br/>
**Context:** server, location

Defines conditions under which the response will not be saved to a cache. If at least one value of the string parameters is not empty and is not equal to “0”, the response will not be saved:
```nginx
proxy_no_cache $cookie_nocache $arg_nocache$arg_comment;
proxy_no_cache $http_pragma    $http_authorization;
```
Since the content is not saved, usually there is no point in looking up the cache under the same conditions. Therefore, this directive is commonly used together with the [`proxy_cache_bypass`](#proxy_cache_bypass) directive.

### [`proxy_pass_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass_header)

<span class="badge">standard</span>

**Syntax:**	`proxy_pass_header {field};` <br/>
**Default:** `proxy_pass_header Date;` <br/>
**Context:** server, location

Permits passing an [otherwise disabled](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_hide_header) header field from an origin server to a client. Changed the default behavior to pass the `Date` header from the upstream, which should carry the time when the content was fetched from origin. Use this directive multiple times to pass multiple fields. The configuration at the server level is inherited by a location block only when this directive is not present in the location block.

### [`proxy_pass_request_body`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass_request_body)

<span class="badge">standard</span>

**Syntax:** `proxy_pass_request_body on | off;` <br/>
**Default:** `proxy_pass_request_body on;` <br/>
**Context:** server, location

Enables of disables passing request body from client to upstream. No change to the public version.

### [`proxy_pass_request_headers`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass_request_headers)

<span class="badge">standard</span>

**Syntax:** `proxy_pass_request_headers on | off;` <br/>
**Default:** `proxy_pass_request_headers on;` <br/>
**Context:** server, location

Enables of disables passing request headers from client to upstream. No change to the public version.

### [`proxy_redirect`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_redirect)

<span class="badge dark">advanced</span>

**Syntax:** `proxy_redirect default;
       proxy_redirect off;
       proxy_redirect redirect replacement;` <br/>
**Default:** `proxy_redirect default;` <br/>
**Context:** server, location

Sets the text that should be changed in the “Location” and “Refresh” header fields of an origin server response. No change to the public version. 

### [`proxy_request_buffering`](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_request_buffering)

<span class="badge dark">advanced</span> 

**Syntax:** `proxy_request_buffering on/off;` <br/>
**Default:** `proxy_request_buffering off;` <br/>
**Context:** server, location

Enables or disables buffering of a client request body. No change to the open source version, except that it is disabled by default. The value of this directive does not have an effect on the behavior of [appending the request body to the cache key](#proxy_request_body_in_cache_key).

### `proxy_request_body_in_cache_key`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `proxy_request_body_in_cache_key on/off;` <br/>
**Default:** `proxy_request_body_in_cache_key on;` <br/>
**Context:** server, location, if in location

When the parameter is 'on' (variable supported), the server calculates an MD5 hash of the request body and appends it to the cache key. This is useful when parameters are carried in the body of a POST request to query resources. These kinds of requests are usually idempotent and safe like GET requests, and the responses are well cacheable. You need to use the [`proxy_cache_methods`](#proxy_cache_methods) directive to enable caching of the POST requests.

A restriction of this directive is that it works only when body size is less than 4kB. When the request body size is greater than this threshold, no hash value is appended to the cache key and this fact is indicated by a value '1' of the variable [`$ignored_body_in_cache_key`](/docs/edge-logic/built-in-variables#ignored_body_in_cache_key). You can use this variable with [`proxy_cache_bypass`](#proxy_cache_bypass) to bypass caching of these requests. If it is really important to include a large request body in the cache key, you are advised to calculate the hash value in the client and pass it in the request header, then include it in the $cache_misc variable.

### `proxy_set`

<span class="badge">standard</span> <span class="badge primary">Proprietary</span> 

**Syntax:** `proxy_set $variable value [if(...)];`<br>
**Default:** `-` <br>
**Context:** server, location, if in location

This directive assigns the `value` to the `$variable`. The `value` can be another variable or a composition of variables and literals. While this directive looks very similar to the [`set`](#set) directive, it differs in when it is executed. The `set` directive is executed during the "rewrite" phases which are very early -- almost right after the request is received from the client. On the contrary, `proxy_set` is executed after the response header is received from the origin (in case of a cache miss) or read from the cache. Therefore, the `value` can have information contained in the response header (after being modified by any [`origin_header_modify`](#origin_header_modify) directive). In addition, this directive supports the `if()` parameter which can set a condition for the assignment to happen. Here are a few examples:
```nginx
set $cache_time 1d; # by default, cache for 1 day
# if origin responds with a "cachetime" header, use it to override the default
proxy_set $cache_time $upstream_http_cachetime if($upstream_http_cachetime);
proxy_cache_valid $cache_time;
# extract a part from the origin's response header and send to client
proxy_set $version_number $1 if($upstream_http_version ~ "Version:(.*)$");
add_header version-number $version_number;
# do not cache status codes 301 and 302 from the origin
proxy_set $no_store 1 if($upstream_response_status ~ 30[12]);
proxy_no_cache $no_store;
```
The directive is merged across different levels (http/server/location/location if). If the same variable is assigned in different levels, the assignment in the innermost level takes effect.

### [`proxy_set_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header) (Deprecated)

<span class="badge">standard</span> <span class="badge green">Enhanced</span> 

**Syntax:**  `proxy_set_header field value if(condition);` <br/>
**Default:** `-` <br/>
**Contexts:** server

This is an enhanced version of the [open-source version](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header). It supports condition and can be used only in the [load balancer logic](lb7-es-structure) to pass data to the ES. This directive is deprecated. Refer to the [upgrade of edge node structure](</docs/edge-logic/edge-node-structure-upgrade.md>).

### [`proxy_ssl_protocols`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ssl_protocols)

<span class="badge dark">advanced</span>

**Syntax:** `proxy_ssl_protocols [SSLv2] [SSLv3] [TLSv1] [TLSv1.1] [TLSv1.2] [TLSv1.3];` <br/>
**Default:** `proxy_ssl_protocols TLSv1 TLSv1.1 TLSv1.2;` <br/>
**Context:** server, location

Enables the specified protocols for requests to an origin HTTPS server. No change to the public version.

### `realtime_log_downsample`

<span class="badge">standard</span> <span class="badge primary">proprietary</span>

**Syntax:** `realtime_log_downsample factor;` <br/>
**Default:** `-` <br/>
**Contexts:** server, location

Overrides the "Sample Rate" specified for the [Real-Time Log](/docs/portal/edge-configurations/creating-property#real-time-log). `factor` can be an integer in [0, 65535] or a variable. A value of 0 disables the logging; 1 means do not downsample; N>1 means one log entry for every N requests. If the variable value is an empty string, the default setting is not overridden. An invalid value in the variable results in a factor of 100. The actual sample factor can be included in the log with the variable [`$realtime_log_ds_factor`](/docs/edge-logic/built-in-variables#realtime_log_ds_factor). This directive can only be used in the Edge Logic.

### `remote_log_set_header`

<span class="badge">advanced</span> <span class="badge primary">proprietary</span>

**Syntax:** `remote_log_set_header name value;` <br/>
**Default:** `-` <br/>
**Contexts:** server, location

Sets a header and its value which will be included as a request header when sending realtime logs to the remote server.

### [`return`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return)

<span class="badge">standard</span> 

**Syntax:** `return code [text];
       return code URL;
       return URL;` <br/>
**Default:** `-` <br/>
**Contexts:** server, location, if

Stops processing and returns the specified code to a client. No change to the [open-source version](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return). 

This directive belongs to the nginx [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html). It is executed `imperatively` with the other directives in the same module in an early phase of the request processing.

### [`rewrite`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite)

<span class="badge">standard</span>

**Syntax:** `rewrite regex replacement [flag];` <br/>
**Default:** `-` <br/>
**Contexts:** server, location, if

Rewrite the request URI when a regular expression pattern is matched. No change to the [open-source version](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite). Please note that this directive tries to match the `regex` pattern to the variable `$uri`, which is a [normalized](http://nginx.org/en/docs/http/ngx_http_core_module.html#location) request URI without query string. A successful match assigns the value of `replacement` to `$uri`.

This directive belongs to the nginx [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html). It is executed `imperatively` with the other directives in the same module in an early phase of the request processing.

### [`satisfy`](http://nginx.org/en/docs/http/ngx_http_core_module.html#satisfy)

<span class="badge">standard</span>

**Syntax:** `satisfy all | any;` <br/>
**Default:** `satisfy all;` <br/>
**Context:** server, location

Allows access if all (all) or at least one (any) of the ngx_http_access_module ([`allow`](#allow), [`deny`](#deny)), ngx_http_auth_request_module ([`auth_request`](#auth_request)) modules allows access. No change to the public version.
Please note that all these directives are executed after the ones in the rewrite module.

### `sanitize_accept_encoding`

<span class="badge dark">advanced</span> <span class="badge primary">Proprietary</span>

**Syntax:** `sanitize_accept_encoding enc1 enc2 … ;` <br/>
**Default:** `sanitize_accept_encoding gzip;` <br/>
**Contexts:** server

This directive processes the incoming `Accept-Encoding` header field to consolidate its value. You can specify up to four parameters after this directive. Each parameter is a comma-separated combination of one or more `content-encoding` algorithms, such as "gzip,br" or "br". For each request from the clients, the CDN Pro edge server tries to match the received `Accept-Encoding` header field value with the specified combinations from left to right. If all the algorithms in a combination are found in the header, the header value is replaced with that combination. If no match is found, the header field is removed, which means only uncompressed version is accepted.

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
else remove A-E-header;
```
It is not hard to see that the default setting of this directive rewrites the header value to either "gzip" or empty. Combined with the default caching policy, CDN Pro would [cache the response in only one of the two encoded formats](/docs/edge-logic/faq.md#the-support-and-non-support-of-vary). If a client's request is asking for the other format, the server would compress or decompress the cached version on-the-fly to fulfill it.

If you use this directive and override the default setting, most likely you also want to cache the response in different encodings separately. You can achieve this by adding the header field value into the cache key:
```nginx
set $cache_misc $cache_misc."ae=$http_accept_encoding";
```

### [`secure_link`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link)

<span class="badge dark">advanced</span>

**Syntax:** `secure_link expression;` <br/>
**Default:** `—` <br/>
**Context:** server, location

Defines a string with variables from which the checksum value and lifetime of a link will be extracted. No change to the public version.

### [`secure_link_md5`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_md5)

<span class="badge dark">advanced</span>

**Syntax:** `secure_link_md5 expression;` <br/>
**Default:** `—` <br/>
**Context:** server, location

Defines an expression for which the MD5 hash value will be computed and compared with the value passed in a request. No change to the public version.

### [`secure_link_secret`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_secret)

<span class="badge dark">advanced</span>

**Syntax:** `secure_link_secret word;` <br/>
**Default:** `—` <br/>
**Context:** location

Defines a secret word used to check authenticity of requested links. No change to the public version.

### [`set`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#set)

<span class="badge">standard</span> 

**Syntax:**	`set $variable value;` <br/>
**Default:**	`-` <br/>
**Contexts:** server, location, if

Assigns a value to the specified variable. No change to the public version. In particular, the cache key [can be customized](/docs/edge-logic/faq.md#how-do-you-include-query-parameters-andor-request-headers-in-the-cache-key) by assigning a value to the `$cache_misc` variable.

This directive belongs to the nginx [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html). It is executed `imperatively` with the other directives in the same module in an early phase of the request processing.

### [`slice`](http://nginx.org/en/docs/http/ngx_http_slice_module.html#slice)

<span class="badge">standard</span> <span class="badge green">Enhanced</span>

**Syntax:**	`slice size;` <br/>
**Default:** `slice 0;` <br/>
**Contexts:** server, location

Sets the size of the slices when fetching large files from the origin. The valid values are 0, which disables slicing, OR an [nginx size](http://nginx.org/en/docs/syntax.html) that is between `512k` and `512m`, inclusive. The origin has to support range requests and respond with status code 206. If caching is desired, use the statement `proxy_cache_valid 206 ...` to enable caching of the partial responses. We made the following changes to this directive on top of the open-source version:
* CDN Pro requires all cached slices to carry the same ETag value to ensure the content is consistent. When a slice fetched from the origin has a value that is different from the cached ones, any in-progress transfers to clients are terminated and all the cached slices are purged immediately. Please make sure the ETag value of each file on origin does not change unless the file's content has changed. This behavior can be disabled using `slice_ignore_etag on;`.
* When slicing is enabled, the server automatically removes the `Accept-Encoding` header in the request to origin to disable compression. If this behavior is overridden, for example, by the `origin_set_header Accept-Encoding ...` directive, the client may receive a corrupted response.
* The Nginx variable $slice_range is not supported. When slicing is enabled, the server automatically generates the `Range` header in the request to origin based on size of slices. If this behavior is overridden, for example, by the `origin_set_header Range ...` directive, the client may receive a corrupted response.

### `slice_ignore_etag`

<span class="badge">standard</span> <span class="badge primary">Proprietary</span>

**Syntax:** `slice_ignore_etag on/off;` <br/>
**Default:** `slice_ignore_etag off;` <br/>
**Contexts:** server

This directive can be used to disable the ETag consistency check of sliced files. Use it only as a workaround if the origin generates different ETag values for the same file.

### `slice_verify_header`

<span class="badge">standard</span> <span class="badge primary">Proprietary</span>

**Syntax:** `slice_verify_header header_name;` <br/>
**Default:** `-` <br/>
**Contexts:** server, location

This directive can be used to specify a header in addition to Etag to check consistency of sliced files. Use this directive in conjunction with[`slice_ignore_etag`](#slice_ignore_etag) if you want to skip Etag and check the specified header only.

The header_name must be of a value other than "etag". The value is case-insensitive.

### `sorted_querystring_filter_parameter`

<span class="badge">standard</span> <span class="badge primary">Proprietary</span>

**Syntax:** `sorted_querystring_filter_parameter {param1} {param2} … ;` <br/>
**Default:** `-` <br/>
**Contexts:** server, location, if in location

Removes some query parameters from the variable ```$sorted_querystring_args```. The parameter names specified in this directive are case-sensitive.
This feature is implemented on top of this [open-source project](https://github.com/wandenberg/nginx-sorted-querystring-module).

### [`sub_filter`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter)

<span class="badge dark">advanced</span> <span class="badge green">Enhanced</span>

**Syntax:** `sub_filter {string} {replacement} [if(...)];` <br/>
**Default:** `—` <br/>
**Context:** server, location

Sets a string to replace in the response and a replacement string. We made the following changes to the public version:

1. This directive takes effect only on the edge servers, not the parent servers. This ensures the replacement happens only once across the [hierarchical structure](/cdn/docs/edge-logic/paths-to-origins) of CDN Pro.
2. We introduced the `if()` parameter to precisely set the condition for this directive to take effect, just like for the [`add_header`](#add_header) directive. Since scanning large responses can introduce significant delay and CPU consumption, we recommend using this parameter whenever possible to minimize performance hit and cost increase.

Note that when the response is compressed, the search and replace may not work as desired. You can use the [`origin_set_header`](#origin_set_header) directive as follows to clear the `Accept-Encoding` field to ask for an uncompressed response from the origin and parent server:
```nginx
  # clear the Accept-Encoding field in the request header to parent and origin
  origin_set_header accept-encoding '' flag=any if($uri = /the/special/file);
  sub_filter 'match-string' 'replacement string' if($uri = /the/special/file);
```

### [`sub_filter_last_modified`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter_last_modified)

<span class="badge dark">advanced</span>

**Syntax:** `sub_filter_last_modified on | off;` <br/>
**Default:** `sub_filter_last_modified off;` <br/>
**Context:** server, location

Allows preserving the “Last-Modified” header field from the original response during replacement to facilitate response caching. No change to the public version.

### [`sub_filter_once`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter_once)

<span class="badge dark">advanced</span>

**Syntax:** `sub_filter_once on | off;` <br/>
**Default:** `sub_filter_once on;` <br/>
**Context:** server, location

Indicates whether to look for each string to replace once or repeatedly. No change to the public version.

### [`sub_filter_types`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter_types)

<span class="badge">standard</span>

**Syntax:** `sub_filter_types <mime-type> [...];` <br/>
**Default:** `sub_filter_types text/html;` <br/>
**Context:** server, location

Enables string replacement in responses with the specified MIME types in addition to “text/html”. No change to the public version.

### `upstream_origin_only`

<span class="badge">standard</span> <span class="badge primary">Proprietary</span>

**Syntax:** `upstream_origin_only on|off;` <br/>
**Default:** `upstream_origin_only off;` <br/>
**Contexts:** server, location, if in location

Enable or disable origin only upstreaming. When set to on, a matching request is forwarded directly to the origin, bypassing any intermediate cache including [origin shields](/cdn/apidocs#operation/get-cdn-shields). For example, you may have configured an origin's directConnection setting to "noDirect" to always use an intermediate cache or "auto" for us to dynamically determine the best course, by default. The upstream_origin_only directive lets you bypass that setting and allow a subset of requests to go directly to the origin. Even if you set directConnection to "alwaysDirect", the edge may still send retry requests to an intermediate server when the origin is not reachable directly. `upstream_origin_only on;` eliminates this possibility.


### [`valid_referers`](http://nginx.org/en/docs/http/ngx_http_referer_module.html#valid_referers)

<span class="badge">standard</span>

**Syntax:** `valid_referers none | blocked | server_names | {string} ...;` <br/>
**Default:** `—` <br/>
**Context:** server, location

Specifies the “Referer” request header field values that will cause the embedded $invalid_referer variable to be set to an empty string. No change to the public version.

