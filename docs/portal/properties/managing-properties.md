# About Properties

A "property" is the configuration of one or more hostnames (domains) that need to be deployed to the CDN360 proxy servers. It determines how you want the servers to obtain, manage, and distribute your content to the end users. The key elements of a property include:
- hostname(s) to be accelerated
- the origin server(s)
- the proxy server behaviors, such as cache time, header modification etc.
- if HTTPS is requred, TLS certificates, TLS protocol version etc.

## Managing Properties

On the CDN360 platform, property configurations are versioned to support tracking the history of changes and allow rollback if needed. Each version can be independently deployed to the staging or production environment. On the portal, you can create, modify, validate and deploy properties. You can of course undeploy and delete them if needed.

Properties are managed from the Properties page. To display this page, click **Properties** in the left pane. The following figure shows the key elements on the page, and the table following the figure describes them.

![null](</docs/resources/images/Properties Page.png>)


| **Fields**   | **Description**                                                                           |
| :----------: | ----------------------------------------------------------------------------------------- |
| 1            | To filter properties, type characters in this field and then press the Enter key. All properties that do not contain the typed characters are hidden. Filtering is not case-sensitive. To remove the filter, click the **x** icon at the right side of the search field.                                    |
| 2 | Each property appears on its own row.                                                                |
| 3 | The **Actions** drop-down list on each row has options to [edit a property](</docs/portal/properties/editing-properties.md>), [compare property versions](</docs/portal/properties/comparing-properties.md>), [undeploy a property](</docs/portal/properties/undeploying-property.md>) from a staging or production environment, and [delete a property](</docs/portal/properties/deleting-property.md>).                      |
| 4 | The **Create Property** button allows you to [create](</docs/portal/properties/creating-property.md>) new properties.                                                                                            |
