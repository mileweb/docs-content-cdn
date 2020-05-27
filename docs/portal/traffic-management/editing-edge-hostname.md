# Editing an Edge Hostname

1. In the left pane, click **Traffic Management**.
2. Click the edge hostname you want to edit 
3. At the top right of the page, click the **Edit** button.

The Edge Hostname form appears for creating, editing, and deleting client zone rules and changing advanced settings. For more information, refer to the topics below.
<p align=center><img src="/docs/resources/images/traffic-management/traffic-management-edit-edge-hostname.png" alt="edit cname form"></p>

4. To create one or more client zone rules, perform the following steps.

<ul><li>a. At the top right of the page, click the <strong>Create Client Zone Rule</strong> button.</li>
<li>b. Complete all the fields, and then click the **Create Client Zone Rule** button.</li>
<li>c. To add more client zone rules, repeat this step for each additional rule.</li></ul>

<p align=center><img src="/docs/resources/images/traffic-management/create-client-zone-rule.png" alt="create client region rule"></p>

| **Fields**        | **Description**   |
| ----------------- | ----------------- |
| Client Region     | Select a region that defines this client zone. We currently support country-level granularity.|
| Client ISP        | Select a ISP that defines this client zone. |
| Action Type       | Select the type of action to be performed to requests from this client zone. Choices are:<br><ul><li><strong>Deliver</strong> = contents will be served by CDN360 servers to fullfill the requests from this client zone. Only one delivery action is allowed for each client zone. You need to select the server groups to deliver the contents. </li><li><strong>Redirect</strong> = redirect client requests to another destination specified in the Redirect Target field (see below). This can be your origin site or maybe another CDN provider. There can be multiple redirect actions for each client zone.</li><li><strong>Reject</strong> = client requests will always receive a response with a 403 - forbidden error message. Only one reject action is allowed for each client zone.</li></ul>  
| Server Group      | If <strong>Action Type</strong> is set to <strong>Deliver</strong>, select one or more server groups to deliver the contents for this client zone. CDN360 servers are divided into 4 groups based on the traffic cost from low to high: <strong>Standard</strong>, <strong>Premium</strong>, <strong>Premium+</strong> and <strong>Ultra</strong>. When you select one group, all the lower groups will be automatically included. |
| Redirect Target   | If <strong>Action Type</strong> is set to <strong>Redirect</strong>, specify an IP address or hostname to which CDN360 will redirect your traffic. |
| Weight | When a client zone has multiple rules defined, each of them will be used randomly with a probability proportional this specified weight. |

5. To edit an existing client zone rule:

<ul><li>a. Click the <strong>Actions</strong> drop-down list next to the rule you want to edit, and then select <strong>Edit</strong>.</li>
<li>b. Make your changes in the Update Client Zone Rule dialog box (for assistance, see the table above).</li>
<li>c. Click the <strong>Update Client Zone Rule** button.</strong></li></ul>

6. To delete a client zone rule:

<ul><li>a. Click the <strong>Actions</strong> drop-down list next to the rule you want to delete, and then select <strong>Delete</strong>.

<p align=center><img src="/docs/resources/images/traffic-management/edge-hostname-delete-zone-rule.png" alt="zone rule delete"></p>
</li>
<li>b. When prompted to confirm the deletion, click <strong>OK</strong> to delete the client zone rule.</li></ul>

**Note**: A default rule that covers all regions and all ISPs is always required. If you accidentally delete the default rule, the system will create one automatically.

7. To change the ICP Beian setting, expand **Advanced Settings** and make your change.

<p align=center><img src="/docs/resources/images/traffic-management/edge-hostname-advanced-settings.png" alt="edge hostname advanced settings" width="700"></p>

| **Fields**      | **Description** |
| --------------- | --------------- |
| Has ICP Beian  | This setting determines whether the end users' requests will be directed to PoPs inside mainland China. Choices are:<br><ul><li><strong>No</strong> = this edge hostname will be used by some service hostname that does not have ICP Beian. It will not resolve to any server IP in mainland China. Only server IPs outside China will be returned. </li><li><strong>Yes</strong> = all service hostnames using this edge hostname have ICP Beian. Visitors in mainland China can be served by servers locally.</li></ul>  

8. Click **Update**.
9. When a message confirms that the edge hostname was updated click **OK**.
10.  Click **Close** to return to the main page.

