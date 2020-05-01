## An Introduction to the CDN360 Edge Logic

CDN360’s proxy server is developed on top of the open-source software [NGINX](nginx.org), which is widely used to build powerful web servers and reverse proxy servers with superior performance. NGINX has its own configuration language, which is described in greater detail on their [documentation website](http://nginx.org/en/docs/).

In the last 3 years, we made significant changes to the open-source version of the software to enhance it as a CDN proxy server. One of CDN360’s main design goals is to give users as much control as possible to self-provision the service. Based on this rationale, we decided to allow users to code in the NGINX language directly to control the proxy servers. We believe this gives them the maximum flexibility to achieve their business requirements.

This document is an introduction about how to accomplish this. Please notice that the Edge Logic described in this document is part of the [property configuration](/apidocs#operation/createProperty). Users still need to define the other essential parts, such as the hostname(s) to be accelerated, in order to create a complete property that can be deployed to the CDN360 servers. Users can do this easily using the [product portal](https://console.cdnetworks.com/cdn) or [API](/apidocs).

As an introduction to any new laguange, let's get started with a "hellow world" example.
