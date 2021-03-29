## Secure Content Delivery with CDN360

Security and protection of privacy has brought increasingly more concerns in the last few 
years. CDN360 is equipped with many features to help you achieve your security goals with 
a smooth and uninterrupted service for your clients. The features mentioned in this 
article are available without additional charge or even enabled by default for all 
customers.

### Layer 4 DDoS Mitigation
At the entry point of every CDN360 PoP is a high-performance layer 4 DDoS firewall. This
is a group of machines that is capable ot analyzing the incoming traffic at line-speed.
Based on configurable rules, it drops all the suspicious packets that may endanger the
service and forward only the safe packets to the servers behind it. This feature is 
enabled for all services and transparent to our customers.

### Access Control at the Edge
We enhanced the following access control features of the open-source nginx:
* Client IP Restrictions with `allow` and `deny`:
```nginx
allow 123.0.0.1/8;
allow 234.12.34.56;
deny all;
```
* Check the `Referer` request header with `valid_referers`:
```nginx
valid_referers none blocked server_names
               *.example.com example.* www.example.org/galleries/
               ~\.google\.;
if ($invalid_referer) {
    return 403;
}
```
* Based on any request header or query parameter value:
```nginx
if ($http_my_token != 'authorized' && $arg_my_token != 'authorized') {
    return 403;
}
```
* Based on a remote authorization server's response, with `auth_request` directive:
```nginx
location /private/ {
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
* Use the nginx built-in `secure_link` algorithm. This feature allows the client to 
generate an MD5 HMAC from components in the HTTP request with a secret key. An expiration 
time can also be specified. The edge server grants the request only after the MD5 value is
validated and the request is not expired. Please refer to the [official nginx
documentation](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link)
for details.

* Even more complicated algorithms can be achieved with the proprietary directive
`eval_func`. Here is an example to implement the validation of an HMAC authentication code
with SHA256:
```nginx
eval_func $binhash HMAC $secret_key $request_uri SHA256;
eval_func $b64hash BASE64_ENCODE $binhash;
if ($b64hash != $http_x_hash) { # the client passes the hash through the X-Hash header
    return 403;
}
```

### Access Control to the Origin
The `eval_func` directive can also be used to generate necessary token to access the
origin. Here is an example to implement the [AWS Signature Version 2](https://docs.aws.amazon.com/AmazonS3/latest/userguide/RESTAuthentication.html):
```nginx
##required input variables: $awskey $awsseckey $awsbucket/$s3key
#construct STS
set $awsdatev2 $time_rfc822;
set $awssts "GET\n\n\n$awsdatev2\n/$awsbucket/$s3key";
#sign STS with secKey
eval_func $awssigv2 HMAC $awsseckey $awssts SHA1;
eval_func $awssigv2_b64 BASE64_ENCODE $awssigv2;
origin_set_header Date $awsdatev2;
origin_set_header Authorization "$awsv2origin $awskey:$awssigv2_b64";
```

### Secret Management
As mentioned above, the directive `eval_func` can be used to implement some sophisticated
algorithms for access control. However, all those algorithms are using some secret key
to for HMAC generation or encryption. To avoid exposing those secrets in clear text on
the portal, which may be accessible by operators not authorized to see them, we designed
this feature for you to manage and apply them with the least possible amount of exposure.

### Bot Management

### TLS features

### Bypass Caching of Sensitive Data
