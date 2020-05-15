# Managing Content

CDN360 supports a content management purge function that allows you to override the cache time. This feature is handy when the content on your web server has changed and you want CDN360 to update its servers with your changes. For example, if your website has a cache time of one week, but you want your website visitors to see a new update to one of your pages, you can use the purge option to flush the cache and enable your visitors to view the new content.

Content management purge activities are performed from the Content Management page. To display this page, click **Content Management** in the left pane.

The following figure shows the key elements on the page, and the table following the figure describes them.

![null](</docs/resources/images/Content Management.png>) MARC: NEED NEW SCREEN??

| **Fields** | **Description** |
| :----------: | --------------- |
| 1 | To filter purges, type characters in this field and then press the Enter key. All purges that do not contain the typed characters are hidden. Filtering is not case-sensitive. To remove the filter, click the **x** icon at the right side of the search field. |
| 2 | Each purge appears on its own row. Clicking an ID shows detailed information about the purge.|
| 3 | The **Create Purge** button allows you to create a purge request.|

## Creating a Purge Request

If the content on your origin web server has changed, request a purge to have CDN360 distribute those changes.

1. In the left pane, click **Content Management**.
2. At the top right of the page, click the **Create Purge** button. 
3. Complete the fields in the Purge form. Required fields are denoted by an asterisk (```*```). The top of the form shows the percentage of the daily purge quota that has been used.

<p align=center><img src="/docs/resources/images/Purge Form.png" alt="purge form" width="900"></p>

|**Fields**|**Description**|
|----------|---------------|
| Target Environment | Select whether the purge will occur in a staging or production environment.|
| Purge Action | Select whether you want the content deleted or invalidated.|
| Purge Type | Select whether you want to purge a file or a directory.|
| Add a file to be purged | If **Purge Type** is set to **File**, select **https** or **http** from the drop-down list, enter the name of the file to be purged, and then click **Add File**. Repeat this step for each additional file you want to purge.|
| Add a file purge header | If **Purge Type** is set to **File**, specify the name and value of the HTTP request header included in the cache key, and then click **Add Header**. Repeat this step for each additional request header you want to purge.|
| Add a directory to be purged | If **Purge Type** is set to **Directory**, select **http** or **https** from the drop-down list, enter the name of the directory to be purged, and then click **Add Directory**. Note that subdirectories associated with the directory will also be purged. Repeat this step for each additional directory you want to purge.|

4. Click **Start Purge**.

## Viewing Purge Details

1. In the left pane, click **Content Management**.
2. Click the ID associated with the purge operation. A Purge Details form similar to the following example provides details about the selected purge operation.
   
   <<figure here, see Flare??>>

## Purge History

1. In the left pane, click **Content Management**.
2. A **Purge** tab on the Content Management page shows details similar to those in the following figure:

   <ul><li> <strong>ID</strong> associated with the purge request.<br>
   <li><strong>Target</strong> environment where the purge occurred (either <strong>Staging</strong> or <strong>Production</strong>).<br>
   <li><strong>Action</strong> that was performed (either <strong>Delete</strong> or <strong>Invalidate</strong>).<br>
   <li><strong>Type</strong> = object on which the purge was requested.<br>
   <li>Date and time when the purge request was submitted and completed.<br>
   <li>A success rate indicator that shows a completion percentage from 0 to 100%.</ul>

![null](</docs/resources/images/dashboard13.png>)

3. To specify the exact content you want to purge, create a purge request.

