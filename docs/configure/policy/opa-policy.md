---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: The OPA report allows you to define custom OPA policies for checking Kubernetes resources"
---
# Open Policy Agent (OPA)
The OPA report allows you to define custom Policies for checking Kubernetes resources.
This is useful for enforcing policies that are specific to your organization.
> You may want to familiarize yourself with
> [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/),
> the policy language used by OPA.

This page only covers OPA v2. For examples on how to write OPA v1 policies, refer to [OPA v1.](/configure/policy/opa-v1)

## Creating OPA Policies
### Using the Insights UI
1. Visit your organization's `Policy` page
2. Click the `Create OPA Policy` button

You'll see a sample Policy that disallows Deployments to the `evil` namespace. This should give you a quick sense for
how to write OPA policies for Insights.

Insights also comes with several templates for OPA Policies which you can modify as needed. To view these templates:
1. Visit your organization's `Policy` page
2. Navigate to the `OPA Policy Templates` page

### Using the Insights CLI
To manage policies in an infrastructure-as-code repository, you can use the Insights command-line interface (CLI). Check out
[OPA Policies with the CLI](/configure/cli/opa) for more information.

## Designing OPA Policies
Each OPA policy will receive an `input` parameter which contains
a Kubernetes resource.

For example, we can check to make sure that `replicas` is set on all `Deployments`:

```rego
package fairwinds

replicasRequired[actionItem] {
  input.kind == "Deployment"
  input.spec.replicas == 0
  actionItem := {}
}
```

The `actionItem` object is what Insights will examine to determine the details of the
issue. The following fields can be set:
* `title` - String - a short title for the Action Item
* `description` - String - a longer description of the issue. Can include markdown
* `remediation` - String - instructions for fixing the issue. Can include markdown
* `category` - String - valid values are `Security`, `Efficiency` or `Reliability`
* `severity` - Integer - between 0.0 and 1.0.

Action Item severity is defined as:
* 0.0 - None
* 0.1 to 0.39 - Low
* 0.4 to 0.69 - Medium
* 0.7 to .89 - High
* 0.9 to 1.0 - Critical

For instance, in the above OPA policy we could set:
```rego
package fairwinds

replicasRequired[actionItem] {
  input.kind == "Deployment"
  input.spec.replicas == 0
  actionItem := {
    "title": concat(" ", [input.kind, "does not have replicas set"]),
    "description": "All workloads at acme-co must explicitly set the number of replicas",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
    "severity": 0.5
  }
}
```

### Varying Action Item Attributes
You can reuse the same OPA policy, setting different Action Item attributes for different cases.
For instance, say we wanted to apply our `replicas` policy above to both `Deployment` and `StatefulSet`
but wanted a higher severity for `Deployments`:

```rego
package fairwinds

replicasRequired[actionItem] {
  # List the Kubernetes Kinds to which this policy should apply.
  kinds := {"Deployment", "StatefulSet"}
  # List severities for each of the above Kinds. Kind.
  severityByKind := {
    "StatefulSet": 0.4,
    "Deployment": 0.9,
  }
  # Iterate Kinds{} and only continue if input.kind is one of them.
  kind := kinds[val]
  input.kind == kind
  input.spec.replicas == 0
  # Set the severity based on the Kind.
  dynamicSeverity := severityByKind[input.kind]
  actionItem := {
    "title": concat(" ", [input.kind, "does not have replicas set"]),
    "description": "All workloads at acme-co must explicitly set the number of replicas",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
    "severity": dynamicSeverity,
  }
}
```

### Restricting OPA Policies by Insights Context
By default an OPA policy will run in all available contexts. These contexts are:
* Insights Agent
* Admission Controller
* CI Integration

However, you can restrict an OPA policy to only run in certain Insights contexts using the `insightsinfo()` Rego function
and the `Agent`, `Admission` and `CI/CD` values:

```rego
  context := insightsinfo("context")
  # List the Insights contexts in which this policy should apply.
  validContexts := {"Admission", "Agent"}
  # Only continue if the policy is executing in one of validContexts{}
  validContext := validContexts[val]
  context == validContext
```

### Varying Execution by Kubernetes Clusters
By default an OPA policy will run in all available clusters.
You can restrict an OPA policy to run in specific Kubernetes clusters:

```rego
  # List the Kubernetes clusters to which this policy should apply.
  validClusters := {"cluster1", "cluster2"}
  # Only continue if the policy is executing in one of validClusters{}
  cluster := insightsinfo("cluster")
  validCluster := validClusters[val]
  cluster == validCluster
```

### Variable Parameters
If we want:
* Deployments to have at least three replicas
* StatefulSets to have at least one replica

we can vary this value based on the Kubernetes Kind:

```rego
package fairwinds

replicasRequired[actionItem] {
  # List the Kubernetes Kinds to which this policy should apply.
  kinds := {"Deployment", "StatefulSet"}
  # List  the minimum required replicas for each of the above Kinds.
  minReplicasByKind := {
    "StatefulSet": 1,
    "Deployment": 3,
  }
  # Iterate Kinds{} and only continue if input.kind is one of them.
  kind := kinds[val]
  input.kind == kind
  minReplicas := minReplicasByKind[input.kind]
  input.spec.replicas < minReplicas
  actionItem := {
    "title": sprintf("%s must have a minimum of %d replicas", [input.kind, minReplicas]),
    "description": "Workloads at acme-co must have minimum number of replicas",
    "remediation": "Please set `spec.replicas` appropriately",
    "category": "Reliability",
    "severity": 0.2,
  }
}
```

### Using the Kubernetes API
You can cross-check OPA policy input with Kubernetes objects from the cluster at Policy execution time. For example, this ensures that all `Deployments` have an associated `HorizontalPodAutoscaler`:

```rego
package fairwinds

hasMatchingHPA(hpas, elem) {
  hpa := hpas[_]
  hpa.spec.scaleTargetRef.kind == elem.kind
  hpa.spec.scaleTargetRef.name == elem.metadata.name
  hpa.metadata.namespace == elem.metadata.namespace
  hpa.spec.scaleTargetRef.apiVersion == elem.apiVersion
}
hpaRequired[actionItem] {
  not hasMatchingHPA(kubernetes("autoscaling", "HorizontalPodAutoscaler"), input)
  actionItem := {
    "title": "No horizontal pod autoscaler found"
  }
}
```

## Testing OPA Policies
After uploading a new Policy, it's good to test that it is working properly. To do so you can
manually kick off a report:
```
kubectl create job opa-test --from cronjob/opa -n insights-agent
```

Watch the pod logs for the resulting `Job` to spot any potential errors in your OPA policy.

The Insights CLI also facilitates offline testing of OPA policies. Check out
the [Validating OPA policy](/configure/cli/opa#validate-and-debug-opa-policies) documentation.

## Adding Resources to OPA Policies
The Insights OPA plugin executes OPA policies for these Kubernetes resources by default:

* Deployment
* DaemonSet
* StatefulSet
* Pod
* Job
* CronJob

If you'd like to add additional resources, you can use the `opa.targetResources` from the
[Insights Agent Helm chart](https://github.com/FairwindsOps/charts/blob/master/stable/insights-agent/values.yaml):

```yaml
opa:
  enabled: true
  targetResources:
  - apiGroups:
    - networking.k8s.io
    resources:
    - ingress
```

By default the OPA plugin inherits the same Kubernetes APIGroups and Resources defined in the default rules for [the Admission Controller](/configure/admission/configuration).
