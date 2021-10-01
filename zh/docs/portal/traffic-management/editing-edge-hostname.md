Editing an Edge Hostname
In the left pane, click Traffic Management.
Click the edge hostname you want to edit.

OR

In the Actions column, click the vertical ellipsis for the edge hostname you want to edit, and then select Edit.
At the top right of the page, click the Edit button.
The Edge Hostname form appears for creating, editing, and deleting client zone rules and changing advanced settings. For more information, refer to the topics below.

edit cname form

To create one or more client zone rules, perform the following steps.
a. At the top right of the page, click the Create Client Zone Rule button.
b. Complete all the fields, and then click the Create Client Zone Rule button.
c. To add more client zone rules, repeat this step for each additional rule.
create client region rule

Fields	Description
Client Region	Select a region that defines this client zone. We currently support country-level granularity.
Client ISP	Select one or more ISPs that define this client zone.
Action Type	Select the type of action to be performed to requests from this client zone.
Deliver = contents will be served by CDN360 servers to fulfill the requests from this client zone. Only one delivery action is allowed for each client zone. You need to select the server groups to deliver the contents.
Redirect = redirect client requests to another destination specified in the Redirect Target field (see below). This can be your origin site or maybe another CDN provider. There can be multiple redirect actions for each client zone.
Reject = client requests will always receive a response with a 403 - forbidden error message. Only one reject action is allowed for each client zone.
Server Group	If Action Type is set to Deliver, select one or more server groups to handle the traffic for this edge hostname. CDN360 servers are organized into 5 groups based on the traffic cost from low to high: Standard, Premium, Premium+, Ultra, and nearChina. When you select one group, all the lower groups will be included automatically.
Note: nearChina is a special server group that can be enabled for you if you want optimal performance serving Chinese visitors, but your domains lack ICP Beian. To enable this server group, contact the CDNetworks support team.
Enable IPv6	If Action Type is set to Deliver, select whether you want to enable IPv6 addressing.
Redirect Target	If Action Type is set to Redirect, specify an IP address or hostname to which CDN360 will redirect your traffic.
Weight	When a client zone has multiple rules defined, each of them will be used randomly with a probability proportional to the weight specified here.
To edit an existing client zone rule:
a. Click the Actions drop-down list next to the rule you want to edit, and then select Edit.
b. Make your changes in the Update Client Zone Rule dialog box (for assistance, see the table above).
c. Click the Update Client Zone Rule button.
To delete a client zone rule:
a. Click the Actions drop-down list next to the rule you want to delete, and then select Delete.
zone rule delete

b. When prompted to confirm the deletion, click OK to delete the client zone rule.
Note: A default rule that covers all regions and all ISPs is always required. If you accidentally delete the default rule, the system will create one automatically.

To change the ICP Beian setting, expand Advanced Settings and make your change.
edge hostname advanced settings

Fields	Description
Has ICP Beian	This setting determines whether end user requests will be directed to and served by PoPs inside mainland China.
No = this edge hostname will be used by a service hostname that does not have ICP Beian. It will not resolve to any server IP address in mainland China. Only server IP addresses outside China will be returned. (default)
Yes = all service hostnames using this edge hostname have ICP Beian. Visitors in mainland China can be served by local servers in China.

Click Update.
When a message confirms that the edge hostname was updated, click OK.
Click Close to return to the main page.