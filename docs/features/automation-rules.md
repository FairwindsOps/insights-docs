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
Check out [Automation Rules with the CLI](/features/insights-cli) for more information.

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

```js
if (ActionItem.PodLabels['app'] === 'nginx') {
  ActionItem.AssigneeEmail = 'infra-team@acme-co.com';
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
* `PodLabels`
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

The `sendSlackNotification` function accepts these arguments:
| Parameter              | Required? | Type    |                                                                            |
|------------------------|-----------|---------|----------------------------------------------------------------------------|
| channel or webhook URL | Yes       | string  | Destination of the message                                                 |
| message                | No        | string  | If not set, Insights will construct a default message from the Action Item |
| isWebhook              | No        | boolean | set to `true` if the first parameter is a webhook URL                      |


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

#### Microsoft Teams Notifications
If you have Microsoft Teams set up in your Insights organization, you can use the `sendMSTeamsNotification` function to send messages to specific channels
or send messages via a webhook URL using the `sendMSTeamsNotificationWebhook` function.

---
The `sendMSTeamsNotification` function accepts these arguments:
| Parameter              | Required? | Type   | Values   |                                                                            |
|------------------------|-----------|------- |----------|----------------------------------------------------------------------------|
| team                   | Yes       | string |          | Team ID (recommended) or Team name                                         |
| channel                | Yes       | string |          | Channel ID (recommended) or Channel name                                   |
| message                | No        | string |          | If not set, Insights will construct a default message from the Action Item |
| identifierType         | No        | string | id, name | If not set, `id` will be used                                              |

`Team ID` and `Channel ID` can be retrieved via the MS Teams UI - via the `Get link to channel`, you will a URL in the following format:
- `https://teams.microsoft.com/l/channel/{channelID}/{channelName}?groupId={teamID}&tenantId={tenantID}`

You will need to extract the URL decoded version of `teamID` and `channelID`

----

The `sendMSTeamsNotificationWebhook` function accepts these arguments:
| Parameter              | Required? | Type   | Values   |                                                                            |
|------------------------|-----------|------- |----------|----------------------------------------------------------------------------|
| webhookURL             | Yes       | string |          | Destination of the message                                                 |
| message                | No        | string |          | If not set, Insights will construct a default message from the Action Item |

When using `sendMSTeamsNotificationWebhook` you should [create incoming webhooks with Workflows for Microsoft Teams](https://support.microsoft.com/en-us/office/create-incoming-webhooks-with-workflows-for-microsoft-teams-8ae491c7-0394-4861-ba59-055e33f75498) to send alerts. The Workflow should use the following configuration:
* Template: `Post to a channel when a webhook request is received`
* Select `Team` and `Channel`

----

##### Examples
```js
if (ActionItem.Severity >= CRITICAL_SEVERITY && ActionItem.IsNew) {
    sendMSTeamsNotification("37fe380a-d030-454d-b32e-1072b32caf13", "19:nRatJw15Peh5ycoRw7YoOYKDc4LvfbcksGRZrSaLB8I1@thread.tacv2");
}
```

```js
if (ActionItem.Severity >= CRITICAL_SEVERITY && ActionItem.IsNew) {
    sendMSTeamsNotification("37fe380a-d030-454d-b32e-1072b32caf13", "19:nRatJw15Peh5ycoRw7YoOYKDc4LvfbcksGRZrSaLB8I1@thread.tacv2", "a new critical vulnerability! 😱");
}
```

```js
if (ActionItem.Severity >= CRITICAL_SEVERITY && ActionItem.IsNew) {
  sendMSTeamsNotificationWebhook(
    "https://prod-09.westus.logic.azure.com:443/workflows/775a223ca4c64d53bf13aec40b0ef985/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gs2OwhLrdWnrZqHxurfdCM2GsgDzqgPr7iAfL6bOWp4",
    "Uh oh! New vulnerability!");
}
```

#### Tickets
Users can also create a Jira, GitHub or Azure DevOps issue from an Action Item using the `createTicket` function.
Only one ticket will be created per Action Item.

The `createTicket` function accepts these arguments:
| Parameter           | Required? | Type   |                                                                           |
| ------------------- | --------- | ------ | ------------------------------------------------------------------------- |
| integration         | Yes       | string | valid values are `GitHub`, `Azure`, or `Jira`                             |
| project             | Yes       | string | project identifier (e.g., `API`)                                          |
| labels              | Yes       | array  | list of labels to put on the ticket (e.g., `["labelA","labelB"]`)         |
| customizable fields | No        | object | additional ticket metadata subject to integration provider specifications |
| issue type          | No        | string | issue identifier (e.g., `Bug`)                                            |


##### Jira Basic Auth:
Insights provides oath2 integration but also provides basic auth for Jira:

Steps to add basic auth to Insights:
- get e-mail and jira token. Example: user@example.com:api_token_string
- use some base 64 encode function over 'email:token' string.
```bash
echo -n "user@example.com:api_token_string" | base64
# dXNlckBleGFtcGxlLmNvbTphcGlfdG9rZW5fc3RyaW5n
```
- call insights API using the encoded token:

```js
curl 'https://insights.fairwinds.com/v0/organizations/${YOUR_ORG}/jira/basic-auth' \
  -X 'POST' \
  -H 'accept: application/json' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  --data-raw '{"url":"https://you-domain.atlassian.net","base64EncodedToken":"dXNlckBleGFtcGxlLmNvbTphcGlfdG9rZW5fc3RyaW5n"}' \
  --compressed -v
```

- after basic auth config is OK you can follow createTicket example below.


##### Create Ticket examples
```js
if (ActionItem.ResourceNamespace === "api") {
  createTicket("Jira", "API", ["bug"], null, "Task")
}
```

```js
if (ActionItem.ResourceNamespace === "api") {
  createTicket("GitHub", "acme-co/api-server", ["bug"])
}
```

```js
if (ActionItem.ResourceNamespace === "api") {
  createTicket("Azure", "azure-org/Project Name", ["bug"], {"/fields/System.AssignedTo":"test@fairwinds.com"}, "Epic", "Epic Category")
}
```

If the Action Item associated with the ticket is marked as `Resolved` or `Fixed`, the third party ticket will automatically close.

##### Customizable fields:
Insights supports the ability to customize how tickets are created within a target ticketing provider by adding a 4th parameter to the 'createTicket' function.
This parameter is a generic key/value object. 
For this customization some level of knowledge about the target Ticket Provider is required.


##### Jira example:

For reference, the Jira API for ticket creation can be found [here](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/).

Properties sent in the customizable fields field will overwrite the `fields` parameter in Jira API:

```js
customizableFields = {
   "assignee": {
      "id": "user123"
   },
   "customfield_10000": "09/Jun/19",
   "issuetype": {
      "name": "Task"
   }
}
if (ActionItem.ResourceNamespace === "api") {
  createTicket("Jira", "API", ["bug"], customizableFields)
}
```
In the example above the ticket will be assigned to "user123", we are adding a custom field named "customfield_10000" with value "09/Jun/19" and the issue type will be "Task", instead of our default value "Bug".

The payload sent to Jira will be like:
```js
fields: {
   "assignee": {
      "id": "user123"
   },
   "priority":  { 
      "name": "High"
   },
   "customfield_10000": "09/Jun/19",
   "issuetype": {
      "name": "Task"
   },
   "description": {
      "content": [
        {
          "content": [
            {
              "text": "My description",
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    },
   "environment": {
      "content": [
        {
          "content": [
            {
              "text": "UAT",
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    }
}
```

In the following example, the Jira ticket created from Insights will be associated to an existing parent issue:

```js
customizableFields = {
  "parent": {
    "key": "TEST-1"
  }
};
createTicket("Jira", "API", null, customizableFields, "Bug");
```

##### GitHub example:

Github provides a limited number of fields that can be customized:

```js
customizableFields = {
   "assignee": "user123",
   "assignees": ["user123","user345"] // Notice you should send either assignee or assignees
   "milestone": 1, // milestone number
   "labels": ["label_1","label_2"]
}
if (ActionItem.ResourceNamespace === "api") {
  createTicket("GitHub", "acme-co/api-server", ["bug"], customizableFields)
}
```
Those fields will be sent to GitHub Issue API. Reference can be found [here](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28).

Fields link example for a specific project:
https://dev.azure.com/staging/insightstest/_apis/wit/fields?api-version=6.1-preview.2

##### AzureDevops example:

It's possible to add some customizable fields to AzureDevops integration.
Create Work Items API reference can be found [here](https://learn.microsoft.com/en-us/rest/api/azure/devops/wit/work-items/create?view=azure-devops-rest-7.0&tabs=HTTP).
All fields available can be found here [here](https://learn.microsoft.com/en-us/rest/api/azure/devops/wit/fields/list?tabs=HTTP).

For each customizable field in Insights API we are going to create an op="add" in AzureDevops API. Example:


```js
customizableFields = {
   "/fields/System.Title": "Task title",
   "/fields/System.AssignedTo": "test@test.com",
   "/fields/System.Reason": "Added to backlog",
   "/fields/Microsoft.VSTS.Common.Priority": 3,
   "/fields/Microsoft.VSTS.Scheduling.Effort": 5
}
if (ActionItem.ResourceNamespace === "api") {
  createTicket("GitHub", "acme-co/api-server", ["bug"], customizableFields)
}
```

This will be translated to Azure Devops integration as:
```js
[
  {
    "op": "add",
    "path": "/fields/System.Title",
    "from": null,
    "value": "Task title"
  },
  {
    "op": "add",
    "path": "/fields/System.AssignedTo",
    "from": null,
    "value": "test@test.com"
  }
]
```

In this example a customizable title "Task title" will be added to the Work Item and it will be assigned to "test@test.com". 

In the following example, the Azure ticket created from Insights will be associated as a sub-issue to an existing parent issue:
```js
customizableFields = {
    "/relations/-": {
        "rel": "System.LinkTypes.Hierarchy-Reverse", 
        "url": "https://dev.azure.com/insights-test/staging/_workitems/edit/100"
    }
  };
createTicket("Azure", "insights-test/staging", null, customizableFields, "Epic");
```

Additional customizable fields supported by the Azure Integration can be found at Azure Devops API reference page mentioned above.

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

### Adding and Using Secrets
Users can store encrypted secrets into Insights and use them when creating Automation Rules using the `getSecret` function. 

Create a secret:
```js
curl "https://insights.fairwinds.com/v0/organizations/$YOUR_ORG/secrets/bulk" \
  -H "Authorization: Bearer $FAIRWINDS_TOKEN" \
  -H "accept: application/json, text/plain, */*" \
  -H "content-type: application/json" \
  --data-raw '[{"key": "api_token", "value": "12345"}]'
```

List current secrets:
```js
curl 'https://insights.fairwinds.com/v0/organizations/$YOUR_ORG/secrets' \
  -H 'Authorization: Bearer $FAIRWINDS_TOKEN' \
  -H 'content-type: application/json'
```

Using the saved secrets:
```js
sendHTTPRequest("POST", "https://example.com/action-item?api_token=" + getSecret("api_token"), {
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(ActionItem),
});
```

### AppGroups Associateship
Users can determine if an Action Item belongs to one or more App Groups based on its name. 

There are two functions available for this purpose. Both functions accept one or more App Group names and return a boolean indicating the result.

- `ActionItem.AppGroupMatchesAll` - Returns `true` if the Action Item is associated with all specified App Groups.
```js
if (ActionItem.AppGroupMatchesAll('dev-team', 'prod-team')) {
  // The Action Item belongs to both 'dev-team' and 'prod-team'
}
```

- `ActionItem.AppGroupMatchesAny` - Returns `true` if the Action Item is associated with at least one of the specified App Groups.
```js
if (ActionItem.AppGroupMatchesAny('dev-team', 'prod-team')) {
  // The Action Item belongs to either 'dev-team' or 'prod-team'
}
```