# Overview of Certificates

CDN Pro supports two types of digital certificates, server and CA.
- A server certificate is a digital certificate that allows your website to exchange data securely over the Internet using the public key infrastructure (PKI). The server certificate enables encryption of the communications between a website and its visitors.
- A CA certificate is used by our cache servers to verify the certificate of a requesting client before serving content. 

## Server Certificates

CDN Pro supports regular, subject alternative names (SAN), and wildcard certificates. CDN Pro also supports RSA and ECDSA public key algorithms. You can upload your existing certificate, generate self-signed certificates, and use Let's Encrypt to renew expiring certificates automatically.

### Certificates Page 

Server certificates are managed from the Certificates page. To display this page, click **Certificates** in the left pane and choose **Server Certificates**. All certificates are versioned in CDN Pro. After a version is saved, it cannot be changed. If you need to update an expiring certificate, you just create a new version and deploy it to replace the old one. At any time, only one version of each certificate can be deployed into the staging or production environment. 

The **Ownership** field on the Certificates page shows whether a certificate was created by you or shared by a CDN Pro reseller.

- **Me** appears if your customer account created the certificate.
- **Parent** appears if a CDN Pro reseller shared the certificate with you.

The following figure shows the key elements on the page, and the table following the figure describes them.

<p align="center"><img src="/docs/resources/images/certificates/certificates-w-numbers.png" alt="Certificate List" width="900"></p>

| **Fields**   | **Description**                                                                                           |
| :----------: | --------------------------------------------------------------------------------------------------------- |
| 1            | A search box that you can enter any keyword to filter the certificate list.                               |
| 2            | The list of all certificates that are available to you. Click the **+** sign for details about the certificate.  |
| 3            | Icons to filter certificates by Auto Renew, Staging Version, and Production Version.                      |
| 4            | Drop-down lists to take actions on each certificate.                                                      |
| 5            | The button to [create new certificates](</docs/portal/certificates/creating-certificates.md>).            |



### Certificate Actions
Each certificate has a vertical ellipsis in the **Actions** column. Clicking the ellipsis shows the available actions that can be performed on the selected certificate.
<p align="center"><img src="/docs/resources/images/certificates/certificate-actions.png" alt="Certificate Actions" width="900"></p>
The actions are:

- **Edit**: [Update](</docs/portal/certificates/updating-certificates.md>) and/or deploy the selected certificate.
- **Download CSR**: Download a certificate signing request (CSR) from the latest version of the selected certificate.
- **Delete**:  [Delete](</docs/portal/certificates/deleting-certificate.md>) the certificate. If the certificate is deployed, you have to undeploy it first.
- **Undeploy from Staging**: [Undeploy](</docs/portal/certificates/deploying-certificates.md>) the selected certificate from the staging environment.
- **Undeploy from Production**: [Undeploy](</docs/portal/certificates/deploying-certificates.md>) the selected certificate from the production environment.
- **Deployment History**: Show the deployment history of the selected certificate.

## CA Certificates

Trusted CA certificates are used to verify clients' certificates.

### CA Certificates Page
CA certificates are managed from the CA Certificates page. To display this page, click **Certificates** in the left pane and choose **CA Certificates**. All certificates are versioned in CDN Pro. After a version is saved, it cannot be changed. If you need to update a CA certificate, you just create a new version and deploy it to replace the old one. At any time, only one version of each certificate can be deployed into the staging or production environment. 

The **Ownership** field on the CA Certificates page shows whether a certificate was created by you or shared by a CDN Pro reseller.

- **Me** appears if your customer account created the certificate.
- **Parent** appears if a CDN Pro reseller shared the certificate with you.

The following figure shows the key elements on the page, and the table following the figure describes them.

<p align="center"><img src="/docs/resources/images/certificates/cacertificates-w-numbers.png" alt="CA Certificate List" width="900"></p>

| **Fields**   | **Description**                                                                                           |
| :----------: | --------------------------------------------------------------------------------------------------------- |
| 1            | A search box that you can enter any keyword to filter the CA certificate list.                               |
| 2            | The list of all CA certificates that are available to you. Click the **+** sign for details about the certificate.  |
| 3            | Icons to filter CA certificates by Staging Version and Production Version.                      |
| 4            | Drop-down lists to take actions on each certificate.                                                      |
| 5            | The button to [create new certificates](</docs/portal/certificates/creating-cacertificates.md>).            |



### Certificate Actions
Each certificate has a vertical ellipsis in the **Actions** column. Clicking the ellipsis shows the available actions that can be performed on the selected certificate.
<!--<p align="center"><img src="/docs/resources/images/certificates/certificate-actions.png" alt="Certificate Actions" width="900"></p>-->
The actions are:

- **Edit**: [Update](</docs/portal/certificates/updating-cacertificates.md>) and/or deploy the selected certificate.
- **Delete**:  [Delete](</docs/portal/certificates/deleting-certificate.md>) the certificate. If the certificate is deployed, you have to undeploy it first.
- **Undeploy from Staging**: [Undeploy](</docs/portal/certificates/deploying-certificates.md>) the selected certificate from the staging environment.
- **Undeploy from Production**: [Undeploy](</docs/portal/certificates/deploying-certificates.md>) the selected certificate from the production environment.
- **Deployment History**: Show the deployment history of the selected certificate.

