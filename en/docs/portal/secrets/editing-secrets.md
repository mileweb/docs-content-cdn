
# Editing Secrets

1. In the left pane, click **Edge Configurations**, and then select **Secrets**.

2. On the Secrets page, click the ID of the secret you want to edit, and then click the **Update Secret** button. 
   <br><U>OR </u></br>
  In the **Actions** column, click the vertical ellipsis for the secret you want to edit, and then select **Edit**.

<p align="center"><img src="/docs/resources/images/secrets/edit-secrets.png" alt="Edit secrets" width="700"></p>

3. Make your changes in the Update Secret form. Required fields are denoted by an asterisk (\*) and described in [Creating a Secret](</docs/portal/secrets/creating-secrets.md>).

**Note:** Deployed properties using the secret will continue to use its original value at the time of deployment. Changing the name will break validation for property versions that reference it. Changing the secret value requires re-validation and re-deployment of property versions to take effect.

4. Click the **Update** button.