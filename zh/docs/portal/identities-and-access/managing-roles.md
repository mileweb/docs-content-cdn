# 管理角色

角色是可以在 Portal 中执行的一个或多个权限的集合。

## 新增一个角色

管理员通过用户和权限管理页面上的 **角色** 页面添加角色。作为此过程的一部分，管理员可以将创建好的角色分配给用户，这些角色定义了目标用户可以在 Portal 中执行的活动。

1. 在 Portal 的右上角，单击您的姓名缩写，然后选择 **用户和权限管理**。

    <p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="300"></p>

2. 在页面顶部，单击 **角色**。
3. 在页面右侧，单击 **+ Add Role** 按钮。

<p align=center><img src="/docs/resources/images/identities-and-access/iam-roles.png" alt="select roles" width="700"></p>

4. 填写“添加角色”页面的信息内容。必填字段将会以星号 (\*) 表示。

<p align=center><img src="/docs/resources/images/identities-and-access/iam-add-role.png" alt="select roles dialog box" width="700"></p>

| **字段**           | **描述**                   |
| -------------------- |---------------------------------- |
| Role Name            | 该角色的名称信息。       |
| 描述          | 该角色的描述信息。|
| Role Status          | 如果您是位代销商， 此 **Role Status** 项可以允许您选择您的子客户是否可以使用该角色。
| Permissions          | 默认情况下，新角色没有关联权限。因此，当您创建角色时，您必须为该角色添加适当的权限。单击 **+ Add Permissions**，在弹出的对话框中，选中您要授予此角色的权限，然后单击 **保存**。<br>**注意：** 在 **All features** 行中选则对应的权限则代表所有功能都将保持相同的权限。|

5. 单击 **保存**.


## 修改指定角色

Admin 用户可以从用户和权限管理页面上的**角色**页面对角色进行编辑修改。

1. 在 Portal 的右上角，单击您的姓名缩写，然后选择 **用户和权限管理**。

    <p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="300"></p>

2. 在页面顶部，单击**角色**。

3. 在角色页面中，单击要编辑的角色名称，然后单击角色详细信息页面右上角的**修改**。
   <br><U>或者 </u></br>
   在 **操作** 列中，单击要编辑的角色对应的右侧垂直省略号，然后选择 **修改**。

4. 在右上角，单击 **修改** 按钮。
5. 在“Edit Role”页面中进行更改（如需帮助，请参见上表）。必填字段将会以星号 (\*) 表示。

6. 单击 **保存**.

## 删除一个角色

Admin 用户可以从用户和权限管理页面上的**角色**页面对角色进行编辑修改。

1. 在 Portal 的右上角，单击您的姓名缩写，然后选择 **用户和权限管理**。

    <p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="300"></p>

2. 在页面顶部，单击**角色**。

3. 删除一个或多个角色：<br>

<ul><ul><li>要从角色页面中删除一个角色，请单击 <strong>操作</strong> 列中角色的垂直省略号，然后选择<strong>删除</strong>.</ul><br>

<ul><u>或者</u></ul></ul>

<ul><ul><li>要从角色页面中删除多个角色，请选中每个目标角色，然后点击页面右上角的<strong>删除</strong>。</ul><br>

<ul><u>或者</u></ul></ul>

<ul><ul><li>在删除角色之前如需查看角色的详细信息，请单击角色名称。待确认要删除该角色后，请点击角色详情页面右上角的<strong>删除</strong>。</ul></ul>

4. 如果该角色没有分配用户，请单击 **Yes, delete!** 删除该角色。如果该角色有一个或多个分配的用户，请单击 **Un-assign from all users and delete** 以删除该角色。
