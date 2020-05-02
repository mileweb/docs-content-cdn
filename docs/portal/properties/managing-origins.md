
# Managing Origins for Your Property

Origins are your web servers containing the content you want CDN360 to accelerate. CDN360 supports more than one origin for each property, and a plethora of setting regarding how to access your origins.

## Adding or Editing of Origins in a Property

1. In the left pane, click **Properties**, then click the ID of the property you want to edit. Select the property version to be edited, clone it if needed. You should see the section about origin as shown below:
<p align="center"><img src="/docs/resources/images/OriginList.png" alt="Upload Certificate Version" width="600"></p>
2. If there is any existing origin as shown by the picture above, you can click the **Edit** or **Remove** links to edit or remove them. You click the **Add Origin to List** below to add a new origin. The following dialog box will show up:
<p align="center"><img src="/docs/resources/images/Add Origin Page.png" alt="Upload Certificate Version" width="600"></p>
The Edit Origin UI is basically the same.

3. Complete the fields in the Add Origin form. Required fields are denoted by an asterisk (*).

| **Fields**             | **Description**                                       |
| ---------------------- | ----------------------------------------------------- |
| Auto Detect            | This button only appears when are create a new property. When you click it CDN360 will try to resolve the IP address of the hostname you entered for the property. It may or may not be the origin you want to use. Please double check the results.|
| Origin Name            | A name to identify this origin. It will be used by the [`origin_pass` directive](</docs/edge-logic/supported-directives.md#origin_pass>) in [Edge Logic](</docs/edge-logic/>) to refer to this origin|
| Servers                | Enter a hostname or IP address of the primary HTTP or HTTPS server from which CDN360 is expected to retrieve your content. After entering the server hostname or IP address, click **Validate** to verify that the server information is correct and reachable. To add more servers, click the **Add new +** link. To remove a server, click the **Remove** link.|
| Backup Servers         | Enter a hostname or IP address of the backup HTTP or HTTPS server that CDN360 will query for content if the primary server is not available. Click **Add new +** to specify the backup server, and then click **Validate** to verify. To remove a backup server, click the **Remove** link.|
|| **Advanced Settings**                                                         |
| Supported Protocols   | The protocol that your origin server supports. Choices are: <ul><strong><li>HTTP</strong> = use HTTP only.<li><strong>HTTPS</strong> = use HTTPS only.<br><li><strong>Both</strong> = use HTTP and HTTPS. (*default*)</li></li></br>                                                       |
| Supported SNI         | Select whether your server supports Server Name Indication (SNI). Choices are:<br><ul><li><strong>True</strong> = server supports SNI. (*default*)<li><strong>False</strong> = server does not support SNI.</li></li></ul></br>                                                                    |
| Verify Origin         | Select whether CDN360 performs backend verification of the TLS certificate on the origin servers. Choices are:<br><ul><li><strong>True</strong> = perform backend verification.<li><strong>False</strong> = do not perform backend verification. (*default*)</li></li></ul></br>                    |
| Host Header           | Enter a hostname that CDN will use to contact the origin.                        |
| Direct Connection     | There may be times CDN servers fetch content from the origin server. This option allows CDN360 to search other CDN360 servers where the content is cached. Choices are:<ul><li><strong>No Direct</strong> = always try a parent cache first to fetch missing content.<br><li><strong>Auto</strong> = CDN360 cache server uses resource- and performance-based metrics to decide whether to go to the origin directly or to a parent cache. (*default*)<br><li><strong>Always Direct</strong> = select this option if you want CDN360 to always go directly to the origin server to fetch content.</ul></li></li></li>                                                                                                                                                                |
| Authentication        | Enables authentication for Amazon Web Services (AWS) S3 servers. Choices are:<br><ul><li><strong>None</strong> = no authentication. (*default*) <br><li><strong>AWS S3</strong> = enables authentication for AWS S3 servers. If you select this choice, complete the following fields:<ul><li><strong>Region</strong> = select a [region](<https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html>) from the drop-down list.<br><li><strong>Access Key</strong> = enter the AWS access key used to authenticate requests on the AWS server.<br><li><strong>Secret Key</strong> = enter the AWS secret key used to authenticate requests on the AWS server.</ul></br>                                                                |

> 3. Click **Add Origin**.

## Editing Origins

 A property origin can be edited only if the property has not been deployed to production. If you need to update a deployed property, either [undeploy](</docs/portal/properties/undeploying-property.md>) the property or [create](</docs/portal/properties/creating-property.md>) a new property version.

1. In the left pane, click **Properties**.
2. On the Properties page, click the ID of the property whose origin you want to edit.

     <br><u>OR</u></br><br>

     Click the **Actions** menu for the property whose origin you want to edit, and then select **Edit**.<br><br>
3. Next to the **Version Number** field, click the **Edit** button. If this button is disabled, it means the version has been deployed to production.

![null](</docs/resources/images/Property - Edit Origins.png>)

4. In the **Origins** field, click the **Edit** link for the origin you want to edit.

![null](</docs/resources/images/Viewing Origins-3.png>)

5. Make your changes in the Edit Origin form (see the table above). Required fields are denoted by an asterisk (\*).

![null](</docs/resources/images/Edit Origin Page.png>)


6. Click **Edit Origin** to save your updated configuration.

7. Click **Save & Validate** followed by **OK**. The Configuration Validated screen shows the validation progress.

8. When a check mark appears at the end of the progress bar on the Configuration Validated screen, click **Go to Dashboard**.

## Viewing Origins

1. In the left pane, click **Properties**.

2. On the Properties page, click the ID of the property whose origin you want to view.

     <br><u>OR</u></br><br>

     Click the **Actions** menu for the property whose origin you want to view, and then select **Edit**.<br><br>

3. In the **Origins** field, click the <strong>View</strong> link.

![null](</docs/resources/images/Page - View Origins.png>)

4. View the origin in the View Origin dialog box. When you finish viewing, click the **Close** button.
 
## Removing Origins

**Note**: You can remove property origins only if the origin has not been deployed to staging or production.

1. In the left pane, click **Properties**.

2. On the Properties page, click the ID of the property whose origin you want to remove. The Property form appears.

3. At the right side of the **Version Number** field, click the <strong>Edit</strong> button.

![null](</docs/resources/images/Property Page.png>)

4. At the right side of the **Origins** field, click the **Remove** link. The Remove Origins dialog box appears.

![null](</docs/resources/images/origin7.png>)

5. Click **Remove Origin** to remove this origin from your property.
6. Exit the Property form.
