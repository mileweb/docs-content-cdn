# Updating a CA Certificate

On CDN Pro, each certificate is versioned, and each version is not editable once saved. You can deploy each version independently to the staging and production environments. There can be only one version deployed in each environment at any time. Deploying a new version replaces the old one automatically. 

To update a CA certificates:

1. In the left pane, click **Certificates** and choose **CA Certificates**.
2. Click a certificate name.
    <br><u>OR </u></br>
  In the **Actions** column, click the vertical ellipsis for the CA certificate you want to edit, and then select **Edit**.
3. To change the name of the certificate, move your mouse to the right of the certificate name at the top of the form. When the pencil icon appears, click it and enter the new name. When done, click the checkmark at the bottom right of the field in which you typed the name.
4. Edit the **Share With** setting now or after step 5 if desired.
5. Click **Create Version**.

<p align="center"><img src="/docs/resources/images/certificates/update-cacertificate.png" alt="Upload CA Certificate" width="700"></p>

6. Upload a new chain certificate file. Click **Save Version** followed by **OK** at the confirmation pop-up.

7. Click the <strong>Deploy</strong> button and select <strong>Staging</strong> or <strong>Production</strong>.<br>

8. To deploy the certificate now, click <strong>Deploy Now</strong>. To deploy it at a later time, click <strong>Add to Standby task</strong> to add this task to the [standby queue](</docs/portal/tasks/standby-tasks.md>).

<p align="center"><img src="/docs/resources/images/certificates/certificate-deployment.png" alt="Upload Certificate Version" width="450"></p>

