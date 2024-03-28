## Paths to the Origin

CDN Pro is designed to deliver both static, highly cacheable objects and dynamic, private messages.
Different kinds of traffic have different requirements when they need to access the origin.
This article gives you an introduction of all the related features and how to configure them to achieve the best results.

### Hirechical Cache Structure for Static Content

Historically, the acceleration by a CDN is achieved through caching the static content close to the end users.
Caching can also greatly offload the pressure on the origin servers. For this kind of content, we want to serve as much of them
off the cache without fetching from the origin.
CDN Pro has implemented an edge-parent structure such that when a static object is
not available on an edge server, it will first look it up in the cache of a parent server.
If it is a hit, cache it on the edge and respond to the end user.
The origin will be accessed only when the parent is also missing the object.
Based on geography and ISP, we divide our global PoPs into a few "parent zones".
Each zone has a group of parent servers to support the edge servers in that zone.
In case of a cache miss at the edge, a parent within the zone is chosen based on the consistent hash of the object's cache key.
This ensures that each object will only be fetched once from the origin by each zone.
To enable the parent cache for an origin, you need to configure its "directConnect" setting to "No Direct".
Here is how to do this on the portal:
[screenshot]
If it is very important to keep the origin traffic at the minimum possible level, you can enable the "shield" which essentially
creates a mirror of the origin such that each object will only be accessed once. Shield is also useful when the origin has an IP
whitelist for access control and only allow a very short list.
In general, you want to pick a shield PoP that is close to your origin for performance:
[screenshot]

### Direct Access for Dynamic Content

For dynamic content that are not cacheable, such as API calls or interactive data of an app, we need to send/fetch as quickly as possible to/from the origin.
A direct connection from the edge to the origin almost always results in the smallest latency.
An intermediate server may provide some routing benefit in some cases but the extra processing time usually kills it.
So if you know an origin is used for dynamic content, you should configure its "directConnect" setting to "Always Direct" for best performance:
[screenshot]

### Origin with Mixed Content

If you have an origin that servers both static and dynamic content, your best choice is to configure its "directConnect" to "Auto".
In this mode, the edge servers will dynamically decide if a parent needs to be tried based on the cacheability of the request.
You will need to specify the rules in the edge logic for the server to determine if a request is cacheable or not.
This is done through the [proxy_cache_bypass]() directive.
For a property with mixed content, we highly recommend you to use this directive to specify the cacheablity of each request 
based on the design of your business application. This is very important to achieve the best possible performance.

### Fast Route to Origin

There is still one remaining issue for both dynamic and static content: What if there is network connectivity issue between the edge/parent server and the origin?
Although congestions and outages are always happening on the internet, we want to minimize the impact of them on our business. Here is where our "Fast Route to Origin"
feature can help. When you enable it in the edge logic with the [origin_fast_route]() directive, the data to and from the origin will be 
accelerated by our highspeed data transmission (HDT) platform. This platform features our proprietary protocol based on UDP and smart routing technology to ensure
a stable layer-4 performance regardless of any fluctuation in the public internet. The traffic transmitted through this channel is charged seperately from the edge delivery traffic.

### Advanced Features for Performance
#### The $server_level variable
This variable is available in the load balancer logic and it tells you if you are on an edge server (value=1) or a parent server (value=2).
The main usage of it is when you have a complicated access control algorithm, you may want to skip it on the parent servers to save time and cost:
```nginx
if ($server_level = 2) {
  break;  # skip the complicated ACL algorithm below
}
# the complicated ACL algorithm:
eval_func $var RSA_VERIFY ...
...
if ($result = 0) {
  return 403 "You are not allowed to access!\n";
}
```
#### Directives to Reduce Accesses to Origin
You may want to read about these directives on serving recently expired content to save latency:
[proxy_cache_use_stale]()
[proxy_cache_background_update]()
[proxy_cache_max_stale]()
This directive holds off requests fetching the same object from origin if one is already on the way:
[proxy_cache_lock_timeout]()

#### Origin Configurations
The "peerSelectionAlgorithm" field can be used to optimize the choice of origin servers. Use "round_robin" to balance all the server instances,
"sorted_list" to get the best connectivity and use "consistent_hash" to maximize cache on the origin.

The "peerFailureTimeout" field can be used to specify the detailed retry policy if an instance of the origin is not accessible.

The "maxConnections" field sets the maximum number of simutaneous connections that can be made to the origin. This can help the origin from being overloaded.
