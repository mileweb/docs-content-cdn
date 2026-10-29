# Overview of Secrets

Typically, a secret is a password that you share with {{title}} in order for the CDN configuration to work. For example, a secret could be a key used to authenticate client requests to your origin server. By creating a secret and referring to it using the secret's name via the syntax `$SECRET(secretName)`, the key itself would not be exposed when viewing a property through the CDN Pro portal or fetching it using the CDN Pro API.

Secrets can be referenced in:
- **Edge Logic** - Use `$SECRET(secretName)` syntax in your Edge Logic configuration.
- **Origin Authentication** - Select a secret that contains the secret key to be used for AWS S3 authentication when [configuring origin authentication](</docs/portal/edge-configurations/managing-origins.md>).

## Secrets Page 

Secrets are managed from the Secrets page. To display this page, click **Edge Configurations** in the left pane, and then select **Secrets**. 

The following figure shows the key elements on the page, and the table following the figure describes them.

<p align="center"><img src="/docs/resources/images/secrets/secrets-w-numbers.png" alt="Secret List" width="900"></p>

| **Fields**   | **Description**                                                                                           |
| :----------: | --------------------------------------------------------------------------------------------------------- |
| 1            | A search box that you can enter any keyword to filter the secret list.                               |
| 2            | The list of all secrets that have been created. Click an Id to query a secret.  |
| 3            | Edit a secret.                      |
| 4            | The button to [create new secrets](</docs/portal/secrets/creating-secrets.md>).            |



## Secret Actions
Each secret has an edit icon in the **Actions** column. Clicking the edit icon opens the Update Secret page to [update](</docs/portal/secrets/editing-secrets.md>) the selected secret. To [delete](</docs/portal/secrets/deleting-secrets.md>) a secret, click the secret's ID to open its detail page, and then click the **Delete** button.
