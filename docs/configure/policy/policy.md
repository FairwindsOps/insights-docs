---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation. The OPA Report allows you to define custom policies for checking Kubernetes resources. "
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

For instance, on our check above, we could set:
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

## Uploading Policies

### Via the CLI
To manage policies in an infrastructure-as-code repository, you can use the [Insights CLI](/configure/cli/cli).
Be sure to read the [CLI documentation](/configure/cli/opa) before getting started here.

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

## Testing your Policies
After uploading new checks, it's good to test that they're working properly. To do so, you can
manually create a one-off report:
```
kubectl create job my-opa-test --from=cronjob/opa -n insights-agent
```

Watch the logs for the resulting Job to spot any potential errors in your work.

## Tips and Tricks

### Reusing Rego Policies
You can reuse the same Rego policy, setting different ActionItem attributes in different cases.
For instance, say we wanted to apply our `replicas` policy above to both `Deployments` and `StatefulSets`,
but wanted a higher severity for `Deployments`.

First, we'd stop specifying `severity` inside our OPA, so that it can be set by the instance:
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

#### Run Types

In addition to targeting specific types of resources you can also specify your instance to only run in certain contexts. By default an instance will run in all available contexts, but if you specify a `runEnvironments` section of your YAML then it will only run in the environments selected.

```yaml
runEnvironments:
- Admission
- CI
- Agent
targets:
- apiGroups: ["apps"]
  kinds: ["StatefulSet"]
```

#### Clusters

If you want to restrict a policy to only running on a specific cluster you can specify which clusters to run in. By default an instance will run in all available clusters, but if you specify a `clusters` section of your YAML then it will only run in the clusters selected.

```yaml
clusters:
- us-east-1
targets:
- apiGroups: ["apps"]
  kinds: ["StatefulSet"]
```

#### Parameters
We can also pass parameters to our instances. Say, for instance, that we wanted all Deployments to have at least 3 replicas,
but StatefulSets were OK with a single replica. Then we could write:

```rego
package fairwinds

replicasRequired[actionItem] {
  input.spec.replicas < input.parameters.minReplicas
  actionItem := {
    "title": concat(" ", [input.kind, "does not have enough replicas set"]),
    "description": "All workloads at acme-co must explicitly set the number of replicas. [Read more](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
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
You can also cross-check resources with other Kubernetes objects. For example, we could use
this check to ensure that all `Deployments` have an associated `HorizontalPodAutoscaler`:

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

