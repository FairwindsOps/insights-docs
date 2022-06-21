---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Using the CLI to manage OPA v1 policies"
---
# OPA v1 Policies With the CLI
We recommend using OPA v2 policies. These instructions remain here for backward compatibility. For creating
OPA v2 policies using the CLI, refer to the [OPA Policies with the CLI](/configure/cli/opa) documentation.

## Pushing v1 OPA Policies To Insights
When pushing v1 OPA policies to Insights, the CLI expects a directory structure like the following:
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

The Policy file name must be `policy.rego`.

Each Policy lives in its own directory, alongside the "policy instance" files that specify to which Kubernetes Kinds they should be applied.

### Pushing v1 Policies Example
To upload a v1 OPA policy that requires `replicas` to be specified for Kubernetes Deployments, create the file `./opa/replicas/policy.rego`:

```rego
package fairwinds

replicasRequired[actionItem] {
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

Next, create the `./opa/replicas/deployments.yaml` file to tell Insights that this Policy
will be applied to all Kubernetes Deployments:
```yaml
targets:
- apiGroups: ["apps"]
  kinds: ["Deployment"]
```

Finally, we can upload our Policies using the CLI:

```bash
insights-cli push opa
```

It is possible to mix v1 and v2 OPA policies within a single `opa` directory. 
The key differentiation is that v2 Policies only have a `policy.rego` file.
