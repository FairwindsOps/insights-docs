# Uploading Rules
### CLI
To manage rules in an infrastructure-as-code repository, you can use the [Insights CLI](/configure/cli/cli).
Be sure to read the [CLI documentation](/configure/cli/cli) before getting started here.

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
