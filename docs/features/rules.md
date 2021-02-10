# Automation Rules

Fairwinds Insights can automatically respond to Action Items, setting things like
the assignee, resolution, and severity level for Action Items that match a certain pattern.
For instance, you could create automation rules to:
* Mark issues in the `kube-system` namespace as `will not fix`
* Assign issues in the `api` namespace to `api-team@acme-co.com`
* Send a Slack message whenever a critical vulnerability appears in a production cluster

## Writing Rules
Rules are written in JavaScript. Here's an example:

```js
if (ActionItem.ResourceNamespace === 'api') {
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

The following fields can be edited:
* `Severity`
* `Resolution`
* `AssigneeEmail`
* `Notes`

## Publishing Rules

### User Interface
> Coming Soon!

### CLI
To publish a new rule, you can use the [CLI](/features/cli).

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
* `context` - one of `Agent`, `CI`, or `Admission`, or leave blank for all three
* `cluster` - the name of a specific cluster this rule should apply to
* `repository` - the name of a specific repo this rule shoudl apply to
* `reporttype` - the type of report (e.g. `polaris` or `trivy`) this rule should apply to
