---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation. The Fairwinds Insights CLI is a command-line tool for interacting with the API. Push OPA policies and automation rules to Insights, and test/validate OPA policies offline."
---
# CLI Utility

The [Fairwinds Insights CLI](https://github.com/FairwindsOps/insights-cli)
is a command-line tool for interacting with
the Fairwinds Insights API. In particular, it makes it easy to manage
Insights OPA policies and automation rules as code, and test/validate OPA policies offline.

## Installation
### Homebrew Tap
```bash
brew install FairwindsOps/tap/insights
```

### Binary
Install the binary from our [releases](https://github.com/FairwindsOps/insights-cli/releases?q=draft%3Afalse+prerelease%3Afalse&expanded=true) page.

## Preparation
To start using the Insights CLI, you'll need to retrieve your admin token
from your organization's settings page at insights.fairwinds.com/orgs

Set that token in your environment with

```bash
export FAIRWINDS_TOKEN=$YOUR_ADMIN_TOKEN
```

You'll also need to specify the `--organization` flag when running the CLI,
passing in the name of your organization. Alternatively, you can use the
fairwinds-insights.yaml configuration file (below)

### fairwinds-insights.yaml
You can set up a YAML file containing details for the CLI, including your
organization name and hostname (for self-hosted deployments)
```yaml
options:
  organization: acme-co
  hostname: https://insights.example.com
```

By default, the CLI will look for this file at `./fairwinds-insights.yaml`, but its
location can be configured by passing in the `--config <filename>` flag.

## Pushing OPA Policies and Automation Rules to Insights
### Directory Structure
The Insights CLI expects to find two directories (either in the current working directory,
or in the directory specified in the `--push-directory` flag):

* `./opa/` - a directory containing any OPA policies, each within its own sub-directory
* `./rules/` - a directory containing any automation rules

An example directory structure might look like this:
```
.
+-- opa
|   +-- policy1
|       +-- policy.rego
|       +-- instance1.yaml
|   +-- policy2
|       +-- policy.rego
|       +-- instance1.yaml
|       +-- instance2.yaml
+-- rules
|   +-- rule1.yaml
|   +-- rule2.yaml
```

* The `instance*.yaml` files are only required for Insights version 1 OPA policies. See the [OPA Policy docs](/configure/cli/opa) for details.
* It is possible to override the `opa` and `rules` sub-directory names using additional flags - see `insights-cli push all --help` for details.

To learn more about the OPA policy and automation rule file formats, see the
[OPA Policy docs](/configure/cli/opa) and the
[Automation Rule docs](/configure/cli/automation-rules)

### Push Commands
To push OPA policies and automation rules from your infrastructure-as-code repo to Insights, use one of the `insights-cli push` commands.

* `push all` - Push OPA policies and automation rules.
* `push opa` - Push only OPA policies.
* `push rules` - Push  only automation rules.

```bash
insights-cli push all --push-directory /path/to/iac/
```

#### Deleting From Insights
By default, insights-cli will not _delete_ any OPA policies or automation rules from Insights - it will
only add or update resources.
This means there might be some OPA policies or rules running in Insights that are not
tracked in your IaC repository.

You can add the `--delete` flag to the `push opa` or `push rules` commands, which
will delete any corresponding resources from Insights that **do not exist** in your IaC repository. Adding the `--dry-run` flag will explain which resources would be deleted without making changes to Insights.

* Note that the `--delete` flag is not available for the `push all` command, to avoid unexpected deletes of insights-cli managed configuration resources that are added in the future.

```bash
insights-cli push opa --push-directory /path/to/iac/ --delete --dry-run
insights-cli push rules --push-directory /path/to/iac/ --delete --dry-run
```

## Validate and Debug OPA Policies
The Insights CLI can validate Insights OPA policies, which is useful for local policy development or or in your CI/CD workflow. Validation includes

* Rego syntax - the query language used by OPA policies.
* Some input validation for Insights-provided rego functions, such as `kubernetes()` and `insightsinfo()`.
* Any policy output contains a valid Insights action item.

The `insights-cli validate opa` command requires an OPA policy file, and a Kubernetes manifest file that will be passed as input to the policy.

```bash
insights-cli validate opa --rego-file not-in-namespace/policy.rego --kube-object-file test-pod.yaml
```

Other command-line options are available to override metadata to ease testing policies, such as

* The Kubernetes namespace that may b specified in the manifest file, to help test policies that vary behavior per namespace.
* Information returned by Insights-provided rego functions like `insightsinfo()`.

See `insights-cli validate opa --help` and the [OPA Policy docs](/configure/cli/opa) for details.

### Debug Print Statements
Rego `print()` statements will be included in the output of `insights-cli validate opa`, to help debug policy execution. For example, this incomplete policy prints two debug messages.

```rego
package fairwinds

incompleteRule[actionItem] {
  print("starting our rule")
  input.kind == "Deployment"
  print("made it past the kind detection, which is ", input.kind)
  actionItem := {
    # This is incomplete!
  }
}
```
