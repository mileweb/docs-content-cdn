# Overview of Certificates

A digital certificate allows your website to exchange data securely over the Internet using the public key infrastructure (PKI). The certificate enables encryption of the communications between a website and its visitors. CDN360 supports regular, subject alternative names (SAN), and wildcard certificates. CDN360 also supports RSA and ECDSA public key algorithms. You can upload your existing certificate, generate self-signed certificates, and use Let's Encrypt to renew expiring certificates automatically.

## Certificates Page 

Certificates are managed from the Certificates page. To display this page, click **Certificates** in the left pane. All certificates are versioned in CDN360. Once a version is saved, it cannot be changed. If you need to update an expiring certificate, you just create a new version and deploy it to replace the old one. At any time, only one version of each certificate can be deployed in the production or staging environment. 

The following figure shows the key elements on the page, and the table following the figure describes them.

<p align="center"><img src="/docs/resources/images/Certificates Page.png" alt="Certificate List" width="800"></p>

| **Element Number**|**Description**|
|-|-|
|1|A search box that you can enter any keyword to filter the certificate list.|
|2|The list of all certificates that are available to you. Click the **+** sign to see which properties are using each certificate.|
|3|The button to [create new certificates](</docs/portal/certificates/creating-certificates.md>).|
|4|Dropdown list to take actions on each certificate.|

## Certificate Actions
Clicking the **Actions** drop-down list shows all the available actions that can be performed with certificates.
<p align="center"><img src="/docs/resources/images/CertificateActions.png" alt="Certificate Actions" width="700"></p>
The actions are:

- **Edit**: [Update](</docs/portal/certificates/updating-certificates.md>) and/or deploy the selected certificate.
- **Download CSR**: Download a certificate signing request (CSR) from the latest version of the selected certificate.
- **Delete**: Delete the certificate. If the certificate is deployed, you have to undeploy it first.
- **Undeploy from Staging**: Undeploy the certificate from the staging environment.
- **Undeploy from Production**: Undeploy the certificate from the production environment.
