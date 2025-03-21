## Paths to the Origin

CDN Pro is designed to deliver both static, highly cacheable files and dynamic, private objects.
Different kinds of content have different requirements when their origins need to be accessed.
This article is an introduction of all the related features and how to configure them to achieve the best result.

### Hierarchical Cache Structure for Static Content

Historically, the acceleration by a CDN is achieved through caching the static content close to the end users.
Caching can also greatly offload the pressure on the origin servers. For this kind of content, we want to serve as much of them
as possible from the cache without fetching from the origin.
CDN Pro has implemented an edge-parent structure in which a static object not
available on an edge server will be first looked up in the cache of a parent server.
If there is a hit, cache the object on the edge, and respond to the end user.
The origin will be accessed only when the parent is also missing the object.
Based on geography and ISP, our global PoPs are organized into a few "cache zones", with each zone having its own group of designated parent servers.
In case of a cache miss at the edge, a parent within the zone is chosen based on the consistent hash of the object's cache key.
As a result, each object will only be fetched once from the origin by each cache zone.
To enable the parent cache for an origin, you need to configure its "directConnection" field to "noDirect" in the property JSON. Here is how to do this on the portal:
<p align=center><img src="/docs/edge-logic/origin-no-direct.png" alt="always use a parent" width="400"></p>
If it is very important to keep the origin traffic at the minimum possible level, you can enable the "origin shield". This advanced feature essentially
creates a mirror of the origin such that each object will only be accessed once.
A shield is also useful when the origin only allows a very short IP whitelist for access control.
In general, you want to pick a shield PoP that is close to your origin for performance:
<p align=center><img src="/docs/edge-logic/origin-shield-selection.png" alt="select a shield for origin" width="300"></p>
If you require this feature, please contact our support team.

### Direct Access for Dynamic Content

For dynamic content that are not cacheable, such as API calls or interactive data of an app, we need to send/fetch as quickly as possible to/from the origin.
A direct connection from the edge to the origin almost always results in the smallest latency.
An intermediate server may provide some routing advantage in some cases, but the extra processing time usually kills it.
So if you know an origin is used for dynamic content, you should configure its "directConnection" field to "alwaysDirect" for best performance:
<p align=center><img src="/docs/edge-logic/origin-always-direct.png" alt="always go directly to origin" width="400"></p>

Please note that the setting of "directConnection" is respected with best effort only. In extreme cases when none of the parent servers is available, edge servers will try the origin directly, even if the setting is "noDirect". Likewise, when an origin is not accessible directly, edge servers might retry a parent server, even if the setting is "alwaysDirect". The directive [`upstream_origin_only`](/docs/edge-logic/supported-directives#upstream_origin_only) can be used in the edge logic to strictly avoid access to any parent server.

### Origin with Mixed Content

If you have an origin that serves both static and dynamic content, your best choice is to configure its "directConnection" to "auto".
In this mode, the edge servers will dynamically decide if a parent needs to be tried based on the cacheability of the request.
You will need to specify the rules in the edge logic for the server to determine if a request is cacheable or not.
This is done through the [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) directive.
For a property with mixed content, we highly recommend that you use this directive to specify the cacheability of each request
based on the design of your business logic. This is very important to achieve the best possible performance.
One simple way is to organize the content under different directories:
```nginx
location /dynamic {
  proxy_cache_bypass 1; # disable caching for dynamic content
  proxy_no_cache 1;
  origin_pass my_mixed_origin;
}

location / { # caching is enabled by default for all other directories
  origin_pass my_mixed_origin;
}
```

### Fast Route to Origin

There is still one remaining issue for both dynamic and static content: What if the connectivity between the CDN Pro server and the origin is not stable?
When internet congestions and outages happen, we want to minimize their impact on our business. Here is where the "Fast Route to Origin"
feature can help greatly. When you enable it in the edge logic with the [`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>) directive, the data to and from the origin will be 
accelerated by our high-speed data transmission (HDT) platform. This service features our proprietary protocol based on UDP and smart routing technology to ensure stable layer-4 performance regardless of any fluctuation in the public internet.

Please contact our customer support if you need to try this service. Due to the higher cost of HDT, the traffic transmitted through this channel is charged separately from the edge delivery traffic.

### Advanced Features for Performance
#### The $server_level variable
This variable is available in the edge logic and indicates if you are on an edge server (value=1) or a parent server (value=2).
The main use of this variable is to allow you to skip complicated access control logic on the parent servers to save time and cost:
```nginx
if ($server_level = 2) {
  break;  # skip the complicated ACL algorithm below
}
# the complicated ACL algorithm:
eval_func $var RSA_VERIFY ...
...
if ($result = 0) {
  return 403 "You failed the ACL!\n";
}
```
#### Directives to Reduce Requests to Origin
* You may want to read about these directives on serving recently expired content:
[`proxy_cache_use_stale`](</docs/edge-logic/supported-directives.md#proxy_cache_use_stale>)
[`proxy_cache_background_update`](</docs/edge-logic/supported-directives.md#proxy_cache_background_update>)
[`proxy_cache_max_stale`](</docs/edge-logic/supported-directives.md#proxy_cache_max_stale>)
* This directive holds off requests fetching the same object from origin if one is already on the way:
[`proxy_cache_lock_timeout`](</docs/edge-logic/supported-directives.md#proxy_cache_lock_timeout>)

#### Origin Configurations
* The "peerSelectionAlgorithm" field in the property JSON can be used to optimize the choice of origin servers. Use "round_robin" to balance among all the server instances,
"sorted_list" to get the best connectivity, and "consistent_hash" to maximize caching on the origin.
* The "peerFailureTimeout" field can be used to specify the detailed retry and backoff policy if an IP address of the origin is not accessible. These fields are configurable on the portal:
<p align=center><img src="/docs/edge-logic/origin-peer-failure-timeout.png" alt="limit retry of failed origin peer" width="300"></p>

The definition of "not accessible" or "unsuccessful attempt" is determined by the [`proxy_next_upstream`](</docs/edge-logic/supported-directives#proxy_next_upstream>) directive, which by itself can be used to improve the fault-tolerance of the origin.

* The "maxConnections" field sets the maximum number of simultaneous connections that can be made to the origin to avoid overloading.
