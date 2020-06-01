
# Editing Properties

1. In the left pane, click **Edge Configurations**.

2. On the Properties page, click the ID of the property you want to edit. 
   <br><U>OR </u></br>
   Click the **Actions** menu for the property you want to edit, and then select **Edit**.

<p align="center"><img src="/docs/resources/images/edge-configurations/property-versions.png" alt="Upload Certificate Version" width="700"></p>

3. From the **Version Number** drop-down list, choose the property version you want to edit. If the **Edit** button is enabled, you can click it to start editing.

**Note:** If there is a lock icon next to the version number, it means this version has been deployed. Therefore, editing this version is not permitted and the **Edit** button is disabled. This ensures that CDN360 can reliably roll back to any version that has been deployed. If you want to make any changes on top of this version, click the **Clone** button to create a new version to edit.

4. Make your changes in the Edit Property form. Required fields are denoted by an asterisk (\*) and described in [Creating a Property](</docs/portal/edge-configurations/creating-property.md>).

5. Save and [validate](</docs/portal/tasks/validations.md>) the new version before you deploy it.
