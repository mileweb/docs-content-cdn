# 证书功能概览

数字证书允许您的网站在 Internet 网络上通过使用公钥基础设施 (PKI) 安全地与客户端交换数据。证书可以加密网站与其访问者之间的通信。 CDN Pro 支持常规、主题备用域名 (SAN) 和通配符证书。 CDN Pro 还支持 RSA 和 ECDSA 公钥算法。您可以上传现有证书，生成自签名证书，并通过 Let's Encrypt 来自动续订即将到期的证书。

## 证书页面

证书是由证书页面进行管理。要显示此页面，请单击左窗格中的 **证书** 按钮。所有证书都在 CDN Pro 中进行了版本控制。版本保存后则该版本无法进行更改。如果您需要更新即将到期的证书，您只需创建一个新版本并部署它来替换旧的版本。在任何时候，每个证书只有一个版本可以部署到演练或生产环境中。

证书页面上的 **所有权** 字段用于显示证书是由您创建还是由 CDN Pro 系统中的上游代理商客户共享给您的。

- **我自己** 如果证书是由您的账号创建的，则会展示。
- **父级** 如果证书是由 CDN Pro 系统中的上游代理商客户共享给您的，则会展示。

下图显示了页面上的关键字段，图后的表格对其进行了说明。

<p align="center"><img src="/docs/resources/images/certificates/certificates-w-numbers.png" alt="Certificate List" width="900"></p>

| **字段**   | **描述**                                                                                           |
| :----------: | --------------------------------------------------------------------------------------------------------- |
| 1            | 一个搜索框，您可以输入关键字来过滤证书列表。                               |
| 2            | 可供您使用的所有证书列表。单击 **+** 符号来获取有关证书的详细信息。  |
| 3            | 按自动续订、演练环境版本和生产环境版本过滤证书的图标。                      |
| 4            | 用于对每个证书执行操作的下拉列表。                                                      |
| 5            | [创建新证书](</docs/portal/certificates/creating-certificates.md>) 的按钮            |



## 证书相关操作
每个证书在 **操作** 列中都有一个垂直省略号。单击省略号会显示可以对所选证书执行的可用操作。
<p align="center"><img src="/docs/resources/images/certificates/certificate-actions.png" alt="Certificate Actions" width="900"></p>
可执行的操作有：

- **编辑**: [更新](</docs/portal/certificates/updating-certificates.md>) 并且/或者部署选中的证书。
- **下载CSR**: 从所选证书的最新版本上下载证书签名请求 (CSR)。
- **删除**:  [删除](</docs/portal/certificates/deleting-certificate.md>) 证书。如果该证书已部署到了演练或者生产环境，您需要先将其卸载。
- **从演练环境卸载**: 从演练环境上 [卸载](</docs/portal/certificates/deploying-certificates.md>) 该证书。
- **从生产环境卸载**: 从生产环境上 [卸载](</docs/portal/certificates/deploying-certificates.md>) 该证书。
- **部署历史**: 显示所选证书的部署历史。

