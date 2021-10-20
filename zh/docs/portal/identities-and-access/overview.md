# Manage Traffic with Edge Hostnames

When a content delivery network is not used, your service hostname should always resolve to the IP address of the server hosting the service. <p>To start acceleration with CDN360, end user traffic must be directed to the CDN360 edge servers. This can be done by creating a CNAME record with your DNS service provider that points the end user service hostname to a CDN360 "edge hostname" you create. You can maintain multiple edge hostnames in your account for different traffic management requirements. Each edge hostname can be configured with sophisticated policies to handle end user requests based on their geographic location and ISP. These policies also allow you to control the trade-off between service performance and cost.

In the left pane, click **Traffic Management** to see a page with a list of the edge hostnames in your account. The following figure shows the key elements on the page, and the table following the figure describes them.

<p align=center><img src="/docs/resources/images/traffic-management/traffic-management-w-numbers.png" alt="edge hostname overview"></p>

Anyone who can log in to and be authenticated by the CDN Pro portal is a user.


## What are Permissions?

The ability for users to perform actions within the portal is governed by permissions. Each permission has an intuitive name that describes its purpose. For example, certificate.create allows certificates to be created. A user must be granted a permission to perform the corresponding action in the portal.


## What are Roles?

Rather than assigning individual permissions directly to every portal user, permissions are grouped into roles. A role is a collection of users who share the same permissions. When you add a role, you specify a name for the role, select the permissions associated with the role, and then select the users who will be granted those permissions.

Initially, the portal provides three default roles: Admin, Operator, and Viewer.

- Admin can view and make changes to all settings available in the portal.
- Operator can view and make changes to all portal settings, except users and roles.
- Viewer has read-only permission and cannot change any portal settings.

## Identity & Access Management Page

To display the Identity & Access Management page, click your initials (**EM** in the figure below) at the top right of the portal, and then select **Identity & Access Management**.

<p align=center><img src="/docs/resources/images/identities-and-access/iam-user-info.png" alt="select identity management page" width="400"></p>

The following figure shows the key elements on the page, and the table following the figure describes them.

<p align=center><img src="/docs/resources/images/identities-and-access/iam-w-numbers.png" alt="select identity management page" width="900"></p>


| **Fields** | **Description** |
| :----------: | --------------- |
| 1 | Identity and access management tasks are organized into the following tabs:<ul> <li>**Users** allows administrators to manage users. Operators and viewers are limited to seeing other portal users. This tab appears when you click **Identity & Access Management**. <li>**Roles** allows administrators to manage roles. Operators and viewers are limited to seeing roles.|
| 2 | To filter users on the **Users** tab or roles on the **Roles** tab, type characters in this box. All users or roles that do not contain the typed characters are hidden. Filtering is not case-sensitive. To remove the filter, click the **Reset** button.|
| 3 | Each user or role appears on a row within its respective tab.|
| 4 | Drop-down list to take actions on the appropriate item.|
| 5 | The **Users** tab has an **+ Add User** button that allows administrators to [create new users](</docs/portal/identities-and-access/managing-users.md>). Similarly, the **Roles** tab has an **+ Add Role** button that allows administrators to [create new roles](</docs/portal/identities-and-access/managing-roles.md>). These buttons do not appear for viewers.|

## Edge Hostname Actions
Each edge hostname has a vertical ellipsis in the **Actions** column. Clicking the ellipsis shows the available actions that can be performed on the selected edge hostname.
- **Edit**: [Update](</docs/portal/traffic-management/editing-edge-hostname.md>) the selected edge hostname.
- **Delete**: [Delete](</docs/portal/traffic-management/deleting-edge-hostname.md>) the selected edge hostname.
- **Clone**: [Copy](</docs/portal/traffic-management/creating-edge-hostname.md>) settings into the Create an Edge Hostname form to create a new edge hostname.
- **Report**: [Display](</docs/portal/reports.md>) the Reports page to run an Edge Hostname Request report on the selected edge hostname.
