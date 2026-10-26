# 测试加速项目

在将加速项目部署到生产环境之前，我们建议您先测试并验证加速项目，以确保其按预期工作。CDN Pro 为此提供了专用的演练环境。要将加速项目部署到演练环境，请执行[部署或卸载加速项目](</docs/portal/edge-configurations/deploying-property.md>)中的步骤。

<strong>注意：</strong>您也可以使用[测试用例集](</docs/portal/edge-configurations/working-with-test-suites.md>)页面，测试已部署到演练环境和/或生产环境的加速项目。

## 在演练环境中测试加速项目

CDN Pro 提供了演练环境，供您在不影响生产环境的情况下测试加速项目配置。将测试流量发送到演练环境的服务器，是在流量进入生产环境之前确认其行为符合预期的一种方式。演练服务器可以在“加速项目”列表页中找到。将鼠标悬停在**演练版本**列标题旁边的图标上，即可看到一个弹出窗口，其中列出了演练环境的服务器。

<p align=center><img src="/docs/resources/images/edge-configurations/property-deployment-CH-1.jpg" alt="staging servers" width="400"></p>

您也可以通过调用我们的[演练环境服务器 API](</apidocs#operation/get-cdn-stagingServers>)获取当前的 IP 地址列表。

选择一个 IP 地址。其中的 ```location``` 字段表示演练服务器所在的国家或地区。如果您的加速域名已有 ICP备案，可以使用位于中国的 IP 地址。否则，请选择其他国家的 IP 地址，以避免出现 HTTP 451 'Unavailable for Legal Reasons'（因法律原因不可用）状态错误。

选定演练服务器的 IP 地址后，可使用以下任一方式将测试流量发送到演练环境：

- 修改 ```hosts``` 文件，将加速域名硬编码到某个演练服务器的 IP 地址。

  在 Windows 系统上，编辑 ```%SystemRoot%\System32\drivers\etc\hosts```

  在 Unix 系统上，编辑 ```/etc/hosts```

  例如：

```
163.171.84.5 cdnpro.mydomain.com
```
- 如果您使用 cURL 命令，可以使用 ```--connect-to``` 选项，将加速域名直接映射到 CDN Pro 演练服务器的 IP 地址。例如：
```bash
$ curl -v https://cdnpro.mydomain.com/index.html --connect-to ::163.171.84.5:443
```

注意：```--connect-to``` 选项从 cURL 7.49.0 版本开始引入。如果您使用的是更早的版本，请改用 ```--resolve``` 选项。
```bash
$ curl -v https://cdnpro.mydomain.com/index.html --resolve cdnpro.mydomain.com:443:163.171.84.5
```
