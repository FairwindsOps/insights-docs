---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation. Fairwinds Insights can automatically respond to Action Items. Learn How. "
---
# Integrations
## HTTP Requests
You can send arbitrary HTTP requests using the `sendHTTPRequest` function. For example:
```js
sendHTTPRequest("POST", "https://example.com/action-item", {
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(ActionItem),
});
```

## Slack Notifications
If you have attached a Slack installation to your organization, you can use the
`sendSlackNotification` function to send messages. You can pick which channel
to send to, or send via a webhook URL. You can also customize the message body
to add mentions etc.

You can also utilize [Slack incoming webhooks](https://slack.com/help/articles/115005265063-Incoming-webhooks-for-Slack)
to send alerts.

`sendSlackNotification` takes three arguments:
* channel or webhook URL - destination for the message
* message (optional) - if not set, Insights will construct a default message from the action item
* isWebhook (optional) - set to true if the first parameter is a webhook URL

#### Examples
```js
if (ActionItem.Severity >= CRITICAL_SEVERITY && ActionItem.IsNew) {
    sendSlackNotification("trivy-alerts");
}
```

```js
if (ActionItem.Severity >= CRITICAL_SEVERITY && ActionItem.IsNew) {
    sendSlackNotification("api-team", "@Jane there's a new critical vulnerability! :scream:");
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

## GitHub and Jira Tickets
You can also create a Jira or GitHub issue from an action item.
Note that only one ticket will be created per action item.

The `createTicket` function takes three arguments:
* integration - either `GitHub` or `Jira`
* project - your GitHub repo name, or your Jira project ID
* labels - a list of labels to put on the ticket

#### Examples
```js
if (ActionItem.Namespace === "api") {
  createTicket("Jira", "API", ["bug"])
}
```

```js
if (ActionItem.Namespace === "api") {
  createTicket("GitHub", "acme-co/api-server", ["bug"])
}
```

## PagerDuty Incidents
If you have attached a PagerDuty installation to your organization, you can use the
`createPagerDutyIncident` function to create incidents. The function takes two arguments:

* `from` - the email address of a valid user on the PagerDuty account
* `incident` - an object that expects the following properties:
  * `title` - a summary of the incident
  * `serviceID` - the id of the service that the incident belongs to
  * `urgency` - the urgency of the incident. Valid values are `high` or `low`
  * `bodyDetails` (optional) - provides a detailed description of the incident
  * `escalationPolicyID` (optional) - assign the incident to an escalation policy instead of assigning directly to a user
  * `assignmentIDs` (optional) - a list of user IDs (only one assignee is supported at this time) to assign to the incident. Cannot be provided if escalationPolicyID is already specified.

#### Examples
```js
if (ActionItem.Severity >= CRITICAL_SEVERITY && ActionItem.IsNew) {
  incident = {
		"title": ActionItem.Title,
		"serviceID": "PIIWGG1",
		"urgency": "high",
		"bodyDetails": ActionItem.Description,
		"assignmentIDs": ["P6GC8ZZ"] // optional
	}
	createPagerDutyIncident("insights@acme-co.com", incident)
}
```