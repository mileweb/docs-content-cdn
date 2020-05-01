# Managing CNAMEs 

A Canonical Name Record (or "CNAME") is a DNS record used to alias one domain name to a different domain name. The CNAME performs aliasing by pointing a domain or subdomain to the IP address of the destination hostname. In this way, if the IP address of the destination hostname changes, you will not need to change your DNS records because the CNAME will have the same IP address.

CNAMEs are managed from the CNAME page. Using this page, you define CNAMEs to which you can point your hostnames. To display this page, click **CNAMEs** in the left pane.

The following figure shows the key elements on the page, and the table following the figure describes them.

![null](</docs/resources/images/CNAMES_Overview.png>)

| **Fields**   | **Description**                                                 |
| :----------: | --------------------------------------------------------------- |
| 1            | To filter CNAMEs, type characters in this field and then press the Enter key. All CNAMEs that do not contain the typed characters are hidden. Filtering is not case-sensitive. To remove the filter, click the **x** icon at the right side of the search field.                                              |
| 2            | Each CNAME appears on its own row.                              |
| 3            | The **Actions** drop-down list on each row has options to [edit a CNAME](</docs/portal/cnames/editing-cname.md>) and [delete a CNAME](</docs/portal/cnames/deleting-cname.md>).                                               |
| 4            | The **Create CNAME** button allows you to [create new CNAMEs](</docs/portal/cnames/creating-cname.md>).                                          |