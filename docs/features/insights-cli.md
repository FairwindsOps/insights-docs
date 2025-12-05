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

### Rego v0 and v1
We are currently supporting both Rego v0 and v1, but we encourage moving to Rego v1 as V0 is deprecated.
* For more information about [VO upgrade](https://www.openpolicyagent.org/docs/latest/v0-upgrade/)
* How to migrate [How to migrate][https://www.styra.com/blog/renovating-rego/]

When using `insights-cli push opa` you can use parameter rego-version either values v0 or v1:
* Example: `insights-cli push opa --rego-version=v1`

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

### Kyverno Policies

You can use the Insights CLI to manage Kyverno policies as code.

Check out the [Kyverno Policies](/features/kyverno-policies) documentation for more information about managing Kyverno policies in Insights.

#### Pushing Kyverno Policies

When pushing Kyverno policies to Insights, the CLI expects a directory structure like the following:

```
.
+-- kyverno-policies
||   +-- require-resource-limits.yaml
||   +-- require-resource-limits.success.yaml
||   +-- require-resource-limits.failure.yaml
||   +-- disallow-privileged.yaml
```

Each file should contain a complete Kyverno policy. The policy name in the file's `metadata.name` will be used as the policy name in Insights.

**Example policy file** (`kyverno-policies/require-resource-limits.yaml`):

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-resource-limits
  annotations:
    policies.kyverno.io/title: Require Resource Limits
    policies.kyverno.io/category: Efficiency
    policies.kyverno.io/severity: medium
    policies.kyverno.io/description: All Pods must have resource limits set
spec:
  validationFailureAction: Enforce
  rules:
    - name: check-resource-limits
      match:
        any:
          - resources:
              kinds: [Pod]
      validate:
        message: "Resource limits are required"
        pattern:
          spec:
            containers:
              - resources:
                  limits:
                    memory: "?*"
                    cpu: "?*"
```

**Basic push command:**

```bash
insights-cli push kyverno-policies
```

**Push options:**

```bash
# Push from a custom subdirectory
insights-cli push kyverno-policies -s custom-policies

# Push specific policies only
insights-cli push kyverno-policies -p require-labels,disallow-privileged

# Dry run to see what would be changed
insights-cli push kyverno-policies --dry-run

# Skip validation (not recommended)
insights-cli push kyverno-policies --skip-validation

# Force push even if validation fails (use with extreme caution)
insights-cli push kyverno-policies --force

# Delete policies that don't exist locally
insights-cli push kyverno-policies --delete
```

#### Downloading Kyverno Policies

If you were managing Kyverno policies via the Fairwinds Insights UI, you can download and sync those definitions using:

```bash
# Download all policies from Insights
insights-cli download kyverno-policies -d .

# Download to custom subdirectory
insights-cli download kyverno-policies -d . --download-subdirectory my-policies

# Download to specific directory
insights-cli download kyverno-policies -d /path/to/my/project

# Download with override (overwrite existing local files)
insights-cli download kyverno-policies -d . --override
```

Note that the folder `kyverno-policies` (or your custom subdirectory) will be created automatically if it doesn't exist.

#### Listing Kyverno Policies

You can list Kyverno policies from local files or Insights:

```bash
# List all policies from Insights
insights-cli list kyverno-policies

# List local policy files
insights-cli list kyverno-policies --local

# List policies for specific cluster (with app groups applied)
insights-cli list kyverno-policies --cluster production

# Export cluster policies as YAML
insights-cli list kyverno-policies --cluster production --format yaml
```

#### Validating Kyverno Policies

The CLI can validate Kyverno policies before pushing them. You can validate a single policy or a directory of policies with test cases.

**Test case files:**
- `.success.yaml` - Resources that should pass validation
- `.failure.yaml` - Resources that should fail validation
- `.testcase*.yaml` - Named test cases with expected outcomes

**Validate a single policy:**

```bash
insights-cli validate kyverno-policies -r policy.yaml -k test-resource.yaml
```

**Validate a directory of policies:**

```bash
# Validate all policies in directory
insights-cli validate kyverno-policies -b ./kyverno-policies

# Validate specific policies
insights-cli validate kyverno-policies -b ./kyverno-policies -p require-labels,disallow-privileged
```

**Validate policies for a specific cluster:**

```bash
insights-cli validate kyverno-policies --cluster production
```

This validates all policies that would be deployed to the cluster (with app groups applied).

#### Namespaced Policies

For namespaced policy kinds (`Policy`, `NamespacedValidatingPolicy`), ensure the `metadata.namespace` field is set in your policy file:

```yaml
apiVersion: kyverno.io/v1
kind: Policy
metadata:
  name: namespace-specific-policy
  namespace: production  # Required for namespaced policies
spec:
  # ... policy spec
```

#### Policy Validation Details

The CLI validates policies before pushing them to Insights:
- **Security validation**: Prevents dangerous configurations
- **Kyverno CLI validation**: Ensures policy syntax is correct
- **Conflict detection**: Prevents conflicts with existing cluster policies
- **Test case validation**: Validates policies against test resources with expected outcomes

If validation fails, you'll see specific error messages to help fix the issue.

### Teams Management

Teams in **Fairwinds Insights** can be managed in two ways:

1. Through the **Insights UI**  
2. Using a configuration file (`teams.yaml`) and pushing it via the `insights-cli`

---

#### Configuration Rules - File structure

```
# teams.yaml schema (simplified)
- name: string # required, team name
  clusters:    # optional, list of allowed clusters
    - string
  disallowedClusters: # optional, list of disallowed clusters
    - string
  namespaces:         # optional, list of allowed namespaces
    - string
  disallowedNamespaces: # optional, list of disallowed namespaces
    - string
  repositories:           # optional, list of allowed repositories
    - string
  disallowedRepositories: # optional, list of disallowed repositories
    - string
  appGroups:               # optional, list of app groups
    - string
```

- The `name` property is the only required field.  
- If no `clusters`, `namespaces`, or `repositories` are specified, then **all are allowed**. If an empty array `[]` is provided, then **none are allowed**.  
- For `disallowedClusters`, `disallowedNamespaces`, and `disallowedRepositories`:
  - There is **no option** to **disallow all**.  
  - You must list each disallowed entry individually.  
- `appGroups` also requires you to list each entry individually.
---

#### Example `teams.yaml`

```yaml
# Example 1: All clusters, namespaces, and repositories allowed
- name: NewTeamAllAllowedPermissions
```

```yaml
# Example 2: None allowed (explicit empty arrays)
- name: NewTeamNoneAllowedPermissions
  clusters: []
  namespaces: []
  repositories: []
```

```yaml
# Example 3: Some allowed, none disallowed
- name: NewTeam
  clusters:
    - us-east-1
    - us-east-2
  namespaces:
    - default
    - kube-system
  repositories:
    - repository1
    - repository2
```

```yaml
# Example 4: Some allowed, some disallowed
- name: NewTeam2
  clusters:
    - us-east-1
    - us-east-2
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
    - repository1
    - repository2
  disallowedRepositories:
    - repository3
    - repository4
```

```yaml
# Example 5: Mappings Teams and App Groups
- name: NewTeam3
  appGroups: ["all-resources"]
```

#### Using `insights-cli`

By default, the `teams.yaml` file is expected in the current working directory.

```bash
insights-cli push teams
```

#### Optional Flags

- `--delete`, `-D` - Delete teams not defined in teams.yaml. Default: `false` (teams not listed remain unchanged).
- `--dry-run`, `-z` - Show what would be pushed without applying changes.
- `--push-directory`, `-d` - Path to the directory containing teams.yaml.

#### Example usage with flags:
```bash
insights-cli push teams --delete --dry-run --push-directory=./teams
```

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
* Note: `--libs-dir` or `-L`: a directory containing additional rego libraries to load. This option is not required, but can be used to load additional rego libraries

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
The `--batch-directory` option for the `insights-cli validate opa` command enables batch validation of all `.rego` files within a specified directory. This feature is particularly useful for CI/CD workflows where policies and their test cases need to be thoroughly validated.

#### Features
- **Support for Multiple Test Files**: Each policy can have multiple test files, enabling comprehensive testing with various scenarios, such as success and failure cases.
- **Directory Structure Requirements**: To use this option, the directory must follow a specific structure, ensuring a 1:1 relationship between policy files and their corresponding test files.

#### Required Directory Structure
The following is the expected directory structure when using the `--batch-dir` option:

```
.
+-- policy1.rego
+-- policy1.yaml
+-- policy2.rego
+-- policy2.testcase1.success.yaml
+-- policy2.testcase2.success.yaml
+-- policy2.failure.yaml
+-- policy2.yaml
```

- **Policy File**: The `.rego` file defines the OPA policy logic.
- **Data File**: The `.yaml` file provides data for the corresponding `.rego` policy.
- **Test Files**: Files like `testcase1.success.yaml`, `testcase2.success.yaml`, or `failure.yaml` contain input data to test specific scenarios. The naming convention is flexible; the infix (`testcase1`, `testcase2`) can be any descriptive text.

#### Validating Policies
Run the following command to validate all OPA policies in the specified directory:

```bash
insights-cli validate opa --batch-directory <directory_path>
```

Replace `<directory_path>` with the path to your directory containing the `.rego` files and test cases.

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
- `send_msteams_message` - when `sendMSTeamsNotification` or `sendMSTeamsNotificationWebhook` is triggered.

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