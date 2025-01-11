# Generating Reports

CDN Pro provides reporting capabilities that allow you to analyze the traffic to your properties, identify trends over time, and pinpoint times when visitors are most likely to land on your site.

Reports are generated from the Reports page. To display this page, click **Reports** > **Charts** in the left pane.

The following figure shows the key elements on the page, and the table following the figure describes them.

<p align=center><img src="/docs/resources/images/reports/reports-w-numbers.png" alt="report page" width="650"></p>

| **Fields**   | **Description**                                                                                           |
| :----------: | --------------------------------------------------------------------------------------------------------- |
| 1            | Specify the report type, date range, and other parameters appropriate for the report you want to generate.               |
| 2            | The **Generate Report** button allows you to generate the report defined by the report parameters.        |

## Supported Report Types

The following report types are supported:

| **Report**            | **Description**                                                   |
| --------------------- | ----------------------------------------------------------------- |
| Traffic Volume        | Reports edge versus origin traffic.                                 |
| Traffic Bandwidth     | Reports edge versus origin traffic bandwidth. Lines represent edge traffic from CDN Pro servers, traffic from your origin servers, and cache hit rate. The vertical (Y) axis shows the bandwidth and hit ratio, while the horizontal (X) axis shows time. The cache hit rate is computed as (edge traffic - origin traffic) / edge traffic.     |
| Requests              | Reports requests made to the files of your property. Lines show the requests to CDN Pro edge servers, requests to your origin servers, and cache hit rate. The cache hit rate is computed as (edge requests - origin requests)/edge requests.              |
| Status Code Details   | Reports the percentage of HTTP status codes returned. For example, code 200 represents a successful request. |
| Origin Status Code Details   | Reports the percentage of HTTP status codes returned in requests to your origin servers. For example, code 200 represents a successful request. |
| Fast Route Traffic Volume   | Reports the traffic to your origin server that use CDNetworks' <a href="/cdn/docs/edge-logic/supported-directives#origin_fast_route">fast route feature</a> to make connections faster and more reliable. |
| Fast Route Requests   | Reports the number of requests to your origin server that uses CDNetworks' <a href="/cdn/docs/edge-logic/supported-directives#origin_fast_route">fast route feature</a> to make connections faster and more reliable. |
| CPU Time| Reports the CPU time consumed in each time interval to serve your properties. You can toggle the unit between **seconds** and **number of cores**. For example, if 3000 seconds of CPU time are reported in a 5-minute interval, it means your properties are maxing out an average of 10 (=3000s/5m) physical CPU cores during that period.                               |
| Edge Hostname Request| Shows the number of requests made to your [edge hostnames](</docs/portal/traffic-management/creating-edge-hostname.md>) over a period of time.                               |
| Traffic Volume Summary| Summarizes the edge traffic volume. Mousing over slices in the pie chart shows detailed information about traffic volume.                              |
| Request Summary| Summarizes all requests by group, including edge requests and fast route requests. Mousing over slices in the pie charts shows detailed information about the requests.                              |
| CPU Time Summary| Summarizes the CPU time by group, including total edge CPU time and total intermediate CPU time. Mousing over slices in the pie charts shows detailed information about CPU times.                              |

**Note:** The selections you choose for the Traffic Volume Summary, Request Summary, or CPU Time Summary report persist as you switch among these three reports using the **Report Type** dropdown.

## Generating Reports

1. In the left pane, click **Reports**, and then select **Charts**. 
2. Complete the fields in the Reports page.

<p align=center><img src="/docs/resources/images/reports/reports-wo-numbers.png" alt="report page" width="650"></p>

| **Fields**      | **Description**                                       |
| --------------- | ----------------------------------------------------- |
| Report Type     | Select the type of report you want to generate.       | 
| Report Range        | If you are a reseller with child accounts, select the account that this report will cover. <li><strong>This Account Only</strong>. *(default)*</li><li><strong>Children Accounts Only</strong>.</li><li><strong>This Account + Children</strong>.|
| Date Range      | Select the start and end dates and the time for the report. |
| Report Interval | For all reports except Traffic Volume Summary, select the granularity of the returned data. <li><strong>5 minutes</strong>. *(default)*</li><li><strong>1 Hour</strong>.</li><li><strong>1 Day</strong>.</li><li><strong>1 Month.</li></li>|
| Hostnames       | For all reports except Edge Hostname Request, select one or more hostnames defined in your properties. <br><br>**Tip:** If you select two or more hostnames, you can save them as a group by clicking **+Save selected hostnames as a group** at the bottom of the dropdown list. The next time you want to use the same hostnames, just select the group instead of selecting the hostnames individually. A down arrow next to **Groups** at the top of the dropdown list allows you to export the groups to a CSV file.         |
| Edge Hostnames       | For Edge Hostname Request, select one or more edge hostnames.         |
| Scheme        | For all reports except Edge Hostname Request, select the protocol-based data traffic that will be reported. <li><strong>All</strong> = report  HTTP and HTTPS traffic. *(default)*<li><strong>HTTP</strong> = report HTTP traffic only.<br><li><strong>HTTPS</strong> = report HTTPS traffic only.         | 
| Server Groups        | All reports except for the Edge Hostname Request report support filtering by server groups. By default, data from all server groups is included. To choose specific server groups, select them from the available choices.|
| Group By       | If **Report Type** is set to **Traffic Volume Summary**, **Request Summary**, or **CPU Time Summary**, use this field to group the results according to one or two of the following choices. <li><strong>None</strong>.</li><li><strong>Hostnames</strong>.</li><li><strong>Server Groups</strong>.</li><li><strong>Customer Ids</strong>.</li> |

3. Click the **Generate Report** button to generate the report.
4. After the report is generated, you can:

<ul><li>Mouse over data points in the report to view detailed information.<br>
<li>Drag over the chart to magnify areas, and then use the <strong>Reset zoom</strong> button to return to the default zoom level.<br>
<li>Use the three vertical buttons at the top right of the report to download raw data in comma-separated-value (CSV) format, create annotations (described below), or hide annotations.
<p><img src="/docs/resources/images/reports/download-options-icon.png" alt="dload options" width="225"></p>
<li>Get traffic within a time range of a traffic volume report by using the "Traffic Within Time Range" fields below the chart.</ul>


## Creating Annotations

After you generate a report, you can create text annotations to highlight events related to traffic going to your hostnames.

1. Click the three vertical buttons at the top right of the report and select **Create Annotation**.
2. Complete the fields in the Create an annotation dialog box.

   <p align=center><img src="/docs/resources/images/reports/create_annotation.png" alt="report page" width="650"></p>

| **Fields**      | **Description**                                       |
| --------------- | ----------------------------------------------------- |
| Annotation Type | Select the type of annotation you want to add.<ul><li> <strong>Client</strong> = an event affecting clients, such as the release of a popular game.</ul></li><ul><li><strong>Configuration</strong> = an event related to a configuration change.</ul></li> **Note:** Annotations created by CDNetworks to indicate operations events may also appear in your reports.  |
| Time            | Select an RFC 3339 date indicating when the annotation applies. |
| Comments        | Enter a description about the event. The comments will appear in the report. 
| Hostnames       | Select one or more hostnames. You can use wildcard domains such as <strong>*.abc.com</strong>, <strong>\*.com</strong>, or <strong>\*</strong>. If left blank, the annotation will apply to all hostnames. || Hostnames       | Select one or more hostnames. You can use wildcard domains such as <strong>*.abc.com</strong>, <strong>\*.com</strong>, or <strong>\*</strong>. If left blank, the annotation will apply to all hostnames. |
| Server Regions  | Select one or more CDN Pro server regions affected by the event.         |
| Client Regions  | Select one or more end-user regions affected by the event.         |

3. Click **Create**.
   
After you create annotations, you can hide them or redisplay them by clicking the three vertical buttons at the top right of the report and selecting **Hide Annotations** or **Show Annotations**.

 The following figure shows an example of two annotations.

 <p align=center><img src="/docs/resources/images/reports/two_annotations.png" alt="report page" width="650"></p>



