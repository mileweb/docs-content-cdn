# 页面切换

当您第一次登录 CDN Pro 门户时，菜单和子菜单将出现在浏览器左侧窗格中，仪表板将出现在浏览器右侧的工作区中。

默认菜单列出了您可以执行的 CDN Pro 活动。

<p align=center><img src="/docs/resources/images/accessing-portal/side-menu.png" alt="navigation menu" width="300"></p>

## 仪表盘

仪表板是您登录 CDN Pro 门户时显示的默认页面。它包含了一份展示您近期通过 CDN Pro 进行加速的流量快照报表。您可以将鼠标悬停在各个数据点上以获取更详细的信息。例如：

<p align=center><img src="/docs/resources/images/accessing-portal/total-bandwidth.png" alt="total bandwidth" width="1000"></p>

通过仪表盘，您可以获取到：

- 所有加速项的流量、流量带宽和流量请求信息。
- 所有加速项的业务状态码信息。

每个报表下方的图例说明标记了报表的各项数据指标。单击图例说明中的某个数据指标可以将其从报表中移除。再次点击该指标， CDN Pro 将重新展示该指标数据。单击报表下方的**查看完整报告**， CDN Pro 将会展示具体的[报表页面](</docs/portal/reports.md>)，您可以在其中填入报告参数并查看在当前时间 5 分钟之前的报表数据，您可以在仪表板图表左上角的下拉列表中选择的报表类型（流量、流量带宽等）。

<p align=center><img src="/docs/resources/images/traffic-volume.png" alt="traffic volume" width="1000"></p>

## 报表查看
[报表查看页面](</docs/portal/reports.md>) 允许您生成以下报表:

- 您的加速域名的流量和带宽。
- 访问您的加速项的客户请求数。
- 通过 CDN Pro 进行加速后的各业务 HTTP 状态码以及比例。
- 请求 URL 、请求时间、客户端 IP 地址、客户端 UA 请求头以及响应正文的大小。

## 边缘配置

在 CDN Pro 中，您可以通过定义 [加速项](</docs/portal/edge-configurations/managing-properties.md>) 来配置边缘服务器的行为。创建一个加速项的过程与开发其他软件非常相似。您可以创建和编辑加速项，然后验证、测试、部署和升级它——所有的这些操作都可以从 CDN Pro 门户页面上方便地完成。 **边缘配置** 还提供了一个页面，您可以在其中创建和管理与 CDNetworks 运营人员共享的 [秘钥](</docs/portal/secrets/overview.md>)，以便 CDN 配置工作。


## 流量管理

CDN Pro 通过 [流量管理页面](</docs/portal/traffic-management/overview.md>) 让您全方位掌控为您服务的全球服务负载平衡 (GSLB) 系统。您可以在该页面上创建边缘域名，这些边缘域名可被用于您的加速域名的 CNAME 映射记录。客户端的解析请求将按照您在边缘域名上设置的规则来获取到对应的解析记录。


## 证书管理

[证书页面页面](</docs/portal/certificates/overview.md>) 允许您管理 TLS 相关证书。

## 内容管理

[内容管理页面](</docs/portal/content-management.md>) 允许您创建推送请求并查阅以前提交的推送任务状态。推送请求是用于在缓存内容过期之前刷新 CDN Pro 上的缓存内容，以便更快地向最终用户提供最新版本内容。


## 异步任务

在异步任务页面，您可以查看之前提交的所有[配置校验](</docs/portal/tasks/validations.md>)和[配置部署/配置卸载](</docs/portal/tasks/deployments.md>)的状态） 请求。此类异步任务可能需要几分钟才能完成。
