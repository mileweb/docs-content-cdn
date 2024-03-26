## Paths to the Origins

CDN Pro is designed to deliver both static, highly cacheable objects and dynamic, private messages.
Different kinds of traffic have different requirements when they need to access the origin.
This article gives you an introduction of all the related features and how to configure them to achieve the best results.

### Hirechical Cache Structure for Static Content

Historically, the acceleration of a CDN is achieved through caching the static content close to the end users.
Caching also helps offloading the pressure on the origin servers. For this kind of content, we want to serve as much of them
off the cache without fetching from the origin.
CDN Pro has implemented an edge-parent structure such that when a static object is
not available on an edge server, it will first look it up on a parent server's cache.
If it is a hit, cache it on the edge and respond to the end user.
The origin will be accessed only when the parent is also missing the object.
Based on geography and ISP, we divide our global PoPs into a few "parent zones".
Each zone has a group of parent servers to cover the edge servers in that zone.
In case of a cache miss at the edge, a parent within the zone is chosen based on the consistent hash of the object's cache key.
This ensures in that in the same zone, the same object will only be fetched once from the origin.
To make sure the parent cache is used for an origin, you need to configure the "directConnect" setting to "No Direct".
Here is how to do this on the portal:
[screenshot]
If it is very important to keep the origin traffic at the minimum possible level, you can use our "shield" feature to essentially
create a mirror of your origin such that each object will only be accessed once.
In general, you want to pick a shield PoP that is close to your origin:
[screenshot]

### Direct Access for Dynamic Content

For dynamic content that are not cacheable, such an API or interactive data of an app, we need to send/fetch as quickly as possible to/from the origin.
A direct connection from the edge to the origin usually gives the smallest latency.
The extra processing time on an intermediate server in general kills any possible routing advantage.
So if you know an origin is used for dynamic content, you can configure the "directConnect" setting to "Always Direct" for best performance:
[screenshot]

### Origin with Mixed Content

If you have an origin that servers both static and dynamic content, you will want to configure "directConnect" to "Auto".
In this mode, the edge servers will dynamically decide if a parent needs to be tried based on the cacheability of the request.
However, it is very challenging to fully automatically decide if a request is cacheable or not.
The servers expect some hints from the user to help them, which is the parameters of the [proxy_cache_bypass]() directive.
For a property with mixed content, we highly recommend you to use this directive to specify the cacheablity of each request 
based on the design of your business application. This is very important to achieve the best possible performance.

### Fast Route to Origin



