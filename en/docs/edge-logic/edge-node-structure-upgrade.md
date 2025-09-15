## Upgrade of the Edge Node Structure

### The Goal of the Upgrade

A few years ago when we started the CDN Pro project, we came up with a 2-stage design of the [edge node structure](lb7-es-structure). The first stage is a layer 7 load balancer (LB7) that terminates the TLS connections, performs some initial processing and distributes requests based on caching strategies. The second stage is the edge server (ES) that fetches content from origins and caches the responses if needed. Here is a recap of how this LB7-ES structure works:

* We let users configure the acceleration of their domains on CDN Pro through the [property](/docs/portal/edge-configurations/creating-property) object. This object contains the loadBalancerLogic and edgeLogic fields along with some other fields. Logic to be executed by LB7 is in the loadBalancerLogic field while logic to be executed by ES is in the edgeLogic field.
* Right before the validation of a property, it will be converted into Nginx configurations. The scripts in the loadBalancerLogic and edgeLogic fields each become configurations of an Nginx **server** block.
* When a request arrives at a CDN Pro edge node, the LB7 performs some preliminary processing, based on configurations of loadBalancerLogic. The request is then passed to ES which further processes the request based on configurations of edgeLogic. 

This LB7-ES structure has achieved the intended design goals. However, it also introduced some noticeable “side effects”, in particular the following: 

* Although loadBalancerLogic is optional in a property, its existence means our users need to be aware of this LB7-ES structure. For example, you need to know if a [supported directive](supported-directives) or a [built-in variable](built-in-variables) is available in LB7, ES, or both. For advanced request processing, you may need to contemplate how to divide the logic into the two parts. If a piece of information available in LB7 only is also needed in ES, you must pass that information from LB7 to ES by using the [proxy_set_header](supported-directives#proxy_set_header) directive. Similarly, you may have to pass information in the other direction by using the [add_header](supported-directives#add_header)/[add_trailer](supported-directives#add_trailer) directives. Although things do work this way, having to know about the structure increases the steepness of the learning curve for users. Sometimes, it leads to misconfigurations and complaints. It’d be great if this structure was completely transparent to customers, and they could configure a property in just a single place.

* As illustrated in the edge node structure, an edge node consists of a group of LB7 servers and a group of edge servers. Under the hood, they are the same group of Nginx processes running on the same group of physical servers. While such a structure fully utilizes the power of Nginx as a load balancer, reverse proxy and storage server, it is not the most performance-optimal setup for the CDN use case. As CDN Pro continues to expand, the proxy_cache module of Nginx, which has served as the cache storage since inception, is now facing performance challenges. There is a pressing need to optimize the system to accommodate the ever increasing traffic loads.

### The Solution

The new design of the node structure is illustrated in the diagram below:

<p align=center><img src="/docs/edge-logic/edge-node-structure.png" alt="Upgrade of Edge Node Structure" width="600"></p>

As shown above, there is no longer an LB7 stage sitting in front of the ES stage. Instead, the ES accepts a request and handles everything at the HTTP level, including upstreaming to an intermediate cache or origin to fetch content and any modification to the request and/or response. Caching is outsourced to a dedicated storage service whose sole purpose is to write and read objects as fast as possible. 

This is actually the architecture we originally planned for CDN Pro. However, we could not find a distributed storage that met our requirements back in 2017. We decided to implement the LB7-ES structure to roll out the product without delay while developing our own storage product. After a few years of intensive coding and testing, we believe we are ready to move to the desired node structure. Our in-house load tests show that, compared to the previous structure using Nginx’s proxy_cache module, the new structure achieves substantially higher throughput and lower latency. Taking 50KB files as an example, the throughput increases by up to 300% for write operations and up to 50% for read operations, and the latency reduces by up to 80%!

### The Progress

In Q2 2024, we started upgrading the entire CDN Pro production environment to the new structure. The process is divided into the following three phases.


**Phase 1**: Create a converter to merge loadBalancerLogic and edgeLogic configurations into a single Nginx server block to be deployed to the nodes with the new structure. This conversion ensures that properties, regardless of whether they use loadBalancerLogic, will be compatible with both the existing and new structures. The conversion is transparent to users, and the CDN Pro servers (existing or new structure) behave exactly the same way in response to client requests, as if the servers have the same structure.

**Phase 2**: Deploy edge nodes with the new structure and gradually route production traffic to the new nodes. The new nodes are placed strategically to provide the same or better geographic coverage as the existing ones.

**Phase 3**: Decommission the LB7-ES structure.

As of December 2024, the process has concluded, and the traffic migration in phase 2 has been seamless and has caused zero impact on customers. The next step is to deprecate loadBalancerLogic.

### Your Help is Needed

While the above-mentioned process is completely transparent to our customers, we do need your kind help to proceed with the deprecation of loadBalancerLogic. We look forward to completing the deprecation in the near future. By the time the deprecation is done, any configurations containing loadBalancerLogic will be rejected when you create a new property or a new version of an existing property.  

In light of the above, please avoid using loadBalancerLogic in any new property configurations going forward. More importantly, if there are existing properties that contain loadBalancerLogic, we kindly request that you start moving the script in it over to edgeLogic. In most cases, you just need to copy the script from loadBalancerLogic and prepend it to the script of edgeLogic. However, there are indeed some nuances which deserve more attention. Below are guidelines to assist you with this process.

**Directives**

The following is a list of directives that are supported in loadBalancerLogic. Refer to the recommendations on how to merge loadBalancerLogic into edgeLogic.

| Directive | Recommendation |
|----------|----------|
| if/elseif/else | Simply copy the configuration and prepend to the existing code of edgeLogic. |
| set | Simply copy the configuration and prepend to the existing code of edgeLogic. |
| return | Simply copy the configuration and prepend to the existing code of edgeLogic. |
| rewrite | Simply copy the configuration and prepend to the existing code of edgeLogic. |
| eval_func | Simply copy the configuration and prepend to the existing code of edgeLogic. |
| access_log_sampling | Simply copy the configuration and prepend to the existing code of edgeLogic. |
| keepalive_timeout | Simply copy the configuration and prepend to the existing code of edgeLogic. |
| proxy_ignore_client_abort | Simply copy the configuration and prepend to the existing code of edgeLogic. |
| client_max_body_size | Merge the directive into edgeLogic. In case the directive is configured in both loadBalancerLogic and edgeLogic with different values, the smaller value takes precedence under the LB7-ES structure. In the merged configuration, make sure to deduplicate the directive and use the smaller value everywhere including **server** and **location** contexts. |
| proxy_request_buffering | Merge the directive into edgeLogic. In case the directive is configured in both loadBalancerLogic and edgeLogic, the loadBalancerLogic takes precedence under the LB7-ES structure. In the merged configuration, make sure to deduplicate the directive and use the setting from loadBalancerLogic everywhere including **server** and **location** contexts. |
| custom_log_field | Merge the directive into edgeLogic. In case the same log field is assigned in both loadBalancerLogic and edgeLogic, the loadBalancerLogic takes precedence under the LB7-ES structure. In the merged configuration, make sure to deduplicate log fields and use the setting from loadBalancerLogic everywhere including **server**, **location** and **if in location** (if any) contexts. |
| proxy_set_header | This directive is introduced to allow passing information from LB7 to ES. Such configuration can now be removed, as there is no LB7 anymore. Modify edgeLogic as necessary to access required information directly from within ES. |
| allow | Copy the configuration and prepend to the **server** context of edgeLogic.<br>If there are existing allow and/or deny directives configured in **locations**, the copied configuration should be prepended to those **location** contexts as well. |
| deny | Copy the configuration and prepend to the **server** context of edgeLogic.<br>If there are existing allow and/or deny directives configured in **locations**, the copied configuration should be prepended to those **location** contexts as well. |
| add_header | Copy the configuration and append to the **server** context of edgeLogic.<br>If the same header is also configured in **location** and **if in location** contexts of edgeLogic, the copied configuration should be appended to those **location** and **if in location** contexts as well. However, if the same header exists because the header is introduced to pass information from ES to LB7, the configuration should be modified to stop passing information around as there is no LB7 anymore. The header should be removed and the related configuration should be changed to access the required information from directly within ES. |

The directives if/elseif/else, set, return, rewrite and eval_func belong to the [rewrite](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html) module. They are executed imperatively in the early phase of request processing. Under LB7-ES structure, these directives configured in LB7 are always executed first before any other processing of configurations in edgeLogic. Prepending these directives to the **server** context of edgeLogic ensures that these directives in the merged configuration are still executed first under the new structure.

The directives access_log_sampling, keepalive_timeout and proxy_ignore_client_abort are available in loadBalancerLogic only under the LB7-ES structure, so there aren’t any existing properties where the directives are configured in both edgeLogic and loadBalancerLogic. Simply moving the directives to the **server** context of edgeLogic will work.

The directives client_max_body_size, proxy_request_buffering and custom_log_field are available in both loadBalancerLogic and edgeLogic. When merging loadBalancerLogic into edgeLogic, the directives should be deduplicated and the settings should be adjusted appropriately so that the merge will not cause changes to the behaviors of cache servers.

The directives allow and deny are available in both loadBalancerLogic and edgeLogic. The loadBalancerLogic basically provides a **server** context, so the two directives in loadBalancerLogic take effect at the server level. In edgeLogic, the two directives can be used in **server** and **location** contexts. Nginx evaluates requests against allow/deny rules in this way:
* If there are no specific allow or deny rules in the **location** context, the **server** context rules apply by default. 
* If the **location** context contains its own allow and/or deny directives, these will take precedence for requests that match that location, essentially overriding the **server** context for those requests. 

Under the LB7-ES structure, incoming requests are always processed by LB7 first and the allow/deny rules defined in loadBalancerLogic always apply to all requests, regardless of location requested. Now that LB7 is no longer present as a frontend in the new structure, the allow/deny rules defined in loadBalancerLogic won’t always apply to all requests, if the rules are simply prepended to the **server** context of edgeLogic. For locations with their own allow/deny rules in edgeLogic, the allow/deny rules defined in loadBalancerLogic should be copied and prepended to such locations to ensure consistent server behaviors after the merge. Here is an example:

```nginx
## loadBalancerLogic prior to merge
deny 103.15.234.251;
deny 104.23.161.214; 
 
## edgeLogic prior to merge
location / { 
    deny 18.16.236.115;  
    deny 193.2.13.203/32;
    allow all;
    origin_pass myorigin;
}
location /abc {
    origin_pass myorigin;
}
```

```nginx
## edgeLogic after merging in loadBalancerLogic
# Rules copied from loadBalancerLogic and prepended to server context of edgeLogic 
deny 103.15.234.251;
deny 104.23.161.214;  

location / {
# Rules copied from loadBalancerLogic and prepended to location context of edgeLogic. Without the copied rules, requests from 104.15.234.251 and 104.23.161.214 will end up being allowed 
    deny 103.15.234.251;
    deny 104.23.161.214; 
 
    deny 18.16.236.115;  
    deny 193.2.13.203/32;
    allow all;
    origin_pass myorigin;
}
location /abc { # No change. Inherits the server level rules
    origin_pass myorigin;
}
```

The directive add_header is executed when the server constructs a response to the client. Under the LB7-ES structure, add_header as configured in LB7 is always executed after request processing by configuration in edgeLogic is completed. In the merged configuration, add_header as copied from loadBalancerLogic should be appended to the **server** context of edgeLogic, so that the directive is still executed at a later time. In case a header set in loadBalancerLogic is also set in **location** and/or **if in location** contexts of edgeLogic, the configuration copied from loadBalancerLogic shall also be appended to those **location** and **if in location** contexts as well. This is because headers specified at location levels take precedence over those at server level, when the same header names are used. Here is an example:

```nginx
## loadBalancerLogic prior to merge
add_header X-Custom-Header “value-from-lb” policy=overwrite always;
 
## edgeLogic prior to merge
location / { 
    origin_pass myorigin;
    add_header X-Custom-Header “value-from-es” policy=overwrite always;
}
location /abc
    origin_pass myorigin;
}
```
```nginx
## edgeLogic after merging in loadBalancerLogic
location / {
    origin_pass myorigin;
    add_header X-Custom-Header “value-from-es” policy=overwrite always;
    add_header X-Custom-Header “value-from-lb” policy=overwrite always; # Append configuration copied from loadBalancerLogic to the location context of edgeLogic. Without this copied configuration, the client will see “value-from-es” being assigned to X-Custom-Header for requests matching this location, but “value-from-lb” is expected. 
}
location /abc { # No change. Inherits the server level config
    origin_pass myorigin;
}

# Append configuration copied from loadBalancerLogic to the server context of edgeLogic
add_header X-Custom-Header “value-from-lb” policy=overwrite always;
```

**Variables**

In addition to directives, there are also changes required in usage of variables.

| Variable | Recommendation |
|----------|----------|
| $upstream\_http\_*name* | When some piece of information that’s available in ES only is required in LB7, the directive add\_header can be configured in ES to pass information from ES to LB7. The information passed can then be accessed in LB7 via $upstream\_http\_*name*.<br>Now there is no LB7 under the new structure, and the logic previously configured in loadBalancerLogic is merged into edgeLogic. Any existing logic related to passing information around should be modified so that the required information is accessed directly from within ES, without relying on add\_header and $upstream\_http\_*name*. |
| $upstream\_trailer\_*name* | The directive add\_trailer is another way to pass information from ES to LB7. The information passed is accessible in LB7 via $upstream\_trailer_*name*.<br>Similar to the $upstream\_http\_*name*, any existing logic related to passing information around should be modified so that the required information is accessed directly from within ES, without relying on add\_trailer and $upstream\_trailer\_*name*. |

Please do not hesitate to [contact our customer support](https://www.{{siteDomain}}/support/) in case you have any questions about this change. Happy accelerating!