# 关于用户和权限

用户和权限管理页面定义了允许访问 portal 的用户以及他们对各页面的读取、配置权限。It also allows you to enable two-factor authentication.


## 什么是“用户”？

任何通过身份验证，允许登录 CDN Pro Portal 的人都是用户。


## 什么是“权限”

用户在 Portal 中可执行操作都由权限控制。每个权限都有一个直观的名称来描述其用途。例如，certificate.create 代表允许进行证书创建操作，certificate.remove代表允许进行证书删除操作。每个用户都应被授予其期待执行操作所相应的权限。


## 什么是“角色”？

将单独的权限直接分配给每个用户是一个重复且繁琐的操作，因此 CDN Pro 定义了角色这个概念。角色是一群拥有相同权限的用户的集合。在添加角色时，您需要指定角色的名称、选择与角色关联的权限，角色创建完毕后您即可将目标用户关联到该角色上。

默认情况下，Portal 提供三个初始角色：Admin、Operator 以及 Viewer.

- Admin 可以查看和更改 Portal 中的所有配置。
- Operator 可以查看和更改除了用户和角色管理页面外的所有 Portal 配置。
- Viewer 具有只读权限，不能更改任何 Portal 配置变更。

## 用户和权限管理

要显示身份和访问管理页面，请单击 Portal 右上角的姓名缩写（下图中的**EM**），然后选择**身份和权限管理**。

<p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="300"></p>

下图显示了页面上的关键字段，图后面的表格有相应的描述介绍。

<p align=center><img src="/docs/resources/images/identities-and-access/iam-w-numbers.png" alt="select identity management page" width="700"></p>


| **字段** | **描述** |
| :----------: | --------------- |
| 1 | 用户和权限管理的相关展示页面如下：<ul> <li>**用户** 仅允许 Admin 用户进行管理，Operator 和 Viewer 用户只能查看无法进行增删改操作。当您单击 **用户和权限管理** 后该信息即可展示。 <li>**角色** 仅允许 Admin 用户进行管理，Operator 和 Viewer 用户仅允许查看。<li>**安全** 用于允许开启双因素身份验证。|
| 2 | 您可以在此输入框中输入查询字符，用于过滤 **用户** 页面上的用户或 **角色** 页面上的角色。查询结果将仅展示包含查询字符的用户或者角色。查询操作不区分大小写。要去掉此次查询，请单击右侧的 **x** 按钮。|
| 3 | 每一行都代表一个用户或者角色。|
| 4 | 可对该用户或者角色进行的操作下拉列表。|
| 5 | **用户** 页面中有一个 **+ Add User** 按钮， Admin 用户可通过此按钮来 [创建一个新用户](</docs/portal/identities-and-access/managing-users.md>)。 类似地， **角色** 页面中有一个 **+ Add Role** 按钮，Admin 用户可以通过此按钮来 [创建一个新角色](</docs/portal/identities-and-access/managing-roles.md>)。只有可读权限的用户将无法看到这两个按钮。
