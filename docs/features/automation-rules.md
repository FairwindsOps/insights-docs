---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Fairwinds Insights Automation Rules can be used to automate certain actions within Insights"
---
# Automation Rules
## About
Fairwinds Insights can automate certain actions within Insights.
For instance you could create Automation Rules to:
* Set Assignee, Resolution and Severity level for Action Items that match a certain pattern
* Create Action Item exceptions for resources in a cluster or namespace
* Send a Slack message when certain Action Items are detected in clusters

## Creating Automation Rules
### Using the Insights UI
1. Visit your organization's `Automation` page
2. Click the `Create Custom Rule` button

You'll see a sample Rule that modifies the description of low severity Action Items. This should give you a quick sense for
how to write Automation Rules for Insights.

Insights also comes with several templates for Automation Rules which you can modify as needed. To view these templates:

1. Visit your organization's `Automation` page
2. Click the `Create From Template` button

### Using the Insights CLI
To manage rules in an infrastructure-as-code repository, you can use the Insights command-line interface (CLI).
Check out [Automation Rules with the CLI](/configure/cli/automation-rules) for more information.

## Writing Automation Rules
Insights Automation Rules are written in JavaScript. The main input is `ActionItem`, which contains
information about the issue detected.

For example, we can set the Assignee for certain Action Items:
```js
if (ActionItem.ResourceNamespace === 'api') {
  ActionItem.AssigneeEmail = 'api-team@acme-co.com';
}
```

```js
if (ActionItem.ResourceLabels['app'] === 'polaris') {
  ActionItem.AssigneeEmail = 'api-team@acme-co.com';
}
```

## API
For the `ActionItem` input, the following fields are available:
* `Category`
* `Cluster`
* `EventType`
* `IsNew`
* `IsChanged` (`true` if Title, Description, or Fixed has changed from the most recent report)
* `NamespaceAnnotations`
* `NamespaceLabels`
* `ReportType`
* `ResourceAnnotations`
* `ResourceKind`
* `ResourceLabels`
* `ResourceName`
* `ResourceNamespace`
* `ResourceContainer`
* `Severity`

To determine the `ReportType` and `EventType` of a certain Action Item:
1. Visit your organizations `Policy` page
2. Click on a Policy in the table
3. Look up the `Report` and `Event Type` of the Policy

<img :src="$withBase('/img/determine-event-type.png')" alt="determine event type">

### Editable Fields
The following fields for `ActionItem` can be edited:
* `AssigneeEmail` - String - email address of the Assignee in Insights
* `Category` - String - valid values are `Efficiency`, `Reliability` or `Security`
* `Description` - String - description of the Action Item
* `Remediation` - String - remediation for the Action Item
* `Resolution` - Constant - valid values are `WILL_NOT_FIX_RESOLUTION` or `WORKING_AS_INTENDED_RESOLUTION`
* `Severity` - Constant - valid values are `CRITICAL_SEVERITY`, `HIGH_SEVERITY`, `MEDIUM_SEVERITY`, `LOW_SEVERITY`
* `Title` - String - title of the Action Item

### Integrations
#### Slack Notifications
If you have Slack set up in your Insights organization, you can use the
`sendSlackNotification` function to send messages to specific channels
or send messages via a webhook URL. The Slack message body can be customized to add things like mentions.

You can also utilize [Slack incoming webhooks](https://slack.com/help/articles/115005265063-Incoming-webhooks-for-Slack)
to send alerts.

The `sendSlackNotification` function takes three arguments:
* channel or webhook URL - String - destination for the message
* message (optional) - String - if not set, Insights will construct a default message from the Action Item
* isWebhook (optional) - Boolean - set to `true` if the first parameter is a webhook URL

##### Examples
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

#### Tickets
Users can also create a Jira, GitHub or Azure DevOps issue from an Action Item using the `createTicket` function.
Only one ticket will be created per Action Item.

The `createTicket` function takes three arguments:
* integration - String - valid values are `GitHub`, `Azure`, or `Jira`
* project - String - name of project
* labels - Array - a list of labels to put on the ticket

##### Examples
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
  createTicket("Azure", "azure-org/Project Name", ["bug"])
}
```

If the Action Item associated with the ticket is marked as `Resolved` or `Fixed`, the third party ticket will automatically close.

#### PagerDuty Incidents
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

##### Examples
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

#### HTTP Requests
Users can send arbitrary HTTP requests using the `sendHTTPRequest` function. For example:
```js
sendHTTPRequest("POST", "https://example.com/action-item", {
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(ActionItem),
});
```

## Adding and Using Secrets
Users can store encrypted secrets into Insights and use them when creating Automation Rules using the `getSecret` function. 

Create a secret:
```js
curl 'https://insights.fairwinds.com/v0/organizations/$YOUR_ORG/secrets/bulk' \
  -H 'Authorization: Bearer $FAIRWINDS_TOKEN' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'content-type: application/json' \
  --data-raw '[{"key": "$SECRET_KEY", "value": "$VALUE"}]'
```

List current secrets:
```js
curl 'https://insights.fairwinds.com/v0/organizations/$YOUR_ORG/secrets' \
  -H 'Authorization: Bearer $FAIRWINDS_TOKEN' \
  -H 'content-type: application/json'
```

Using the saved secrets:
```js
sendHTTPRequest("POST", "https://example.com/action-item?integrationKey=" + getSecret("$SECRET_KEY"), {
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(ActionItem),
});
```

