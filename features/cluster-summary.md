# Cluster Summary

The Cluster Summary page gives an overview of your cluster. You can find
the following information here:
* Current version of the Insights Agent
* Last report time (for the workloads report)
* Kubernetes statistics
  * Version
  * Nodes
  * Namespaces
  * Workloads
  * Pods
* Scores
* Cost estimates

## Scores
Cluster scores are computed using the total severity of action items in the table,
and normalized by the number of workloads you have running in your cluster.

<img :src="$withBase('/img/cluster-scores.png')" alt="cluster scores">

For example, say you have two **Security** action items, one with severity
`0.5`, and one with severity `0.25`. If you have `10` workloads running
in your cluster, this will give you a score of:
```
1.0 - (0.5 + 0.25) / 10.0
= 1.0 - .075
= .925
= 92.5%
```

The **Overall** score is an average of the **Security**, **Efficiency**, and **Reliability** scores.

## Cost Estimates
<img :src="$withBase('/img/cost-estimates.png')" alt="cluster cost estimates">

We estimate costs based on pricing for AWS on-demand EC2 instances.

We use the numbers provided by AWS to come up with average per-CPU and per-GB-RAM costs.
We multiply these by the resources available in your cluster, and use the maximum of CPU and RAM pricing to come up with the final number.

This results in a conservative estimate - your bill will likely be less.

### Utilization
Cost estimates also show percent utilization. This totals up the limits and requests set by
each workload running in your cluster, and shows them as a percentage of the total node
capacity.

We recommend aiming for about 75% utilization for requests, and 90% utilization for limits.
