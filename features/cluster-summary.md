# Cluster Summary

The Cluster Summary page gives an overview of your cluster. You can find
the following information here:
* Priorities
* Namespace Summaries
* Cluster Breakdown
  * Current version of the Insights Agent
  * Kubernetes Version
  * Nodes
  * Namespaces
  * Workloads
  * Pods

## Priorities
The Priorities section will show you the total number of action items broken down by severity and category.
Each category has a link to view the full list of associated Action Items.

<img :src="$withBase('/img/cluster-summary-priorities.png')" alt="priorities screenshot">

## Namespace Summaries
The Namespace Summaries section shows Namespaces in your cluster organized by the number of outstanding Action Items.
Action Items are categorized as Security, Efficiency, and Reliability,
and assigned a severity of `warning` (orange) severity or `danger` (red).

<img :src="$withBase('/img/cluster-summary-namespaces-summary.png')" alt="namespace summary screenshot">

