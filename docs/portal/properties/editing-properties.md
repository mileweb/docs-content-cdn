
# Editing Properties

1. In the left pane, click **Properties**.
2. On the Properties page, click the ID of the property you want to edit.
    
    <br><u>OR</u><br><br>

    Click the **Actions** menu for the property you want to edit, and then select **Edit**.<br><br>
3. Next to the **Version Number** field, click the **Edit** button.
4. Make your changes in the Edit Property form. Required fields are denoted by an asterisk (\*).

| **Fields**     | *Description**                                                |
| -------------- | --------------------------------------------------------------|
| Version Number | Read-only field that shows the version number of this property.                                                                        |
| Description    | Add a description to associate with this property.            |
| Hostnames      | Enter one or more hostnames that website visitors access for your content.                                                                    |
| Origins        | Origins are your web servers that CDN360 accesses to fetch your content. Use the links to [add, edit, or remove origins](</docs/portal/properties/managing-origins.md>).                                                |
| Edge Logic     | Change the server configuration that defines how CDN360 delivers content to website visitors. For more information, refer to [CDNetworks' Edge Logic documentation](</docs/edge-logic/intro.md>).                          |
| TLS Settings   | Select the [TLS client certificate settings]?? for your property.                                                                        |
| Real Time Logging | If this advanced feature was enabled for you, complete the [real-time logging parameters]??. If you require this feature, contact CDNetworks.|
| Advanced Settings | Use [Advanced Settings](</docs/portal/properties/advanced-settings.md>) to determine how content is cached, whether your website can be accessed from China, and whether a load balancer hash key should be used.                                                                             

5. To save the property, click the **Save** button. You can validate it at a later time, by performing steps 1 through 3 above, and then clicking the **Save & Validate** button.<br>

<ul><u>OR</u><br><br>

To save and validate the property, click the **Save & Validate** button. When the Deployment Confirmation pop-up appears, click **OK**. Wait for the message that the configuration has been successfully validated and is ready to deploy, or click the **Go to Dashboard** button in the Configuration Validated box to perform other tasks while validation continues in the background. When validation completes, click **Tasks** in the left pane to confirm that the property validated successfully.<br>
6. If the property validated successfully, you can [deploy](</docs/portal/properties/deploying-property.md>) it.
