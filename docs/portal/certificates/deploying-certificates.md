# Deploying and Undeploying Certificates

After you create a certificate, you can deploy it to the staging environment for testing, and then to the CDN360 production environment if testing is successful.

**Important**: You must deploy the certificate for a property to use it.

If you decide not to use a deployed certificate, you can undeploy it from the staging and production environments.

## Deploying Certificates

After you create a certificate, you can deploy it to the staging environment where your original content is fetched and staged on servers set up for testing. If testing is successful, you can deploy the certificate to the CDN360 production environment.

**Important**: You must deploy the certificate for a property to use it.

**Note**: To deploy a certificate to staging or production environments, the certificate must show **Owned** in the **Ownership** column.

1. In the left pane, click **Certificates**.
2. On the Certificates page, click the name of the certificate you want to deploy.
3. Scroll down to the **Deployment** section, and then select **Staging** or **Production** from the **Deployment Destination** drop-down list.

<p align="center"><img src="/docs/resources/images/Selecting a Deployment Options.png" alt="Deployment Options" width="700"></p>

4. Click the **Deploy Configuration** button. When the Deployment Confirmation pop-up appears, click **OK**. Wait for the message that the certificate has been successfully deployed, or click the **Go to Dashboard** button to perform other tasks while deployment continues in the background, and then click **Tasks** in the left pane to confirm that the certificate was deployed successfully.

## Undeploying Certificates

If you no longer need a certificate in a staging or production environment, you can undeploy the certificate.

To undeploy a certificate from staging or production environments, the certificate must show **Owned** in the **Ownership** column.

1. In the left pane, click **Certificates**.
2. On the Certificates page, click the **Actions** drop-down list for the certificate you want to undeploy, and then select **Undeploy from Staging** or **Undeploy from Production**.
3. When the Undeployment Confirmation dialog box appears, click **OK**.

# Deleting a Certificate

Deleting a certificate removes that certificate permanently.

**Note**: To delete a certificate, the certificate must show **Owned** in the **Ownership** column.

1. In the left pane, click **Certificates**.
2. On the Certificates page, click the **Actions** drop-down list of the certificate you want to delete, and then select **Delete**.
3. When prompted to confirm the deletion, click **OK** to delete the certificate. 

# Downloading a CSR

A certificate signing request (CSR) is a file that contains information a certificate authority (CA) needs to create and digitally sign a TLS certificate. CDN360 allows you to download the CSR that corresponds to the latest version of each certificate. You can send this CSR to apply for a new certificate from a CA and come back to upload the CA-signed certificate as a new version.

**Note**: To download a CSR, the certificate must show **Owned** in the **Ownership** column.

1. In the left pane, click **Certificates**.
2. On the Certificates page, click the **Actions** drop-down list for a certificate, and then select **Download CSR**.
3. If prompted for a download location, browse to the location where you want to save the CSR, and then click **Save**.
