
# Editing Secrets

1. In the left pane, click **Edge Configurations**, and then select **Secrets**.

2. On the Secrets page, click the ID of the secret you want to edit, and then click the **Update Secret** button. 
   <br><U>OR </u></br>
  In the **Actions** column, click the vertical ellipsis for the secret you want to edit, and then select **Edit**.

<p align="center"><img src="/docs/resources/images/secrets/edit-secrets.png" alt="Edit secrets" width="700"></p>

3. Make your changes in the Update Secret form. Required fields are denoted by an asterisk (\*) and described in [Creating a Secret](</docs/portal/secrets/creating-secrets.md>).

**Note:** Deployed properties using the secret will continue to use its original value at the time of deployment. If you change the secret's name, property versions referring to the old name will not pass future [validations](</docs/portal/tasks/validations.md>) until you edit the properties to remove the references or update them to use a valid secret's name. If you change the secret's value, properties using the secret must be revalidated before they can be redeployed.

4. Click the **Update** button.