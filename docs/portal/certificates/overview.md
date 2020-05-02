# Overview of Certificates

A digital certificate allows your website to exchange data securely over the Internet using the public key infrastructure (PKI). The certificate enables encryption of the communications between a website and its visitors. CDN360 supports regular, subject alternative names (SAN) and wildcard certificates. In terms of publick key algorithm, it suports both RSA and ECDSA. You can upload your existing certificate, generate self-signed certificates and use Let's Encrypt to automatically renew expiring certificates.

## Certificates Page 

Certificates are managed from the Certificates page. To display this page, click **Certificates** in the left pane. All certificates are versioned in CDN360. Once a version is saved, it cannot be changed. At anytime, only one version of each certificate can be deployed to the production and/or staging environment. If you need to update an expiring certificate, you just create a new version and deploy it to replace the old one.

The following figure shows the key elements on the page, and the table following the figure describes them.

<p align="center"><img src="/docs/resources/images/Certificates Page.png" alt="Certificate List" width="700"></p>

| **Element Number**|**Description**|
|-|-|
|1|A search box that you can enter any keyword to filter the certificate list|
|2|The list of all certificates that are available to you. Click the **+** sign to see which properties are using each certificate.|
|3|The button to create new certificates.|
|4|Dropdown list to take actions on each certificate.|

## Actions to Certificates
If you click the **Actions** dropdown list, you will see all the available actions that can be taken:
<p align="center"><img src="/docs/resources/images/CertificateActions.png" alt="Certificate List" width="700"></p>
The options are:

- **Edit**: Make changes to the selected certificate;
- **Download CSR**: Download a certificate signing request (CSR) from the latest version of the selected certificate;
- **Delete**: Delete the certificate. If the certificate is deployed, you have to undeploy it first;
- **Undeploy from Staging**: Undeploy the certificate from the staging environment;
- **Undeploy from Production**: Undeploy the certificate from the Production environment.
