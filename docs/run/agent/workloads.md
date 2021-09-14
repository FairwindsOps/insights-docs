---
meta:
  - name: title
    content: Fairwinds Insights Workload Feature
  - name: description
    content: The Fairwinds Insights workloads tab gives an overview of every workload running in your cluster. Read the documentation.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, workload
---
# Workloads

The Workloads tab gives an overview of every workload running in your cluster.
You can see what images are being used, resource requests and limits,
and cost estimates.

<img :src="$withBase('/img/workloads.png')" alt="workloads">

## Cost Estimates
When you first load the workloads page, you'll be prompted to provide some information
about your cloud provider and instance type settings. We'll use this information to
inform our cost estimates.

<img :src="$withBase('/img/cost-settings.png')" alt="workloads">

Currently, we only support setting a single instance type. If you're using multiple instance
types in your cluster, you can simply pick the most representative type.

Once we know your node size and cost per node, we assume half the cost is allocated
to memory, and half the cost is allocated to CPU. We then extrapolate to determine
cost-per-GB-RAM and cost-per-CPU.

To determine the cost of a particular workload, we offer two strategies:
* **conservative** - this takes into account the potential waste incurred by
memory- or CPU- intensive workloads, if Kubernetes is unable to bin-pack efficiently.
It is calculated as `2 * max(cpu_cost, memory_cost)`
* **optimistic** - this assumes Kubernetes can bin-pack your workloads efficiently.
It is calculated as `cpu_cost + memory_cost`

If you have spent time optimizing your node size, or if you're running a large variety
of workloads that are small relative to your node size, the **optimistic** strategy
will probably be more accurate. Otherwise, we recommend the **conservative** strategy.

You can [read more about cost estimation on our blog](https://www.fairwinds.com/blog/5-problems-with-kubernetes-cost-estimation-strategies)

## Prometheus Recommendations
If you elect to install the [Prometheus Collector](https://insights.docs.fairwinds.com/configure/reports/resource-metrics/), you will begin to see a graph appear at the top of every workload modal window. If this is your first time installing the Prometheus Collector, it may take 2-4 hours before the graph is visible.

Once the graph is generated, you will see a timeline of the min, average, and max CPU and memory usage for all pods associated with that workload. The snapshots are taken every 2 hours. For example, if you have a workload with 5 pods:
* the minimum metric will represent the single pod using the least CPU/memory usage
* the maximum metric will represent the single pod using the most CPU/memory usage
* the average metric will represent the average CPU/memory usage across all 5 pods

You can also learn about the last recorded Pod count, and the averaage Pod count, on the same Workload page.
