# Interacting With OPA Policies Via the CLI
You can use the Insights Command-line Interface (CLI) To manage OPA policies, and test/validate OPA policies offline.
Be sure to first read the [general CLI documentation](/configure/cli/cli) which covers instllation and prerequisites.

## V1 and V2 Insights OPA Policies
Version 2 of the [Insights Agent](/configure/agent/install-hub) supports a new `V2` method of specifying an OPA policy without an accompanying instance YAML file. This moves logic for varying policy execution by cluster, Insights context, or other parameters, directly into the policy rego.
See the [[OPA report documentation](/configure/policy/policy) for more information about how V1 and V2 OPA policies differ.

## Pushing V2 OPA Policies to Insights
The Insights CLI push commands expect a directory structure like the following when pushing V2 OPA policies:
```
.
+-- opa
|   +-- policy1
|       +-- policy.rego
|   +-- policy2
|       +-- policy.rego
```

* Note that it is possible to mix older V1 and these V2 policies within a single `opa` directory. The key differentiation is that V2 policies only have a `policy.rego` file.

### Pushing V2 Policies Example
To upload a`replicas` V2 OPA policy that requires Replicas to be specified for Kubernetes Deploymentss, create the file `./opa/replicas/policy.rego`
(note that the filename _must_ be named `policy.rego`):

```rego
package fairwinds

replicasRequired[actionItem] {
  input.kind == "Deployment"
  input.spec.replicas == 0
  actionItem := {
    "title": concat(" ", [input.kind, "does not have replicas set"]),
    "description": "All workloads at acme-co must explicitly set the number of replicas. [Read more](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
    "severity": 0.5
  }
}
```

* Note that the `replicasRequired` rule of the OPA policy first checks that `input.kind` is `Deployment`, which ensures this OPA policy only applies to Kubernetes Deployments. This is a difference between these V2 Insights OPA policies, compared to V1 policies.

Next use the Insights CLI to push this OPA policy to Insights:

```bash
FAIRWINDS_TOKEN=YOUR_TOKEN insights-cli push opa --organization YOUR_ORG_NAME
```

* This pushes OPA policies from the current directory, expecting it to contain the `opa` sub-directory.
* Typically the `FAIRWINDS_TOKEN` environment variable is set elsewhere and is not included each time the CLI is run.
* The Insights organization can also be specified in a configuration file, described in the [general Insights CLI documentation](/configure/cli/cli).
* Use the `--push-directory` option to specify an alternative base directory.
* It is also possible to override the name of the `opa` sub-directory - see `insights-cli push opa --help` for details.

#### Verifying Success
To see a list of OPA policies in your Insights organization, you can run:

```bash
FAIRWINDS_TOKEN=YOUR_TOKEN insights-cli list opa --organization YOUR_ORG_NAME
```

If the [OPA report](/configure/policy/policy) is enabled, you can trigger it to run immediately, then verify new action items show up in the Insights UI.

```bash
kubectl -n insights-agent create job rule-test --from cronjob/opa
```

### Deleting OPA Policies From Insights
By default, the Insights CLI will not _delete_ any OPA policies from Insights - it will
only add or update them.
This means there might be some OPA policies running in Insights that are not
tracked in your IaC repository.

You can add the `--delete` flag to the `push opa` command, which
will delete any OPA policies from Insights that **do not exist** in your IaC repository. Adding the `--dry-run` flag will explain which resources would be deleted without making changes to Insights.

## Pushing V1 Legacy OPA Policies To Insights
The Insights CLI push commands expect a directory structure like the following when pushing V1 legacy OPA policies:
```
.
+-- opa
|   +-- policy1
|       +-- policy.rego
|       +-- instance1.yaml
|   +-- policy2
|       +-- policy.rego
|       +-- instance1.yaml
```

Each policy lives in its own directory, alongside the "policy instance" files that specify to which Kubernetes Kinds they should be applied.

* Note that it is possible to mix these V1 and the newer V2 policies within a single `opa` directory. The key differentiation is that V2 policies only have a `policy.rego` file.

### Pushing V1 Policies Example
To upload a`replicas` V1 OPA policy that requires Replicas to be specified for Kubernetes Deploymentss, create the file `./opa/replicas/policy.rego`
(note that the filename _must_ be named `policy.rego`):

```rego
package fairwinds

replicasRequired[actionItem] {
  input.spec.replicas == 0
  actionItem := {
    "title": concat(" ", [input.kind, "does not have replicas set"]),
    "description": "All workloads at acme-co must explicitly set the number of replicas. [Read more](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
    "severity": 0.5
  }
}
```

Next, create the `./opa/replicas/deployments.yaml` file to tell Insights that this policy
will be applied to all Kubernetes Deployments:
```yaml
targets:
- apiGroups: ["apps"]
  kinds: ["Deployment"]
```

Finally, we can upload our policies using the CLI:

```bash
FAIRWINDS_TOKEN=YOUR_TOKEN insights-cli push opa --organization YOUR_ORG_NAME
```

* This pushes OPA policies from the current directory, expecting it to contain the `opa` sub-directory.
* Typically the `FAIRWINDS_TOKEN` environment variable is set elsewhere and is not included each time the CLI is run.
* The Insights organization can also be specified in a configuration file, described in the [general Insights CLI documentation](/configure/cli/cli).
* Use the `--push-directory` option to specify an alternative base directory.
* It is also possible to override the name of the `opa` sub-directory - see `insights-cli push opa --help` for details.

### Verifying Success
To see a list of OPA policies in your Insights organization, you can run:

```bash
FAIRWINDS_TOKEN=YOUR_TOKEN insights-cli list opa --organization YOUR_ORG_NAME
```

### Deleting OPA Policies From Insights
By default, the Insights CLI will not _delete_ any OPA policies from Insights - it will
only add or update them.
This means there might be some OPA policies running in Insights that are not
tracked in your IaC repository.

You can add the `--delete` flag to the `push opa` command, which
will delete any OPA policies from Insights that **do not exist** in your IaC repository. Adding the `--dry-run` flag will explain which OPA policies would be deleted without making changes to Insights.

## Pushing OPA Policies With Other Configuration Resources
OPA policies can be pushed to Insights along with other Insights configuration using the single command `insights-cli push all`.

* Note that the `--delete` flag is not available for the `push all` command, to avoid unexpected deletes of insights-cli managed configuration resources that are added in the future.

For additional information see
* [CLI automation rules documentation](/configure/cli/automation-rules)
* [CLI Policy Configuration documentation](/configure/cli/settings)

## Validate and Debug OPA Policies
The Insights CLI can validate Insights OPA policies, which is useful for local policy development or or in your CI/CD workflow. Validation includes

* Verifying rego syntax - the query language used by OPA policies.
* Verifying Insights-provided functions have the correct number of parameters, such as `kubernetes()` and`insightsinfo()`. 
* Displaying optional rego `print` statements, to aide in debugging.
* Showing policy output, and validating it contains a valid Insights action item.

The `insights-cli validate opa` command requires an OPA policy file, and a Kubernetes manifest file that will be passed as input to the policy.

```bash
insights-cli validate opa --rego-file not-in-namespace/policy.rego --kube-object-file test-pod.yaml
```

Other command-line options are available to override metadata to ease testing policies, such as

* The Kubernetes namespace that may b specified in the manifest file, to help test policies that vary behavior per namespace.
* Information returned by Insights-provided rego functions like `insightsinfo()`.

See `insights-cli validate opa --help` and the [OPA Policy docs](/configure/cli/opa) for details.

### Insights-provided Rego Functions

* The `kubernetes` function does not currently return data. In the future we hope to facilitate reading static Kubernetes manifest files which this function can query, in place of an OPA policy running in a live cluster.
* The `insightsinfo` function will return static data, such as the cluster name and Insights context (Admission, Agent, CI/CD). THese are also configurable via command-line flags.

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

## Batch Validation of OPA Policies for CI/CD

The `--batch-dir` option instructs the `insights-cli validate opa` command to process all `.rego` files in the specified directory.

* Each `.rego` file is required to have an accompanying `.yaml` file containing the Kubernetes manifest that will be passed as input to that policy.
* The accompanying Kubernetes manifest should cause the OPA policy to output its Insights action item.

### Batch OPA Policy Validation Example

The `insights-cli validate opa` command expects the following directory structure when using the `--batch-directory` option.
```
.
+-- file.rego
+-- file.yaml
+-- another-policy.rego
+-- another-policy.yaml
```

* The base filename (minus the extension) is arbitrary.

Next use the Insights CLI to validate all OPA policies

```bash
FAIRWINDS_TOKEN=YOUR_TOKEN insights-cli --organization YOUR_ORG_NAME validate opa --batch-directory .
```

* The `--batch-directory` option is required, to instruct `validate opa` to run in batch mode.
* All policies must generate a single Insights action item as output, to be considered valid.
* Typically the `FAIRWINDS_TOKEN` environment variable is set elsewhere and is not included each time the CLI is run.
* The Insights organization can also be specified in a configuration file, described in the [general Insights CLI documentation](/configure/cli/cli).
