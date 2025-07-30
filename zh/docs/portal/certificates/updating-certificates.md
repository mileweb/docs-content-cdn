# 更新服务端证书

在 CDN Pro 系统中每个证书都按版本管理，每个版本一旦保存就不可编辑。您可以将每个版本部署到演练和生产环境中。在同一时间，每个环境中只允许部署一个版本。部署新版本会自动替换旧版本。因此，如果您需要在生产环境中更新即将过期的证书，请创建该证书的新版本并将其部署到生产以替换掉旧证书。在生产环境中使用旧证书版本的所有加速项目都会自动选择新证书版本。

当生产环境中使用的服务端证书接近其到期日期时，CDN Pro 会发送电子邮件通知。CDN Pro 支持通过 [Let's Encrypt](<https://letsencrypt.org/zh-cn/docs/challenge-types/> ) 来实现证书的 [自动更新](</docs/portal/certificates/auto-renewal.md>)。如果您开启了证书的自动更新功能，您无需担心证书过期。如果您更喜欢手动更新证书，请选择以下两种操作方式。

## 如果您已经从 CA 机构签发了新证书
1. 在左边菜单栏，点击 **证书** 菜单，选择 **服务端证书**。
2. 点击目标证书的名称
    <br><u>或者 </u></br>
  在 **操作** 列中，点击要编辑的证书的垂直省略号，然后选择 **编辑**。
3. 如果您需要更改证书名称，请将鼠标移至页面顶部证书名称的右侧。当铅笔图标出现时，点击它并输入新名称。完成后，点击新名称字段右下角的**√**。
4. 如果需要修改证书共享权限，您可以现在或在第 5 步之后编辑 **与下列客户共享** 设置。
5. 点击 **创建新版本**。
<p align="center"><img src="/docs/resources/images/certificates/certificate-versions.png" alt="Upload Certificate Version" width="700"></p>

6. 将 **创建方法** 设置为 **上传**。然后上传私钥、证书和 CA 证书文件。在确认弹出窗口中点击**保存**，然后点击**确定**。
<p align="center"><img src="/docs/resources/images/certificates/certificate-versions-upload.png" alt="Upload Certificate Version" width="700"></p>

7. 在证书详情页面，点击 <strong>部署</strong> 按钮，然后在 <strong>部署目标</strong> 消息框中选择 <strong>生产环境</strong> 将此新版本部署到生产环境上。<br>

8. 如果您需要立即部署证书，请点击 <strong>立即部署</strong> 按钮。如果您需要稍后再部署它，请点击 <strong>添加到待命任务</strong> 来将此证书版本的部署存放到 [待命列表](</docs/portal/tasks/standby-tasks.md>)中。
<p align="center"><img src="/docs/resources/images/certificates/certificate-deployment.png" alt="Upload Certificate Version" width="450"></p>

## 如果您需要 CSR 来向 CA 机构申请新证书

如果贵公司的安全策略要求新证书使用与即将过期的证书不同的私钥，请执行以下过程以创建自签名版本。否则，您可以跳过步骤 5 和 6。

1. 在左边菜单栏，点击 **证书** 菜单，选择 **服务端证书**。
2. 点击目标证书的名称，打开证书详情页面。
3. 如果您需要更改证书名称，请将鼠标移至页面顶部证书名称的右侧。当铅笔图标出现时，点击它并输入新名称。完成后，点击新名称字段右下角的**√**。
4. 如果需要修改证书共享权限，您可以现在或在第 5 步之后编辑 **与下列客户共享** 设置。
5. 点击 **创建新版本**。
6. 将 **创建方法** 设置为 **自动生成**。然后填写必填字段（请参阅 [详细信息](</docs/portal/certificates/creating-certificates.md#auto-genating-a-self-signed-certificate>)）并点击**保存**。
<p align="center"><img src="/docs/resources/images/certificates/certificate-versions-autogenerate.png" alt="Certificate New Self-Signed Version" width="700"></p>

7. 点击“证书详情”页面顶部的**下载 CSR** 按钮以便从最新版本上生成 CSR。
8. 将下载的CSR发送给 CA 申请新的证书。
9. 当您收到 CA 签发的新证书时，返回到相同的证书详情页面并点击**创建新版本**。
10. 将 **创建方法** 设置为 **上传**，上传新证书和链证书（可选）。点击**保存**。不必担心私钥，因为它将与上一个版本相同。
11. 在证书详情页面，点击 **部署** 按钮，然后在 **部署目标** 消息框中选择 **生产环境** 将此新版本部署到生产环境上。
12. 如果您需要立即部署证书，请点击 **立即部署**。如果您需要稍后再部署它，请点击 **添加到待命任务** 来将此证书版本的部署存放到 [待命列表](</docs/portal/tasks/standby-tasks.md>)。</br>

**注意**：只有证书的所有者才有权限修改证书。