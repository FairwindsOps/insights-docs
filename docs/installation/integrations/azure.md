---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to connect Fairwinds Insights to Azure DevOps"
---
# Azure DevOps
Fairwinds Insights can connect to Azure DevOps in order to create Work Items from Action Items.

## Installation
> We recommend creating a "robot account" to connect to your Insights organization
and granting this user the ability to create Work Items on all of your Azure DevOps projects.
The linked account will show as the creator of any Work Items created via Insights

1. Visit your organization's `Settings > Integration` page
2. Hover over `Azure DevOps` and click `Add Integration`
3. Once you have connected Azure DevOps to Insights, you can create Work Items for Action Items manually or 
[automatically using Automation Rules](/configure/automation/integrations#tickets)

## Azure DevOps Work Items and Action Items
If an Action Item that is associated with an Azure DevOps work item is `Resolved` or `Fixed`, the Azure DevOps
work item will automatically close.
