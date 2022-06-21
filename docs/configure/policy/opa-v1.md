---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Creating OPA v1 policies"
---
# OPA v1
We recommend using OPA v2 policies. These instructions remain here for backward compatibility.
For writing OPA v2 policies, refer to the [Designing OPA policies](/configure/policy/opa-policy#designing-opa-policies) documentation.

## Varying Action Item Attributes
The `replicas.rego` file would look like:

```rego
package fairwinds

replicasRequired[actionItem] {
  input.spec.replicas == 0
  actionItem := {
    "title": concat(" ", [input.kind, "does not have replicas set"]),
    "description": "All workloads at acme-co must explicitly set the number of replicas,
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
  }
}
```

Next, we'd create two instances.
`deployments.yaml`:
```yaml
output:
  severity: CRITICAL_SEVERITY
targets:
- apiGroups: ["apps"]
  kinds: ["Deployment"]
```

`statefulSets.yaml`:
```yaml
output:
  severity: MEDIUM_SEVERITY
targets:
- apiGroups: ["apps"]
  kinds: ["StatefulSet"]
```

## Restricting OPA Policies by Insights Context
Specifying a `runEnvironments` section in your Instance YAML will limit that OPA policy to the contexts selected:

```yaml
runEnvironments:
- Admission
- Agent
targets:
- apiGroups: ["apps"]
  kinds: ["StatefulSet"]
```

## Varying Execution by Kubernetes Clusters
Specifying a `clusters` section in the instance YAML will only execute that OPA policy in those clusters:

```yaml
clusters:
- us-east-1
targets:
- apiGroups: ["apps"]
  kinds: ["StatefulSet"]
```

## Variable Parameters
This rego uses a parameter defined separately in each instance YAML file:

```rego
package fairwinds

replicasRequired[actionItem] {
  input.spec.replicas < input.parameters.minReplicas
  actionItem := {
    "title": sprintf("%s does not have enough replicas set", [input.kind]),
    "description": "Workloads at acme-co must have minimum number of replicas",
    "remediation": "Please set `spec.replicas` appropriately",
    "category": "Reliability",
    severity: LOW_SEVERITY,
  }
}
```

`deployments.yaml`:
```yaml
parameters:
  minReplicas: 3
targets:
- apiGroups: ["apps"]
  kinds: ["Deployment"]
```

`statefulSets.yaml`:
```yaml
parameters:
  minReplicas: 1
targets:
- apiGroups: ["apps"]
  kinds: ["StatefulSet"]
```