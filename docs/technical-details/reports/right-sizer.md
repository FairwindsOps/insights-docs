# Right-sizer

As of Insights Agent version `4.0`, Right-sizer now refers to multiple capabilities:

* A controller that manages VPA objects for automated right-sizing, and
* A controller that detects and modifies contains that have been OOM-killed

These are currently separate binaries and container images:

https://quay.io/repository/fairwinds/insights-right-sizer: refers to the VPA controller

https://quay.io/repository/fairwinds/right-sizer: refers to OOM-kill detection and resolution

The intention is to consolidate both of these in a future release once more testing has been done.

## Breaking Changes

 Version 4.0
> The 4.0 release of insights-agent contains breaking changes to `right-sizer`. This component has been rebranded to refer to Insights automated right sizing. The `right-sizer` prior to this release will be referred to as `oom-detection` going forward. These will be further consolidated in a future release to avoid confusion.

## Automated Workload Right-sizing

## Setup and Configuration

Right-sizer includes a custom `recommender` VPA component, we've modified the recommender to retrieve recommendations from Insights. When `right-sizer` is enabled, we will install the [Fairwinds VPA](https://artifacthub.io/packages/helm/fairwinds-stable/vpa) helm chart with this custom image for you.

The `INSIGHTS_TOKEN` environment variable is necessary for the VPA recommender to query for Insights recommendations. Since it's managed in a separate Helm chart, the VPA installation will assume that the name of your Insights Agent token secret is `insights-agent`. This can be overridden with `recommender.envFromSecret` is needed.

The Right-sizer configuration is YAML definied in a `ConfigMap`

```yaml
# when the controller is running with `--on-by-default`,
# this is the configuration that will be applied to namespaces
# which are not explicitly configured in `includeNamespaces`
default:
  vpa:
    # full VerticalPodAutoscaler spec
    minReplicas: 1
    updatePolicy:
      updateMode: "Off"
    resourcePolicy:
        containerPolicies:
          - containerName: "*"
            maxAllowed:
              cpu: 2
              memory: "4Gi"
# namespaces that will be explicitly included for recommendations
# allows VPAs to be configured individually by namespace
includeNamespaces:
  - namespace: "my-namespace-1"
    vpa:
      # this is a full VerticalPodAutoscaler specification
      minReplicas: 1
      updatePolicy:
        updateMode: "Auto"
      resourcePolicy:
        containerPolicies:
          - containerName: "*"
            minAllowed:
              cpu: "100m"
            maxAllowed:
              cpu: 1
              memory: "2Gi"
  - namespace: "my-namespace-2"
    vpa:
      minReplicas: 1
      updatePolicy:
        updateMode: "Auto"
      resourcePolicy:
        containerPolicies:
          - containerName: "*"
            minAllowed:
              cpu: "250m"
            maxAllowed:
              cpu: 2
              memory: "3Gi"
  - namespace: "my-namespace-3"
# list of namespaces that are explicitly excluded from recommendations
excludeNamespaces:
    - default
    - insights-agent
```

You can also opt-in (when `on-by-default` is enabled) or opt-out of automated right-sizing by annotating Namespaces:

`insights.fairwinds.com/right-sizer` = `true` | `false`

# OOM (Out-Of-Memory) Detection

OOM-Detection is a Kubernetes Controller that detects and optionally modifies containers that have run out of memory and been OOM-killed and maintains an Insights report of those containers with their owning pod-controllers (such as Deployments, StatefulSets or DaemonSets). The Controller persists report data in a Kubernetes ConfigMap which the accompanying Insights Agent CronJob retrieves and submits to the Insights API.

The oom-detection controller removes pod-controllers from its report when no OOM-kill has been seen within a time window (default 24 hours) or if the memory limits have been modified compared to the limits from the last-seen OOM-kill. 

## Setup and Configuration
OOM-Detection is on by default when right-sizer is enabled:

```
right-sizer:
  enabled: true
```

> `right-sizer` has been repurposed to include other automated right-sizing capabilities. Starting with version `4.0` of the Insights Agent, configuration is now defined in the `oom-detection` section under `right-sizer`

By default the right-sizer will only generate Action Items for Insights and it will not update memory limits when a pod crashes. When enabling this feature, you may want to also specify a list of Kubernetes namespaces to limit potential Action Item noise and impact to workloads.

To configure the right-sizer to increase memory limits when a pod crashes please see the [right-sizer.oom-detection Helm values](https://github.com/FairwindsOps/charts/blob/master/stable/insights-agent/values.yaml) within the Insights Agent Helm chart.

Available configuration includes:

* The minimum number of OOM-kills a container must have before memory limits are updated by patching its pod-controller
* The limits increment which is multiplied by the current container limits to calculate the new limits to be updated
* The maximum limits which is multiplied by the limits of the first-seen OOM-kill to calculate the highest value to which limits can be updated for that container
* Namespaces which limit both where OOM-kills are considered and where memory limits will be updated
