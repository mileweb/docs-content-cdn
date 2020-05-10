# Editing an Edge Hostname

1. In the left pane, click **Traffic Control**.
2. Click the edge hostname you want to edit 
3. At the top right of the page, click the **Edit** button.

<p align=center><img src="/docs/resources/images/Edit CNAME - Edit Button.png" alt="edit cname button" width="900"></p>

The Edge Hostname form that appears allows you to create, edit, and delete client zone rules, and change advanced settings. Refer to the appropriate steps below.
<p align=center><img src="/docs/resources/images/Editing CNAME Form.png" alt="edit cname form" width="900"></p>

4. To create one or more client zone rules, perform the following steps.


<ul>a. At the top right of the page, click the <strong>Create Client Zone Rule</strong> button.

<p align=center><img src="/docs/resources/images/Create Client Region Rule Button.png" alt="create client region rule button" width="900"></p>

b. Complete all the fields, and then click the **Create Client Zone Rule** button.
c. To add more client zone rules, repeat this step for each additional rule.

<p align=center><img src="/docs/resources/images/Create Client Region Rule.png" alt="create client region rule" width="500"></p>

You can also delete any un-needed client zone rules by clicking the **delete** link. 
**Note**: A default rule that covers all regions and all ISPs is always required. If you accidentally delete the default rule, the system will create one automatically.

| **Fields**        | **Description**   |
| ----------------- | ----------------- |
| Client Region     | Select a region for this rule. We currently support country-level granularity.|
| Client ISP        | Select a client ISP. |
| Action Type       | Select the type of action to be performed for end users in this zone. Choices are:<br><li><strong>Deliver</strong> = specifies the server groups to deliver your traffic. Only one deliver action is allowed for each client zone. All servers in the selected server groups will be used as candidates by the load balancing algorithm. Therefore, more server groups usually means better performance. However, the traffic unit price will higher for the higher server groups. <li><strong>Redirect</strong> = directs traffic to the target specified in the Redirect target field (see below). This can be your origin site or even another CDN provider. There can be multiple redirect actions for each client zone.<li><strong>Reject</strong> = directs traffic requests to dedicated reject servers that always respond with a 403 - forbidden error message. Only one reject action is allowed for each client zone.</br> |
| Server Group      | If <strong>Action Type</strong> is set to <strong>Deliver</strong>, select one or more server group options:<br><li><strong>Standard</strong> = standard server group.</li><li><strong>Premium</strong> = includes the standard server group.<li><strong>Premium+</strong> = includes the standard and premium server groups.<li><strong>Ultra</strong> = includes the standard, premium, and premium+ server groups.  |
| Redirect Target   | If <strong>Action Type</strong> is set to **Redirect**, specify an IP address or hostname to which CDN360 will redirect your traffic.|
| Weight | If there are multiple rules defined for a client zone, those rules will be applied randomly for end users from this zone. The probability of each rule is proportional to this weight nubmer.|

5. To edit an existing client zone rule:
<ul>a. Click the <strong>Actions</strong> drop-down list next to the rule you want to edit, and then select <strong>Edit</strong>.<br><br></ul>
<ul>b. Make your changes in the Update Client Zone Rule dialog box (for assistance, see the table above).<br><br></ul>
<ul>c. Click the <strong>Update Client Zone Rule** button.</strong></ul>

6. To delete a client region rule:

<ul>a. Click the <strong>Actions</strong> drop-down list next to the rule you want to delete, and then select <strong>Delete</strong>.</ul>

<p align=center><img src="/docs/resources/images/CNAME Delete.png" alt="cname delete" width="800"></p>

<ul>b. When prompted to confirm the deletion, click <strong>OK</strong> to delete the client zone rule.</ul><br>

7. To change the ICP Beian setting, expand **Advanced Settings** and make your change.

<p align=center><img src="/docs/resources/images/CNAMEs - Advanced Settings.png" alt="cname advanced settings" width="700"></p>

| **Fields**      | **Description** |
| --------------- | --------------- |
| Has ICP Beian  | This setting determines whether the end users' requests will be directed to PoPs inside mainland China. Choices are: <br><li><strong>No</strong> = this edge hostname will be used by some service hostname that does not have ICP Beian. It will not resolve to any server IP in mainland China. Only server IPs outside China will be returned. (*default*) <li><strong>Yes</strong> = all service hostnames using this edge hostname have ICP Beian. Visitors in mainland China can be served by servers locally.</li></br>|

8. Click **Update**.
9. When a message confirms that the edge hostname was updated click **OK**.
10. Click **Close** to return to the main page.

