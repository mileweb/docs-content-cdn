## 常见问题

### CDN Pro 如何决定一个文件能否缓存，缓存多久?

在边缘逻辑（Edge Logic）中，我们提供了多个指令用于设置文件的缓存规则（如 [proxy_no_cache](/docs/edge-logic/supported-directives#proxy_no_cache) / [proxy_ignore_cache_control](/docs/edge-logic/supported-directives#proxy_ignore_cache_control) / [proxy_ignore_headers](/docs/edge-logic/supported-directives#proxy_ignore_headers)等等）。如果加速项中没有使用到任何相关指令，那么 CDN Pro 的默认行为是“遵循源站”，即按照源站响应头中 `Cache-Control` 和 `Expires` 字段的取值来判断文件是否可以缓存以及缓存时长。需要注意的是，如果源站给的响应头中有 `Set-Cookie` 字段，CDN Pro 将不会缓存该文件。

与此同时我们优化了开源 Nginx 以使 CDN Pro 严格遵循有关“零时缓存”的 HTTP 标准：
如果源站的 Cache-Control 响应头中存在 no-cache 或 max-age=0 参数，文件仍会被 CDN Pro 缓存但会被判断为立即过期。对该文件的后续请求将触发 CDN Pro 携带 If-Modified-Since 头部对源发起重新验证。但如果源站的 Cache-Control 响应头中包含 no-store，则该文件不会被缓存。

HTTP 协议规定 Date 响应头应保存源站生成响应的时间。因此在默认情况下，来自源站的 `Date` 响应头会被 [一路透传](</docs/edge-logic/supported-directives.md#proxy_pass_header>) 至客户端。类似的原则也被运用到了对响应头 `Age` 的处理过程中。即便在采用了多层级缓存 架构的情况下，CDN Pro 平台的 `Age` 头也可正确反映文件从源站上取回后经过了多长时间。

如果上述关于缓存的默认规则并不是您所期待的，您可以使用本文开头提到的那些指令来对缓存规则进行修改。

* [`proxy_ignore_headers`](</docs/edge-logic/supported-directives.md#proxy_ignore_headers>)指令可以用来让 CDN Pro 强制忽略源站响应头里的 Cache-Control\Expire\Set-Cookie 三个字段。例如：
```nginx
proxy_ignore_headers Set-Cookie;
```
这种情况下，源站的 `Set-Cookie` 响应头将不会对缓存行为产生任何影响。
* [`proxy_cache_valid`](</docs/edge-logic/supported-directives.md#proxy_cache_valid>) 指令用于设置当源站未返回 Cache-Control\Expire\Set-Cookie 这三个字段，或者这些字段被强制忽略时，CDN Pro 的缓存时长。该指令支持针对不同状态码的文件设置不同缓存时长。例如：
```nginx
location / { # 默认 location
    proxy_cache_valid 5m; # 针对200、301、302状态码请求缓存5分钟
    proxy_cache_valid 404 2m; # 针对404状态码请求缓存2分钟
}
location /no-cache {
    proxy_cache_valid 200 0; # 针对200状态码进行缓存，但是立即过期
}
```
* [`proxy_ignore_cache_control`](</docs/edge-logic/supported-directives.md#proxy_ignore_cache_control>) 指令的功能与 [`proxy_ignore_headers`](</docs/edge-logic/supported-directives.md#proxy_ignore_headers>)十分相似。两者的区别在于前者可以选择性忽略源站 Cache-Control 头中的指定参数值。例如：
```nginx
proxy_ignore_cache_control no-cache no-store; # 忽略源站 Cache-Control 响应头中的 no-cache 和 no-store 参数
```
* [`proxy_cache_min_age`](</docs/edge-logic/supported-directives.md#proxy_cache_min_age>) 指令用于设置 CDN Pro 文件缓存时间的最小值。当源站给的 Cache-Control 头中的 max-age 值小于 proxy_cache_min_age 指令的配置值时，该 max-age 将被 CDN Pro 忽略，而使用该指令配置值作为文件的缓存时间。
* [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) 指令用于设置 CDN Pro 不响应缓存文件给客户端，而是每次都从源站获取文件。该指令经常与 [`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 一起使用来达到“强制文件不缓存”的效果。
* [`proxy_no_cache`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 指令用于设置 CDN Pro 从源站拿到文件后不缓存到本地。该指令经常与 [`proxy_cache_bypass`](</docs/edge-logic/supported-directives.md#proxy_cache_bypass>) 一起使用来达到“强制文件不缓存”的效果。

如果您对 CDN Pro 的缓存行为感兴趣，您可能也希望了解 [如何设置自定义缓存Key](#如何将问号后参数或者请求头加入到缓存key中) 以及 [CDN Pro 对 `Vary` 头部的处理方式](#关于-vary-响应头的处理方式)。

### 如何将问号后参数，请求头，或者请求正文加入到缓存Key中?

CDN Pro 的默认行为是将域名和不包含问号后参数的请求URI加到缓存 key 中。同时 CDN Pro 也会将一个在边缘逻辑（Edge Logic）中可编辑的内置变量 [`$cache_misc`](</docs/edge-logic/built-in-variables.md#$cache_misc>) 加入到缓存 key 中。因此您可以通过这个内置变量将关键参数加入缓存 Key。例如，将所有问号后参数加入到缓存 key ：
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
```
在配置的过程中，如果您想保留当前边缘逻辑中的 $cache_misc 值，可以将新数据添加在 $cache_misc 末尾，例如：
```nginx
set $cache_misc "${cache_misc}hdr1=$http_header1&hdr2=$http_header2";
```
POST 方法在今天经常被用来实现需要提供大量参数的查询操作，一个典型的例子是 [GraphQL](https://en.wikipedia.org/wiki/GraphQL)。 在这种情况下，POST 请求和 GET 一样都是 idempotent 和安全的，而且响应也都是可缓存的。唯一的问题就是如何把请求正文里的参数添加到缓存 key 中。CDN Pro 为此专门开发了 [`proxy_request_body_in_cache_key`](/docs/edge-logic/supported-directives.md#proxy_request_body_in_cache_key) 指令来实现这个目的。当这项功能被启用的时候，服务器会为收到的请求正文计算一个 MD5 哈希值，并将其添加到缓存 key 的末尾。出于性能考虑，这些操作只会在请求正文小于 4kB 的时候发生。当请求正文大于此门限时，不会有哈希值被添加到缓存 key 中，同时变量 [`$ignored_body_in_cache_key`](/docs/edge-logic/built-in-variables#ignored_body_in_cache_key) 的值会被设为 '1'。为了避免可能由此带来的缓存冲突，您可以将此变量用于 [`proxy_cache_bypass`](/docs/edge-logic/supported-directives.md#proxy_cache_bypass)指令来避免缓存这样的请求。如果一定要把更大的请求正文添加到缓存 key 里，您需要在客户端计算哈希值，并通过请求头传递到服务器，然后将其添加到 $cache_misc 变量中。

最后给您的提醒是，不要忘了使用 [`proxy_cache_methods`](/docs/edge-logic/supported-directives.md#proxy_cache_methods) 指令来开启对 POST 请求的缓存.


### HTTP 头部管理

当您需要 CDN Pro 在回源时添加，修改，或者删除某些头部值时，您可以使用指令[`origin_set_header`](</docs/edge-logic/supported-directives.md#origin_set_header>) 。示例如下：
```nginx
origin_set_header CDN-Name Quantil;
```
另外一个典型的场景如下，它可以让 CDN Pro 把客户端 IP 添加到 Client-IP 这个头部中并发送给源站：
```nginx
origin_set_header Client-IP $client_real_ip;
```
出于整合 cache 上文件编码格式从而提升缓存命中率的考虑，CDN Pro 开发并提供了指令 [`sanitize_accept_encoding`](</docs/edge-logic/supported-directives.md#sanitize_accept_encoding>)。该指令将在回源时修改客户端请求中的 `accept-encoding` 头部值，并携带修改后的值请求源站。

当您需要 CDN Pro 在响应客户端时添加，修改，或者删除某些头部值时，您可以使用指令 [`add_header`](</docs/edge-logic/supported-directives.md#add_header>)。示例如下：
```nginx
add_header CDN-Name Quantil;
```
同时 CDN Pro 开发并提供了指令 [`origin_header_modify`](</docs/edge-logic/supported-directives.md#origin_header_modify>) ，此指令将在其他所有处理源站响应的操作之前修改掉源站的响应头。当您需要改写某些可能影响 CDN 服务器行为的源站响应头（例如缓存时间）时，这个指令将非常有用。

### 关于 `Vary` 响应头的处理方式

默认情况下， CDN Pro 会将删掉所有来自源站的 `Vary` 响应头，因此所有的URL在 CDN Pro 的服务器上仅保留一份缓存版本。如果您希望 CDN Pro 按照请求头或者请求cookie值来缓存不同的缓存版本，您可以将这些请求头或者cookie头加入到变量 `$cache_misc` 中。示例如下：
```nginx
set $cache_misc "ae=$http_accept_encoding";
```
如果您期望发送 `Vary` 响应头给客户端以便客户端按照这个头部值来区分缓存，您可以使用指令 [`add_header`](</docs/edge-logic/supported-directives.md#add_header>)。如果您需要将源站的 `Vary` 响应头透传给客户端，您可以使用以下配置来让默认的行为（删掉所有来自源站的 `Vary` 响应头）失效：
```nginx
# 保留源站提供的响应头 `Vary` 
origin_header_modify Vary "" policy=preserve;
# Cache不对 `Vary` 做任何操作，仅透传给客户端
proxy_ignore_headers Vary; 
```
在这种情况下，CDN Pro 将按照响应头 `Vary` 完全不存在来处理缓存。如果仅配置了 `origin_header_modify Vary "" policy=preserve` 而没有配置 `proxy_ignore_headers Vary` ，那么由于默认生效的配置 [`proxy_cache_vary off`](</docs/edge-logic/supported-directives.md#proxy_cache_vary>) ，您的文件将不会被缓存在 CDN Pro 平台上。如果您的业务的确需要 CDN Pro 按照响应头 `Vary` 来区分不同缓存版本，请联系网宿（CDNetworks）技术支持为您开通配置`proxy_cache_vary on` 的权限。

### 如何遵循源站的跳转请求（301、302等）?

当源站响应 30x 并携带一个Location重定向跳转时，您或许不希望 CDN Pro 仅是将该 30x 状态码以及跳转地址缓存并响应给客户端，而是希望 CDN Pro 继续对这个 Location 重定向跳转地址发起请求直至获取到实际的响应文件后再进行缓存和客户端响应。这时您可以使用指令 [`origin_follow_redirect`](</docs/edge-logic/supported-directives.md#origin_follow_redirect>) 来开启此“拉取跳转后的文件”功能。需要注意的是，开启该功能可能会给此类回源请求带来额外的时间消耗。

### 中国大陆加速以及备案相关

按照中华人民共和国工业和信息化部（MIIT）的需求，所有使用中国大陆节点的域名都需要提前进行备案（[ICP Beian (备案)](https://beian.miit.gov.cn/)）。部分域名还需要进行额外的[安全备案](https://www.beian.gov.cn/)。 作为 CDN 分发平台，CDN Pro 无法使用中国大陆节点来服务未备案域名。任何违规行为都可能导致我们在中国大陆的服务器被关停。作为客户，您需要提前为计划在中国大陆进行本地分发的域申请并和获取备案。当然，在这个过程中 CDN Pro 可以供相应的咨询服务来进行协助。在您的域名取得备案之前，CDN Pro 可以使用Near China专线或临近中国大陆（例如香港、韩国或者日本等等）的服务器向中大陆的客户分发内容，但是这样的分发方式与中国大陆本地服务器相比，性能上会有一定差距。

#### 有ICP备案域名中国大陆加速

如果您有一个或多个ICP备案域名并希望它们在中国大陆加速，请联系网宿（CDNetworks）技术支持提交关于您业务的所有必要信息。我们将这些信息确认无误后，CDN Pro 就将为您开启中国大陆节点的使用权限。然后您可以按以下步骤来启用这些中国大陆节点：

1. 在该域名的 [加速项](</docs/portal/edge-configurations/creating-property.md>) 配置中，将“有ICP备案”设置成是。这样做可使加速项上的配置部署到中国大陆服务器，当这些服务器接收客户端请求时会正常响应文件。否则它们将返回状态代码 451。

2. 创建携带“有ICP备案”为是的 [边缘域名](</docs/portal/traffic-management/creating-edge-hostname.md>) , 并将您的业务域名流量通过 CNAME 的方式解析到到此边缘域名上。这样GSLB调度系统就会将您的业务域名自动解析到上述1中描述的 CDN Pro 的中国大陆服务器上。

#### 无ICP备案域名中国大陆加速 - Near China 专线解决方案

如果您的CDN域名没有ICP备案，但仍然需要加速并分发内容到中国大陆，CDN Pro 为您提供了Near China专线的解决方案。 这个解决方案利用 CDN Pro 的特殊服务组nearChina，以部署在香港的优质节点线路，底延时高性能的分发您的内容到中国大陆。

由于 Near China 专线解决方案是增值服务，nearChina 服务组的价格会高于普通服务组的价格。 如您有需要获取此专线价格信息或开启服务，请联系网宿（CDNetworks）技术支持团队。

### 如何开启websocket功能?

您可以在希望开启 WebSocket 协议的location下使用指令 [`enable_websocket`](</docs/edge-logic/supported-directives.md#enable_websocket>)。需要确保客户端使用的是 HTTP/1.1（非 HTTP/2）协议来与服务器建连。该指令默认会将读取和发送超时时间设置为21秒。你可以通过[`origin_read_timeout`](</docs/edge-logic/supported-directives.md#origin_read_timeout>) 和 [`origin_send_timeout`](</docs/edge-logic/supported-directives.md#origin_send_timeout>) 这两个指令对其进行修改。

### 动态文件的支持情况?

动态内容通常是针对每个请求即时生成，并且对于不同的客户端的响应是不同的。部分示例如下：
* 实时股价、体育比赛比分查询
* 根据客户端输入的关键字进行搜索请求
* 携带大量查询参数的 API 调用请求

如果您的源站服务器位于数据中心或云服务器上，那么远离源站或与源站的网络链路不佳的客户端得到的响应性能可能会非常差。此时该如何通过 CDN Pro 来加速这些动态内容呢？ 以下操作将极大提升此类动态响应性能：
* **使用 CDN Pro 来为您的业务争取数秒的宝贵时间**

当您使用 CDN Pro 时，您的客户端将会被全局调度系统（GSLB）引导与最近的边缘服务器建连。客户端与边缘服务器之间的往返时间 (RTT) 可能比客户端直连源服务器快几百毫秒。 TCP 和 TLS 握手通常需要 3-4 个 RTT，这样便可以通过 CDN 来提升1秒的响应性能。默认情况下，CDN Pro 与源站之间会保持长链接，您可以使用指令 [keep-alive timeout](/docs/portal/edge-configurations/managing-origins) 来设置长达10分钟的长链接时间。同时如果您已提前规划了某些业务不需要缓存，那么您可以使用指令 [`proxy_no_cache 1;`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 和 [`proxy_cache_bypass 1;`](</docs/edge-logic/supported-directives.md#proxy_no_cache>) 来跳过缓存处理步骤以最大程度减少 CDN Pro 上的延迟。
* **将动态文件转换成可缓存文件**

在许多情况下，“动态文件”并不意味着内容完全不可缓存。例如，如果您将篮球比赛的得分缓存 1 秒，客户端几乎体验不到任何差异。如果每秒有 10 个请求来获取分数，则可以节省 90% 的源站带宽和CDN执行损耗。需要注意的是，如果客户端收到的响应需要根据请求 URL 中的问号后参数或者请求头部值而不同的话，请确保[相关参数或者请求头已被添加到缓存 key 中](#如何将问号后参数或者请求头加入到缓存key中)。
* **回源时开启HDT链路加速配置**

CDN Pro 使用指令 [`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>) 来进行回源时与源站之间的加速。 这个强大的功能基于我们屡获殊荣的 [High-speed Data Transmission](https://www.cdnetworks.com/enterprise-applications/high-speed-data-transmission/) (HDT) 技术。它确保了 CDN Pro 的服务器使用最优的回源链路，即使在某些极端恶劣的网络链路情况下也能保证服务的稳定性。此指令亦可用于某些源站链路不佳，但是首次 MISS 请求性能又极其重要的可缓存业务上。通过 [`origin_fast_route`](</docs/edge-logic/supported-directives.md#origin_fast_route>) 服务的流量会因其带来额外成本而收取更高的费用。要试用此功能，请联系网宿（CDNetworks）技术支持。

### 二级域名和anycast

我们[基于CNAME的流量调度系统](</docs/portal/traffic-management/overview>) 可综合考虑性能、成本、合规性要求和自定义规则等各种因素，动态进行流量调度。您只需[创建一个调度域名](</docs/portal/traffic-management/creating-edge-hostname>)，并添加一条DNS CNAME记录将您的域名指向调度域名，就能使用CDN Pro的流量调度功能。在大多数情况下，您都可以利用该系统的强大功能来实现最佳调度结果。

然而，如果您要加速的域名是二级域名，即不包含子域名的域名（例如，example.com），由于DNS规范的限制（请参阅 [RFC1034](https://www.ietf.org/rfc/rfc1034.txt) 3.6.2章节)，可能无法为二级域名创建CNAME记录。这种情况下，您可以使用我们的anycast功能。我们将会提供anycast IPv4 地址，您只需在DNS中添加A记录将您的二级域名指向anycast地址即可。目前，anycast功能未默认开放。如果您想使用此功能，请联系我们的技术支持团队开通。

需要注意的是，每个anycast IP地址仅在少数几个节点广播，每个地址广播的节点范围可能会经常变化，且不会提前通知。因此，anycast地址所对应的服务性能和服务能力，与调度域名没有可比性。请尽可能使用调度域名来进行流量调度。只有当加速域名是二级域名才使用anycast功能。

### CDN Pro API 如何限制调用频率?

为了防止CDN Pro的服务过载，CDN Pro API限制客户每分钟可以发送的请求数量。如果客户发送过多的请求，API频率限制器将返回带有HTTP状态码429的错误消息。

* **令牌桶算法**

CDN Pro采用令牌桶算法实现频率限制。令牌桶算法基于一个固定容量的桶，令牌以固定的速度添加到桶中。在允许一个API请求继续处理之前要先检查桶，查看它是否至少包含一个令牌。如果是，则从桶中消耗一个令牌，允许API请求继续进行。如果可用的令牌数量不足，则会阻止请求，并返回错误信息，提示在1分钟的滑动窗口内已超过配额。
桶的容量和填充速率由客户管理API中`configs.apiMaxBurst`和`configs.apiRate`字段控制。例如，如果客户有`configs.apiMaxBurst = 45`和`configs.apiRate = 120`，则以每分钟120个令牌的固定速率向桶中添加令牌，桶的总容量为45。令牌桶以一种“贪心”的方式被填满，限流器会尽力向桶中添加令牌。例如，每分钟120个令牌即每500毫秒增加1个令牌。换句话说，限流器并不会等待整整一分钟后一次性加入120个令牌。

* **错误提示和处理**

在令牌被消耗之后，一个`X-rate-limit-remaining: X`响应头会被添加到API调用的HTTP响应中，表示桶中剩余的令牌数量。此响应头表示客户此时可以发出的API请求的剩余配额。失败或格式错误的请求也会从桶中消耗一个令牌。如果桶中没有足够数量的令牌，API网关将返回一个HTTP 429错误，响应头为`x-rate-limit-retry-after-seconds: Y`，告诉客户端在Y秒后重试。

* **避免频率限制错误的最佳实践**

检查API请求历史记录。`GET /ngadmin/apicalls` 能返回您调用API的历史记录(调用此API需要客户管理员账号)。请仔细检查记录，查看是否有滥用API的情形。

您可以通过使用更适合需求场景的API或将类似的请求合并为一个来减少请求的数量。例如，如果您想查看一个列表内每个域名的流量，一种较低效的方法是:
```
for domain in domain_list:
    call GET /cdn/report/vol 
    {filters: {hostnames: [$domain]}}`
```
请使用以下推荐的方法:
```
POST /cdn/report/volSummary
{filters: {hostnames: [$domain_list]}, groupBy: [hostnames]}
```
另一个例子是同时刷新大量缓存文件。高效的做法是在一个请求中刷新多个文件，而不是为每个需要刷新的 URL 单独调用 API。此外如果大量的刷新 URL 符合某种规律模式，则可在创建刷新请求时通过指定`dirUrls`或`regexPatterns`字段来使用目录或正则表达式刷新。总之，API 请求的数量不应该随着您的域名、加速项和其他资源的增加而增加。

如果您通过脚本调用API，它应能处理和应对间歇性或非特定的错误。脚本应遵循`x-rate-limit-retry-after-seconds`响应头，并在延迟后重试请求。您应考虑在代码中使用一个能调节请求频率的机制，使得请求能均匀地随时间分布。

如果问题仍然存在，请联系我们的技术支持团队。如果确实需要增加频率限制或突发上限，技术支持团队将评估您的需求并提高这些阈值。


* **注意**

频率限制应用于客户级别。同一个客户下的所有API帐户共享同一个令牌桶。过度使用一个帐户将耗尽客户的配额。零售商的子客户的频率限制是相互独立的。此外，子客户的API调用不会使用父客户的配额。

因为CDN Pro的Portal也会调用API，所以Portal UI中的操作也受到API调用的频率限制。

未经登录的API调用(如注册和登录尝试)会消耗来自客户端IP地址对应的令牌桶。该桶的默认容量为30个令牌，填充速率为每分钟60个。

使用客户管理员账号对`configs.apiRate`和`configs.apiMaxBurst`的修改不会立即生效。通常需要10-15分钟的时间来改变填充速率并重新填充桶。

### 如何在报表中对数据进行分类？

当您利用CDN Pro的网络加速各种各样的内容时，您可能希望能够以某种方式识别在CDN Pro平台上分发的流量。例如，当有多个域名在平台进行加速时，您可能想了解这些域名的流量分布。当一个域名下有不同类型的内容时，您可能想了解哪些内容产生的流量最多。

我们的报表API接口使您能够方便地深入了解CDN Pro所分发的流量。 API接口支持功能强大的`filters`和`groupBy`请求参数，您可使用这2个参数来根据您的特定需求定制报告。`filters`参数允许您使用特定条件来过滤报表数据，而`groupBy`参数则可以用来指定条件对数据进行分组汇总。假设您想按域名查看流量数据，您可以通过这两个参数指定“hostnames”或“propertyHostnames”进行查询。如果您想查询指定加速项目的流量数据，可以使用`filters.propertyIds`指定加速项目。如果需要按server group （节点组）查询流量，则只需在调用API接口时在参数中指定“serverGroups”即可。

多数情况下，以上所提到的参数和支持的选项已经可以满足大部分需求。 如果您想更进一步查看流量数据，或者想以自己的方式定制报告，则可以使用**内容代码**功能。此功能允许您指定自定义的代码来标记内容。当CDN Pro缓存服务器处理请求时，服务器会以内容对应的代码对流量进行标记。 这样您就可以根据内容代码来查询报表数据。

#### 指定自定义的代码对内容进行标记

CDN Pro通过引入`$content_code`这个内置变量来实现对内容进行标记。 当您配置加速项目时，可以通过在**loadBalancerLogic**中为该变量赋值来对内容进行标记。 可以使用 [`set`](</docs/edge-logic/supported-directives.md#set>) 或 [`proxy_set`](</docs/edge-logic/supported-directives.md#proxy_set>) 指令来进行赋值。

您可以为加速项目指定内容代码。 当您创建了多个加速项目，您可以通过指定内容代码的方式对这些加速项目进行分组。下面的示例展示了将加速项目A和B归到group1这个组，将加速项目C归到group2这个组。

```
# loadBalancerLogic for property A
set $content_code group1;
```
```
# loadBalancerLogic for property B
set $content_code group1;
```
```
# loadBalancerLogic for property C
set $content_code group2;
```

您也可以为具体的内容指定内容代码。 可以基于条件判断将内容代码赋值给变量`$content_code`。 下面显示了一个示例，对于/abc路径下提供的内容，标记为“abc”，对于/xyz路径下提供的内容，标记为“xyz”。

```
# loadBalancerLogic
if ($uri ~ ^/abc(/|$)) {
     set $content_code "abc";
    }
elif ($uri ~ ^/xyz(/|$)) {
     set $content_code "xyz";
}
```

> 我们鼓励您充分利用**内容代码**功能来方便地标记内容，识别流量。但为避免这个功能被滥用，我们加了一个限制，即赋值给$content_code 的值必须是一个字符串，不能是另一个变量。 也不允许使用 [`eval_func`](</docs/edge-logic/supported-directives.md#eval_func>) 指令为此变量赋值。

#### 在多种场景下使用内容代码

* **报表查询**

[查询7层流量](</apidocs#operation/post-cdn-report-volL7>)和[查询7层带宽](</apidocs#operation/post-cdn-report-bandwidthL7>)API接口支持在请求体中的`filters`参数指定“contentCodes”。 [查询7层流量汇总数据](</apidocs#operation/getVolL7Summary>)和[查询7层流量带宽汇总数据](</apidocs#operation/post-cdn-report-bandwidthL7Summary>)API接口支持在请求体中的`filters`和`groupBy`参数指定“contentCodes”。

您可以使用这些API接口基于内容代码查询报表数据。例如，如果您需要查询以“abc”和“xyz”为标识的内容所产生的流量的明细，可调用“查询7层流量”接口，在请求体中指定`{"filters":{"contentCodes":["abc","xyz"]}}`。如果您需要查询同样的内容所产生的流量的汇总数据，则可调用“查询7层流量汇总数据”接口，在请求体中指定`{"filters":{"contentCodes":["abc","xyz"]},"groupBy":["contentCodes"]}`。

> 正如接口名称所示，以上API接口仅返回7层流量数据。 返回的数据不包括TCP/IP/MAC开销。

* **实时日志**

`$content_code`变量也可以在[实时日志](docs/portal/edge-configurations/creating-property#real-time-log)中使用。在日志格式中加上该变量，即可将携带此字段的访问日志实时地传输到您指定的日志服务器。