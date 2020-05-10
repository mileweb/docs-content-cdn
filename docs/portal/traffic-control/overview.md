# Traffic Control and Edge Hostname

Without a CDN, your service hostname always got resolved to the IP address of the server hosting your service. To start using CDN360, the end users' traffic needs to be directed to our edge servers. This can be done by creating a CNAME record with your DNS service provider that points your service hostname to a CDN360 'edge hostname' you create on this page. You can maintain multiple edge hostnames in your account for different traffic management requirements. Each edge hostname can be configured with sophisticated policies based on end users' geographic location and ISP, like a smart DNS service. Most importantly, those policies give you full control of the trade-off between service performance and the cost.

This pages displays the list of edge hostnames in your account. The following figure shows the key elements on the page, and the table following the figure describes them.

<p align=center><img src="/docs/resources/images/CNAMES_Overview.png" alt="edge hostname overview" width="900"></p>

| **Fields**   | **Description**                                                                        |
| :----------: | ---------------------------------------------------------------------------------------|
| 1            | A search box that you can enter any keyword to filter the edge hostname list.                  |
| 2            | The list of all edge hostnames in your account.                                      |
| 3            | Drop-down list to take actions on each edge hostname.                                          |
| 4            | The button to [create a new edge hostname](<docs/portal/traffic-control/creating-edge-hostname.md>).    |

## Edge Hostname Actions
Clicking the **Actions** drop-down list shows all the available actions that can be performed with each edge hostname.
- **Edit**: [Update](</docs/portal/traffic-control/editing-edge-hostname.md>) the selected edge hostname.
- **Delete**: Delete the edge hostname.
