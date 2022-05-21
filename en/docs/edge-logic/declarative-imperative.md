## Declarative and Imperative Directives

Declarative and imperative are two different programming paradigms. Many good articles can [be found on the internet](https://www.google.com/search?q=imperative+declarative) about this topic. In summary, a declarative program describes the desired end result whereas a imperative program describes the exact steps to achieve the result. Both paradigms have pros and cons and their respective suitable scenarios. A common use case of declarative programming is setting the parameters of some well defined workflow. For example, when you order in a coffee shop, you may just tell the waiter "bring me a cup of coffee with sugar and milk". You don't need to give step-by-step instructions on how to make the coffee including when to add sugar and milk because you are pretty sure the staff knows the detailed procedure.

Serving and proxying content through HTTP is also a workflow well defined by the protocols. Therefore, the configuration of nginx is mostly declarative and you don't need to worry about how or when each directive is executed. For example, the directive `add_header X-My-Data abc always;` simply ensures the field `X-My-Data: abc` appears in the response header; `proxy_pass https://www.my-upstream.com;` tells the server to fetch the content from a designated upstream. These all seem quite straightforward but things get interesting when we need to configure the workflow differently based on some conditions.

### Configurations based on conditions

Let's get back to the coffee ordering example, where you also tell the waiter "if the milk is not from brand M, don't add it". An experienced waiter should know the milk inventory and based on the availability of brand M, give a "flat" instruction "make a cup of coffee with suger and milk" or "make a cup of coffee with suger only" to the staff behind the counter. The instructions may even be as simple as "do code #1" or "do code #2" if they have predefined code names for different coffee-making processes.

Nginx supports conditions to be specified by the `location` and `if` directives. In addition, CDN Pro introduced `elseif` and `else` for more flexibility. The pair of curly braces following each of these directives defines a "context", which may be nested in an upper level context. The declarative directives in each context can be merged with the upper levels' to obtain a "flat" configuration. When nginx parses the configuration files at load time, it builds a lookup table of all the contexts and the corresponding flat configurations. For example, in case of the following configuration:
```nginx
server {
  CONFIG_0
  location /a { # context 1
    CONFIG_1
  }
  location / { # context 2
    CONFIG_2
    if ($http_x_my_hdr) {  # context 3
      CONFIG_3
    }
    location /b {  # context 4
      CONFIG_4
    }
  }
}
```
The lookup table would resemble the following:

| **Context** | **Merged "Flat" Configuration** |
| :----: | ---- |
| 1 | CONFIG_0+CONFIG_1 |
| 2 | CONFIG_0+CONFIG_2 |
| 3 | CONFIG_0+CONFIG_2+CONFIG_3 |
| 4 | CONFIG_0+CONFIG_2+CONFIG_4 |

When a client request comes in, nginx first tries to determine a context for request, then apply the corresponding flat configuration to the remaining processing workflow, just like how the waiter converts your conditional order to a flat order. If the request matches multiple sibling contexts, the following rules ensure only one is selected:

1. Among all the matching `if` blocks, the last one is picked. Nginx does not merge configurations dynamically so the declarative directives in the other `if` blocks are ignored;
2. Among all the matching `location` blocks, one is picked based on this [precedence](http://nginx.org/en/docs/http/ngx_http_core_module.html#location);
3. `location` blocks have higher precedence than the "if" blocks.

Rule #1 above is probably the most confusing nginx behavior to new users since it is different from most other programming languages. We have some suggestions [on this page](multiple-origins) regarding how to deal with it. 


### Timing of the declarative directives

In principle, users do not need to care about the time when each declarative directive is executed. But having some knowledge about the timing can help you to avoid some common mistakes. In fact, the execution time of most directives can be easily figured out by their functionalities in the request processing pipeline, which is roughly sketched below with 7 stages.
<p align=center src=“https://docs.google.com/drawings/d/1XC9P8Y4bd_M876iiAUUYkijocV_y21S8YT3rg3ACh2E/edit”><img src="/docs/edge-logic/request-workflow.png" alt="Request Processing Workflow" width="600"></p>

For example, the directive `add_header` is executed when building the response header to the client in stage 7, and `proxy_set_header` is executed when building the request header to the upstream in stage 5. All the access control directives are executed in stage 3 and the rewrite module directives in stage 2.

People who are familiar with imperative programming often forget that the place a declarative directive appears in the configuration does not affect its execution time. Consider the following configuration:
```nginx
allow 1.2.3.4;
denay all;
location /hello {
  return 200 'Hello World!';
}
location / {
  origin_pass my_origin;
}
```
Although the access control directives `allow` and `deny` are placed at the server level before the `location` blocks, they are still executed after the location context is determined for the request, which is after all the rewrite module directives including `return`. Therefore, any request to "/hello" always receives the status code 200 and the access control directives are not executed.

A mistake often made by new users is attempting to put `$upstream_*` variables in the condition of an `if` directive, hoping to alter the behavior based on the origin's response. However, the `if` directive is executed very early in the request processing pipeline, way before the upstream request is even sent to the origin. At that time, only the variables extracted from the request are available and all the `$upstream_*` variable values are empty. The correct way to control behavior based on origin's response is to use the proprietary `if()` parameter we introduced to many directives. The condition in this parameter is evaluated when the directive is about to be executed. If this happens after the response is received (stages 6 and 7 in the flowchart), the condition can include the `$upstream_*` variables. For example, this is how to force remove the "Cache-Control" header field of a response with status code 404 and cache for 1 hour:
```nginx
origin_header_modify Cache-Control '' policy=overwrite if($upstream_status = 404);
proxy_cache_valid 404 1h;
```

Another case we want to mention is using the response header to return the request processing time:
```nginx
add_header X-request-time $request_time;
```
Because `add_header` is executed while building the response header to the client, the value added to the header is a snapshot of the variable at that moment, not including the time spent later to transfer the response body. This is probably accurate enough when the response body is small, but in case of a big response that takes long time to transfer, the value in the header can be significantly smaller than the overall processing time.
