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
    auth_request /auth; # 2xx to grant access, 401 or 403 to reject
    ...
}

location = /auth { # calls a remote server to authenticate the request
    origin_pass remote-auth-server;
    proxy_method HEAD; # specify method required by the remote server
    proxy_pass_request_body off; # remove the request body, if any
    origin_set_header Content-Length "" policy=overwrite;
    # forward the original request URI to the remote server
    origin_set_header X-Original-URI $request_uri;
}
```
* 使用 Nginx 内置的 [`secure_link`](</docs/edge-logic/supported-directives.md#secure_link>) 鉴权算法. This feature allows clients to use a secret key to generate an MD5 HMAC from components in the HTTP request. An expiration time can also be specified. The edge server grants the request only after the MD5 value is validated and the request has not expired. For details, please refer to the [official Nginx documentation](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link).

* 通过 [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>) 指令 来实现几乎任意的定制鉴权算法. 下面这个例子描述了如何验证一个基于 SHA256 的 HMAC（哈希验证码）:
```nginx
eval_func $binhash HMAC $secret_key $request_uri SHA256;
eval_func $b64hash BASE64_ENCODE $binhash;
# assume the client passes the hash through the X-Hash header
if ($b64hash != $http_x_hash) {
    return 403;
}
```

### 实现回源站的鉴权
很多源站都会配置一些鉴权规则来避免服务被滥用。在这种情况下，您可以使用 [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>) 指令来方便的生成访问源站所需要的 token。下面这个例子展示了如何实现 [AWS Signature Version 2](https://docs.aws.amazon.com/AmazonS3/latest/userguide/RESTAuthentication.html) 算法:
```nginx
## required input variables: $awskey $awsseckey $awsbucket/$s3key

# Step 1: construct the STS
set $awsdatev2 $time_rfc822;
set $awssts "GET\n\n\n$awsdatev2\n/$awsbucket/$s3key";

# Step 2: sign the STS with secKey
eval_func $awssigv2 HMAC $awsseckey $awssts SHA1;
eval_func $awssigv2_b64 BASE64_ENCODE $awssigv2;

# Step 3: set the required header fields
origin_set_header Date $awsdatev2;
origin_set_header Authorization "$awsv2origin $awskey:$awssigv2_b64";
```
CDN Pro 也支持源站使用客户端证书来鉴权。您可以为每一个源站指定一个客户端证书。下图展示了如何在控制台上做这个配置：
<p align=center><img src="/docs/resources/images/recipes/secure/origin_cert.png" alt="origin client cert" width="550"></p>

### 保密信息的管理
As shown in the sections above, access control algorithms using [`secure_link`](</docs/edge-logic/supported-directives.md#secure_link>) or [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>) usually require a secret key for HMAC generation or encryption. Since the portal may be accessible by operators who are not authorized to see those keys, you want to prevent the keys from being exposed in clear text in the Edge Logic. The [`保密信息`](</docs/portal/secrets/overview>) feature allows you to manage and apply secret keys with minimal exposure.

### 爬虫防护
在把某些内容发送给客户端之前，有时候您可能希望确定对方是一个人类在使用一个正常的浏览器，而不是某种机器爬虫。下面这段 Edge Logic 代码展示了如何实现一个机制让终端用户点击一个按钮之后才能获取文件内容，同时也验证了他至少是在使用一个支持 Javascript 和 Cookie 的客户端:
```nginx
location /protected/ {
    if ($cookie_validated = '') { #check the existence of the cookie 'validated'
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
    # continue loading the page from origin or cache
    origin_pass my_origin;
}
```
这只是一个简单例子。我们可以通过更复杂的 Javascript 代码来防御更聪明的机器爬虫。

### TLS相关配置
* CDN Pro supports TLS certificates with both RSA and ECDSA algorithms. You can even configure two certificates with different algorithms in the same property and have the server pick one based on the client's capability and preference.
* We highly recommend that you set the minimum TLS version to 1.2. For maximum security and performance, however, you should really take advantage of TLSv1.3. The TLS version on both the client and origin sides can be configured.
* CDN Pro also allows you to fully configure TLS ciphers based on your security requirements. For example, you can prioritize the ECDHE and EDH key exchange algorithms to ensure "[Perfect Forward Secrecy](https://www.digicert.com/kb/ssl-support/ssl-enabling-perfect-forward-secrecy.htm)".
* If a client request uses HTTPS, CDN Pro contacts the origin with the same protocol to ensure that the entire path is encrypted. Although CDN Pro supports "protocol downgrades," you should avoid using them unless absolutely necessary.
* To avoid "man-in-the-middle" attacks or DNS hijacking attempts of your origin's hostname, enable the validation of the origin's certificate.
* If your site supports HTTPS, a good practice is to redirect all HTTP requests to the HTTPS counterpart. You can enable this on the [CDN Pro portal](/docs/portal/edge-configurations/creating-property.md#tls-settings) with the following dropdown list:
<p align=center><img src="/docs/resources/images/edge-logic/http-redirect.png" alt="HTTP redirect" width="500"></p>

### 防止缓存敏感数据
If you know that some information is extremely sensitive and should never be stored on the edge server, use the [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) and [`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) directives to bypass caching of confidential content. For example:
```nginx
location /credit-card-info {
    proxy_cache_bypass 1;
    proxy_no_cache 1;
}
```
This is particularly important when meeting privacy standards such as PCI-DSS and HIPAA.

### Web应用防火墙 (WAF)
CDN Pro can work seamlessly with CDNetworks' WAF platform to protect your origin servers from any malicious requests. It also works well with any 3rd party WAF solutions.
