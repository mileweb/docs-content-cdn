# 通过 Let's Encrypt 自动更新证书

Let's Encrypt (LE) 是一个向公众颁发免费证书的证书颁发机构 (CA)。它提供了一套 API 和 CLI 工具来帮助您自动申请和更新证书。如果您希望证书涵盖一个或多个域名，您必须向 LE 证明您是所有目标域名的所有者。 LE 为您提供了多种方式（或“挑战”）来证明这个所有权。目前，CDN Pro 支持 “HTTP-01 挑战” 这种方式。要通过质询，您必须确保使用证书的所有域名都已（通过 CNAME 记录）指向 CDN Pro 边缘域名（CNAME）。否则，来自 LE 的一些所有权验证请求可能会失败。

如果要使用 CDN Pro 的 自动续订功能，您需要一个初始证书来“引导启动”该过程。如果您不希望您当前的服务被中断，请确保此初始证书是有效的，这样您的客户的浏览器就不会出现SSL握手错误。如果您没有可用证书，也可以使用 CDN Pro 来为目标域名生成自签名证书。证书的内容（例如公用名(Common name)或多域名信息 (SAN)）并不重要。自动续订过程将为新证书填上正确的内容。

以下是使用自动续订功能的操作过程：

1. [创建初始证书](</docs/portal/certificates/creating-certificates.md>).
2. 在“创建证书”表单上，将 **自动更新** 设置为 **Let's Encrypt**。您也可以在证书创建完成后，再到证书详情页面进行设置。

3. Create the property that contains the hostname(s) to be accelerated. In the **Advanced Settings** of the Property page, make sure **Certificate Renew Automation** is set to **Support**.
创建包含要加速域名的加速项目。在属性配置页面的**高级设置**中，确保**证书续签自动化**的值为**支持**。

**请注意:** 该加速项目中不能配置包含通配符的加速域名（泛域名），因为 HTTP-01 挑战不支持泛域名。

4. 将初始证书配置到加速项目的 TLS设置 -> TLS证书 中。
5. 将加速项目和证书部署到生产环境。
6. 更新您的 DNS 服务器，将此加速项目中的所有加速域名指向（CNAME） CDN Pro 边缘域名。如果您当前还没有边缘域名, 请参阅 [创建边缘域名](</docs/portal/traffic-management/creating-edge-hostname.md>).
7. 执行上述步骤后，如果初始证书在25天内即将失效，那么CDN Pro会在一小时内通过LE自动更新证书，更新完毕后您将收到有关续订成功或失败的通知。新证书的 SAN 将包含此加速项目中的所有主机名。