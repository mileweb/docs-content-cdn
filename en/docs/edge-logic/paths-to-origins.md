## Paths to the Origins

CDN Pro is designed to deliver both static, highly cacheable objects and dynamic, private messages.
We have implemented many features to meet the needs of all sorts of traffic.
This article gives you an introduction and how to configure them to achieve your business logic.

### Hirechical Cache Structure for Static Content

Historically, the acceleration of a CDN is achieved through caching the static content close to the end users.
Caching also helps offloading the pressure on the origin servers. For this kind of content, we want to serve as much of them
from the cache without fetching from the origin. CDN Pro has implemented an edge-parent structure such that when a static object is
not available on an edge server, it will first look it up on a parent server's cache.
If it is a hit, cache it on the edge and respond to the end user.
The origin will be accessed only when the parent is also missing the object.
Based on geography and ISP, we divide our global PoPs into a few "parent zones" and each contains a group of parent servers.
In case of a cache miss at the edge, a parent within the zone is chosen based on the consistent hash of the object's cache key.
This ensures in that in the same zone, the same object will only be fetched once from the origin.
If it is very important to keep the origin traffic at the minimum possible level, you can use our "shield" feature to essentially
create a mirror of your origin such that each object will only be accessed once.

### Direct Access for Dynamic Content

For dynamic content that are not cacheable, we need to send/fetch as quickly as possible from the origin.
A direct connection from the edge to the origin usually gives the smallest latency.
The extra processing time on an intermediate server in general kills any possible routing advantage.


### Origin Fast Route

