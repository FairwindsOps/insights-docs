---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Fairwinds Insights provides cost attribution and resource tuning"
---
# Cost Efficiency

## Configuring Cost Settings
Cost attribution and resource tuning can be one of the most difficult and tedious
parts of running Kubernetes at scale. Fairwinds Insights provides some features to
help make this process simpler and more automated.

The first step is to start mapping CPU and memory usage back to dollars. This is a
[very difficult problem](https://www.fairwinds.com/blog/5-problems-with-kubernetes-cost-estimation-strategies)
and inevitably somewhat subjective: how should we rank a CPU intensive application against
a memory intensive application? In order to accurately attribute cost, we have to find ways of
comparing apples to oranges.

To help us best estimate workload costs in your cluster, you can go to the `Efficiency > Costs > Costs Settings` page, select the applicable cluster, and tell us:
* The average node size
* The average node cost
* The strategy you'd like to use for workload estimation (more on that below)

We've pre-populated a list of instance types from AWS and GCP and can sync data from your bill when
[Cloud Costs is enabled](/technical-details/reports/cloud-costs). You can also set custom numbers
if you're running on a different cloud provider or if you're using spot instances. If you have
multiple node types in your cluster, use the most representative type.

These numbers don't have to be perfectly accurate. They simply give us a baseline for converting
memory and CPU to dollars. We will take the `Cost per Node`, attribute half that
cost to memory and half to CPU. By dividing those numbers by the amount of memory and CPU in
a single node, we can come to per-CPU and per-GB-memory costs.

You can [read more about cost estimation on our blog](https://www.fairwinds.com/blog/5-problems-with-kubernetes-cost-estimation-strategies)

## Viewing Workload Costs

On the `Efficiency > Costs` page, you can see a list of all the workloads in your cluster by filtering by cluster and selecting workloads as an aggregator. To see additional information on a workload, such as kind or namespace, select those as aggregators also or select `Top Workloads` from the quickview dropdown menu. By default, they'll be sorted by their `Billed Cost`. Costs are computed using actual workload usage or configured memory and CPU settings.

- If you have the `prometheus-metrics` report installed, Fairwinds Insights will use the maximum of requests and actual usage (`max(requests, usage)`) in order to compute the `Billed Cost` of this workload

In the next column you'll see `Recommended Cost`, followed by `Cost Difference`.
If you're not seeing values in these fields, make sure the `prometheus-metrics` report is installed and operating properly.

When `prometheus-metrics` is installed, Insights will analyze actual resource usage for your workloads and make recommendations for
how much memory and CPU you _should_ be setting for your requests and limits. While it may recommend
moving resources up or down, we typically find that teams have set resources too high since
workloads with resources that are too low will experience noticeable performance issues.

If you notice a workload with substantial savings available, click into it to see what
Insights recommends for you to set your resource requests and limits.

Clicking into a workload will filter the whole page for that specific workload and open a chart below the table with information on historical performance, and show what Insights recommends your resource limits and requests to be for both memory and CPU.

Note that these recommendations should be sanity checked by the user. If your application experiences
periodic bursts in traffic, you may want to keep your limits relatively high. For mission critical
applications, it's wise to make any reduction in resources gradually, monitoring your application for any degradation
in performance along the way.

It's also good to let Insights gather usage data from either tool for 1-7 days before taking its recommendations.
Without a good, representative baseline for actual resource usage, Insights won't be able to
make confident recommendations.
Recommendations are calculated once a day based on the last 30 days of usage to calculate the recommendations. This may provide a good estimate on how the workload works. We do not use longer period than this as the longer the period the longer we are postponing the recommendation savings.

### Filtering and aggregations
We offer many ways to filter workloads such as cluster, namespace, workload name, container, labels and App Groups. Saved view Idle/Stale workloads may be helpfull on identifing such workloads. Cost Greater Than filter may help you focus on more significant workloads.
For aggregation we offer aggregation by the combination of cluster, namespace, kind, workloadd name, container and labels.
Labels filtering and aggregation are based on current labels, so we do not keep a history of labels for costs. Labels are removed as soon as they are not being used anymore from current workloads.


## Efficiency Score 
Insights will report an "Efficiency Score" for each workload reported in the table on the `Efficiency > Costs` page.

The formula for calculating the Efficiency Score is based on the timeframe the user selected. The score is cost-weighted and calculated as follows: `100 * Recommended Cost / Billed Cost`. 

For example, a score under 100% generally means the workload is over-provisioned as the Recommended Cost is lower than the current Billed Cost, meaning there's opportunities to right-size the container to improve efficiency.

## Quality of Service (QoS) Recommendations
When you install the `prometheus-metrics` report, Fairwinds Insights allows you to generate different resource request and limit recommendations based on your workload's behavior. 

The resource recommendation calculations are different depending on your QoS target. See below for additional detail.

| **QoS**                  | **Description**                                                                     | **Requests recommendation**                            | **Limits recommendation**                         |
|--------------------------|-------------------------------------------------------------------------------------|--------------------------------------------------------|---------------------------------------------------|
| **Critical**             | Used for mission-critical workloads that should be over-provisioned for reliability | **120% of max** usage observed over last month         | same as requests                                  |
| **Guaranteed (default)** | Production workloads that can withstand some variability                            | **max** usage observed over last month                 | same as requests                                  |
| **Burstable**            | Workloads that should prioritize cost efficiency over maximum reliability           | **p90** of max usage observed over last month          | **max**  usage observed over last month           |
| **Limited**              | Workloads that should be given as little resources as needed to operate             | **average**  usage observed over last month            | **p95** of usage observed over last month          |

Upgrading Qos at Costs page makes the recommendation gets updated on the fly.