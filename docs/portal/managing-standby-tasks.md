# Managing Standby Tasks

When you deploy and undeploy certificates and properties, you can run the task immediately or select it as a standby task that will be run with other standby tasks at a later time. If you specify a deployment or undeployment as a standby task, it is placed in a queue, where it joins other certificate and property deployment and undeployment tasks that have been marked as standby.

Using the Standby Task page, you can view the tasks in the standby queue and run them all at one time. You can also add standby tasks to the queue.

##Displaying the Standby Task Page

To display the Standby Task page:
1. In the left pane, click **Certificate** or **Edge Configurations**.
2. Click a certificate name or property ID.
3. At the bottom-right of the form, click the **Deployment History** button.
4. At the top-right of the Deployment form, click the **Standby Task** button.<p>The Standby Task form is organized into two subqueues.<ul><li>The top subqueue shows tasks that will be sent to the CDN360 staging environment.</ul></li><ul><li>The bottom subqueue shows tasks that will be sent to the production environment.</ul></li>Each subqueue has its own search field for filtering standby tasks in that subqueue.

<p align=center><img src="/docs/resources/images/standby_tasks.png" alt="create new cert button menu" width="900"></p>

##Deleting Standby Tasks
To remove an individual standby task from a subqueue, click the trash icon on the far right side of the task. To remove all standby tasks in a subqueue, click the trash icon next to **Version** in the header row.
**Note:** A precautionary message does not appear before you delete standby tasks. Therefore, make sure you do not need a standby task before you delete it.
##Running Tasks
To run all of the tasks under **Destination: Staging** or **Destination: Production**, click the **Run** button for that subqueue. 
**Note:** Running the tasks in one subqueue does not run the tasks in the other subqueue.
##Exiting the Standby Task Page
At the top-right of the page, click the **< Back** button to exit the Standby Task page.