# CDN Pro 用户导航

当您第一次登录 CDN Pro 门户时，菜单和子菜单将出现在浏览器左侧窗格中，仪表板将出现在浏览器右侧的工作区中。

默认菜单列出了您可以执行的 CDN Pro 活动。

<p align=center><img src="/docs/resources/images/accessing-portal/side-menu.png" alt="navigation menu" width="300"></p>

## 仪表盘

仪表板是您登录 CDN Pro 门户时显示的默认页面。它包含了一份展示您近期通过 CDN Pro 进行加速的流量快照图表。您可以将鼠标悬停在各个数据点上以获取更详细的信息。例如：

<p align=center><img src="/docs/resources/images/accessing-portal/total-bandwidth.png" alt="total bandwidth" width="1000"></p>

通过仪表盘，您可以获取到：

- 所有加速项的流量、流量带宽和流量请求信息。
- 所有加速项的业务状态码信息。

每个报表下方的图例说明标记了报表的各项数据指标。单击图例说明中的某个数据指标可以将其从报表中移除。再次点击该指标， CDN Pro 将重新展示该指标。单击报表下方的**查看完整报告**， CDN Pro 将会展示具体的[报告页面](</docs/portal/reports.md>)，您可以在其中填入报告参数并查看在当前时间 5 分钟之前的报表数据，您可以在仪表板图表左上角的下拉列表中选择的报表类型（流量、流量带宽等）。

<p align=center><img src="/docs/resources/images/traffic-volume.png" alt="traffic volume" width="1000"></p>

## 报表
[报表页面](</docs/portal/reports.md>) 允许您生成以下报表:

- 您的加速域名的流量和带宽。
- 访问您的加速项的客户请求数。
- 通过 CDN Pro 进行加速后的各业务 HTTP 状态码以及比例。
- 请求 URL 、请求时间、客户端 IP 地址、客户端 UA 请求头以及响应正文的大小。

## 边缘配置

In CDN Pro, you configure the edge servers' behavior by defining [Properties](</docs/portal/edge-configurations/managing-properties.md>). The process of developing a property is very much like developing any other software. You can create and edit a property, and then validate, test, deploy, and upgrade it -- all conveniently from the CDN Pro portal. **Edge Configurations** also provides a page where you can create and manage a [secret](</docs/portal/secrets/overview.md>) that you share with CDNetworks in order for the CDN configuration to work.

## Traffic Management

CDN Pro gives you full control of its Global Service Load Balancing (GSLB) system through the [Traffic Management page](</docs/portal/traffic-management/overview.md>). Using this page, you create edge hostnames that will be used in CNAME records to map your service hostnames. The rules you specify for each edge hostname control where each end user's request is routed.

## Certificates

The [Certificates page](</docs/portal/certificates/overview.md>) allows you to manage certificates to be used with the TLS protocol.

## Content Management

The [Content Management page](</docs/portal/content-management.md>) allows you to create purge requests and check the status of previously submitted requests. A purge request is used to flush cached contents before they expire in order to make the updated version available to the end users sooner.

## Tasks

On the Tasks page, you can check the status of all previously submitted [validation](</docs/portal/tasks/validations.md>) and [deployment/undeployment](</docs/portal/tasks/deployments.md>) requests. Synchronous tasks can take a few minutes to finish.
