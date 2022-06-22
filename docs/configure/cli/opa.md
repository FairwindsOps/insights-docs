---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Using the CLI to manage OPA policies and validate OPA policies"
---
# OPA Policies With the CLI
You can use the Insights CLI to manage OPA policies and validate OPA policies offline.
Be sure to first read the [Insights CLI documentation](/configure/cli/cli) which covers installation and preparation.

This page only covers OPA v2 policies with the CLI. For information and examples on how to use the CLI to create OPA v1 policies check out
[OPA v1 Policies with the CLI](/configure/cli/opa-v1)

## Pushing OPA Policies to Insights
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

### Pushing OPA Policies Example
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

## Verifying an OPA Policy
To see a list of OPA policies in your Insights organization, run:

```bash
insights-cli list opa
```

If the OPA report is enabled, you can trigger it to run immediately and verify new Action Items show up in the Insights UI:

```bash
kubectl create job opa-test --from cronjob/opa -n insights-agent
```

## Deleting OPA Policies From Insights
By default, the Insights CLI will not _delete_ any OPA policies from Insights. It will
only add or update them.
This means there might be some OPA policies running in Insights that are not
tracked in your Infrastructure-as-Code (IaC) repository.

You can add the `--delete` flag to the `push opa` command, which
will delete any OPA policies from Insights that **do not exist** in your IaC repository. Adding the `--dry-run` flag will explain which Policies would be deleted without making changes to Insights.

## Pushing OPA Policies Along With Other Configurations
OPA policies can be pushed to Insights along with other Insights configurations using the single command `insights-cli push all`.

The `--delete` flag is not available for the `push all` command to avoid unexpected deletes of Insights CLI managed configuration resources that are added in the future.

For additional information see
* [Automation Rules with CLI](/configure/cli/automation-rules)
* [Policies Configuration with CLI](/configure/cli/settings)

## Validate and Debug OPA Policies
> The `validate` command only works with v2 OPA policies

The Insights CLI can validate OPA policies which is useful for local policy development or in your CI/CD workflow. 
Validation includes:
* Verifying rego syntax - the query language used by OPA policies
* Verifying Insights provided functions, such as `kubernetes()` and `insightsinfo()`, have the correct number of parameters
* Displaying optional rego `print` statements to aide in debugging
* Showing Policy output, and checking it contains a valid Insights Action Item

The `insights-cli validate opa` command requires an OPA policy file, and a Kubernetes manifest file that will be passed as input to the Policy:

```bash
insights-cli validate opa -r not-in-namespace/policy.rego -k test-pod.yaml
```

Run `insights-cli validate opa --help` for more options when validating Policies.

### Debug Print Statements
Rego `print()` statements will be included in the output of `insights-cli validate opa` to help debug Policy execution. For example, this Policy prints two debug messages.

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

All Policies must generate a single Insights Action Item as output to be considered valid.
