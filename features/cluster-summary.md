---
meta:
  - name: title
    content: Fairwinds Insights Cluster Summary
  - name: description
    content: The Fairwinds Insights Cluster Summary page gives an overview of your cluster. Read the documentation.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, cluster summary
---

# Cluster Summary

The Cluster Summary page gives an overview of your cluster. You can find
the following information here:
* Priorities
* Namespace Summaries
* Report Breakdown
* Cluster Breakdown
  * Kubernetes Version
  * Current version of the Insights Agent
  * Node count
  * Namespace count
  * Workload count
  * Pod count
* Plugins list

## Priorities
The Priorities section will show you the total number of action items broken down by severity and category.
Each category has a link to view the full list of associated Action Items.

<img :src="$withBase('/img/cluster-summary-priorities.png')" alt="priorities screenshot">

## Namespace Summaries
The Namespace Summaries section shows Namespaces in your cluster organized by the number of outstanding Action Items.
Action Items are categorized as Security, Efficiency, and Reliability,
and assigned a severity of `warning` (orange) severity or `danger` (red).

<img :src="$withBase('/img/cluster-summary-namespaces-summary.png')" alt="namespace summary screenshot">

## Report Breakdown
The Report Breakdown shows a summary of open action items organized by report configured in the Insights Agent.

<img :src="$withBase('/img/cluster-summary-reports-breakdown.png')" alt="nreport breakdown screenshot">

## Plugins List
The Plugins section shows different integrations that can be setup from Insights including sending notifications to Slack and metrics to Datadog.
