## The support (and non-support) of `Vary`

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
In this case, the servers cache the content as if the `Vary` header does not exist. Without `proxy_ignore_headers Vary`, the preserved `Vary` header would prevent the response from being cached because [`proxy_cache_vary off`](</docs/edge-logic/supported-directives.md#proxy_cache_vary>) is configured by default. If it is absolutely important for the CDN Pro servers to cache multiple versions based on the `Vary` header, contact CDNetworks customer support to obtain permission to set `proxy_cache_vary on`.

