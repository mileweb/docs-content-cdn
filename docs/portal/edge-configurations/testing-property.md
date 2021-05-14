# Testing Property

Before you deploy your property to production, we recommend you test and verify your property to make sure it works as expected. CDN360 has a dedicated staging environment for this purpose. To deploy the property to the staging environment, perform the steps in [Deploying Your Property](</docs/portal/edge-configurations/deploying-property.md>).

## Testing Your Property in Staging

CDN360 provides a staging environment for you to test your property configurations without affecting production. Sending your test traffic to the servers in the staging environment is a way for you to make sure the behavior is what you expect. The staging servers can be found by the hostname `staging.qtlcdn.com`. You can also see their IP addresses by issuing the following command:

```bash
$ dig staging.qtlcdn.com
...
;; ANSWER SECTION:
staging.qtlcdn.com.	19	IN	A	163.171.228.89
staging.qtlcdn.com.	19	IN	A	163.171.230.47
staging.qtlcdn.com.	19	IN	A	115.223.12.247
...
```

There are several ways to send test traffic to the staging environment:


- Modify your DNS server to point your hostname to the CDN360 staging hostname ```staging.qtlcdn.com```. For example:


- Modify the ```/etc/hosts``` file to hard code the hostname to be accelerated to one of the staging server's IP addresses. For example:


```
163.171.230.47 faster.mydomain.com
```
- If you use the cURL command, you can add ```--resolve``` to directly map the hostname to be accelerated to the IP address of the CDN360 staging server(s). For example:

```bash
$ curl -v https://faster.mydomain.com/index.html --resolve faster.mydomain.com:443:163.171.230.47
```
