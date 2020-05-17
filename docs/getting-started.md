# Quick Start

Using CDN360 to accelerate and distribute your content involves the following steps:

1. [Log in](</docs/portal/accessing-portal/logging-in.md>) to the portal.
2. [Create a property](</docs/portal/edge-configurations/managing-properties.md>), which is the configuration to be deployed to the proxy server(s).
3. [Edit the property](</docs/portal/edge-configurations/editing-properties.md>) if necessary.
4. [Validate the property](</docs/portal/edge-configurations/validating-property.md>).
5. Optional [Deploy the property to staging servers](</docs/portal/edge-configurations/deploying-property.md>) and make sure the cache behaves as expected.
6. [Deploy the property to production servers](</docs/portal/edge-configurations/deploying-property.md>) and make sure the cache behaves as expected.
7. [Create an edge hostname](</docs/portal/traffic-control/creating-edge-hostname.md>) for the service hostname(s) in the property.
8. Modify your DNS to add a CNAME record to point your service hostname(s) to the edge hostname.

The following figure shows the steps for creating an acceleration service.

![null](</docs/resources/images/flowchart.png>)

