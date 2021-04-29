# Automation Rules

Fairwinds Insights can automatically respond to Action Items, setting things like
the assignee, resolution, and severity level for Action Items that match a certain pattern.
For instance, you could create automation rules to:
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
* `Description`
* `Remediation`
* `Notes`

### Sending Slack Notifications
If you have attached a Slack installation to your organization, you can use the
`sendSlackNotification` function to send messages. You can pick which channel
to send to, or send via a webhook URL. You can also customize the message body
to add mentions etc.

#### Examples
```js
if (ActionItem.Severity >= DANGER_SEVERITY && ActionItem.IsNew) {
    sendSlackNotification("trivy-alerts");
}
```

```js
if (ActionItem.Severity >= DANGER_SEVERITY && ActionItem.IsNew) {
    sendSlackNotification("api-team", "@Jane there's a new critical vulnerability! :scream:");
}
```

## Publishing Rules

### User Interface
You can use the Automation tab to add new rules, edit rules, and enable/disable them.

<img :src="$withBase('/img/automation-rules-ui.png')" alt="rbac tab">


### CLI
To publish a new rule, you can use the [CLI](/configure/policy/cli).

First, create a new YAML file in the `rules` directory. This will contain your
JavaScript, as well as some metadata.
```yaml
name: "Assign API Action Items"
description: "Assigns all Action Items in the api namespace to api-team@"
action: |
  if (ActionItem.ResourceNamespace === 'api') {
    ActionItem.AssigneeEmail = 'api-team@acme-co.com';
  }
```

Then run:
```bash
FAIRWINDS_TOKEN=$YOUR_TOKEN insights policy sync --rules --organization $YOUR_ORG
```

While the rule won't be applied retroactively, the next time the agent,
CI process, or Admission Controller runs, the rule will be triggered.

If you want to be sure the rule worked, you can manually trigger the agent by running:
```
kubectl -n insights-agent create job rule-test --from cronjob/$REPORT
```
where $REPORT is `polaris`, `trivy`, or any other report type you'd like to test.

#### Metadata Fields
* `name`
* `description`
* `context` - one of `Agent`, `CI/CD`, or `AdmissionController` (or leave blank for all three)
* `cluster` - the name of a specific cluster this rule should apply to
* `repository` - the name of a specific repo this rule should apply to
* `reporttype` - the type of report (e.g. `polaris` or `trivy`) this rule should apply to
