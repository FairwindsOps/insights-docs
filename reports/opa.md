# OPA
Fairwinds Insights supports the use of custom OPA policies to create Action Items.

## Enable the OPA agent
To enable OPA, make sure you pass `--set opa.enabled=true` when
[installing the insights-agent](/installation/insights-agent)

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
* `severity` - between 0.0 and 1.0. > .66 will become a `danger` item

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
To add your policies to Insights, you'll need to use the API. You can find your API key on your organization's
settings page (note: you must be an admin for your organization).

Lets upload our `replicasRequired` check by creating `replicas.rego`:
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

Then, use the Insights API to add your check:
```bash
export checkName=replicas
export organization=acme-co # your org name in Insights
export token=abcde # get this from your org settings page
curl -X PUT -H "Content-type: text/plain" \
  -H "Authorization: Bearer $token" \
  "https://insights.fairwinds.com/v0/organizations/$organization/opa/customChecks/$checkName" \
  --data-binary @replicas.rego
```

Next, we need to create a `checkInstance` to tell Insights what sorts of resources to apply our check to:

**deployments.yaml**
```yaml
targets:
- apiGroups: ["apps"]
  kinds: ["Deployment"]
```

```bash
export instanceName=deployments
curl -X PUT -H "Content-type: application/x-yaml" \
  -H "Authorization: Bearer $token" \
  "https://insights.fairwinds.com/v0/organizations/$organization/opa/customChecks/$checkName/instances/$instanceName" \
  --data-binary @deployments.yaml
```

## Testing your Policies
After uploading new checks, it's good to test that they're working properly. To do so, you can
manually create a one-off report:
```
kubectl create job my-opa-test --from=cronjob/opa -n insights-agent
```

Watch the logs for the resulting Job to spot any potential errors in your work.

## Reusing Rego Policies
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

### Parameters
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

## Using the Kubernetes API
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
You can find more examples in the [Insights Plugins repository](https://github.com/FairwindsOps/insights-plugins/tree/master/plugins/opa/examples)
