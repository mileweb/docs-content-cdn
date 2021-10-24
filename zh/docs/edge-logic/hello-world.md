## Hello World

让我们以下面这个再简单不过的例子开始吧：

```nginx
location / {
    return 200 "hello world!\n";
}
```
正如您可能猜到的那样，此配置下 CDN Pro 将返回 200 状态码并且携带正文 “hello world!”。 指令 "[location](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)" 表示花括号内的所有配置内容都应用于以“/”开头的 URI（实际上，这等同于所有的请求）。指令 "[return](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return)" 表示按配置生成一个响应给客户端。该响应的状态码为 return 的第一个参数值，正文为 return 的第二个参数值。

有关这两个指令的更多信息，请点击前面的链接。在 CDN Pro 的配置Portal页面上，您可以将上述代码放入到边缘逻辑（edge logic）的文本区域中：

<p align=center><img src="/docs/resources/images/edge-logic/helloworld.png" alt="hello world" width="500"></p>

如果您希望[通过API来创建加速项](</apidocs#operation/createProperty>) ，您可以将代码以如下格式放到JSON文件的"version.edgeLogic"字段中：

```testdomain.json :```
```json
{
  "name":"Hello World Property",
  "description":"This is probably the simplest property",
  "version":{
    "hostnames":["www.testdomain.com"],
    "description":"initial version",
    "edgeLogic":"location / {\n return 200 \"hello world!\\n\";\n}",
    "syntaxVersion":1
  }
} 
```

请注意：您必须按照 [JSON 字符串转义语法](https://www.freeformatter.com/json-escape.html)在同一行中输入整个 Edge Logic 代码。假设此时您创建了一个加速域名为 `www.testdomain.com` 的配置，而且将这个加速配置部署到了演练环境，您可以使用 cURL 命令来对其进行测试：

```bash
$ curl -v http://www.testdomain.com/ --resolve www.testdomain.com:80:163.171.228.89
* Added www.testdomain.com:80:163.171.228.89 to DNS cache
...
> 
< HTTP/1.1 200 OK
< Content-Type: application/octet-stream
< Content-Length: 13
< Connection: keep-alive
< Keep-Alive: timeout=30
< Date: Fri, 19 Jul 2019 23:32:35 GMT
< Server: QTL_Cache/1.14.2.1.1.08
< Accept-Ranges: bytes
< 
hello world!
* Connection #0 to host www.testdomain.com left intact
```

在此示例中，163.171.228.89 是 CDN Pro 演练环境中的一个节点 IP 地址。有关演练环境的使用方法，您可以查阅 [演练环境相关信息](</zh/docs/edge-logic/staging-environment.md>). 

CDN Pro 的 API 后台服务器会将上述边缘逻辑代码封装进一个 NGINX 的 "[server 控制块](http://nginx.org/en/docs/http/ngx_http_core_module.html#server)" 中。边缘逻辑中配置的加速主机名 “www.testdomain.com” 将被转换成 server 控制块中 "[server_name](http://nginx.org/en/docs/http/ngx_http_core_module.html#server_name)" 指令的参数。所有指向 www.testdomain.com 的 HTTP 请求都将由该 server 控制块处理，即遵循您在边缘逻辑中的配置规则。
