# Creating a New Certificate

There are two options to create a new certificate: 

1. Auto-generation of a self-signed certificate.

In particular, if you need a certificate signing request (CSR) to apply for a certificate from a CA, you should choose this option. You can then download the CSR of the new self-signed certificate and submit to the CA. Once you receive the CA-signed certificate and chain certificate(s), you can upload them as a new version;

2. Uploading everything: private key, certificate and chain certificate(s).

## Auto-Generating a Self-Signed Certificate 

The following procedure describes how to generate self-signed certificates. Self-signed certificates can be used for testing purposes or internal use before deploying the certificate into the production environment. If you need a certificate signing request (CSR) to obtain a signed certificate from a certificate authority (CA), create a self-signed certificate first.

1. In the left pane, click **Certificates**.
2. At the top right, click the **Create New Certificate** button. 

![null](</docs/resources/images/Create new Certificate Button.png>)

3. Complete the fields in the Create Certificate form and **Auto Generate Certificate** tab (refer to the table below). Required fields are denoted by an asterisk (\*).

<p align="center"><img src="/docs/resources/images/Auto Generate Certificate.png" alt="Auto Generate Certificate" width="600"></p>

| **Fields**                                                                                                                     | **Description**                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Certificate Name                                                                                                               | Enter a name that helps you identify this certificate.                                                                         |
| Certificate Description                                                                                                        | Add a description to associate with this certificate.                                                                          |
| Auto Renew                                                                                                                     | Select whether you want CDN360 to renew the certificate automatically. Choices are:                                            |
| Share With                                                                                                                     | This field is available to resellers only. It allows resellers to select whether this certificate will be shared. Choices are: |
| **Auto Generate Certificate Tab**                                                                                              |                                                                                                                                |
| Cipher type                                                                                                                    | Select a cipher. Choices are:                                                                                                  |
| Common Name                                                                                                                    | Enter a common name you want to use for the certificate.                                                                       |
| SAN                                                                                                                            | Enter one or more subject alternative names (SANs).                                                                            |
| Country                                                                                                                        | Enter the name of a country in two letter [ISO-3166 country code](<https://www.iso.org/obp/ui/#search>) format.                |
| State                                                                                                                          | Enter the name of a state.                                                                                                     |
| City                                                                                                                           | Enter the name of a city.                                                                                                      |
| Street                                                                                                                         | Enter the name of a street.                                                                                                    |
| Company                                                                                                                        | Enter a company name.                                                                                                          |
| Department                                                                                                                     | Enter a department name.                                                                                                       |
| Email                                                                                                                          | Enter an email address.                                                                                                        |
| Comments                                                                                                                       | Enter comments about the certificate.                                                                                          |

4. Click the **Save Certificate** button followed by **OK**.

Your certificate is saved and appears on the Certificates page. You can now use the certificate with any properties you create. You can also download the CSR to apply for a signed certificate from a CA, and then upload it to create a [new version](#updating-expiring-certificates) of this certificate.

## Uploading an Existing Certificate

If you have a certificate with the private key and the CA chain certificate, you can upload them so they can be used by properties. Before performing the following procedure, make sure the certificate and associated files are in:

- Privacy Enhanced Mail (PEM) format.
- Plain text and begin with five equals signs (`=====`).

To upload the files as a new certificate:

1. In the left pane, click **Certificates**.<br>
2. At the top right, click the **Create New Certificate** button. 

![null](</docs/resources/images/Create new Certificate Button.png>)

3. Complete the fields in the Create Certificate form and **Upload Certificate** tab. Required fields are denoted by an asterisk (\*).

![null](</docs/resources/images/Upload Certificate.png>)

4. Click the <strong>Save Certificate</strong> button followed by **OK**. 

Your certificate is saved and can now be used with any properties you create.

## Updating Expiring Certificates

An expired certificate causes browsers to stop loading web content and display alerts to visitors. To help you avoid these situations, CDN360 sends an email notification when a certificate used in production is close to reaching its expiration date. CDN360 supports certificate [auto-renewal](<Auto-Renewing a Certificate through Let's Encrypt.htm>) through [Let's Encrypt](<https://letsencrypt.org/docs/challenge-types/>). If you choose to renew by yourself, perform the following procedure.

**Note**: To update a certificate, the certificate must show **Owned** in the **Ownership** column.

1. In the left pane, click **Certificates**.
2. On the Certificates page, click the name of the certificate that is expiring. When the certificate details form appears, perform the appropriate step:

<ul><ul><li>If you already have a new CA-signed version with a private key and chain certificate, proceed to step 3.<br>
<li>Otherwise, skip to step 5 to apply for a new version from a CA.</ul></ul>

3. In the certificate details form, click **Create Version**.

![null](</docs/resources/images/Create Version.png>)

4. In the **Upload Certificate** tab, upload the private key, certificate, and chain certificate files. Then click **Save Version** and skip to step 13.

![null](</docs/resources/images/Buttons for Uploading Certs.png>)

5. Use one of the following steps to apply for a new version from a CA:

    <ul><li>To use a new key (for example, if your company has a security policy that disallows reuse of an old private key), proceed to step 6.<br>
    <li>To reuse the existing private key, skip to step 8.</ul></ul>

6. Click **Create Version**.

7. Click the **Auto Generate Certificate** tab, complete the required fields (refer to the table above), and click **Save Version**.


8. Click the **Download CSR** button to save the CSR.

9. Send the downloaded CSR to the CA to apply for a new certificate.
10. When you receive the new certificate and chain certificate, return to the Certificates page and click the name of the same certificate you selected in step 2.

11. On the right side of the certificate details form, click the **Create Version** button.

![null](</docs/resources/images/Create Version Button - Updating properties.png>)

12. On the **Upload Certificate** tab, upload the certificate and chain certificate, and then click **Save Version**.

![null](</docs/resources/images/Certificate Versions.png>)

13. Deploy the new certificate version to production.

## Viewing Certificate Details

1.  In the left pane, click **Certificates**.
2. Click the **+** icon next to the certificate name. For example:

![null](</docs/resources/images/view_edit.png>)

3. To remove the details. click the **–** icon next to the certificate name.

## Deploying and Undeploying Certificates

After you create a certificate, you can deploy it to the staging environment for testing, and then to the CDN360 production environment if testing is successful.

**Important**: You must deploy the certificate for a property to use it.

If you decide not to use a deployed certificate, you can undeploy it from the staging and production environments.

### Deploying Certificates

After you create a certificate, you can deploy it to the staging environment where your original content is fetched and staged on servers set up for testing. If testing is successful, you can deploy the certificate to the CDN360 production environment.

**Important**: You must deploy the certificate for a property to use it.

**Note**: To deploy a certificate to staging or production environments, the certificate must show **Owned** in the **Ownership** column.

1. In the left pane, click **Certificates**.
2. On the Certificates page, click the name of the certificate you want to deploy.
3. Scroll down to the **Deployment** section, and then select **Staging** or **Production** from the **Deployment Destination** drop-down list.

![null](</docs/resources/images/Selecting a Deployment Options.png>)

4. Click the **Deploy Configuration** button. When the Deployment Confirmation pop-up appears, click **OK**. Wait for the message that the certificate has been successfully deployed, or click the **Go to Dashboard** button to perform other tasks while deployment continues in the background, and then click **Tasks** in the left pane to confirm that the certificate was deployed successfully.

### Undeploying Certificates

If you no longer need a certificate in a staging or production environment, you can undeploy the certificate.

To undeploy a certificate from staging or production environments, the certificate must show **Owned** in the **Ownership** column.

1. In the left pane, click **Certificates**.
2. On the Certificates page, click the **Actions** drop-down list for the certificate you want to undeploy, and then select **Undeploy from Staging** or **Undeploy from Production**.
3. When the Undeployment Confirmation dialog box appears, click **OK**.

## Deleting Certificates

Deleting a certificate removes that certificate permanently.

**Note**: To delete a certificate, the certificate must show **Owned** in the **Ownership** column.

1. In the left pane, click **Certificates**.
2. On the Certificates page, click the **Actions** drop-down list of the certificate you want to delete, and then select **Delete**.
3. When prompted to confirm the deletion, click **OK** to delete the certificate. 

## Downloading a CSR

A certificate signing request (CSR) is a file that contains information a certificate authority (CA) needs to create and digitally sign a TLS certificate. CDN360 allows you to download the CSR that corresponds to the latest version of each certificate. You can send this CSR to apply for a new certificate from a CA and come back to upload the CA-signed certificate as a new version.

**Note**: To download a CSR, the certificate must show **Owned** in the **Ownership** column.

1. In the left pane, click **Certificates**.
2. On the Certificates page, click the **Actions** drop-down list for a certificate, and then select **Download CSR**.
3. If prompted for a download location, browse to the location where you want to save the CSR, and then click **Save**.
