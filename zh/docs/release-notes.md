# Release Notes

## October 5, 2022
### API updates
* Added ipDetails API to allow customers to query whether IP addresses belong to the CDN Pro platform.
* Ensured edgeHostnameZones field is returned as expected in serviceQuotas API.
* Ensured that a parent customer can help deploy a child’s property using a secret in Edge Logic.
* Improved error handling when a reseller tries to create a customer.
* Improved error handling when property is created with the realTimeLog setting.
* Allowed the weight field of client zone rules to have values up to 1000 for more precise control over traffic.
* Supported parsing CRT file and splitting chainCert, if any, from the file when creating or updating a certificate.

### Portal updates
* Improved usability of client zone rule creation.
* Improved error handling when a customer tries to access a product that hasn’t been enabled for him.
* Encoded URLs when creating purge and prefetch requests to make it easier for users who submit URLs with special characters..
* Updated handling of edgeHostnameZones in the portal to account for absent field.
* Added support for several variables ($remote_user, $client_real_ip, $sorted_querystring_args $random_N)in the load balancer hash key field.

## September 21, 2022
### API updates
* Ensured search for properties with keepAliveRequests returns results.
* Prevented service quota from being created or updated with duplicate directives.
* Fixed error handling when updating a child of a suspended parent customer.
* Fixed limits of customers when the grandparent customer’s limits are decreased.
* Fixed inheritance of customer limits.
* Updated resource usage check to consider CPU Hour usage.
* Fixed error handling when trying to update a customer’s type.

### Portal updates
* Ensured that user with multiple roles has expected access.
* Fixed display of role status on role details page.
* Improved appearance of staging version in the property list page.
* Ensured that the Getting Started link points to the help in the user’s preferred language.
* Ensured correct behavior of Has Beian setting in the property page.
* Updated the error message about the purge name.
* Fixed appearance of the upgrade page for expired trial users.
* Ensured our partner can share certificates with children customers.
* Fixed issue with creating and editing edge hostnames.


## September 1, 2022
### API updates
* Ensured that only customers with access to a shared certificate can deploy it.
* Ensured that required customer fields cannot be set to null.
* Ensured a child customer’s service quota limits are set to appropriate values based on the  parent’s limits.
* Ensured appropriate handling of reductions in a parent customer’s limits.

### Portal updates
* Allowed administrators to resend or cancel a portal user invitation by choosing the appropriate menu item of the pending user in the identity and access management page.
* Improved appearance of dropdown menu in the reports page.
* Improved appearance of the self-signup page.
* Improved appearance of the account creation page for self-signup customers.
* Improved appearance of the purge details page.
* Updated the CDN Pro upgrade page to reflect the current price plan.
* Update the user information page to support :30 and :45 timezones.
* Allowed purges of URLs with encoded special symbols.


## August 22, 2022
### API updates

* Added support for timezones offset by :30 or :45 minutes in portal user's setting.
* Prevented sharing of a certificate with a non-existent customer.
* Added support for originShield as an advanced feature, allowing you to add an extra layer between the CDN Pro edge servers and your origin servers.
* Supported filtering of [requests](</apidocs#operation/getEdgeRequests>) by serverGroups.
* Fixed maximum value of childCustomerLimit to match specification.
* Improved validation of Edge Logic, in particular, the [keepalive_timeout](</docs/edge-logic/supported-directives#keepalive_timeout>) and [custom_log_field](</docs/edge-logic/supported-directives#keepalive_timeout>) directives.
* Improved [service quota update API](</apidocs#operation/patch-cdn-serviceQuotas-customer-customerId>)’s handling of edge cases.
* Improved message for invalid apiMaxBurst value.
* Improved handling of default service quota for child customers.

### Portal updates
* Fixed display of report when timezone is changed.
* Improved appearance of copyright.
* Added support for origin shield as an advanced feature.
* Fixed test environment issue in which version wasn’t properly displayed in the Add Tasks page.
* Improved appearance of the identity and access management menu.
* Improved appearance of top bar.
* Fixed display of timezone in annotation creation’s dropdown menu.
* Ensured that the user-selected timezone applies to a report’s time range.


## August 11, 2022
### API updates
* Improved error handling when summary report APIs are called with invalid customer IDs.
* Improved error handling when [creating service quotas](</apidocs#operation/post-cdn-serviceQuotas>) with invalid settings.
* Ensured updates to a customer's portalSettings work correctly.
* Improved error handling for invalid references to a certificate.
* Added the customerId field to the [annotations list API](</apidocs#operation/queryAnnotationList>)’s response.
* Fixed filter support in the [annotation list API](</apidocs#operation/queryAnnotationList>).
* Improved assignment of default limits for a child customer.
* Improved the create and update service quota APIs to handle null values.
* Fixed the [property list API](</apidocs#operation/getPropertyList>)’s hasConfig filter to support the keepAliveTimeout field.
* Increased notification limit from 2000 to 4000 characters.
* Ensured that the Beian status check sends emails to customers warning of expired Beian licenses which affects use of PoPs in China.
* Corrected enforcement of values of the [limit_rate Edge Logic directive](</docs/edge-logic/supported-directives#limit_rate>).
* Fixed error handling for updating customer limits.
* Ensured InvalidSelfUpdateChinaBizInfo error is returned when appropriate.
* Allowed an edgeHostname with redirect or reject actions to be created in the qtlcdn.com zone.

### Portal updates
* Added help information to the portal.
* Corrected display of the role details.
* Displayed an appropriate message when the user tries to access a deleted certificate.
* Improved error handling of self-signup page.
* Supported scrolling of hostnames in the report page.
* Improved display of hostnames in the report page.
* Removed button in the property version comparison page.
* Improved display of purge list.


## July 25, 2022
### API updates
* Allowed variables in the [limit_rate directive](</docs/edge-logic/supported-directives#limit_rate>) and [limit_rate_after](</docs/edge-logic/supported-directives#limit_rate_after>) Edge Logic directives.
* Fixed issue with copying limits to child customers.
* Ensured that less expensive server groups are shown in the edge hostname API when a customer uses the higher level group.
* Ensured that the Report-Range header is consistently implemented among our APIs.
* Added support for the prefetchLevel field when requesting a [prefetch](</apidocs#operation/post-cdn-prefetches>). It defaults to Parent and can be set to Edge if necessary.
* Improved error handling if creating a validation task for a property with an incorrectly terminated directive in "loadBalancerLogic".
* Ensured that updating customer configs works as expected.
* Ensured that API rate limits are set correctly for child customers.
* Ensured that child customer limits are correct.
* Updated API server to ensure that nearChina must be in a client zone rule without other server groups.
* Ensured that company name supports non-Latin characters.

### Portal updates
* Ensured that upgrade button text is in the correct language.
* Ensured action menu items are disabled for users with read-only access.
* Allowed deployment of property with expired certificate for testing.
* Ensured prefetch timezone is correct.
* Improved the layout of property search when many fields are specified.
* Ensured that the hostnames field in annotations page is filled with current hostnames of the displayed report.
* Fixed CPU time report’s behavior.
* Allowed MacOS users to create an annotation by clicking "Command" + "Left click".


## July 13, 2022
### API updates
* Improved error handling of logins.
* Improved the appearance of account update notification emails.
* Limited prefetch and purge URLs to 2048 characters.
* Ensured lower level server groups are included with higher ones. (For example, access to ultra includes access to standard, premium, and deluxe.)

### Portal updates
* Updated self-signup page to support other languages. Currently, English and Chinese are supported.
* Improved appearance of reports page.
* Improved appearance of suspended status on users page.
* Improved error message for access log date range.
* Updated date/time display in report annotations to match mockups.
* Changed report menu to image to match mockups.
* Ensured tooltips in report annotations match mockups.
* Improved appearance of longer report annotation comment.
* Updated edge hostname user interface to ensure that lower server groups are enabled with higher ones.
* Improved display of Secret Details page.
* Ensured language of message when deleting a role matches the user’s preference.
* Added support for request and CPU summary reports.
* Fixed display of login page for self-signup users.

## June 30, 2022
### API updates
* Improved cleanup of customer accounts.
* Ensured notification emails are correctly sent to CDN Pro customers only.
* Fixed an error when the [limit_rate directive](</docs/edge-logic/supported-directives#limit_rate>) is used.
* Updated load balancer logic to support the [custom_log_field Edge Logic directive](</docs/edge-logic/supported-directives#custom_log_field>).
* Ensured appropriate setting of child customers’ API limits.
* Added support for the %srvip setting in the [log configuration](</apidocs#operation/post-cdn-report-logConfigs>) format to show the IP address of the CDN server handling a request.
* Prevented client request headers from being passed to a real-time log server.

### Portal updates
* Added support for Chinese in the self-signup page.
* Added a support office field in the self-signup page to allow regional staff to help customers.
* Improved error handling in the property creation page.
* Fixed display of edge configuration’s secret after it is updated.
* Improved report annotation creation.
* Prevented an invalid hostname from being added to a group in the reports page.
* Improved the appearance of the task details page.
* Improved accessibility of our portal by hosting third-party CSS/JS files ourselves.
* Translated more text.
* Fixed issue affecting removal of a role from a user.
* Improved display of the self-signup page.
* Fixed error in the property version comparison page affecting the new load balancer logic field.
* Improved the appearance of the customer list page for resellers.
* Fixed report’s handling of the end of the date range to round up, making it consistent with our API.



## June 15, 2022
### API updates
* Ensured parent customers can create an edge hostname on behalf of a child customer.
* Fixed an issue affecting purge requests.
* Ensured that allowedServerGroups are properly saved.
* Ensured the lists of server groups in an edge hostname and a service quota appear in a consistent order.
* Fixed an issue with deleting a parent customer’s service quota.
* Ensured that server groups cannot be removed if they are still in use.
* Improved the API rate restriction implementation.

### Portal updates
* Ensured expired trial customers can upgrade.
* Ensured the number of regular expression purges appears in the Content Management page.
* Improved error handling when deleting a role in use.
* Improved error message when the report date range is exceeded.
* Updated the copyright year in emails.
* Added caller information in purge and prefetch details.
* Added a box to show load balancer logic in property comparison.
* Ensured a button's text is correctly translated to Chinese.
* Ensured the viewer role has appropriate visibility of annotations.
* Ensured a domain group can be deleted.
* Ensured proper display of server groups available to a customer.


## June 2, 2022
### API updates
* Updated support for API rate limiting. Each customer has an apiRate and apiMaxBurst setting that limits the number of API calls that can be made in a short period of time.
* Added regexEntries field in the [purge list API’s response](</apidocs#operation/getPurgeRequestList>).
* Prevented duplicate server groups from being added to a client zone rule of an edge hostname.
* Improved error handling when requesting the service quota of a customer without the CDN Pro service.
* Improved management of server groups for customers with child customers.

### Portal updates
* Fixed count of hostnames in the Edge Hostname Request report.
* Updated inactivity email.
* Updated link to documentation in the access log download page.
* Updated the traffic volume summary report to support the ChinaStandard and ChinaPremium server groups.
* Fixed a hint in the load balancer logic editor.
* Fixed loading of reports for some users.
* Ensured users can create purge requests with regular expressions.


## May 20, 2022
### API updates
* Added allowedServerGroups field to service quota to control the server groups a customer can access.
* Added CPU summary report.
* Improved error handling of PATCH API permissions to suggest creating an API permission if it does not yet exist.
* Added support for multiple hostnames in the report download API.
* Improved error handling if a user specifies an invalid server group in an edge hostname's configuration.
* Ensured consistent naming of server groups in the service quota APIs.
* Ensured default server groups are used if none are specified when creating an edge hostname.

### Portal updates
* Added support for report annotations to highlight interesting events.
* Improved error handling when missing a semicolon in a property’s Edge Logic.
* Added support for saving hostnames as a group in the report form to allow easier reuse.
* Fixed display issue in access log download page when the user clicks the browser's back button.
* Fixed an error in the log configuration creation page when a $ character is entered.
* Fixed an error preventing deletion of a log configuration.


## May 6, 2022
### API updates

* Renamed “premium+” server group to “deluxe” and added ChinaStandard and ChinaPremium groups to distribute content using servers in Mainland China.
* Improved validation of API names.
* Ensured that email notifications are sent to all portal users identified as ‘master’.
* Improved description of undeployment task when a customer is suspended.
* Relaxed validation of the [access_log_sampling directive](</docs/edge-logic/supported-directives#access_log_sampling>) to permit variables.
* Added support for three [log configuration](</apidocs#operation/post-cdn-report-logConfigs>) fields: %querystr, %reqhdrsize, %reqsize.


### Portal updates
* Improved validation of role names.
* Improved validation when a user tries to modify the server header using the add_header directive.
* Improved Korean-language translation.
* Improved display of self-signup page.
* Updated prefetch to support continents rather than countries.
* Improved display of task menu.
* Improved display of property comparison page.
* Added support for new log configuration fields: : %querystr, %reqhdrsize, %reqsize.
* Supported renaming of server groups.


## April 19, 2022

### API updates
* Improved validation of Edge Logic.
* Ensured that properties and certificates are undeployed after a customer’s service quota status becomes suspended.
* Limited the maximum number of certificate versions that can be created to 500, after which a new certificate should be created.
* Relaxed Edge Logic validation to ensure valid case passes.
* Ensured proper response when customer is created with responsiblePerson field.
* Permitted 0 as a value of the [limit_rate_after Edge Logic directive](</docs/edge-logic/supported-directives#limit_rate_after>). This may be useful for blocking attacks. 

### Portal updates
* Improved error handling for report APIs if report service is unavailable.
* Improved display of property comparison page.
* Fixed appearance of property versions with very long descriptions.
* Fixed Korean translations.
* Updated origin configuration to support authentication certificate to connect to the origin server.
* Improved certificate details layout.
* Ensured that a client zone rule can be configured to deliver using server groups inside and outside of China.


## April 6, 2022
### API updates
* Improved notification of changes made to a customer account or API account on behalf of the customer.
* Introduced two new server groups, ChinaBase and ChinaUltra. These can be used by customers with ICP Beian to deploy to servers in China. Formerly, they were an inherent part of the other server groups.
* Improved validation of the API login name. It can consist of only alphanumeric characters along with the underscore, ampersand, hyphen, and period characters.

### Portal updates
* Used our CDN to accelerate the portal.
* Improved property search by adding a dialog for configuring search criteria.
* Added warning about regex pattern limit when creating a purge request.
* Fixed problem with display of edit edge hostname page.
* Ensured the correct report type is used after navigating between different reports.
* Improved display of warning in edge hostname creation page.
* Improved message about Edge Logic configuration format.
* Fixed Korean language text on Purge page.
* Modified edge hostname page to support the two new server groups, ChinaBase and ChinaUltra.
* Escaped the period in the Edge Logic wizard’s default location.


## March 24, 2022
### API updates
* Cleaned up database to ensure edge hostnames can be created.
* Prevented termination of a parent customer if it has a child customer.
* Added support for authentication to origin using a certificate. The certificate must be created and deployed.
* Ensured ['origin_pass'](</docs/edge-logic/supported-directives#origin_pass>) works correctly with ['if' blocks](</docs/edge-logic/supported-directives#if>) in Edge Logic.
* Improved error handling for API call without proper authentication.
* Ensured that parent can get details of an API call that had been performed on behalf of a child customer.
* Ensured real-time log sample rate works as expected in the presence of [return directives](</docs/edge-logic/supported-directives#return>).

### Portal updates
* Fixed error related to attempted re-use of deleted portal user.
* Fixed role creation when choosing “All permissions”.
* Improved confirmation message when creating a property with hostnames that have ICP Beian.
* Improved translated text.
* Fixed display of prefetch region in list when user enters a region.
* Fixed issue affecting display of portal user’s status when editing a user.
* Ensured a reseller can create and manage roles with self+children scope.
* Added confirming if user clicks away while creating a prefetch or purge request.
* Improved efficiency of displaying dashboard reports.

## March 11, 2022
### API updates
* Fixed PATCH webhook API to allow credential to be updated.
* Improved error handling to be more user friendly.
* Allowed childCustomerLimit to be updated for a suspended parent customer.
* Fixed syntax checking for directives used in loadBalancerLogic field of properties.
* Improved error handling when null values are passed.
* Fixed response to APIs when offset exceeds the total number of records.
* Ensured that a child customer can check the API call made on behalf of them.
* Updated the [certificate details API](</apidocs#operation/queryCertificateVersion>) to show the issuer of the certificate.
* Fixed error returning [certificate list](</apidocs#operation/getCertificates>).

### Portal updates
* Added support for log configuration in the portal. Users must create a log configuration that applies to a hostname in order to download access logs for it.
* Improved handling of duplicate self-signup attempts.
* Improved edit user page for unconfirmed users.
* Asked users to confirm cloning of property version not yet deployed to production.
* Improved display of text when user changes browser window size.
* Improved display of property version list.
* Fixed display issues in edge hostname request report.
* Fixed display issue in report page when enter key is pressed.
* Updated translated text.
* Showed issuer of certificate and improved layout.

## February 22, 2022
### API updates
* Fixed error handling for invalid search of customers.
* Fixed consistency issues in tracking edge hostnames.
* Improved error code for log download API.
* Allowed log configuration update to clear the description field.
* Updated loadBalancerLogic to allow use of system configuration API’s baseLbDirectives along with a customer’s allowedLbDirectives.
* Fixed error handling querying historical API calls.
* Fixed report API response when there is no data.

### Portal updates
* Added support for creating prefetch requests.
* Fixed issues with Russian translation.
* Fixed issue in report page with scroll bars.
* Fixed display of Staging version column in properties list affecting some languages.
* Improved Edge Logic hint text.
* Fixed display of buttons in edge hostname creation and update pages.
* Fixed enforcement of upper limit on property versions.
* Fixed display of button and excess space in report page.
* Fixed spacing between fields in Edit Certificate page.


## February 4, 2022
### API updates
* Improved customer creation error handling when attempting to recreate a customer.
* Added support for peerFailureTimeout field in property’s origin settings to control retries when an origin server is inaccessible.
* Improved [webhook creation](</apidocs#operation/post-cdn-webhooks>) error handling when invalid credentials are specified.
* Added support for Report-Range header in the [log configuration list API](</apidocs#operation/get-cdn-report-logConfigs>).
* Added edge request, intermediate response, intermediate request, origin response, origin request to the [traffic volume summary report](</apidocs#operation/get-cdn-report-volSummary>).
* Fixed error that occurred if a regular expression purge passed a URL ending with  “\?”
* Improved efficiency of checking for recent traffic to hostnames  when deploying or undeploying properties.
* Ensured that variedFields field is returned in the response of the [purge list API](</apidocs#operation/getPurgeRequestList>).
* Fixed response to API called after service has been suspended.
* Sorted the dataNames in [edge status summary](</apidocs#operation/get-cdn-reports-edgeStatusSummary>) and [origin status summary](</apidocs#operation/get-cdn-reports-originStatusSummary>) APIs.
* Ensured that groupBy in the summary report APIs supports up to two items.


### Portal updates
* Ensured that edge hostname list is refreshed after filtering using “Has Beian”.
* Made improvements to realtime log UI in the property configuration page.
* Added length restriction to purge name.
* Added support for automatic check of ICP Beian for new properties.
* Improved Russian language text.
* Fixed display of title in Update Secret page.


## January 21, 2022
### API updates
* Support hostname filter in query string of the [log download API](</apidocs#operation/get-cdn-report-logDownload>).
* Improved error handling when a user tries to [create an edge hostname](</apidocs#operation/createEdgeHostname>) using illegal characters.
* Added support for Report-Range header in the [purge list](</apidocs#operation/getPurgeRequestList>) and [prefetch list](</apidocs#operation/get-cdn-prefetches>) APIs.
* Allowed the billUsingStripe serviceQuota field to be set to null.
* Allowed groupBy to be used in the query string of summary reports. This is useful when calling the report APIs using the GET method.
* Added [edge status summary API](</apidocs#operation/get-cdn-reports-edgeStatusSummary>) to summarize status codes returned by edge servers.
* Added [origin status summary API](</apidocs#operation/get-cdn-reports-originStatusSummary>) to summarize status codes returned by origin servers.
* Prevented duplicate certificate and property versions from being created if multiple requests were received at the same time.
* Improved error handling for invalid impersonation attempts.
* Improved error message for invalid maxSuccessRate filter passed to the [purge list](</apidocs#operation/getPurgeRequestList>) API.
* Fixed response of [edge hostname request summary](</apidocs#operation/get-cdn-report-edgeHostnameReqSummary>) API.
* Supported access_log_sampling directive in loadBalancerLogic.
* Added support for several variables (%cltregion, %cltisp, %cltport, and %reqrange) to the [log configuration format](</apidocs#operation/post-cdn-report-logConfigs>).

### Portal updates
* Improved handling of user with limited permissions to access role management in the portal.
* Improved display of edge hostnames and secrets.
* Improved emails notifying users of changes to their accounts.
* Prevented use of the special nearChina server group from including other server groups in a client zone rule.
* Fixed a tooltip for regular expression purge.
* Allowed users to specify load balancer logic via a new input field.
* Updated the getting started video for new users.


## January 7, 2022
### API updates
* Added createTime and updateTime fields to the response of the [Get a log configuration API](</apidocs#operation/get-cdn-report-logConfigs-id>). 
* Fixed role name limit enforcement to match specification (128 character maximum).
* Fixed error handling of purge task with null value for fileUrls, /regexPatterns, or dirUrls.
* Removed the API key from the response of the Get customer API. For security, the key will be returned only when creating a customer or resetting the customer's key.
* Fixed generation of NGINX configuration when Edge Logic includes regular expression.
* Fixed property configuration when an additional TLS certificate is removed.


### Portal updates
* Ensured errors coming from purge requests are translated.
* Corrected display of reports’ first and last data points in some scenarios. 


## December 29, 2021
### API updates
* Improved error handling of portal user creation and updates.
* Improved error handling of edge hostname creation and updates.
* Improved error handling of unauthorized request for customer details.
* Improved error handling of invalid input when [creating an API permission](</apidocs#operation/post-cdn-apiPermissions>).
* Ensured [prefetch list](</apidocs#operation/getPurgeRequestList>) contains only unique URLs.
* Improved error handling of ICP Beian status check.
* Allowed access to secrets to be limited by API permissions.
* Ensured permissions are respected for annotations API.
* Added target, action, and maxSuccessRate query parameters to the [purge request list API](</apidocs#operation/getPurgeRequestList>).
* Improve error code and message when deploying a property using a secret that has been updated.
* Added Get public IPs API.
* Improved the InvalidContentType error message for API calls.

### Portal updates
* Improved display of Getting Started video banner.
* Fixed handling of role deletion.
* Made staging IP addresses accessible in the property list page.


## December 21, 2021
### API updates
* Corrected error message for ResponsiblePersonTooLong code when a reseller creates or updates a customer.
* Ensured that a reseller's operator API account can request a [reset of a child customer’s API key](</apidocs#operation/patch-ngadmin-customers-id>).
* Ensured that a child customer can request the parent’s name.
* Improved error message when a deployment task is created with an empty property ID.
* Ensured that a [report annotation](</apidocs#operation/createAnnotation>) can be created for wildcard hostname *.com.
* Added maxFilePurgeEntries and maxDirPurgeEntries to [service quota](</apidocs#operation/post-cdn-serviceQuotas>) to limit the number of entries that can be submitted in a single purge request.
* Added support for a new Edge Logic directive, http2_max_concurrent_streams, with a default of 64 and maximum of 512 to support domains with small objects requiring higher levels of concurrency.
* Added support for regular expression [purge](</apidocs#operation/createPurge>).
* Ensured that logConfigLimit specified in the service quota is properly enforced.
* Ensured that reseller can perform actions such as querying or updating a suspended child customer.

### Portal updates
* Prevented deletion of role that is in use.
* Fixed user list page to show roles belong to each user.
* Added support for regular expression purge.
* Fixed purge quota warning’s appearance.
* Fixed property search so that filters work as expected.
* Fixed page numbers on the property list page.
* Fixed edge hostname page to properly reflect the status of Mainland China support.
* Replaced “Directory” with “Wildcard” as purge type when creating a purge request. This better reflects what you can do with this option.
* Ensured that a role can be deleted after users using it have been deleted.

## December 1, 2021
### API updates
* Fixed error message when a prefetch request is created with an invalid header value.
* Improved error handling of the [webhooks list API](</apidocs#operation/get-cdn-webhooks>).
* Improved error handling of the filter in [annotation list API](</apidocs#operation/queryAnnotationList>).
* Fixed status code when attempting to update an edge hostname’s Beian status.
* Fixed salutation in email notifications of account changes.
* Fixed [traffic volume summary](</apidocs#operation/getVolSummary>)’s response to account for a special situation of domain served from the local IP address 127.0.0.1.
* Added loadBalancerLogic field to property definition, allowing custom code to be inserted into the NGINX LB block. A field, loadBalancerDirectives, was added to the [systemConfigs API](</apidocs#operation/get-cdn-systemConfigs>) to indicate the directives that can be used. These updates allow code to be added to reject DDoS requests.

### Portal updates
* Fixed pagination of portal user list page.
* Ensured list of secrets is updated after a secret is created or deleted.
* Corrected unit of measurement for cache hit ratio in traffic report.
* Improved purge interface to allow easy entry of multiple files or paths.
* Showed notifications in the correct language.
* Emphasized Beian Content Type must be selected if the user indicates property has ICP Beian.
* Added support for RSA_SIGN and RSA_verify in the [eval_func](</docs/edge-logic/supported-directives#eval_func>) of Edge Logic.
* Updated error handling when cloning edge hostname with Beian support.
* Fixed initialization of radio buttons when repeating a purge.


## November 17, 2021
### API updates
* Fixed error handling when querying the status of an invalid, non-existent prefetch.
* Fixed error handling when [creating a prefetch](</apidocs#operation/post-cdn-prefetches>) with an invalid start time.
* Fixed [log configuration creation](</apidocs#operation/post-cdn-report-logConfigs>) to respect limit.
* Improved error handling in [portal user management APIs](</apidocs#tag/Portal-User-Management>).
* Fixed versions in response to the [property list API](</apidocs#operation/getPropertyList>).
* Updated links to refer to CDN Pro on our website.
* Added [bandwidth summary report API](</apidocs#operation/post-cdn-report-bandwidthSummary>), allowing you to get summary of traffic bandwidth during a timespan.

### Portal updates
* Enhanced property search to support searching by configurations.
* Removed extraneous whitespace in property name.
* Improved Edge Logic Wizard to provide recommended settings for websites and download or VOD (video on demand) content as well as continuing to allow full self-configuration.
* Enhanced property search to allow resellers to search for properties of their child customers.
* Fixed filtering on certificate list page.
* Fixed portal user suspension.


## November 3, 2021
### API updates
* Revised the access log implementation. You must [create a log configuration](</apidocs#operation/post-cdn-report-logConfigs>) to obtain logs for your hostnames. A log configuration is essentially a custom format you define to meet your needs.
* Fixed error getting a long [list of properties](</apidocs#operation/getPropertyList>).
* Fixed an error that occurred if [creating](</apidocs#operation/createContact>) or [updating a portal user](</apidocs#operation/patch-ngadmin-contacts-id>) with an email address more than 74 characters long.
* Allowed more flexible use of the wildcard character, ‘*’, in [purge requests](</apidocs#operation/createPurge>).
* Allowed up to 20 URLs to be specified in a [directory purge](</apidocs#operation/createPurge>).

### Portal updates
* Improved error handling if an invalid cache time is entered in the origin configuration.
* Improved warning if deploying a property with an expired certificate.
* Improved Russian, Korean, and Japanese translations of Edge Logic hints.
* Fixed custom role so it can access reports.


## October 22, 2021
### API updates
* Fixed issue with deleting edge hostnames.
* Relaxed ICP Beian check to support more domain suffixes.
* Disallowed specification of our default edge hostnames in a service quota’s edgeHostnameZones field.
* Ensured that TLS1.3 can be specified as the minimum TLS version in a property.
* Fixed scenario where reseller is creating a service quota for a customer.
* Updated our cache key handling to support prefix purge.

### Portal updates
* Updated role management to provide precise control over role permissions.
* Added “Purge Again” button to the purge details page, allowing you to resubmit a purge request.
* Allowed deployment of property with expired certificate. This isn’t a configuration normally used in production since visitors’ browsers will show warnings.
* Changed product name to “CDN Pro”. 

## October 1, 2021
### API updates
* Allowed resellers to use a different domain for [edge hostnames](</apidocs#operation/createEdgeHostname>) instead of our defaults. Resellers need to contact us for more information.
* Fixed error message when [creating a deployment task](</apidocs#operation/createDeployment>) with an invalid property ID.
* Prevented suspended customer from making calls to an API.
* Ensured child customer cannot have higher limits than a reseller.
* Fixed error handling when a reseller tries to [update a customer](</apidocs#operation/patch-ngadmin-customers-id>) with invalid configs field.
* Ensured that default usage limits for a child customer are set properly.
* Ensured edge hostnames begin with at least 10 characters before the suffix.
* Ensured proper cache key is set even if the [auth_request directive](</docs/edge-logic/supported-directives#auth_request>) overrides $uri.
* Enhanced [purge](</apidocs#operation/createPurge>) to support prefix purges (for example, http://test.domain2.com/mydir/a* to purge files starting with “a” and  "http://test.domain2.com/mydir/a** “ to purge all files and subdirectories starting with 'a')

### Portal updates
* Fixed some Russian translation issues.
* Updated the Create Edge Hostname page to support multiple suffixes.

## September 21, 2021

### API updates
* Disallowed update of the edgeHostname field in edge hostnames because it can interrupt service.
* Disallowed update of the hasBeian field in edge hostnames because of planned changes to edge hostnames to use different suffixes for those with ICP Beian versus those without.

### Portal updates
* Fixed display of plan page for self-signup trial users.
* Updated warning text about pending standby task if the user tries to log out before deploying.
* Improved response to erroneous input in the report page.
* Improved display of lengthy tooltips in the property configuration page.
* Fixed issues supporting Russian translation.
* Added clarification for trial users that deployment to production is enabled only after they’ve performed some tests against staging.
* Supported soft wrap in the Edge Logic editor.
* Allowed Edge Logic hint text to be translated. Directive names are keywords that must remain in English.

## September 8, 2021
### API updates
* Returned error code InvalidApiAccountId if an incorrect API account ID is specified when calling [API permissions](</apidocs#tag/API-Access-Control>) endpoints.
* Enforced the logConfigs API permission.
* Added responsiblePerson and emailAddress fields to the [customer list API](</apidocs#operation/get-ngadmin-customers>)’s response.
* Added support for nearChina in reports. “nearChina” is an advanced feature that can be enabled for those without ICP Beian who want to maximize performance for visitors in China. Please contact us if you require this feature.
* Prevented the HDT product from being removed if the customer was still using resources.
* Prevented property using a shared certificate from being deployed if the owner of the shared certificate stopped sharing it. The property must be updated to use another certificate or no certificate before it can be deployed.
* Added support for advanced Edge Logic directive proxy_ignore_client_abort which is useful for our real-time log feature.
* Fixed creation of API permission.
* Fixed removal of the ECP product from a customer.
* Fixed error handling when invalid values are specified for usageLimitDays and usageLimitDollars of the [serviceQuotas APIs](</apidocs#tag/CDN-Product-Management>).
* Ensured that read-only API accounts can call [report APIs](</apidocs#tag/Reports>).
* Ensured that [service quota creation](</apidocs#operation/post-cdn-serviceQuotas>) does not require specifying directiveParameterLimits. Defaults apply.

### Portal updates
* Improved the self-signup page to describe our promotional offers.
* Made improvements to support translation from English to other languages.
* Fixed display of certificate name when creating a property.
* Pointed self-signup customers to our [“Getting Started” video](<https://www.cdnetworks.com/wp-content/uploads/videos/cdnpro_v1.mp4>).
* Added tooltip for real-time log sample rate in property configuration.
* Fixed display of dropdown lists in reports page.
* Added support for TO_UPPER, TO_LOWER, and SUBSTR to our Edge Logic function [eval_func](</docs/edge-logic/supported-directives#eval_func>).
* Added information icons for TLS Ciphers and Certificate auto-renew.
* Added support for ENCRYPT_SYMM and DECRYPT_SYMM cipher functions that can be used in Edge Logic.
* Improved certificate list display.
* Ensured user can confirm deployment of property with a mismatched or expired certificate. This should not normally be done in production if you expect real visitors to access your content since their browsers will show warnings and prevent access.


## August 25, 2021
### API updates
* Allowed [origin_read_timeout](</docs/edge-logic/supported-directives#origin_read_timeout>), [origin_send_timeout](</docs/edge-logic/supported-directives#origin_send_timeout>), and [origin_connect_timeout](</docs/edge-logic/supported-directives#origin_connect_timeout>) Edge Logic directives to be used in location blocks. Previously, they were supported only in server blocks.
* Fixed reseller [creation of a service quota for a child customer](</apidocs#operation/post-cdn-serviceQuotas>) if the reseller has no explicit usage limits.
* Improved error message for the InvalidIds code that can be returned by our [portal user list API](</apidocs#operation/getContacts>).
* Improved error message for the CertificateMismatch code which can be returned when [creating a deployment task](</apidocs#operation/createDeployment>) if the certificate's Subject Alternative Name does not include the hostnames in your property.

### Portal updates
* Added pie charts to the origin status code details and status code details reports, allowing you to see the percentages of returned status codes.
* Improved the CDN Pro self-signup page to mention our special offers.
* Ensured the Start Purge button is enabled after the user does a directory purge. It allows the user to create additional purge requests without leaving the page.
* Allowed administrators to force a deployment, overriding warnings from our check of certificates and hostname activity. We warn if a certificate's Subject Alternative Name field does not contain the hostnames specified in the property, if the certificate already expired and would cause visitors to get browser warnings, and if the deployment affects hostnames that were recently accessed by visitors.
* Translated additional text that appears in the portal.
* Supported accelerating the CDN Pro portal and API through our CDN to improve performance.
* Fixed display issues in the certificate details page.

## August 11, 2021
### API updates
* Improved validation of report annotations.
* Enforced IP allow lists for API calls.
* Improved validation of portal user configuration.
* Allowed reseller to call [deployment management APIs](</apidocs#tag/Deployment-Management>) on behalf of customer if needed.
* Fixed notification-related bug.

### Portal updates
* Improved button layout in the property edit page.
* Updated support for spaces in a ['secret'](</docs/portal/secrets/overview>).
* Improved the certificate details page.
* Added more help information when creating a new certificate version.
* Ensured that the range picker filter is highlighted properly in the Content Management page.
* Improved error handling when entering invalid date ranges in the Deployments page.
* Ensured users can confirm they want to undeploy a property that has recent requests.
* Fixed banner shown to self-signup customers.
* Fixed button display in the property comparison page.


## July 28, 2021
### API updates
* Fixed [portal user list API](</apidocs#operation/getContacts>)'s handling of the ids query parameter.
* Ensured an operator API account of a reseller can [create an API permission](</apidocs#operation/post-cdn-apiPermissions>) for an API account of their customer.
* Allowed a single task to deploy a new certificate version along with the property using it instead of requiring separate deployment tasks.
* Improved Edge Logic validation to ensure that nested location blocks have a content handler.
* Improved handling of customer deletion when the customer is still using resources.
* Improved validation of hostnames used in a property.
* Updated [deployment](</apidocs#operation/createDeployment>) to support the Check-Certificate header to bypass checking of expired certificates and hostnames missing from the certificate’s SAN. This may be useful in some circumstances for testing, though it should not normally be used in production, since browsers would discourage visitors from accessing your content.
* Improved certificate verification.
* Ensured that query strings of URLs that are purged are respected.

### Portal updates
* Improved report range date picker.
* Added tooltips for Direct Connection origin setting.
* Improved appearance of client zone rules table.
* Added initial Russian language support.
* Added visual cue when loading the list of certificates.
* Show waiting status when saving or validating a property.

## July 15, 2021

### API updates

* Improved validation of API calls made by resellers.
* Improved error handling of [secret management APIs](</apidocs#tag/Secret-Management>).
* Added support for “operation” report annotations that CDNetworks may use to identify operational changes. We expect these to be infrequent.
* Made API query parameters case-insensitive for ease of use.
* Fixed [annotation list](</apidocs#operation/queryAnnotationList>) to include recently updated annotations.
* Fixed [search for secret by its ID](</apidocs#operation/get-cdn-secrets>).

### Portal updates

* Updated the Content Management page so you can search for purge requests by selecting the time range when they were submitted.
* Required you to confirm if you try to delete a recently active hostname or edge hostname. This helps prevent accidental deletion of resources still used by visitors.
* Fixed highlighting of a menu when switching to the standby tasks page.
* Improved the cache settings dialog shown when creating a new property by clicking Wizard.


## June 30, 2021

### API updates

* Added [secret management](</apidocs#tag/Secret-Management>) APIs you can use to improve security by preventing sensitive text from being exposed in Edge Logic.
* Allowed you to show [report annotations](</apidocs#tag/Annotations-for-Reports>) for property deployments, certificate deployments, and edge hostname updates.
* Added “proxy_next_upstream off;” in NGINX configuration to avoid latency related to using the [real-time log feature](</docs/portal/edge-configurations/creating-property#real-time-log>).


### Portal updates

* Added reminder to use directory purge for files with multiple variations.
* Fixed display of IP addresses available for [testing deployments to staging](</docs/portal/edge-configurations/testing-property>).
* Added the "Secret Management" feature so you can hide sensitive text from being exposed in Edge Logic. To access, click “Secrets” under the “Edge Configurations” menu item.
* Improved the cache settings dialog shown when creating a new property by clicking Wizard.
* Improved the display of the property comparison page.
* Added a Video Seeking section to the Advanced Settings of property configurations allowing you to specify parameters related to video content.

## June 14, 2021

### API updates
* Updated a customer's [list of users](</apidocs#operation/getContacts>) to indicate whether the users have full access to all products.
* Ensured an error is returned if you try to create a property with duplicate hostnames.
* Updated [API calls](</apidocs#operation/get-ngadmin-apicalls>) to return data from the last 30 days by default.
* Reduced the latency associated with real-time log implementation.

### Portal updates
* Improved the standby task's interface.
* Improved the property edit page's appearance.
* Improved the property deployment user interface by linking to information about testing staging deployments.
* Added text explaining the ICP Beian setting.
* Improved the sidebar menu icons.
* Fixed the appearance of a long edge hostname in the reports page.
* Ensured the portal shows a property version is frozen once the property is deployed.

## June 4, 2021
### API updates

* Fixed prefetch quota enforcement.
* Added a check for traffic when you try to delete a hostname or edge hostname. This helps reduce accidental deletion of actively used hostnames and edge hostnames.
* Made /ngadmin API query parameters case-insensitive for ease of use.


### Portal updates

* Added a confirmation dialog when you cancel adding to the standby task list.
* Provided additional help in the portal for directory purge.

## May 21, 2021
### API updates

* Added support for $remote_user and $client_real_ip in loadBalancerHashKey.
* Added support for [webhooks](</apidocs#tag/Webhooks>) in asynchronous operations (validation, deployment, purge, prefetch) to notify you when the operations complete.
* Improved [property list API’s](</apidocs#operation/getPropertyList>) "hasConfig" filter to support searching fields.
* Added a check of traffic before deleting an edge hostname to avoid accidental deletion.

### Portal updates
* Added the origin status code report.

## May 5, 2021

### API updates
* Enhanced the property search to allow direct matches including prefacing with ‘^’ to match text at the beginning of fields.
* Fixed a problem with enabling the [High Speed Data Transmission (HDT)](<https://www.cdnetworks.com/high-speed-data-transmission/>) product for a reseller's customer.
* Fixed an error when deploying a property using a certificate without SANs.


### Portal updates

* Fixed an error that could occur while creating a certificate.
* Updated the customer list page to ensure it has at least 10 items per page.
* Ensured that search and filter conditions for certificates are additive.
* Added support for cloning an existing property to create a new one.
* Added "View Report" in the "Actions" menu for properties and edge hostnames.
* Added support for the [CALC_INT and ABS_INT functions](</docs/edge-logic/supported-directives#eval_func>) in Edge Logic.

## April 21, 2021

### API updates
* Added the [requests summary report](</apidocs#operation/post-cdn-report-reqSummary>) to summarize requests to the CDN Pro edge servers.
* Ensured the ‘latestVersion’ field is returned when [getting a property’s details](</apidocs#operation/queryProperty>).
* Fixed responses for the [customer list API](</apidocs#operation/get-ngadmin-customers>) when filtering using the regionalOffice parameter.
* Improved management of purge quotas.
* Improved efficiency of [realtime_log_downsample](</docs/edge-logic/supported-directives#realtime_log_downsample>).
* Trimmed real-time log format string.
* Extended [property list API](</apidocs#operation/getPropertyList>)'s hasConfig filter to allow searching subfields of property version.
* Added support for "children-only" Report-Range header in [API account list](</apidocs#operation/get-ngadmin-apiAccounts>) API for resellers.
* Added support for "children-only" Report-Range header in [portal user list](</apidocs#operation/getContacts>) API for resellers.
* Fixed the [property list API](</apidocs#operation/getPropertyList>) to avoid returning property if version matching a hasConfig filter was already deleted.
* Fixed an error in the [log download API](</apidocs#operation/getLogfiles>).

### Portal updates
* Prevented a purge task from being created until at least one file or directory has been specified.
* Improved the text in the standby task confirmation.
* Added the property version description to the dropdown list in the property configuration page.
* Added the portal user's name into descriptions by default when creating and updating properties and other resources.
* Fixed the display of disabled text on Safari browsers so that it is more visible.

## April 9, 2021
### API updates
* Added [prefetch APIs](</apidocs#operation/post-cdn-prefetches>) allowing you to warm up the cache in advance of visitor requests for your content.
* Fixed the [customer list API’s](</apidocs#operation/get-ngadmin-customers>) response to include products used by each customer.
* Allowed resellers to use the Report-Range header in [certificate list API](</apidocs#operation/getCertificates>).

### Portal updates
* Added support for disabling HTTP2.
* Improved validation by rejecting unsuitable certificates.
* Added soft wrap to the real-time log editor to improve usability.

## March 26, 2021
### API updates

* Added support for [custom API account permissions](</apidocs#tag/API-Account-Management>), giving you more control over who can access or update your configurations.
* Fixed the validation of contactLimit and apiAccountLimit when resellers create and update customers.
* Allowed resellers to use the Report-Range header in [deploymentTasks](</apidocs#operation/queryDeploymentTaskList>), [validations](</apidocs#operation/queryPropertyValidationList>), [edge hostnames](</apidocs#operation/getEdgeHostnames>), [hostnames](</apidocs#operation/listhostnames>), and [service quotas](</apidocs#operation/get-cdn-serviceQuotas>) APIs.
* Added support for overriding the sample rate of real-time log in CS.
* Added a check for Beian status when deploying a property to staging.
* Added tlsCertificateId in [property list API](</apidocs#operation/getPropertyList>).

### Portal updates
* Added support for a template to initialize self-signed (“auto-generated”) certificates.
* Improved the deployment user interface.
* Fixed dismissal of progress bar for property deployments that fail.
* Fixed search by report name.
* Allowed you to define a baseline configuration for initializing the Edge Logic of new properties you create.
* Allowed you to clone an edge hostname to make it easier to create a new one based on an existing one's settings.
* Updated the real-time log feature to allow the sample rate to be 0.

## March 12, 2021
### API updates
* Prevented resellers from deleting a suspended customer who still has access to a product like CDN Pro.
* Fixed an issue affecting generation of a Sectigo DCV file.
* Allowed resellers to use the Report-Range header in [property list API](</apidocs#operation/getPropertyList>).

### Portal updates
* Fixed the display of property and certificate name in standby task.
* Added support for variable auto-completion lists for the Edge Logic and real-time log editors, making them easier to use.

## February 22, 2021

### API updates
* Improved error handling of administration APIs.
* Added an API to [get a specific historical hostname](</apidocs#operation/get-cdn-hostnames-historical-hostname>), so you can check which hostnames were active in the past.
* Improved validation of maxClientSendTimeOut values in [service quota API's](</apidocs#operation/post-cdn-serviceQuotas>) ‘directiveParameterLimits’.
* Added support for "oldestPropertyValidationTime" in [systemConfigs](</apidocs#operation/get-cdn-systemConfigs>).

### Portal updates
* Improved the user interface for creating and updating certificates.
* Fixed the timezone in the deployment and validation list's time range selection interface.
* Reset the time if you clear the date range fields in validation, report, and deployment list pages.
* Allowed validation of a frozen property. This may be necessary due to cache version changes that obsolete previously validated properties.

## February 11, 2021

### API updates
* Improved an error message in [portal user creation API](</apidocs#operation/createContact>).
* Improved property validation.
* Fixed error handling when using invalid or unauthorized Edge Logic directives.
* Fixed enforcement of limits used in timeout-related directives such as [client_send_timeout](</docs/edge-logic/supported-directives#client_send_timeout>).
* Fixed CDN serviceQuota's “advancedFeatures” setting.
* Added tracking of recent validation and deployment times of a property.

### Portal updates
* Updated user invitation emails to come from sender ‘CDN Pro Admin’.
* Put search and filter parameters into the URLs of the list pages (i.e., property, edge hostname, certificate, content management).
* Made the certificate creation user interface more consistent with property creation.
* Prevented certificates with the same name from being created.
* Fixed display of version when creating a new version of a certificate.
* Fixed display of certificate and property lists.
* Added a link to create a property to help new CDN Pro users.
* Improved the appearance of the validation and deployment pages while they are loading.

## January 25, 2021
### API updates
* Improved validation of Edge Logic in properties.
* Fixed error handling when invalid or unauthorized directives are used in a property.
* Improved validation of timeout-related settings in a service quota’s directiveParameterLimits.
* Updated [service quota creation](</apidocs#operation/post-cdn-serviceQuotas>) to support the advancedFeatures field.

### Portal updates
* Added search and filter parameters in URLs of property, edge hostname, certificate, and purge list pages to make them easier to bookmark.
* Improved certificate creation page.
* Prevented a timezone change from affecting impersonation by resellers.
* Prevented certificates of the same name from being created.
* Fixed display of certificate version number when creating a new certificate.
* Allowed manual input in the start and end date fields of the report page.

## January 8, 2021
### API updates
* Improved error message if you attempt to deploy a property with a hostname used by another customer.
* Improved logic to handle hostname conflicts that can occur if using wildcard domains.
* Fixed the default client zone rule for edge hostnames allowing use of all server groups instead of just ‘standard’ to maximize performance. You can create custom client zone rules to maximize performance and minimize costs.

### Portal updates
* Fixed a display issue in the Edge Logic edit field.
* Improved message that appears when a newly invited user tries to use an existing login name.
* Updated implementation of the standby task page.
* Improved the appearance of the upgrade button.
* Improved display of roles and other pages as they are being loaded.
* Added a search button in the validation and deployment pages' time range filter interfaces.
* Fixed the Edge Logic window’s autocomplete support for new directives.
* Added support for dragging to zoom in the CPU and edge hostname request reports.

## December 23, 2020
### API updates
* Improved error handling when creating or updating a portal user with an invalid login name.
* Added a limit on the number of API accounts.
* Removed deleted service quota from API’s results.
* Added a limit on the number of portal users.
* Added support for 6 new Edge Logic directives:
[origin_connect_timeout](</docs/edge-logic/supported-directives#origin_connect_timeout>), [origin_read_timeout](</docs/edge-logic/supported-directives#origin_read_timeout>), and [origin_send_timeout](</docs/edge-logic/supported-directives#origin_send_timeout>) for you to manage communications with your origin servers and  [client_header_timeout](</docs/edge-logic/supported-directives#client_header_timeout>), [client_body_timeout](</docs/edge-logic/supported-directives#client_body_timeout>), and [client_send_timeout](</docs/edge-logic/supported-directives#client_send_timeout>) for you to manage communications with the clients.
* Limited the [realtime_log_downsample](</docs/edge-logic/supported-directives#realtime_log_downsample>) directive to the server block of Edge Logic.
* We now require the isp field to be specified in a client zone rule when [creating an edge hostname](</apidocs#operation/createEdgeHostname>).


### Portal updates
* Added the edge hostname request report.
* Added the CPU time report.
* Enhanced the date picker in reports page.
* Added support for [High Speed Data Transmission (HDT)](<https://www.cdnetworks.com/high-speed-data-transmission/>) in the product selection menu, allowing you to switch to the HDT portal.
* Fixed password expiration email’s appearance.
* Implemented notification message when a deployment is added to the standby task.
* Fixed text of standby task confirmation.
* Fixed validation and deployment popup windows’ button labels.
* Improved date range picker in validation and deployment task list pages.
* Fixed display of customers of resellers. 

## December 20, 2020
### API updates
* Removed apiAccountId from responses of API calls directly made by you.
* Limited an edge hostname’s client zone rule to a maximum of 10 ISPs.
* Added impersonatingParentCustomerId to identify the reseller (or parent) customer performing an action like purge, validation, or deployment on behalf of their customer.
* Removed redundant target field returned in the purge summary response.
* Improved [querying for API calls](</apidocs#operation/get-ngadmin-apicalls>) when using a path parameter with an asterisk character.
* Returned customerId field in [API calls](</apidocs#operation/get-ngadmin-apicalls-id>) and [portal users](</apidocs#operation/getContacts>) APIs.
* Returned an error if the user tries to deploy a certificate with an invalid certificate version.
* Added support for advancedFeauresList and directiveParameterLimits in CDN Pro [service quota object](</apidocs#operation/post-cdn-serviceQuotas>). These manage access to advanced CDN Pro features and specification of limits on some Edge Logic directives.

### Portal updates
* Improved error handling in the property creation and edit pages when an invalid edge hostname is specified.
* Improved the appearance of the verification code email sent to users who forget their passwords.
* Limited selection of ISPs in creation of client zone rule for an edge hostname.
* Improved text in progress popups.
* Cleared the standby task list after the task has been run.
* Fixed standby task field names.
* Fixed overlapping standby task and deploy buttons.

## December 7, 2020

### API updates
* Added support for non-standard HTTP and HTTPS ports by specifying them in a extraServicePorts field of a property configuration. Also return extraServicePorts in the [system configuration API](</apidocs#operation/get-cdn-systemConfigs>). Please contact us if you require a port that isn't yet allowed.
* Prevented deletion of a property whose deployment is still in progress.
* Supported querying validation history of a deleted property.
* Enhanced [property list API](</apidocs#operation/getPropertyList>) to support searching for a value that is not present in the configuration.
* Allowed resellers to use the Report-Range header in [API account list](</apidocs#operation/get-ngadmin-apiAccounts>).
* Updated [traffic volume summary report](</apidocs#operation/getVolSummary>) to support the protocol parameter.
* Modified property validation to allow the 'if' parameter in Edge Logic.

### Portal updates
* Modified order of deployment actions to ensure success of a standby task deploying a property using a certificate.
* Added Enable OCSP Stapling option into the property configuration’s TLS Settings section. This can improve security and performance for large sites serving many users.
* Improved display of confirmation and status popups.
* Implemented ‘standby task’ which is a way to queue up multiple property and certificate deployments and undeployments to be executed in a single task.

## November 18, 2020
### API updates
* Added disableHttp2 property configuration option to allow you to disable support for HTTP/2 and use HTTP 1.1 only.
* Added cacheKeyUri property configuration option to control when the URL is incorporated into the cache key.
* Updated [edge requests report](</apidocs#operation/getEdgeRequests>) to support the Accept HTTP header with quality values.
* Improved validation of Edge Logic using [eval_func](</docs/edge-logic/supported-directives#eval_func>).
* Improved [hostnames API](</apidocs#operation/listhostnames>).
* Added the [origin_selection_algorithm directive](</docs/edge-logic/supported-directives#origin_selection_algorithm>) so you can control the selection of an IP address if an origin resolves to multiple IP addresses.

### Portal updates
* Provided date range selectors in the portal for validation and deployment tasks.
* Improved display of lists of items.
* Supported grouping by customer ID for summary reports.
* Improving searching for deployment tasks.

## November 6, 2020
### API updates
* Updated [get property validation task API](</apidocs#operation/queryValidationTask>) to return cache version as well.
* Allowed a wildcard hostname to overlap with another hostname owned by the same customer.

### Portal updates
* Allow a client zone to support multiple ISPs. (These are specified when creating an edge hostname.)
* Added a banner at the top of the dashboard pointing to the ‘Quick Start’ help.
* Fixed pagination issues.
* Improved display of three Edge Logic directives: [proxy_cache_lock](</docs/edge-logic/supported-directives#proxy_cache_lock>), [proxy_cache_lock_timeout](</docs/edge-logic/supported-directives#proxy_cache_lock_timeout>), and [proxy_cache_lock_age](</docs/edge-logic/supported-directives#proxy_cache_lock_age>).

## October 22, 2020
### API updates
* The [traffic volume summary report](</apidocs#operation/getVolSummary>) now supports grouping of results by customerIds.
* Improved error message when the user uses an unauthorized or unsupported directive.
* If a reseller performs a validation, deployment, or purge on behalf of their customer, we track the caller’s API account.
* Added 3 new Edge Logic directives: [proxy_cache_lock](</docs/edge-logic/supported-directives#proxy_cache_lock>) to better control traffic to the origin servers, [proxy_cache_lock_age](</docs/edge-logic/supported-directives#proxy_cache_lock_age>) to specify a time after which another request may be made, and [proxy_cache_lock_timeout](</docs/edge-logic/supported-directives#proxy_cache_lock_timeout>) to set a timeout for proxy_cache_lock.
* Prevented an acceleration hostname from matching the origin server to avoid a loop.
* Added a property configuration field, disableCertAutomation, which should be set to true if you manage certificate renewals yourself instead of using our certificate auto-renewal via Let’s Encrypt.
* Improved real-time log support.
* Allowed headers to be passed to the notification server in the real-time log feature.

### Portal updates
* Improved certificate selection in the property creation and update pages.
* Improved pagination in pages with lists of items.
* Added “Disable Certificate Renew Automation” setting to advanced settings of properties.
* Prevented the user from creating a property whose hostname is the same that of an origin server.

## October 7, 2020
### API updates
* Added [CPU time report](</apidocs#operation/post-cdn-report-cpuTime>) to display CPU time used to handle requests for your content.
* Allowed resellers to use the ‘Report-Range: children-only’ header in [API calls](</apidocs#operation/get-ngadmin-apicalls>) to get a summary of API calls made in their customers' accounts.
* Enabled the [origin_set_header directive](</docs/edge-logic/supported-directives#origin_set_header>) to support the "Host" header.
* Allowed query of [fast route request](</apidocs#operation/post-cdn-report-fastOriginReq>) and [fast route traffic](</apidocs#operation/post-cdn-report-fastOriginVol>) reports for domain names with wildcard "*".
* Improved error checking of [portal user list](</apidocs#operation/post-cdn-report-fastOriginVol>) and [API account list](</apidocs#operation/get-ngadmin-apiAccounts>).

### Portal updates
* Improved page navigation.
* Improved assignment of multiple portal users to a role.
* Added fast route request and volume reports.

## September 24, 2020
### API updates
* Added support for startdate and enddate parameters for querying [validation](</apidocs#operation/queryPropertyValidationList>) and [deployment task](</apidocs#operation/queryDeploymentTaskList>) lists.
* Allowed deletion of a property version.
* Updated [service quota API](</apidocs#operation/patch-cdn-serviceQuotas-customer-customerId>).
* Added fast route traffic to the [traffic volume summary report](</apidocs#operation/getVolSummary>) to show traffic accelerated by the [High-Speed Data Transmission product](<https://www.cdnetworks.com/high-speed-data-transmission/>).
* Supported CSR validation by more certificate authorities, not just Let’s Encrypt.
* Improved error handling of parameters when [getting purge requests](</apidocs#operation/getPurgeRequestList>).

### Portal updates
* Improved display of pages listing items.
* Updated edge hostname creation button label to be consistent with others.
* Updated colors on edit role page.
* Made redirection of HTTP to HTTPS the default when setting up a property.
* Displayed requests per second in 5 minute interval charts.
* Supported click to copy of hostnames when viewing a property.


## September 10, 2020
### API updates
* Supported specification of weights when defining origin servers of a property.
* Supported X-Forwarded-Scheme header when [purging a file](</apidocs#operation/createPurge>).  This ensures purges work if the property’s Edge Logic does a redirection from HTTP to HTTPS.

### Portal updates
* For usability, supported click to copy hostnames when editing a property.
* Supported specification of weights when defining origin servers of a property.
* Improved usefulness of pie charts by sorting results, showing the top 30 slices, and consolidating the remaining values into another slice.
* Ensured password reset page is accessible in China.

## August 28, 2020
### API updates
* Added support for filtering the [ISPs list](</apidocs#operation/get-cdn-edgeHostnames-isps>) by region.
* Added support for filtering the [region list](</apidocs#operation/get-cdn-edgeHostnames-clientRegions>) by ISP.
* Added support for multiple ISPs in a client zone rule.
* Added support for origin_host in the real-time log feature.
* Allowed all customers to use these directives: [sorted_querystring_filter_parameter](</docs/edge-logic/supported-directives#sorted_querystring_filter_parameter>) to remove some query parameters; [proxy_ignore_cache_control](</docs/edge-logic/supported-directives#proxy_ignore_cache_control>) to disable processing of certain cache-control directives in the response from the origin; [slice](</docs/edge-logic/supported-directives#slice>) to set the size of the slices when fetching large files from the origin; and [origin_header_modify](</docs/edge-logic/supported-directives#origin_header_modify>) to add, delete, or overwrite the response header fields from the origin before any other processing.
* Added [slice_ignore_etag directive](</docs/edge-logic/supported-directives#slice_ignore_etag>) to disable ETag consistency check of sliced files.
* Made it easier for a reseller to purge a directory or file on behalf of their customer.
* Added [fast route origin request report API](</apidocs#operation/post-cdn-report-fastOriginReq>) to show the origin requests accelerated by the High-Speed Data Transmission product.
* Added [fast route origin traffic report API](</apidocs#operation/post-cdn-report-fastOriginVol>) to show the origin traffic accelerated by the High-Speed Data Transmission product.
* Updated report APIs to support UTC+13 and UTC+14 time zones.
* Allowed purging of URLs with upper and lower case characters.
* Fixed [historical hostnames API](</apidocs#operation/getHistoricalHostnames>) to omit properties that have only deployed to staging.
* Supported keepalive_timeout in the origin section of a property definition.

### Portal updates
* Improved display of pages.
* Improved representation of certificate ownership.
* Emailed trial users about upcoming expiration.
* Supported Keep-Alive timeout setting in the advanced property origin section.

## August 12, 2020

### API updates
* Added several advanced Edge Logic directives: [origin_fast_route](</docs/edge-logic/supported-directives#origin_fast_route>) allowing you to use our High-Speed Data Transmission (HDT)-powered solution to provide a more reliable connection with reduced latency; [origin_follow_redirect](</docs/edge-logic/supported-directives#origin_follow_redirect>) if you wish us to follow 30X redirects from the origin; and [custom_log_field](</docs/edge-logic/supported-directives#custom_log_field>) allowing you to add fields to the access logs.
* Fixed error handling when purging files with multiple copies due to the Vary header.
* Added support for access control rules to properties to let you restrict access by IP or regions.
* Improved validation of EC certificates.
* Added support for kilobytes in the [limit_rate directive](</docs/edge-logic/supported-directives#limit_rate>).
* Allowed the redirectHttpToHttps property configuration field to support return codes 302, 307, and 308.
* enableIPv6 is supported only by the deliver action in client zone rules.
* Made 512 kilobytes the minimum value of the [slice directive](</docs/edge-logic/supported-directives#slice>).

### Portal updates
* Added "view deployment history" for properties and certificates.
* Allowed a custom role to deploy a certificate.
* Fixed display issues.
* Made enableIPv6 an option for the deliver action only in client zone rules.
* Fixed deployment related issues.

## July 30, 2020
### API updates
* Added enableOcspStapling field to the property configuration to support OCSP stapling.
* Handled expired trial customers.

### Portal updates
* Improved display of lists in the portal.
* Displayed search and filter parameters in the URL of Task list pages.
* Allowed IPv6 when creating a client zone rule for an edge hostname.
* Added Validation and Deployment submenu items under the Tasks menu.

## July 16, 2020
### API updates
* Updated resellers' creation of customer accounts.
* Used qtlcdn.com domain for new edge hostnames.

### Portal updates
* Improved interface for editing property and certificates.
* Fixed display issue in the client zone rule creation page.
* Added support for Escape key to cancel operations.
* Implemented page for trial users to get information about upgrading.
* Changed Create Purge's default to invalidate instead of delete.
* Improved usability of the Edge Logic editor including more keyboard shortcuts and auto-complete.

## July 1, 2020
### API updates
* Updated support for China PoPs.
* Allowed strings in Edge Logic to span multiple lines.
* Allowed hyphens and periods in an origin name.
* Added the [system configuration API](</apidocs#operation/get-cdn-systemConfigs>) to return system settings.

### Portal updates
* Updated the portal links to help pages.
* Allowed the escape key to be used to cancel operations and close windows.
* Added support for trial accounts.
* Improved the Edge Logic editor to highlight some syntax errors and support auto-completion of directive and variable names.


## June 12, 2020
### API updates
* Updated property validation to show the line number if an error is found in the Edge Logic.
* Added optional tlsSessionTimeout field to the property configuration to control the TLS session ticket timeout.
* Updated [edge hostname request report](</apidocs#operation/post-cdn-report-edgeHostnameReq>) and [edge hostname request summary](</apidocs#operation/post-cdn-report-edgeHostnameReqSummary>) report APIs.

### Portal Updates
* Fixed purge request progress dialog.
* Improved Edge Logic editor to highlight directives and make it more useful.


## June 5, 2020
### API updates
* Improved purge performance.
* Enabled support for the Edge Logic directive, [proxy_cache_methods](</docs/edge-logic/supported-directives#proxy_cache_methods>) so you can specify the HTTP methods whose responses are cached.


## May 22, 2020
### API updates
* Updated limit on purge requests to a maximum of 1000 files and 5 directories at a time.
* Improved [property list API's](</apidocs#operation/getPropertyList>) filtering.
* Introduced [origin_limit_rate directive](</docs/edge-logic/supported-directives#origin_limit_rate>) allowing you to limit the speed at which the response is read from the origin server.
* Introduced [origin_set_header directive](</docs/edge-logic/supported-directives#origin_set_header>) allowing you to redefine or append fields to the request header passed to the origin server.
* Introduced advanced directive [origin_header_modify](</docs/edge-logic/supported-directives#origin_header_modify>) allowing you to add, delete, or overwrite the response header fields from the origin before any other processing.
* Introduced [origin_connect_timeout](</docs/edge-logic/supported-directives#origin_connect_timeout>) allowing you to define a timeout for establishing a connection with the origin server.
* Introduced [origin_read_timeout](</docs/edge-logic/supported-directives#origin_read_timeout>) allowing you to define a timeout for reading a response from the origin server.
* Introduced [origin_send_timeout](</docs/edge-logic/supported-directives#origin_send_timeout>) allowing you to set a timeout for transmitting a request to the origin server. 

### Portal updates
* Updated access control.
* Renamed menu items to better reflect their functionalities.

## May 8, 2020

### API updates
* Fixed the [report APIs’](</apidocs#tag/Reports>) support for wildcards in the hostname filter.
* Implemented a service to monitor Beian status of domains served by PoPs in China. 
* Allowed disabling of  support for IPv6 within a client zone rule.
* Ensured that non-printable characters can only appear in Edge Logic if quoted.
* Improved [property list API](</apidocs#operation/getPropertyList>)'s filtering support.

### Portal updates
* Changed real-time logging format field to make it easier to use.

## April 23, 2020

### API updates
* Allowed notifications to be sent to extra recipients.
* Implemented [CDN product management APIs](</apidocs#tag/CDN-Product-Management>).
* Updated support for trials.
* Fixed validation of Edge Logic to allow non-Latin characters.

### Portal updates
* Added ‘Load Balancer Hash Key’ field to Advanced Settings of properties.
* Improved error handling for client zone rules.
* Fixed list display issue for screens of different sizes.
* Improved forgotten password functionality.

## April 10, 2020
### API updates
* Added support for limiting the number of portal users.
* Made regionalOffice field required.
* Support filtering search of customers based on the regionalOffice field.
* Support [updating an edge hostname using PATCH](</apidocs#operation/patch-cdn-edge-hostname>).
* Enhanced security to provide additional notifications when settings have been changed.
* Supported trial customers.

## March 25, 2020

### API updates
* Increased security of portal users.
* Increased security by notifying of account changes.
* Allowed search of [client regions](</apidocs#operation/get-cdn-edgeHostnames-clientRegions>) by keyword.
* Fixed use of redirectHttpToHttps with multiple hostnames.

### Portal updates
* Fixed issues switching between our [Edge Computing Platform (ECP)](<https://www.cdnetworks.com/edge-computing/>) and CDN Pro products.
* Allowed selection of ISPs when defining client region rules for edge hostnames.
* Added support for ‘group by’ to traffic summary report.

## March 10, 2020
### API updates
* Ensured email address is required when [creating an API account](</apidocs#operation/post-ngadmin-apiAccounts>).
* Enhanced [ISP list API](</apidocs#operation/get-cdn-edgeHostnames-isps>) to support search by keyword and sorting of results.
* Improved certificate expiration notice.

### Portal updates
* Improved security.
* Added fields to the edge hostname list.
* Improved display of lists.
* Added “Has ICP Beian” option for edge hostnames.

## February 26, 2020
### API updates
* Allowed filtering by Beian status in [edge hostnames list API](</apidocs#operation/getEdgeHostnames>).
* Enhanced [API call history](</apidocs#operation/get-ngadmin-apicalls>) for resellers. We also updated it to return HTTP response statuses of API calls.
* Enabled [portal user list API](</apidocs#operation/getContacts>) to return results based on status of the user accounts.
* Allowed users of [customer list API](</apidocs#operation/get-ngadmin-customers>) to search by ‘regional offices’.

### Portal updates
* Improved email about expiring password.
* Improved validation of properties.

## February 13, 2020
### API updates
* Fixed [customer update API](</apidocs#operation/patch-ngadmin-customers-id>) to properly handle null fields.
* Improved security of [Get API Account](</apidocs#operation/get-ngadmin-apiAccounts-id>). 
* Enhanced [get edge hostname API](</apidocs#operation/getEdgeHostname>)'s response.

### Portal updates
* Fixed sorting of results on the pages which contain lists of items.
* Enhanced certificate list page.
* Improved display of lists of items.
* Fixed 2FA support.
* Fixed display issue in the password reset page.

## January 29, 2020
### API updates
* Improved support for auto-renewal of SSL certificates.
* Added [edge hostname statistics report](</apidocs#operation/post-cdn-report-edgeHostnameReq>).
* Added [edge hostname summary report API](</apidocs#operation/post-cdn-report-edgeHostnameReqSummary>).
* Supported email notification about TLS certificates that are expiring soon.

### Portal updates
* Fixed issue editing certificates.
* Improved error message for property validation.
* Fixed hint text in search boxes.
* Improved error text for password reset.

## January 10, 2020
### API updates
* Allowed resellers to use the Report-Range header in the [API calls function](</apidocs#operation/get-ngadmin-apicalls>) to further customize their search of API call history.

### Portal updates
* Fixed sorting on Roles page.
* Improved search box behavior.
* Improved display of password reset page.

## January 3, 2020
### API updates
* Enhanced [customer list API](</apidocs#operation/get-ngadmin-customers>)'s filtering.
* Limited API request body size.
* Updated [get service quota API](</apidocs#operation/get-cdn-serviceQuotas-customer-customerId>) to support 'me' as a parameter value allowing you to see your own settings.
* Updated summary report APIs' responses to include a special group __all__ which consists of total traffic or requests of all groups.

### Portal updates
* Added "Validate" link below "Real Time Logging URL".
* Improved forgotten password functionality.

## December 11, 2019
### API updates
* Supported getting expiration times of certificates deployed to production and staging.
* Changed certificate number from decimal to hexadecimal value for consistency with browsers and other tools.
* Allowed resellers to filter results using the Report-Range header when retrieving [API accounts](</apidocs#operation/get-ngadmin-apiAccounts>) and [portal users](</apidocs#operation/getContacts>).
* Supported auto-renewal of certificates.
* Sorted validation task list by submission time by default.
* Ensured that read-only API accounts can make calls to report APIs.

### Portal updates
* Fixed missing information on the View Certificate page.
* Improved validation of real-time logging settings.
* Changed the label of certificate hash to “Fingerprint”.
* Fixed the display of cache hit ratio when origin traffic is larger than edge traffic.

## December 2, 2019
### API updates
* Fixed support for protocol downgrade to apply only if the property has a certificate.
* Added support for ISPs in an edge hostname's client zone rules.
* Supported [search of purge tasks](</apidocs#operation/getPurgeRequestList>) by ID.
* Supported hasConfig query parameter when getting a [list of properties](</apidocs#operation/getPropertyList>).
* Added [system configuration API](</apidocs#operation/get-cdn-systemConfigs>).
* Allowed resellers to use the Report-Range header to filter the [list of properties](</apidocs#operation/getPropertyList>).
* Added [portal user management APIs](</apidocs#tag/Portal-User-Management>) to allow callers to create, update, query, and delete users.

### Portal updates
* Auto-populated form fields when creating a new certificate version.
* Fixed search function on Content Management page.
* Displayed the purge quota on the purge creation page.
* Updated the display of the property list page.
* Updated portal documentation to describe real-time logging feature and AWS authentication support.

## November 14, 2019
### API updates
* Added [staging servers API](</apidocs#operation/getStagingServers>) to get the IP addresses of staging servers you can use to test your properties before deploying to production.
* Fixed impersonation support of [API calls](</apidocs#operation/get-ngadmin-apicalls>).
* Ensure certificates must be <=36kB to avoid problems with IE browser.
* Enhanced [customer list API](</apidocs#operation/post-ngadmin-customers>) to support new filters.
* Updated [customer management API](</apidocs#tag/Customer-Management>) to support portalSettings field which includes enabling two factor authentication, password expiration, session logout, and IP whitelist.
* Added support for separate purge quotas for staging and production.

### Portal updates
* Improved security of notifications.
* Improved signup invitation.
* Added support for authentication of [Amazon S3 servers used as the origin](</docs/recipes/aws-bucket>).
* Added support for real-time log.
* Improved appearance of the property comparison page.
* Allowed customer administrators to change the session logout time.

## November 1, 2019
### API updates
* Ensured customers of resellers can have any of the products available to the reseller.
* Added apiName to the edge hostname deployment history
* Added apiName to the [API calls](</apidocs#operation/get-ngadmin-apicalls-id>) response.
Added [proxy_ignore_cache_control](</docs/edge-logic/supported-directives#proxy_ignore_cache_control>) directive allowing you to disable processing of certain cache control directives in the response from the origin.

### Portal updates
* Updated property version comparison user interface.
* Supported the Korean and Japanese languages.
* Updated the Edit User page.

## October 21, 2019
### API updates
* Improved report API calls.
* Supported sorting of certificates.
* Allowed resellers to use the Report-Range header in [certificate list API](</apidocs#operation/getCertificates>).
* Improved [status code details](</apidocs#operation/getEdgeStatusCodeDetails>) and [origin status code details](</apidocs#operation/getOriginStatusCodeDetails>) reports.
* Allowed all customers to use the [proxy_buffering](</docs/edge-logic/supported-directives#proxy_buffering>) directive.

### Portal updates
* Improved portal security.
* Enabled administrators to invite new users to join by email.
* Fixed search functionality.
* Fixed user suspension and reactivation.

## October 7, 2019
### API updates
* Added support for sorting properties, tasks, edge hostnames, accounts, and customers returned by APIs.
* Improved randomness of property IDs.
* Improved stripping of comments in Edge Logic.
* Allowed the cacheKeyHostname field to support NGINX variables.
* Moved API account limits to the customers API.


### Portal updates

* Supported passing headers in file and directory purges.
* Saved preferred language for each portal user.
* Added “operator” role you can assign to users who are permitted to administer CDN functions but not manage users and roles.

## September 23, 2019
### API updates
* Supported origin server authentication.
* Supported searching for customer by ID.
* Added support for certificate expiration and auto-renewal.
* Made self-signed certificate expire in 10 days.

### Portal updates
* Updated role list page.
* Supported search in the Roles tab.
* Ensured customers have at least one administrator account.

## September 16, 2019
### API updates
* Added support for real-time logs (also known as download notification).
* Improved error handling.
* Added API support for [enabling two factor authentication (2FA)](</apidocs#operation/patch-ngadmin-customers-id>) and [resetting a user](</apidocs#operation/patch-ngadmin-contacts-id>) which is useful if they change phones.

### Portal updates

* Added identity and access management page.
* Added support for role management.

## August 22, 2019
### API updates
* Fixed notification API.
* Relaxed the requirements on content handler in 'if' blocks.
* Made the origin hostHeader support NGINX variables.

### Portal updates
* Updated product logos.
* Supported pagination in list of customers.
* Updated support for editing profile.

## August 13, 2019
### API updates
* Added support for email notifications of events.
* Fixed support for protocol downgrade option.
* Updated [get certificate version API](</apidocs#operation/queryCertificateVersion>).

### Portal updates
* Supported additional languages.
* Supported comparison of different versions of a property.
* Made specifying an origin for a property optional.


## July 29, 2019
### API updates
* Added support for loadBalancerHashKey.
* Fixed protocol downgrade support.
* Returned error code "VariedFile" when purging a file with multiple copies due to the Vary header.
* Updated validation for deleting customers.

### Portal updates
* Enabled gzip in the portal server to compress response of large size.
* Updated access denied page.
* Improved security.
* Updated protocol downgrade support.

## July 17, 2019
### API updates
* Added APIs to support creating and retrieving notifications.
* Supported searches in the portal user list page.
* Supported certificate sharing in the portal.
* Updated authorization to check for assigned product.
* Improved error handling of purge requests.

### Portal updates
* Made “Download Options” on reports functional.
* Implemented contact management UI.
* Added role list page.
* Added validation when using a second TLS certificate.

## July 2, 2019
### API updates
* Added products, emailAddress, and responsiblePerson fields to the customer resource.
* Validated [slice](</docs/edge-logic/supported-directives#slice>), [limit_rate](</docs/edge-logic/supported-directives#limit_rate>), and [limit_rate_after](</docs/edge-logic/supported-directives#limit_rate_after>) Edge Logic directives.
* Added [CDN Product Management APIs](</apidocs#tag/CDN-Product-Management>).

### Portal updates
* Updated client region values.
* Implemented access denial page.
* Fixed display of link to the [Edge Computing Platform (ECP) product](<https://www.cdnetworks.com/edge-computing/>) portal.

## June 17, 2019
### API updates
* Fixed issues related to client region support.
* Added support for redirectHttpToHttps setting.
* Added products, responsiblePerson, and emailAddress fields to API accounts.

### Portal updates
* Updated role and permission management.

## June 3, 2019
### API updates
* Supported pagination and searches in [account list API](</apidocs#operation/get-ngadmin-apiAccounts>).
* Updated support for testing deployments to staging.
* Supported gzip compression in API responses.
* Supported longer origin timeouts.
* Allowed bandwidth and volume reports to be filtered by server groups.
* Ensured that properties can be validated if a shared certificate it is using is no longer shared.
* Added two directives [proxy_cache_vary](/cdn/docs/edge-logic/supported-directives#proxy_cache_vary>), allowing you to control how the 'Vary' response header from the origin is handled, and [eval_func](</docs/edge-logic/supported-directives#eval_func>), allowing you to run some common algorithms in your Edge Logic.

### Portal updates
* Added a link to the Edge Computing Platform portal.
* Added two directives [proxy_cache_min_age](</docs/edge-logic/supported-directives#proxy_cache_min_age>), allowing you to specify the minimum cache time, and [gzip_types](</docs/edge-logic/supported-directives#gzip_types>), allowing you to enable gzip compression on additional MIME types.
* Updated password reset functionality.


## May 16, 2019
### API updates
* Added support for [searching purge history by hostname](</apidocs#operation/getPurgeRequestList>).
* Updated [supported Edge Logic directives](</docs/edge-logic/supported-directives>).
* Updated certificate APIs.
* Fixed purge issues.
* Changed edge hostname TTL to 60 seconds.

### Portal updates
* Allowed resellers to disable customers’ use of a shared certificate.
* Enhanced usability.

## April 16, 2019

### API updates
* Enhanced [get customer API](/cdn/apidocs#operation/get-ngadmin-customers-ID>).
* Fixed directory purge.
* Supported retrieving the identities of properties and domains using a certificate in staging and production.
* Allowed resellers to [search for multiple customers by their IDs](</apidocs#operation/get-ngadmin-customers>).

### Portal updates
* Required users to confirm changes before deploying a property.
* Improved the create property page.
* Supported several additional NGINX directives.
* Improved login page.

## March 31, 2019
### API updates
* Improved validation of the Edge Logic.
* Added support for getting the customer ID that owns various resources.
* Updated the list of [supported NGINX directives](</docs/edge-logic/supported-directives>).
* Fixed purge of URLs with special characters.
* Separated file and directory purge quotas.
* Improved cache key hostname.

### Portal updates
* Improved the certificate sharing UI.
* Improved the layout of the edge hostname client zone rules.
* Improved purge and certificate UI.

## March 18, 2019
### API updates
* Split purge quota into separate file and directory quotas.
* Added support for returning the customer ID that owns various resources.
* Improved [status code details](</apidocs#operation/getEdgeStatusCodeDetails>) report.
* Updated cache key hostname processing.

### Portal updates
* Improved property, report, edge hostname, and certificate pages.

## March 4, 2019
### API updates
* Improved deployment.
* Updated [certificate update API](</apidocs#operation/updateCertificate>).
* Updated [purge API](</apidocs#operation/queryPurgeStatus>) to expose success rate and improve validation of URLs.


## February 19, 2019
### API updates
* Improved validation when [creating a customer account](</apidocs#operation/post-ngadmin-customers>).
* Fixed issues with the property converter.
* Improved the [get property version API](</apidocs#operation/getPropertyVersion>).
* Encoded URI and query string in purge requests.
* Improved purge APIs further.

### Portal updates
* Improved edge hostname creation and edit user interface.
* Improved origin auto-detect UI.
* Allowed the user to delete notifications.
* Improved the edit property page UI.
* Improved the edit certificate UI.
* Improved the add origin UI.

## January 31, 2019
### API updates
* Saved NGINX configurations during the validation step to help with future deployments.
* Supported purge with file headers.
* Improved purge APIs.
* Enhanced report APIs.

### Portal updates
* Supported multiple hostnames.
* Improved report pages.
* Supported notification of events in the portal.

## January 16, 2019
### API updates
* Fixed issue related to certificates.

### Portal updates
* Supported user added headers in purge requests.
* Supported file and folder purge requests.
* Improved report page.

## January 8, 2019
### API updates
* Supported folder [purge](<apidocs#operation/createPurge>).
* Fixed [historical hostname API](</apidocs#operation/get-cdn-hostnames-historical-hostname>).
* Improved security.
* Improved client zone rules of edge hostnames.

## December 20, 2018
### API updates.
* Allowed querying for [purge statistics](</apidocs#operation/queryPurgeSummary>).
* Updated [historical hostname API](</apidocs#operation/getHistoricalHostnames>).
* Improved encryption of certificate keys.
* Added APIs for [logs](</apidocs#operation/getLogfiles>) and [intermediate traffic](</apidocs#operation/getIntermediateTraffic>).
* Added [Get property version list API](</apidocs#operation/getPropertyVersions>).
* Improved error handling.

## December 3, 2018
### API updates
* Updated APIs for auditing.
* Improved identification of failures in property deployment.
* Added [historical hostname list API](</apidocs#operation/getHistoricalHostnames>).
* Supported filtering in [report APIs](</apidocs#tag/Reports>).

## November 19, 2018
### API updates
* Added allowedCacheDirectives to control access to resource-intensive NGINX directives.
* Updated [edge hostname API](</apidocs#operation/createEdgeHostname>).

## November 6, 2018
### API updates
* Improved error messages.
* Improved CSR downloads.
* Improved [edge hostname APIs](</apidocs#tag/Edge-Hostname-Management>).

## October 22, 2018
### API updates
* Updated output of [Get API Account](</apidocs#operation/get-ngadmin-apiAccounts-id>).
* Improved validation of edge hostnames' clientZones.

## September 21, 2018
### API updates
* Updated property validation and conversion.
* Enhanced [customer list API](</apidocs#operation/get-ngadmin-customers>).

## September 13, 2018
### API updates
* Improved validation.
* Updated annotation and [edge hostname creation](</apidocs#operation/createEdgeHostname>). 


## August 30, 2018
### API updates
* Updated report annotation.
* Improved [validation of properties](</apidocs#operation/createValidationTask>).

## August 13, 2018
### API updates
* Updated property validation.
* Updated report annotations.

## July 13, 2018
* Improved property and certificate APIs.

## July 3, 2018
### API updates
* Improved error handling.
* Improved [property creation API](/apidocs#operation/createPropertyVersion>).

## June 18, 2018
### API updates
* Fixed [get hostname API](</apidocs#operation/queryOneHostname>).
* Supported [searching for property validation task](</apidocs#operation/queryPropertyValidationList>) by keyword.

### API updates
* Improved certificate and account management.

## May 18, 2018
### API updates
* Improved deployment task APIs to support our portal.

## May 10, 2018
### API updates
* Improved [property update API](</apidocs#operation/getPropertyVersion>).

## February 23, 2018
### API updates
* Improved error handling when [creating API accounts](</apidocs#operation/deleteApiAccount>).
* Required encryption of private keys
* Improved getting property details.
* Fixed handling of suspended customers.
* Improved report APIs.


## February 9, 2018
### API updates
* Improved API account updates.
* Updated [customer list API](</apidocs#operation/post-ngadmin-customers>).

## January 26, 2018
### API updates
* Fixed issues in [API account list](</apidocs#operation/post-ngadmin-apiAccounts>) and [update API account](</apidocs#operation/patch-ngadmin-apiAccounts-id>).
* Improved error handling of property validations.
