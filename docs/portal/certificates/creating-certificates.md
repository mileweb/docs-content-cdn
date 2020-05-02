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

<p align="center"><img src="/docs/resources/images/Auto Generate Certificate.png" alt="Auto Generate Certificate" width="700"></p>

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

Your certificate is saved and appears on the Certificates page. You can now use the certificate with any properties you create. You can also download the CSR to apply for a signed certificate from a CA, and then upload it to create a [new version](</docs/portal/certificates/updating-certificates.md>) of this certificate.

## Uploading an Existing Certificate

If you have a certificate with the private key and the CA chain certificate, you can upload them so they can be used by properties. Before performing the following procedure, make sure the certificate and associated files are in:

- Privacy Enhanced Mail (PEM) format.
- Plain text and begin with five equals signs (`=====`).

To upload the files as a new certificate:

1. In the left pane, click **Certificates**.<br>
2. At the top right, click the **Create New Certificate** button. 

![null](</docs/resources/images/Create new Certificate Button.png>)

3. Complete the fields in the Create Certificate form and **Upload Certificate** tab. Required fields are denoted by an asterisk (\*).

<p align="center"><img src="/docs/resources/images/Upload Certificate.png" alt="Upload Certificate" width="700"></p>

4. Click the <strong>Save Certificate</strong> button followed by **OK**. 

Your certificate is saved and can now be used with any properties you create.
