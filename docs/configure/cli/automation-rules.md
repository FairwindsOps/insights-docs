# Interacting With Automation Rules Via the CLI

You can use the Insights Command-line Interface (CLI) To manage automation rules.
Be sure to first read the [general CLI documentation](/configure/cli/cli) which covers instllation and prerequisites.

## Pushing Automation Rules to Insights
The Insights CLI push commands expect a directory structure like the following when pushing automation rules:

```
.
+-- rules
|   +-- rule1.yaml
|   +-- another-rule.yaml
```

* Note that the base file name (minus the .yaml extension) is arbitrary.

### Example
To upload an automation rule to Insights, create the file `api-action-items.yaml` in the `rules` sub-directory. This will contain the
rule JavaScript and accompanying metadata.

```yaml
name: "Assign API Action Items"
description: "Assigns all Action Items in the api namespace to api-team@acme-co.com"
action: |
  if (ActionItem.ResourceNamespace === 'api') {
    ActionItem.AssigneeEmail = 'api-team@acme-co.com';
  }
```

Next use the Insights CLI to push this automation rule to Insights

```bash
FAIRWINDS_TOKEN=YOUR_TOKEN insights-cli push rules --organization YOUR_ORG_NAME
```

* This pushes automation rules from the current directory, expecting it to contain the `rules` sub-directory.
* Typically the `FAIRWINDS_TOKEN` environment variable is set elsewhere and is not included each time the CLI is run.
* The Insights organization can also be specified in a configuration file, described in the [general Insights CLI documentation](/configure/cli/cli).
* Use the `--push-directory` option to specify an alternative base directory.
* It is also possible to override the name of the `rules` sub-directory - see `insights-cli push rules --help` for details.

#### Automation Rule Metadata Fields
The following metadata fields can be specified in the rule file:

* `name`
* `description`
* `context` - one of `Agent`, `CI/CD`, or `AdmissionController` (or leave blank for all three)
* `cluster` - the name of a specific cluster this rule should apply to
* `repository` - the name of a specific repo this rule should apply to
* `reporttype` - the type of report (e.g. `polaris` or `trivy`) this rule should apply to

### Verifying Success
To see a list of automation rules in your Insights organization, you can run:

```bash
FAIRWINDS_TOKEN=YOUR_TOKEN insights-cli list rules --organization YOUR_ORG_NAME
```


The next time the Insights agent,
CI process, or Admission Controller runs, the rule will be triggered. The rule won't be applied retroactively.

To be sure the rule functions immediately, you can manually trigger the agent by running:

```bash
kubectl -n insights-agent create job rule-test --from cronjob/$REPORT
```

* Where $REPORT is `polaris`, `trivy`, or any other report type you'd like to test.

#### Automation Rule Metadata Fields
The following metadata fields can be specified in the rule file:

* `name`
* `description`
* `context` - one of `Agent`, `CI/CD`, or `AdmissionController` (or leave blank for all three)
* `cluster` - the name of a specific cluster this rule should apply to
* `repository` - the name of a specific repo this rule should apply to
* `reporttype` - the type of report (e.g. `polaris` or `trivy`) this rule should apply to

### Deleting From Insights
By default, the Insights CLI will not _delete_ any automation rules from Insights - it will
only add or update them.
This means there might be some automation rules running in Insights that are not
tracked in your IaC repository.

You can add the `--delete` flag to the `push rules` command, which
will delete any automation rules from Insights that **do not exist** in your IaC repository. Adding the `--dry-run` flag will explain which rules would be deleted without making changes to Insights.

## Pushing Automation Rules Along With OPA Policies
Both automation rules and OPA policies can be pushed to Insights using the single command `insights-cli push all`.

* Note that the `--delete` flag is not available for the `push all` command, to avoid unexpected deletes of insights-cli managed configuration resources that are added in the future.

For additional information about OPA policies, see the [CLI OPA documentation](configure/cli/opa).
