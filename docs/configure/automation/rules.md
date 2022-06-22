---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Fairwinds Insights Automation Rules can be used to automate certain actions within Insights"
---
# Automation Rules
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

### Automation Rule Input
For the `ActionItem` input, the following fields are available:
* `Category`
* `Cluster`
* `EventType`
* `IsNew`
* `ReportType`
* `ResourceAnnotations`
* `ResourceKind`
* `ResourceLabels`
* `ResourceName`
* `ResourceNamespace`
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
