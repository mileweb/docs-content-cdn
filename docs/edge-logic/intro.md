## An Introduction to the CDN360 Edge Logic

CDN360’s proxy server is developed on top of the open-source software [NGINX](nginx.org), which is widely used to build powerful web servers and reverse proxy servers with superior performance. 

We made a significant number of changes to the open-source version of the software to make it more suitable as a CDN proxy server. NGINX has its own configuration language, which is described in greater detail on their [documentation website](http://nginx.org/en/docs/). One of CDN360’s major design goals is to give users as much control as possible to self-provision the service. Based on this rationale, we decided to let users write the NGINX configuration language directly to control the proxy servers. We believe this gives them the maximum flexibility to ensure the servers' behavior meets their business requirements. 

This document is an introduction about how to accomplish this. The Edge Logic described in this document is part of the [property configuration](/apidocs#operation/createProperty). Users still need to define the other essential configurations, such as the hostname(s) to be accelerated, in order to create a complete property that will be deployed to the CDN360 servers. Users can do this easily using the [product portal](https://console.cdnetworks.com/cdn) or API.

