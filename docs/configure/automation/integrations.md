---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Fairwinds Insights Automation Rules integrates with Slack, GitHub, Jira and PagerDuty"
---
# Integrations
The Fairwinds Insights Automation Rules integrate with various platforms such as Slack, GitHub, Jira and PagerDuty.

## Slack Notifications
If you have Slack set up in your Insights organization, you can use the
`sendSlackNotification` function to send messages to specific channels
or send messages via a webhook URL. The Slack message body can be customized to add things like mentions.

You can also utilize [Slack incoming webhooks](https://slack.com/help/articles/115005265063-Incoming-webhooks-for-Slack)
to send alerts.

The `sendSlackNotification` function takes three arguments:
* channel or webhook URL - String - destination for the message
* message (optional) - String - if not set, Insights will construct a default message from the Action Item
* isWebhook (optional) - Boolean - set to `true` if the first parameter is a webhook URL

### Slack Notifications Examples
```js
if (ActionItem.Severity >= CRITICAL_SEVERITY && ActionItem.IsNew) {
    sendSlackNotification("trivy-alerts");
}
```

```js
if (ActionItem.Severity >= CRITICAL_SEVERITY && ActionItem.IsNew) {
    sendSlackNotification("api-team", "@Jane, a new critical vulnerability! :scream:");
}
```

```js
if (ActionItem.Severity >= CRITICAL_SEVERITY && ActionItem.IsNew) {
  sendSlackNotification(
    "https://hooks.slack.com/services/T0123456/abc/def",
    "Uh oh! New vulnerability!",
    true);
}
```

## Tickets
Users can also create a Jira or GitHub issue from an Action Item using the `createTicket` function.
Only one ticket will be created per Action Item.

The `createTicket` function takes three arguments:
* integration - String - valid values are `GitHub` or `Jira`
* project - String - name of project
* labels - Array - a list of labels to put on the ticket

### Examples
```js
if (ActionItem.ResourceNamespace === "api") {
  createTicket("Jira", "API", ["bug"])
}
```

```js
if (ActionItem.ResourceNamespace === "api") {
  createTicket("GitHub", "acme-co/api-server", ["bug"])
}
```

```js
if (ActionItem.ResourceNamespace === "api") {
  createTicket("GitHub", "azure-org/Project Name", ["bug"])
}
```

## PagerDuty Incidents
If you have PagerDuty set up in your Insights organization, you can use the
`createPagerDutyIncident` function to create incidents. 

The `createPagerDutyIncident` function takes two arguments:

* `from` - String - email address of a valid user on the PagerDuty account
* `incident` - Object - expects the following properties:
  * `title` - String - a summary of the incident
  * `serviceID` - String - the ID of the service the incident belongs to
  * `urgency` - String - the urgency of the incident. Valid values are `high` or `low`
  * `bodyDetails` (optional) - String - provides a detailed description of the incident
  * `escalationPolicyID` (optional) - String - assign the incident to an escalation policy instead of assigning directly to a user
  * `assignmentIDs` (optional) - Array - a list of user IDs (only one assignee is supported at this time) to assign to the incident. Cannot be provided if escalationPolicyID is already specified.

### PagerDuty Examples
```js
if (ActionItem.Severity >= CRITICAL_SEVERITY && ActionItem.IsNew) {
  incident = {
		"title": ActionItem.Title,
		"serviceID": "PIIWGG1",
		"urgency": "high",
		"bodyDetails": ActionItem.Description,
		"assignmentIDs": ["P6GC8ZZ"]
	}
	createPagerDutyIncident("insights@acme-co.com", incident)
}
```

## HTTP Requests
Users can send arbitrary HTTP requests using the `sendHTTPRequest` function. For example:
```js
sendHTTPRequest("POST", "https://example.com/action-item", {
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(ActionItem),
});
```
