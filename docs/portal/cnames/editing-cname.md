# Editing an Edge Hostname

1. In the left pane, click **Traffic Management**.
2. Click the edge hostname you want to edit. 
   <br><U>OR </u></br>
   Click the **Actions** drop-down list for the edge hostname you want to edit, and then select **Edit**.<br>
3. At the top right of the form, click the **Edit** button.

<p align=center><img src="/docs/resources/images/Edit CNAME - Edit Button.png" alt="edit cname button" width="900"></p>

Controls appear for creating, editing, and deleting client zone rules and changing advanced settings for the selected edge hostname. For more information, refer to the topics below.

## Creating Client Zone Rules

1. At the right side of the form, click the <strong>Create Client Zone Rule</strong> button.

<p align=center><img src="/docs/resources/images/Create Client Region Rule Button.png" alt="create client region rule button" width="900"></p>

2. Complete all the fields, and then click the **Create Client Zone Rule** button.

**Note**: If you do not create a client zone rule, or if you leave the **Client Region** field empty, a rule covering ALL regions is created automatically.

<p align=center><img src="/docs/resources/images/Create Client Region Rule.png" alt="create client region rule" width="500"></p>

| **Fields**        | **Description**   |
| ----------------- | ----------------- |
| Client Region     | Select a region for this rule. If you leave this field empty, a rule covering ALL regions is created automatically.|
| Client ISP        | Select a client ISP. |
| Action Type       | Select the type of action to be performed. Choices are:<br><ul><li><strong>Deliver</strong> = specifies the server groups to deliver your traffic. Only one deliver action is allowed for each client region. All servers in the selected server group will be used as candidates in the load balancing algorithm.<li><strong>Redirect</strong> = directs traffic requests to the target specified in the Redirect target field (see below). This can be your origin site or another CDN provider. There can be multiple redirect actions for each client region.<li><strong>Reject</strong> = directs traffic requests to web servers that always respond with a 403 - forbidden error message. Only one reject action is allowed for each client region.<ul> |
| Server Group      | If <strong>Action Type</strong> is set to <strong>Deliver</strong>, select one or more server group options:<br><li><strong>Standard</strong> = standard server group.</li><li><strong>Premium</strong> = includes the standard server group.<li><strong>Premium+</strong> = includes the standard and premium server groups.<li><strong>Ultra</strong> = includes the standard, premium, and premium+ server groups.  |
| Redirect Target   | If <strong>Action Type</strong> is set to **Redirect**, specify an IP address or hostname to which CDN360 will redirect your traffic.|
| Weight | Adjust how this rule behaves relative to other rules for the same client region.
   
3. To create more client zone rules, repeat steps 1 and 2 for each additional rule.

4. When you finish, perform any other edits on this form.

5. When you finish all edits, click **Update** at the bottom right of the form. Then click **OK** at the confirmation prompt and  **Close**.


## Editing a Client Zone Rule
1. At the right side of the form, click the <strong>Actions</strong> drop-down list next to the rule you want to edit, and then select <strong>Edit</strong>.

2. Make your changes in the Update Client Zone Rule dialog box (for assistance, see the table above).

3. Click the <strong>Update **Client Zone Rule** button.</strong>

4. Perform any other edits on this form. 

5. When you finish all edits, click **Update** at the bottom right of the form. Then click **OK** at the confirmation prompt and  **Close**.

## Deleting a Client Zone Rule

1. At the right side of the form, click the <strong>Actions</strong> drop-down list next to the rule you want to delete, and then select <strong>Delete</strong>.</ul>

<p align=center><img src="/docs/resources/images/CNAME Delete.png" alt="cname delete" width="800"></p>

2. When prompted to confirm the deletion, click <strong>OK</strong> to delete the client region rule.</ul><br>

3. Perform any other edits on this form. 

4. When you finish all edits, click **Update** at the bottom right of the form. Then click **OK** at the confirmation prompt and  **Close**.

## Changing the Has ICP Bien Setting for an Edge Hostname

1. Near the bottom of the form, expand **Advanced Settings** and make your change.

<p align=center><img src="/docs/resources/images/CNAMEs - Advanced Settings.png" alt="cname advanced settings" width="700"></p>

| **Fields**      | **Description** |
| --------------- | --------------- |
| Has ICp Beian   |      Select whether content will be served from PoPs inside or outside China. Choices are: <br><ul><li><strong>No</strong> = content is served to website visitors in China from PoPs located outside China. (*default*) <li><strong>Yes</strong> = content is served to website visitors in China from PoPs located in China.</ul></li></br>|

2. Perform any other edits on this form. 

3. When you finish all edits, click **Update** at the bottom right of the form. Then click **OK** at the confirmation prompt and  **Close**.
