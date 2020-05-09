# Creating a Property

To create a property, complete the Create a Property form with required information. After creating a property, save and [validate](</docs/portal/properties/validating-property.md>) the property before you deploy and test it.

1. In the left pane, click **Properties**.
2. At the top right of the Properties page, click the **Create Property** button. 

<p align=center><img src="/docs/resources/images/Create Property.png" alt="create property" width="900"></p>

3. Complete the fields in the Create a Property form. Required fields are denoted by an asterisk (\*).

<p align=center><img src="/docs/resources/images/Create a Property.png" alt="edit property" width="800"></p>

| **Fields**                | **Description**                                    |
| --------------------------| ---------------------------------------------------|
| Property Name             | Enter a name that helps you identify this property.|
| Description               | Add a description to associate with this property. |
| Configuration Version     | Read-only field that shows the version number of this property. By default, your first property configuration is Version 1. |
| Description               | Add a description for this first property version. |
| Hostnames                 | Enter one or more hostnames to be accelerated and which your end users will access. |
| Origins                   | Origins are your servers that CDN360 accesses to fetch your content. You can specify more than one server. Click the **Add Origin To List** link and then see [Adding Origins to Your Property](</docs/portal/properties/managing-origins.md>).|
| Edge Logic                | Write NGINX configuration code to specify how you want CDN360 to deliver content to your visitors (refer to CDNetworks' [Edge Logic documentation](</docs/edge-logic/intro.md>)). You can click the [**Wizard** button](ToBeDone) to bootstrap this configuration using the Cache Settings dialog box.|
| TLS Settings              | Select the [TLS client certificate settings](ToBeDone) for your property.|
| Real Time Logging | If this advanced feature was enabled for you, complete the [real-time logging parameters](ToBeDone). If you require this feature, contact CDNetworks.|
| Advanced Settings         | Use [advanced settings](</docs/portal/properties/advanced-settings.md>) to specify cache sharing, China ICP Beian, and a load balancer hash key.|

4. To save the property, click the **Save** button. Several basic syntax checks are performed. If errors are found, you are prompted to fix them before the property is saved. Any property version will have to be "validated" before it can be deployed to staging or production. You can click the <strong>Save & Validate</strong> button to start the validation process. When the Confirmation pop-up appears, click <strong>OK</strong>. The validation process usually takes less than a minute. You can either wait for it to finish or close the progress dialog box to perform other tasks while validation continues in the background. You can click <strong>Tasks</strong> in the left pane to [check the validation results](</docs/portal/properties/validating-property.md>). If there is a failure, perform the instructions in the error message to fix it.

5. If the property is validated successfully, you can [deploy](</docs/portal/properties/deploying-property.md>) it to the staging or production environment. By default, trial users will have access to the staging environment only. Please contact the support team to enable access to the production environment.

