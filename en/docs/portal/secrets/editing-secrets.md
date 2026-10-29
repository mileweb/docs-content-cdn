
# Editing Secrets

1. In the left pane, click **Edge Configurations**, and then select **Secrets**.

2. On the Secrets page, click the ID of the secret you want to edit, and then click the **Update Secret** button. 
   <br><U>OR </u></br>
  In the **Actions** column, click the edit icon for the secret you want to edit to open the Update Secret page.

<p align="center"><img src="/docs/resources/images/secrets/edit-secrets.jpg" alt="Edit secrets" width="700"></p>

3. Make your changes in the Update Secret form. Required fields are denoted by an asterisk (\*) and described in [Creating a Secret](</docs/portal/secrets/creating-secrets.md>).

**Note:** </br>
If you change the secret's name, property versions referring to the old name will not pass future [validations](</docs/portal/tasks/validations.md>) and deployments. You must edit the properties to remove the references or update them to use a valid secret's name.</br></br>If you change the secret's value, deployed properties using the secret must be revalidated and redeployed for the change to take effect.

4. Click the **Update** button.