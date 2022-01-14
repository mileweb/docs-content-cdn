# 内容管理

CDN Pro 提供的缓存刷新功能可以让您快速更新缓存文件。此功能可用于当您的 Web 服务器（源站）上的内容发生更改并且您希望 CDN Pro 立即使用使用新文件响应客户端的时候。例如，如果您的网站的缓存时间为一周，但您希望网站访问者看到您在某个页面的更新，您可以使用缓存刷新功能来刷新缓存并让访问者查看新内容。

您可以从内容管理页面执行缓存刷新操作。要显示此页面，请单击左窗格中的 **内容管理**。


下图显示了该页面上的关键元素，图后面的表格描述了它们内容。


![null](</docs/resources/images/content-management/content-management-w-numbers.png>)

| **字段** | **描述** |
| :----------: | --------------- |
| 1 | 用于过滤缓存刷新任务，请在此字段中键入字符，然后按 Enter 键。系统将紧展示包含键入字符的缓存刷新任务。该过滤不区分大小写。要删除该过滤操作，请单击搜索字段右侧的 **x** 图标。|
| 2 | 每个缓存刷新任务都出现在此行中。单击 ID 系统会显示有关缓存刷新任务的详细信息。|
| 3 | 按提交日期过滤缓存刷新任务的图标。|
| 4 | 创建缓存刷新任务请求的按钮。|

## 新建刷新任务

如果 Web 服务器（源站）上的内容已更改，您可以新建刷新任务以便 CDN Pro 分发这些更改。


1. 在左侧窗格中，单击**内容管理**。
2. 在页面的右上角，单击 **新建刷新任务** 按钮。
3. 填写刷新任务表单中的字段。必填字段由星号 (```*```) 表示。表格顶部显示当前可用的每日文件刷新额度。


<p align=center><img src="/docs/resources/images/content-management/purge-form.png" alt="purge form" width="900"></p>

|**字段**|**描述**|
|----------|---------------|
| 目标环境 | 选择是否在演练环境或生产环境中执行刷新任务。默认为演练环境。|
| 刷新方式 | 选择是要直接删除内容还是使其过期无效。
 <br><ul><li><strong>删除</strong> = 从边缘服务器的缓存中删除对象。当下次边缘服务器收到本次删除内容的请求时，它会从您的源服务器检索当前版本文件。
 (*默认*)</li><li><strong>强制过期</strong> = 默认设置，将缓存的内容标记为过期。但是，该刷新方式并不会从缓存中删掉内容。当下次边缘服务器收到本次删除内容的请求时，只有在源上文件版本比陈旧的缓存更新时， CDN Pro 才会去源上检索该文件。使用此设置，如果无法访问源，CDN Pro 边缘服务器可以继续为您的终端用户提供陈旧的内容。
</li></ul> |
| 刷新类型 | 选择是要清除单个文件、清楚匹配通配符的多个缓存内容，或匹配正则表达式的所有内容。默认类型为文件。有关使用正则表达式进行刷新的更多信息，请查阅下方的 [使用正则刷新任务](#purging-entries-that-match-a-regular-expression) 。<br><br><strong>请注意：</strong> 如果一个文件因自定义 Cache Key 导致存在多个缓存版本，请使用 **通配符**.</br>|
| 添加要清除的文件 | 当 **刷新类型** 是 **文件** 时，输入要清除的文件的完整 URL，然后按下Enter回车键。对要清除的每个文件重复此步骤。如果您决定不刷新该文件，请将其从该字段中删除。|
| 添加一个文件刷新请求头 | 当 **刷新类型** 是 **文件** 时，指定缓存键中包含的 HTTP 请求标头的名称和值，然后单击 **添加请求头**。对要刷新的每个附加请求头重复此步骤。如果您决定不刷新某个请求头，请单击该请求头名称右侧的 **x** 图标。|
| 添加要刷新的目录 | 当 **刷新类型** 是 **通配符** 时，输入要清除的目录的完整 URL，包括可选的通配符，然后按 下Enter回车键。对要刷新的每个其他目录重复此步骤。如果您决定不刷新该目录，请将其从该字段中删除。</br><br><strong>请注意：</strong> 请遵守以下准则：</br><ul><li>刷新某目录也会刷新其子目录。</br></ul></li><ul><li>CDN Pro 支持基于 URL 前缀的清除。有关详细信息，请参阅下方的 [目录刷新案例](#examples-of-directory-purging) 。</ul></li>|

4. 点击 **开始刷新**.<br><br> 
   
   **请注意：** 刷新任务完成后，刷新任务详情页面右下角的 **再次刷新** 按钮可让您重复执行此次刷新任务。


## 使用正则刷新任务

CDN Pro supports purges that use a regular expression (or "regex") pattern to match a cache key. The pattern must begin with `{scheme}://{hostname}` where <code>{scheme}</code> is http, https, or other entry that matches any scheme. For example: <br><br><code>https://test.domain.com/my.*\.(jpg|png)\?q= </code></br></br> 

For performance considerations, observe the following guidelines:
<ul><li>The regex pattern following the hostname should be less than 126.</ul></li><ul><li>The pattern can contain up to two unlimited quantifiers ("*", "+" or ",}")</ul></li><ul><li>The upper limit of any quantifier cannot exceed 59.</ul></li>

By default, CDN Pro allows 1,000 entries in the <code>fileUrls</code> list, 20 entries in the <code>dirUrls</code> list, and 2 entries in the <code>regexPatterns</code> list in each purge. The per-request and total number of allowed purges are subject to customer-specific quotas. CDN Pro also limits the size of the API request body.

**Note:** If you are a reseller, you can purge a child customer's domain. Your purge quota will apply.

## Examples of Directory Purging

CDN Pro allows you to purge directories by entering URLs in the <strong>Add directories to purge</strong> field. The URLs you enter can include wildcards.
<ul><li>Ending a subdirectory with a single asterisk <b>*</b> purges all files only.</ul></li><ul><li>Ending a directory with two asterisks purges all files and subdirectories.</ul></li><ul><li>Ending the URL with <b>*ext</b> purges all files that have a specific extension.</ul></li><ul><li>If the URL includes a percent character <b>%</b>, encode it to <b>%25</b>.</ul></li>

The following table shows examples of purging directories with and without using wildcards.

**Note:** Files can have multiple variations if custom cache keys are used. In addition, a URL such as <code>/pictures/</code> or <code>/picture.jpg</code> can have many variations stored in the cache due to the Vary header or cache key customization. As a result, performing a folder purge without an asterisk clears all variations except subdirectories or files. For this reason, folder purges of <code>/pictures/</code>, <code>/pictures/*</code>, and <code>/pictures/**</code> result in different behaviors.

|**Example**|**Description**|
|----------|---------------|
| http://test.domain2.com/mydir       | Purge all variations of a single directory, but not its subdirectories or files. Variations may exist if custom cache keys are used.                               |
| http://test.domain2.com/mydir/**    | Purge all files and subdirectories whose cache key begins with http://test.domain2.com/mydir/.                               |
| http://test.domain2.com/mydir/*    | Purge all files, but not subdirectories, within a directory.                                             |
| http://test.domain2.com/mydir/*.jpg | Purge all cache entries ending with the .jpg file extension. Subdirectories of http://test.domain2.com/mydir/ are not purged.                                             |
| http://test.domain2.com/mydir/a*    | Purge all files, but not subdirectories, that start with the letter "a".                   |
| http://test.domain2.com/mydir/a**   | Purge all files and subdirectories that start with the letter "a".|
| http://test.domain2.com/mydir/a.jpg | Purge all variations of "a.jpg". Variations may exist if custom cache keys are used.                                  |
| http://test.domain2.com/my**jpg | Purge all entries whose cache key begins with http://test.domain2.com/my and ends with the suffix jpg. The "**" can match anything in the path including additional subdirectories. For example, http://test.domain2.com/mydirectory/picture.jpg would be purged.                                  |                                  |


## Viewing Purge Details

1. In the left pane, click **Content Management**.
2. Click the ID associated with the purge operation. A Purge Details form provides details about the selected purge operation.

## Purge History

1. In the left pane, click **Content Management**.
2. A **Purge** tab on the Content Management page shows details similar to those in the following figure:

   <ul><li> ID associated with the purge request.<br>
   <li>Hostname of the property associated with the purge request.<br><li>Target environment where the purge occurred (either Staging or Production).<br>
   <li>Action that was performed (either Delete or Invalidate).<br>
   <li>Number of files and directories purged.<br>
   <li>Date and time when the purge request was submitted and completed.<br>
   <li>A success rate indicator that shows a completion percentage from 0 to 100%.</ul>

<p align=center><img src="/docs/resources/images/content-management/content-management-wo-numbers.png" alt="purge form no numbers" width="900"></p>

3. To specify the exact content you want to purge, create a purge request.

