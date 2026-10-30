## 加速 AWS S3 存储桶

在本示例中，假设我们有一个域名 `waytoo.digital`，并且我们想在子域名 `files.waytoo.digital` 上设置一个 AWS 存储桶，以便用户可以通过该子域名访问存储桶中的数据。
我们先创建并访问公有 AWS 存储桶，然后再介绍如何访问私有 AWS 存储桶。

### 设置 S3 存储桶

1. 登录 AWS S3 控制台并创建一个新存储桶。此时会出现创建向导。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-bucket.png" alt="create bucket" width="720"></p>

2. 输入以下存储桶名称（必须是符合 DNS 要求的前缀）：**files-waytoo-digital**

3. 点击**下一步**。

4. 跳过**配置选项**。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-bucket-set-permissions.png" alt="create bucket" width="720"></p>

5. 现在先接受默认的**阻止所有公共访问**权限；否则 AWS 会阻止您点击**下一步**。

6. 点击**下一步**，然后点击**保存**。您的存储桶已创建。

7. 为访问存储桶内容分配适当的权限。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/modify-bucket-settings-permissions.png" alt="create bucket" width="720"></p>

8. 取消勾选**阻止所有公共访问**复选框，然后点击**保存**。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/modify-bucket-settings-cors.png" alt="create bucket" width="720"></p>

9. 将以下代码复制并粘贴到 CORS 配置编辑器中，以设置跨源资源共享（CORS）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>Authorization</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

10. 向存储桶上传一个文件以测试我们的设置，并为上传的对象授予公共读取权限。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/bucket-upload-file.png" alt="create bucket" width="720"></p>

11. 点击存储桶中上传的文件以查看上传对象的 URL。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/bucket-uploaded-file-info.png" alt="create bucket" width="500"></p>

Amazon S3 使用以下 URI 语法访问存储桶名称：`<BUCKET_NAME>.<REGION>.amazonaws.com`。Amazon S3 返回的是 `s3` 而不是区域。这个域名将作为源站地址在 CDN Pro 上配置。

### 设置 CDN Pro

登录 CDN Pro [管理控制台](https://console.{{siteDomain}}/cas/login?lang=zh)。

#### 调度管理
1. 在调度管理页面，创建一个调度域名。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-edge-hostname.png" alt="create bucket" width="720"></p>

2. 创建调度域名后，在终端中测试验证调度域名已部署生效：

```bash
$ping files-waytoo-digital.qtlcdn.com
PING files-waytoo-digital.qtlcdn.com (14.0.119.186): 56 data bytes
64 bytes from 14.0.119.186: icmp_seq=0 ttl=56 time=3.775 ms
64 bytes from 14.0.119.186: icmp_seq=1 ttl=56 time=3.953 ms
64 bytes from 14.0.119.186: icmp_seq=2 ttl=56 time=3.739 ms
64 bytes from 14.0.119.186: icmp_seq=3 ttl=56 time=4.733 ms
```

#### 服务端证书
现在让我们生成一个服务端证书，并使用 Let's Encrypt 自动更新证书。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-certificate.png" alt="create bucket" width="600"></p>

1. 点击左侧菜单栏的**证书**，选择**服务端证书**。在证书页面，点击**创建证书**。
2. 填写**证书名称**和**证书说明**字段。
3. 将**自动更新**设置为 **Let's Encrypt**。
4. 点击**“自动生成”**单选框，然后在**通用名**和 **SAN** 字段中输入 **files.waytoo.digital**。
5. 点击**保存**创建证书。

#### 将证书部署到演练环境
保存了服务端证书后还需要部署。我们将先把它部署到演练环境进行测试，然后再发布到生产环境。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/deploy-to-staging.png" alt="create bucket" width="500"></p>

#### 边缘配置
1. 在边缘配置页面，点击**创建加速项目**。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-property.png" alt="create bucket" width="720"></p>

2. 输入**加速项目名称**、**描述**，以及初始版本的**版本描述**。

3. 在**加速域名**字段中输入至少一个加速域名。CDN 服务器通过将客户端请求头 `Host` 的值与*加速域名*字段值进行匹配来识别和处理来自客户端的请求。

4. 在**源站**下，点击**添加新源站**，将我们的 S3 存储桶添加为源站。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-property-origin.png" alt="create bucket" width="720"></p>

5. **源站名称**将在边缘逻辑（在我们的示例中，我们将它命名为 `aws_origin`）中引用。在**服务器**字段中，添加我们的 S3 存储桶域名：`files-waytoo-digital.s3.amazonaws.com`。

6. 点击**验证**以确保能正常访问源站。

7. 展开**高级设置**，然后在 **Host请求头**字段中输入源站域名 `files-waytoo-digital.s3.amazonaws.com`。CDN 服务器的回源请求将携带这个 `Host` 请亲头。这是必要的步骤，如果未填写，则回源请求的 Host 将是 `files.waytoo.digital`，源站收到请求时将返回 `Bucket not found` 错误。

8. 点击**保存**。

我们已经创建了一个源站。接下来，我们将创建边缘逻辑配置。

9. 点击**向导**按钮。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-property-wizard.png" alt="create bucket" width="600"></p>

10. 选择之前配置的源站，将缓存时间设置为 3600 分钟，并忽略来自源站的 cache-control 头，以便在边缘处理缓存行为。

11. 点击**“确定”**。系统会生成以下边缘逻辑脚本：

 ```nginx
        location / { #This is the default location.
            origin_pass aws_origin;
            proxy_cache_valid 3600m; #200, 301, and 302 responses will be cached for 3600m
            proxy_ignore_headers Cache-Control Expires; #This will force the cache server to ignore cache control headers from origin.
        }
 ```

您可以根据需要编辑此脚本，自定义边缘逻辑。

以上步骤已经完成了加速项目大部分的配置，接下来我们还需要绑定服务端证书。

12. 展开 **TLS设置**标签。在 **TLS证书**字段中，点选我们已创建并部署到演练环境的证书名称。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-property-tls.png" alt="create bucket" width="600"></p>

13. 点击<strong>保存并验证</strong>以提交配置，并验证配置的语法准确性。

当配置验证通过后，就可以将加速项目部署到演练环境进行测试。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/deploy-to-staging.png" alt="create bucket" width="500"></p>

#### 测试（演练环境）

要测试演练环境部署，您需要知道演练服务器的 IP 地址：

```bash
$ dig staging.qtlcdn.com
...
;; ANSWER SECTION:
staging.qtlcdn.com.    59  IN  A   163.171.228.89
staging.qtlcdn.com.    59  IN  A   163.171.230.47
...
```

选择一个 IP 地址发起请求，测试我们部署的配置是否正常。

```bash
❯ curl -I https://files.waytoo.digital/file_1m.bin --resolve files.waytoo.digital:443:163.171.228.89
HTTP/2 200
content-type: application/octet-stream
content-length: 1024000
x-amz-id-2: eQa0SXtgPk3A+jASSyarZLw6FgFtXg+7m+Br6Xr/YBXQ0aot/dBTKBf5QSoE0x8TwzqBKXJ+MBw=
x-amz-request-id: 4Z0SEN8YER8PBYAG
date: Fri, 16 Oct 2020 03:30:16 GMT
last-modified: Fri, 16 Oct 2020 02:36:45 GMT
etag: "fcaebe20d9b3e73086dcb0ba5def8e52"
x-cache-status: MISS
x-ws-request-id: 4c394e8fd8cc514c5f1e437ac3daf969
x-via: 2.0 na-us-iad1-cache-0003 [MISS 200]
age: 19
server: nginx
accept-ranges: bytes
```

再次发起请求，我们会看到缓存状态为 **HIT**。

```bash
❯ curl -I https://files.waytoo.digital/file_1m.bin --resolve files.waytoo.digital:443:163.171.228.89
HTTP/2 200
content-type: application/octet-stream
content-length: 1024000
x-amz-id-2: eQa0SXtgPk3A+jASSyarZLw6FgFtXg+7m+Br6Xr/YBXQ0aot/dBTKBf5QSoE0x8TwzqBKXJ+MBw=
x-amz-request-id: 4Z0SEN8YER8PBYAG
date: Fri, 16 Oct 2020 03:30:16 GMT
last-modified: Fri, 16 Oct 2020 02:36:45 GMT
etag: "fcaebe20d9b3e73086dcb0ba5def8e52"
x-cache-status: HIT
x-ws-request-id: dfa55f3549ee4fd0824472f83d06c6c5
x-via: 2.0 na-us-iad1-cache-0003 [HIT]
age: 13
server: nginx
accept-ranges: bytes
```

经测试符合预期后，让我们将加速项目部署到生产环境。

#### 部署到生产环境

要将配置部署到生产环境，请使用证书和边缘配置页面。

1. 首先通过点击**证书**并选择**服务端证书**进入证书页面。然后打开证书，从菜单中选择**部署**，将部署目标设置为**生产**，然后点击**立即部署**。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/deploy-to-production.png" alt="create bucket" width="500"></p>

2. 进入边缘配置页面。然后打开加速项目，从菜单中选择**部署**，将部署目标设置为**生产**，然后点击**立即部署**。

#### 测试（生产环境）

在将加速项目部署到生产环境之后，我们应该创建或更改 DNS 的 CNAME 记录，将加速域名指向我们之前创建的调度域名（`files-waytoo-digital.qtlcdn.com`）。

```bash
❯ dig files.waytoo.digital
...
;; ANSWER SECTION:
files.waytoo.digital.	299	IN	CNAME	files-waytoo-digital.qtlcdn.com.
files-waytoo-digital.qtlcdn.com. 19 IN	A	14.0.119.186
...
```

在更改 DNS 记录之前，您可以指定生产环境的某个 IP 地址发起请求，测试配置是否正常：

```bash
❯ curl -I https://files.waytoo.digital/file_1m.bin --resolve files.waytoo.digital:443:14.0.119.186
HTTP/2 200
content-type: application/octet-stream
content-length: 1024000
x-amz-id-2: gdpoBl4Uk1FbJ6i8tMHXYZRcPxAAR9NTY/EziqHr6Kbrni887rU+suUINzNof4sltrCRCq4I4TE=
x-amz-request-id: C30F30F6BE2B081E
date: Fri, 16 Oct 2020 03:21:14 GMT
last-modified: Fri, 16 Oct 2020 02:36:45 GMT
etag: "fcaebe20d9b3e73086dcb0ba5def8e52"
x-cache-status: HIT
x-ws-request-id: 16a3be4dfdc381e44b90c86bec087f47
x-via: 2.0 as-kr-icn1-cache-0003 [HIT]
age: 5575
server: nginx
accept-ranges: bytes
```

恭喜！您已经使用 **CDN Pro** 加速了 Amazon S3 存储桶！

### 访问私有存储桶

现在让我们阻止对存储桶的公共访问，并设置 CDN Pro 回源鉴权。

#### 阻止公共访问

之前我们将存储桶设为公有。现在，在存储桶设置中，我们将权限恢复为默认设置，使存储桶改回为私有。

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/bucket-permissions-private.png" alt="create bucket" width="720"></p>

#### 启用回源鉴权

现在我们可以编辑加速项目，设置 `S3 源站鉴权`。在此之前，请确保您已准备好以下信息：

- AWS 存储桶地区
- AWS 访问密钥
- AWS 密钥

1. 进入边缘配置页面，选择您之前配置的加速项目：

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/modify-property-clone.png" alt="create bucket" width="720"></p>

2. 点击**克隆**创建一个新的配置版本。

3. 在**源站**字段的右侧，点击**编辑**。

4. 展开**高级设置**。

5. 将**鉴权方法**设置为 **AWS S3**，并按如下方式填写必填字段：

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/modify-origin-auth.jpg" alt="create bucket" width="600"></p>

6. 点击**保存**，然后将新版本部署到演练环境。然后发起测试请求，验证配置是否正常。

```bash
curl -I https://files.waytoo.digital/file_1m.bin --resolve files.waytoo.digital:443:163.171.228.89
HTTP/2 200
content-type: application/octet-stream
content-length: 1024000
x-amz-id-2: oTixActu2B9rtfEvOUDkmelQxPIgFYfRdC4T950YuXL/tv7Zu+pSHgkCXiAuouaRpjLpqTyf3xE=
x-amz-request-id: AQ7S4P0H1K0H0R9G
date: Fri, 16 Oct 2020 09:04:34 GMT
last-modified: Fri, 16 Oct 2020 09:04:10 GMT
etag: "fcaebe20d9b3e73086dcb0ba5def8e52"
x-cache-status: HIT
x-ws-request-id: 105b10794ee438213fac428c0ef60379
x-via: 2.0 na-us-iad1-cache-0003 [HIT]
age: 16
server: nginx
accept-ranges: bytes
```

就这样！现在您可以将加速项目部署到生产环境了。
