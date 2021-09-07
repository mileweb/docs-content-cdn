## 常见问题

### CDN如何判定一个文件能否缓存，缓存多久?

在边缘逻辑（Edge Logic）中，我们提供了多个配置项用于设置文件是否应被CDN缓存（如[proxy_no_cache](/docs/edge-logic/supported-directives#proxy_no_cache)/[proxy_ignore_cache_control](/docs/edge-logic/supported-directives#proxy_ignore_cache_control)/[proxy_ignore_headers](/docs/edge-logic/supported-directives#proxy_ignore_headers)等等）。如果所有相关配置项都没有在加速项中被使用到，那么CDN360节点的默认行为是“遵循源站”，即按照源站响应头中的`Cache-Control`和`Expires` 头来判断文件是否可以缓存以及缓存时长。需要注意的是，如果源站给的响应头中有`Set-Cookie`头，CDN360将不会对该文件进行缓存。

同时我们优化了开源 NGINX 从而让CDN360严格遵循有关“零时缓存”的 HTTP 标准：
如果源站的 Cache-Control 响应头中存在 no-cache 或 max-age=0 ，则文件仍会被CDN360缓存但CDN360会判断其立即过期，对该对象的后续请求将触发CDN360携带 If-Modified-Since 头部对源发起重新验证。
如果源站的 Cache-Control 响应头中为 no-store，则该文件不会被缓存。

在缓存时间上，CDN360同样遵循上述规则。默认情况下 CDN360 节点会缓存并提供源站的 `Date` 以及 `Age` 头部值给客户端，因此即便是采用了多层级Cache架构，CDN360也可以做到全平台缓存时间一致。

如果上述关于是否缓存、缓存时间的默认缓存规则并不是您期待的，那么您也可以使用本文开头的那些配置项来进行缓存规则改写。

* 配置项[`proxy_ignore_headers`](</docs/edge-logic/supported-directives.md#proxy_ignore_headers>)用于让 CDN360 强制忽略源站的 Cache-Control\Expire\Set-Cookie 三个头部。例如：
```nginx
proxy_ignore_headers Set-Cookie;
```
这种情况下，CDN360 将按照源未提供`Set-Cookie` 响应头来判断文件是否可以缓存以及缓存时间。
* 配置项[`proxy_cache_valid`](</docs/edge-logic/supported-directives.md#proxy_cache_valid>) 用于设置当源未提供或者CDN360忽略源的 Cache-Control\Expire\Set-Cookie 三个头部时 CDN360 的缓存时长，该配置项支持针对不同状态码的文件设置不同缓存时长。例如：
```nginx
location / { # 默认 location
    proxy_cache_valid 5m; # 针对200、301、302状态码请求缓存5分钟
    proxy_cache_valid 404 2m; # 针对404状态码请求缓存2分钟
}
location /no-cache {
    proxy_cache_valid 200 0; # 针对200状态码进行缓存，但是该立即过期
}
```
* 配置项[`proxy_ignore_cache_control`](</docs/edge-logic/supported-directives.md#proxy_ignore_cache_control>)的功能与[`proxy_ignore_headers`](</docs/edge-logic/supported-directives.md#proxy_ignore_headers>)十分相似，两者的区别在于[`proxy_ignore_cache_control`](</docs/edge-logic/supported-directives.md#proxy_ignore_cache_control>)仅可用于设置 CDN360 忽略源 Cache-Control 头中的指定参数值。例如：
```nginx
proxy_ignore_cache_control no-cache no-store; # 忽略源给的 Cache-Control 响应头中的 no-cache 和 no-store
```
* 配置项[`proxy_cache_min_age`](</docs/edge-logic/supported-directives.md#proxy_cache_min_age>) 用于改写源站给的 `Cache-Control` 响应头中的 `max-age` 参数值，从而让 CDN360 按改写后的`max-age` 值进行缓存
* 配置项 [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) 用于设置 CDN360 不响应缓存文件给客户端，而是每次都从源站获取文件。该配置项经常与[`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>)一起使用来达到“强制文件不缓存”的效果。
* 配置项[`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 用于设置 CDN360 从源站拿去到文件后不缓存到本地。该配置项经常与 [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) 一起使用来达到“强制文件不缓存”的效果。
鉴于您对 CDN360 的缓存行为感兴趣，您可能同时也对[如何设置自定义缓存Key](#how-to-include-query-parameters-andor-request-headers-in-the-cache-key) 和 [CDN360 对 `Vary` 头部的处理方式](#the-support-and-non-support-of-vary) 感兴趣。

### 如何将问号后参数或者请求头加入到缓存Key中?

默认情况下，CDN360的默认行为是将域名和不包含问号后参数的请求URI加载到缓存 key 中。同时 CDN360 也会将一个在边缘逻辑（Edge Logic）中可编辑的内置变量 [`$cache_misc`](</docs/edge-logic/built-in-variables.md#$cache_misc>) 加入到缓存 key 中。因此您可以按照您的业务需求将关键参数加入到这个内置变量中。例如，将所有问号后参数加入到缓存 key ：
```nginx
set $cache_misc "?$sorted_querystring_args";
```
您也可以仅提取出问号后参数中的部分指定变量值加入到缓存 key ，以下示例显示如何将问号后参数中的 "abc" 和 "def" 加入到缓存 key ：
```nginx
set $cache_misc "?abc=$arg_abc&def=$arg_def";
```
您也可以将部分请求 header 值加入到缓存 key :
```nginx
set $cache_misc "ae=$http_accept_encoding";
set $cache_misc $cache_misc."hdr1=$http_header1&hdr2=$http_header2";
```
在配置的过程中，如果您想保留当前边缘逻辑中的 $cache_misc 值，那么您可以将新数据添加在 $cache_misc 后，这样新数据就会以附加的形式加入到 $cache_misc 中：
```nginx
set $cache_misc "${cache_misc}hdr1=$http_header1&hdr2=$http_header2";
```

### HTTP 头部管理

当您需要 CDN360 在回源时添加，修改，或者删除某些头部值时，您可以使用配置项[`origin_set_header`](</docs/edge-logic/supported-directives.md#origin_set_header>) 。示例如下：
```nginx
origin_set_header CDN-Name Quantil;
```
另外一个典型的场景如下，它可以让 CDN360 把客户端 IP 添加到 Client-IP 这个头部中并发送给源站：
```nginx
origin_set_header Client-IP $client_real_ip;
```
出于整合 cache 上文件编码格式从而提升缓存命中率的考虑，CDN360 开发并提供了配置项[`sanitize_accept_encoding`](</docs/edge-logic/supported-directives.md#sanitize_accept_encoding>)。该配置项将在回源时修改客户端请求中的 `accept-encoding` 头部值，并携带修改后的值请求源站。

当您需要 CDN360 在响应客户端时添加，修改，或者删除某些头部值时，您可以使用配置项[`add_header`](</docs/edge-logic/supported-directives.md#add_header>)。示例如下：
```nginx
add_header CDN-Name Quantil;
```
同时 CDN360 开发并提供了配置项 [`origin_header_modify`](</docs/edge-logic/supported-directives.md#origin_header_modify>) ，此配置项将在其他所有处理源站响应的操作之前修改掉源站的响应头。当您需要改写某些可能影响 CDN 服务器行为的源站响应头（例如缓存时间）时，这个配置项将非常有用。

### 关于 `Vary` 响应头的处理方式

默认情况下， CDN360 会将删掉所有来自源站的 `Vary` 响应头，因此所有的URL在 CDN360 的服务器上仅保留一份缓存版本。如果您希望 CDN360 按照请求头或者请求cookie值来缓存不同的缓存版本，您可以将这些请求头或者cookie头加入到变量 `$cache_misc` 中。示例如下：
```nginx
set $cache_misc "ae=$http_accept_encoding";
```
如果您期望发送 `Vary` 响应头给客户端以便客户端按照这个头部值来区分缓存，您可以使用配置项 [`add_header`](</docs/edge-logic/supported-directives.md#add_header>)。如果您需要将源站的 `Vary` 响应头透传给客户端，您可以使用以下配置来让默认的行为（删掉所有来自源站的 `Vary` 响应头）失效：
```nginx
# 保留源站提供的响应头 `Vary` 
origin_header_modify Vary "" policy=preserve;
# Cache不对 `Vary` 做任何操作，仅透传给客户端
proxy_ignore_headers Vary; 
```
在这种情况下，CDN360 将按照响应头 `Vary` 完全不存在来处理缓存。如果仅配置了 `origin_header_modify Vary "" policy=preserve` 而没有配置 `proxy_ignore_headers Vary` ，那么由于默认生效的配置 [`proxy_cache_vary off`](</docs/edge-logic/supported-directives.md#proxy_cache_vary>) ，您的文件将不会被缓存在 CDN360 平台上。如果您的业务需要 CDN360 按照响应头 `Vary` 来区分不同缓存版本，请联系网宿（CDNetworks）技术支持为您开通配置`proxy_cache_vary on` 的权限。

### 如何遵循源站的跳转请求（301、302等）?

当源站响应 30x 并携带一个Location重定向地址时，您或许需要 CDN360 按照源的这个跳转地址来获取最终文件并缓存。您可以使用配置项 [`origin_follow_redirect`](</docs/edge-logic/supported-directives.md#origin_follow_redirect>) 来实现这个需求。需要注意的是，遵循源站的跳转请求将会给回源请求带来额外的跳转时间消耗。

### 中国大陆加速以及备案相关

按照中华人民共和国工业和信息化部（MIIT）的需求，所有使用中国大陆节点的域名都需要提前进行备案（[ICP Beian (备案)](https://beian.miit.gov.cn/)）。部分域名还需要进行额外的[安全备案](https://www.beian.gov.cn/)。 作为 CDN 分发平台，CDN360 无法使用中国大陆节点来服务未备案域名。任何违规行为都可能导致我们在中国大陆的服务器被封锁。客户有责任为需要在中国大陆进行本地分发的域申请并和获取 Beian。当然，在这个过程中 CDN360 可以提供相应的咨询服务来进行协助。在您的域名取的备案之前，CDN360 可以使用临近中国大陆（例如香港、韩国或者日本等等）的服务器向中大陆的客户分发内容，但是这样的分发方式与中国大陆本地服务器相比，性能上会有一定差距。

如果您有一个或多个ICP备案域名并希望它们在中国大陆加速，请联系网宿（CDNetworks）技术支持以便我们能够获取到关于您业务的所有必要信息。这些信息确认无误后，CDN360 就将为您开启中国大陆节点的使用权限。然后，您就可以按以下步骤来启用这些中国大陆节点：

1. 在该域名的 [加速项](</docs/portal/edge-configurations/creating-property.md>) 配置中，将“有ICP备案”设置成是。这样做可确保将加速项上的配置部署到中国大陆服务器，并且当这些服务器接收客户端请求时会正常响应文件。否则它们将返回状态代码 451。

2. 创建携带“有ICP备案”为是的 [边缘域名](</docs/portal/traffic-management/creating-edge-hostname.md>) , 并将您的业务域名流量通过 CNAME 的方式解析到到此边缘域名上。这样GSLB调度系统就会将您的业务域名自动解析到上述1中描述的 CDN360 的中国大陆服务器上。

### 如何开启websocket功能?

您可以在希望开启 WebSocket 协议的location下使用配置项[`enable_websocket`](</docs/edge-logic/supported-directives.md#enable_websocket>)。需要确保客户端使用的是 HTTP/1.1（非 HTTP/2）协议来与服务器建链。该配置项默认会将读取和发送超时时间设置为21秒。你可以通过[`origin_read_timeout`](</docs/edge-logic/supported-directives.md#origin_read_timeout>) 和 [`origin_send_timeout`](</docs/edge-logic/supported-directives.md#origin_send_timeout>) 这两个配置项对其进行修改。

### 动态文件的支持情况?

动态内容通常是针对每个请求即时生成，并且对于不同的客户端的响应是不同的。部分示例如下：
* 实时股价、体育比赛比分查询
* 根据客户端输入的关键字进行搜索请求
* 携带大量查询参数的 API 调用请求

如果您的源站服务器位于数据中心或云服务器上，那么远离源站或与源站的网络链路不佳的客户端请求获取到的响应性能可能会非常差。此时如何通过 CDN360 来加速这些动态内容？ 以下操作将极大提升此类动态响应性能:
* **使用 CDN360 来为您的业务争取数秒的宝贵时间**

当您使用 CDN360 时，您的客户端将会解析并与最近的边缘服务器建链。客户端与边缘服务器之间的往返时间 (RTT) 可能比客户端直连接到源服务器快几百毫秒。 TCP 和 TLS 握手通常需要 3-4 个 RTT，这样便可以通过 CDN 来提升1秒的响应性能。默认情况下， CDN360 与源站之间会保持长链接，您可以使用配置项 [keep-alive timeout](/docs/portal/edge-configurations/managing-origins) 来设置长达10分钟的长链接时间。同时如果您已提前规划了某些业务不需要缓存，那么您可以使用配置项[`proxy_no_cache 1;`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 和 [`proxy_cache_bypass 1;`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 来跳过缓存处理步骤以最大程度减少 CDN360 上的延迟。
* **将文件缓存下来!**

在许多情况下，“动态文件”并不意味着内容不可缓存。例如，如果您将篮球比赛的得分缓存 1 秒，那么客户端将不会体验到差异。如果每秒有 10 个请求来获取分数，则可以节省 90% 的源站带宽和CDN执行损耗。需要注意的是如果期待客户端收到的响应会根据请求url中的问号后参数或者请求头部值而不同，请确保[关键字段或者请求头已被添加到缓存 key 中](#如何将问号后参数或者请求头加入到缓存Key中)。
* **回源时开启HDT链路加速配置**

CDN360 has a directive [`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>) that enables a "Fast Route" to access the origin. This powerful feature is based on our award-winning [High-speed Data Transmission](https://www.cdnetworks.com/enterprise-applications/high-speed-data-transmission/) (HDT) technology. It ensures that our servers always have the best possible channel to reach your origin, even under challenging situations. This directive can also be used for highly cacheable contents if the origin is hard to reach from certain networks or when the cache-miss performance is critical to you. However, the traffic served through the ""Fast Route" may be charged a higher price due to the extra cost associated with it. To try out this feature, contact the CDN360 support team.
