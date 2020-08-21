# OPA
Fairwinds Insights supports the use of custom OPA policies to create Action Items.

> This document assumes you are familiar with
> [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/),
> the policy language used by OPA.

## Designing Policies
Each Rego policy will recieve an `input` parameter, which contains
a Kubernetes resource.

For example, we can check to make sure that `replicas` is set on all `Deployments`

```rego
package fairwinds

appLabelRequired[actionItem] {
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
* `severity` - between 0.0 and 1.0. > .66 will become a `danger` item

For instance, on our check above, we could set:
```rego
package fairwinds

appLabelRequired[actionItem] {
  input.kind == "Deployment"
  input.spec.replicas == 0
  actionItem := {
    title: "Deployment does not have securityContext set",
    description: "All deployments at acme-co must explicitly set a [securityContext](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)",
    remediation: "Please set `spec.securityContext`",
    category: "Security",
    severity: 0.5
  }
}
```

## Uploading Policies
To add your policies to Insights, you'll need to use the API. You can find your API key on your organization's
settings page (note: you must be an admin for your organization).

First, package your rego into a YAML file. Note that you can set default values for the resulting Action Items
in this YAML:

**securityContextSet.yaml**
```yaml
output:
  title: "Deployment does not have securityContext set"
  description: "All deployments at acme-co must explicitly set a [securityContext](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)"
  remediation: "Please set `spec.securityContext`"
  category: "Security"
  severity: 0.5
rego: |
  appLabelRequired[actionItem] {
    input.kind == "Deployment"
    input.spec.replicas == 0
    actionItem := {}
  }
```

Then, use the Insights API to add your check:
```bash
export checkName=securityContextSet
export organization=acme-co # your org name in Insights
export token=abcde # get this from your org settings page
curl -X PUT -H "Content-type: application/x-yaml" \
  -H "Authorization: Bearer $admintoken" \
  "https://insights.fairwinds.com/v0/organizations/$organization/opa/customChecks/$checkName" \
  --data-binary @securityContextSet.yaml
```

Next, we need to tell Insights what sorts of resources to apply our check to:

**deployments.yaml**
```yaml
targets:
- apiGroups: ["apps/v1"]
  kinds: ["Deployment"]
```

```bash
export instanceName=deployments
curl -X PUT -H "Content-type: application/x-yaml" \
  -H "Authorization: Bearer $admintoken" \
  "https://insights.fairwinds.com/v0/organizations/$organization/opa/customChecks/$checkName/instances/$instanceName" \
  --data-binary @deployments.yaml
```


