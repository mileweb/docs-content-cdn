# Managing Logs

CDN Pro allows you to export logs that show requests made to a hostname. Before you export logs, you must specify the format of the logs by creating a log configuration for the hostname. Otherwise, no logs will be available for exporting.

## Creating a Log Configuration

To create a log configuration:

1. In the left pane, click **Reports**, and then select **Access Log**.
2. At the top right, click **Configuration**.

<p align=center><img src="/docs/resources/images/reports/configure-log1.png" alt="configure log1" width="900"></p>

3. To search for a hostname, enter the name in the <strong>Search for a hostname</strong> field.
4. Click <strong>+Create Log Configuration</strong>.
5. Complete the fields in the next form that appears, and then click <strong>+Create Log Configuration</strong>.

<p align=center><img src="/docs/resources/images/reports/configure-log2.png" alt="configure log2" width="900"></p>

|**Fields**|**Description**|
|----------|---------------|
| Description  | Enter a description for the log configuration.|
| Hostnames    | Enter a list of hostnames to which the log configuration applies. Separate multiple hostnames with a space or carriage return. A hostname can be:<ul><li>A fully qualified domain name such as *domain.com*.</ul></li><ul><li>A wildcard domain name with a leading asterisk such as **.domain.com*.</ul></li><ul><li>A single asterisk to apply the log configuration to all hostnames.</ul></li><strong>Note:</strong> Make sure only one log configuration applies to each hostname.                     |
| Days to Store Logs | Specify the number of days (from 1 to 30) that the logs will be stored.|
| Time Span of Log Files | Specify, in minutes, the time interval at which CDN Pro saves log files.|
| Log Format | Specify the format of the log entry. You can use the variables in the following section to create a custom format. If a variable value contains non-printable characters (ASCII characters <=0x1F or >=0x7F), double quotes, or backslash, these characters will be escaped to a format such as **\xXX**. For example, double quotes will become **\x22** and a backslash will become **\x5C**. <br>**Note:** A space is not escaped. To facilitate parsing, quote variables that may contain spaces.</br>|

## Using Variables to Format Logs

The following table shows the variables you can use in the **Log Format** field to customize the format of logs.

|**Variable**  |**Description**                          |
|--------------|-----------------------------------------|
| %cachestate  | HIT, MISS, or REVALIDATE                |
| %cltip       | Client IP address                       |
| %cltisp      | Client ISP                              |
| %cltport     | Client port number                      |
| %cltregion   | Client region                           |
| %cpu_ns      | CPU time, in nanoseconds, for this request|
| %custom1     | Refers to a custom log field with ID 1 you define using the  [`custom_log_field` directive](</docs/edge-logic/supported-directives.md#custom_log_field>)|
| %custom2     | Refers to a custom log field with ID 2 you define using the  [`custom_log_field` directive](</docs/edge-logic/supported-directives.md#custom_log_field>)|
| %hostname    | Host header|
| %method      | HTTP method used to access the content (for example, GET)|
| %protocol    | HTTP/1.0, HTTP/1.1, or HTTP2.0|
| %referer     | Referer request header|
| %reqrange    | Range header in requests from client|
| %rmtuser     | User name extracted from the Authorization header when basic authentication is used|
| %rspsize     | HTTP response size, in bytes, including header and body, but not including TCP/IP/MAC|
| %rsptime     | Response time in milliseconds|
| %samplerate  | Number of requests corresponding to each log entry|
| %scheme      | http or https|
| %statuscode  | Response's status code (for example, 200)|
| %svrnode     | Cache server node name|
| %tcprtt      | Round trip time, in microseconds, between server and client|
| %ua          | User-agent header|
| %uniqueid    | String uniquely identifying this request|
| %url         | Full URL with query string, if any|
| %utctime     | RFC 3339 timestamp of the response (for example, 2021-10-05T12:34:56Z)|

## Exporting Logs

After you create a log configuration, use the following procedure to export logs:

1. In the left pane, click **Reports**, and then select **Access Log**.

<p align=center><img src="/docs/resources/images/reports/configure-log3.png" alt="configure log2" width="900"></p>

2. In the top field, select a hostname.
3. In the bottom field, specify the date range and time.
4. Click <strong>Export Logs</strong>. 
<strong>Note:</strong> If no configurations match the specified hostname, a message asks whether you want to create a log configuration for the hostname.

## Editing Log Configurations

1. In the left pane, click **Reports**, and then select **Access Log**.
2. At the top right, click **Configuration**.
3. To edit a log configuration, either click the ellipses to the right of the log configuration and choose **Edit** or open the log configuration and click the **Edit** button.
4. Make your changes in the Edit Log Configuration form.
5. Click **Save**.

## Deleting Log Configurations

1. In the left pane, click **Reports**, and then select **Access Log**.
2. At the top right, click **Configuration**.
3. To delete a log configuration, either click the ellipses to the right of the log configuration and choose **Delete** or open the log configuration and click the **Delete** button.
4. When prompted to confirm the deletion, click **Yes, delete** to delete the log configuration.