# Managing Prefetch Requests

CDN Pro supports a prefetch function that warms the CDN Pro cache with new content from your origin server in order to accelerate content delivery to users. When users make requests for the prefetched content, CDN Pro already has the requested content and can serve it immediately without a round trip to the origin. 

Prefetch activities are performed from the following page. To display this page, click **Content Management** > **Prefetch** in the left pane.

The following figure shows the key elements on the page, and the table following the figure describes them.

<!-- ![null](</docs/resources/images/content-management/prefetch1.png>) -->

| **Fields** | **Description** |
| :----------: | --------------- |
| 1 | To filter prefetches, type characters in this field and then press the Enter key. Only prefetches containing the typed characters will be shown. Filtering is not case-sensitive. To remove the filter, click the **x** icon at the right side of the search field. |
| 2 | Each prefetch appears on its own row. Clicking an ID shows detailed information about the prefetch.|
| 3 | The button to create prefetch requests.|

## Creating a Prefetch Request

To create a prefetch request:

1. In the left pane, click **Content Management**, and then select **Prefetch**.
2. At the top right of the page, click the **Create Prefetch** button. 
3. Complete the fields in the Prefetch form. Required fields are denoted by an asterisk (```*```). The top of the form shows the percentage of the daily prefetch quota that has been used.

<!-- <p align=center><img src="/docs/resources/images/content-management/prefetch2.png" alt="purge form" width="900"></p> -->

|**Fields**|**Description**|
|----------|---------------|
| URLs     | Enter the URLs you want to prefetch. The URLs you prefetch must be for hostnames of properties deployed to production. Separate multiple URLs with a carriage return.|
| Regions  | Select the locations of CDN Pro servers on which the prefetch will be performed. Omitting a location means the prefetch will be done by all servers in all regions.                       |
| Start Time | Specify the date and time when the prefetch should be conducted. The time is specified in UTC format (for example, **2021-03-06T00:00:00Z**). <br>**Note:** Start time can be left empty to request an immediate prefetch.</br>|

4. Click **Start Prefetch**.
