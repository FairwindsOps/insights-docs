# Azure

## Azure DevOps
We have preliminary support for Azure DevOps ticketing.

To connect your account, visit:
```
https://insights.fairwinds.com/v0/organizations/$YOUR_ORG_NAME/azure/auth
```

You can then create Azure DevOps tickets using Automation Rules:

```js
createTicket("Azure", "Project Name", ["Tags"]);
```
