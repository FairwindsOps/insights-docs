---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to connect Jira for Fairwinds Insights. "
---
# Jira
Fairwinds Insights can connect to Jira in order to create Jira tickets
from Action Items.

## Installation
>We recommend creating a "robot account" to connect to your Insights organization
and granting this user the ability to create tickets on all of your Jira projects.
The linked account will show as the creator of any tickets created via Insights

1. Visit your organization's `Settings > Integration` page
2. Hover over `Jira` and click `Add Integration`
3. Once you have connected Jira to Insights, you can create tickets for Action Items manually or 
[automatically using Automation Rules](/configure/automation/integrations#tickets)

## Jira Tickets and Action Items
If an Action Item that is associated with a Jira ticket is marked as `Resolved` or `Fixed`,
the Jira ticket will automatically close.
