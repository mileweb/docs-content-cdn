## 加速 REST API

API 调用通常被视为动态 HTTP 请求，因为响应是由服务器根据请求中提供的某些输入参数实时生成的。正如我们在[常见问题](/docs/edge-logic/faq#动态文件能通过cdn-pro加速吗)中提到的，API 调用等动态请求仍然可以通过 CDN Pro 实现加速效果。例如，移动应用或 Web 应用的用户可能会在短时间内反复加载同一页面，从而产生大量重复的 API 调用。使用 CDN 进行一些缓存可以显著提高性能。在本文中，我们将通过一个示例来说明如何使用控制台创建加速项目来加速 API 请求。

下面是本示例假设的一些背景和需求：
* 要加速的 API 服务对外使用该域名：`api.company.com`。API 服务器要求请求的 `Host` 请求头携带此值。
* 您当前在 DNS 提供商处配置将该域名解析到两个 IP 地址：`1.1.1.1` 和 `1.1.1.2`。
* API 服务器使用标准的 HTTP 方法：GET、POST、PUT、DELETE、PATCH。
* 客户端使用 `Authorization` 请求头，按照 [HTTP 基本认证](https://zh.wikipedia.org/wiki/HTTP%E5%9F%BA%E6%9C%AC%E8%AE%A4%E8%AF%81)的格式将鉴权信息传递给服务器。这使得 CDN Pro 服务器可以通过内置变量 `$remote_user` 轻松获取 API 用户名。注意，您不必使用实际的基本认证算法（该算法以明文形式传输密码）。您可以选择使用更复杂的算法来生成签名，例如 [CDN Pro API](/apidocs#section/Authentication) 所使用的算法。
* 发送到 API 服务器的所有输入参数都在请求的查询字符串中指定。

下面说明了如何使用 CDN Pro 来加速这个 API 服务：
* 创建一个新的 DNS 记录 `api-origin.company.com`，指向上述两个 IP 地址。CDN Pro 服务器需要使用这个域名来访问源站。不能再使用 `api.company.com` 这个域名，因为稍后我们会改它的 DNS 记录，将它 CNAME 到 CDN Pro 调度域名，将客户端流量引导到平台进行加速。
* 任何 API 服务都不应在没有 TLS 加密保护的情况对外提供服务。您需要将 `api.company.com` 的证书上传到 CDN Pro 平台。我们建议使用 [Let's Encrypt](/docs/portal/certificates/auto-renewal) 来自动更新证书。
<p align=center><img src="/docs/resources/images/recipes/api/upload-certificate.png" alt="upload certificate" width="700"></p>

* 进入 CDN Pro 控制台，创建一个加速项目来加速此 API 服务。务必输入正确的加速域名：`api.company.com`。
<p align=center><img src="/docs/resources/images/recipes/api/create-property.png" alt="create property" width="720"></p>

* 输入源站信息。此页面需要注意几点：源站服务器使用我们刚创建的 `api-origin.company.com`。我们强制使用 HTTPS 协议访问源站以确保安全。`Host` 请求头设置为源站要求的值。在这个示例下，我们实际上可以将其留空，因为默认情况下 CDN Pro 会将从客户端收到的 `Host` 请求头值传递给源站。我们还选择了“总是直接连接”，以便直接访问源站而不经过父缓存，因为我们希望最大限度地减少延迟，并且知道不同服务器之间不会有任何缓存命中。
<p align=center><img src="/docs/resources/images/recipes/api/origin.png" alt="create origin" width="600"></p>

* 将以下代码输入到边缘逻辑字段中。这里需要注意的一点是，API 用户名和客户端 IP 被加入到了缓存键中。这确保了缓存内容只会提供给来自同一 IP 地址的同一用户。结合 HTTPS 和 1 分钟的短缓存时间，这对行业内的大多数应用来说应该是相当安全的。默认情况下，只有对 `GET` 和 `HEAD` 方法的响应才会被缓存。您可以使用 [`proxy_cache_methods`](/docs/edge-logic/supported-directives#proxy_cache_methods) 指令来缓存其他响应。常见问题里的[这个例子](/docs/edge-logic/faq#如何将问号后参数，请求头，或者请求正文加入到缓存key中) 展示了如何缓存 `POST` 请求，并将请求正文加入到缓存键里。另外要注意的是，我们允许客户端使用 `Cache-Control: no-cache` 请求头字段来绕过缓存。当 CDN Pro 服务器看到此字段值时，它会直接访问源站而不查找缓存。最后，我们启用了[源站快速通道](/docs/edge-logic/supported-directives#origin_fast_route)以确保到源站的稳定连接。

```nginx
location / { #This is the default location.
  # reject http
  if ($request_scheme = http) {
    return 400 "please use https!";
  }
  origin_pass api-origin; #the request URI and query string will be passed to the origin
  # add API user name and client IP into cache key
  set $cache_misc $cache_misc.$remote_user.$client_real_ip;
  # add sorted query string into cache key
  set $cache_misc $cache_misc.$sorted_querystring_args;
  # the client can use Cache-Control: no-cache to by pass cache
  if ($http_cache_control ~ (no-cache|no-store)) {
    set $bypass_cache 1;     #do not use cached copy
  }
  proxy_cache_bypass $bypass_cache;
  proxy_cache_valid 1m; #200, 301, and 302 responses will be cached for 1m
  origin_fast_route on; #enable the Fast Route to origin
}
```
* 确保证书已附加到此加速项目。您可以根据安全需求配置 TLS 最低/最高版本和加密套件：
<p align=center><img src="/docs/resources/images/recipes/api/attach-certificate.png" alt="attach certificate" width="600"></p>
* 可选：先在[演练环境中测试](/docs/portal/edge-configurations/testing-property#在演练环境中测试加速项目)上述加速项目，然后部署到生产环境。
* 如果您还没有调度域名，请根据您的用户分布和性能/成本要求创建一个。然后更改 `api.company.com` 的 DNS，创建 CNAME 记录将域名指向到此调度域名。

现在，任何发送到 `api.company.com` 的请求都会指向 CDN Pro 平台。每次缓存未命中或过期都会转发请求到源站以验证凭据并获取最新内容。如果在缓存副本过期之前，同一用户从同一 IP 地址再次发出相同请求，内容将由 CDN Pro 服务器立即提供，响应时间大大缩短。最终用户将体验到性能的提升，源站服务器也无需在短时间内反复生成相同的内容。