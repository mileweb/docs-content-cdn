# Deploying Your Property

After you create and validate a property version, you are ready to deploy it. Initially, we highly recommend that you always deploy the property to the staging environment to make sure the property is configured properly and behaves as expected. After you confirm that the property is ready to go live, you can deploy it to the production environment.

**Note:** If you began your free trial of CDN Pro, you must submit at least 10 requests to content deployed to the staging environment before you can deploy to production.

1. In the left pane, click **Edge Configurations**, and then select **Properties**. 

2. On the Properties page, click the ID of the property you want to deploy.
    <br><u>OR </u></br>
  In the **Actions** column, click the vertical ellipsis for the property you want to deploy, and then select **Edit**.

3. To deploy the property, click the horizontal ellipsis next to the **Edit** button, and then select **Deploy**.
4. When the Deployment Target dialog box appears, select whether to deploy to staging (default) or production, and then click **Deploy Now**. Or click **Add to Standby task** to move this action to the [standby queue](<docs/../../tasks/standby-tasks.md>). Clicking **Cancel** cancels deployment.</ul></li> 

<p align=center><img src="/docs/resources/images/edge-configurations/property-deployment.png" alt="deployment selections and button" width="900"></p>

5. If you clicked the **Deploy Now** button, click **OK** when the confirmation pop-up appears. Usually, the deployment process finishes in 5 minutes. You can either wait with the progress dialog box, or close it to perform other tasks while the deployment continues in the background. You can click **Tasks** in the left pane to check the status of the deployment at any time.

6. For instructions about testing the property in the staging environment, click [here](</docs/portal/edge-configurations/testing-property.md#testing-property-in-staging>).

# Undeploying a Property

1. In the **Actions** column on the Properties page, click the vertical ellipsis of the deployed property you want to undeploy, and then select **Undeploy from Staging** or **Undeploy from Production**.

<p align="center"><img src="/docs/resources/images/edge-configurations/property-actions-undeploy.png" alt="property undeployment" width="900"></p>

2. When the confirmation pop-up appears, click the appropriate button:<ul><li>To undeploy the property now, click **OK** and proceed to the next step.</ul></li><ul><li>To undeploy the property at a later time, click <strong>Add to Standby task</strong> to move this action to the [standby queue](<docs/../../tasks/standby-tasks.md>).</ul></li>   
3. If you clicked **OK**, you can either wait with the progress dialog box, or close it to perform other tasks while the undeployment continues in the background. You can click **Tasks** in the left pane to check the status of the undeployment at any time.

# Viewing a Property's Deployment History

1. In the **Actions** column on the Properties page, click the vertical ellipsis of the property whose deployment history you want to view, and then select **Deployment History**.  
   <br><u>OR </u></br>
 Click the ID of the property on the Properties page. Then click the horizontal ellipsis next to the **Edit** or **Clone** button and select **History**.
2. To view task details, click the ID or task name for a deployment.
3. Clicking the **Property ID** link under **Actions** on the Task Details page displays the page where you can edit the corresponding property.
**Note:** Fields at the top of the Deployment page allow you to search for deployments over a specified date and time range.