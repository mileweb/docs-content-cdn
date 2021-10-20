# Managing Roles

A role is a collection of one or more permissions that can be performed within the portal. 

## Adding a Role

Administrators add roles from the **Roles** tab on the Identity & Access Management page. As part of this procedure, administrators assign roles to users, which define the activities that users can perform in the portal.

1. At the top right of the portal, click your initials, and then select **Identity & Access Management**.

    <p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="400"></p>

2. At the top of the page, click **Roles**. 
3. At the right side of the page, click the **+ Add Role** button.

![null](</docs/resources/images/identities-and-access/iam-roles.png>)

4. Complete the fields in the Add Role form. Required fields are denoted by an asterisk (\*).

![null](</docs/resources/images/identities-and-access/iam-add-role.png>)

| **Fields**           | **Description**                   |
| -------------------- |---------------------------------- |
| Role Name            | Enter a name for this role.       |
| Description          | Enter a description for this role.|
| Role Status          | Select between **Local** and **Global**: <br><ul><li><strong>Local</strong> = only this customer account can use this role.</br></ul></li><ul><li><strong>Global</strong> = all customers can use this role.</ul></li> |
| Permissions          | By default, new roles have no permissions. Therefore, when you create a role, you must add the appropriate permissions for that role. Click **+ Add Permissions**. In the dialog box, select the check boxes for the permissions you want to grant to this role and click **Save**.<br>**Note:** Selecting a check box in the **All features** row at the top selects all the check boxes in that column.|

5. Click **Save**.


## Editing a Role

Administrators edit roles from the **Roles** tab on the Identity & Access Management page.

1. At the top right of the portal, click your initials, and then select **Identity & Access Management**.

    <p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="400"></p>

2. At the top of the page, click **Roles**.

3. From the Roles page, click the name of the role you want to edit, and then click **Edit** at the top right of the Role Details page. 
   <br><U>OR </u></br>
   In the **Actions** column, click the vertical ellipsis for the role you want to edit, and then select **Edit**.

4. At the top right, click the **Edit** button.
5. Make your changes in the Edit Role form (for assistance, see the table above). Required fields are denoted by an asterisk (\*).

6. Click **Save**.

## Deleting a Role

Administrators delete roles from the **Roles** tab on the Identity & Access Management page.

1. At the top right of the portal, click your initials, and then select **Identity & Access Management**.

    <p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="400"></p>

2. At the top of the page, click **Roles**.

3. Delete one or more roles:<br>

<ul><ul><li>To delete one role from the Roles page, click a role's vertical ellipsis in the <strong>Actions</strong> column, and then select <strong>Delete</strong>.</ul><br>

<ul><u>OR</u></ul></ul>

<ul><ul><li>To delete more than one role from the Roles page, check each role, and then click <strong>Delete</strong> at the top right of the page.</ul><br>

<ul><u>OR</u></ul></ul>

<ul><ul><li>To see the details of a role before deleting it, click the role name. To delete the role, click <strong>Delete</strong> at the top right of the Role Details page.</ul></ul>

4. If the role has no assigned users, click **Yes, delete!** to delete the role. If the role has one or more assigned users, click **Un-assign from all users and delete** to delete the role.
