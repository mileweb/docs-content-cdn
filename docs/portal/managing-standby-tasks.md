# Managing Standby Actions

When you deploy and undeploy certificates and properties, you can perform  the action immediately or move it to a standby queue, where it will join other standby actions waiting to be run.

Using the Standby Task page, you can view all standby actions in the queue and run them all at one time.

##Displaying the Standby Task Page

To display the Standby Task page:
1. In the left pane, click **Certificate** or **Edge Configurations**.
2. Click a certificate name or property ID.
3. At the bottom-right of the form, click the **Deployment History** button.
4. At the top-right of the Deployment form, click the **Standby Task** button.<p>The Standby Task form is organized into two subqueues.<ul><li>The top subqueue shows actions for the CDN360 staging environment.</ul></li><ul><li>The bottom subqueue shows actions for the production environment.</ul></li>Each subqueue has its own search field for filtering standby actions in that subqueue.

<p align=center><img src="/docs/resources/images/standby_tasks.png" alt="create new cert button menu" width="900"></p>

##Deleting Standby Actions
To remove an individual standby action from a subqueue, click the trash icon on the far right side of the action. To remove all standby actions in a subqueue, click the trash icon next to **Version** in the header row.
**Note:** A precautionary message does not appear before you delete standby actions. Therefore, make sure you do not need a standby action before you delete it.
##Running Standby Actions
To run all of the actions under **Destination: Staging** or **Destination: Production**, click the **Run** button for that subqueue. 
**Note:** Running the actions in one subqueue does not run the actions in the other subqueue.
##Exiting the Standby Task Page
At the top-right of the form, click the **< Back** button to exit the Standby Task form.