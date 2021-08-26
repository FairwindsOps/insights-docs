---
meta:
  - name: title
    content: Fairwinds Insights Management Membership
  - name: description
    content: Fairwinds Insights provides fine-grained access control so you can decide who can view and edit action items for your Kubernetes environment
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
---
# Membership
<!-- TODO: use npm -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/all.css">

In your organization's settings page, you can use Team Management to view a list
of all users in your organization.
<img :src="$withBase('/img/user-list.png')" alt="list of users">

You can use this page to add your teammates and coworkers to your Insights organization.
You can also designate certain members as `owners`, who will be able to add new members,
manage permissions, and perform administrative actions like deleting and adding clusters.

<img :src="$withBase('/img/new-member.png')" alt="add a user">


## Teams
Once you've added people to your organization, you'll need to grant them
access to specific resources by adding them to one or more teams.

Specifically, each team has access to a list of:
* clusters
* namespaces
* repositories

Every organization comes with a built-in `Full Access` team, which
can access all resources. The creator of the organization is automatically
added to this team.

<img :src="$withBase('/img/teams.png')" alt="full access team">

Use the `Add team` button to add a new team with more fine-grained access.
<img :src="$withBase('/img/create-team.png')" alt="full access team">

From here, you can select which clusters, namespaces, and repositories the
user will get access to. Note that if you select `All` for these, the
team will have access to any new resources that get added as well

<img :src="$withBase('/img/add-clusters-to-team.png')" alt="full access team">

Once your team has been created, you can add new members to the team.
Team members can have one of three roles:
* a `viewer` can only see data associated with this team
* an `editor` can take actions like assigning action items or marking them as resolved
* an `admin` can do all of the above, plus add new members to the team
<img :src="$withBase('/img/add-members-to-team.png')" alt="full access team">

