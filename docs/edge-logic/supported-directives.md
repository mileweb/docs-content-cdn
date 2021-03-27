## Supported Directives

This section lists all the directives you can use in the CDN360 Edge Logic. Although most of them are unmodified from the open-source version of nginx, many have been modified to better suit the needs of a CDN proxy server. CDNetworks also introduced some proprietary directives.

Each non-proprietary directive includes a direct link to the official nginx documentation. A detailed description is provided if the directive has been modified from the original version, such as limitations on the parameters of some directives.

In the following list, the <span class="badge">standard</span> directives are available to all customers and should cover the most common use cases. The <span class="badge dark">advanced</span> directives are usually more resource-consuming than the standard ones and will be granted on a case-by-case basis. If you need one or more of them, contact CDNetworks customer service.

### [`add_header`](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header)

<span class="badge">standard</span> <span class="badge green">CDN360 Enhanced</span>

**Syntax**: `add_header name value [policy=...] [if(...)] [always];`<br/>
**Default**: `-` <br/>
**Context**: server, location, if in location

This directive modifies the response headers to the client. CDNetworks has made the following major changes to the [open-source version](http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header):

1. A parameter "policy=" has been introduced to control the behavior more precisely:
```nginx
add_header X-My-Header $header_value policy=repeat|overwrite|preserve
```
```overwrite```: If the header being added exists in the upstream response, the local configuration overrides the header value. If you want to remove a header, set the value to an empty string.

```preserve```: If the header being added exists in the upstream response, the header value is not changed;

```repeat```: (default) Add the header to the client response, regardless of whether the header exists in the upstream response.

The policy parameter also supports variables; the value must be one of the three above.

**Limitation**: For the following "built-in" headers, the behavior is always fixed, regardless of the configured policy:

| **"built-in" Header Name** | **Behavior** |
| ---- | ---- |
| ```Cache-Control``` | ```repeat``` |
| ```Link``` | ```repeat``` |
| ```Last-Modified``` | ```overwrite``` |
| ```ETag``` | ```overwrite``` |


If needed, use [proxy_hide_header](#proxy_hide_header) to remove the "Cache-Control" or "Link" headers from the origin.

2. The new parameter ```if(condition)``` has been introduced to allow adding the header based on some condition. If the condition is true, the ```add_header``` directive adds the header and the value to the downstream response based on the policy. The ```if``` parameter should always be at the end of the directive configuration. A condition may be any of the following:

*   A variable name; false if the value of a variable is an empty string.
*   Comparison of a variable with a string using the "=" and "!=" operators.
*   Matching a variable against a regular expression using the operators "\~" (for case-sensitive matching) and "\~\*" (for case-insensitive matching). Negative operators "!\~" and "!\~\*" are also available. If a regular expression includes the "}" or ";" characters, enclose the whole expression in single or double quotes.

3. Another change made to this directive is the ability to merge the configurations across different levels (server/location/if). However, if the same header name appears in multiple levels, the configuration of only the deepest layer takes effect for that header.

 Example configurations:
```nginx
add_header X-Cache-Status $upstream_cache_status policy=preserve;
```
Example with variable:
```nginx
set $cache_status_method "preserve";  
if ($arg_debug = cache_status) {
    set $cache_status_method "overwrite";
}
add_header X-Cache-Status $upstream_cache_status policy=$cache_status_method;
```

### [`allow`](http://nginx.org/en/docs/http/ngx_http_access_module.html#allow)

<span class="badge">standard</span>

**Syntax**: `allow address | CIDR | all;`<br/>
**Default**: `-` <br/>
**Context**: server, location

Allows access from the specified network or address. Usually used together with [`deny`](#deny). (Work in progress to enable it in the Edge Logic <span class="badge yellow">ETA: May. 2021</span>)


### [`auth_request`](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request)

<span class="badge dark">advanced</span>

**Syntax**:	`auth_request uri | off`;<br/>
**Default**:	`auth_request off;`<br/>
**Context**: server, location

Enables authorization based on the result of a subrequest and sets the URI to which the subrequest will be sent. No change to the public version. 


### [`auth_request_set`](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html#auth_request_set)

<span class="badge dark">advanced</span>

**Syntax**:	`auth_request_set $variable value;`<br/>
**Default**:	`—`<br/>
**Context**: server, location

Sets the request variable to the given value after the authorization request completes. No change to the public version. 

### [`break`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#break)

<span class="badge">standard</span>

**Syntax**:	`break;`<br/>
**Default**:	`—`<br/>
**Context**:	server, location, if

Stops processing the current set of ngx_http_rewrite_module directives. No change to the public version. 

This directive belongs to the nginx [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html). It is executed `imperatively` with the other directives in the same module in an early phase of the request processing.

### `client_body_timeout`

<span class="badge dark">advanced</span> <span class="badge green">CDN360 Enhanced</span>

**Syntax**: `client_body_timeout time;`<br/>
**Default**: matches `origin_send_timeout` if it is set, or 20s <br/>
**Context**: server

This directive sets the maximum idle time when receiving the request body from the client. If you need to change the default value for your property, please contact our support team. The maximum value is 60s.

### `client_header_timeout`

<span class="badge dark">advanced</span> <span class="badge green">CDN360 Enhanced</span>

**Syntax**: `client_header_timeout time;`<br/>
**Default**: `client_header_timeout 10;`<br/>
**Context**: server

This directive sets the maximum wait time for the complete request header from the client. If you need to change the default value for your property, please contact our support team. The maximum value is 60s. Please notice that if the `Host` header is not received within the default 10s, the server will close the connection and the setting in the Edge Logic will not take effect.

### `client_send_timeout`

<span class="badge dark">advanced</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `client_send_timeout time;`<br/>
**Default**: matches `origin_read_timeout` if it is set, or 20s <br/>
**Context**: server

This directive is very similar to the [`send_timeout`](http://nginx.org/en/docs/http/ngx_http_core_module.html#send_timeout) directive of the open-source version. It sets the maximum idle time when transmitting the response to the client. If you need to change the default value for your property, please contact our support team. The maximum value is 60s.

### `custom_log_field`

<span class="badge dark">advanced</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `custom_log_field {custom log field id} {value or variable};`<br/>
**Default**: `-`<br/>
**Context**: server, location, if in location

This directive allows you to add up to 2 customized fields into the access log. They can be referred to by the keywords "custom1" and "custom2" when you configure the format of the download log or when using our advanced traffic analysis tool. If you require this feature, contact our support team.

### [`deny`](http://nginx.org/en/docs/http/ngx_http_access_module.html#deny)

<span class="badge">standard</span>

**Syntax**:	`deny address | CIDR | all;`<br/>
**Default**: `—`<br/>
**Context**: server, location

Denies access from the specified network or address. Usually used together with [`allow`](#allow). (Work in progress to enable it in the Edge Logic <span class="badge yellow">ETA: May. 2021</span>)

### `enable_websocket`

<span class="badge dark">advanced</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `enable_websocket;`<br/>
**Default**: `-`<br/>
**Context**: server, location

This directive enables proxying the WebSocket protocol. The client must make sure not to use HTTP/2. The default read and send timeouts are set to 21s and can be changed using the `origin_read_timeout` or `origin_send_timeout` directives.

### [`error_page`](http://nginx.org/en/docs/http/ngx_http_core_module.html#error_page)

<span class="badge dark">advanced</span>

**Syntax**: `error_page code ... uri;` <br/>
**Default**: `-` <br/>
**Context**: server, location, if in location

Defines the URI to redirect to when the current processing results in one of the specified status codes. No change to the [public version](http://nginx.org/en/docs/http/ngx_http_core_module.html#error_page). We configured [`proxy_intercept_errors on`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_intercept_errors) to make it also respond to status codes returned from the origin.

This directive enables the modification of the response based on the status code received from the origin. For example, this is how to use it to change the status code 403 to 404:
```nginx
location /abc {
  origin_pass my-origin;
  error_page 403 @return404;
}
location @return404 {
  return 404;
}
```

### `eval_func`

<span class="badge dark">advanced</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `eval_func $result {function name} {parameters};` <br/>
**Default**: `-` <br/>
**Context**: server, location, if

This is a directive to perform some common encoding, decoding, hash, hash-mac, encryption, decryption and comparison algorithms. It is added to the [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html).  Supported functions are:

| **Type** | **Name** | **Syntax** |
|----------|----------|------------| 
| hash | **SHA256**, **MD5** | ```eval_func $output SHA256 $input;``` |
| BASE64<br>codec | BASE64_ENCODE<br>**BASE64_DECODE** | ```eval_func $output BASE64_ENCODE $input;``` |
| URL<br>codec | URL_ENCODE<br>**URL_DECODE** | ```eval_func $output URL_ENCODE $input;``` |
| HEX<br>codec | HEX_ENCODE<br>**HEX_DECODE** | ```eval_func $output HEX_ENCODE $input;``` |
| AES<br>cipher | **ENCRYPT_AES_256_CBC**<br>**DECRYPT_AES_256_CBC** |```eval_func $output ENCRYPT_AES_256_CBC $key $iv $message;``` |
| HMAC<br>generation | **HMAC**<br>**HMAC_HEXKEY** | ```eval_func $output HMAC $key $message {dgst-alg};```<br>```eval_func $output HMAC_HEXKEY $hexkey $msg {dgst-alg};```<br>```{dgst-alg}``` can be ```MD5```, ```SHA1```, ```SHA256``` |
| integer<br>comparator | COMPARE_INT | ```eval_func $output COMPARE_INT $data1 $data2;```<br>```$output``` will be "1" when ```$data1 > $data2```. "0" and "-1" for the other cases. |
| string<br>manipulation | REPLACE | ```eval_func $output REPLACE <old> <new> $input;``` |

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

**Syntax**: `expires time;
       expires epoch | max | off;` <br/>
**Default**: `expires off;` <br/>
**Context**: server, location, if in location

Enables or disables adding or modifying the “Expires” and “Cache-Control” response header fields. No change to the [public version](http://nginx.org/en/docs/http/ngx_http_headers_module.html#expires). This directive affects only the header fields sent to the client. It does not change the cache time of the content on the server.


### [`gzip_types`](http://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_types)

<span class="badge dark">advanced</span> <span class="badge green">CDN360 Enhanced</span>

**Syntax**: `gzip_types mime-type ...;` <br/>
**Default**: `gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/javascript application/xml;` <br/>
**Context**: server, location

CDN360 always uses gzip and applies it to the default MIME types above. In addition, compression is activated only when the response body size is greater than 1000 bytes. The default behavior should work well for most users. This directive can be used to enable compression on other types. The search and match are case-insensitive. We improved the public version to support up to 20 wildcards like `text/*` and `*javascript`.

### [`if`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#if)

<span class="badge">standard</span> <span class="badge green">CDN360 Enhanced</span>

**Syntax**:	`if (condition) { ... }`<br/>
**Default**:	`—`<br/>
**Context**:	server, location

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

### [`internal`](http://nginx.org/en/docs/http/ngx_http_core_module.html#internal)

<span class="badge dark">advanced</span>

**Syntax**:	`internal;` <br/>
**Default**: `—` <br/>
**Context**: location <br/>

Specifies that a given location can be used for internal requests only. No change to the public version. 

### [`limit_rate`](http://nginx.org/en/docs/http/ngx_http_core_module.html#limit_rate)

<span class="badge">standard</span>

**Syntax**:	`limit_rate rate;` <br/>
**Default**: `limit_rate 4m;` <br/>
**Context**: server, location, if in location

Limits the rate of response transmission to a client, in bytes/sec. Valid values are [1-8]m or [1-8192]k. The default setting is 4MByte/s.

### [`limit_rate_after`](http://nginx.org/en/docs/http/ngx_http_core_module.html#limit_rate_after)

<span class="badge">standard</span>

**Syntax**: `limit_rate_after size;` <br/>
**Default**: `limit_rate_after 4m;` <br/>
**Context**: server, location, if in location

Sets the initial amount of traffic (in bytes) after which the further transmission of a response to a client will be rate limited. We limit the value to an integer in [1-8] followed by ‘m’.

### [`location`](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)

<span class="badge">standard</span>

**Syntax**: `location [ = | ~ | ~* | ^~ ] pattern { ... }` <br/>
**Default**: `-` <br/>
**Context**: server, location

Sets configuration depending on the request URI without query string. No change to the [public version](http://nginx.org/en/docs/http/ngx_http_core_module.html#location).

### `origin_connect_timeout`

<span class="badge dark">advanced</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `origin_connect_timeout time;` <br/>
**Default**: `origin_connect_timeout 5s;` <br/>
**Context**: server

This is an enhancement of the [proxy_connect_timeout](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_connect_timeout) directive. It defines a timeout for establishing a connection with the origin server. The value is limited to an integer in [1,15] followed by ‘s’. We made sure that the entire chain of connections respects this timeout value. Currently, this directive is not supported at the location level.

### `origin_fast_route`

<span class="badge dark">advanced</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `origin_fast_route on|off;` <br/>
**Default**: `origin_fast_route off;` <br/>
**Context**: server, location, if in location

This directive enables a fast route to be used to access the origin. It is powered by our proprietary HDT technology which provides more reliable connection with reduced latency. The traffic transferred through this fast route may be charged with a higher rate than the edge traffic.

### `origin_follow_redirect`

<span class="badge dark">advanced</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `origin_follow_redirect;` <br/>
**Default**: - <br/>
**Context**: location

When the origin responds with a 30x redirect, you may want the CDN servers to chase it until the redirection stops. Passing the redirection to the client takes more time to get the final content. If you want to turn it on, you can use this directive in a location block that uses [origin_pass](</docs/edge-logic/supported-directives.md#origin_pass>) to access an origin.


### `origin_header_modify`

<span class="badge">standard</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `origin_header_modify field value policy=value if(condition);` <br/>
**Default**:  - <br/>
**Context**: server, location, if in location

Use this directive to add, delete, or overwrite the response header fields from the origin **before** any other processing. In other words, the value of any $upstream_http_* variable seen by other directives can be affected by this directive. The directive supports nginx variables.

Possible values of policy are ```repeat, overwrite,``` and ```preserve.``` The policy parameter supports a variable as a value. The default policy is ```repeat```.

*   The ```repeat``` policy always adds the header and the value into the upstream response.
*   The ```overwrite``` policy overwrites the value if the header already exists in the upstream response. Otherwise, it adds the header and the value into the upstream response.
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

Although CDN360 has a hierarchical cache structure, the directive changes the header only in the origin response. 

### `origin_limit_rate`

<span class="badge">standard</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `origin_limit_rate rate;`<br>
**Default**: `origin_limit_rate 0;`<br>
**Context**: server, location

This is a wrapper of the [proxy_limit_rate](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_limit_rate) directive. It limits the speed at which the response is read from the origin server.

### `origin_pass`

<span class="badge">standard</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `origin_pass _origin_name[URI];`<br>
**Default**: none <br>
**Context**: location, if in location

This directive specifies the origin from which to fetch the content. It is a wrapper of the nginx [proxy_pass](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass) directive. It takes one parameter that is an origin name specified in the "origins" field of the property JSON. The origin name can be optionally followed by a URI. Variables can be used in the URI. If an URI is not specified, the full normalized request URI (which may have been changed by the `rewrite` directive) and the query string are appended when accessing the origin. To drop the query string, add `$uri` after the origin name. Examples:
```nginx
# when URI is not specified, $uri and query string will be appended by default
origin_pass my_origin;
origin_pass my_origin$uri$is_args$args; #same as above
origin_pass my_origin$uri; #to drop the query string
origin_pass my_origin/abc$uri;
```

### `origin_read_timeout`

<span class="badge dark">advanced</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `origin_read_timeout time;` <br/>
**Default**:  `origin_read_timeout 20s;` <br/>
**Context**: server

This is an enhancement of the [proxy_read_timeout](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_read_timeout) directive. It defines a timeout for reading a response from the origin server. The value is limited to an integer in [1,60] followed by ‘s’. We made sure that the entire chain of connections respects this timeout value. Currently, this directive is not supported at the location level. 

### `origin_send_timeout`

<span class="badge dark">advanced</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `origin_send_timeout time;` <br/>
**Default**: `origin_send_timeout 20s;` <br/>
**Context**: server

This is an enhancement of the [proxy_send_timeout](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_send_timeout) directive. It sets a timeout for transmitting a request to the origin server. The value is limited to an integer in [1,60] followed by ‘s’. We made sure that the entire chain of connections respects this timeout value. Currently, this directive is not supported at the location level.

### [`origin_set_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header)

<span class="badge">standard</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**:  `origin_set_header field value if(condition);` <br/>
**Default**: `origin_set_header host $host;` <br/>
**Contexts**: http, server, location, if in location

This is a wrapper of the [proxy_set_header](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header) directive to allow redefining (overwriting) or appending fields to the request header passed to the origin server. The following changes were made to the open-source version:

1. This directive merges the configurations across different levels (server/location/if). However, if the same header name appears in multiple levels, only the deepest layer’s configuration takes effect for that header. Because CDN360 has a hierarchical cache structure, we try to make sure the headers set by this directive appear only in the requests to the origin servers (not parent cache servers).
2. Use the new parameter  ```if(condition)``` to set the header based on some conditions. If the condition is true, the directive takes effect. The ```if``` parameter should always be configured at the end of the directive configuration. A condition may be one of the following:

*   A variable name; false if the value of a variable is an empty string.
*   Comparison of a variable with a string using the "=" and "!=" operators.
*   Matching a variable against a regular expression using the operators "\~" (for case-sensitive matching) and "\~\*" (for case-insensitive matching). Negative operators "!\~" and "!\~\*" are also available. If a regular expression includes the "}" or ";" characters, enclose the whole expression in single or double quotes.

Because of the hierarchical cache structure, the built-in variables $scheme and $remote_addr cannot be used. If you need to pass the scheme or IP address used by the client to the origin servers, use the following variables:

*   $request_scheme: scheme used by the client
*   $client_real_ip:  client’s IP address
*   $client_country_code:  client’s ISO3166 country code

For example:
```nginx
origin_set_header X-Forwarded-For $client_real_ip;
```
One thing to notice is that if you want to use this directive to set the `Host` header to origin, you need to make sure the "origins.hostHeader" field of [the property JSON](/cdn/apidocs#operation/createPropertyVersion) is left empty. Otherwise you will get validation error.

### [`proxy_buffering`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffering)

<span class="badge">standard</span>

**Syntax**: `proxy_buffering on | off;` <br/>
**Default**: `proxy_buffering on;` <br/>
**Context**: server, location

Enables or disables buffering of responses from the proxied server. No change to the [open-source version](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffering). 

### [`proxy_cache_bypass`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_bypass)

<span class="badge">standard</span>

**Syntax**: `proxy_cache_bypass string ...;` <br/>
**Default**: `-` <br/>
**Context**: server, location

Defines conditions under which the response will not be taken from cache. If at least one value of the string parameters is not empty and is not equal to “0”, the response will not be taken from the cache. This should be used if you know the content is not cacheable according to the conditions above. Examples:
```nginx
proxy_cache_bypass $cookie_nocache $arg_nocache$arg_comment;
proxy_cache_bypass $http_pragma    $http_authorization;
```
This directive does not prevent the response from being saved in the cache.
That behavior is controlled by another directive [`proxy_no_cache`](#proxy_no_cache), and usually the two should be used together.

### [`proxy_cache_lock`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock)

<span class="badge dark">advanced</span>

**Syntax**: `proxy_cache_lock on/off;` <br/>
**Default**: `proxy_cache_lock on;` <br/>
**Context**: server, location

When enabled, only one request at a time will be allowed to populate a new cache element for the same cache key. Other requests of the same cache element will either wait for a response to appear in the cache or the cache lock for this element to be released, up to the time set by the [proxy_cache_lock_timeout](#proxy_cache_lock_timeout) directive. No change to the public version. By default, CDN360 turns it on to better control the traffic to the origin servers. However, since locking will introduce unnecessary latency when most of the contents are not cacheable, we made `proxy_cache_lock_timeout` default to 0. If you know that most of the contents are cacheable, you can set it to some higher value to reduce origin traffic. In the meantime, if you have a way to accurately identify uncacheable contents, use `proxy_cache_bypass` and `proxy_no_cache` to skip caching and incur the least latency possible.

### [`proxy_cache_lock_age`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock_age)

<span class="badge">standard</span>

**Syntax**: `proxy_cache_lock_age time;` <br/>
**Default**: `proxy_cache_lock_age 15s;` <br/>
**Context**: server, location

If the last request passed to the proxied server for populating a new cache element has not completed for the specified time, one more request may be passed to the proxied server. No change to the public version.

### [`proxy_cache_lock_timeout`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock_timeout)

<span class="badge">standard</span>

**Syntax**: `proxy_cache_lock_timeout time;` <br/>
**Default**: `proxy_cache_lock_timeout 0s;` <br/>
**Context**: server, location

Sets a timeout for `proxy_cache_lock`. If a request has been locked for this amount of time, it will be released to the proxied server and the response will not be used to populate the cache. (`proxy_cache_lock_age` determines how often a request should be sent to populate the cache.) No change to the public version. The default value of 0s optimizes latency. You can change this to a higher value if you know that most of the contents are cacheable and want to reduce origin traffic.

### [`proxy_cache_methods`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_methods)

<span class="badge">standard</span>

**Syntax**: `proxy_cache_methods GET | HEAD | POST ...;` <br/>
**Default**: `proxy_cache_methods GET HEAD;` <br/>
**Context**: server, location

If the client request method is listed in this directive, the response will be cached. “GET” and “HEAD” methods are always added to the list, though it is recommended to specify them explicitly. No change to the [open-source version](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_methods).

### proxy_cache_min_age 

<span class="badge">standard</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `proxy_cache_min_age time;` <br/>
**Default**: `proxy_cache_min_age 0s;` <br/>
**Context**: server, location, if in location

Description:

This directive allows you to configure the minimum cache time. If the received max-age from the origin is less than the specified minimum age, the max-age value is set to the configured minimum age value. For example, if the max-age value in the received HTTP header is 100s and the configured minimum age value is 200s, the effective cache time will be 200s. 

nginx calculates the cache time from the headers in the upstream response or from the nginx directives in the following order:

X-Accel-Expires > Cache-Control (max-age) > Expires > proxy_cache_valid (nginx directive)

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

<span class="badge dark">advanced</span>

Determines in which cases a stale cached response can be used during communication with the proxied server. No change to the public version. 

### [`proxy_cache_valid`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_valid)

<span class="badge">standard</span> <span class="badge green">CDN360 Enhanced</span>

**Syntax**:	`proxy_cache_valid [code ...] time;` <br/>
**Default**:	— <br/>
**Contexts:** http, server, location

Sets caching time for different response codes. We enhanced the [open-source version](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_valid) to support setting `time` with a variable. A value of 0 disables caching of the content. The specified time is applied only to responses without caching instructions from the origin. Response header fields `Cache-Control`, `Expires`, `Set-Cookie`, etc. have higher precedence unless ignored by [`proxy_ignore_cache_control`](#proxy_ignore_cache_control) or [`proxy_ignore_headers`](#proxy_ignore_headers). If you can identify dynamic/non-cacheable contents based on certain parameters in the request, use [`proxy_cache_bypass`](#proxy_cache_bypass) and [`proxy_no_cache`](#proxy_no_cache) to bypass caching and improve performance.

### proxy_cache_vary

<span class="badge dark">advanced</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `proxy_cache_vary on | off;` <br/>
**Default**: `proxy_cache_vary off;` <br/>
**Context**: server, location

If `proxy_cache_vary` is "on", the CDN360 cache servers honor the `Vary` response header from the origin and cache different variations separately. However, the varied contents must be purged using "directory purge". An error will be returned if "file purge" is used for varied contents.

If `proxy_cache_vary` is "off", the CDN360 cache servers do not cache any response with the `Vary` header.

Related reading: [The support (and non-support) of "Vary"](</docs/edge-logic/faq.md#the-support-and-non-support-of-vary>).

### [`proxy_cookie_domain`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cookie_domain)

<span class="badge dark">advanced</span>

Sets a text that should be changed in the domain attribute of the `Set-Cookie` header fields of a proxied server response. No change to the public version. 

### [`proxy_cookie_path`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cookie_path)

<span class="badge dark">advanced</span>

Sets a text that should be changed in the path attribute of the `Set-Cookie` header fields of a proxied server response. No change to the public version. 

### [`proxy_hide_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_hide_header)

<span class="badge">standard</span>

Sets response header fields that will not be passed to the client. No change to the public version. 

### `proxy_ignore_cache_control`

<span class="badge">standard</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax:** `proxy_ignore_cache_control directives…;` <br/>
**Default:** none <br/>
**Contexts:** http, server, location, if in location 

Disables processing of certain `cache-control` directives in the proxy server. The following directives can be ignored: 

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

### [`proxy_ignore_headers`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ignore_headers)

<span class="badge">standard</span>

**Syntax**: `proxy_ignore_headers field ...;` <br/>
**Default**: `-` <br/>
**Context**: server, location

Disables processing of certain response header fields from the proxied server. It is most commonly used to ignore caching instructions such as the `Cache-Control` or `Expires` fields from the origin. No change to the [open-source version](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ignore_headers). 

### [`proxy_next_upstream`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream)

<span class="badge dark">advanced</span>

Specifies in which cases a request should be passed to the next upstream server. No change to the public version. 

### [`proxy_next_upstream_timeout`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream_timeout)

<span class="badge dark">advanced</span>

Limits the time during which a request can be passed to the next upstream server. No change to the public version.

### [`proxy_next_upstream_tries`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream_tries)

<span class="badge dark">advanced</span>

Limits the number of possible tries for passing a request to the next upstream server. No change to the public version. 

### [`proxy_no_cache`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_no_cache)

<span class="badge">standard</span>

**Syntax**: `proxy_no_cache string ...;` <br/>
**Default**: `-` <br/>
**Context**: server, location

Defines conditions under which the response will not be saved to a cache. If at least one value of the string parameters is not empty and is not equal to “0”, the response will not be saved:
```nginx
proxy_no_cache $cookie_nocache $arg_nocache$arg_comment;
proxy_no_cache $http_pragma    $http_authorization;
```
Since the content is not saved, usually there is no point in looking up the cache under the same conditions. Therefore, this directive is commonly used together with the [`proxy_cache_bypass`](#proxy_cache_bypass) directive.

### [`proxy_pass_header`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass_header)

<span class="badge">standard</span>

**Default:** `proxy_pass_header Date;` <br/>

Permits passing [otherwise disabled](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_hide_header) header fields from a proxied server to a client. Changed the default behavior to pass the `Date` header from the upstream, which should carry the time when the content was fetched from origin.

### [`proxy_pass_request_headers`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass_request_headers)

<span class="badge">standard</span>

**Syntax:**	`proxy_pass_request_headers on | off;` <br/>
**Default:**	`proxy_pass_request_headers on;` <br/>
**Context:**	http, server, location

Enables of disables passing request headers from client to upstream. No change to the public version.

### [`proxy_redirect`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_redirect)

<span class="badge dark">advanced</span>

Sets the text that should be changed in the “Location” and “Refresh” header fields of a proxied server response. No change to the public version. 

### `proxy_set`

<span class="badge">standard</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax**: `proxy_set $variable value [if(...)];`<br>
**Default**: none <br>
**Context**: server, location, if in location

This directive assigns the `value` to the `$variable`. The `value` can be another variable or a composition of variables and literals. While this directive looks very similar to the [`set`](#set) directive, it differs in when it is executed. The `set` directive is executed during the "rewrite" phases which are very early -- almost right after the request is received from the client. On the contrary, `proxy_set` is executed after the response header is received from the origin (in case of a cache miss) or read from the cache. Therefore, the `value` can have information contained in the response header (after being modified by any [`origin_header_modify`](#origin_header_modify) directive). In addition, this directive supports the `if()` parameter which can set a condition for the assignment to happen. Here are a few examples:
```nginx
set $cache_time 1d; # by default, cache for 1 day
# if origin responds with a "cachetime" header, use it to override the default
proxy_set $cache_time $upstream_http_cachetime if($upstream_http_cachetime);
proxy_cache_valid $cache_time;
# extract a part from the origin's response header and send to client
proxy_set $version_number $1 if($upstream_http_version ~ "Version:(.*)$");
add_header version-number $version_number;
```
The directive is merged across different levels (http/server/location/location if). If the same variable is assigned in different levels, the assignment in the innermost level takes effect.

### [`proxy_ssl_protocols`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_ssl_protocols)

<span class="badge dark">advanced</span>

Enables the specified protocols for requests to a proxied HTTPS server. No change to the public version.

### `realtime_log_downsample`

<span class="badge">standard</span>

**Syntax:** `realtime_log_downsample factor;` <br/>
**Default:** `-` <br/>
**Contexts:** server, location

Overrides the main "Sample Rate" specified for the [Real-Time Log](/docs/portal/edge-configurations/creating-property#real-time-log). `factor` can be an integer in [0, 65535] or an empty string. A variable is also supported. A value of 0 disables the logging; 1 means do not downsample; N means one log entry for every N requests. A empty string means do not override the main setting. Any invalid value results in a factor of 100. 

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

Rewrite the request URI when a regular expression pattern is matched. No change to the [open-source version](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite). 

This directive belongs to the nginx [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html). It is executed `imperatively` with the other directives in the same module in an early phase of the request processing.

### [`satisfy`](http://nginx.org/en/docs/http/ngx_http_core_module.html#satisfy)

<span class="badge">standard</span>

Allows access if all (all) or at least one (any) of the ngx_http_access_module, ngx_http_auth_basic_module, ngx_http_auth_request_module, or ngx_http_auth_jwt_module modules allows access. No change to the public version. 


### `sanitize_accept_encoding`

<span class="badge dark">advanced</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax:** `sanitize_accept_encoding enc1 enc2 … ;` <br/>
**Default:** `sanitize_accept_encoding gzip;` <br/>
**Contexts:** http, server

This directive processes the incoming `Accept-Encoding` header to consolidate the value. The goal is to increase the cache efficiency and hit ratio by limiting the maximum number of variations due to the `Accept-Encoding` header to 5.

You can specify up to four combinations of content-encoding algorithms after this directive. Each combination is a comma-separated list of one or more `content-encoding` algorithms, such as "gzip,br" or "br". For each request from the client, the CDN360 proxy server tries to match the `Accept-Encoding` header with the specified combinations from left to right. If all the algorithms in a combination are found in the header, the header value is replaced with that combination. If no match is found, the header value is set to "identity".

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

### [`secure_link`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link)

<span class="badge dark">advanced</span>

Defines a string with variables from which the checksum value and lifetime of a link will be extracted. No change to the public version.

### [`secure_link_md5`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_md5)

<span class="badge dark">advanced</span>

Defines an expression for which the MD5 hash value will be computed and compared with the value passed in a request. No change to the public version.

### [`secure_link_secret`](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_secret)

<span class="badge dark">advanced</span>

Defines a secret word used to check authenticity of requested links. No change to the public version.

### [`set`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#set)

<span class="badge">standard</span>

**Syntax:**	`set $variable value;` <br/>
**Default:**	`-` <br/>
**Contexts:** server, location, if

Assigns a value to the specified variable. No change to the public version. In particular, the cache key [can be customized](/docs/edge-logic/faq.md#how-do-you-include-query-parameters-andor-request-headers-in-the-cache-key) by assigning a value to the `$cache_misc` variable.

This directive belongs to the nginx [rewrite module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html). It is executed `imperatively` with the other directives in the same module in an early phase of the request processing.

### [`slice`](http://nginx.org/en/docs/http/ngx_http_slice_module.html#slice)

<span class="badge">standard</span> <span class="badge green">CDN360 Enhanced</span>

**Syntax:**	`slice size;` <br/>
**Default:**	`slice 0;` <br/>
**Contexts:** http, server

Sets the size of the slices when fetching large files from the origin. The valid values are 0, which disables slicing, OR an [nginx size](http://nginx.org/en/docs/syntax.html) that is between `512k` and `512m`, inclusive. The origin has to support range requests and respond with status code 206. If caching is desired, use the statement `proxy_cache_valid 206 ...` to enable caching of the partial responses. We made the following changes to this directive on top of the open-source version:
* We disallowed this directive in any "location" block to ensure the entire domain has the same slice size. This is to avoid potential problems when a request needs to be processed in multiple locations with different slice sizes.
* CDN360 requires all cached slices to carry the same ETag value to ensure the content is consistent. When a slice fetched from the origin has a value that is different from the cached ones, any in-progress transfers to clients are terminated and all the cached slices are purged immediately. Please make sure the ETag value of each file on origin does not change unless the file's content has changed. This behavior can be disabled using `slice_ignore_etag on;`.
* When slicing is enabled, the server automatically removes the `Accept-Encoding` header in the request to origin to disable compression. If this behavior is overridden, for example, by the `origin_set_header Accept-Encoding ...` directive, the client may receive a corrupted response.

### `slice_ignore_etag`

<span class="badge">standard</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax:** `slice_ignore_etag on/off;` <br/>
**Default:** `slice_ignore_etag off;` <br/>
**Contexts:** http, server

This directive can be used to disable the ETag consistency check of sliced files. Use it only as a workaround if the origin generates different ETag values for the same file.

### `sorted_querystring_filter_parameter`

<span class="badge">standard</span> <span class="badge primary">CDN360 Proprietary</span>

**Syntax:** sorted_querystring_filter_parameter param1 param2 … ; <br/>
**Default:** none <br/>
**Contexts:** http, server, location, if in location

Removes some query parameters from the variable ```$sorted_querystring_args```.
This feature is implemented on top of this [open-source project](https://github.com/wandenberg/nginx-sorted-querystring-module).

### [`sub_filter`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter)

<span class="badge dark">advanced</span>

Sets a string to replace in the response and a replacement string. No change to the public version.

### [`sub_filter_last_modified`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter_last_modified)

<span class="badge dark">advanced</span>

Allows preserving the “Last-Modified” header field from the original response during replacement to facilitate response caching. No change to the public version.

### [`sub_filter_once`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter_once)

<span class="badge dark">advanced</span>

Indicates whether to look for each string to replace once or repeatedly. No change to the public version.

### [`sub_filter_types`](http://nginx.org/en/docs/http/ngx_http_sub_module.html#sub_filter_types)

<span class="badge">standard</span>

Enables string replacement in responses with the specified MIME types in addition to “text/html”. No change to the public version.


### [`valid_referers`](http://nginx.org/en/docs/http/ngx_http_referer_module.html#valid_referers)

<span class="badge">standard</span>

Specifies the “Referer” request header field values that will cause the embedded $invalid_referer variable to be set to an empty string. No change to the public version.

### `access_log_downsample`

<span class="badge">standard</span>

**Syntax:** `access_log_downsample factor;` <br/>
**Default:** `-` <br/>
**Contexts:** server

This is a directive to optimize our internal operations. If a property's hostnames receive such a large number of requests that its access log may overload our log processing system, we use this directive to reduce the amount of log entries. A `factor` of N means one log entry for every N requests. It has no effect on the edge behavior, including the real-time log. However, you will see reduced number of entries if you download the access log from the portal or through the API.

