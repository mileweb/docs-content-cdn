# 证书功能概览

CDN Pro 支持上传以下2种证书：
- 服务端证书：用于网站与客户端之间的加密通信，让您的网站通过公共密钥基础设施（PKI）在互联网上安全地交换数据。
- CA证书：用于验证客户端。当您开启了客户端验证功能，CDN Pro 服务器在处理客户端请求时，将使用您上传的CA证书验证客户端证书。 

## 服务端证书

CDN Pro 支持单域名，多域名和泛域名证书。支持 RSA 和 ECDSA 加密算法的证书。您可以上传您已有的证书，也可以生成自签名证书然后开启自动续签功能由 Let's Encrypt 自动签发证书。

### 服务端证书页面

服务端证书在证书页面进行管理。要显示此页面，请点击左边菜单栏中的 **证书** 菜单，选择 **服务端证书**。所有证书都在 CDN Pro 中进行了版本控制。版本保存后则该版本无法进行更改。如果您需要更新即将到期的证书，您只需创建一个新版本并部署它来替换旧的版本。在同一时间，每个证书只有一个版本可以部署到演练或生产环境中。

证书页面上的 **所有权** 字段用于显示证书是由您创建还是由 CDN Pro 系统中的上游代理商客户共享给您的。

- **我自己** 表示证书是由您的账号创建。
- **父级** 表示证书是由 CDN Pro 系统中的上游代理商客户共享。

下图显示了页面上的关键字段，图后的表格对其进行了说明。

<p align="center"><img src="/docs/resources/images/certificates/certificates-w-numbers.png" alt="Certificate List" width="900"></p>

| **字段**   | **描述**                                                                                           |
| :----------: | --------------------------------------------------------------------------------------------------------- |
| 1            | 一个搜索框，您可以输入关键字来过滤证书列表。                               |
| 2            | 可供您使用的所有证书列表。点击 **+** 符号来获取有关证书的详细信息。  |
| 3            | 按自动续订、演练环境版本和生产环境版本过滤证书的图标。                      |
| 4            | 用于对每个证书执行操作的下拉列表。                                                      |
| 5            | [创建新证书](</docs/portal/certificates/creating-certificates.md>) 的按钮。            |

### 证书相关操作
每个证书在 **操作** 列中都有一个垂直省略号。点击省略号会显示可以对所选证书执行的可用操作。
<p align="center"><img src="/docs/resources/images/certificates/certificate-actions.png" alt="Certificate Actions" width="900"></p>
可执行的操作有：

- **编辑**: [更新](</docs/portal/certificates/updating-certificates.md>) 并且/或者部署选中的证书。
- **下载CSR**: 从所选证书的最新版本上下载证书签名请求 (CSR)。
- **删除**:  [删除](</docs/portal/certificates/deleting-certificate.md>) 证书。如果该证书已部署到了演练或者生产环境，您需要先将其卸载。
- **从演练环境卸载**: 从演练环境上 [卸载](</docs/portal/certificates/deploying-certificates.md>) 该证书。
- **从生产环境卸载**: 从生产环境上 [卸载](</docs/portal/certificates/deploying-certificates.md>) 该证书。
- **部署历史**: 显示所选证书的部署历史。

## CA证书

CA证书用于验证客户端。

### CA证书页面
CA证书在CA证书页面进行管理。要显示此页面，请点击左边菜单栏中的 **证书** 菜单，选择 **CA证书**。所有证书都在 CDN Pro 中进行了版本控制。版本保存后则该版本无法进行更改。如果您需要更新即将到期的证书，您只需创建一个新版本并部署它来替换旧的版本。在同一时间，每个证书只有一个版本可以部署到演练或生产环境中。

证书页面上的 **所有权** 字段用于显示证书是由您创建还是由 CDN Pro 系统中的上游代理商客户共享给您的。

- **我自己** 表示证书是由您的账号创建。
- **父级** 表示证书是由 CDN Pro 系统中的上游代理商客户共享。

下图显示了页面上的关键字段，图后的表格对其进行了说明。

<p align="center"><img src="/docs/resources/images/certificates/cacertificates-w-numbers.png" alt="CA Certificate List" width="900"></p>

| **字段**   | **描述**                                                                                           |
| :----------: | --------------------------------------------------------------------------------------------------------- |
| 1            | 一个搜索框，您可以输入关键字来过滤证书列表。                               |
| 2            | 可供您使用的所有证书列表。点击 **+** 符号来获取有关证书的详细信息。  |
| 3            | 按演练环境版本和生产环境版本过滤证书的图标。                       |
| 4            | 用于对每个证书执行操作的下拉列表。                                                      |
| 5            | [创建新证书](</docs/portal/certificates/creating-cacertificates.md>) 的按钮。            |



### 证书相关操作
每个证书在 **操作** 列中都有一个垂直省略号。点击省略号会显示可以对所选证书执行的可用操作。
<!--<p align="center"><img src="/docs/resources/images/certificates/certificate-actions.png" alt="Certificate Actions" width="900"></p>-->
可执行的操作有：

- **编辑**: [更新](</docs/portal/certificates/updating-cacertificates.md>) 并且/或者部署选中的证书。
- **下载CSR**: 从所选证书的最新版本上下载证书签名请求 (CSR)。
- **删除**:  [删除](</docs/portal/certificates/deleting-certificate.md>) 证书。如果该证书已部署到了演练或者生产环境，您需要先将其卸载。
- **从演练环境卸载**: 从演练环境上 [卸载](</docs/portal/certificates/deploying-certificates.md>) 该证书。
- **从生产环境卸载**: 从生产环境上 [卸载](</docs/portal/certificates/deploying-certificates.md>) 该证书。
- **部署历史**: 显示所选证书的部署历史。