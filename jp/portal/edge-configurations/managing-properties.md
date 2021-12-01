# Using Properties to Configure the Edge

A "property" is a configuration of one or more hostnames (domains) that need to be deployed to the CDN Pro edge servers. A property determines how you want the servers to obtain, cache, modify, and distribute your content to end users. The key elements of a property include:
- Service hostname(s) to be accelerated
- One or more origin servers
- Caching rules for different types of contents
- Modifications to the URL or HTTP header fields
- Whether HTTPS is required, TLS certificates, and TLS protocol version

## Managing Properties

On the CDN Pro platform, each property is versioned to track the history of changes and allow rollback if needed. Each version can be deployed independently to the staging or production environment. 

Using the Properties page, you can create, modify, validate, and deploy properties. You can also undeploy and delete properties if needed. To display the Properties page, click **Edge Configurations** in the left pane, and then select **Properties**. The following figure shows the key elements on the page, and the table following the figure describes them.

<p align=center><img src="/docs/resources/images/edge-configurations/properties-w-numbers.png" alt="properties page" width="900"></p>


| **Fields**   | **Description**                                                                           |
| :----------: | ----------------------------------------------------------------------------------------- |
| 1            | A search box for filtering properties that have been deployed to staging or production. You can filter properties by ID, name, description, hostname, or configuration settings. To enter multiple search strings, separate each one with a carriage return. For more information, see [Filtering Properties](#filtering-properties).</br>                                   |
| 2            | Appears only for resellers, allowing them to search the properties of their child customers.                |
| 3            | The list of all properties that are available to you.                                                                 |
| 4            | Icons to filter properties based on whether they have been deployed to staging or production.                                  |
| 5            | Drop-down lists to take actions on each property.                                                                     |
| 6            | The button to [create new properties](</docs/portal/edge-configurations/creating-property.md>).                       |

## Filtering Properties
CDN Pro provides robust filtering capabilities that allow you to find properties that meet certain criteria.

### Using the Carat
Typing the carat character at the beginning of a search string narrows matches to properties whose name, description, or hostnames fields start with the text following the <b>^</b>. For example, <b>^domain</b> matches the hostnames domain.com and domain123.com, but not abc.123domain.com.<br><br><b>Note:</b> When searching for a property by ID, specify the entire ID, not just a portion of it.

### Performing Advanced Searches
If you have many properties, use <b>hasConfig=<i><'configuration'></i></b> to find properties that match a specific configuration. In an advanced search string, <b><i><'configuration'></b></i> is a keyword supported by the CDN Pro API. For more information, refer to the [CDN Pro API Specification](</apidocs#operation/createPropertyVersion>).<br>

You can search for properties matching multiple settings by entering more than one <b>hasConfig=<i><'configuration'></i></b> search string in the search box. Type the first one and press the Carriage Return key, and then repeat this sequence for each additional advanced search string you want to enter in the search box.

Observe the following guidelines when performing advanced searches:<ul><li>Searches on numeric and Boolean fields return an exact match.</ul></li><ul><li>Searches on strings return full and partial matches.</ul></li><ul><li>If you omit the colon and configuration keyword, CDN Pro returns all properties that have a non-empty configuration for the field. </ul></li><ul><li>If a property has multiple versions, the property is included in the matched results if any of its versions matches the <b>hasConfig</b> configuration keyword.</ul></li><ul><li>You can specify the subfields of a property version by using the period (<b>.</b>) as a separator.</ul></li>

The following table shows examples of using <b>hasConfig=<i><'configuration'></i></b> to perform advanced searches.

| **Example**                           | **Description**                                                                                                        |
| --------------------------------------| -----------------------------------------------------------------------------------------------------------------------|
| hasConfig=hasBeian:true               | Returns properties whose <b>Has ICP Beian</b> setting is Yes.                                                          |
| hasConfig=edgeLogic!sorted            | Returns properties for which the <b>Edge Logic</b> field does not include the configuration keyword <b>sorted</b>.     |
| hasConfig=hostnames:domain            | Returns all properties with a hostname containing the string <b>domain</b> such as <b>mydomain.com</b> and <b>thedomains.com</b>. |
| hasConfig=disableHttp2:true           | Returns properties that do not support HTTP2.                                                                          |
| hasConfig=extraServicePorts.http:85   | Returns properties that support port 85 for HTTP requests.                                                             |
| hasConfig=origins.servers:myorigin.com| Returns properties that use myorigin.com as an origin server.                                                          |

## Property Actions
Each property has a vertical ellipsis in the **Actions** column. Clicking the ellipsis shows the available actions that can be performed on the selected property.
- **Edit**: [Update](</docs/portal/edge-configurations/editing-properties.md>) the selected property.
- **Compare Versions**: [Compare](</docs/portal/edge-configurations/comparing-properties.md>) two property versions.
- **Undeploy from Staging**: [Undeploy](</docs/portal/edge-configurations/deploying-property.md>) the selected property from the staging environment.
- **Undeploy from Production**: [Undeploy](</docs/portal/edge-configurations/deploying-property.md>) the selected property from production.
- **Delete**: [Delete](</docs/portal/edge-configurations/deleting-property.md>) the selected property.
- **Deployment History**: [View](</docs/portal/edge-configurations/deploying-property.md>) the deployment history of the selected property.
- **Clone**: [Copy](</docs/portal/edge-configurations/creating-property.md>) settings into the Create a Property form to create a new property.
- **Report**: [Run](</docs/portal/reports.md>) a report using the hostnames of the deployed property. This action is available only for properties that have been deployed to production.