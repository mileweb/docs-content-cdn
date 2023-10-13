# Testing a Property

Before you deploy your property to production, we recommend you test and verify your property to make sure it works as expected. CDN Pro has a dedicated staging environment for this purpose. To deploy the property to the staging environment, perform the steps in [Deploying Your Property](</docs/portal/edge-configurations/deploying-property.md>).

<strong>Note:</strong> You can also use the [Test Suites page](</docs/portal/edge-configurations/working-with-test-suites.md>) to test properties deployed to both the staging and production environments.

## Testing Your Property in Staging

CDN Pro provides a staging environment for you to test your property configurations without affecting production. Sending your test traffic to the servers in the staging environment is a way for you to make sure the behavior is what you expect they hit your production environment. The staging servers can be found by opening a validated property, clicking the horizontal ellipsis next to the **Edit** or **Clone** button, selecting **Deploy**, and clicking the info icon next to the Staging target.

<p align=center><img src="/docs/resources/images/edge-configurations/property-deployment-CH-1.png" alt="deployment selections and button" width="400"></p>

<p align=center><img src="/docs/resources/images/edge-configurations/property-deployment-CH-2.png" alt="staging servers" width="500"></p>

You can also get a list of current IP addresses by calling our [staging servers API](</apidocs#operation/get-cdn-stagingServers>).

Pick one of the IP addresses. The corresponding ```location``` field indicates its country. If your property hostname has an ICP Beian license, you can use an IP address in China. Otherwise, choose an IP address in another country to avoid getting an HTTP 451 'Unavailable for Legal Reasons' status error.

Once you have selected a staging IP address, use one of the following ways to send test traffic to the staging environment:

- Modify the ```hosts``` file to hard code the hostname to be accelerated to one of the staging server's IP addresses. 

  On Windows-based systems, edit ```%SystemRoot%\System32\drivers\etc\hosts```
  
  On Unix-based systems, edit ```/etc/hosts```
  
  For example:

```
163.171.230.47 cdnpro.mydomain.com
```
- If you use the cURL command, you can add ```--resolve``` to directly map the hostname to be accelerated to the IP address of the CDN Pro staging server(s). For example:

```bash
$ curl -v https://cdnpro.mydomain.com/index.html --resolve cdnpro.mydomain.com:443:163.171.230.47
```
