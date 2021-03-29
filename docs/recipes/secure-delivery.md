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
* Check the `Referer` request header:
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

```
* Use the nginx built-in `secure_link` algorithm:
```nginx

```
Or finally, use the proprietary directive `eval_func` to implement more complicated
algorithms:
```nginx

```

### Access Control to the Origin

### Secret Management
As mentioned above, the directive `eval_func` can be used to implement some sophisticated
algorithms for access control. However, all those algorithms are using some secret key
to for HMAC generation or encryption. To avoid exposing those secrets in clear text on
the portal, which may be accessible by operators not authorized to see them, we designed
this feature for you to manage and apply them with the least possible amount of exposure.

### Bot Management

### TLS features

### Bypass Caching of Sensitive Data
