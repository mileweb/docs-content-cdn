## REST API Acceleration

API calls are usually considered dynamic HTTP requests, since the responses are generated
by the server in real time based on some input parameters supplied in the request. As we
mentioned in the [FAQ], dynamic requests such as REST API calls can be very effectively
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
1. Create a new DNS record `api-origin.company.com` to point to the 2 IP addresses. The 
CDN360 servers need to use it to reach the origin servers. The name `api.company.com` can
no longer be used because we later will CNAME it to a CDN360 edge hostname to direct
client's traffic to the platform to be accelerated.
2. Go to the CDN360 portal to create an property. The important thing here is to enter the
correct hostname to be accelerated: `api.company.com`:
<p align=center><img src="/docs/resources/images/recipes/api/create-property.png" alt="create property" width="720"></p>
3. Enter the information about the origin
<p align=center><img src="/docs/resources/images/recipes/api/origin.png" alt="create property" width="720"></p>
