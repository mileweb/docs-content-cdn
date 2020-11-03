# Reports

CDN360 provides reporting capabilities that allow you to analyze the traffic to your properties, identify trends over time, and pinpoint times when visitors are most likely to land on your site.

Reports are generated from the Reports page. To display this page, click **Reports** in the left pane.

The following figure shows the key elements on the page, and the table following the figure describes them.

<p align=center><img src="/docs/resources/images/reports-w-numbers.png" alt="report page" width="900"></p>

| **Element Number**|**Description**|
|-|-|
|1|Specify the report type, date range, report interval, hostname, protocol, and report range.|
|2|The **Generate Report** button allows you to generate the report defined by the report parameters.|

## Supported Report Types

The following report types are supported:

| **Report**            | **Description**                                                   |
| --------------------- | ----------------------------------------------------------------- |
| Traffic Volume        | Reports edge versus origin traffic.                                 |
| Traffic Bandwidth     | Reports edge versus origin traffic bandwidth. Lines represent edge traffic from CDN360 servers, traffic from your origin servers, and cache hit rate. The vertical (Y) axis shows the bandwidth and hit ratio, while the horizontal (X) axis shows time. The cache hit rate is computed as (edge traffic - origin traffic) / edge traffic.     |
| Requests              | Reports requests made to the files of your property. Lines show the requests to CDN360 edge servers, requests to your origin servers, and cache hit rate. The cache hit rate is computed as (edge requests - origin requests)/edge requests.              |
| Status Code Details   | Reports the percentage of HTTP status codes returned. For example, code 200 represents a successful request. |
| Fast Route Traffic Volume   | Reports the traffic to your origin server that use CDNetworks' [fast route feature](http://docdev.quantil.com/cdn/docs/edge-logic/supported-directives#origin_fast_route) to make connections faster and more reliable. |
| Fast Route Traffic Requests   | Reports the number of requests to your origin server that uses CDNetworks' [fast route feature](http://docdev.quantil.com/cdn/docs/edge-logic/supported-directives#origin_fast_route) to make connections faster and more reliable. |
| Traffic Volume Summary| Summarizes the edge traffic volume.                               |

## Generating Reports

1. In the left pane, click **Reports**. 
2. Complete the fields in the Reports page:

<p align=center><img src="/docs/resources/images/reports-wo-numbers.png" alt="report page" width="900"></p>

| **Fields**      | **Description**                                       |
| --------------- | ----------------------------------------------------- |
| Report Type     | Select the type of report you want to generate.       | 
| Hostnames       | Select one or more hostnames defined in your properties.         |
| Date Range      | Select the start and end dates and the time for the report. |
| Report Interval | Select the granularity of the returned data. <li><strong>5 minutes</strong>. *(default)*</li><li><strong>1 Hour</strong>.</li><li><strong>1 Day</strong>.</li><li><strong>1 Month.</li></li>
| Protocol        | Select the protocol-based data traffic that will be reported. <li><strong>All</strong> = report  HTTP and HTTPS traffic. *(default)*<li><strong>HTTP</strong> = report HTTP traffic only.<br><li><strong>HTTPS</strong> = report HTTPS traffic only.         | 
| Report Range        | If you are a reseller with child accounts, select the account that this report will cover. <li><strong>This Account Only</strong>. *(default)*</li><li><strong>Children Accounts Only</strong>.</li><li><strong>This Account + Children</strong>.
| Group By       | If **Report Type** is set to **Traffic Volume Summary**, use this field to group or not group the results. <li><strong>None</strong>.</li><li><strong>Hostnames</strong>.</li><li><strong>Server Groups</strong>.</li><li><strong>Hostnames + Server Groups</strong>.</li><li><strong>Server Groups + Hostnames</strong>.</li> |

**Note:** All volume and bandwidth report data pertains to the HTTP payload only. It does not include the overhead from TCP, IP, and MAC headers. CDNetworks adds 4.56% (66 bytes) of overhead to each 1448-byte payload to generate the "billing volume" on your invoice.

3. Click the **Generate Report** button to generate the report.
4. After the report is generated, you can:

<ul><li>Mouse over data points in the report to view detailed information.<br>
<li>Drag over the chart to magnify areas, and then use the <strong>Reset zoom</strong> button to return to the default zoom level.<br>
<li>Use the <strong>Download Options</strong> button at the top right of the report to download raw data in comma-separated-value (CSV) format.
