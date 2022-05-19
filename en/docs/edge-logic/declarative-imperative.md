## Declarative and Imperative Directives

Declarative and imperative are two different programming paradigms. Many good articles can [be found on the internet](https://www.google.com/search?q=imperative+declarative) about this topic. In summary, a declarative program describes the desired end result whereas a imperative program describes the exact steps to achieve the result. Both paradigms have pros and cons and their respective suitable scenarios. A common use case of the declarative programming is configuring some well defined workflow with multiple parameters. For example, when you order in a coffee shop, you may just tell the waiter "bring me a cup of coffee with sugar and milk". You don't need to give step-by-step instructions on how to make the coffee including when to add sugar and milk because you are pretty sure the staff knows the detailed procedure.

Serving and proxying content through HTTP is also a workflow well defined by the protocols. Therefore, the configuration of nginx is mostly declarative and you don't need to worry about how or when each directive is executed. For example, the directive `add_header X-My-Data abc always;` simply ensures the field `X-My-Data: abc` appears in the response header; `proxy_pass https://www.my-upstream.com;` tells the server to fetch the content from a designated upstream. These all seem quite straightforward but things get interesting when we need to configure the workflow differently based on some conditions.

### Configurations based on conditions

Let's get back to the coffee ordering example, where you also tell the waiter "if the milk is not from brand WBM, don't add it". A capable waiter should know the milk inventory and based on the availability of brand WBM, give a "flat" instruction "make a cup of coffee with suger and milk" or "make a cup of coffee with suger only" to the staff behind the counter. The instructions may even be as simple as "do code #1" or "do code #2" if they have predefined code names for different processes.

Nginx supports conditions to be specified by the "location" and "if" directives. In addition, CDN Pro introduced "elseif" and "else" for more flexibility. The pair of curly braces following each of these directives defines a "context", which may be nested in an upper level context. The declarative directives in each context can be merged with the upper levels' to obtain a "flat" configuration. When nginx parses the configuration files at load time, it builds a lookup table of all the contexts and the corresponding flat configurations. When a client request comes in, nginx first tries to determine a context for request, then apply the corresponding flat configuration to the remaining processing workflow, just like what the waiter does. If the request matches multiple sibling contexts, the following rules ensure only one is selected:
1. Among all the matching "if" blocks, the last one is picked (The declarative directives in the other "if" blocks are ignored, which is different from most other languages);
2. Among all the matching "location" blocks, one is picked based on this [precedence](http://nginx.org/en/docs/http/ngx_http_core_module.html#location);
3. A "location" block has higher precedence than an "if" block

The determination of the context happens very early in the request processing workflow, before all the other declarative directives.

### Timing of the declarative directives

In general, the users do not need to care about when each declarative directive is executed. But having some knowledge about the timing can help you to avoid many common mistakes. For example, as we mentioned before, the "if" directive is executed in a very early phase. At that time, only the variables extracted from the request are available. In particular, all the `$upstream_*` variable values are empty because the upstream request has not been sent. As a result, the if conditions should not depend any of those variables. Another example is using the response header to return the request processing time:
```nginx
add_header X-request-time $request_time;
```
We need to be aware that `add_header` is executed when building the response header. Therefore the value added to the header is the processing time up until that moment. This is probably accurate enough if the response body is small, but when you have a big response that takes long time to transfer, the value in the header can be significantly smaller than the overall processing time.

Like `add_header`, the execution time of most directives can be figured out by their functionality. One thing people often forget is that the place of a declarative directive in the configuration does not change its execution time. For example, although you can put the access control directives like `allow` and `deny` at the server level before all the locations blocks, they are still executed after the location context is determined for the request, which is after all the rewrite module directives. Therefore if you have a `return 200;` in the matching location, the access control directives will not be executed and the client would always receive the 200 status code.
