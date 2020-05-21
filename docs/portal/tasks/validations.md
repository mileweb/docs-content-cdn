<!--?xml version="1.0" encoding="utf-8"?-->

# Check Property Validation Results

A property version must be validated before it can be deployed to staging and/or production environments. CDN360 sends the compiled property and associated certificate(s) to a validation environment and performs basic tests, such as making sure the server does not crash and running artificial traffic to the hostnames associated with the property. The validation process usually takes less than a minute. See the [CDN360 API](</apidocs#tag/Property-Validation>) for more information. The status of all property validations can be checked on the "Tasks" page as follows:

1. In the left pane, click **Tasks**.
2. Confirm that the **Validation** radio button is selected.

<p align="center"><img src="/docs/resources/images/Validations_Overview.png" alt="Validation Tasks" width="900"></p>
 
3. Click an ID or task name to display the details about the validation results.

**Note:** You can use the **Search** box on top to filter the results. Filtering is  case-insensitive.
