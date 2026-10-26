# 管理源站配置

源站是包含您希望 CDN Pro 加速的内容的服务器。CDN Pro 支持为每个加速项目配置多个源站，并提供多种设置来定义对源站的访问。

## 在加速项目中添加、修改或删除源站

1. 在左侧导航栏中，点击**边缘配置**，然后选择**加速项目**。
2. 在“加速项目”页面，点击您要修改的加速项目的 ID，然后从**版本号**下拉列表中选择版本。
3. 点击**编辑**按钮，或从下拉列表中选择**克隆**以进行更改。
4. 修改或删除现有源站，或添加新源站：
   - 如果已存在源站（类似于下图中的源站），您可以点击**源站**字段中的<strong>编辑</strong>链接，并在以下对话框中填写字段来修改源站；或者点击<strong>删除</strong>链接来删除源站。
   - 要添加新源站，请点击<strong>添加新源站</strong>链接，然后在以下对话框中填写字段。必填字段以星号（*）标示。

<p align="center"><img src="/docs/resources/images/edge-configurations/property-origins.png" width="650"></p>

<p align="center"><img src="/docs/resources/images/edge-configurations/property-add-origin.png" alt="Upload Certificate Version" width="650"></p>

| **字段**             | **说明**                                       |
| ---------------------- | ----------------------------------------------------- |
| 自动检测            | 此按钮仅在创建新加速项目时出现。点击此按钮时，CDN Pro 会尝试解析您为加速项目输入的加速域名的 IP 地址。解析结果可能是也可能不是您要使用的源站。请仔细核对结果。|
| 源站名称            | 用于标识此源站的名称。[边缘逻辑](</docs/edge-logic/intro.md>)中的 [`origin_pass` 指令](</docs/edge-logic/supported-directives.md#origin_pass>)使用此名称来引用此源站。|
| 服务器                | 输入主源站服务器的域名或 IP 地址以及端口号。<p></p><p>点击**验证**以确认服务器信息正确且可访问。</p><p>要添加更多服务器，请点击**添加 +** 链接。要删除服务器，请点击**删除**链接。</p><p>如果您添加了多个服务器，CDN Pro 会将源站请求平均分配到这些服务器。要将更多请求定向到特定服务器，请在**权重**字段中输入百分比值。例如，要让 80% 的源站请求定向到 "heavy_duty.server.com"、20% 定向到 "light_duty.server.com"，请为 "heavy_duty.server.com" 分配权重 4，为 "light_duty.server.com" 分配权重 1。</p>|
| 备服务器         | 当所有主服务器都不可访问时使用的备用源站服务器。点击**添加 +**，以与主服务器相同的方式指定备用服务器。|
|| **高级设置**                                                         |
| 支持协议   | 源站服务器支持的协议。可选值： <ul><li><strong>HTTP</strong> = 仅使用 HTTP。<li><strong>HTTPS</strong> = 仅使用 HTTPS。<li><strong>全部</strong> = 同时使用 HTTP 和 HTTPS。（*默认*）</ul>|
| 验证源站证书        | 指定 CDN Pro 是否应验证源站服务器上的 TLS 证书。可选值：<ul><li><strong>是</strong> = 执行后端验证。<li><strong>否</strong> = 不执行后端验证。（*默认*）</ul>|
| 鉴权证书        |选择要用于向源站服务器进行身份验证的证书。与其他证书一样，该证书必须先[上传](</docs/portal/certificates/creating-certificates.md#上传一本已有证书>)，然后[部署](</docs/portal/certificates/deploying-certificates.md>)。</ul>|
| Host请求头           | 输入 CDN Pro 用于访问源站的 `Host` 请求头值。访问 HTTPS 源站时，该值还会用作 SNI 服务器名。它应为有效的域名。您可以在此字段中指定 Nginx 变量。合法的变量名以 '$' 开头，后跟 3 到 60 个小写字母（a-z）。默认情况下，会透传客户端请求中 Host 请求头的值。|
| 直接连接     | 指定对于未缓存内容或不可缓存的请求，CDN Pro 边缘服务器应如何访问源站服务器。可选值：<ul><li><strong>不直连，使用父缓存</strong> = 始终连接到父级 CDN Pro 服务器。选择此项可最大限度地提高 CDN Pro 上的缓存命中率。<li><strong>自动选择</strong> = 根据性能和资源可用性，自动决定是直接访问源站还是连接到父级 CDN Pro 服务器。（*默认*）<li><strong>总是直接连接</strong> = 边缘服务器始终直接访问源站服务器。</ul>|
| Keep-Alive超时     | HTTP keep-alive 的概念是使用单个 TCP 连接来发送和接收多个 HTTP 请求/响应，而不是为每一对请求/响应打开一个新连接。在此字段中，输入连接在超时之前可以保持打开的最长秒数。|
| 失败IP挂起   | 指定 CDN Pro 在将源站服务器的某个 IP 地址标记为“不可用”之前，尝试访问该地址的累计连续失败次数；该不可用状态持续的时间由“挂起时间”指定。如果所有服务器的IP都不可用，从源站请求内容将立即收到 "502 Bad Gateway" HTTP 响应。失败IP挂起的功能默认关闭。开启时，CDN Pro 默认会对一个源IP进行6次尝试，如果6次请求后仍然失败则将该IP挂起1秒。您可以<strong>开启</strong>此功能，通过以下2个子字段修改默认行为：<ul><li><strong>失败次数阈值</strong> = 设置 CDN Pro 在将源站服务器的某个 IP 地址标记为不可用之前，尝试访问该地址的累计连续失败次数。</ul></li><ul><li><strong>挂起时间</strong> = 设置将源站 IP 地址视为不可用的持续时间。</ul></li>| 
| IP选择算法 | 此设置控制当源站服务器的域名解析为多个 IP 地址时如何选择源站服务器。可选值： <ul><li><strong>轮询</strong> = 依次轮询源IP。这是默认设置，它会尝试将源站流量平均分配到所有IP。（*默认*）<li><strong>一致性哈希</strong> = 根据 URL 的哈希值分配源站流量。如果源站服务器有缓存，此选项应有助于提高命中率。<li><strong>性能优先</strong> = 根据网络质量选择源IP。当源站IP在地理上分散（例如另一个 CDN）时，此选项应有助于确保稳定的性能。</ul>|
| 鉴权方法        | 为您的源站对象存储启用身份验证。可选值：<ul><li><strong>无</strong> = 不进行身份验证。（*默认*） <br><li><strong>AWS S3</strong> = 使用 AWS Signature Version 4（V4）算法启用身份验证。尽管名称为“AWS S3”，此鉴权方法并不限于 Amazon S3 服务，而是适用于任何支持 AWS V4 签名的云对象存储。如果选择此项，您需要提供以下附加信息来访问对象存储桶：<ul><li><strong>地区</strong> = 如果您的对象存储位于 AWS S3，请从下拉列表中选择一个[地区](<https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions>)。否则，请从下拉列表中选择<strong>自定义</strong>，然后手动输入地区标识。<li><strong>访问密钥</strong> = 输入用于向对象存储服务进行身份验证的访问密钥。<li><strong>密钥</strong> = 从下拉列表中选择一个[保密信息](</docs/portal/secrets/creating-secrets.md>)。所选保密信息以 <code>$SECRET(name)</code> 的形式引用。由于密钥属于敏感信息，必须将其存储为保密信息，不能以明文形式输入。必须先在保密信息中创建该密钥，然后才能在此处引用。</ul>|
| 启用Shield        | 启用 Shield。Shield 是一项高级功能，可在 CDN Pro 边缘服务器和源站之间提供额外的缓存层。Shield 可减少能够访问源站的服务器数量，并提高缓存命中率。如果您的源站服务器有 IP 访问控制列表，请调用此 [API](</zh/cdn/apidocs#operation/get-cdn-shields>) 接口获取源站 Shield 当前的 IP 地址，并添加您要使用的 Shield 的 IP 地址。如果 IP 地址有任何更改，您将通过电子邮件收到通知。如果您需要此功能，请联系 [{{title}} 支持团队](mailto:support@{{siteDomain}})。| 
| Shield               | 如果您启用了 Shield，请选择最适合源站的 Shield 位置。要使用位于中国大陆的 Shield，您的加速域名必须有 ICP 备案，并在[加速项目页面](</docs/portal/edge-configurations/creating-property.md#高级设置>)的**高级设置**中设置**有ICP备案**。更多信息，请联系 [{{title}} 支持团队](mailto:support@{{siteDomain}})。 | 

5. 点击**保存**按钮。
