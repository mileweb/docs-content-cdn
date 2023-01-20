# Editing an Edge Hostname

1. In the left pane, click **Traffic Management**.
2. Click the edge hostname you want to edit. 
    <br><U>OR </u></br>
  In the **Actions** column, click the vertical ellipsis for the edge hostname you want to edit, and then select **Edit**.
3. At the top right of the page, click the **Edit** button.

The Edge Hostname form appears for creating, editing, and deleting client zone rules. For more information, refer to the topics below.
<p align=center><img src="/docs/resources/images/traffic-management/traffic-management-edit-edge-hostname.png" alt="edit cname form" width="600"></p>

4. To create one or more client zone rules, perform the following steps.

<ul>a. At the top right of the page, click the <strong>Create Client Zone Rule</strong> button.</ul>
<ul>b. Complete all the fields, and then click the <strong>Create Client Zone Rule</strong> button.</ul>
<ul>c. To add more client zone rules, repeat this step for each additional rule.</ul>

<p align=center><img src="/docs/resources/images/traffic-management/create-client-zone-rule.png" alt="create client region rule" width="600"></p>

| **Fields**        | **Description**   |
| ----------------- | ----------------- |
| Client Region     | Select a region that defines this client zone. We currently support country-level granularity.|
| Client ISP        | Select one or more ISPs that define this client zone. |
| Action Type       | Select the type of action to be performed to requests from this client zone. <br><ul><li><strong>Deliver</strong> = contents will be served by CDN Pro servers to fulfill the requests from this client zone. Only one delivery action is allowed for each client zone. You need to select the server groups to deliver the contents. </li><li><strong>Redirect</strong> = redirect client requests to another destination specified in the Redirect Target field (see below). This can be your origin site or maybe another CDN provider. There can be multiple redirect actions for each client zone.</li><li><strong>Reject</strong> = client requests will always receive a response with a 403 - forbidden error message. Only one reject action is allowed for each client zone.</li></ul>  
| Server Group      | If <strong>Action Type</strong> is set to <strong>Deliver</strong>, select one or more server groups to deliver the content for this client zone. CDN Pro servers are organized into groups based on traffic cost from low to high: <strong>Standard</strong>, <strong>Premium</strong>, <strong>Deluxe</strong>, <strong>Ultra</strong>, and <strong>nearChina</strong>. When you select one group, all the lower groups will be automatically included. For more information, see [About Server Groups](/docs/portal/traffic-management/creating-edge-hostname.md#about-server-groups). To see the location of servers in each group, go to: https://www.cdnetworks.com/cdnpro/.<br><br><strong>Note:</strong> <strong>nearChina</strong>, <strong>ChinaStandard</strong>, and <strong>ChinaPremium</strong> are special server groups that can be enabled for you by contacting the [CDNetworks support team](mailto:support@cdnetworks.com):</br><ul><li>Use <strong>nearChina</strong> if you want optimal performance serving Chinese visitors, but your domains lack ICP Beian.</ul></li><ul><li>Use <strong>ChinaStandard</strong> or <strong>ChinaPremium</strong> if you have an ICP Beian license for your hostnames and want the content served from servers in China.</ul></li>| 
| Enable IPv6      | If <strong>Action Type</strong> is set to <strong>Deliver</strong>, select whether you want to enable IPv6 addressing.|
| Redirect Target   | If <strong>Action Type</strong> is set to <strong>Redirect</strong>, specify an IP address or hostname to which CDN Pro will redirect your traffic. |
| Weight | When a client zone has multiple rules defined, each of them will be used randomly with a probability proportional to the weight specified here. |

5. To edit an existing client zone rule:

<ul>a. Click the <strong>Actions</strong> drop-down list next to the rule you want to edit, and then select <strong>Edit</strong>.</ul>
<ul>b. Make your changes in the Update Client Zone Rule dialog box (for assistance, see the table above).</ul>
<ul>c. Click the <strong>Update Client Zone Rule</strong> button.</ul>

6. To delete a client zone rule:

<ul>a. Click the <strong>Actions</strong> drop-down list next to the rule you want to delete, and then select <strong>Delete</strong>.</ul>

<p align=center><img src="/docs/resources/images/traffic-management/edge-hostname-delete-zone-rule.png" alt="zone rule delete"></p>

<ul>b. When prompted to confirm the deletion, click <strong>OK</strong> to delete the client zone rule.</ul>

**Note**: A default rule that covers all regions and all ISPs is always required. If you accidentally delete the default rule, the system will create one automatically.

7. Click **Update**.
8. When a message confirms that the edge hostname was updated, click **OK**.
9.  Click **Close** to return to the main page.

