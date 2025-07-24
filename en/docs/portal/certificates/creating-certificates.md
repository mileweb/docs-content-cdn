# Creating a New Server Certificate

There are three ways to create a new server certificate: 

1. **Auto-generate a self-signed certificate**. Use this method if you need a certificate signing request (CSR) to apply for a certificate from a certificate authority (CA). You can then download the CSR of the new self-signed certificate and submit it to the CA. When you receive the CA-signed certificate and chain certificate(s), you can upload them as a new version.
2. **Upload the private key, certificate, and chain certificate(s)**. Use this method if you already have a certificate with a private key and CA chain certificate.
3. **DNS-01 Challenge Option.** Use this method to have CDN Pro automatically create a certificate supporting each of your hostnames after verifying your ownership of them.

## Auto-Generating a Self-Signed Certificate 

The following procedure describes how to generate self-signed certificates. Self-signed certificates can be used for testing purposes or internal use before deploying the certificate into the production environment. If you need a CSR to obtain a signed certificate from a CA, create a self-signed certificate first.

1. In the left pane, click **Certificates** and choose **Server Certificates**.
2. At the top right of the Certificates page, click the **Create Certificate** button. 

<p align=center><img src="/docs/resources/images/certificates/certificates-wo-numbers.png" alt="create new cert button menu" width="900"></p>


3. Complete the fields at the top of the Create a Certificate form. Next to **Creation Method**, click  **Auto-Generate** and complete the additional fields. Required fields are denoted by an asterisk (\*).

<p align=center><img src="/docs/resources/images/certificates/create-certificate-autogenerate.png" alt="auto generate cert" width="650"></p>

| **Fields**|**Description**|
|-|-|
|| **Options at the top of the Create a Certificate Form**                                      |
|Certificate Name|Enter a name that helps you identify this certificate.|
|Certificate Description|Add a description about this certificate.|
|Auto Renew|Select whether you want CDN Pro to [renew the certificate automatically](/docs/portal/certificates/auto-renewal.md) through Let's Encrypt (**LE**).|
|Share With|This field is available to resellers only. It allows resellers to select the child customers with whom they want to share the certificate.|
|Creation Method|Select **Auto-Generate**.|
|| **Auto-Generate Options**                                      |
|Template|Populates the form fields with settings from a template. A template is a collection of frequently used settings. Before you use this option, you must save at least one template (see step 4 below). After the fields are populated with the settings from a template, you can change them in the fields below to suit your requirements, and then save the settings in a new template.|
|Public Key Algorithm|Select a public key algorithm for this certificate: RSA2048 or ECC256.|
|Common Name|Enter a common name you want to use for the certificate (can be any text).|
|SAN|Enter one or more Subject Alternative Names (SANs), which will be the hostnames you want this certificate to cover.|
|Country|Enter the name of a country in two letter [ISO-3166 country code](<https://www.iso.org/obp/ui/#search>) format.|
|State|Enter the name of a state.|
|City|Enter the name of a city.|
|Street|Enter the name of a street.|
|Company|Enter a company name.|
|Department|Enter a department name.|
|Email|Enter an email address.|
|Comments|Optionally, enter any comments about this initial version.|

4. To save these settings in a template that you can select at a later time using the **Template** drop-down list mentioned above, click the **Save as a Template** button. When the popup message appears, enter a name for the template and click **OK**. 
5. Click the **Save Certificate** button followed by **OK**.

Your certificate is saved and appears on the Certificates page. You can now use the certificate with any properties you create, and deploy it to staging and production environments. You can also download the CSR to apply for a signed certificate from a CA, and then upload it to create a [new version](</docs/portal/certificates/updating-certificates.md>) of this certificate.

To use the server certificate in a property, choose the certificate in the TLS Certificate or Additional TLS Certificate fields of the property configuration.

## Uploading an Existing Certificate

If you already have a certificate with the private key and the CA chain certificate, you can upload them so they can be used by properties. Before performing the following procedure, make sure the certificate and associated files are in Privacy Enhanced Mail (**PEM**) format. The files' content should be plain text and begins with five equal signs (`=====`).

To upload the files as a new certificate:

1. In the left pane, click **Certificates** and choose **Server Certificates**.<br>
2. At the top right of the Certificates page, click the **Create Certificate** button. 

<p align=center><img src="/docs/resources/images/certificates/certificates-wo-numbers.png" alt="Create new certificate button" width="900"></p>

3. Complete the fields at the top of the Create a Certificate form (see the table above). Next to **Creation Method**, select  **Upload** and upload the private key, certificate, and chain certificate. In the **Comments** field, enter any optional comments. Required fields are denoted by an asterisk (\*).
   
**Note:** Upload only the files you need to change on top of the current latest version.

<p align="center"><img src="/docs/resources/images/certificates/create-certificate-upload.png" alt="Upload Certificate" width="600"></p>

4. Click the **Save Certificate** button followed by **OK**. 

Your certificate is saved and can now be used with any properties you create. To use the server certificate in a property, choose the certificate in the TLS Certificate or Additional TLS Certificate fields of the property configuration.

## Automatically Creating a Certificate Supporting Each Hostname

Using the **DNS-01 challenge** creation method, you can have CDN Pro automatically create a certificate supporting each of your hostnames after verifying your ownership of them. To verify, modify your DNS server to add a special DNS text record for each hostname. Once the process is completed, you can remove those text records.

To automatically create a certificate supporting each of your hostnames after verifying your ownership of them:

1. In the left pane, click **Certificates** and choose **Server Certificates**.<br>
2. At the top right of the Certificates page, click the **Create Certificate** button. 

<p align=center><img src="/docs/resources/images/certificates/certificates-wo-numbers.png" alt="Create new certificate button" width="900"></p>

3. Complete the fields at the top of the Create a Certificate form (see the table above). Next to **Creation Method**, select  **DNS-01 challenge**.
   
<p align="center"><img src="/docs/resources/images/certificates/ds01-challenge-option.png" alt="DS01 Challenge" width="600"></p>

4. In the **SAN** field, enter a comma-separated list of hostnames.

5. Click the **Save Certificate** button. A **Verifying ACME challenge** popup specifies the DNS text records to add to verify your ownership. After you verify the ACME challenge, CDN Pro continues to upload the  certificate. After the certificate is uploaded, it is saved and can now be used with any properties you create. 
   
**Note:** It might take a few minutes for the new DNS records to propagate.