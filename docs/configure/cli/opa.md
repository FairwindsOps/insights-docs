# Uploading Policies

### Via the CLI
To manage policies in an infrastructure-as-code repository, you can use the [Insights CLI](/configure/cli/cli).
Be sure to read the [CLI documentation](/configure/cli/cli) before getting started here.

#### Syncing Policies
The sync functionality expects a directory structure like the following:
```
.
+-- checks
|   +-- policy1
|       +-- policy.rego
|       +-- instance1.yaml
|   +-- policy2
|       +-- policy.rego
|       +-- instance1.yaml
```

Running `insights policy sync` from the root directory will upload any new/changed policies
to the Insights API, and start applying them to each of your clusters.

#### Example

The Insights CLI expects each policy to live in its own directory, alongside
the rules that dictate where the rule should be applied.

To upload our `replicasRequired` check, we start by creating `./replicas/policy.rego`
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

Next, we'll create `./replicas/deployments.yaml` to tell Insights that this policy
should be applied to all Deployments:
```yaml
targets:
- apiGroups: ["apps"]
  kinds: ["Deployment"]
```

Finally, we can upload our policies using the CLI:
```bash
FAIRWINDS_TOKEN=YOUR_TOKEN insights policy sync --organization your-org-name -d .
```

To see a full list of your organization's policies, you can run:
```bash
FAIRWINDS_TOKEN=YOUR_TOKEN insights policy list --organization your-org-name
```