# Auto-Renewing a Certificate through Let's Encrypt

Let's Encrypt (LE) is a Certificate Authority (CA) that issues free certificates to the public. It provides a set of API and CLI tools to help you apply for and renew certificates automatically. If you want a certificate to cover one or more hostnames, you must prove to LE that you are the owner of all the hostnames. LE provides serveral ways (challenges) for you to prove ownership. CDN360 currently only supports the "HTTP-01 challenge". In order to pass the challenge, you must make sure that all hostnames using the certificate are already pointed to a CNAME on CDN360. Otherwise, some challenge requests from LE may go to undesired destinations.

To use the CDN360 auto-renew feature, you need an initial certificate to "bootstrap" the process. If you don't want you current service to be interrupted, you have to make sure this inital certificate is a valid one. But it does not have to be issued by LE. If you are setting up a new service without existing client, you can just generate a self-signed one automatically. The content of the certificate — such as common name or subject alternate names (SAN) — is not important.

The following procedure describes how to use the auto-renew feature:

1. [Create the initial certificate](</docs/portal/certificates/creating-certificates.md>).
2. On the Create Certificate form, make sure **Auto Renew** is set to **Let's Encrypt**. You can also do this on the Certificate Details page anytime after the creation.
3. Create the property that contains the hostname(s) to be accelerated. 

**Note:** The property cannot contain wildcard characters in the hostname because HTTP-01 challenges do not support wildcard domains.

4. Attach the initial certificate to the property created in the previous step.
5. Deploy the property and certificate to production.
6. Update your DNS server to point the hostnames to a CDN360 CNAME. If you do not have a CNAME, [create one](</docs/portal/certificates/creating-CNAMEs.md>).
7. After all the above is done and if the initial certificate's expiration date is within 25 days, CDN360 will automatically renew it through LE within one hour. You will receive notifications about the success or failure of the renewal.
