# Manage Traffic with Edge Hostnames

Without using a CDN, your service hostname should always be resolved to the IP address of the server hosting the service. To start acceleration with CDN360, the end users' traffic needs to be directed to our edge servers. This can be done by creating a CNAME record with your DNS service provider that points your service hostname to a CDN360 'edge hostname' you create. You can maintain multiple edge hostnames in your account for different traffic management requirements. Each edge hostname can be configured with sophisticated policies to handle end users' requests based on their geographic location and ISP, like a smart DNS service. Most importantly, those policies give you full control over the trade-off between service performance and the cost.

In the left pane, click **Traffic Management** to see this page with the list of edge hostnames in your account. The following figure shows the key elements on the page, and the table following the figure describes them.

<p align=center><img src="/docs/resources/images/CNAMES_Overview.png" alt="edge hostname overview" width="900"></p>

| **Fields**   | **Description**                                                                        |
| :----------: | ---------------------------------------------------------------------------------------|
| 1            | A search box that you can enter any keyword to filter the edge hostname list.                  |
| 2            | The list of all edge hostnames in your account.                                      |
| 3            | Drop-down list to take actions on each edge hostname.                                          |
| 4            | The button to [create a new edge hostname](</docs/portal/traffic-management/creating-edge-hostname.md>).    |

## Edge Hostname Actions
Clicking the **Actions** drop-down list shows all the available actions that can be performed with each edge hostname.
- **Edit**: [Update](</docs/portal/traffic-management/editing-edge-hostname.md>) the selected edge hostname.
- **Delete**: [Delete](</docs/portal/traffic-management/deleting-edge-hostname.md>) the edge hostname.
