# Managing Tasks

Property versions must be validated before they can be deployed to staging or production. Each time you perform a validation, CDN360 sends the compiled property, along with its associated certificate(s), to a validation environment. In this environment, CDN360 performs tests to ensure that the server does not crash and runs artificial traffic to the hostnames associated with the property. Typically, the validation process takes less than 5 minutes.

## Tasks Page

Tasks are managed from the Tasks page. To display this page, click **Tasks** in the left pane.
The following figure shows the key elements on the page, and the table following the figure describes them.

<p align=center><img src="/docs/resources/images/Tasks Page.png" alt="tasks page" width="900"></p>

| **Element Number** | **Description** |
| :-----------------: | --------------- |
| 1 | Use these radio buttons to view tasks that have been validated or deployed. The most recent tasks appear at the top of the list.
| 2 | To filter tasks, type characters in this field and press the Enter key. Tasks that do not contain the typed characters are hidden. Filtering is not case-sensitive. To remove the filter, click the Reset button.
| 3 | Click a task ID or name to view details about the selected task.|

## Viewing Task Details

1. In the left pane, click **Tasks**.
2. To view details about tasks related to validations, confirm that the **Validation** radio button is selected. Then click a task ID or name. The following figure shows task details for a successful validation.

<p align=center><img src="/docs/resources/images/Successful Validation.png" alt="successful validation" width="900"></p>

<ul>The following figure shows task details for a failed validation.</ul>

<p align=center><img src="/docs/resources/images/Failed Validation.png" alt="failed validation" width="900"></p>

3. To view details about tasks related to deployments, click the **Deployment** radio button. Then click a task ID or name. The following figure shows task details for a successful deployment. If a **Certificate ID** or **Property ID** appears, clicking it displays the form for that certificate or property.

<p align=center><img src="/docs/resources/images/Successful Deployment.png" alt="successful deployment" width="900"></p>

 <ul>The following figure shows task details for a failed deployment. If a <strong>Certificate ID</strong> or <strong>Property ID</strong> appears, clicking it displays the form for that certificate or property.</ul>

<p align=center><img src="/docs/resources/images/Failed Deployment.png" alt="failed deployment" width="900"></p>
