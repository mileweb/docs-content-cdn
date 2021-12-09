# 创建证书

目前有两种方式进行证书的创建: 

1. **自动生成自签名证书**. 如果您是通过证书签名请求 (CSR)来向证书颁发机构 (CA)申请证书，那么您可以使用此类方式。此方式将为您生成一份证书签名请求 (CSR) ，您可以下载该证书签名请求然后提交给证书颁发机构 (CA) 申请证书。当您收到 CA 签署的证书和证书链 (CA) 时，您可以将它们作为证书的新版本上传。

2. **上传私钥、证书和链证书**.

## 自动生成自签名证书

以下过程描述了如何生成自签名证书。在将正式证书部署到生产环境之前，自签名证书可用于测试目的或内部使用。如果您需要一份 CSR 以便从 CA 获取签名证书，请先创建自签名证书。


1. 在左侧菜单栏，点击 **证书**.
2. 在证书页面的右上角, 点击 **创建证书** 按钮. 

<p align=center><img src="/docs/resources/images/certificates/certificates-wo-numbers.png" alt="create new cert button menu" width="900"></p>

填写“创建证书”表单顶部的字段。

3. 填写“创建证书”页面顶部的字段。 在 **创建方法** 选项中，配置  **自动生成** 并完成附加字段的信息录入。必填字段用星号 (\*) 表示。

<p align=center><img src="/docs/resources/images/certificates/create-certificate-autogenerate.png" alt="auto generate cert" width="650"></p>

| **字段**|**描述**|
|-|-|
|| **创建证书页面的顶部字段**                                      |
|证书名称|输入可帮助您识别此证书的名称。|
|证书说明|添加有关此证书的说明。|
|自动更新|选择您是否希望 CDN Pro 通过 Let's Encrypt (**LE**) [自动更新证书](/docs/portal/certificates/auto-renewal.md) 。|
|与下列客户共享|此字段仅供代理商账号使用。它允许代理商选择他们想要共享证书的子客户。|
|创建方式|指定新增证书方式：是要上传已有的证书还是使用 CDN Pro 生成证书。|
|| **自动生成方式下所需字段**                                      |
|模板|使用模板中的设置填充表单字段。模板是常用设置的集合。在使用此选项之前，您必须至少保存一个模板（请参阅下面的第 4 步）。使用模板中的设置填充字段后，您可以在下面的字段中修改它们内容以满足您的实际要求，也可将当前设置保存在新模板中。|
|公钥算法|为该证书选择一个公钥算法：RSA2048 或 ECC256。|
|Common Name|输入要用于证书的公用名（可以是任何文本）。|
|SAN|输入一个或多个域名 (SAN)，这将是您希望此证书涵盖的域名。|
|国家|输入两个字母的国家名称 [ISO-3166 国家码](<https://www.iso.org/obp/ui/#search>) 。|
|State|输入State名称。|
|城市|输入城市名称。|
|街道|输入街道名称。|
|公司|输入公司名称。|
|部门|输入部门名称。|
|Email|输入邮箱地址。|
|注释|输入有关此初始证书版本的一些备注。|

4. To save these settings in a template that you can select at a later time using the **Template** drop-down list mentioned above, click the **Save as a Template** button. When the popup message appears, enter a name for the template and click **OK**. 
5. Click the **Save Certificate** button followed by **OK**.

Your certificate is saved and appears on the Certificates page. You can now use the certificate with any properties you create, and deploy it to staging and production environments. You can also download the CSR to apply for a signed certificate from a CA, and then upload it to create a [new version](</docs/portal/certificates/updating-certificates.md>) of this certificate.

## Uploading an Existing Certificate

If you already have a certificate with the private key and the CA chain certificate, you can upload them so they can be used by properties. Before performing the following procedure, make sure the certificate and associated files are in Privacy Enhanced Mail (**PEM**) format. The files' content should be plain text and begins with five equals signs (`=====`).

To upload the files as a new certificate:

1. In the left pane, click **Certificates**.<br>
2. At the top right of the Certificates page, click the **Create Certificate** button. 

<p align=center><img src="/docs/resources/images/certificates/certificates-wo-numbers.png" alt="Create new certi button" width="900"></p>

3. Complete the fields at the top of the Create a Certificate form (see the table above). Next to **Creation Method**, click  **Upload** and upload the private key, certificate, and chain certificate. Required fields are denoted by an asterisk (\*).
   
**Note:** Upload only the files you need to change on top of the current latest version.

<p align="center"><img src="/docs/resources/images/certificates/create-certificate-upload.png" alt="Upload Certificate" width="600"></p>

4. Click the **Save Certificate** button followed by **OK**. 

Your certificate is saved and can now be used with any properties you create. 
