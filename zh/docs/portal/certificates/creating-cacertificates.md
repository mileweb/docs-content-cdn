# 创建CA证书

创建CA证书，用于验证客户端：

1. 在左边菜单栏，点击 **证书** 菜单，然后选择 **CA证书**。<br>
2. 在CA证书页面右上方，点击 **创建 CA 证书** 按钮。

<p align=center><img src="/docs/resources/images/certificates/cacertificates.png" alt="Create new CA certificate button" width="900"></p>

3. 在表单中填入证书基本信息，点击 Upload 上传链证书。必填字段用星号 (\*)进行了标注。


<p align="center"><img src="/docs/resources/images/certificates/create-cacertificate.png" alt="Create CA Certificate" width="600"></p>

4. 点击 **保存** 按钮。

CA证书创建完成，你可将CA证书用于加速项目中。使用方式为：在加速项目的配置页面中，在TLS设置下将 **验证客户端证书** 设置为“开启”或“可选”，然后在 **受信任的CA** 字段中选择您创建的CA证书。

