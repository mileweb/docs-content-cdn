## 用`if`来选择多个源站

在这一节里，我们将介绍一个比前面更复杂一点的用例。需求描述：一个加速域名需要从两个不同的源站来加载内容，具体用哪一个由请求里的`x-origin`头部来决定。对于源站2，当请求对象是图片，HTML或者CSS文件时，需要在URI之前加上"/images"用来回源。需要在回源请求里携带一个`x-msg2origin`头部，其值根据不同的源站有所不同。根据这个需求，我们可以写出如下的边缘逻辑:
```nginx
location / {
  origin_pass origin1; # 默认回源站1
  origin_set_header x-msg2origin "message for origin 1;
  if ($http_x_origin = "origin2") { # 检查请求头x-origin
    origin_pass origin2; # 回源站2
    origin_set_header x-msg2origin "message for origin 2";
    rewrite /.*\.(html?|css|png|js|jpe?g) /image$uri break;
  }
}
```
<a id="ifcaution"></a>这个例子里我们用到了[rewrite模块里的`if`指令](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#if)来检查请求头`x-origin`的值，定义不同的行为。但是，由于rewrite模块和其他模块在执行时序上的差异，我们在使用`if`指令的时候需要格外的小心。如果您需要在边缘逻辑里使用该指令，请务必遵循以下原则:

*   仔细阅读开源版本的[rewrite模块文档](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)。比如您需要理解为什么在上面的例子里，`rewrite`指令最后需要加上`break`参数。
*   请记住：只有rewrite模块里的指令([`if`]（</docs/edge-logic/supported-directives.md#if>), [`set`](</docs/edge-logic/supported-directives.md#set>), [`rewrite`](</docs/edge-logic/supported-directives.md#rewrite>), [`return`](</docs/edge-logic/supported-directives.md#return>), [`break`](</docs/edge-logic/supported-directives.md#break>), [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>)）会按照他们在location配置块里出现的顺序被执行（imperatively）。而且执行时间发生在请求处理的早期阶段，早于几乎所有其他的`定义型`（declarative）指令。在控制台的边缘逻辑编辑器里，为了让用户能简单地区分两类指令，顺序型指令呈蓝色而定义型指令为红色。不同的定义型指令在请求处理的不同阶段按需要被执行。如果有定义型指令被包含在多个`if`配置块里，只有**最后**一个满足条件的配置块里的指令会生效。一个例子如下：
```nginx
location / {
  if ($http_header_a != '') {
    add_header has-header-a 1;
  }
  if ($http_header_b != '') {
    add_header has-header-b 1;
  }
  ...
}
```
When both `header-a` and `header-b` are present in the request, only `has-header-b` will be added to the response. This is not a bug, just how NGINX works. However, this behavior can be counterintuitive to new users.
*   Not all directives can be used in an `if` block. This is documented in the "Context" of each directive. For the ones not allowed in an `if` block, if they support variable as parameter, you can still control their behavior based on `if` conditions using the [`set`](</docs/edge-logic/supported-directives.md#set>) directive. For example: [`proxy_cache_valid`](</docs/edge-logic/supported-directives.md#proxy_cache_valid>), [`proxy_redirect`](</docs/edge-logic/supported-directives.md#proxy_redirect>) and [`proxy_cookie_domain`](</docs/edge-logic/supported-directives.md#proxy_cookie_domain>).
*   Due to the issues mentioned above, you are recommended to refrain from using any declarative directive in `if` blocks, unless there is no other way around. This makes the configuration more readable, especially to people who are new to NGINX. The example above can be rewritten as follows to achieve the desired result:
```nginx
location / {
  # set variables based on the client request
  if ($http_header_a != '') {
    set $has_header_a 1;
  }
  if ($http_header_b != '') {
    set $has_header_b 1;
  }
  # apply the variables to the declarative directives
  add_header has-header-a $has_header_a;
  add_header has-header-b $has_header_b;
  ...
}
```
*   Another way to manipulate the request and response headers conditionally is to use the proprietary `if()` parameter introduced to the [`add_header`](</docs/edge-logic/supported-directives.md#add_header>), [`origin_set_header`](</docs/edge-logic/supported-directives.md#origin_set_header>), and [`origin_header_modify`](</docs/edge-logic/supported-directives.md#origin_header_modify>) directives. When the condition has to involve the response from the origin, this is actually the only way to achieve it. Here is another way to rewrite the example above:
```nginx
location / {
  add_header has-header-a 1 if($http_header_a != '');
  add_header has-header-b 1 if($http_header_b != '');
  ...
}
```