# Managing Edge Hostnames 

An edge hostname is a DNS record used to alias one domain name to a different domain name. The edge hostname performs aliasing by pointing a domain or subdomain to the IP address of the destination hostname. In this way, if the IP address of the destination hostname changes, you will not need to change your DNS records because the edge hostname will have the same IP address.

Edge hostnames are managed from the CNAMEs page. Using this page, you define edhe host names to which you can point your hostnames. To display this page, click **Traffic Management** in the left pane.

The following figure shows the key elements on the page, and the table following the figure describes them.

<p align=center><img src="/docs/resources/images/CNAMES_Overview.png" alt="cnames overview" width="900"></p>

| **Element Number**   | **Description**                                                                        |
| :------------------: | ---------------------------------------------------------------------------------------|
| 1                    | A search box that you can enter any keyword to filter the edge hostname list.          |
| 2                    | The list of all edge hostnames that are available to you.                              |
| 3                    | Drop-down list to take actions on each edge hostname.                                  |
| 4                    | The button to [create new edge hostnames](<docs/portal/cnames/../../../creating-cname.md>).    |

## Edge Hostname Actions
Clicking the **Actions** drop-down list shows all the available actions that can be performed with edge hostnames.
(Show Actions drop-down menu??)
- **Edit**: [Update](</docs/portal/cnames/editing-cname.md>) the selected edge hostname.
- **Delete**: [Delete](</docs/portal/cnames/deleting-cname.md>) the edge hostname.
