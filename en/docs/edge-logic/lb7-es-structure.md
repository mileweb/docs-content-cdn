## The Layer 7 Load Balancer - Edge Server Structure

CDN Pro's edge network consists of hundreds of nodes around the world, each of which is a farm of physical servers. To most efficiently utilize these servers, we need our design to meet the following criteria:

1. The service load needs to be distributed as evenly as possible across all servers. The 
'load' includes network bandwidth, CPU power and disk usage.
2. For cacheable objects, avoid caching duplicated copies in the same farm.

We end up with the following logical structure in each edge node:
<p align=center src=“https://docs.google.com/drawings/d/1Q-UdhK7w5Yzkjg53NTlzYAzKOOBmW_Rou5IgdGvl7-s/edit”><img src="/docs/edge-logic/lb7-es-structure.png" alt="Node Logical Structure" width="600"></p>

Each request admitted by the router first goes through the layer 4 firewall and load balancer and reaches
a layer 7 load balancer (LB7). The LB7 terminates the TLS tunnel, performs some initial processing of the
HTTP request, then distribute it to an edge server (ES) for further processing. The distribution is
based on a consistent hash algorithm and the hash key involves the request URI and a [customizable](/docs/portal/edge-configurations/creating-property#advanced-settings)
variable to make sure the ES are evenly loaded. ES does most of the processing of the requests including
everything we put in the edge logic. It also launches requests to contact the origin, parent or 
external servers to obtain necessary data. Any cacheable objects are stored in the ES.

Based on this structure, we can see that some tasks will be more efficiently performed in
the LB7 than in the ES. If a request can be responded in
the LB7, the overhead to pass it to the ES can be saved. To achieve this goal, we allow the users to insert processing logic into the LB7 through the "loadBalancerLogic" field of
the property configuration. All the directives allowed in the load balancer logic are labeled
with <span class="badge">LB logic</span> on the [Supported Directives](supported-directives) page.
In particular, most access control directives and the directives in the rewrite module
can be used to enable efficient building of responses in the LB7.

In addition, since the client's connection and TLS tunnel are terminated in the LB7, some of the client's information is available only in the LB7. For example, if your processing logic depends on the [TLS cipher](built-in-variables#ssl_cipher) or the [server protocol](built-in-variables#server_protocol), it can be done only in the LB7.