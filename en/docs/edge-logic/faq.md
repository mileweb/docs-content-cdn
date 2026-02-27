## Frequently Asked Questions

### How is the cache time for an object determined?

There are many directives you can use in the Edge Logic to control the cache time. If none of them is configured, the default behavior of CDN Pro edge servers is to "honor the origin". That is, the instructions in the `Cache-Control` and `Expires` header fields are followed. If these two fields are not present in a response from the origin, the response is not cached. The presence of the `Set-Cookie` header field also prevents caching of the response. 

We modified the open-source NGINX to strictly follow the HTTP standard regarding 'zero-time cache'. When `no-cache` or `max-age=0` is present in the `Cache-Control` header field, the response is still cached but expires immediately. Any subsequent request for this object will result in a revalidation request to the origin with the `If-Modified-Since` header. If `no-store` is in the `Cache-Control` header field, the response will not be cached.

By default, the `Date` header field is [passed all the way](</docs/edge-logic/supported-directives.md#proxy_pass_header>) from the origin to the edge servers. Efforts have also been made to ensure the `Age` header field reflects the time since the response is retrieved from the origin, even when parent cache is used.

If the default behavior mentioned above does not meet your requirement, use the following directives to alter it.

* To ignore one or more of the three special header fields above, you can use the [`proxy_ignore_headers`](</docs/edge-logic/supported-directives.md#proxy_ignore_headers>) directive. For example:
```nginx
proxy_ignore_headers Set-Cookie;
```
In this case, the servers will behave as if the `Set-Cookie` header does not exist.
* [`proxy_cache_valid`](</docs/edge-logic/supported-directives.md#proxy_cache_valid>) can be used to set a cache time if the three special header fields are not present or ignored. You can use it multiple times to set different cache times for different status codes. For example:
```nginx
location / { # the default location
    proxy_cache_valid 5m; # cache 200, 301 and 302 for 5 minutes
    proxy_cache_valid 404 2m; # cache 404 for 2 minutes
}
location /no-cache {
    proxy_cache_valid 200 0; # cache 200 response, but revalidate every time.
}
```
* While [`proxy_ignore_headers`](</docs/edge-logic/supported-directives.md#proxy_ignore_headers>) ignores the specified header fields altogether, [`proxy_ignore_cache_control`](</docs/edge-logic/supported-directives.md#proxy_ignore_cache_control>) can be used to ignore specific directives in the `Cache-Control` header field. For example:
```nginx
proxy_ignore_cache_control no-cache no-store;
```
* The CDN Pro proprietary directive [`proxy_cache_min_age`](</docs/edge-logic/supported-directives.md#proxy_cache_min_age>) can be used to override the `max-age` in the `Cache-Control` header field to enforce a minimum cache time.
* If you don't want a request to be served from the cache, you can use the [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) directive. [`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) can be used to prevent a response from being cached.

Note: Requests that meet any of the following conditions will not be cached, irrespective of edgeLogic and instructions from origin:

* Requests that include the "Expect" request header, except when the request method is GET.
* POST requests that include "Transfer-Encoding: chunked" header.
* Responses with "Content-Type: multipart/x-mixed-replace" header.

Since you are interested in the caching behavior of CDN Pro, you may want to also learn how to [customized the cache key](#how-to-include-query-parameters-andor-request-headers-in-the-cache-key) and how [the `Vary` header is treated](#the-support-and-non-support-of-vary).

### How do I include query parameters, request headers and body in the cache key?

By default, the CDN Pro cache key includes only the hostname and URI without the query string. It also includes a special variable that is accessible in the Edge Logic: `$cache_misc`. Therefore, if you want to add anything to the cache key, add it to this variable. For example, to keep the entire query string in the cache key:
```nginx
set $cache_misc "?$sorted_querystring_args";
```
If you want to include only some of the query parameters, the following example shows how to add parameters "abc" and "def" to the cache key:
```nginx
set $cache_misc "?abc=$arg_abc&def=$arg_def";
```
Similarly, the following example shows how to include some request headers in cache key:
```nginx
set $cache_misc "ae=$http_accept_encoding";
set $cache_misc $cache_misc."hdr1=$http_header1&hdr2=$http_header2";
```
If you want to keep any previously assigned value, you can append to this variable:
```nginx
set $cache_misc "${cache_misc}hdr1=$http_header1&hdr2=$http_header2";
```
The POST method is often used today to query information with complex or long parameters. A prominent example is the [GraphQL](https://en.wikipedia.org/wiki/GraphQL). In these cases, the POST requests are idempotent and safe as the GET requests, and the responses are well cacheable. The only question is how to include the parameters in the request body to the cache key.
CDN Pro created the proprietary directive [`proxy_request_body_in_cache_key`](/docs/edge-logic/supported-directives.md#proxy_request_body_in_cache_key) for this exact purpose. When this feature is turned on, our server calculates an MD5 hash from the request body and appends it to the cache key.
Due to performance considerations, this only happens when the body size is less than 4kB. Otherwise the cache key is not appended and the variable `$ignored_body_in_cache_key` is set to 1 to indicate this fact. You can use this variable with [`proxy_cache_bypass`](/docs/edge-logic/supported-directives.md#proxy_cache_bypass) to avoid serving incorrect cached content.
If you really need to include a larger request body in the cache key, you are advised to calculate a hash of the request body in the client and pass it through the request header. You can then use the method introduced earlier to include it in the cache key via `$cache_misc`.

Last but not least, don't forget to use the [`proxy_cache_methods`](/docs/edge-logic/supported-directives.md#proxy_cache_methods) directive to enable the caching of POST requests.
Here is the code snippet to add the POST request's body to the cache key:
```nginx
location /api/v1/ {
  origin_pass my-api-origin;
  proxy_cache_methods GET HEAD POST; # allow caching of POST requests
  proxy_cache_valid 1m; # 200, 301, and 302 responses will be cached for 1 minute
  proxy_cache_bypass $ignored_body_in_cache_key;
  proxy_no_cache $ignored_body_in_cache_key;
  if ($request_method = POST) {
    proxy_request_body_in_cache_key on; # if the body is < 4kB, calculate the hash and add to the cache key
  }
}
```

### HTTP Header Manipulation

If you need to add, modify, or delete some header fields in the request to the origin, use the [`origin_set_header`](</docs/edge-logic/supported-directives.md#origin_set_header>) directive. For example:
```nginx
origin_set_header CDN-Name {{title}};
```
In particular, this is the code to send the client's IP address to the origin server:
```nginx
origin_set_header Client-IP $client_real_ip;
```
In order to consolidate the responses from the origin to improve the cache hit ratio, we created a dedicated directive [`sanitize_accept_encoding`](</docs/edge-logic/supported-directives.md#sanitize_accept_encoding>) to modify the `accept-encoding` request header received from the client.

If you need to add, modify, or delete some header fields in the response to clients, use the [`add_header`](</docs/edge-logic/supported-directives.md#add_header>) directive. For example:
```nginx
add_header CDN-Name {{title}};
```
We also created a proprietary directive [`origin_header_modify`](</docs/edge-logic/supported-directives.md#origin_header_modify>) to manipulate the response header from the origin prior to processing the response. This can be very useful if you need to override a header value (such as cache time) from the origin that may affect the CDN servers' behavior.


### The support (and non-support) of `Vary`

By default, CDN Pro servers remove any `Vary` header in the response from origin servers. Therefore, every URL will have no more than one cached version. If you want to cache different versions based on a request header or cookie values, put them explicitly into the cache key by setting the `$cache_misc` variable mentioned above. For example:
```nginx
set $cache_misc "ae=$http_accept_encoding";
```
If you want to send a `Vary` header to the clients to make sure they cache different variations properly, use the [`add_header`](</docs/edge-logic/supported-directives.md#add_header>) directive. If you have to pass the `Vary` header from the origin to the client, use the following configuration to "undo" the default removal of the header:
```nginx
# preserve the Vary header from origin
origin_header_modify Vary "" policy=preserve;
# ignore the Vary header, just pass it to the client
proxy_ignore_headers Vary; 
```
In this case, the servers cache the content as if the `Vary` header does not exist. Without `proxy_ignore_headers Vary`, the preserved `Vary` header would prevent the response from being cached because [`proxy_cache_vary off`](</docs/edge-logic/supported-directives.md#proxy_cache_vary>) is configured by default. If it is absolutely important for the CDN Pro servers to cache multiple versions based on the `Vary` header, contact {{title}} customer support to obtain permission to set `proxy_cache_vary on`.

### How to follow redirections from origin?

When the origin responds with a 30x redirect, you may want the CDN servers to chase it until the redirection stops. Passing the redirection to the client takes more time to get the final content. If you want to turn on this feature, use the directive [`origin_follow_redirect`](</docs/edge-logic/supported-directives.md#origin_follow_redirect>) in the location where it is needed.

### China Delivery with and without ICP Beian

The Chinese Ministry of Industry and Information Technology (MIIT) requires every domain served from a server in Mainland China to have a record in its system. This is called [ICP Beian (备案)](https://beian.miit.gov.cn/). For certain domains, a [Security Beian](https://www.beian.gov.cn/) is also required. As a CDN provider, {{title}} cannot use our servers in China to serve domains without ICP Beian. Any violation may result in our China-based servers being blocked. Customers are responsible for filing and obtaining Beian for any domain that needs local delivery in China. We can provide consulting services to assist with this process. For domains without Beian, {{title}} can use its dedicated line Near China solution or servers located in close proximity to Mainland China (for example, Hong Kong, Korea, and Japan) to deliver content to clients in Mainland China; however, the performance will not be as good as local delivery.

#### China Delivery with ICP Beian
If you have one or more domains with ICP Beian and want them to be accelerated in China, contact customer service to ensure we have all the required information on file about your business. After confirming that we have the necessary information, your China Delivery service will be enabled. You can then perform the following steps to enable local delivery of domains in Mainland China: 

1. Set "hasBeian" to true in the [property](</docs/portal/edge-configurations/creating-property.md>) of this domain. This ensures the configuration will be deployed to servers in China and that those servers will handle client requests to this domain. Otherwise, they will return status code 451. Note that this setting applies to the entire property, so if any hostname in it does not have Beian, you will not be allowed to deploy this property. In this case, you will have to create another property to hold all the domains without Beian. In the meantime, CDN Pro periodically checks the validity of ICP Beian for all domains. For a domain whose Beian becomes invalid, we will automatically turn off the "hasBeian" switch for the containing property. The owner will be notified. If the DNS setting is not updated in time to avoid using servers in China, some visitors may receive 451 error code.

2. Create an [Edge Hostname](</docs/portal/traffic-management/creating-edge-hostname.md>) and specify "ChinaStandard" and "ChinaPremium" server groups to serve the visitors from China. On your DNS server, use this edge hostname as CNAME for the domain to be accelerated. GSLB will then direct the traffic to our servers in Mainland China. Make sure the property with "hasBeian=true" has been deployed successfully before updating the DNS.

#### China Delivery without ICP Beian using the Near China Solution
If your CDN domains do not have ICP Beian, but you want them to be accelerated in Mainland China, CDN Pro offers a Near China solution. This solution uses the CDN Pro special server group nearChina, with a robust network of servers located in Hong Kong, to effectively deliver your content with low latency and high performance for your websites and applications in China.

CDN Pro's Near China solution is a value-added service. The traffic per GB cost for the server group will be more expensive than the regular server groups. Please contact the {{title}} Support Team for details on the nearChina server group's price and to enable the service.

### How to support WebSocket?

Use the directive [`enable_websocket`](</docs/edge-logic/supported-directives.md#enable_websocket>) in the location where the WebSocket protocol is needed. Make sure the client uses HTTP/1.1 (not the other HTTP protocol versions) to connect. This directive also sets the read and send timeouts to 21s by default. They can be changed using the [`origin_read_timeout`](</docs/edge-logic/supported-directives.md#origin_read_timeout>) or [`origin_send_timeout`](</docs/edge-logic/supported-directives.md#origin_send_timeout>) directives.

### What about dynamic content?

Dynamic contents are usually generated on-the-fly for each request and are different for different visitors. Some examples are:
* Realtime stock prices, sports game scores
* Search results based on keywords entered by the visitor
* API calls that have lots of query parameters

If you only have the origin server in a central data center or in the cloud, the performance can be quite poor if the visitor is far away from or does not have a good connection to the data center. How can we accelerate those contents through CDN Pro? Here are a few things you can do:
* **Simply using CDN Pro can shave off a few seconds**

If you use CDN Pro, your clients will connect to the PoP that is closest to them. The round trip time (RTT) can be a few hundred milliseconds faster than directly connecting to the origin server. The TCP and TLS handshakes usually take 3-4 RTTs which can be a second faster through the CDN. By default, the CDN Pro servers maintain persistent connections to the origin. You can increase the [keep-alive timeout](/docs/portal/edge-configurations/managing-origins) to up to 10 minutes in the origin configurations. In the meantime, if you know the content is not cacheable at all, use [`proxy_no_cache 1;`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) and [`proxy_cache_bypass 1;`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) to completely skip caching to minimize latency.
* **Cache the response!**

In many cases, "dynamic" does not mean the content is not cacheable. For example, end users will typically not notice if you cache the score of a basketball game for 1 second. If you have 10 requests per second to fetch the score, you can save 90% of the bandwidth and processing power. If the response depends on some query parameter, request header value or the request body, make sure all those variables are [included in the cache key](#how-do-i-include-query-parameters-request-headers-and-body-in-the-cache-key).
* **Enable Fast Route to origin**

CDN Pro has a directive [`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>) that enables a "Fast Route" to access the origin. This powerful feature is based on our award-winning [High-speed Data Transmission](https://www.{{siteDomain}}/high-speed-data-transmission/) (HDT) technology. It ensures that our servers always have the best possible channel to reach your origin, even under challenging situations. This directive can also be used for highly cacheable contents if the origin is hard to reach from certain networks or when the cache-miss performance is critical to you. However, the traffic served through the "Fast Route" may be charged a higher price due to the extra cost associated with it. To try out this feature, contact the CDN Pro support team.

### Apex domains and anycast

Our [CNAME-based traffic management system](</docs/portal/traffic-management/overview>) is designed to make routing decisions dynamically, factoring in performance, costs, compliance requirements, and custom rules. Simply [create an edge hostname](</docs/portal/traffic-management/creating-edge-hostname>) and add a CNAME record to your DNS to point your domain at the edge hostname, then let CDN Pro do the magic. Leverage the powerful capabilities of this system to deliver optimal results. 

However, if your domain to be accelerated is an apex domain, i.e. a root domain (e.g. example.com) that does not contain a subdomain, adding a CNAME record for the apex domain would become an issue, due to restrictions in the DNS specification (Refer to section 3.6.2 of [RFC1034](https://www.ietf.org/rfc/rfc1034.txt)). This is where our anycast addressing feature comes into play. It provides anycast IPv4 addresses which you can enter into your DNS as A records to point your apex domain to some PoPs of CDN Pro. This feature is currently available on demand. Please contact our support team if you need to use it.

Note that each anycast IP address is broadcast only in a small subset of our global PoPs, and the list of PoPs where anycast is available is subject to change without prior notice. Therefore, the performance and capacity behind an anycast IP address are not comparable to that of an edge hostname. We recommend using the CNAME-based edge hostnames to route traffic as much as possible. Anycast should be used only for apex domains and the property configuration should be a simple redirection to a non-apex domain, such as the www subdomain. Here is how to do this on the portal:
<p align=center><img src="/docs/edge-logic/redirect-apex-domain.png" alt="redirect apex domain" width="700"></p>

### How are CDN Pro API calls rate limited?

To prevent CDN Pro's API servers from being overwhelmed, the CDN Pro API enforces a limit on the number
of requests that customers can send per minute. If a customer sends too many requests, API rate limiting
throttles the customer by returning error messages with HTTP status code 429.

* **Token Bucket Algorithm**

CDN Pro uses the [token bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket) to enforce rate limiting.
The token bucket algorithm is based on an analogy of a fixed capacity bucket into which tokens are added at a
fixed rate. Before allowing an API request to proceed, the bucket is inspected to see whether it contains
enough tokens to cover the cost of that request. If it does, the corresponding number of tokens is removed
from the bucket and the API request is allowed to proceed. If there is not a sufficient number of tokens
available, the request is blocked, with an error that says the quota has been exceeded during the 1-minute
sliding window.

The capacity of the bucket and the filling rate are controlled by the `configs.apiMaxBurst` and `configs.apiRate` fields
in the [customer management API](</apidocs#operation/patch-ngadmin-customers-id>). For example,
if the customer has `configs.apiMaxBurst = 45` and `configs.apiRate = 120`, tokens are added to the bucket at a
fixed rate of 120 tokens per minute, and the total capacity of the bucket is 45. The bucket is refilled in a
"greedy" manner. CDN Pro tries to add tokens to the bucket as soon as possible. For example, refilling at
"120 tokens per minute" adds 1 token every 500 milliseconds. In other words, the refill does not wait a full
minute to regenerate a bunch of 120 tokens.

* **Endpoint Token Weights**

Not all API calls are equal in terms of server resource consumption. To reflect this, each API endpoint is
assigned a token weight that determines how many tokens are deducted from the bucket per call. This means the effective number of calls you can make within your rate limit depends on the mix of endpoints you use.

Most API endpoints are assigned the default token weight: 1 and thus consume 1 token per call. However, the following report endpoints are assigned higher weights and consume more tokens per call due to their significantly higher server resource usage:

| Endpoint | Token weight |
|---|---|
| POST /cdn/report/bandwidthSummary | 2 |
| POST /cdn/report/edgeStatusSummary | 2 |
| POST /cdn/report/originStatusSummary | 2 |

> **Note:** The weights assigned are subject to change.

* **Indicator and Error Handling**

After the token gets consumed, an `x-rate-limit-remaining: X` header is added to the API call’s HTTP response,
indicating the number of tokens remaining in the bucket. This header represents the remaining quota of API requests
a customer can make at this time. Failed or malformed requests consume tokens from the bucket as well,
according to the weight of the endpoint called.
If there is not a sufficient number of tokens in the bucket, the API gateway returns an HTTP 429 error with
response header `x-rate-limit-retry-after-seconds: Y` to tell the client to retry after Y seconds.

* **Best Practices for Avoiding Rate Limiting Errors**

1. Check the API request history. [“GET /ngadmin/apicalls”](</apidocs#operation/get-ngadmin-apicalls>)
shows the API calls you have made.  (The customer admin API credential is required to call this API.)
Carefully check the records for potential abuses.

2. Reduce the number of requests by using APIs that are more suitable for the scenario or by combining similar
requests into one. For example, if you want to monitor the traffic volume of a list of domains, an ineffective approach is:

```
  for domain in domain_list:
      call GET /cdn/report/vol 
         {filters: {hostnames: [$domain]}}
```

   Instead, use the following recommended approach:

```
  POST /cdn/report/volSummary 
       {filters: {hostnames: [$domain_list]}, groupBy: [hostnames]}
```

   Another example is purging multiple files in one request instead of making an API call for each purge URL.
   If there are thousands of purge URLs that follow a certain pattern, use directory or regex purge by specifying
   the `dirUrls` or `regexPatterns` fields when [creating a purge request](</apidocs#operation/createPurge>). The number of requests should not scale as you acquire more domains, properties, and other resources.

3. If you call the API through scripts, it should be resilient to intermittent or non-specific errors. The script
should honor the `x-rate-limit-retry-after-seconds` header and retry the request after a delay. Consider including a
process in your code that regulates the rate of your requests so that they are distributed evenly over time. 

4. If a problem persists, contact our [technical support team](mailto:support@{{siteDomain}}).
If there is a legitimate need to increase the rate limit or burst ceiling, the technical support team will evaluate your requirements and raise the threshold.

* **Notes**

1. Rate limiting applies at the customer level. All API accounts under the same customer share the same token bucket. Excessive use of one account exhausts the customer’s quota. The rate limits of a reseller's children are independent of each other. In addition, the children’s API calls will not use the parent’s quota.

2. Because the CDN Pro portal calls the APIs, operations in the portal UI also consume the API rate limit tokens. 

3. Unauthorized API calls such as signups and login attempts consume tokens from the bucket corresponding to the client’s IP address. This bucket has a default capacity of 30 tokens and a refill rate of 60 per minute.

4. Modifications to the `configs.apiRate` and `configs.apiMaxBurst` using the [customer management API](</apidocs#operation/patch-ngadmin-customers-id>) do not take effect immediately. It typically takes 10-15 minutes to change the refill rate and refill the bucket.

### How to classify traffic in reports based on custom rules?

When utilizing the CDN Pro network to deliver a broad range of content at the edge, you probably would like to be able to identify, in one way or another, the traffic served by CDN Pro. For instance, when there are multiple domains accelerated, you might want to understand the traffic distribution across these domains. And, for the various segments of content hosted under a specific domain, you may be interested in a breakdown of traffic across different segments.

Our report APIs enable you to easily gain insights into the traffic served by CDN Pro. The powerful `filters` and `groupBy` request parameters supported by many of the report APIs can be leveraged to tailor the reports to your specific needs. The `filters` parameter allows you to apply specific conditions to filter the report data, while the `groupBy` parameter allows you to segment the data. For example, if you want a breakdown of traffic by domain, you can obtain it by specifying "hostnames" or "propertyHostnames" in the 2 parameters. If you want to get reports for specific properties, you can specify property IDs using `filters.propertyIds`. If the need is to look at the amounts of traffic per server groups (for billing purpose for example), simply specify "serverGroups" in the parameters when calling the report APIs.

In general, the parameters along with the options mentioned above can meet most requirements. However, if you would like to take a closer look at the traffic, or if you want to tailor the reports in your own way, consider using the **content code** feature. Basically, this feature allows you to assign your own codes to tag content. Then, when CDN Pro cache servers process requests pertinent to a specific piece of content, the servers will map the traffic to the code assigned to that content. This enables queries of report data based on such content codes. 

#### Assign codes to content

CDN Pro allows you to assign codes to content by introducing a built-in variable called `$content_code`. When you configure a property, you can assign codes to content by assigning a value to this variable in the **edgeLogic**. The value assignment can be done by using the [`set`](</docs/edge-logic/supported-directives.md#set>) or [`proxy_set`](</docs/edge-logic/supported-directives.md#proxy_set>) directive.

You can assign codes on a per property basis. This is useful if you have properties belonging to different groups, and you want to get reports based on the groups. The following is an example where properties A and B belong to group1 and property C belongs to group2.

```nginx
# edgeLogic for property A
set $content_code "group1";
```
```nginx
# edgeLogic for property B
set $content_code "group1";
```
```nginx
# edgeLogic for property C
set $content_code "group2";
```

The assignment of codes can also be applied to segments of content that are hosted under a specific property. In this case, assign codes to the variable `$content_code` based on conditions. The following shows an example in which you assign "abc" to content served under the /abc directory and "xyz" to content served under /xyz.

```nginx
# edgeLogic
if ($uri ~ ^/abc(/|$)) {
    set $content_code "abc";
}
elseif ($uri ~ ^/xyz(/|$)) {
    set $content_code "xyz";
}
```

> While we encourage you to make the most out of this **content code** feature to conveniently tag your content and then identify traffic, there remains the potential for abuse. Therefore, a restriction has been imposed: the value assigned to the $content_code variable must be a literal string. The value cannot be another variable. Using the [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>) directive to set a value for this variable is not allowed, either.

#### Use content codes for multiple purposes

* **Reporting**

The [GET layer 7 traffic volume](</apidocs#operation/post-cdn-report-volL7>) and [GET layer 7 traffic bandwidth](</apidocs#operation/post-cdn-report-bandwidthL7>) report APIs accept "contentCodes" in the `filters` parameter in the request body. The [GET summary of layer 7 traffic volume](</apidocs#operation/getVolL7Summary>) and [GET summary of layer 7 traffic bandwidth](</apidocs#operation/post-cdn-report-bandwidthL7Summary>) report APIs accept "contentCodes" in the `filters` and `groupBy` parameters in the request body. 

You can use these report APIs to get reports based on content codes. For instance, if you need a time series report of traffic volume for the content which is identified by the codes "abc" and "xyz", make a request to the "GET layer 7 traffic volume" API with `{"filters":{"contentCodes":["abc","xyz"]}}` in the request body. If you want a summary report of traffic volume for the same content,  make a request to the "GET summary of layer 7 traffic volume" API with `{"filters":{"contentCodes":["abc","xyz"]},"groupBy":["contentCodes"]}` in the request body.

> As the names indicate, the APIs return layer 7 traffic only. The data returned does not include TCP, IP, and MAC overheads.

* **Realtime logging**

The `$content_code` variable is also available to the [Real-Time Log](</docs/portal/edge-configurations/creating-property#real-time-log>) feature. Include this variable in your realtime log format to have access logs carrying this field streamed to your designated endpoint.
