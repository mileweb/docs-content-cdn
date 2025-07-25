# Creating a New CA Certificate

To create a new CA certificate that can be used to verify a client's certificate:

1. In the left pane, click **Certificates** and choose **CA Certificates**.<br>
2. At the top of the CA Certificates page, click the **Create CA Certificate** button.

<p align=center><img src="/docs/resources/images/certificates/cacertificates.png" alt="Create new CA certificate button" width="900"></p>

3. Complete the fields in the Create a CA Certificate form.  Click Upload to upload the chain certificate. In the **Comments** field, enter any optional comments. Required fields are denoted by an asterisk (\*).


<p align="center"><img src="/docs/resources/images/certificates/create-cacertificate.png" alt="Create CA Certificate" width="600"></p>

4. Click the **Save Certificate** button.

Your CA certificate is saved and can now be used with any properties you create. To use the CA certificate in a property configuration, choose "On" or "Optional" for the **Verify Client Certificate** TLS setting, and choose the certificate in the **Trusted CA** field.

