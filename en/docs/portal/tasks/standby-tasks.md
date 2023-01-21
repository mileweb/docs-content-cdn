# Managing Standby Actions

When you deploy and undeploy certificates and properties, you can perform  the action immediately or move it to a standby queue, where it will join other standby actions waiting to be run.

Using the Standby Task form, you can view all standby actions in the queue and run them all at one time.

## Displaying the Standby Task Form
You can display the Standby Task form from the Certificates, Edge Configurations, and Deployment pages.

### Displaying the Standby Task Form from the Certificate or Edge Configurations Page

1. In the left pane, click **Certificates** or **Edge Configurations > Properties**.
2. Click a certificate name or property ID.
3. Click the three dots next to either the **Deploy** button (for certificates) or the **Edit** button (for properties) and select **History**.
4. Click a standby task to display the Standby Task form.

### Displaying the Standby Task Form from the Deployment Page

1. In the left pane, click **Tasks > Deployment**.
2. Click a standby task to display the Standby Task form.

## Understanding the Standby Task Form

The Standby Task form is organized into two subqueues.<ul><li>The top subqueue shows actions for the CDN Pro staging environment.</ul></li><ul><li>The bottom subqueue shows actions for the production environment.</ul></li>Each subqueue has its own search field for filtering standby actions in that subqueue.

<p align=center><img src="/docs/resources/images/standby_tasks.png" alt="standby task form" width="700"></p>

## Adding Standby Tasks
To add standby tasks to a subqueue:
1. Click the **+ Add** button at the top right of a subqueue. The Add Tasks to Staging or Add Tasks to Production dialog box appears.

<p align=center><img src="/docs/resources/images/adding_tasks_to_staging.png" alt="adding standby tasks" width="600"></p>

2. Under **Action**, select an action from the drop-down list.
3. Click **Add new +** and then enter the first few characters in the name of the certificate or property you want to add. When the entire name appears, click it.
4. If deploying a certificate or property, select a version number from the **Version** drop-down list. (This list does not appear when undeploying a certificate or property.)
5. To add more tasks to this action, repeat steps 3 and 4.
6. When you finish adding tasks, click **Add**.

## Deleting Standby Actions
To remove an individual standby action from a subqueue, click the trash icon on the far right side of the action. To remove all standby actions in a subqueue, click the trash icon next to **Version** in the header row.

**Note:** A precautionary message does not appear before you delete standby actions. Therefore, make sure you do not need a standby action before you delete it.

## Deploying Standby Actions
To deploy all of the actions under **Target: Staging** or **Target: Production**, click the **Deploy** button for that subqueue. 

**Note:** Deploying the actions in one subqueue does not deploy the actions in the other subqueue.

## Exiting the Standby Task Form
At the top-right of the form, click the **< Back** button to exit the Standby Task form.