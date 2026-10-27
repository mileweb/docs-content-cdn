# 管理日志

CDN Pro 允许您导出显示发往某个加速域名的请求的日志。在导出日志之前，您必须通过为该加速域名创建日志配置来指定日志的格式。否则，将不会有可供导出的日志。

## 创建日志配置

要创建日志配置：

1. 在左侧导航栏中，点击**报表**，然后选择**访问日志**。
2. 在右上角，点击**配置**。

<p align=center><img src="/docs/resources/images/reports/configure-log1.png" alt="configure log1" width="700"></p>

3. 要搜索某个加速域名，请在<strong>搜索域名</strong>字段中输入其名称。
4. 点击<strong>+创建日志配置</strong>。
5. 填写随后出现的表单中的字段，然后点击<strong>+创建日志配置</strong>。

<p align=center><img src="/docs/resources/images/reports/configure-log2.png" alt="configure log2" width="700"></p>

|**字段**|**说明**|
|----------|---------------|
| 描述  | 输入日志配置的描述。|
| 域名    | 输入日志配置所适用的加速域名列表。用空格或回车符分隔多个加速域名。加速域名可以是：<ul><li>完全限定域名，例如 *domain.com*。</ul></li><ul><li>以星号开头的通配符域名，例如 **.domain.com*。</ul></li><ul><li>单个星号，表示将该日志配置应用于所有加速域名。</ul></li><strong>注意：</strong>请确保每个加速域名只有一个日志配置适用。                     |
| 存储日志的天数 | 指定日志将被存储的天数（1 到 30 天）。|
| 日志文件的时间跨度 | 指定 CDN Pro 保存日志文件的时间间隔，单位为分钟。|
| 日志格式 | 指定日志条目的格式。您可以使用下一节中的变量来创建自定义格式。如果变量值包含不可打印字符（ASCII 字符 <=0x1F 或 >=0x7F）、双引号或反斜杠，这些字符将被转义为 **\xXX** 之类的格式。例如，双引号会变成 **\x22**，反斜杠会变成 **\x5C**。 <br>**注意：**空格不会被转义。为便于解析，请对可能包含空格的变量加引号。</br>|

## 使用变量格式化日志

下表显示了您可以在**日志格式**字段中使用以自定义日志格式的变量。

|**变量**  |**说明**                          |
|--------------|-----------------------------------------|
| %apachet     | 常用日志格式中的时间，例如 03/Apr/2023:07:49:03 +0000|
| %cachestate  | HIT、MISS 或 REVALIDATE                |
| %cltip       | 客户端 IP 地址                       |
| %cltisp      | 客户端 ISP                              |
| %cltport     | 客户端端口号                      |
| %cltregion   | 客户端区域                           |
| %content_code | 内容代码。可在边缘逻辑中通过[设置 $content_code 变量](</docs/edge-logic/faq.md#如何在报表中对数据进行分类>)来设置该值   |
| %cpu_ns      | 此请求的 CPU 时间，单位为纳秒|
| %custom_1     | 引用您使用 [`custom_log_field` 指令](</docs/edge-logic/supported-directives.md#custom_log_field>)定义的 ID 为 1 的自定义日志字段|
| %custom_2     | 引用您使用 [`custom_log_field` 指令](</docs/edge-logic/supported-directives.md#custom_log_field>)定义的 ID 为 2 的自定义日志字段|
| %hostname    | Host 请求头|
| %method      | 用于访问内容的 HTTP 方法（例如 GET）|
| %protocol    | HTTP/1.0、HTTP/1.1 或 HTTP2.0|
| %querystr    | 查询字符串|
| %referer     | Referer 请求头|
| %reqrange    | 客户端请求中的 Range 请求头|
| %reqhdrsize  | 请求头长度|
| %reqsize     | 请求长度（包括请求行、请求头和请求体）|
| %rmtuser     | 使用基本认证时从 Authorization 请求头中提取的用户名|
| %rspsize     | HTTP 响应大小（字节），包括响应头和响应体，但不包括 TCP/IP/MAC|
| %rsptime     | 响应时间（毫秒）|
| %samplerate  | 每个日志条目对应的请求数|
| %scheme      | http 或 https|
| %statuscode  | 响应的状态码（例如 200）|
| %svrip       | 处理该请求的 CDN 服务器的 IP 地址 |
| %svrnode     | 缓存服务器节点名称|
| %tcprtt      | 服务器与客户端之间的往返时间（微秒）|
| %ua          | User-agent 请求头|
| %uniqueid    | 唯一标识此请求的字符串|
| %url         | 完整 URL（含查询字符串，如有）|
| %utctime     | 响应的 RFC 3339 时间戳（例如 2021-10-05T12:34:56Z）|

## 导出日志

创建日志配置后，请使用以下步骤导出日志：

1. 在左侧导航栏中，点击**报表**，然后选择**访问日志**。

<p align=center><img src="/docs/resources/images/reports/configure-log3.png" alt="configure log2" width="700"></p>

2. 在上方字段中选择一个加速域名。
3. 在下方字段中指定日期范围和时间。
4. 点击<strong>导出日志</strong>。 

<strong>注意：</strong>如果没有与指定加速域名匹配的配置，系统会提示您是否要为该加速域名创建日志配置。

## 修改日志配置

1. 在左侧导航栏中，点击**报表**，然后选择**访问日志**。
2. 在右上角，点击**配置**。
3. 要修改日志配置，可以点击日志配置右侧的省略号并选择**编辑**，或者打开日志配置并点击**编辑**按钮。
4. 在“修改日志配置”表单中进行更改。
5. 点击**保存**。

## 删除日志配置

1. 在左侧导航栏中，点击**报表**，然后选择**访问日志**。
2. 在右上角，点击**配置**。
3. 要删除日志配置，可以点击日志配置右侧的省略号并选择**删除**，或者打开日志配置并点击**删除**按钮。
4. 当系统提示确认删除时，点击**是的，删除**以删除该日志配置。
