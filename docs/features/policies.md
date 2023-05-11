---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Fairwinds Insights comes with over 100 built-in polices that can be used to audit or block resources in your Kubernetes environment or Infrastructure-as-Code"
---
# Policies
## About
Fairwinds Insights comes with over 100 built-in polices that can be used to audit or block resources in your Kubernetes environment or Infrastructure-as-Code.
You can also create your own custom policies using Open Policy Agent's (OPA) Rego language.

## Configuration
Policy configuration provides a way to globally set default values for any Policies used by any of the Report Tools in Insights. These settings make it easy to customize Insights for common policy scenarios without having to first write Automation Rules.

Policy configuration can be used to:
* **Customize the default Policy Enforcement behavior for CI/CD and Admission Controller contexts:** For example, ensure workloads with `Privilege escalation should not be allowed` are blocked by the Admission Controller at time of deployment, but only warn users through Action Items when they scan their infrastructure-as-code in a repository scan

* **Always guarantee a certain Policy enforcement action (pass or fail) regardless of Action Item severity:** For example, enforce `Memory requests are set` at time of Admission across your organization, while reporting it as a `Medium` severity Action Item

* **Modify default Severities:** Globally modify the default Severity of Action Items to better match your organization's requirements. For example, you may want to increase the severity of `Liveness probes are missing` to `High`

With the new Policy Configurator, you can now override the default settings of a Policy generated by any of the tools in Insights:
| **Policy Configurator Setting** | **Default**                                                   | **Description**                                      |
| ------------------------------- | ------------------------------------------------------------  | -------------------------------------- |
| Set the default severity        | Defaults to the severity used in the original reporting tool  | This makes it easy to change the default severity of Action Items to better align with your organization's reporting requirements |
| Blocking override for CI/CD and Admission Controller               | Based on Action Item severity. `High` and `Critical` are blocking | For the CI/CD and Admission Controller contexts, you can enforce a "must always fail" or "must always pass" rule regardless of the Action Item's severity |                                                                                            |

Policy is configured via the CLI, which will sync any YAML or custom OPA policies to the Insights API.
For more information see the [CLI documentation](features/insights-cli)

### Syntax
The CLI expects a `settings.yaml` file in the current directory. The file should follow the following format:
```yaml
checks:
  $reportType: # You can find this in the Action Items or Policy UI (e.g. `polaris`)
    $eventType: # You can find this in the Action Items or Policy UI (e.g. `runAsRootAllowed`)
      severity: <critical/high/medium/low/none>
      ci:
        block: <true/false>
      admission:
        block: <true/false>
admissionSettings: # Optionally specify per-org or per-cluster admission controller settings
  passiveMode: <true/false> # Required. Sets passive mode organization-wide
  opaEnabled: <true/false> # Required. Enable OPA policies with admission, organization-wide
  plutoEnabled: <true/false> # Required. Enable pluto with admission, organization-wide
  polarisEnabled: <true/false> # Required. Enable polaris with admission, organization-wide
  clusters: # Specify settings per-cluster
    - clusterName: dev
      passiveMode: <true/false>
      opaEnabled: <true/false>
      plutoEnabled: <true/false>
      polarisEnabled: <true/false>
```

* For OPA policies under the `checks` section, the `$reportType` is `opa` and the `$eventType` is the Policy name.
* The `admissionSettings` section requires the `passiveMode` and `polarisEnabled` options to be specified.
* If `admissionSettings` is not specified, all reports are enabled by default, an passive mode is on by default.

Once the file has been created, use the following command to push the Policies Configuration:
```
insights-cli push settings
```

#### Minimal Example
```yaml
checks:
  polaris:
    runAsRootAllowed:
      severity: medium
    livenessProbeMissing:
      severity: high
      ci:
        block: true
      admission:
        block: false
```

### Verifying the Configuration of Policies
1. In Insights, go to the `Policy` page
2. In the Policies table, for the `Configuration` column select the `Customized` filter

This should show you the Policies that have been modified using the `settings.yaml` file.

### Automation Rules
[Automation Rules](features/automation) can be used to further customize your policies.
Automation Rules take precedence over the configuration above.

## Custom Policies with OPA
The OPA report allows you to define custom Policies for checking Kubernetes resources.
This is useful for enforcing policies that are specific to your organization.
> You may want to familiarize yourself with
> [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/),
> the policy language used by OPA.

### Creating OPA Policies
#### Using the Insights UI
1. Visit your organization's `Policy` page
2. Click the `Create OPA Policy` button

You'll see a sample Policy that disallows Deployments to the `evil` namespace. This should give you a quick sense for
how to write OPA policies for Insights.

Insights also comes with several templates for OPA Policies which you can modify as needed. To view these templates:
1. Visit your organization's `Policy` page
2. Navigate to the `OPA Policy Templates` page

#### Using the Insights CLI
To manage policies in an infrastructure-as-code repository, you can use the Insights command-line interface (CLI). Check out
[OPA Policies with the CLI](features/insights-cli) for more information.

### Designing OPA Policies
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

#### Varying Action Item Attributes
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

#### Restricting OPA Policies by Insights Context
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

#### Varying Execution by Kubernetes Clusters
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

#### Varying Execution by Admission Request Properties
You can restrict an OPA policy to run based on several admissionRequest properties.
Accessible via `insightsinfo("admissionRequest")` Rego function:

```rego
  # List of admission request operations to which this policy should apply.
  validOperations := {"CREATE"}
  # Only continue if the policy is executing in one of validOperations list
  operation := insightsinfo("admissionRequest").operation
  validOperation := validOperations[val]
  operation == validOperation
```

#### Variable Parameters
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

#### Using the Kubernetes API
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

### Testing OPA Policies
After uploading a new Policy, it's good to test that it is working properly. To do so you can
manually kick off a report:
```
kubectl create job opa-test --from cronjob/opa -n insights-agent
```

Watch the pod logs for the resulting `Job` to spot any potential errors in your OPA policy.

The Insights CLI also facilitates offline testing of OPA policies. Check out
the [Validating OPA policy](features/insights-cli#validate-and-debug-opa-policies) documentation.

### Adding Resources to OPA Policies
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

By default the OPA plugin inherits the same Kubernetes APIGroups and Resources defined in the default rules for [the Admission Controller](features/admission-controller).

## Troubleshooting
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