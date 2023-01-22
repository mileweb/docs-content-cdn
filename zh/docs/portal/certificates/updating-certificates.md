# 更新证书

在 CDN Pro 系统中每个证书都是版本化的，每个版本一旦保存就不可编辑。您可以将每个版本部署到演练和生产环境中。在同一时间，每个环境中只允许部署一个版本。部署新版本会自动替换旧版本。因此，如果您需要在生产环境中更新即将过期的证书，请创建该证书的新版本并将其部署到生产以替换掉旧证书。在生产环境中使用旧证书版本的所有加速项都会自动选择新证书版本。

当生产中使用的证书接近其到期日期时，CDN Pro 会发送电子邮件通知。为方便起见，CDN Pro 支持通过 [Let's Encrypt](<https://letsencrypt.org/docs/challenge-types/> ) 来实现证书的 [自动更新](</docs/portal/certificates/auto-renewal.md>) ，因此您无需担心证书会过期。如果您更喜欢手动更新证书，请选择以下两个操作步骤之一。

## 如果您已经有一个带有私钥和链证书的新 CA 签名证书
1. 在左边菜单栏，单击 **证书** 按钮。
2. 选中目标证书名.
    <br><u>或者 </u></br>
  在 **操作** 列中，单击要编辑的证书的垂直省略号，然后选择 **编辑**。
3. 如果您需要更改证书名称，请将鼠标移至页面顶部证书名称的右侧。当铅笔图标出现时，单击它并输入新名称。完成后，单击新名称字段右下角的**√**。
4. 如果需要修改证书共享权限，您可以现在或在第 5 步之后编辑 **与下列客户共享** 设置。
5. 单击 **创建新版本**.
<p align="center"><img src="/docs/resources/images/certificates/certificate-versions.png" alt="Upload Certificate Version" width="700"></p>

5. 将 **创建方法** 设置为 **上传**。然后上传私钥、证书和 CA 证书文件。在确认弹出窗口中单击**保存版本**，然后单击**确定**。
<p align="center"><img src="/docs/resources/images/certificates/certificate-versions-upload.png" alt="Upload Certificate Version" width="700"></p>

6. 在证书详情页面，单击 <strong>部署</strong> 按钮，然后在 <strong>部署目标</strong> 消息框中选择 <strong>生产环境</strong> 将此新版本部署到生产上。<br>
<strong>注意：</strong> 要在部署之前查看证书的部署历史，请单击 <strong>部署历史</strong> 按钮。</br></br>
1. 如果您需要立即部署证书，请点击 <strong>立即部署</strong> 按钮。如果您需要稍后再部署它，请点击 <strong>添加到待命任务</strong> 来将此证书版本的部署存放到 [待命列表](</docs/portal/tasks/standby-tasks.md>)中。
<p align="center"><img src="/docs/resources/images/certificates/certificate-deployment.png" alt="Upload Certificate Version" width="450"></p>

## 如果您需要 CSR 来向 CA 机构申请新证书

如果贵公司的安全策略要求新证书具有与过期证书不同的新私钥，请执行以下过程以创建自签名版本。否则，您可以跳过步骤 5 和 6。

1. 在左边菜单栏，单击 **证书** 按钮。
2. 选中目标证书名。
3. 如果您需要更改证书名称，请将鼠标移至页面顶部证书名称的右侧。当铅笔图标出现时，单击它并输入新名称。完成后，单击新名称字段右下角的**√**。
4. 如果需要修改证书共享权限，您可以现在或在第 5 步之后编辑 **与下列客户共享** 设置。
5. 单击 **创建新版本**.
6. 将 **创建方法** 设置为 **自动生成**。然后填写必填字段（请参阅 [详细信息](</docs/portal/certificates/creating-certificates.md#auto-genating-a-self-signed-certificate>)）并单击**保存**。
<p align="center"><img src="/docs/resources/images/certificates/certificate-versions-autogenerate.png" alt="Certificate New Self-Signed Version" width="700"></p>

7. 单击“证书详细信息”页面顶部的**下载 CSR** 按钮以便从最新版本上生成 CSR。
8. 将下载的CSR发送给 CA 申请新的证书。
9. 当您收到新的 CA 签名证书时，返回到相同的证书详细信息页面并单击**创建新版本**。
10. 将 **创建方法** 设置为 **上传**，上传新证书和链证书（可选）。单击**保存**。不必担心私钥，因为它将与上一个版本相同。
11. 在证书详情页面，单击 **Deployment** 按钮，然后在 **部署目标** 消息框中选择 **生产环境** 将此新版本部署到生产上。<br><br><strong>注意：</strong> 要在部署之前查看证书的部署历史，请单击 **部署历史** 按钮。</br></br>
12. 如果您需要立即部署证书，请点击 **立即部署**。如果您需要稍后再部署它，请点击 **添加到待命任务** 来将此证书版本的部署存放到 [待命列表](</docs/portal/tasks/standby-tasks.md>)。</br>
**注意**: 只有证书的所有者才有权限修改证书。
