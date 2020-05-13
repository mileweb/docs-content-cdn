# Creating a CNAME

For the CDN360 portal to serve your content, you must create a CNAME. The CNAME is configured with one or more client region rules that indicate how CDN360 will handle client requests.

Creating a CNAME is a three-step process:

- Create a CNAME using the procedure below. (Alternatively, you can use the [CDN360 API](</apispec>).)
- [Deploy the property](</docs/portal/properties/deploying-property.md>) defined with the hostname(s) to production.

- Update your DNS records to point your hostname(s) to the CNAME.

1. In the left pane, click **CNAMEs**.
2. At the top right of the screen, click the **Create CNAME** button. 
3. Complete the fields in the Create a CNAME form. Required fields are denoted by an asterisk (\*).

<p align=center><img src="/docs/resources/images/cname1.png" alt="cname overview page" width="900"></p>


| **Fields**                               | **Description**                     |
| ---------------------------------------- | ----------------------------------- |
| What does a CNAME do? Add a description. | Enter a description for the CNAME.  |
| CNAME                                    | Either enter a CNAME manually in the text field or click the **Auto Generate** button to have CDN360 generate a CNAME for you. If you enter a CNAME, your typed entry must be a valid domain name.                     |

4. Click the **Create Client Region Rule** button. The Create Client Region Rule dialog box appears, with fields for specifying how CDN360 handles requests from different regions. Required fields are denoted by an asterisk (\*).

**Note**: If you do not create a client region rule, or if you leave the **Client Region** field empty, a rule covering ALL regions is created automatically.

<ul>a. Complete all the fields, and then click the <strong>Create Client Region Rule</strong> button. 

b. To specify more client region rules, repeat step 4a for each additional rule.</ul>

<p align=center><img src="/docs/resources/images/Create Client Region Rule.png" alt="createclient region rule" width="500"></p>

| **Fields**        | **Description**                                                           |
| ----------------- | ------------------------------------------------------------------------- |
| Client Region     | Select a region for this rule. If you leave this field empty, a rule covering ALL regions is created automatically.|
| Client ISP        | Select a client ISP.                                                      |
| Action Type       | Select the type of action to be performed. Choices are:<br><li><strong>Deliver</strong> = specifies the server groups to deliver your traffic. Only one deliver action is allowed for each client region. All servers in the selected server group will be used as candidates in the load balancing algorithm.</li><li><strong>Redirect</strong> = directs traffic requests to the target specified in the Redirect target field (see below). This can be your origin site or another CDN provider. There can be multiple redirect actions for each client region.</li><li><strong>Reject</strong> = directs traffic requests to web servers that always respond with a 403 - forbidden error message. Only one reject action is allowed for each client region.</li></br>                   |
| Server Group      | If <strong>Action Type</strong> is set to <strong>Deliver</strong>, select one or more server group options:<br><li><strong>Standard</strong> = standard server group.</li><li><strong>Premium</strong> = includes the standard server group.</li><strong>Premium+</strong> = includes the standard and premium server groups.<li><strong>Ultra</strong> = includes the standard, premium, and premium+ server groups.</li>                                                                      |
| Redirect Target   | If <strong>Action Type</strong> is set to <strong>Redirect</strong>, specify an IP address or hostname to which CDN360 will redirect your traffic.                                                               |
| Weight | Adjust how this rule behaves relative to other rules for the same client region.      |

5. Expand **Advanced Settings**, and then confirm or change the following field.

<p align=center><img src="/docs/resources/images/cname3.png" alt="advanced settings" width="600"></p>

| **Fields**      | **Description**                                              |
| --------------- | ------------------------------------------------------------ |
| Has Beian       |        Select whether content will be served from PoPs inside or outside China. Choices are: <br><li><strong>No</strong> = content is served to website visitors in China from PoPs located outside China. (*default*)</li><li><strong>Yes</strong> = content is served to website visitors in China from PoPs located in China.</li>

6. Click the **Create CNAME** button.
7. After creating the CNAME, update your DNS records to point your hostname(s) to the CNAME.
