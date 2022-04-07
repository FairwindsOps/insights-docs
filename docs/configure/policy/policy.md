---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation. The OPA Report allows you to define custom OPA policies for checking Kubernetes resources. "
---
# OPA Policies

The [OPA Report](/configure/agent/install-hub) allows you to define custom policies for checking Kubernetes resources.
This is useful for enforcing policies that are specific to your organization - e.g. particular labeling
schemes or required annotations.

## Designing Policies
> You may want to familiarize yourself with
> [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/),
> the policy language used by OPA.

Each Rego policy will recieve an `input` parameter, which contains
a Kubernetes resource.

For example, we can check to make sure that `replicas` is set on all `Deployments`

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
* `title` - a short title for the Action Item
* `description` - a longer description of the issue. Can include markdown.
* `remediation` - instructions for fixing the issue. Can include markdown.
* `category` - can be Security, Efficiency, or Reliability
* `severity` - between 0.0 and 1.0.

Action Item severity is defined as:
* 0.0 - None
* 0.1 to 0.39 - Low
* 0.4 to 0.69 - Medium
* 0.7 to .89 - High
* 0.9 to 1.0 - Critical  

For instance, in the above OPA policy, we could set:
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

## Uploading Policies

### Via the UI
To get started, go to the `Policy` tab, and click the `Create Custom Policy` button.

<div>
  <img :src="$withBase('/img/policy.png')" alt="create policy">
</div>

First, be sure to give your policy a good name and description, so you can refer back to it later.

You'll see a sample policy that disallows Deployments named `evil`. This should give you a quick sense for
how to write OPA policies for Insights.

The top box contains the Rego, which will check the Kubernetes resource for violations, and report back
details of the violation to Insights.

The bottom boxes tell Insights which types of resources this check should be applied to. Be sure to give these a descriptive name as well.

<div>
  <img :src="$withBase('/img/sample-policy.png')" alt="sample policy">
</div>

Insights also comes with a library of OPA Policies which you can clone and modify as needed:

<div>
  <img :src="$withBase('/img/policy-templates.png')" alt="policy templates">
</div>

### Via the CLI
To manage policies in an infrastructure-as-code repository, you can use the Insights command-line interface (CLI). Please see both the [general Insights CLI documentation](/configure/cli/cli)
and the [OPA policy specific CLI documentation](/configure/cli/opa).

## Testing your Policies
After uploading new checks, it's good to test that they're working properly. To do so, you can
manually create a one-off report:
```
kubectl create job my-opa-test --from=cronjob/opa -n insights-agent
```

Watch the pod logs for the resulting Job to spot any potential errors in your OPA policy.

The Insights CLI also facilitates offline testing of OPA policies, see the [CLI OPA policy validation documentation](/configure/cli/opa#validate-and-debug-opa-policies).

## V1 and V2 Insights OPA Policies
Version 2 of the [Insights Agent](/configure/agent/install-hub) supports a new `V2` method of specifying an OPA policy without an accompanying instance YAML file. This moves logic for varying policy execution by cluster, Insights context, or other parameters, directly into the policy rego. We recommend use of V2 policies moving forward, but continue to support V1 OPA policies.

Here are some frequently asked questions about the V1 and V2 differences:

#### Q: Without an instance YAML, how do V2 policies define the Kubernetes Kinds to which the OPA policy applies?
The rego should check the Kubernetes kind, by inspecting `input.kind`.  

The Insights OPA plugin executes OPA policies for these Kubernetes resources by default:

* Deployments
* DaemonSets
* StatefulSets
* Pods
* Jobs
* CronJobs

If you'd like to add additional resources, you can use the `opa.targetResources`
[insights-agent Helm chart value](https://github.com/FairwindsOps/charts/blob/master/stable/insights-agent/values.yaml):

```yaml
opa:
  enabled: true
  targetResources:
  - apiGroups:
    - networking.k8s.io
    resources:
    - ingress
```

By default the OPA plugin inharits the same Kubernetes APIGroups and Resources definedin default rules for [the admission controller](/configure/admission/configuration), if enabled.

#### Q: How do I vary OPA policy execution By cluster or Insights context?
Insights provides a new `insightsinfo()` rego function, which accepts the following parameters:

* `cluster` - returns the Kubernetes cluster where the OPA policy is executing.
* `context` - Returns the Insights context in which the policy is executing
	* Admission for the admission controller
	* Agent for the Insights agent (OPA plugin)
	* `CI/CD` for the Insights CI integration.

## Tips and Tricks

### Varying Action Item Attributes
You can reuse the same Rego policy, setting different ActionItem attributes for different cases.
For instance, say we wanted to apply our `replicas` policy above to both `Deployments` and `StatefulSets`,
but wanted a higher severity for `Deployments`.

#### V2 OPA Policy Variable Attributes Example
This policy varies the severity depending on the `input.kind`:

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
    "description": "All workloads at acme-co must explicitly set the number of replicas. [Read more](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
    "severity": dynamicSeverity,
  }
}
```

#### V1 OPA Policy Variable Attributes Example
We recommend using V2 Insights OPA policies (above). These instructions remain here for backward compatibility.

First, we'd stop specifying `severity` directly inside the action item returned by the OPA policy, so that it can be set in the instance file:
**replicas.rego**
```rego
package fairwinds

replicasRequired[actionItem] {
  input.spec.replicas == 0
  actionItem := {
    "title": concat(" ", [input.kind, "does not have replicas set"]),
    "description": "All workloads at acme-co must explicitly set the number of replicas. [Read more](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
  }
}
```

Next, we'd create two instances:
**deployments.yaml**
```yaml
output:
  severity: .9
targets:
- apiGroups: ["apps"]
  kinds: ["Deployment"]
```

**statefulSets.yaml**
```yaml
output:
  severity: .4
targets:
- apiGroups: ["apps"]
  kinds: ["StatefulSet"]
```

### Restricting OPA Policies By Insights Context
You can restrict an OPA policy to only run in certain Insights contexts - the Insights agent, admission controller, or CI/CD. By default an OPA policy will run in all available contexts. Note that the names of contexts differ slightly for V1 vs. V2 Insights OPA policies.

#### V2 OPA Policy Context Example
Insights provides an `insightsinfo()` rego function which can return the Insights context:

* Admission
* Agent
* CI/CD

In rego, you can require the value of `insightsinfo("context")` using code like this:

```rego
  context := insightsinfo("context")
  # List the Insights contexts in which this policy should apply.
  validContexts := {"Admission", "Agent"}
  # Only continue if the policy is executing in one of validContexts{}
  validContext := validContexts[val]
  context == validContext
```

#### V1 OPA Policy Context Example
We recommend using V2 Insights OPA policies (above). These instructions remain here for backward compatibility.

Specifying a `runEnvironments` section of your Instance YAML will limit that OPA policy to the contexts selected:

```yaml
runEnvironments:
- Admission
- CI
- Agent
targets:
- apiGroups: ["apps"]
  kinds: ["StatefulSet"]
```

* Note that these context values are different from those use in a V2 Insights OPA policy.

### Varying Execution by Kubernetes Clusters
You can restrict an OPA policy to run in specific Kubernetes clusters. By default an OPA policy  will run in all available clusters.

#### V2 OPA Policy Limiting Clusters Example

```rego
  # List the Kubernetes clusters to which this policy should apply.
  validClusters := {"cluster1", "cluster2"}
  # Only continue if the policy is executing in one of validClusters{}
  cluster := insightsinfo("cluster")
  validCluster := validClusters[val]
  cluster == validCluster
```

#### V1 OPA Policy Limiting Clusters Example
We recommend using V2 Insights OPA policies (above). These instructions remain here for backward compatibility.

Specifying a `clusters` section in the instance YAML will only execute that OPA policy in those clusters.

```yaml
clusters:
- us-east-1
targets:
- apiGroups: ["apps"]
  kinds: ["StatefulSet"]
```

### Variable Parameters
If we want all Deployments to have at least 3 replicas,
but StatefulSets were OK with a single replica, we can vary this value based on the Kubernetes Kind.

```rego

```

#### V2 OPA Policy Variable Parameters Example
This rego uses a variable to define the minimum number of replicas for each Kubernetes Kind.

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
    "title": sprintf("%s doesnot have a minimum of %d replicas", [input.kind, minReplicas]),
    "description": "All workloads at acme-co must explicitly set the number of replicas. [Read more](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
    "severity": 0.2,
  }
}
```

#### V1 OPA Policy Variable Parameters Example
We recommend using V2 Insights OPA policies (above). These instructions remain here for backward compatibility.

This rego uses a parameter defined separately, in each instance YAML file.

```rego
package fairwinds

replicasRequired[actionItem] {
  input.spec.replicas < input.parameters.minReplicas
  actionItem := {
    "title": sprintf("%s does not have enough replicas set", [input.kind]),
    "description": "All workloads at acme-co must explicitly set the number of replicas. [Read more](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
    severity: 0.2,
  }
}
```

**deployments.yaml**
```yaml
parameters:
  minReplicas: 3
targets:
- apiGroups: ["apps"]
  kinds: ["Deployment"]
```

**statefulSets.yaml**
```yaml
parameters:
  minReplicas: 1
targets:
- apiGroups: ["apps"]
  kinds: ["StatefulSet"]
```

### Using the Kubernetes API
You can cross-check OPA policy input with Kubernetes objects from the cluster, at policy execution time. For example, this check ensures that all `Deployments` have an associated `HorizontalPodAutoscaler`:

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

## More Examples
You can find more examples in the [Insights Plugins repository](https://github.com/FairwindsOps/insights-plugins/tree/main/plugins/opa/examples)

