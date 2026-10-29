# 修改调度域名

1. 在左侧导航栏中，点击**调度管理**。
2. 点击您要修改的调度域名。
    <br><U>或者 </u></br>
  在**操作**列中，点击您要修改的调度域名的垂直省略号，然后选择**修改**。
3. 在调度域名详情页，从调度域名的**部署历史**中选择一个版本，然后点击**克隆**按钮，基于已有版本的配置进行修改。

<p align=center><img src="/docs/resources/images/traffic-management/traffic-management-edit-edge-hostname.png" alt="edit cname form" width="700"></p>

点击克隆后出现以上表单，可通过表单创建、修改和删除访客分区规则。

4. 要创建访客分区规则，请执行以下步骤。

<ul>a. 在表单右上角，点击<strong>创建访客分区规则</strong>按钮。</ul>
<ul>b. 填写所有字段，然后点击<strong>创建访客分区规则</strong>按钮。</ul>
<ul>c. 要添加更多访客分区规则，请重复以上步骤。</ul>

<p align=center><img src="/docs/resources/images/traffic-management/create-client-zone-rule.png" alt="create client region rule" width="550"></p>

| **字段**        | **说明**   |
| ----------------- | ----------------- |
| 访客地区     | 选择定义此访客分区的地理区域。我们目前支持国家/地区级别的粒度。|
| 访客运营商        | 选择定义此访客分区的一个或多个运营商。 |
| 服务方式       | 选择要对此访客分区的请求执行的操作类型。 <br><ul><li><strong>分发</strong> = 指由 CDN Pro 节点提供加速服务。每个访客分区只允许定义一个分发操作。您需要选择用于提供加速服务的节点组。 </li><li><strong>跳转</strong> = 指将客户端请求转发到“跳转目标”字段（见下文）中指定的目标。这可以是您的源站或另一个 CDN 提供商。每个访客分区可以定义多个跳转操作。</li><li><strong>拒绝</strong> = 客户端请求将始终收到带有 403 - 禁止访问错误消息的响应。每个访客分区只允许定义一个拒绝操作。</li></ul>  
| 节点组      | 如果<strong>服务方式</strong>设置为<strong>分发</strong>，请选择一个或多个节点组来为此访客分区提供加速服务。CDN Pro 节点按流量成本从低到高划分为多个组：<strong>Standard</strong>、<strong>Premium</strong>、<strong>Deluxe</strong>、<strong>Ultra</strong>、<strong>nearChina</strong>、<strong>ChinaStandard</strong>和<strong>ChinaPremium</strong>。选择某个组时，所有更低级别的组都会自动包含在内。更多信息，请参见[关于节点组](</docs/portal/traffic-management/creating-edge-hostname.md#关于节点组>)。要了解每个节点组中节点的分布，请访问：https://www.{{siteDomain}}/cn/cdnpro/。<br><br><strong>注意：</strong><strong>nearChina</strong>、<strong>ChinaStandard</strong> 和 <strong>ChinaPremium</strong> 是特殊节点组，可以联系 [{{title}} 支持团队](mailto:support@{{siteDomain}})为您开通：</br><ul><li>如果您希望以最佳性能服务中国访客，但您的域名没有 ICP 备案，请使用 <strong>nearChina</strong>。</ul></li><ul><li>如果您的加速域名有 ICP 备案，并希望使用中国大陆加速节点，请使用 <strong>ChinaStandard</strong> 或 <strong>ChinaPremium</strong>。</ul></li>| 
| 启用IPv6      | 如果<strong>服务方式</strong>设置为<strong>分发</strong>，请选择是否要启用 IPv6 加速节点。|
| 跳转目标   | 如果<strong>服务方式</strong>设置为<strong>跳转</strong>，请指定流量转发的目标 IP 地址或域名。 |
| 权重 | 当某个访客分区定义了多个规则时，可以为每个规则分配权重，设置某个规则被匹配的概率。 |

5. 要修改现有访客分区规则：

<ul>a. 点击您要修改的规则旁边的<strong>操作</strong>下拉列表，然后选择<strong>编辑</strong>。</ul>
<ul>b. 在“更新访客分区规则”对话框中进行更改（如需帮助，请参见上表）。</ul>
<ul>c. 点击<strong>更新访客分区规则</strong>按钮。</ul>

6. 要删除访客分区规则：

<ul>a. 点击您要删除的规则旁边的<strong>操作</strong>下拉列表，然后选择<strong>删除</strong>。</ul>

<p align=center><img src="/docs/resources/images/traffic-management/edge-hostname-delete-zone-rule.png" alt="zone rule delete"></p>

<ul>b. 当系统提示确认删除时，点击<strong>确定</strong>以删除该访客分区规则。</ul>

**注意**：必须始终保留一条覆盖所有地区和所有运营商的默认规则。

7. 要使用 DNS 记录来宣告 HTTPS 支持并允许兼容的客户端更快地连接，请点击**高级设置**，并更新以下字段：

| **字段**        | **说明**                                                           |
| ----------------- | ------------------------------------------------------------------------- |
| 创建HTTPS记录  | 选择<strong>开启</strong>以使用HTTPS类型的 DNS 记录。  |
| ALPN | 选择支持的协议。  |
| 端口              | 输入处理 HTTPS 请求的端口。默认为 443。 |
| TTL               | 输入一个介于 60 到 86400 之间的秒数，表示 DNS 记录的有效时长。 |

<br>DNS 记录的格式如下：</br>
<code>yourEdgehostname.qtlcdn.com 1800 IN HTTPS 1 . alpn="h2,h3" port=443</code>

8. 点击**保存**。
9. 当出现消息确认调度域名更新已被接受时，点击**确定**。更新通常会在2分钟内部署生效。
10. 点击**关闭**返回主页面。
