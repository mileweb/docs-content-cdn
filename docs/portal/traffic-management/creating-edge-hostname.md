# Creating an Edge Hostname 

For the CDN360 platform to serve your content to the end users, you must create an edge hostname to be used by the CNAME record on your DNS server. With the new edge hostname, you can define different rules to handle request from different client zones. A **client zone** is a combination of a geographical region and one or more ISPs, for example, "US+Comcast".

Creating an Edge Hostname is a three-step process:

1. In the left pane, click **Traffic Management**.
2. At the top right of the screen, click the **Create Edge Hostname** button. 
3. Complete the fields in the Create an Edge Hostname form. Required fields are denoted by an asterisk (\*).

<p align=center><img src="/docs/resources/images/traffic-management/cname1.png" alt="cname overview page" width="900"></p>


| **Fields**                               | **Description**                     |
| ---------------------------------------- | ----------------------------------- |
| Description. | Enter a description for the CNAME.  |
| Hostname       | Either enter the first part of the edge hostname manually in the text field or click the **Auto Generate** button to generate a random one. |

4. Click the **Create Client Zone Rule** button. The Create Client Zone Rule dialog box appears, with fields to define the client zone and how to handle requests come from it. Required fields are denoted by an asterisk (\*).

<ul><li>a. Complete all the fields, and then click the <strong>Create Client Zone Rule</strong> button. </li>
<li>b. To specify more client zone rules, repeat step 4a for each additional rule.</li></ul>

**Note**: A default rule covering ALL regions and ALL ISPs will be created automatically if you don't define one.
<p align=center><img src="/docs/resources/images/traffic-management/Create Client Region Rule.png" alt="createclient region rule" width="500"></p>

| **Fields**        | **Description**                                                           |
| ----------------- | ------------------------------------------------------------------------- |
| Client Region     | Select a region that defines this client zone.|
| Client ISP        | Select a ISP that defines this client zone.|
| Action Type       | Select the type of action to be performed to requests from this client zone. Choices are:<br><ul><li><strong>Deliver</strong> = Contents will be served by CDN360 servers to fullfill the requests from this client zone. Only one delivery action is allowed for each client zone. You need to select the server groups to deliver the contents. </li><li><strong>Redirect</strong> = Redirect client requests to another destination specified in the Redirect Target field (see below). This can be your origin site or maybe another CDN provider. There can be multiple redirect actions for each client zone.</li><li><strong>Reject</strong> = Client requests will always receive a response with a 403 - forbidden error message. Only one reject action is allowed for each client zone.</li></ul>  
| Server Group      | If <strong>Action Type</strong> is set to <strong>Deliver</strong>, select one or more server groups to deliver the contents for this client zone. CDN360 servers are divided into 4 groups based on the traffic cost from low to high: <strong>Standard</strong>, <strong>Premium</strong>, <strong>Premium+</strong> and <strong>Ultra</strong>. When you select one group, all the lower groups will be automatically included. |
| Redirect Target   | If <strong>Action Type</strong> is set to <strong>Redirect</strong>, specify an IP address or hostname to which CDN360 will redirect your traffic. |
| Weight | When a client zone has multiple rules defined, each of them will be used randomly with a probability proportional this specified weight. |

5. Expand **Advanced Settings**, and then confirm or change the following field.

<p align=center><img src="/docs/resources/images/traffic-management/cname3.png" alt="advanced settings" width="600"></p>

| **Fields**      | **Description**                                              |
| --------------- | ------------------------------------------------------------ |
| Has ICP Beian   |   This setting determines whether the end users' requests will be directed to PoPs inside mainland China. Choices are: <br><li><strong>No</strong> = this edge hostname will be used by some service hostname that does not have ICP Beian. It will not resolve to any server IP in mainland China. Only server IPs outside China will be returned. (*default*) <li><strong>Yes</strong> = all service hostnames using this edge hostname have ICP Beian. Visitors in mainland China can be served by servers locally.</li></br>|

6. Click the **Create Edge Hostname** button.
7. Add a CNAME record on your DNS server to point your service hostname(s) to the newly created Edge Hostname.
