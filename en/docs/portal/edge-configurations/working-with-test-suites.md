# Working with Test Suites

CDN Pro provides a staging environment for you to [test your property configurations](</docs/portal/edge-configurations/testing-property.md>) without affecting production. Test suites provide the added convenience of allowing you to test properties deployed to both the staging and production environments.

Test suites are created and run from the Test Suites page. To display this page, click **Edge Configurations** > **Test Suites** in the left pane.

The following figure shows the key elements on the page, and the table following the figure describes them.

<p align=center><img src="/docs/resources/images/edge-configurations/test-suites-page.png" alt="test suite page" width="900"></p>

| **Fields**   | **Description**                                                                                           |
| :----------: | --------------------------------------------------------------------------------------------------------- |
| 1            | A search box for filtering test suites. You can filter test suites by ID, name, description, or property. To enter multiple search strings, separate each one with a carriage return. Advanced filtering capabilities allow you to search specific configurations. For more information, see [Filtering Properties](#filtering-properties).               |
| 2            | The list of all test suites that are available to you.                                                    |
| 3            | Drop-down lists to take actions on each test suite.                                                       |
| 4            | The button to create and run test suites.                                                                 |

## Creating Test Suites
The following procedure describes how to create a test suite. After you create a test suite, you can run it as part of this procedure or save it for future use.

1. In the left pane, click **Edge Configurations**, and then select **Test Suites**. 
2. At the top right of the screen, click the **Create Test Suite** button.
3. Complete the fields in the Test Suites page. Required fields are denoted by an asterisk (*).

<p align=center><img src="/docs/resources/images/edge-configurations/create-test-suite-dialog-box.png" alt="test suite dialog box" width="900"></p>

| **Fields**      | **Description**                                       |
| --------------- | ----------------------------------------------------- |
| Test Suite Name | Name of the test suite you want to create.            | 
| Property        | Type the first few characters of a property deployed to staging or production, and then select one from the matching list of properties. To test on production, you must have an edge hostname and modify your DNS settings to direct traffic to the CDN Pro production platform.|
| Description     | Description of the test suite.                        |

3. Click **Save** to save the test suite or **Save and Create Test Case** to create a test case and proceed to the next step.
4. If you clicked **Save and Create Test Case**, complete the fields in the Create a test case page.

<p align=center><img src="/docs/resources/images/edge-configurations/create-a-test-case.png" alt="test case" width="900"></p>

| **Fields**      | **Description**                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------- |
| Property        | Read-only field that shows the name of the property associated with this test suite.            | 
| Test Case Name  | Name of the test case you are creating.                                                         |
| Description     | Description of the test case.                                                                  |
| URL             | Complete URL containing a hostname defined in a deployed property.                              | 
| Request Headers | Request headers to pass.                                                                        |
| Cookies         | Cookies to pass.                                                                                |
| TLS Version     | TLS version to use for the request.                                                             | 
| HTTP/2          | Select whether to enable or disable HTTP/2 for the request.                                     |
| Expected Result | Select one or more HTTP response status codes.                                                  |

1. Click **Save and Create Another Test Case** to save the test case and create another one or **Save and Run** to save the test case you just created and run it.
2. If you clicked **Save and Run**, select a target environment (staging or production) to test when prompted, and then click **Run**. The Test Report page shows the results.

## Editing Test Suites and Test Cases

1. In the left pane, click **Edge Configurations**, and then select **Test Suites**.

2. On the Test Suites page, click the ID of the test suite you want to edit. 
   <br><U>OR </u></br>
  In the **Actions** column, click the vertical ellipsis for the test suite you want to edit, and then select **Edit**.

3. To change the name of the test suite before editing it, click the current name, enter the new name, and click **Save**.
4. Click the ID of the test case you want to edit.
5. Make your changes in the Test Case form. Required fields are denoted by an asterisk (\*).
6. Click **Save**.

## Running Test Cases within a Test Suite

1. In the left pane, click **Edge Configurations**, and then select **Test Suites**.
2. On the Test Suites page, check a test suite, click the three dots next to the **Create Test Suite** button, and select **Run Selected Test Suites**. 
   <br><U>OR </u></br>
  In the **Actions** column, click the vertical ellipsis for a test suite, and then select **Run**.
3. When prompted, select a target environment (staging or production) to test.
4. Click **Run**. The Test Report page shows the results.

## Deleting a Test Suite

1. In the left pane, click **Edge Configurations**, and then select **Test Suites**.
2. In the **Actions** column on the Test Suites page, click the vertical ellipsis of the test suite you want to delete, and then select **Delete**.
3. When prompted to confirm the deletion, click **Yes, delete** to delete the test suite.
