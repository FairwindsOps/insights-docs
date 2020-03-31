# Membership
<!-- TODO: use npm -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/all.css">

For each organization, there are two levels of access:
* **members** can view any data in the Insights dashboard, but cannot make changes
* **admins** can make changes, install the Insights Agent, and access the API

## Managing Members
To add a new user to your organization, go to your organization's settings page.
You can then enter an email address, and decide what their level of access should be. For **members** you can further restrict access to particular clusters by unchecking **All Clusters** and clicking the check boxes next to each cluster that user should have access to.

<img :src="$withBase('/img/new-member.png')" alt="add a user">

Once a user has been added to the organization, you can edit their access by clicking the
<i class="text-warning fa fa-user-cog"></i>
icon next to their name

<img :src="$withBase('/img/edit-member.png')" alt="edit a user">

## Namespace Restrictions
Particular namespaces can be hidden from the UI for member users. This is helpful
if members don't need to see issues e.g. related to `kube-system`.

To hide a particular namespace from the UI, you can add the following annotation to it:
```
insights.fairwinds.com/adminOnly=true
```

Note that this **will not** prevent member users from accessing data about those namespaces -
they will still be able to view the raw reports, which may contain information about those
namespaces. These namespaces will only be hidden from the Action Items table and other
visual interfaces.
