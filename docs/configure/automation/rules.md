---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation. Fairwinds Insights can automatically respond to Action Items. Learn How. "
---
# Automation Rules

Fairwinds Insights can automatically respond to Action Items, setting things like
the assignee, resolution, and severity level for Action Items that match a certain pattern.
For instance, you could create automation rules to:
* Block out of the box or custom policies at the time of Admission
* Mark Action Items in the `kube-system` namespace as `will not fix`
* Assign Action Items in the `api` namespace to `api-team@acme-co.com`
* Send a Slack message whenever a critical vulnerability appears in a production cluster

## Writing Rules
Rules are written in JavaScript.

#### Examples
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

The main input is `ActionItem`, which contains
information about the issue detected. The following fields are available:
* `Cluster`
* `ResourceName`
* `ResourceNamespace`
* `ResourceKind`
* `ReportType`
* `EventType`
* `Severity`
* `Category`
* `IsNew`
* `ResourceLabels`
* `ResourceAnnotations`

**Please see the [Supported Checks](https://insights.docs.fairwinds.com/reports/supported-checks/) page for a list of available `EventType` and `ReportType` options.**

The following fields can be edited:
* `Severity`
* `Resolution` - can be set to the constants `WILL_NOT_FIX_RESOLUTION` or `WORKING_AS_INTENDED_RESOLUTION`
* `AssigneeEmail`
* `Notes`

Action Item severity is defined as:
* 0.0 - None
* 0.1 to 0.39 - Low
* 0.4 to 0.69 - Medium
* 0.7 to .89 - High
* 0.9 to 1.0 - Critical 

## Publishing Rules

### User Interface
You can use the Automation tab to add new rules, edit rules, and enable/disable them.

<img :src="$withBase('/img/automation-rules-ui.png')" alt="rbac tab">


### CLI
To manage rules in an infrastructure-as-code repository, you can use the [Insights CLI](/configure/cli/automation-rules).
Be sure to read the [CLI documentation](/configure/cli/cli) before getting started here.

