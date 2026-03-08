## 加速 REST API

API 调用通常被视为动态 HTTP 请求，因为服务器根据请求中提供的输入参数在实时生成响应。正如我们在 [常见问题](/docs/edge-logic/faq#what-about-dynamic-content) 中所提到的，REST API 调用等动态请求可以通过 CDN Pro 非常有效地加速。例如，移动或 web 应用的用户可能会多次重新加载同一页面，在短时间内生成大量重复的 API 调用。使用 CDN 缓存可以显著提高性能。在本文中，我们将通过一个示例来说明如何使用控制台创建加速项目来加速 API 服务器。

下面是本次假想任务的一些背景和需求：
* 要加速的 API 服务器的主机名为：`api.company.com`。服务器要求请求的 `Host` 请求头携带此值。
* 您当前已设置 DNS 服务器将此主机名解析为两个 IP 地址：`1.1.1.1` 和 `1.1.1.2`
* API 服务器使用标准 HTTP 方法：GET、POST、PUT、DELETE、PATCH。
* 客户端使用 `Authorization` 请求头将凭证传递给服务器，采用 [基本认证](https://zh.wikipedia.org/wiki/HTTP%E5%9F%BA%E6%9C%AC%E8%AE%A4%E8%AF%81) 的**格式**。这使 CDN Pro 服务器可以轻松通过内置变量 `$remote_user` 获取 API 用户名。请注意，您不必使用以明文形式传输密钥密码的实际基本认证算法。您可以自由使用更复杂的算法，例如 [CDN Pro API](/zh/cdn/apidocs#section/Authentication) 中的算法，生成签名放在冒号后面。
* API 服务器的所有输入参数都在请求查询字符串中指定。

下面就是如何使用 CDN Pro 来加速这个 API 服务：
* 创建一条新的 DNS 记录 `api-origin.company.com` 指向这两个 IP 地址。CDN Pro 服务器需要使用它来连接源站。主机名 `api.company.com` 不能再使用，因为我们稍后会将其 CNAME 到 CDN Pro 调度域名，以将客户端流量引导到要加速的平台。
* 任何 API 服务都应在 TLS 加密保护下运行。您需要将 `api.company.com` 的证书上传到 CDN Pro 平台。我们建议使用 [Let's Encrypt](/docs/portal/certificates/auto-renewal) 来自动更新证书。
<p align=center><img src="/docs/resources/images/recipes/api/upload-certificate.png" alt="上传证书" width="700"></p>

* 进入 CDN Pro 控制台创建加速项目以加速此 API 服务。重要的是输入要加速的正确主机名：`api.company.com`。
<p align=center><img src="/docs/resources/images/recipes/api/create-property.png" alt="创建加速项目" width="720"></p>

* 输入有关源站的信息。此页面需要注意几点：服务器使用我们刚刚创建的新 DNS 记录指定。我们强制使用 HTTPS 协议连接源站以确保安全。`Host` 请求头设置为源站需要的值。在这种情况下，我们实际上可以将其留空，因为默认情况下，CDN Pro 会将从客户端收到的 `Host` 请求头值传递给源站。我们还选择了"总是直连"来连接源站，不通过父缓存，因为我们希望最小化延迟，并且知道不同服务器之间不会有任何缓存命中。
<p align=center><img src="/docs/resources/images/recipes/api/origin.png" alt="创建源站" width="600"></p>

* 在边缘逻辑字段中输入以下代码。这里需要注意的重要事项是 API 用户名和客户端 IP 被添加到缓存键中。这确保了缓存的内容只会提供给来自相同 IP 地址的同一用户。结合 HTTPS 和 1 分钟的短缓存时间，这对于行业中的大多数应用程序应该是合理安全的。默认情况下，只有对 `GET` 和 `HEAD` 方法的响应被缓存。您可以使用 [`proxy_cache_methods`](/docs/edge-logic/supported-directives#proxy_cache_methods) 指令来缓存其他响应。常见问题里的 [这个例子](/docs/edge-logic/faq#如何将问号后参数，请求头，或者请求正文加入到缓存key中) 展示了如何缓存 `POST` 请求，并将请求正文加入到缓存 key 里。另一个需要注意的是，我们允许客户端使用 `Cache-Control: no-cache` 请求头绕过缓存。当 CDN Pro 服务器看到此字段值时，它会直接进入源站而不查看缓存。最后，我们启用了 [源站快速路由](/docs/edge-logic/supported-directives#origin_fast_route) 以确保与源站的稳定连接。

```nginx
location / { #这是默认 location。
  # 拒绝 http
  if ($request_scheme = http) {
    return 400 "请使用 https！";
  }
  origin_pass api-origin; #请求 URI 和查询字符串将传递给源站
  # 将 API 用户名和客户端 IP 添加到缓存键
  set $cache_misc $cache_misc.$remote_user.$client_real_ip;
  # 将排序的查询字符串添加到缓存键
  set $cache_misc $cache_misc.$sorted_querystring_args;
  # 客户端可以使用 Cache-Control: no-cache 绕过缓存
  if ($http_cache_control ~ (no-cache|no-store)) {
    set $bypass_cache 1;     #不使用缓存副本
  }
  proxy_cache_bypass $bypass_cache;
  proxy_cache_valid 1m; #200、301 和 302 响应将被缓存 1 分钟
  origin_fast_route on; #启用源站快速路由
}
```
* 确保正确的证书已附加到此加速项目。您可以根据安全要求配置 TLS 最小/最大版本和密码套件：
<p align=center><img src="/docs/resources/images/recipes/api/attach-certificate.png" alt="附加证书" width="600"></p>

* 可选择 [在测试环境中测试](/docs/portal/edge-configurations/testing-property#testing-property-in-staging) 上述加速项目，然后部署到生产环境。
* 如果您还没有调度域名，请根据您的预期交付地点和性能/成本要求创建一个。然后将 `api.company.com` 的 DNS 记录更新为 CNAME 到此调度域名。

对 `api.company.com` 的任何请求现在都将被路由到 CDN Pro 平台。每次缓存缺失或过期都会转发给源站以验证凭证并获取最新内容。如果相同的请求在缓存副本过期之前再次从同一用户和同一 IP 地址来临，内容将立即由 CDN Pro 服务器提供，周转时间大大缩短。最终用户将体验到改进的性能，源站服务器不必在短时间内重复生成相同内容。 
