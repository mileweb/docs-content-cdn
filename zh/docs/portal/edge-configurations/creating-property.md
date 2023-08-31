# Creating a Property

There are two ways to create a new property:<ul><li>Create a new property from scratch.</ul></li><ul><li> Clone an existing property whose settings are similar to the property you want to create, and then change the settings of the cloned property to suit your needs.</ul></li>

After you create the new property, save and [validate](</docs/portal/tasks/validations.md>) the property before you deploy and test it.

## Getting Started

1. In the left pane, click **Edge Configurations**, and then select **Properties**.
2. To create a new property from scratch, click the **Create Property** button at the top right of the Properties page. <br><br><u>OR </u></br>
   To clone an existing property, find the property you want to clone on the Properties page, and then click the vertical ellipsis under **Actions** and select **Clone**. Or click a property ID, and then click the horizontal ellipsis next to the **Edit** or **Clone** button and select **Clone**. 

<p align=center><img src="/docs/resources/images/edge-configurations/properties-create-property.png" alt="create property" width="600"></p>

3. Complete the fields in the Create a Property form. Required fields are denoted by an asterisk (\*).

<p align=center><img src="/docs/resources/images/edge-configurations/create-a-property.png" alt="edit property" width="600"></p>

| **Fields**                | **Description**                                    |
| --------------------------| ---------------------------------------------------|
| Property Name             | Enter a name that helps you identify this property.|
| Description               | Add a description to associate with this property. |
| Configuration Version     | Read-only field that shows the version number of this property. By default, your first property configuration is Version 1. |
| Description               | Add a description for this first property version. |
| Hostnames                 | Enter one or more hostnames to be accelerated and which your end users will access. |
| Origins                   | Origins are your servers that CDN Pro accesses to fetch your content. You can specify more than one server. Click the **Add New** link and then see [Adding or Editing Origins in a Property](</docs/portal/edge-configurations/managing-origins.md>).|
| Edge Logic                | Write NGINX configuration code to specify how you want CDN Pro to deliver content to your visitors. You can click the [**Wizard** button](#edge-logic-wizard) to bootstrap this configuration using the Cache Settings dialog box. For more information, refer to CDNetworks' [Edge Logic documentation](</docs/edge-logic/intro.md>), which includes a description of [supported directives](</docs/edge-logic/supported-directives.md>).</li> 
| TLS Settings              | Select the [TLS client certificate settings](#tls-settings) for your property.|
| Real Time Logging | If this advanced feature was enabled for you, complete the [real-time logging parameters](#real-time-log). If you require this feature, contact the [CDNetworks support team](mailto:support@cdnetworks.com).|
| Advanced Settings         | Use [advanced settings](#advanced-settings) to specify cache sharing, China ICP Beian, and a load balancer hash key.|

4. To include a baseline configuration with the Edge Logic for the property, click the gear icon at the bottom left of the **Edge Logic** field. When the popup appears, enter the baseline configuration. When you finish, click the **Save** button to save the baseline configuration to the database.

**Note:** If you add a baseline configuration, the wizard appends its configuration after that of the baseline configuration. When you save the baseline configuration, it will not be used to initialize the Edge Logic until you create another property. To use the baseline configuration with the current property you are adding or editing, reload the page; doing so, however, may cause you to lose other changes you made.

5. To save the property, click the **Save** button. Several basic syntax checks are performed. If errors are found, you are prompted to fix them before the property is saved. Any property version will have to be "validated" before it can be deployed to staging or production. You can click the <strong>Save & Validate</strong> button to start the validation process. When the Confirmation pop-up appears, click <strong>OK</strong>. The validation process usually takes less than a minute. You can either wait for it to finish or close the progress dialog box to perform other tasks while validation continues in the background. You can click <strong>Tasks</strong> in the left pane to [check the validation results](</docs/portal/tasks/validations.md>). If there is a failure, perform the instructions in the error message to fix it.

6. If the property is validated successfully, you can [deploy](</docs/portal/edge-configurations/deploying-property.md>) it to the staging or production environment. By default, trial users will have access to the staging environment only. Please contact the [CDNetworks support team](mailto:support@cdnetworks.com) to enable access to the production environment.

## Edge Logic Wizard

Use the Edge Logic wizard to create an initial version of the Edge Logic. The wizard supports some of the most basic cache configurations. You can set cache behavior for multiple locations. You can also modify the generated Edge Logic code to add complicated behaviors to suit your requirements. 

When you click the <b>Wizard</b> button, a prompt appears with the following choices. <ul><li><b>Start with a baseline setting for website acceleration</b>. Initializes settings for a typical website. </ul></li><ul><li><b>Start with a baseline setting for download or VoD acceleration</b>. Initializes settings to accelerate large file downloads or Video on Demand (VOD). </ul></li><ul><li><b>Start with a clean slate</b> Select this choice if your content does not fit one of the other choices, or if  you want to set up all the settings manually. </ul></li>


<p align=center><img src="/docs/resources/images/edge-configurations/Edge-Logic-Wizard-Prompt.png" alt="wizard prompt" width="500"></p>

After making your selection, complete the settings in the Edge Logic Wizard page, and then click <b>OK</b> to display the Edge Logic code. You can then edit the code shown in the field as necessary or click the <b>Wizard</b> button to change your selections. 

<b>Note:</b> If the Edge Logic code is extremely long, check the <b>Soft Wrap Text</b> check box to display long text on multiple lines instead of one long line.

## TLS Settings

This section allows you to:<ul><li>Enable HTTPS for this property by attaching a TLS certificate to it. If both RSA and ECC algorithms need to be supported, add a second certificate with an algorithm different from the first certificate.</ul></li><ul><li>Downgrade the protocol from HTTPS to HTTP when accessing the origin. Note that doing so may expose you to security risks.</ul></li><ul><li>Enable Online Certificate Status Protocol (OCSP) stapling to check the revocation status of digital certificates (refer to https://en.wikipedia.org/wiki/OCSP_stapling).</ul></li><ul><li>Enable zero round-trip time resumption for TLS 1.3. Select <B>Enable 0-RTT</b> only if tlsMinVersion or tlsMaxVersion includes TLS 1.3.</ul></li><ul><li>Specify the maximum number of seconds to wait for a secure TLS handshake to be initiated and to complete before the TLS session times out.</ul></li>
The remaining settings are intuitive. Specify the TLS ciphers in the format described in the [OpenSSL documentation](https://www.openssl.org/docs/man1.1.1/man1/ciphers.html#CIPHER-LIST-FORMAT).

**Note:** If you enter multiple cipher suites in the **TLS Ciphers** field, separate them with colons.


<p align=center><img src="/docs/resources/images/edge-configurations/property-tls.png" alt="TLS Settings" width="650"></p>

## Real-Time Log

If you signed an agreement with CDNetworks for accessing the real-time log, use the **Real-Time Log** section to "stream" an access log in real time to your designated HTTP or HTTPS endpoint. You can specify the format of each log entry using the NGINX variables shown in the following table; they will be replaced with the actual values in the notifications. If you use JSON format for the log, select **JSON** to escape special characters in the variable values. You can also specify a sample rate to reduce the number of log entries. Use request headers to pass additional information to the receiving endpoint.

| **Variable**                | **Description**                                    |
| --------------------------| ---------------------------------------------------|
| $body_bytes_sent             | Size of the response body.|
| $bytes_sent                  | Size of the response, including body, headers, and response line.|
| $client_country_code         | ISO 3166-1 country code representing the country of the client request (for example, <b>US</b>). If the country is unknown, <b>ZZ</B> is returned.|
| $client_real_ip              | IP address of the client request.|
| $content_code                | A code assigned to content for reporting and billing purposes.|
| $cookie_x                    | Obtains any cookie named <i>x</i>. For example, <b>$cookie_account</b> retrieves the value of a cookie named <b>account</b>. |
| $http_x                      | Obtains any HTTP header named <i>x</i> from the original request. The header name is converted to lower case, with dashes replaced by underscores. For example, <b>$http_user_agent</b> fetches the value of User-Agent. |
| $msec                        | Current Unix time in seconds with millisecond precision. |
| $qtl_req_id                  | Unique identifier representing the request. |
| $request_uri                 | HTTP request URI. |
| $request_method              | HTTP request method used to access the origin. |
| $request_scheme                      | Protocol of the user's request (either <b>http</b> or <b>https</b>).</br> |
| $request_time                | Response time in milliseconds. This is the time between receiving the request's first byte and serving the last byte of the response. |
| $sc_completed                | 1 = last byte of the object was served to the user.<br>Otherwise, 0.</br> |
| $sc_initial                  | 1 = first byte of the object was served to the user. <br>Otherwise, 0.</br> |
| $sent_http_content_length    | Original file size. |
| $sent_http_x                 | Obtain the value of an HTTP header named <i>x</i> that is returned in the response to the client. The header name is converted to lower case, with dashes replaced by underscores. For example, <b>$sent_http_etag</b> fetches the value of the ETag header. |
| $server_addr                 | IP address of the edge node serving the user's request. |
| $server_protocol             | Version of HTTP used in the user's request (<b>HTTP/1.0</b>, <b>HTTP/1.1</b>, or <b>HTTP/2.0</b>). |
| $ssl_cipher                  | Cipher suite used for the TLS (SSL) connection. |
| $ssl_server_name             | Hostname to which a client initiating a TLS (SSL) connection is attempting to connect. It is sent only by clients supporting Server Name Indication (SNI). |
| $ssl_protocol                | TLS version used for the TLS (SSL) connection. Example versions include <b>SSLv3</b>, <b> TLSv1</b>, <b>TLSv1.1</b>, <b>TLSv1.2</b>, and <b>unknown</b>. |
| $status                      | HTTP response code for the user's request. |
| $tcpinfo_rtt                 | Time in microseconds taken by a packet to travel to the destination and return. |

<p align=center><img src="/docs/resources/images/edge-configurations/property-realtime-log.png" alt="Real-Time Log" width="650"></p>

## Advanced Settings

**Cache Key Hostname:** By default, the Host header value in the client request is used in the cache key. If this property contains multiple service hostnames, the contents of different hostnames will be cached separately. If you want all hostnames to share one cached copy, specify a fixed "Cache Key Hostname" to override the default behavior.

**Has ICP Beian:** If this property must be served from servers in mainland China, make sure all hostnames [have Beian on file](</docs/edge-logic/faq.md#china-delivery-and-beian>) with the Chinese government. You can then contact the [CDNetworks support team](mailto:support@cdnetworks.com) to enable this function for you. Once enabled, change the **Has ICP Beian** setting to **Yes**. 

**Note:** You can set **Has ICP Beian** to **Yes** without contacting CDNetworks; however, the functionality <ins>**WILL NOT**</ins> be enabled until you request activation from CDNetworks.

**Load Balancer Logic:** Enter Edge Logic to customize load balancing. You can use a subset of the directives, including `if`, `set`, `return`, `eval_func`, `add_header`, `client_max_body_size`, `deny`, and `allow`. For the list of directives allowed in this field, refer to the `loadBalancerDirectives` field in the response to the [system configuration API](</apidocs#operation/get-cdn-systemConfigs>). This list can include advanced Edge Logic directives that have not been enabled for your account.
Example:  `if ($http_user_agent = bot) { return 403;}` 

**Note:** If the Edge Logic code is extremely long, check the <b>Soft Wrap Text</b> check box to display long text on multiple lines instead of one long line.


**Load Balancer Hash Key:** CDN Pro uses multiple tiers of load balancing to distribute client requests to different servers, with  consistent hashing used in many of these places. By default, the URL is used as the hash key, which should be satisfactory in most cases. However, you can define additional variables to be added to the hash key to distribute the requests more evenly. One typical use case is when all requests carry the same URL, but use a particular header field to indicate different resources. In general, the variable(s) specified here should be a subset of the variables you enter [into the cache key](</docs/edge-logic/faq.md#how-do-you-include-query-parameters-andor-request-headers-in-the-cache-key>). Only the following variables are supported: `$http_*`, `$cookie_*`, `$arg_*`.

 **Certificate Renew Automation:** By default, CDN Pro takes control of the contents under the ``/.well-known/{acme-challenge, pki-validation}`` directories to support [certificate auto-renew](</docs/portal/certificates/auto-renewal.md>) for properties. If you need to manage these two directories by yourself on the origin (for example, to implement your own certificate auto-renew mechanism), you can use this configuration option to disable the default behavior. <ul><li>If **Support** is selected, CDN Pro takes control of the two "special" directories to support auto-renewing of the property's certificate. This is the default setting.</ul></li> <ul><li>If **Disable** is selected, CDN Pro releases control of these special directories to the origin.</ul></li>

 **HTTP/2:** Use the radio buttons to enable or disable the HTTP/2 protocol. HTTP/2 is enabled by default. If disabled, HTTP/1.1 is used. 

 **Video Seeking:** This parameter supports seeking in a video using the following fields to specify the starting and ending positions. <ul><li>In the **Start Parameter** field, enter the beginning position of a video segment in bytes. </ul></li><ul><li>In the **End Parameter** field, enter the ending position of the video segment in bytes, or leave this field empty to play the video to the end.</ul></li>

<p align=center><img src="/docs/resources/images/edge-configurations/property-advanced-settings.png" alt="Property Advanced Settings" width="650"></p>
