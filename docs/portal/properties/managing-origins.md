
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
| Supported Protocols   | The protocol that your origin server supports. Choices are: <ul><strong><li>HTTP</strong> = use HTTP only.<li><strong>HTTPS</strong> = use HTTPS only.<br><li><strong>Both</strong> = use HTTP and HTTPS. (*default*)</li></li>|
| Support SNI         | Select whether your server supports Server Name Indication (SNI). Choices are:<br><ul><li><strong>True</strong> = server supports SNI. (*default*)<li><strong>False</strong> = server does not support SNI.</li></li></ul>|
| Verify Origin         | Whether CDN360 should verify the TLS certificate on the origin servers. Choices are:<br><ul><li><strong>True</strong> = perform backend verification.<li><strong>False</strong> = do not perform backend verification. (*default*)</li></li></ul>|
| Host Header           | Enter a Host header value that CDN will use to contact the origin. By default, the Host header of the incoming request will be passed through.|
| Direct Connection     | This option specifies how the edge servers should reach the origin servers. Choices are:<ul><li><strong>Always Direct</strong> = the edge servers should always go directly to the origin servers.<li><strong>Auto</strong> = use resource and performance-based metrics to decide whether to go to the origin directly or to a parent cache. (*default*)<li><strong>No Direct</strong> = always go to parent server first to fetch missing content.</ul>|
| Authentication        | Enables authentication for Amazon Web Services (AWS) S3 servers. Choices are:<ul><li><strong>None</strong> = no authentication. (*default*) <br><li><strong>AWS S3</strong> = enables authentication for AWS S3 servers. If you select this choice, you need to provide additional information to access the S3 bucket:<ul><li><strong>Region</strong> = select a [region](<https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html>) from the drop-down list.<li><strong>Access Key</strong> = enter the AWS access key used to authenticate requests on the AWS server.<li><strong>Secret Key</strong> = enter the AWS secret key used to authenticate requests on the AWS server.</ul>|

4. Click the **Add Origin** button
