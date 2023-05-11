---
meta:
  - name: description
    content: "The Fairwinds Insights CLI is a tool for interacting with the API. It can be used to manage Policies and Automation Rules in Insights and validate OPA policies offline"
---
# Insights CLI
## About
The [Fairwinds Insights Command-Line Interface](https://github.com/FairwindsOps/insights-cli) (CLI)
is a command-line tool for interacting with
the Fairwinds Insights API. In particular, it makes it easy to manage
Insights Policies and Automation Rules as code and validate OPA policies offline.

## Installation
### Homebrew Tap
```bash
brew install FairwindsOps/tap/insights
```

### Binary
Install the binary from our [releases](https://github.com/FairwindsOps/insights-cli/releases?q=draft%3Afalse+prerelease%3Afalse&expanded=true) page.

## Setup
To start using the Insights CLI, you'll need to retrieve your admin token
from your organization's `Settings` page at `insights.fairwinds.com`.

Set that token in your environment with:

```bash
export FAIRWINDS_TOKEN=$YOUR_ADMIN_TOKEN
```

### fairwinds-insights.yaml
You can set up a YAML file containing details for the CLI, including your
organization name and hostname (required for self hosted deployments):
```yaml
options:
  organization: acme-co
  hostname: https://insights.example.com
```

By default, the CLI will look for the file `fairwinds-insights.yaml` in the current directory, but its
location can be configured by passing in the `--config <filename>` flag.

If the `fairwinds-insights.yaml` file does not exist, the `--organization` flag must be used when running the CLI,
passing in the name of your organization.

## Syncing
### Policy Configuration
You can use the Insights CLI to manage the configuration of Policies.
Be sure to first read the [Insights CLI documentation](features/insights-cli) which covers installation and preparation.

Check out the [Policy Configurator](features/policies) documentation on use cases for configuring Policies.

```bash
insights-cli push settings
```

### Custom OPA Policies
You can use the Insights CLI to manage OPA policies and validate OPA policies offline.
Be sure to first read the [Insights CLI documentation](features/insights-cli) which covers installation and preparation.

#### Pushing to Insights
When pushing OPA policies to Insights, the CLI expects a directory structure like the following:
```
.
+-- opa
|   +-- policy1
|       +-- policy.rego
|   +-- policy2
|       +-- policy.rego
```
The Policy file name must be `policy.rego`.

Once the files have been created, use the following command to push the OPA policies to Insights:
```
insights-cli push opa
```

#### Example
To upload an OPA policy that requires `replicas` to be specified for Kubernetes Deployments, create the file `./opa/replicas/policy.rego`:

```rego
package fairwinds

replicasRequired[actionItem] {
  input.kind == "Deployment"
  input.spec.replicas == 0
  actionItem := {
    "title": concat(" ", [input.kind, "does not have replicas set"]),
    "description": "All deployments at acme-co must explicitly set the number of replicas",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
    "severity": 0.5
  }
}
```

Note that the OPA policy first checks that `input.kind` is `Deployment` which ensures this only applies to Kubernetes Deployments.

Next use the Insights CLI to push this OPA policy to Insights:

```bash
insights-cli push opa
```

#### Deleting OPA Policies From Insights
By default, the Insights CLI will not _delete_ any OPA policies from Insights. It will
only add or update them.
This means there might be some OPA policies running in Insights that are not
tracked in your Infrastructure-as-Code (IaC) repository.

You can add the `--delete` flag to the `push opa` command, which
will delete any OPA policies from Insights that **do not exist** in your IaC repository. Adding the `--dry-run` flag will explain which Policies would be deleted without making changes to Insights.

### Automation Rules
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

#### Example
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

#### Automation Rule Metadata Fields
The following metadata fields can be specified in the Rule file:

* `name` - the name of the Automation Rule in Insights
* `description`- the description of the Automation Rule in Insights
* `context` - specify `Agent`, `CI/CD`, or `AdmissionController` (leave blank to specify all options)
* `cluster` - the name of a specific cluster this Rule should apply to
* `repository` - the name of a specific repository this Rule should apply to
* `reportType` - the type of report (e.g. `polaris`, `trivy`, etc.) this Rule should apply to

#### Verifying an Automation Rule
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

#### Deleting Automation Rules From Insights
By default, the Insights CLI will not _delete_ any automation rules from Insights. It will
only add or update them.
This means there might be some Automation Rules running in Insights that are not
tracked in your Infrastructure-as-Code (IaC) repository.

You can add the `--delete` flag to the `push rules` command, which
will delete any Automation Rules from Insights that **do not exist** in your IaC repository. Adding the `--dry-run` flag will explain which Rules would be deleted without making changes to Insights.

## Testing
You can use the insights-cli to test your OPA policies and automation rules. This can also be
integrated into the CI/CD pipeline for the Infrastructure-as-Code repo containing
your Insights configuraiton.

### Custom OPA Policies
The Insights CLI can validate OPA policies which is useful for local policy development or in your CI/CD workflow. 
Validation includes:

* Verifying rego syntax - the query language used by OPA policies
* Verifying Insights provided functions, such as `kubernetes()` and `insightsinfo()`, have the correct number of parameters
* Displaying optional rego `print` statements to aide in debugging
* Showing Policy output, and verifying the syntax of any Insights Action Item
* Require the OPA policy to succeed or fail in order to pass validation. Configurable via a command-line flag or the extension of the Kubernetes manifest yaml file name

The `insights-cli validate opa` command requires an OPA policy file, and a Kubernetes manifest file that will be passed as input to the Policy:

```bash
insights-cli validate opa -r not-in-namespace/policy.rego -k test-pod.yaml
```

Run `insights-cli validate opa --help` for more options when validating Policies.

### Requiring Policy Success or Failure

The `--expect-action-item` command-line flag configures whether validation expects a policy to output an Insights Action Item. By default, policies are expected to generate a single Action Item to be considered valid. Setting `--expect-action-item=false` expects Kubernetes manifest files to cause the OPA policy to not output an Action Item.

Alternatively, the extension of the Kubernetes manifest file will determine whether that Policy is expected to produce an Action Item:

* `.success.yaml` - the OPA policy is not expected to output an Action Item
* `.failure.yaml` - the OPA policy is expected to output an Action Item
* Any other `*.yaml` - the expectation is configured by the `--expect-action-item` command-line flag

When validating OPA policies in batch mode, each Policy can have a mix of the above Kubernetes yaml files, all of which will be used for validation. For example:

```
.
+-- file.rego
+-- file.yaml
+-- another-policy.rego
+-- another-policy.success.yaml
+-- another-policy.failure.yaml
+-- another-policy.yaml
```

### Batch Validation of OPA Policies for CI/CD
The `--batch-dir` option instructs the `insights-cli validate opa` command to process all `.rego` files in the specified directory.

When validating Policies using this option, the command expects the following directory structure:
```
.
+-- file.rego
+-- file.yaml
+-- another-policy.rego
+-- another-policy.yaml
```

The name of the `.rego` and `.yaml` files must match.

Next use the Insights CLI to validate all OPA policies

```bash
insights-cli validate opa --batch-directory <directory_path>
```


## Automation Rules
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

