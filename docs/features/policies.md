---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Fairwinds Insights comes with over 100 built-in polices that can be used to audit or block resources in your Kubernetes environment or Infrastructure-as-Code"
---
# Policies
## About
Fairwinds Insights comes with over 100 built-in polices that can be used to audit or block resources in your Kubernetes environment or Infrastructure-as-Code.
You can also create your own custom policies using Open Policy Agent's (OPA) Rego language.

## Rego v0 and v1
We are currently supporting both Rego v0 and v1, but we encourage moving to Rego v1 as V0 is deprecated.
* For more information about [VO upgrade](https://www.openpolicyagent.org/docs/latest/v0-upgrade/)
* How to migrate [How to migrate][https://www.styra.com/blog/renovating-rego/]

## Configuration
Policy configuration provides a way to globally set default values for any Policies used by any of the Report Tools in Insights. These settings make it easy to customize Insights for common policy scenarios without having to first write Automation Rules.

Policy configuration can be used to:
* **Customize the default Policy Enforcement behavior for CI/CD and Admission Controller contexts:** For example, ensure workloads with `Privilege escalation should not be allowed` are blocked by the Admission Controller at time of deployment, but only warn users through Action Items when they scan their infrastructure-as-code in a repository scan

* **Always guarantee a certain Policy enforcement action (pass or fail) regardless of Action Item severity:** For example, enforce `Memory requests are set` at time of Admission across your organization, while reporting it as a `Medium` severity Action Item

* **Modify default Severities:** Globally modify the default Severity of Action Items to better match your organization's requirements. For example, you may want to increase the severity of `Liveness probes are missing` to `High`

With the Policy Configuration, you can now override the default settings of a Policy generated by any of the tools in Insights:
| **Policy Configuration Setting** | **Default**                                                   | **Description**                                      |
| ------------------------------- | ------------------------------------------------------------  | -------------------------------------- |
| Set the default severity        | Defaults to the severity used in the original reporting tool  | This makes it easy to change the default severity of Action Items to better align with your organization's reporting requirements |
| Blocking override for CI/CD and Admission Controller               | Based on Action Item severity. `High` and `Critical` are blocking | For the CI/CD and Admission Controller contexts, you can enforce a "must always fail" or "must always pass" rule regardless of the Action Item's severity |                                                                                            |

Policy is configured via the CLI, which will sync any YAML or custom OPA policies to the Insights API.
For more information see the [CLI documentation](/features/insights-cli)

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

#### Custom options
Some reports may have custom `options` for given `$eventType`.

For `goldilocks` and `prometheus-metrics`, you may configure a `threshold` which control if an action-item must be created or not on Fairwinds Insights, i.e.:
```yaml
checks:
  goldilocks:
    cpu_limits_too_low:
      options:
        threshold: 0.2 # only creates action-items when actual usage deviates from desirable by 20%
```

### Verifying the Configuration of Policies
1. In Insights, go to the `Policy` page
2. In the Policies table, for the `Configuration` column select the `Customized` filter

This should show you the Policies that have been modified using the `settings.yaml` file.

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
[OPA Policies with the CLI](/features/insights-cli) for more information.

### Designing OPA Policies
Each OPA policy will receive an `input` parameter which contains
a Kubernetes resource.

For example, we can check to make sure that `replicas` is set on all `Deployments`:

Rego v0:
```rego
package fairwinds

replicasRequired[actionItem] {
  input.kind == "Deployment"
  input.spec.replicas == 0
  actionItem := {}
}
```

Rego v1:
```rego
package fairwinds

import rego.v1

replicasRequired contains actionItem if {
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

Rego v0:
```rego
package fairwinds

replicasRequired[actionItem] {
  input.kind == "Deployment"
  input.spec.replicas == 0
  actionItem := {
    "title": "Deployment does not have replicas set",
    "description": "All workloads at acme-co must explicitly set the number of replicas",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
    "severity": 0.5
  }
}
```

Rego v1:
```rego
package fairwinds

import rego.v1

replicasRequired contains actionItem if {
        input.kind == "Deployment"
        input.spec.replicas == 0
        actionItem := {
                "title": "Deployment does not have replicas set",
                "description": "All workloads at acme-co must explicitly set the number of replicas",
                "remediation": "Please set `spec.replicas`",
                "category": "Reliability",
                "severity": 0.5,
        }

}
```

#### Varying Action Item Attributes
You can reuse the same OPA policy, setting different Action Item attributes for different cases.
For instance, say we wanted to apply our `replicas` policy above to both `Deployment` and `StatefulSet`
but wanted a higher severity for `Deployments`:

Revo v0:
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
  kind := kinds[_]
  input.kind == kind
  input.spec.replicas == 0
  # Set the severity based on the Kind.
  dynamicSeverity := severityByKind[input.kind]
  actionItem := {
    "title": "Deployment does not have replicas set",
    "description": "All workloads at acme-co must explicitly set the number of replicas",
    "remediation": "Please set `spec.replicas`",
    "category": "Reliability",
    "severity": dynamicSeverity,
  }
}
```

Rego v1:
```rego
package fairwinds

import rego.v1

replicasRequired contains actionItem if {
        # List the Kubernetes Kinds to which this policy should apply.
        kinds := {"Deployment", "StatefulSet"}

        # List severities for each of the above Kinds. Kind.
        severityByKind := {
                "StatefulSet": 0.4,
                "Deployment": 0.9,
        }

        # Iterate Kinds{} and only continue if input.kind is one of them.
        kind := kinds[_]
        input.kind == kind
        input.spec.replicas == 0

        # Set the severity based on the Kind.
        dynamicSeverity := severityByKind[input.kind]
        actionItem := {
                "title": "Deployment does not have replicas set",
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
  validContext := validContexts[_]
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
  validCluster := validClusters[_]
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
  validOperation := validOperations[_]
  operation == validOperation
```

#### Variable Parameters
If we want:
* Deployments to have at least three replicas
* StatefulSets to have at least one replica

we can vary this value based on the Kubernetes Kind:

Rego v0:
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
  kind := kinds[_]
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

Rego v1:
```rego
package fairwinds

import rego.v1

replicasRequired contains actionItem if {
        # List the Kubernetes Kinds to which this policy should apply.
        kinds := {"Deployment", "StatefulSet"}

        # List severities for each of the above Kinds. Kind.
        severityByKind := {
                "StatefulSet": 0.4,
                "Deployment": 0.9,
        }

        # Iterate Kinds{} and only continue if input.kind is one of them.
        kind := kinds[_]
        input.kind == kind
        input.spec.replicas == 0

        # Set the severity based on the Kind.
        dynamicSeverity := severityByKind[input.kind]
        actionItem := {
                "title": "Deployment does not have replicas set",
                "description": "All workloads at acme-co must explicitly set the number of replicas",
                "remediation": "Please set `spec.replicas`",
                "category": "Reliability",
                "severity": dynamicSeverity,
        }
}
```

#### Using the Kubernetes API
You can cross-check OPA policy input with Kubernetes objects from the cluster at Policy execution time. For example, this ensures that all `Deployments` have an associated `HorizontalPodAutoscaler`:

Rego v0:
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
Rego v1:
```rego
package fairwinds

import rego.v1

hasMatchingHPA(hpas, elem) if {
        hpa := hpas[_]
        hpa.spec.scaleTargetRef.kind == elem.kind
        hpa.spec.scaleTargetRef.name == elem.metadata.name
        hpa.metadata.namespace == elem.metadata.namespace
        hpa.spec.scaleTargetRef.apiVersion == elem.apiVersion
}

hpaRequired contains actionItem if {
        not hasMatchingHPA(kubernetes("autoscaling", "HorizontalPodAutoscaler"), input)
        actionItem := {"title": "No horizontal pod autoscaler found"}
}
```

### Using a Custom OPA Library

You can create a custom OPA library to encapsulate and reuse Rego code, such as functions and policies, across multiple policy files. Any package that is not within the `fairwinds` namespace can be used as a reusable package.

Consider the following example, where we define a reusable function in a custom package called utils:

Rego v0:
```rego
package utils

hasMatchingHPA(hpas, elem) {
  hpa := hpas[_]
  hpa.spec.scaleTargetRef.kind == elem.kind
  hpa.spec.scaleTargetRef.name == elem.metadata.name
  hpa.metadata.namespace == elem.metadata.namespace
  hpa.spec.scaleTargetRef.apiVersion == elem.apiVersion
}
```

Rego v1:
```rego
package utils

import rego.v1

hasMatchingHPA(hpas, elem) if {
        hpa := hpas[_]
        hpa.spec.scaleTargetRef.kind == elem.kind
        hpa.spec.scaleTargetRef.name == elem.metadata.name
        hpa.metadata.namespace == elem.metadata.namespace
        hpa.spec.scaleTargetRef.apiVersion == elem.apiVersion
}
```

The `hasMatchingHPA` function is defined within the `utils` package. This function can be imported and reused in other policy checks, allowing you to avoid code duplication and maintain consistency.

#### Example: Reusing the `hasMatchingHPA` Function

To use the `hasMatchingHPA` function in another policy, such as one within the `fairwinds` package, you can import the `utils` package as follows:

##### Importing a Specific Function

Rego v0:
```rego
package fairwinds

import data.utils.hasMatchingHPA

hpaRequired[actionItem] {
  not hasMatchingHPA(kubernetes("autoscaling", "HorizontalPodAutoscaler"), input)
  actionItem := {
    "title": "No horizontal pod autoscaler found"
  }
}
```

Rego v1:
```rego
package fairwinds

import rego.v1

import data.utils.hasMatchingHPA

hpaRequired contains actionItem if {
        not hasMatchingHPA(kubernetes("autoscaling", "HorizontalPodAutoscaler"), input)
        actionItem := {"title": "No horizontal pod autoscaler found"}
}
```

##### Importing the Entire Package

Alternatively, you can import the entire utils package and access the function with the package prefix:

Rego v0:
```rego
package fairwinds

import data.utils

hpaRequired[actionItem] {
  not utils.hasMatchingHPA(kubernetes("autoscaling", "HorizontalPodAutoscaler"), input)
  actionItem := {
    "title": "No horizontal pod autoscaler found"
  }
}
```

Rego v1:
```rego
package fairwinds

import rego.v1

import data.utils

hpaRequired contains actionItem if {
        not utils.hasMatchingHPA(kubernetes("autoscaling", "HorizontalPodAutoscaler"), input)
        actionItem := {"title": "No horizontal pod autoscaler found"}
}
```

In both cases, the `hasMatchingHPA` function is leveraged to determine whether a matching HPA exists, simplifying the policy logic and improving code reuse.

### Testing OPA Policies
After uploading a new Policy, it's good to test that it is working properly. To do so you can
manually kick off a report:
```
kubectl create job opa-test --from cronjob/opa -n insights-agent
```

Watch the pod logs for the resulting `Job` to spot any potential errors in your OPA policy.

The Insights CLI also facilitates offline testing of OPA policies. Check out
the [Validating OPA policy](/features/insights-cli#testing) documentation.

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
    - ingresses
```

By default the OPA plugin inherits the same Kubernetes APIGroups and Resources defined in the default rules for [the Admission Controller](/features/admission-controller).

## Push OPA checks from external sources
If you manage your OPA policies externally, you can import them into Fairwinds Insights by pushing OPA checks from external sources. To do this, create a definition file at `external-opa/external-sources.yaml` as shown below.

```
.
├── external-opa/
│   └── external-sources.yaml
```

```yaml
externalSources:
  - name: "this-is-an-external-lib" # lib files should be included first due to dependency
    description: "This is an external lib"
    url: "https://gist.githubusercontent.com/username/sha/raw/sha/rego1.rego"
  - name: "this-uses-the-lib"
    description: "This uses the external lib"
    url: "https://gist.githubusercontent.com/username/sha/raw/sha/rego2.rego"
    enabled: false
```

**Fields Explained:**
- `name`: Name of the OPA policy, this will be the policy name used on Fairwinds Insights
  - must consist of lower case alphanumeric characters, '-' or '.', and must start and end with an alphanumeric character.
- `description`: A brief explanation of what the policy does.
- `url`: The direct URL to the raw content of the Rego file.
- `enabled`: Set to `false` if you want to disable this policy by default. Policies are enabled by default if not explicitly set.

Each external source reference should point to a raw file on the remove server.

i.e: A valid content for `https://gist.githubusercontent.com/username/sha/raw/sha/rego1.rego`
Rego v0:
```rego
package fairwinds

not_in_namespace[actionItem] {
    blockedNamespaces := ["default"]
    namespace := blockedNamespaces[_]
    input.kind == "Pod"
    input.metadata.namespace == namespace
    description := sprintf("Namespace %v is forbidden", [namespace])
    actionItem := {
        "description": description,
        "title": "Using the default namespace is bad",
        "severity": 0.1,
        "remediation": "Move this resource to a different namespace",
        "category": "Reliability"
    }
}
```

Rego v1:
```rego
package fairwinds

import rego.v1

not_in_namespace contains actionItem if {
        blockedNamespaces := ["default"]
        namespace := blockedNamespaces[_]
        input.kind == "Pod"
        input.metadata.namespace == namespace
        description := sprintf("Namespace %v is forbidden", [namespace])
        actionItem := {
                "description": description,
                "title": "Using the default namespace is bad",
                "severity": 0.1,
                "remediation": "Move this resource to a different namespace",
                "category": "Reliability",
        }
}
```

Then, use the following to push external checks to Fairwinds Insights:
```sh
insights-cli push external-opa \
 -s external-opa \
 -f external-sources.yaml \
 -header "Authorization: Bearer $TOKEN" \
 -header "Accept: text/plain" \
 --delete
```

use `insights-cli push external-opa -h` for command and parameters completeness.

**Security Considerations:**
Ensure that external sources are from trusted locations, especially when linking public Gist URLs. Additionally, handle the `$TOKEN` with care and do not expose it in public repositories or logs.

## Troubleshooting
### Debug Print Statements
Rego `print()` statements will be included in the output of `insights-cli validate opa` to help debug Policy execution. For example, this Policy prints two debug messages.

Rego v0:
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

Rego v1:
```rego
package fairwinds

import rego.v1

incompleteRule contains actionItem if {
        print("starting our rule")
        input.kind == "Deployment"
        print("made it past the kind detection, which is ", input.kind)
        actionItem := {}
        # This is incomplete!

}
```
