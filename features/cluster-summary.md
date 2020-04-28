# Cluster Summary

The Cluster Summary page gives an overview of your cluster. You can find
the following information here:
* Current version of the Insights Agent
* Kubernetes statistics
  * Version
  * Nodes
  * Namespaces
  * Workloads
  * Pods
* Namespace Summaries
* Priorities

## Namespace Summaries
The Namespace Summaries section shows Namespaces in your cluster organized by the number of outstanding Action Items. Action Items are categorized into categories for Security, Efficiency, and Reliability and also organized into Warning (Orange) severity vs. Danger (Maroon) severity.

<img :src="$withBase('/img/cluster-summary-namespaces-summary.png')" alt="namespace summary screenshot">

## Priorities
The Priorities section will show you the number of action items broken down by severity and into the following categories, Security, Efficiency, and Reliability. This can be a quick view into your cluster so you can find the areas to focus on first and each category has a link to view the details of those action items.

<img :src="$withBase('/img/cluster-summary-priorities.png')" alt="priorities screenshot">
