# Managing Tasks

Property versions must be validated before they can be deployed to staging or production. Each time you perform a validation, CDN360 sends the compiled property, along with its associated certificate(s), to a validation environment. In this environment, CDN360 performs tests to ensure that the server does not crash and runs artificial traffic to the hostnames associated with the property. Typically, the validation process takes less than 5 minutes.

## Tasks page

Tasks are managed from the Tasks page. To display this page, click **Tasks** in the left pane.
The following figure shows the key elements on the page, and the table following the figure describes them.

![null](</docs/resources/images/Tasks Page.png>)

| **Fields** | **Description** |
| :----------: | --------------- |
| 1 | Use these radio buttons to view tasks that have been validated or deployed: <ul><li>**Validation** lists the validation tasks that have been performed, with the most recent ones at the top of the list.<br><li>**Deployment** lists the deployment tasks that have been performed, with the most recent ones at the top of the list.
| 2 | To filter tasks, type characters in this field and press the Enter key. Tasks that do not contain the typed characters are hidden. Filtering is not case-sensitive. To remove the filter, click the Reset button.
| 3 | Click a task ID or name to view details about the selected task.|

## Viewing Task Details

1. In the left pane, click **Tasks**.
2. To view details about tasks related to validations, click the task ID or name on the **Validation** tab. The following figure shows task details for a successful validation.

(/docs/resources/images/Successful Validation.png)

<ul>The following figure shows task details for a failed validation.</ul>

![null](</docs/resources/images/Failed Validation.png>)

3. To view details about tasks related to deployments, click the ID or name of a task on the **Deployment** tab. The following figure shows task details for a successful deployment. If **Certificate ID** or **Property ID** appears at the bottom left, clicking it displays the form for that certificate or property.

![null](</docs/resources/images/Successful Deployment.png>)

 <ul>The following figure shows task details for a failed deployment. If **Certificate ID** or **Property ID** appears at the bottom left, clicking it displays the form for that certificate or property.</ul>

![null](</docs/resources/images/Failed Deployment.png>)
