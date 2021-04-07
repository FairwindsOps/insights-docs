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

<img :src="$withBase('/img/overview.png')" alt="cluster overview">

The Cluster Summary page gives an overview of your cluster. You can find
the following information here:
* Your cluster's health score
* A graph of new and fixed action items
* A graph of health score over time
* A graph of workload costs over time
* A list of your top action items
* A list of action items assigned to you

## Health Score
<div class="mini-img">
  <img :src="$withBase('/img/cluster-health-score.png')" alt="cluster health score">
</div>

This graph gives you a sense for how healthy your cluster is overall.

The score takes into account how many Insights checks are passing or failing, weighted
by the level of severity. To improve your score, fix some of the Action Items listed,
especially if they have a `danger`-level severity.

You can also see the total number of passing, warning, and dangerous checks here.

## Action Items
<img :src="$withBase('/img/cluster-action-items-graph.png')" alt="cluster action items graph">

This graph shows when new action items were introduced into your cluster, as well as when
existing action items were fixed. Red and orange bars show new action items. The green bars
represent fixed action items.

You can filter this report by namespace or by report type. You can also change the date range.

## Workload Costs
<img :src="$withBase('/img/cluster-costs-graph.png')" alt="cluster costs graph">

This graph shows the total cost of different namespaces over time. You can filter by namespace,
or change the date range.

## Assignments
<img :src="$withBase('/img/cluster-assigned-ais.png')" alt="cluster assigned action items">

This area shows any Action Items that have been assigned to you. If you haven't been
assigned any action items, it will show the highest risk items in your cluster.

