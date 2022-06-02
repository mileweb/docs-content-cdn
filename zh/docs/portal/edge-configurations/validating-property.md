# Validating a Property

A property version must be validated before it can be deployed to staging and/or production environments. CDN Pro sends the compiled property and associated certificate(s) to a validation environment and performs basic tests, such as making sure the server does not crash and running artificial traffic to the hostnames associated with the property. The validation process usually takes less than a minute. 

The following procedure describes how to validate a property. For more information, see the [CDN Pro API](</apidocs#tag/Property-Validation>). 

1. In the left pane, click **Edge Configurations** > **Properties**.
2. Click the ID of the property you want to validate. <br><br><u>OR </u></br>
   In the **Actions** column, click the vertical ellipsis associated with the property you want to validate, and then select **Edit**.
3. Click the horizontal ellipsis next to the **Edit** or **Clone** button, and then select **Validate** followed by **OK**. When the validation is completed, a message shows whether the validation succeeded or failed.
4. When a message says that the configuration has been validated and is ready to deploy, click **Deploy It**. When the Deployment Target dialog box appears, select whether to deploy to staging (default) or production, and then click **Deploy Now**. Or click **Add to Standby task** to move this action to the [standby queue](<docs/portal/tasks/standby-tasks.md>). Clicking **Cancel** cancels deployment.</ul></li> If the configuration fails validation, click **View Details** in the message to view details about the failure.