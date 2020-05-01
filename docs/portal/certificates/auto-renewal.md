# Auto-Renewing a Certificate through Let's Encrypt

Let's Encrypt (LE) is a Certificate Authority (CA) that issues free certificates to the public. It provides a set of API and CLI tools to help you apply for and renew certificates automatically. If you want a certificate to cover one or more hostnames, you must prove to LE that you are the owner of all the hostnames. Although LE provides various ways (challenges) for you to prove ownership, CDN360 supports the "HTTP-01 challenge". To pass the challenge, you must make sure that all hostnames using the certificate are already pointed to a CNAME on CDN360. Otherwise, some challenge requests from LE may go to undesired destinations.

To use the CDN360 auto-renew feature, you need an "initial" valid, expired, or self-signed certificate. You can also use the [CDN360 API](</apidocs#tag/Certificate-Management>) or portal to generate one automatically. The content of the certificate — such as common name or subject alternate names (SAN) — is not important.

The following procedure describes how to use the auto-renew feature:

1. Create and upload an initial certificate due to expire in less than 15 days. If the certificate will not expire in 15 days, CDN360 will not try to renew it. (Certificates that CDN360 auto-generates expire in 10 days.)
2. On the Create Certificate form, make sure **Auto Renew** is set to **Let's Encrypt**.
3. Create the property that contains the hostname(s) to be accelerated. 

**Note:** The property cannot contain wildcard characters in the hostname because HTTP-01 challenges do not support wildcard domains.

4. Attach the initial certificate to the property created in the previous step.
5. Deploy the property and certificate to production.
6. Update your DNS server to point the hostnames to a CDN360 CNAME. If you do not have a DNS entry, create one.
7. Wait one hour. The certificate in production will be updated to a legitimate new version signed by LE. You will receive notifications about the success or failure of the renewal.
