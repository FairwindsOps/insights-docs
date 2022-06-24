# Right-sizer
Right-sizer is a Kubernetes Controller that detects and optionally modifies containers that have run out of memory and been OOM-killed and maintains an Insights report of those containers with their owning pod-controllers (such as Deployments, StatefulSets or DaemonSets). The Controller persists report data in a Kubernetes ConfigMap which the accompanying Insights Agent CronJob retrieves and submits to the Insights API.

The right-sizer controller removes pod-controllers from its report when no OOM-kill has been seen within a time window (default 24 hours) or if the memory limits have been modified compared to the limits from the last-seen OOM-kill. 

## Setup and Configuration
To quickly get going with the right-sizer you can enable it by adding the following to your `values.yaml` file.

> If you're using a version of Insights Agent below 2.0 you will need to remove the hyphen between right-sizer from the below value.

```
right-sizer:
  enabled: true
```

By default the right-sizer will only generate Action Items for Insights and it will not update memory limits when a pod crashes. When enabling this feature, you may want to also specify a list of Kubernetes namespaces to limit potential Action Item noise and impact to workloads.

To configure the right-sizer to increase memory limits when a pod crashes please see the [right-sizer Helm values](https://github.com/FairwindsOps/charts/blob/master/stable/insights-agent/values.yaml) within the Insights Agent Helm chart.

Available configuration includes:

* The minimum number of OOM-kills a container must have before memory limits are updated by patching its pod-controller
* The limits increment which is multiplied by the current container limits to calculate the new limits to be updated
* The maximum limits which is multiplied by the limits of the first-seen OOM-kill to calculate the highest value to which limits can be updated for that container
* Namespaces which limit both where OOM-kills are considered and where memory limits will be updated
