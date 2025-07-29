## 用CDN Pro安全地进行分发

安全和隐私保护在近年来得到了社会各界的广泛关注。每过一段时间都能在新闻里看到关于互联网安全信息泄露的消息。
为了实现您的数据安全目标，CDN Pro提供了大量有效的功能和特性来保护您的业务不受任何侵扰。本文将对这些特性
做一个简要的介绍，并提供一些关于提高安全性的最佳实践。

### 第4层DDoS防护
CDN Pro是搭建在我们边缘计算平台之上的。在每一个边缘节点的网络入口都部署有我们的高性能4层DDoS防火墙。
这些设备可以在物理线路的传输速率下分析每一个报文，并根据定期更新的规则来判断它们是否会对上层服务造成侵害。
只有安全的报文才会被转发到后端，包括CDN Pro以及所有的边缘业务。这项服务是默认开启，并对所有客户透明的。

### 第7层DDoS防护
CDN Pro对平台上的7层流量进行实时监控并通过大数据分析及时发现任何异常的行为。一旦发现攻击行为，会迅速把防护策略同时下发到
4层和7层以最有效地消除对正常服务的影响。自平台运行以来，CDN Pro已经成功防御了多次世界级的超大型攻击。最大攻击带宽高达1.2Tbps，
攻击请求速率更是达到了史无前例的35Mrps！

### 在边缘上进行访问控制
访问控制是一项十分重要的功能，以保护内容不会被未授权的用户所获取。它也可以用于防御某些常见的7层攻击。CDN Pro 支持多种访问控制机制。除了对原生 Nginx 相应功能的增强以外，我们还新增了 [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>) 指令来支持更加复杂的定制算法。
* 使用[`allow`](</docs/edge-logic/supported-directives.md#allow>) 和 [`deny`](</docs/edge-logic/supported-directives.md#deny>) 来限制客户端IP地址:
```nginx
allow 123.0.0.1/8;
allow 234.12.34.56;
deny all;
```
* 使用 [`valid_referers`](</docs/edge-logic/supported-directives.md#valid_referers>) 来检查合法的 `Referer` 取值:
```nginx
valid_referers none blocked server_names
               *.example.com example.* www.example.org/galleries/
               ~\.google\.;
if ($invalid_referer) {
    return 403;
}
```
* 使用增强的 [`if`](</docs/edge-logic/supported-directives.md#if>) 指令来实现基于请求头或者 URL 参数的判断:
```nginx
if ($http_my_token != 'authorized' && $arg_my_token != 'authorized') {
    return 403;
}
```
* 通过 [`auth_request`](</docs/edge-logic/supported-directives.md#auth_request>) 指令实现用远端服务器鉴权:
```nginx
location /protected/ {
    auth_request /auth; # 鉴权服务返回 2xx 状态码将允许访问, 401 或 403 将拒绝访问
    ...
}

location = /auth { # 调用一个远端鉴权服务器来认证请求
    origin_pass remote-auth-server;
    proxy_method HEAD; # 配置远端服务器要求的访问方法
    proxy_pass_request_body off; # 去掉请求的正文，远端服务器不需要查看
    origin_set_header Content-Length "" policy=overwrite;
    # 把请求试图访问的 URL 通过一个请求头发给远端服务器
    origin_set_header X-Original-URI $request_uri;
}
```
* 使用 Nginx 内置的 [`secure_link`](</docs/edge-logic/supported-directives.md#secure_link>) 鉴权算法。这个功能要求客户端使用 MD5 算法，利用 HTTP 请求的特征以及一个密钥来生成
一个哈希信息验证码（HMAC）。请求也可以携带一个过期时间。边缘服务器只有在请求未过期，且 HMAC 验证成功的情况下才会允许访问。更多详情请参阅 [nginx 官方文档](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link)。

* 通过 [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>) 指令 来实现几乎任意的定制鉴权算法. 下面这个例子描述了如何验证一个基于 SHA256 的 HMAC（哈希验证码）:
```nginx
eval_func $binhash HMAC $secret_key $request_uri SHA256;
eval_func $b64hash BASE64_ENCODE $binhash;
# 假设客户端通过 X-Hash 头部传入哈希验证码
if ($b64hash != $http_x_hash) {
    return 403;
}
```

### 实现回源站的鉴权
很多源站都会配置一些鉴权规则来避免服务被滥用。在这种情况下，您可以使用 [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>) 指令来方便的生成访问源站所需要的 token。下面这个例子展示了如何实现 [AWS Signature Version 2](https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/RESTAuthentication.html) 算法:
```nginx
## 输入变量: $awskey $awsseckey $awsbucket/$s3key

# 第 1 步: 构造 被签名字符串（STS）
set $awsdatev2 $time_rfc822;
set $awssts "GET\n\n\n$awsdatev2\n/$awsbucket/$s3key";

# 第 2 步: 用 secKey 生成 STS 的签名，并用 base64 编码
eval_func $awssigv2 HMAC $awsseckey $awssts SHA1;
eval_func $awssigv2_b64 BASE64_ENCODE $awssigv2;

# 第 3 步: 设置要求的请求头
origin_set_header Date $awsdatev2;
origin_set_header Authorization "$awsv2origin $awskey:$awssigv2_b64";
```
CDN Pro 也支持源站使用客户端证书来鉴权。下图展示了如何在控制台上为每一个源站指定一个客户端证书：
<p align=center><img src="/docs/resources/images/recipes/secure/origin_cert.png" alt="origin client cert" width="550"></p>

### 保密信息的管理
前面几节里提到的访问控制算法 [`secure_link`](</docs/edge-logic/supported-directives.md#secure_link>) 或者 [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>) 都需要用到一个密钥来生成 HMAC 或者进行加密。 由于 portal 的使用者不一定都有查看密钥的授权，您可能希望这些密钥不要在 Edge Logic 里以明文的形式暴露。
我们的 [`保密信息`](</docs/portal/secrets/overview>) 功能使您可以方便的管理和使用密钥，并最大程度地保护它们不被暴露。

### 爬虫防护
在把某些内容发送给客户端之前，有时候您可能希望确定对方是一个人类在使用一个正常的浏览器，而不是某种机器爬虫。下面这段 Edge Logic 代码展示了
如何实现一个机制让终端用户点击一个按钮之后才能获取文件内容，同时也验证了他至少是在使用一个支持 Javascript 和 Cookie 的客户端:
```nginx
location /protected/ {
    if ($cookie_validated = '') { # 检查是否存在一个 cookie 'validated'
        # 如果 cookie 不存在就返回一个验证 HTML 代码和头部
        add_header Set-Cookie 'validated=1; Max-Age=60';
        add_header Content-Type 'text/html' policy=overwrite;
        return 200 '<!DOCTYPE html>
<html>
  <script>
    alert("Human, click OK to proceed.");
    location.href="$request_uri";
  </script>
</html>';
    }
    # 如果 cookie 存在就继续服务请求
    origin_pass my_origin;
}
```
这只是一个简单例子。我们可以通过更复杂的 Javascript 代码来防御更聪明的机器爬虫。

### TLS相关配置
* CDN Pro 支持使用 RSA 和 ECDSA 算法的 TLS 服务端证书。您甚至可以在同一个加速项内配置两个不同算法的证书，边缘服务器会根据客户端的能力和意愿来选择。
* 我们强烈建议您将支持的 TLS 最低版本设置为至少 1.2。为了最高的安全性，如果没有客户端兼容性的问题，您应该使用1.3版本。CDN Pro 支持您配置客户端侧和回源侧的 TLS 版本。
* CDN Pro 也支持您根据安全性需求完全控制 TLS 的加密套件。例如，您可以配置优先选用 ECDHE 或 EDH 密钥交换算法来确保 "[前向保密性](https://www.digicert.com/kb/ssl-support/ssl-enabling-perfect-forward-secrecy.htm)".
* 如果一个客户端请求使用 HTTPS 协议，CDN Pro 会使用同样的协议来访问源站来确保整个链路是加密的。尽管 CDN Pro 提供了 "协议降级" 的选项，您如果没有十分的必要请不要启用。
* 在源站配置里，您可以选择打开“验证源站证书”功能来有效防范针对源站的 "中间人" 攻击或者是 DNS 劫持。
* 如果您的加速项支持 HTTPS，一个好的实践是将所有 HTTP 请求都重定向到对应的 HTTPS 入口。您可以在 [CDN Pro 控制台](/docs/portal/edge-configurations/creating-property.md#tls-settings) 使用这个下拉框来配置：
<p align=center><img src="/docs/resources/images/edge-logic/http-redirect.png" alt="HTTP redirect" width="500"></p>

### 防止缓存敏感数据
如果某些信息非常敏感，不应该被缓存在 CDN 服务器上，您可以使用 [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) 和 [`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 指令来防止这些需要保密的内容被缓存。下面是一个配置示例：
```nginx
location /credit-card-info {
    proxy_cache_bypass 1;
    proxy_no_cache 1;
}
```
这样的配置对符合某些隐私保护规范，例如 PCI-DSS 和 HIPAA 的要求十分重要。

### Web应用防火墙 (WAF)
CDN Pro 可以与 {{title}} 的 WAF 平台协作来保护您的源站免受恶意请求的攻击。CDN Pro 也可以与任何第三方的 WAF 平台协作。
