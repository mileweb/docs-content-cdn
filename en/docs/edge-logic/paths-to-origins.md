## Paths to the Origins

CDN Pro is designed to deliver both static, highly cacheable objects and dynamic, private messages.
We have implemented many features to meet the needs of all sorts of traffic.
This article gives you an introduction and how to configure them to achieve your business logic.

### Hirechical Cache Structure

Historically, the acceleration of a CDN is achieved through caching the static content close to the end users.
Caching also helps offloading the pressure on the origin servers. For this kind of content, we want to serve as much of them
from the cache without fetching from the origin. CDN Pro has implemented an edge-parent structure such that when a static object is
not available on an edge server, it will first look it up on a parent server's cache.
If it is a hit, cache it on the edge and respond to the end user.
The origin will be access only when the parent is also missing the object.
We divide our global PoPs into a few "parent regions" based on geography and ISP and each contains a group parent servers.
In each region, the choice of parent is based on the consistent hash of the object's cache key.
This ensures in that in the same region, the same object will only be fetched once from the origin.
If it is very important to keep the origin traffic at the minimum possible level, you can use our "shield" feature to essentially
create a mirror of your origin such that each object will only be accessed once.
