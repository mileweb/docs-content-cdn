
# Managing Origins for Your Property

Origins are your web servers containing the content you want CDN360 to accelerate. CDN360 supports more than one origin for each property, along with a plethora of settings for defining access to your origins.

## Adding or Editing of Origins in a Property

1. In the left pane, click **Properties**.
2. From the Prperty page, click the ID of the property you want to edit, and then select the version from the drop-down list. 
3. Click the **Edit** or **Clone** button to make changes. A section similar to one below appears.
<p align="center"><img src="/docs/resources/images/OriginList.png" alt="Upload Certificate Version" width="600"></p>
4. If there is an existing origin (similar to the "temporary" one in the figure above), you can click the <strong>Edit</strong> and complete the fields in the following dialog box that appears to edit the origin, or click <strong>Remove</strong> link to remove the origin. To add a new origin, click the <strong>Add Origin To List</strong> link, and then complete the fields in the following dialog box. Required fields are denoted by an asterisk (*).

**NOTE** The fields for adding and editing origins are similar.

<p align="center"><img src="/docs/resources/images/Add Origin Page.png" alt="Upload Certificate Version" width="600"></p>

| **Fields**             | **Description**                                       |
| ---------------------- | ----------------------------------------------------- |
| Auto Detect            | This button only appears when creating a new property. When you click it CDN360 will try to resolve the IP address of the hostname you entered for the property. It may or may not be the origin you want to use. Please double check the results.|
| Origin Name            | A name to identify this origin. It will be used by the [`origin_pass` directive](</docs/edge-logic/supported-directives.md#origin_pass>) in [Edge Logic](</docs/edge-logic/intro.md>) to refer to this origin|
| Servers                | Enter a hostname or IP address and the port numbers of a primary origin server. Click **Validate** to verify that the server information is correct and reachable. To add more servers, click the **Add new +** link. To remove a server, click the **Remove** link.|
| Backup Servers         | Backup origin server will be used when all primary servers are not accesible. Click **Add new +** to specify the backup server in the same way as primary servers.|
|| **Advanced Settings**                                                         |
| Supported Protocols   | The protocol(s) that your origin server supports. Choices are: <ul><li><strong>HTTP</strong> = use HTTP only.<li><strong>HTTPS</strong> = use HTTPS only.<li><strong>Both</strong> = use HTTP and HTTPS. (*default*)</ul>|
| Support SNI         | Select whether this origin supports Server Name Indication (SNI). Choices are:<ul><li><strong>True</strong> = server supports SNI. (*default*)<li><strong>False</strong> = server does not support SNI.</ul>|
| Verify Origin         | Whether CDN360 should verify the TLS certificate on the origin servers. Choices are:<ul><li><strong>True</strong> = perform backend verification.<li><strong>False</strong> = do not perform backend verification. (*default*)</ul>|
| Host Header           | Enter a `Host` header value that CDN will use to contact the origin. By default, the value in the client request will be passed through.|
| Direct Connection     | This option specifies how the CDN360 edge servers should reach the origin servers for uncached content or uncacheable requests. Choices are:<ul><li><strong>Always Direct</strong> = The edge servers should always go directly to the origin servers.<li><strong>Auto</strong> = Automatically decide whether to go to the origin directly or to a parent CDN360 server, based on performance and resource availability. (*default*)<li><strong>No Direct</strong> = Always go to a parent CDN360 server. Choose this one if you want to maximize the cache hit ratio on CDN360</ul>|
| Authentication        | Enables authentication for Amazon Web Services (AWS) S3 servers. Choices are:<ul><li><strong>None</strong> = no authentication. (*default*) <br><li><strong>AWS S3</strong> = enables authentication for AWS S3 servers. If you select this choice, you need to provide additional information to access the S3 bucket:<ul><li><strong>Region</strong> = select a [region](<https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions>) from the drop-down list.<li><strong>Access Key</strong> = enter the AWS access key to authenticate with the S3 server.<li><strong>Secret Key</strong> = enter the AWS secret key to authenticate with the S3 server.</ul>|

5. Click the **Add Origin** button
