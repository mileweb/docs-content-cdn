# 创建调度域名

在您的 DNS 提供商处创建一条指向调度域名的 CNAME 记录，即可将最终用户的请求引导到CDN Pro节点。创建调度域名时，您可以定义规则来决定 CDN Pro 如何处理来自不同**访客分区**的请求。访客分区是某个地理区域与一个或多个运营商的组合（例如 "中国大陆+移动"）。您可以控制如何处理来自不同分区的用户请求。您必须创建一条覆盖所有分区（所有地区和所有运营商）的规则，作为默认规则。

1. 在左侧导航栏中，点击**调度管理**。
2. 在屏幕右上角，点击**创建调度域名**按钮。
3. 填写“创建调度域名”表单中的字段。必填字段以星号（\*）标示。

<p align=center><img src="/docs/resources/images/traffic-management/create-edge-hostname.png" alt="cname overview page" width="800"></p>

| **字段**                               | **说明**                     |
| ---------------------------------------- | ----------------------------------- |
| 描述 | 此字段会自动填入新调度域名创建者的姓名。您可根据需要接受或修改此描述。 |
| 域名       | 手动输入调度域名的前缀，或点击**自动生成**按钮随机生成。 |

4. 点击**创建访客分区规则**按钮。此时会出现“创建访客分区规则”对话框，其中的字段用于定义访客分区以及如何处理来自该分区的请求。必填字段以星号（\*）标示。

<ul>a. 填写所有字段，然后点击<strong>创建访客分区规则</strong>按钮。</ul>
<ul>b. 要创建更多访客分区规则，重复步骤 4 和 4a。</ul>

<p align=center><img src="/docs/resources/images/traffic-management/create-client-zone-rule.png" alt="createclient region rule" width="550"></p>

| **字段**        | **说明**                                                           |
| ----------------- | ------------------------------------------------------------------------- |
| 访客地区     | 选择定义此访客分区的地理区域。|
| 访客运营商        | 选择定义此访客分区的一个或多个运营商。|
| 服务方式       | 选择要对此访客分区的请求执行的操作类型。 <br><ul><li><strong>分发</strong> = 指由 CDN Pro 提供加速服务。每个访客分区只允许定义一个分发操作。您需要选择用于加速服务的节点组。 </li><li><strong>跳转</strong> = 指将客户端请求转发到“跳转目标”字段（见下文）中指定的目标。转发目标可以是您的源站或另一个 CDN 提供商。每个访客分区可以定义多个跳转操作。</li><li><strong>拒绝</strong> = 客户端请求将始终收到带有 403 - 禁止访问错误消息的响应。每个访客分区只允许定义一个拒绝操作。</li></ul>  
| 节点组      | 如果<strong>服务方式</strong>设置为<strong>分发</strong>，请选择一个或多个节点组来为此访客分区提供加速服务。CDN Pro 加速节点按流量成本从低到高划分为多个组：<strong>Standard</strong>、<strong>Premium</strong>、<strong>Deluxe</strong>、<strong>Ultra</strong>、<strong>nearChina</strong>、<strong>ChinaStandard</strong>和<strong>ChinaPremium</strong>。选择某个组时，所有更低级别的组都会自动包含在内。更多信息，请参见下文[关于节点组](#关于节点组)。要查看每个节点组中节点的分布，请访问：https://www.{{siteDomain}}/cn/cdnpro/。<br><br><strong>注意：</strong><strong>nearChina</strong>、<strong>ChinaStandard</strong> 和 <strong>ChinaPremium</strong> 是特殊节点组，可以联系 [{{title}} 支持团队](mailto:support@{{siteDomain}})为您开通：</br><ul><li>如果您希望以最佳性能服务中国访客，但您的域名没有 ICP 备案，请使用 <strong>nearChina</strong>。</ul></li><ul><li>如果您的加速域名有 ICP 备案，并希望使用中国大陆加速节点，请使用 <strong>ChinaStandard</strong> 或 <strong>ChinaPremium</strong>。</ul></li>|
| 启用IPv6      | 如果<strong>服务方式</strong>设置为<strong>分发</strong>，请选择是否启用 IPv6 加速节点。|
| 跳转目标   | 如果<strong>服务方式</strong>设置为<strong>跳转</strong>，请指定流量转发的目标 IP 地址或域名。 |
| 权重 | 当某个访客分区定义了多个规则时，可以为每个规则分配权重，设置某个规则被匹配的概率。 |

5. 要使用 DNS 记录来宣告您的 HTTPS 支持情况，允许客户端更高效地进行协议协商，请点击**高级设置**，并填写以下字段：

| **字段**        | **说明**                                                           |
| ----------------- | ------------------------------------------------------------------------- |
| 创建HTTPS记录  | 选择<strong>开启</strong>以使用HTTPS类型的 DNS 记录。  |
| ALPN | 选择支持的协议。  |
| 端口              | 输入处理 HTTPS 请求的端口。默认为 443。 |
| TTL               | 输入一个介于 60 到 86400 之间的秒数，表示 DNS 记录的有效时长。 | 

<br>DNS 记录的格式如下：</br>
<code>yourEdgehostname.qtlcdn.com 1800 IN HTTPS 1 . alpn="h2,h3" port=443</code>

6. 点击**保存调度域名**按钮。新的调度域名通常会在2分钟内部署生效。
7. 在您的 DNS 服务商处添加一条 CNAME 记录，将您的加速域名指向新创建的调度域名。

## 关于节点组

首次选择节点组时，我们建议您先创建使用 **Standard** 节点组的访客分区规则，之后如有需要再增加其他节点组。

如果您创建访客分区规则时选择了 **Premium**、**Deluxe** 或 **Ultra**，所有更低价格的组都会自动包含在内。如果您希望为您的用户提供最佳性能（不考虑成本），请选择 **Ultra**。<p>当用户访问您的加速域名时，CDN Pro 负载均衡器会根据用户的位置和当前网络流量做出智能路由决策，然后选择合适的节点来处理请求。不同节点组使用的流量会反映在[流量量汇总报表](</docs/portal/reports/generating-reports.md>)以及月度账单中。

**注意**：对于已开通中国加速的客户，CDN Pro 支持以下特殊节点组：**nearChina**、**ChinaStandard** 和 **ChinaPremium**。更多信息，请联系 [{{title}} 支持团队](mailto:support@{{siteDomain}})。
