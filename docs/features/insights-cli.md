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

Check out the [Policy Configuration](/features/policies) documentation on use cases for configuring Policies.

```bash
insights-cli push settings
```

### Custom OPA Policies
When pushing OPA policies to Insights, the CLI expects a directory structure like the following:

```
.
+-- opa
|   +-- policy-name
|       +-- policy-name-check.rego
|       +-- policy-name-check.success.yaml
|       +-- policy-name-check.failure.yaml
|   +-- second-policy-name
|       +-- second-policy-name-check.rego
```

_Note that the `.success.yaml` and `.failure.yaml` files are not required._

Once the files have been created, use the following command to push the OPA policies to Insights:
```
insights-cli push opa
```

##### Caveats

Insights supports both OPA v1 and OPA v2, but we recommend using OPA v2. To ensure the CLI resolves to using OPA v2, please adhere to the following rules:

- Do not name the rego policy file as `policy.rego` if there are **any** `yaml` files in the custom policy directory.
- Do not name the rego policy file the same as the custom policy directory if there are **any** `yaml` files in that directory.

If any of the above conditions are met, the CLI will assume you are running OPA v1 custom checks.

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
|   +-- rule-name.yaml
|   +-- second-rule-name.yaml
```

The file names must have a `.yaml` extension.

Once the files have been created, use the following command to push the Rules to Insights
```
insights-cli push rules
```

#### Example
To upload an Automation Rule to Insights, create the file `rules/api-action-items.yaml` in the `rules` sub-directory:

```yaml
name: "assign-api-action-items"
description: "Assigns all Action Items in the api namespace to api-team@acme-co.com"
action: |
  if (ActionItem.ResourceNamespace === 'api') {
    ActionItem.AssigneeEmail = 'api-team@acme-co.com';
  }
```

#### Automation Rule Metadata Fields
The following metadata fields can be specified in the Rule file:

* `name` - the name of the Automation Rule in Insights
* `description`- the description of the Automation Rule in Insights
* `context` - specify `Agent`, `CI/CD`, or `AdmissionController` (leave blank to specify all options)
* `cluster` - the name of a specific cluster this Rule should apply to
* `repository` - the name of a specific repository this Rule should apply to
* `reportType` - the type of report (e.g. `polaris`, `trivy`, etc.) this Rule should apply to

#### Deleting Automation Rules From Insights
By default, the Insights CLI will not _delete_ any automation rules from Insights. It will
only add or update them.
This means there might be some Automation Rules running in Insights that are not
tracked in your Infrastructure-as-Code (IaC) repository.

You can add the `--delete` flag to the `push rules` command, which
will delete any Automation Rules from Insights that **do not exist** in your IaC repository. Adding the `--dry-run` flag will explain which Rules would be deleted without making changes to Insights.

### App Groups

You can use the Insights CLI to manage the configuration of App Groups.

Check out the [App Groups](/features/app-groups) documentation on use cases for configuring App Groups.

```bash
insights-cli push app-groups
```

#### Syncing from Fairwinds Insights
If you were managing App Groups via Fairwinds Insights UI. You can download and sync those definitions using the following command:

```
insights-cli download app-groups
```

Note that the folder `app-groups` must exists.

#### Adding App Groups
When pushing App Groups to Insights, the CLI expects a directory structure like the following:
```
.
+-- app-groups
|   +-- app-group.yaml
|   +-- second-app-group.yaml
```

Once the files have been created, use the following command to push the App Groups to Insights:
```
insights-cli push app-groups
```

#### Deleting App Groups from Insights
By default, the Insights CLI will not _delete_ any App Groups from Insights. It will only add or update them.
This means there might be some App Groups created in Insights that are not tracked in your Infrastructure-as-Code (IaC) repository.

You can add the `--delete` flag to the `push app-groups` command, which will delete any App Groups from Insights that **do not exist** in your IaC repository.
Adding the `--dry-run` flag will explain which App Groups would be deleted without making changes to Insights.

You cannot delete an App Group if they are being referenced by any Policy Mapping.
In such cases, you must either update the Policy Mapping to remove the App Group reference or delete the Policy Mapping all together.

### Policy Mappings

You can use the Insights CLI to manage the configuration of Policy Mappings.

Check out the [Policy Mappings](/features/policy-mappings) documentation on use cases for configuring Policy Mappings.

```bash
insights-cli push policy-mappings
```

#### Syncing from Fairwinds Insights
If you were managing Policy Mappings via Fairwinds Insights UI. You can download and sync those definitions using the following command:

```
insights-cli download policy-mappings
```

Note that the folder `policy-mappings` must exists.

#### Adding Policy Mappings
When pushing Policy Mappings to Insights, the CLI expects a directory structure like the following:
```
.
+-- policy-mappings
|   +-- policy-mapping.yaml
|   +-- second-policy-mapping.yaml
```

Once the files have been created, use the following command to push the Policy Mappings to Insights:
```
insights-cli push policy-mappings
```

#### Deleting Policy Mappings from Insights
By default, the Insights CLI will not _delete_ any Policy Mappings from Insights. It will
only add or update them.
This means there might be some Policy Mappings created in Insights that are not
tracked in your Infrastructure-as-Code (IaC) repository.

You can add the `--delete` flag to the `push policy-mappings` command, which
will delete any Policy Mappings from Insights that **do not exist** in your IaC repository. Adding the `--dry-run` flag will explain which Policy Mappings would be deleted without making changes to Insights.

## Testing
You can use the insights-cli to test your OPA policies and automation rules. This can also be
integrated into the CI/CD pipeline for the Infrastructure-as-Code repo containing
your Insights configuration.

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
insights-cli validate opa -r not-in-namespace/policy.rego -k test-pod.yaml -L ./libs
```
* Note: --libs-dir or -L: a directory containing additional rego libraries to load. This option is not required, but can be used to load additional rego libraries

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

### Automation Rules
Before pushing Automation Rules to Insights, you can use the CLI to check if the results will work as expected.
For the testing, you will need to create a rule file and action item file. You also have the option to create an expected output file to compare to the actual result.

#### Rule file example, default file name is `./rule.js`:
```js
if (ActionItem.ReportType === "trivy" && ActionItem.Cluster === "production") {
  ActionItem.Severity = 0.9;
    
  sendHTTPRequest("POST", "https://example.com/callback", {
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(ActionItem),
  });
}
```

#### Input action item file example, default file name is `./action-item.yaml`:
```yaml
title: Image has vulnerabilities
cluster: production
eventType: image_vulnerability
severity: 0.1
reportType: trivy
```

The following fields are required for input action item: 
- `title`
- `eventType`
- `severity`
- `reportType`

When `--insights-context` is set to `Agent` or `AdmissionController`, the field `cluster` is also required.

When `--insights-context` is set to `CI/CD`, the field `repository` is required.

#### Expected output Action Item file example:
```yaml
severity: 0.9
```

Only explicitly set values will be matched.

---

Once the files have been created, use the following command to validate the rule against Insights:

```bash
insights-cli validate rule --insights-context  <insights context> {--automation-rule-file <rule file> --action-item-file <action item file>} [--expected-action-item <expected output file> --dry-run]
```

#### Flags:
  - **[required]** `-t`, `--insights-context string`   - Insights context: [AdmissionController, Agent or CI/CD]
  - **[optional]** `-a`, `--action-item-file string`     - Action Item file path (default `./action-item.yaml`)
  - **[optional]** `-r`, `--automation-rule-file string` - Automation rule JS file path (default `./rule.js`)
  - **[optional]** `-i`, `--expected-action-item string` - Optional file containing the action item that the automation rule is expected to produce
  - **[optional]** `--dry-run`                           - Optional flag to run the rule without executing any external integration (Slack, Jira, PagerDuty, Azure, http requests).

#### Example:

```bash
insights-cli validate rule --insights-context Agent --automation-rule-file ./rule.js --action-item-file ./action-items.yaml --expected-action-item ./expected-output.yaml --dry-run
```

If the expected output is provided and the actual result matches, a success message is displayed:
```bash
-- Logs --

[info] "edit_action_item" - Action Item modified - ["Severity" was "update" from "0.20" to "0.90"]
[info] [dry-run] "send_http_request" - HTTP request sent to POST @ https://example.com/callback. Got response: 200

-- Diff Resul-

INFO Success - actual response matches expected response
```

If no expected output is provided the updated action item `yaml` is displayed:
```bash
-- Logs --

[info] "edit_action_item" - Action Item modified - ["Severity" was "update" from "0.20" to "0.90"]
[info] [dry-run] "send_http_request" - HTTP request sent to POST @ https://example.com/callback. Got response: 200

-- Returned Action Item --

title: Image has vulnerabilities
cluster: production
eventType: image_vulnerability
severity: 0.9
```

### Teams Management
Insights Teams Management can be done inside Insights UI. Optionally it can be handled using a teams.yaml file to push configurantion via cli into Insights.
`name` is the only required field. If no specific clusters/namespaces/repositories are included, then all are included. If empty array `[]` is provided then nothing is allowed.

Example of `teams.yaml`:
```yaml

# Example of all clusters, namespaces and repositories allowed
- name: NewTeamAllPermissions

# Example of no permission allowed - use empty array []
- name: NewTeamNoPermission
  clusters: []
  namespaces: []
  repositories: []

- name: NewTeam2
  clusters:
  - us-east-1
  - us-eest-2
  namespaces:
  - default
  - kube-system
  disallowedNamespaces:
  - kube-public
  - kube-node-lease
  disallowedClusters:
  - us-west-1
  - us-west-2
  repositories:
  - reposity1
  - repository2
  disallowedRepositories:
  - repository3
  - repository4
- name: NewTeam3
  clusters:
  - us-east-1
  - us-eest-2
  namespaces:
  - default
  - kube-system
  disallowedNamespaces:
  - kube-public
  - kube-node-lease
  disallowedClusters:
  - us-west-1
  - us-west-2
  repositories:
  - reposity1
  - repository2
  disallowedRepositories:
  - repository3
  - repository4  

```

Add your teams.yaml at same directory on insights-cli and optionally provide `--delete` or `-x` parameter. 
This flag determines if teams that are not provided in the teams.yaml should be deleted. The default value is false, so it does not delete teams not provided in the file.

Example:
```bash
insights-cli push teams
```

#### Logs Events

Some actions and function are logged in form of events and will be returned to help debugging the rule execution verification. In the example above, since the action-item was modified by the rule, Fairwinds Insights will generate an `edit_action_item` log that contains information about the modification that were applied. Below are the supported action and their log events:

- `rule_runtime_error` - when the rule JS runtime has errors.
- `edit_action_item` - when the action-item is modified.
- `javascript_console_log` - the result of `console.log` usage.
- `send_http_request` - when `sendHTTPRequest` function is triggered.
- `create_pagerduty_incident` - when `createPagerDutyIncident` function is triggered.
- `create_github_ticket` - when `createTicket` is triggered with `GitHub` provider.
- `create_jira_ticket` - when `createTicket` is triggered with `Jira` provider.
- `create_azure_devops_ticket` - when `createTicket` is triggered with `Azure` provider.
- `send_slack_message` - when `sendSlackNotification` is triggered.

When `--dry-run` is used, external integration will be "mocked" and their events will be marked with a `[dry-run]` tag.

#### Verifying an Automation Rule
Once you've uploaded an Automation Rule, it will be triggered the next time the Insights Agent, CI process or Admission Controller runs.

To be sure the Rule functions correctly, you can manually trigger the Agent by running:

```bash
kubectl create job rule-test --from cronjob/$REPORT -n insights-agent
```

Where $REPORT is `polaris`, `trivy` or any other report type you'd like to test.

## Generation

### OPA policies generation powered by OpenAI

With insights-cli, you are able to generate OPA policies powered by OpenAI. 
Use model `gpt-4` and beyond for better results.  

> NOTICE: The OpenAI integration is available for your convenience. Please be aware that you are using your OpenAI API key and all interaction will be governed by your agreement with OpenAI. Policies are generated in part with OpenAI’s large-scale language-generation model. The generated policy should be reviewed and tested for accuracy and revised in order to obtain the desired outcome. The User is responsible for the accuracy of the policy.

To generate OPA policies powered by OpenAI that `blocks anyone from using the default namespace`, use the following command:

`insights-cli generate opa openai -k $OPENAI_API_KEY -m gpt-4 -p "blocks anyone from using the default namespace"`