# 管理用户
## 新增一个用户

管理员可通过用户和权限管理页面上的**用户**页面添加用户。

1. 在 Portal 的右上角，单击您的姓名缩写，然后选择 **用户和权限管理**。

    <p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="400"></p>

2. 待系统展示用户和权限管理页面的 **用户** 信息后，单击页面右侧的 **+添加用户** 按钮。

<p align=center><img src="/docs/resources/images/identities-and-access/iam-users.png" alt="select add user button" width="900"></p>

3. 填写添加用户表单中的字段。必填字段将会以用星号 (\*) 表示

| **字段** | **描述** |
| ---------- | --------------- |
| Email | 输入该用户的 Email 信息。|
| Roles | 要为该用户分配一个或多个角色，请单击 **+ Add Roles**，输入进行搜索的角色名称并在 Add Roles 对话框中选中一个或多个角色，然后单击 **保存** 按钮。如果您决定取消某个用户的关联角色，请选中该角色，然后单击 **Roles** 信息中的 **Delete** 按钮。
| Description | 添加该用户的描述信息。|

4. 点击 **保存并邀请** 。CDN Pro 将向该用户的邮箱发送加入邀请邮件。
5. 用户单击邀请邮件中的 **Join Now!** 按钮，在加入 CDN Pro 注册页面上输入所需信息，然后单击 **Save & Join** 按钮。
6. 该用户已成功创建，并可以登录上 Portal。

## 修改一个用户

管理员可通过用户和权限管理页面上的 **用户** 页面修改用户。

1. 在 Portal 的右上角，单击您的姓名缩写，然后选择 **用户和权限管理** 。

    <p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="400"></p>

2. 待系统展示用户和权限管理页面的**用户**信息后，单击目标客户的 ID。
   <br><U>或者 </u></br>
    在 **操作** 列中，单击要修改的用户右侧的垂直省略号，然后选择 **编辑**。
   
**提示:** 您可以使用页面左上角的过滤器来过滤目标用户。</ul>

3. 在修改用户页面中进行更改。

<p align=center><img src="/docs/resources/images/identities-and-access/iam-edit-user.png" alt="select identity management page" width="900"></p>

| **字段**         | **描述**                              |
| ------------------ | -------------------------------------------- |
| First Name         | 输入用户的名称。           |
| Last Name          | 输入用户的姓。            |
| Username           | 输入此用户将用于登录 Portal 的用户名。          |                                              | 
| Status             | 显示用户的当前状态。右侧的按钮允许您在激活和挂起之间更改用户的状态。 
| Email              | 输入域名的邮箱信息。             |
| Phone Number       | 输入用户的电话号码    |
| Roles              | 要为该用户分配一个或多个角色，请单击 **+ Add Roles**，输入进行搜索的角色名称并在 Add Roles 对话框中选中一个或多个角色，然后单击 **保存** 按钮。如果您决定取消某个用户的关联角色，请选中该角色，然后单击 **Roles** 部分中的 **Delete** 按钮。|
| Description        | 添加该用户的描述信息。           |

4. 单击 **保存**.

## 删除指定用户

管理员可通过用户和权限管理页面上的**用户**页面来删除用户。

1. 在 Portal 的右上角，单击您的姓名缩写，然后选择 **用户和权限管理**。

    <p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="400"></p>

2. 在用户和权限管理页面的 **操作** 列中，单击要修改的用户右侧的垂直省略号，然后选择 **删除**
   
**提示:** 您可以使用页面左上角的过滤器来过滤目标用户。

3. 当系统提示确认是否删除时，单击 **确定** 删除用户。

## 挂起指定用户

管理员可通过用户和权限管理页面上的**用户**页面来挂起用户。挂起用户的操作将暂时阻止该用户访问 Portal ；但是该操作并不会删除用户的用户名、角色、密码和其他设置。系统不会通知用户他们已被暂停，这些用户只是无法再进行登录。

如果用户在被挂起时恰好已登录 Portal，那么在本次登录回话中该用户可以继续使用 Portal ，但在其退出后无法将再次登录。已被挂起的用户在尝试登录时，CDN Pro 会显示一条消息，指出该用户已被挂起并引导其寻找管理员确认。

被挂起的用户将无法登录 Portal，直到该用户被重新激活。


1. 在 Portal 的右上角，单击您的姓名缩写，然后选择 **用户和权限管理**。

    <p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="400"></p>

2. 待系统展示用户和权限管理页面的**用户**信息后，执行以下步骤之一：<br>

   - 在 **操作** 列中，单击要暂停的用户右侧的垂直省略号，然后选择 **挂起**。当提示确认暂停该用户时，单击 **确定**。<br><br>
   - 如需在暂停前查看用户的详细信息，请点击您要挂起的用户的 ID。查看用户详细信息后，单击 **Status** 信息旁边的 **挂起** 按钮，然后单击表单右上角的 **保存** 按钮。当提示更新用户时，单击 **确定**。</br></br>

<p align=center><img src="/docs/resources/images/identities-and-access/iam-edit-user-suspend.png" alt="suspend button" width="900"></p>

## 重新激活某个已挂起客户

管理员可通过用户和权限管理页面上的**用户**页面来重新激活已挂起用户。激活用户的操作将恢复用户以前的登录和访问权限。

1. 在 Portal 的右上角，单击您的姓名缩写，然后选择 **用户和权限管理**。

    <p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="400"></p>

2. 待系统展示用户和权限管理页面的**用户**信息后，执行以下步骤之一：<br>

<ul><ul><li>在 <strong>操作</strong> 列中，单击要激活的用户右侧的垂直省略号，然后选择 <strong>激活</strong>。当提示确认暂停该用户时，单击 **确定**。<br><br>
<li>如需在激活前查看用户的详细信息，请点击您要激活的用户的 ID。查看用户详细信息后，单击 <strong>Status</strong> 信息旁边的 <strong>激活</strong> 按钮。然后单击表单右上角的 <strong>保存</strong>  按钮。当提示更新用户时，单击 <strong>确定</strong>。</br></br>

<p align=center><img src="/docs/resources/images/identities-and-access/iam-edit-user-activate.png" alt="activate" width="900"></p>
