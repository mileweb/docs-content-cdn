## How does CDN Pro help with dynamic content?

Dynamic contents are usually generated on-the-fly for each request and are different for different visitors. Some examples are:
* Realtime stock prices, sports game scores
* Search results based on keywords entered by the visitor
* API calls that have lots of query parameters

If you only have the origin server in a central data center or in the cloud, the performance can be quite poor if the visitor is far away from or does not have a good connection to the data center. How can we accelerate those contents through CDN Pro? Here are a few things you can do:
* **Simply using CDN Pro can shave off a few seconds**

If you use CDN Pro, your clients will connect to the PoP that is closest to them. The round trip time (RTT) can be a few hundred milliseconds faster than directly connecting to the origin server. The TCP and TLS handshakes usually take 3-4 RTTs which can be a second faster through the CDN. By default, the CDN Pro servers maintain persistent connections to the origin. You can increase the [keep-alive timeout](/docs/portal/edge-configurations/managing-origins) to up to 10 minutes in the origin configurations. In the meantime, if you know the content is not cacheable at all, use [`proxy_no_cache 1;`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) and [`proxy_cache_bypass 1;`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) to completely skip caching to minimize latency.
* **Cache the response!**

In many cases, "dynamic" does not mean the content is not cacheable. For example, end users will not experiance the difference if you cache the score of a basketball game for 1 second. If you have 10 requests per second to fetch the score, you can save 90% of the bandwidth and processing power. If the response depends on some query parameter or request header values, make sure those variables are [included in the cache key](#how-do-you-include-query-parameters-andor-request-headers-in-the-cache-key).
* **Enable Fast Route to origin**

CDN Pro has a directive [`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>) that enables a "Fast Route" to access the origin. This powerful feature is based on our award-winning [High-speed Data Transmission](https://www.cdnetworks.com/enterprise-applications/high-speed-data-transmission/) (HDT) technology. It ensures that our servers always have the best possible channel to reach your origin, even under challenging situations. This directive can also be used for highly cacheable contents if the origin is hard to reach from certain networks or when the cache-miss performance is critical to you. However, the traffic served through the ""Fast Route" may be charged a higher price due to the extra cost associated with it. To try out this feature, contact the CDN Pro support team.
