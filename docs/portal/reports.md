# Reports

CDN360 provides reporting capabilities that allow you to analyze the traffic to your properties, identify trends over time, and pinpoint times when visitors are most likely to land on your site.

Reports are generated from the Reports page. To display this page, click **Reports** in the left pane.

The following figure shows the key elements on the page.

![null](</docs/resources/images/Report Page.png>)

## Supported Report Types

The following report types are supported:

| **Report**            | **Description**                                                   |
| --------------------- | ----------------------------------------------------------------- |
| Traffic Volume        | Shows edge versus origin traffic.                                 |
| Traffic Bandwidth     | Shows edge versus origin traffic bandwidth. Lines represent edge traffic from CDN360 servers, traffic from your origin servers, and cache hit rate. The vertical (Y) axis shows the bandwidth and hit ratio, while the horizontal (X) axis shows time. The cache hit rate is computed as (edge traffic - origin traffic) / edge traffic.     |
| Requests              | Shows requests made to the files of your property. Lines show the requests to CDN360 edge servers, requests to your origin servers, and cache hit rate. The cache hit rate is computed as (edge requests - origin requests)/edge requests.              |
| Status Code Details   | Shows the percentage of HTTP status codes returned. For example, code 200 represents a successful request.                                                   |

## Generating Reports

1. In the left pane, click **Reports**. 
2. Complete the fields in the Reports page:

![null](</docs/resources/images/Report Page.png>)

| **Fields**      | **Description**                                       |
| --------------- | ----------------------------------------------------- |
| Report Type     | Select the type of report you want to generate.       | 
| Hostnames       | Select one or more hostnames that you defined when you created your property.                                                                    |
| Date Range      | Select the start and end dates and the time for the report.                                                                   |
| Report Interval | Select the granularity of the returned data. Choices are: <li><strong>5 minutes</strong>. *(default)*<li><strong>1 Hour</strong>.<br><li><strong>1 Day</strong>.<li><strong>1 Month.</li>
| Protocol        | Select the protocol-based data traffic that will be covered by the report. Choices are: <li><strong>All</strong> = use  HTTP and HTTPS. *(default)*<li><strong>HTTP</strong> = use HTTP only.<br><li><strong>HTTPS</strong> = use HTTPS only.         | 
| Report Range        | If you are a reseller with child accounts, select the account that this report will cover. Choices are. Choices are: <li><strong>This Account Only</strong>.</li><li><strong>Children Accounts Only</strong>.</li><li><strong>This Account + Children</strong> *(default)*

**Note:** All volume and bandwidth report data pertains to the HTTP payload only. It does not include the overhead from TCP, IP, and MAC headers. CDNetworks adds 4.56% (66 bytes) of overhead to each 1448-byte payload to generate the "billing volume" on the invoice.

3. Click the **Generate Report** button to generate the report.
4. After the report is generated, you can:

<ul><li>Mouse over data points in the report to view detailed information.<br>
<li>Drag over the chart to magnify areas, and then use the <strong>Reset zoom</strong> button to return to the default zoom level.<br>
<li>Use the <strong>Download Options</strong> button at the top-right of the report to download raw data in comma-separated-value (CSV) format.
