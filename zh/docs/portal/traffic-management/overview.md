# 使用调度域名管理流量

未使用 CDN 时，您的域名通常是解析到您自己的服务器的 IP 地址。<p>要使用 CDN Pro 加速，您需要在 DNS 服务提供商处创建一条 CNAME 记录，将最终用户访问的加速域名指向您在 CDN Pro 创建的“调度域名”。您可以维护多个调度域名，以满足不同的流量管理需求。每个调度域名都可以配置复杂的策略，根据最终用户的地理位置和 ISP 来处理其请求。这些策略还允许您在服务性能和成本之间进行权衡。

在左侧导航栏中，点击**调度管理**，即可看到调度域名列表页面。下图显示了页面上的关键元素，图后的表格对它们进行了说明。

<p align=center><img src="/docs/resources/images/traffic-management/traffic-management-w-numbers.png" alt="edge hostname overview"></p>

| **编号**   | **说明**                                                                        |
| :----------: | ---------------------------------------------------------------------------------------|
| 1            | 搜索框，您可以输入任意关键字来筛选调度域名列表。          |
| 2            | 调度域名列表。                                        |
| 3            | 按调度域名是否有备案进行筛选。                                         |
| 4            | 用于对每个调度域名执行操作的下拉列表。                                 |
| 5            | 用于[创建新调度域名](</docs/portal/traffic-management/creating-edge-hostname.md>)的按钮。    |

## 调度域名操作
每个调度域名在**操作**列中都有一个垂直省略号。点击省略号会显示可对所选调度域名执行的操作。
- **修改**：[更新](</docs/portal/traffic-management/editing-edge-hostname.md>)所选调度域名。
- **删除**：[删除](</docs/portal/traffic-management/deleting-edge-hostname.md>)所选调度域名。
- **克隆**：通过克隆某个调度域名的配置，[创建](</docs/portal/traffic-management/creating-edge-hostname.md>)新的调度域名。
- **查看报表**：显示[报表页面](</docs/portal/reports/generating-reports.md>)，查询所选调度域名的DNS请求数报表。
