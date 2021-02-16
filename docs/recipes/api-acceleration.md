## REST API Acceleration

API calls are usually considered dynamic HTTP requests, since the responses are generated
by the server in real time based on some input parameters supplied in the request. As we
mentioned in the [FAQ](/docs/edge-logic/faq#what-about-dynamic-content), dynamic requests
such as REST API calls can be very effectively
accelerated by CDN360. In this article, we are going to use an example to illustrate how
to use the portal to create a property to accelerate an API server.

Here are the assumption about this task:
* The API server to be accelerated has a hostname: `api.company.com`. The server requires
the request `Host` header to carry this value.
* You currently setup the DNS server to resolve this hostname to 2 IP addresses: `1.1.1.1`
and `1.1.1.2`
* The API server is using the standard HTTP methods: GET, POST, PUT, DELETE, PATCH
* The client is using the `Authorization` request header to pass the credential to the
server following the format of [basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).
This makes it easy for the CDN360 servers to obtain the API user name with the built-in
variable `$remote_user`.
* All the input variables to the API server are specified in the request query string.

In order to use CDN360 to accelerate this service, we need to do the following:
* Create a new DNS record `api-origin.company.com` to point to the 2 IP addresses. The 
CDN360 servers need to use it to reach the origin servers. The name `api.company.com` can
no longer be used because we later will CNAME it to a CDN360 edge hostname to direct
client's traffic to the platform to be accelerated.
* No API server should be running without the protection of TLS encryption. You need to
upload the certificate for `api.company.com` to the CDN360 platform. We recommend the use
of [Let's Encrypt] to automatically renew the certificate.
<p align=center><img src="/docs/resources/images/recipes/api/upload-certificate.png" alt="upload certificate" width="700"></p>

* Go to the CDN360 portal to create an property to accelerate this API service. The 
important thing in this step is to enter the correct hostname to be accelerated: `api.company.com`.
<p align=center><img src="/docs/resources/images/recipes/api/create-property.png" alt="create property" width="720"></p>

* Enter the information about the origin. A few things to note on this page: The server
is specified with the new DNS record we just created. We are enforcing the HTTPS protocol
to reach the origin to ensure security. The `Host` header value is specified to be the
one required by the origin. In this case, we can actually leave it empty because by
default, CDN360 will pass the `Host` header value received from client to the origin. We also
chose "Always Direct" to reach the origin without going though a parent cache. This is because we want to
minimize latency and we know there is not going to be cache hit across different servers.
<p align=center><img src="/docs/resources/images/recipes/api/origin.png" alt="create origin" width="600"></p>

* Enter the following code into the Edge Logic field. The important thing to note here is
that the API user name and client IP are added to the cache key. This ensures that the 
cached content will be only served to the same user from the same IP address. Combined
with HTTPS and the short cache time of 1 minute, this should be safe enough for the vast
majority of applications in the world. Another thing to notice is that we allow the
clients to use the `Cache-Control: no-cache` header field to by pass cache. When a CDN360
server sees this field value, it will not look up the cache and go directly to origin.
Last but not least, we enabled the [Fast Route to origin](/docs/edge-logic/supported-directives#origin_fast_route)
to ensure stable connections to the origin.

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
* Make sure the correct certificate is attached to this property. You can configure the
TLS min/max versions and cipher suites based on your security requirements:
<p align=center><img src="/docs/resources/images/recipes/api/attach-certificate.png" alt="attach certificate" width="600"></p>
* Optionally test the above property [in staging](/docs/portal/edge-configurations/testing-property#testing-property-in-staging)
and then deploy to production.
* If you still don't have one, create an "edge hostname" based on your intended delivery
destination and performance/cost requirement. Then, update the DNS record of `api.company.com`
to CNAME to this edge hostname.

Any request to `api.company.com` is now accelerated by CDN360 platform and the end users
will experience a faster and more stable service!