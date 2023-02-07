---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Using the CLI to manage Automation Rules in Insights"
---
# Automation Rules With the CLI

You can use the Insights CLI to manage Automation Rules.
Be sure to first read the [Insights CLI documentation](/configure/cli/cli) which covers installation and preparation.

## Pushing Automation Rules to Insights
When pushing Automation Rules to Insights, the CLI expects a directory structure like the following:

```
.
+-- rules
|   +-- rule1.yaml
|   +-- another-rule.yaml
```

The file names must have a `.yaml` extension.

Once the files have been created, use the following command to push the Rules to Insights
```
insights-cli push rules
```

### Pushing Automation Rules to Insights Example
To upload an Automation Rule to Insights, create the file `api-action-items.yaml` in the `rules` sub-directory. This file will contain the
Rule JavaScript and accompanying metadata:

```yaml
name: "Assign API Action Items"
description: "Assigns all Action Items in the api namespace to api-team@acme-co.com"
action: |
  if (ActionItem.ResourceNamespace === 'api') {
    ActionItem.AssigneeEmail = 'api-team@acme-co.com';
  }
```

Next use the Insights CLI to push this Automation Rule to Insights

```bash
insights-cli push rules
```

## Automation Rule Metadata Fields
The following metadata fields can be specified in the Rule file:

* `name` - the name of the Automation Rule in Insights
* `description`- the description of the Automation Rule in Insights
* `context` - specify `Agent`, `CI/CD`, or `AdmissionController` (leave blank to specify all options)
* `cluster` - the name of a specific cluster this Rule should apply to
* `repository` - the name of a specific repository this Rule should apply to
* `reportType` - the type of report (e.g. `polaris`, `trivy`, etc.) this Rule should apply to

## Verifying an Automation Rule
To see a list of Automation Rules in your Insights organization, run:

```bash
insights-cli list rules
```

The rule won't be applied retroactively. The next time the Insights Agent, CI process or Admission Controller runs, the rule will be triggered.

To be sure the Rule functions correctly, you can manually trigger the Agent by running:

```bash
kubectl create job rule-test --from cronjob/$REPORT -n insights-agent 
```

Where $REPORT is `polaris`, `trivy` or any other report type you'd like to test.

## Deleting Automation Rules From Insights
By default, the Insights CLI will not _delete_ any automation rules from Insights. It will
only add or update them.
This means there might be some Automation Rules running in Insights that are not
tracked in your Infrastructure-as-Code (IaC) repository.

You can add the `--delete` flag to the `push rules` command, which
will delete any Automation Rules from Insights that **do not exist** in your IaC repository. Adding the `--dry-run` flag will explain which Rules would be deleted without making changes to Insights.

## Pushing Automation Rules Along With Other Configurations
Automation Rules can be pushed to Insights along with other Insights configurations using the single command `insights-cli push all`.

The `--delete` flag is not available for the `push all` command to avoid unexpected deletes of Insights CLI managed configuration resources that are added in the future.

For additional information see
* [OPA policies With CLI](/configure/cli/opa)
* [Policies Configuration with CLI](/configure/cli/settings)

## Testing Automation Rules
Before pushing Automation Rules to Insights, you can use the CLI to check if the results will work as expected.
For the testing, you will need to create a rule file and action item file. You also have the option to create an expected output file to compare to the actual result.

Rule file example, default file name is ./rule.js:
```js
if (ActionItem.ReportType === "trivy" && ActionItem.Cluster === "production") {
  ActionItem.Severity = 0.9;
}
```

Action item file example, default file name is ./action-item.yaml:
```yaml
title: Image has vulnerabilities
cluster: production
severity: 0.1
```

Expected output Action item file example:
```yaml
title: Image has vulnerabilities
cluster: production
severity: 0.9
```

Once the files have been created, use the following command to validate the rule against Insights:

```bash
insights-cli validate rule --insights-context  <insights context> --report-type <report type> {--automation-rule-file <rule file> --action-item-file <action item file>} [--expected-action-item <expected output file>]
```
Example:
```bash
insights-cli validate rule --insights-context Agent --report-type trivy --automation-rule-file ./rule.js --action-item-file ./action-items.yaml --expected-action-item ./expected-output.yaml
```

If the expected output is provided and the actual result matches, a success message is displayed:
```bash
INFO Success - actual response matches expected response 
```

If no expected output is provided the updated action item yaml is displayed:
```yaml
title: Image has vulnerabilities
cluster: production
severity: 0.9
```