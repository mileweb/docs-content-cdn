# Cloning Properties

After a property version has been deployed to staging or production, it is locked from further changes and no additional edits are permitted. However, you can clone the version of your property to create a new version that you can edit.

1. In the left pane, click **Properties**.
2. On the Properties page, click the ID of the property you want to clone.

    <br><u>OR</u><br><br>

    Click the **Actions** menu for the property you want to clone, and then select **Edit**.<br><br>

3. Next to the **Version Number** field, click the **Clone** button. 

![null](</docs/resources/images/Cloning Properties - Edit Button.png>)

4. The cloned property inherits the following fields from the original property. Change them as required. Required fields are denoted by an asterisk (\*).

| **Fields**              | **Description**                                      |
| ----------------------- | ---------------------------------------------------- |
| Version Number          | Read-only field that shows the version number of this property.                                                                        |
| Description             | Add a description to associate with this property.   |
| Hostnames               | Enter one or more hostnames that website visitors access for your content.                                                         |
| Origins                 | Origins are your web servers that CDN360 accesses to fetch your content. Click the links to [add, edit, or delete origins](</docs/portal/properties/managing-origins.md>).                                         |
| Edge Logic              | Change the server configuration that defines how CDN360 delivers content to website visitors. For more information, refer to [CDNetworks' Edge Logic documentation](</docs/edge-logic/intro.md>).             |
| TLS Settings | Select the [TLS client certificate settings]?? for your property.|
| Real Time Logging | If this advanced feature was enabled for you, complete the [real-time logging parameters]??. If you require this feature, contact CDNetworks.                                                                      |
| Advanced Settings | Use [Advanced Settings](</docs/portal/properties/advanced-settings.md>) to determine how content is cached, whether your website can be accessed from China, and whether a load balancer hash key should be used.                                                                            |


5. Click the **Save** button to save the cloned property. To validate the saved property at a later time, display the [Edit Property](</docs/portal/properties/editing-properties.md>) form, and then click the **Save & Validate** button in the Edit Property form.

    <br><u>OR</u><br><br>

    Click the **Save & Validate** button followed by **OK** to save and validate the property. When the Validating Configuration pop-up appears, either wait for the message that the configuration has been successfully validated and is ready to deploy, or click the **Go to Dashboard** button to perform other tasks while validation continues in the background, and then click **Tasks** in the left pane to confirm that the property validated successfully.<br><br>

6. If the property validated successfully, you can [deploy](</docs/portal/properties/deploying-property.md>) it.

