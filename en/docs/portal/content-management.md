# Managing Content

CDN Pro supports a content management purge function that allows you to override the cache time. This feature is handy when the content on your web server has changed and you want CDN Pro to update its servers with your changes. For example, if your website has a cache time of one week, but you want your website visitors to see a new update to one of your pages, you can use the purge option to flush the cache and enable your visitors to view the new content.

Content management purge activities are performed from the Content Management page. To display this page, click **Content Management** in the left pane.

The following figure shows the key elements on the page, and the table following the figure describes them.

![null](</docs/resources/images/content-management/content-management-w-numbers.png>)

| **Fields** | **Description** |
| :----------: | --------------- |
| 1 | To filter purges, type characters in this field and then press the Enter key. All purges that do not contain the typed characters are hidden. Filtering is not case-sensitive. To remove the filter, click the **x** icon at the right side of the search field. |
| 2 | Each purge appears on its own row. Clicking an ID shows detailed information about the purge.|
| 3 | Icon to filter purges by their submission date.|
| 4 | The button to create purge requests.|

## Creating a Purge Request

If the content on your origin web server has changed, request a purge to have CDN Pro distribute those changes.

1. In the left pane, click **Content Management**.
2. At the top right of the page, click the **Create Purge** button. 
3. Complete the fields in the Purge form. Required fields are denoted by an asterisk (```*```). The top of the form shows the percentage of the daily purge quota that has been used.

<p align=center><img src="/docs/resources/images/content-management/purge-form.png" alt="purge form" width="900"></p>

|**Fields**|**Description**|
|----------|---------------|
| Target Environment | Select whether the purge will occur in the staging or production environment. Default is staging.|
| Purge Action | Select whether you want the content deleted or invalidated.  <br><ul><li><strong>Delete</strong> = removes the object from the cache of edge servers. The next time the edge server receives a request for the removed content, it retrieves the current version from your origin server. (*default*)</li><li><strong>Invalidate</strong> = this is the default setting and marks the cached content as invalid. However, the content is not removed from cache and objects are not retrieved from your origin unless they are newer than the cached versions. With this setting, CDN Pro edge servers can continue serving stale content to your end users if the origin cannot be reached.</li></ul> |
| Purge Type | Select whether you want to purge a single file, multiple cache entries that match a wildcard, or all entries that match a regular expression. Default is file. For more information about purging using regular expressions, see [Purging Entries That Match a Regular Expression](#purging-entries-that-match-a-regular-expression) below.<br><br><strong>Note:</strong> If the file has multiple variations due to a custom cache key, select **Wildcard**.</br>|
| Add files to purge | If **Purge Type** is set to **File**, enter the complete URL of the file to be purged and press Enter. Repeat this step for each additional file you want to purge. If you decide not to purge a file, delete it from this field.|
| Add a file purge header | If **Purge Type** is set to **File**, specify the name and value of the HTTP request header included in the cache key, and then click **Add Header**. Repeat this step for each additional request header you want to purge. If you decide not to purge a request header, click the **x** icon at the right side of the header name.|
| Add directories to purge | If **Purge Type** is set to **Wildcard**, enter the complete URL of the directory you want to purge, including optional wildcards, and press Enter. Repeat this step for each additional directory you want to purge. If you decide not to purge a directory, delete it from this field. </br><br><strong>Note:</strong> Observe the following guidelines:</br><ul><li>Purging a directory also purges its subdirectories.</br></ul></li><ul><li>CDN Pro supports purging based on URL prefixes. For more information, see [Examples of Directory Purging](#examples-of-directory-purging) below.</ul></li>|

4. Click **Start Purge**.

**Note:** When the purge completes, a **Purge Again** button at the bottom right allows you to repeat a purge.

## Purging Entries That Match a Regular Expression

CDN Pro supports purges that use a regular expression (or "regex") pattern to match a cache key. The pattern must begin with <code>{scheme}: //{hostname}/</code> where <code>{scheme}</code> is http, https, or other entry that matches any scheme. For example: <br><br><code>https://test.domain.com/my.*\.(jpg|png)\?q= </code></br></br>

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

