---
meta:
  - name: title
    content: Fairwinds Insights Management Membership
  - name: description
    content: Fairwinds Insights provides two levels of access members and admins so you can manage who can view or make changes. Read the documentation.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
---
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

## Single Sign-On - Beta

Fairwinds Insights supports Single Sign-On via a SAML identity provider.

### Identity Provider Setup

ACS URL: `https://insights.fairwinds.com/v0/organizations/<orgname>/auth/saml`
Entity ID: `fairwinds-insights`
Name ID: Email Address
Attributes:
* firstName: User's first name
* lastName: User's Last Name
* isOwner: true if this user should have admin access to the org. False if they should not. Omit this attribute to handle authorization within Insights
* teams: A list of teams to grant the user access to. Defaults to view access to each team but an additional role can be specified as `<team>/<role>`

### Insights Setup

The `https://insights.fairwinds.com/v0/organizations/<orgname>/saml` endpoint can be used to save SAML settings.

A URL to download metadata from and a list of email domain names to allow SAML access from are the configurable options.

```
{
  "metadataUrl": "<url>",
  "domains": [
    {
        "emailDomain": "example.com"
    }
  ]
}
```

The `https://insights.fairwinds.com/v0/organizations/<orgname>/sso-strict` endpoint can be used to restrict an organization to only be viewable to a user that has logged in via SAML.

```
{
  "enabled": true
}
```
It's recommended to make sure that you have the admin token for your organization saved somewhere safe before enabling this because it's possible to be locked out of your organization.

### Logging in

Currently to login via SAML you must go to a special URL: `https://insights.fairwinds.com/v0/organizations/<orgname>/auth/saml`

