## Secure Content Delivery with CDN360

Security and protection of privacy has brought increasingly more concerns in the last few 
years. CDN360 is equipped with many features to help you achieve your security goals with 
a smooth and uninterrupted service for your clients. This article also introduces some common good practices to achieve the maximum security.

### Layer 4 DDoS Mitigation
At the entry point of every CDN360 PoP is a high-performance layer 4 DDoS firewall. This
is a group of machines that is capable ot analyzing the incoming traffic at line-speed.
Based on regularly updated rules, it drops any suspicious packets that may endanger the
services and forward only the safe ones to the servers behind it. This feature is 
enabled for all services and transparent to our customers.

### Access Control at the Edge
Access control is essential to protect the content from unauthorized users. It is also important to mitigate some common layer 7 attacks. CDN360 supports a variety access control methods. Many of them are based on enhanced features of the open-source nginx. We also introduced the proprietary [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>) directive to support any customized algorithms.
* Client IP Restrictions with [`allow`](</docs/edge-logic/supported-directives.md#allow>) and [`deny`](</docs/edge-logic/supported-directives.md#deny>):
```nginx
allow 123.0.0.1/8;
allow 234.12.34.56;
deny all;
```
* Check the `Referer` request header with [`valid_referers`](</docs/edge-logic/supported-directives.md#valid_referers>):
```nginx
valid_referers none blocked server_names
               *.example.com example.* www.example.org/galleries/
               ~\.google\.;
if ($invalid_referer) {
    return 403;
}
```
* Based on any request header or query parameter value using the enhanced [`if`](</docs/edge-logic/supported-directives.md#if>) directive:
```nginx
if ($http_my_token != 'authorized' && $arg_my_token != 'authorized') {
    return 403;
}
```
* Based on a remote authorization server's response, with [`auth_request`](</docs/edge-logic/supported-directives.md#auth_request>):
```nginx
location /protected/ {
    auth_request /auth; # 2xx to grant access, 401 or 403 to reject
    ...
}

location = /auth {
    proxy_pass https://remote.auth-server.com/;
    proxy_method HEAD; # specify method required by the auth server
    proxy_pass_request_body off;
    proxy_set_header Content-Length "";
    proxy_set_header X-Original-URI $request_uri;
}
```
* Use the nginx built-in [`secure_link`](</docs/edge-logic/supported-directives.md#secure_link>) algorithm. This feature allows the client to 
generate an MD5 HMAC from components in the HTTP request with a secret key. An expiration 
time can also be specified. The edge server grants the request only after the MD5 value is
validated and the request is not expired. Please refer to the [official nginx
documentation](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link)
for details.

* Even more complicated algorithms can be achieved with the proprietary directive
[`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>). Here is an example to implement the validation of an HMAC authentication code
with SHA256:
```nginx
eval_func $binhash HMAC $secret_key $request_uri SHA256;
eval_func $b64hash BASE64_ENCODE $binhash;
# assume the client passes the hash through the X-Hash header
if ($b64hash != $http_x_hash) {
    return 403;
}
```

### Access Control to the Origin
It is always a good idea to setup some ACL rules on the origin to avoid spamming. In that case, the [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>) directive can also be used to generate the necessary token to access the origin. Here is an example to implement the [AWS Signature Version 2](https://docs.aws.amazon.com/AmazonS3/latest/userguide/RESTAuthentication.html):
```nginx
##required input variables: $awskey $awsseckey $awsbucket/$s3key
#Step 1: construct STS
set $awsdatev2 $time_rfc822;
set $awssts "GET\n\n\n$awsdatev2\n/$awsbucket/$s3key";
#Step 2: sign STS with secKey
eval_func $awssigv2 HMAC $awsseckey $awssts SHA1;
eval_func $awssigv2_b64 BASE64_ENCODE $awssigv2;
#Step 3: set the required header fields
origin_set_header Date $awsdatev2;
origin_set_header Authorization "$awsv2origin $awskey:$awssigv2_b64";
```

### Secret Management 
<span class="badge yellow">ETA: May. 2021</span>

As shown in the sections above, access control algorithms using [`secure_link`](</docs/edge-logic/supported-directives.md#secure_link>) or [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>) usually require a secret key for HMAC generation or encryption. Since the portal may be accessible by operators who are not authorized to see those keys, you don't want to expose them in clear text in the Edge Logic. The "secret management" feature is created for you to manage and apply secret keys with the least possible amount of exposure.

### Bot Management
Sometimes, before loading page, you want to make sure the request was made by a human using a browser, instead of a bot or crawler. Here is a piece of simple Edge Logic code to prompt the user to click a button to continue:
```nginx
location /protected/ {
    if ($cookie_validated = '') {
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
More sophisticated method can be implemented this way to block more advanced bots.

### TLS features
* CDN360 supports TLS certificates with both RSA and ECDSA algorithms. You can even configure 2 certificates with different algorithms in the same property and the server will pick one based on the client's capability and preference.
* We highly recommend you to set the minimum TLS vertion to 1.2. You should really take advantage of TLSv1.3 for maximum security and performance.
* CDN360 also allows you to fully configure the TLS ciphers based on your security requirements. For example, prioritize the ECDHE and EDH key exchange algorithms to ensure "[Perfect Forward Secrecy](https://www.digicert.com/kb/ssl-support/ssl-enabling-perfect-forward-secrecy.htm)".
* If a client request is using HTTPS, CDN360 will contact the origin with the same protocol to ensure the entire path is encrypted. Although we support "protocol downgrade", you really shouldn't use it unless absolutely necessary.
* To avoid the "man-in-the-middle" attack or DNS hijack of your origin's hostname, you should enable the validation of the origin's certificate.
* If your site supports HTTPS, a good practice is to redirect all HTTP requests to the HTTPS conterpart. You can achieve this on CDN360 portal with a simple dropdown list.

### Bypass Caching of Sensitive Data
If you know that some information are very sensitive and should never be stored on the edge server, you can use the [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) and [`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) directives to achieve this. For example:
```nginx
location /credit-card-info {
    proxy_cache_bypass 1;
    proxy_no_cache 1;
}
```
This is important to meet certain privacy standard such as PCI-DSS and HIPAA.