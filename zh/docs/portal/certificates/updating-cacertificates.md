# 更新CA证书

在 CDN Pro 系统中每个证书都按版本管理，每个版本一旦保存就不可编辑。您可以将每个版本部署到演练和生产环境中。在同一时间，每个环境中只允许部署一个版本。部署新版本会自动替换旧版本。因此，如果您需要在生产环境中更新即将过期的证书，请创建该证书的新版本并将其部署到生产以替换掉旧证书。在生产环境中使用旧证书版本的所有加速项目都会自动选择新证书版本。

以下是更新CA证书的步骤指引：

1. 在左边菜单栏，点击 **证书** 菜单，选择 **CA证书**。
2. 点击目标证书的名称
    <br><u>或者 </u></br>
  在 **操作** 列中，点击要编辑的证书的垂直省略号，然后选择 **编辑**。
3. 如果您需要更改证书名称，请将鼠标移至页面顶部证书名称的右侧。当铅笔图标出现时，点击它并输入新名称。完成后，点击新名称字段右下角的**√**。
4. 如果需要修改证书共享权限，您可以现在或在第 5 步之后编辑 **与下列客户共享** 设置。
5. 点击 **创建新版本**。

<p align="center"><img src="/docs/resources/images/certificates/update-cacertificate.png" alt="Upload CA Certificate" width="700"></p>

6. 上传新的链证书文件。点击 **保存**，然后点击**确定**。

7. 点击<strong>部署</strong>按钮，然后选择部署证书到<strong>演练环境</strong> 或 <strong>生产环境</strong>。<br>

8. 如果您需要立即部署证书，请点击 <strong>立即部署</strong> 按钮。如果您需要稍后再部署它，请点击 <strong>添加到待命任务</strong> 来将此证书版本的部署存放到 [待命列表](</docs/portal/tasks/standby-tasks.md>)中。

<p align="center"><img src="/docs/resources/images/certificates/certificate-deployment.png" alt="Upload Certificate Version" width="450"></p>

