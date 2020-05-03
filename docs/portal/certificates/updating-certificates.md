# Updating a Certificate

On CDN360, each certificate is versioned, and each version is not editable once saved. You can deploy each version independently to the staging and production environments. At anytime, there can only be one version deployed in each environment. Deploying a new version will automatically replace the old one. Therefore, if you need to update an expiring certificate in production, all you need to do is to create a new version of that certificate and deploy to production to replace the old one. All properties using this certificate in production will automatically pick up the new version.

CDN360 sends an email notification when a certificate used in production is close to its expiration date. CDN360 also supports certificate [auto-renewal](</docs/portal/certificates/auto-renewal.md>) through [Let's Encrypt](<https://letsencrypt.org/docs/challenge-types/>), so you don't need to ever worry about the expiration of your certificates. If you choose to renew manually, just follow one of the procedures below.

## If you already have a new CA-signed certificate with private key and chain certificate
1. In the certificate details form, click **Create Version**.
<p align="center"><img src="/docs/resources/images/CreateCertVersion.png" alt="Upload Certificate Version" width="700"></p>
2. In the **Upload Certificate** tab, upload the private key, certificate, and chain certificate files. Then click **Save Version**.
<p align="center"><img src="/docs/resources/images/Buttons for Uploading Certs.png" alt="Upload Certificate Version" width="700"></p>
3. Deploy the new version to production.
<p align="center"><img src="/docs/resources/images/CertificateDeploy.png" alt="Upload Certificate Version" width="500"></p>

## If you need a CSR to apply for the new certificate from a CA
If your company's security policy requires the new certificate to have a new private key that is different from the expiring one, you need to go through steps 1-2 to create a self-signed version. Otherwise, you can skip to step 3.

1. Click **Create Version**.
2. Click the **Auto Generate Certificate** tab, complete the required fields (refer to [details here](</docs/portal/certificates/creating-certificates.md#auto-generating-a-self-signed-certificate>)), and click **Save Version**.
<p align="center"><img src="/docs/resources/images/CertificateSelfSignedVersion.png" alt="Certificate New Self-Signed Version" width="600"></p>

3. Click the <img src="/docs/resources/images/DownloadCSRButton.png" alt="Download CSR" width="120"> button on top of the Certificate Details page to get the CSR generated from the latest version.
4. Send the downloaded CSR to the CA to apply for a new certificate.
5. When you receive the new certificate and chain certificate, return to the same Certificates Details page and click **Create Version**.
6. On the **Upload Certificate** tab, upload the certificate and chain certificate. There is no need to upload the private key. Click **Save Version**.
7. Deploy the new certificate version to production.

**Note**: To update a certificate, the certificate must show **Owned** in the **Ownership** column.
