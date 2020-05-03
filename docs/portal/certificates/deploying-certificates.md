# Deploying and Undeploying Certificates

After you created or updated a certificate, you need to deploy it to the staging or production environments before it can be used by any properties. If a certificate is no longer used by any property in those environments, you should undeploy it. In particular, you want to delete a certificate from the CDN360 platform, you have to undeploy it first.

**Note**: To deploy or undeploy a certificate to staging or production environments, you must be the owner of the certificate.

## Deploying a Certificate

1. In the left pane, click **Certificates**. On the Certificates page, click the name of the certificate you want to deploy.
2. Scroll down to the **Deployment** section, and then select **Staging** or **Production** from the **Deployment Destination** drop-down list.
<p align="center"><img src="/docs/resources/images/Selecting a Deployment Options.png" alt="Deployment Options" width="650"></p>

3. Click the **Deploy Configuration** button. When the Deployment Confirmation pop-up appears, click **OK**. The deploymet process takes about 5 minutes. You can either wait for it to finish or close the progress dialog box to perform other tasks while deployment continues in the background. You can always click **Tasks** in the left pane to check the status of the deployment.

## Undeploying a Certificate

If you no longer need a certificate in a staging or production environment, you can undeploy the certificate.

1. In the left pane, click **Certificates**.
2. On the Certificates page, click the **Actions** drop-down list for the certificate you want to undeploy, and then select **Undeploy from Staging** or **Undeploy from Production**.
3. When the Undeployment Confirmation dialog box appears, click **OK**. The undeploymet process takes about 5 minutes.
