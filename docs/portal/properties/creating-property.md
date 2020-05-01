# Creating a Property

To create a property, complete the Create a Property form with your server and certificate information. After completing the form, save and [validate](</docs/portal/properties/validating-property.md>) your property before you deploy and test it.

1. In the left pane, click **Properties**.
2. At the top right of the Properties page, click the **Create Property** button. 

![null](</docs/resources/images/Create Property.png>)

3. Complete the fields in the Create a Property form. Required fields are denoted by an asterisk (\*).

![null](</docs/resources/images/Create a Property.png>)

| **Fields**                | **Description**                                    |
| --------------------------| ---------------------------------------------------|
| Property Name             | Enter a name that helps you identify this property.                                                                        |
| Description               | Add a description to associate with this property.                                                                        |
| Configuration Version     | Read-only field that shows the version number of this property. By default, your first property configuration is Version 1.                                                                               |
| Description               | Add a description for this property.                                                                        |
| Hostnames                 | Enter one or more hostnames that website visitors access for your content.                                                         |
| Origins                   | Origins are your web servers that CDN360 accesses to fetch your content. You can specify more than one server. Click the **Add Origin To List** link and then see [Adding Origins to Your Property](</docs/portal/properties/managing-origins.md>).                                                                                |
| Edge Logic                | Specify the server configuration that defines how CDN360 delivers content to website visitors (refer to CDNetworks' [Edge Logic documentation](</docs/edge-logic/intro.md>)), or click the [**Wizard** button]?? to define the Edge Logic using the Cache Settings dialog box.                                                                                                                                                               |
| TLS Settings              | Select the [TLS client certificate settings]?? for your property.                                                               |
| Real Time Logging | If this advanced feature was enabled for you, complete the [real-time logging parameters]??. If you require this feature, contact CDNetworks.                                                                      |
| Advanced Settings         | Use [advanced settings](</docs/portal/properties/advanced-settings.md>) to determine how content is cached, whether your website can be accessed from China, and whether a load balancer hash key should be used.                                                                            |

4. To save the property, click the **Save** button. You can validate the saved property at a later time by displaying the [Edit Property](</docs/portal/properties/editing-properties.md>) form, and then clicking the **Save & Validate** button in the Edit Property form.<br>

<ul><u>OR</u></ul>

<ul>To save and validate the property, click the <strong>Save & Validate</strong> button. When the Deployment Confirmation pop-up appears, click <strong>OK</strong>. Wait for the message that the configuration has been successfully validated and is ready to deploy, or click the <strong>Go to Dashboard</strong> button in the Configuration Validated box to perform other tasks while validation continues in the background. When validation completes, click <strong>Tasks</strong> in the left pane to confirm that the property validated successfully.</ul>

5. If the property validated successfully, you can [deploy](</docs/portal/properties/deploying-property.md>)) it.

