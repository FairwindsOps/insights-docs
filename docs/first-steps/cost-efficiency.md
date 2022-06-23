---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Fairwinds Insights provides cost attribution and resource tuning"
---
# Cost Efficiency

Cost attribution and resource tuning can be one of the most difficult and tedious
parts of running Kubernetes at scale. Fairwinds Insights provides some features to
help make this process simpler and more automated.

The first step is to start mapping CPU and memory usage back to dollars. This is a
[very difficult problem](https://www.fairwinds.com/blog/5-problems-with-kubernetes-cost-estimation-strategies)
and inevitably somewhat subjective: how should we rank a CPU intensive application against
a memory intensive application? In order to accurately attribute cost, we have to find ways of
comparing apples to oranges.

To help us best estimate workload costs in your cluster, we ask for a few pieces of information
the first time you visit the `Efficiency > Workloads` page:
* The average node size
* The average node cost
* The strategy you'd like to use for workload estimation (more on that below)

<img :src="$withBase('/img/cost-settings.png')" alt="Cost settings">

We've pre-populated a list of instance types from AWS and GCP, but you can also set custom numbers
if you're running on a different cloud provider or if you're using spot instances. If you have
multiple node types in your cluster, use the most representative type.

These numbers don't have to be perfectly accurate. They simply give us a baseline for converting
memory and CPU to dollars. We will take the `Cost per Node`, attribute half that
cost to memory and half to CPU. By dividing those numbers by the amount of memory and CPU in
a single node, we can come to per-CPU and per-GB-memory costs.

To determine the cost of a particular workload, we offer two strategies:
* `conservative` - this takes into account the potential waste incurred by
memory or CPU intensive workloads if Kubernetes is unable to bin-pack efficiently.
It is calculated as `2 * max(cpu_cost, memory_cost)`
* `optimistic` - this assumes Kubernetes can bin-pack your workloads efficiently.
It is calculated as `cpu_cost + memory_cost`

If you have spent time optimizing your node size or if you're running a large variety
of workloads that are small relative to your node size, the `optimistic` strategy
will probably be more accurate. Otherwise, we recommend the `conservative` strategy.

You can [read more about cost estimation on our blog](https://www.fairwinds.com/blog/5-problems-with-kubernetes-cost-estimation-strategies)

## Viewing Workload Costs

On the `Efficiency > Workloads` page, you can see a list of all the workloads in your cluster. By default, they'll be sorted by their `Average Total Cost`. Costs are computed using actual workload usage or configured memory and CPU settings.

- If you have the `prometheus-metrics` or `goldilocks` report installed, Fairwinds Insights will use the maximum of requests and actual usage (`max(requests, usage)`) in order to compute the `Average Total Cost` of this workload
- If neither report is installed, Fairwinds Insights will use the average of requests and limits. (This can be less precise since some workloads may not have requests and limits configured, or the spread between requests and limits can be large.)

<img :src="$withBase('/img/workload-costs.png')" alt="Workload costs">

In the next column you'll see `Total Costs with Recommendations`, followed by `Cost Difference with Recommendations`.
If you're not seeing values in these fields, make sure the `prometheus-metrics` or `goldilocks` report is installed and
operating properly.

When `goldilocks` or `prometheus-metrics` is installed, Insights will analyze actual resource usage for your workloads and make recommendations for
how much memory and CPU you _should_ be setting for your requests and limits. While it may recommend
moving resources up or down, we typically find that teams have set resources too high since
workloads with resources that are too low will experience noticeable performance issues.

If you notice a workload with substantial savings available, click into it to see what
Insights recommends setting your resource requests and limits to:

<img :src="$withBase('/img/workload-recommendations.png')" alt="Workload recommendations">

Here, Insights has recommended that we change our memory requests and limits from `1Gi` to
`263M` (a savings of around 75%) and our CPU requests and limits from `500m` to `25m`, for a savings
of 95%.

Note that these recommendations should be sanity checked by the user. If your application experiences
periodic bursts in traffic, you may want to keep your limits relatively high. For mission critical
applications, it's wise to make any reduction in resources gradually, monitoring your application for any degradation
in performance along the way.

It's also good to let Insights gather usage data from either tool for 1-7 days before taking its recommendations.
Without a good, representative baseline for actual resource usage, Insights won't be able to
make confident recommendations.

## Comparing Goldliocks and Prometheus
In general, when the `prometheus-metrics` report is installed, it will provide users with more finer-grained metrics and additional features within the Insights platform. Check out a summary of the differences between each tool below:

| Feature                                      | Resource Type | **Prometheus Installed**                                                                                                                             | **Goldilocks Installed**                                                                                                                                | **None Installed**                                                     |
| -------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Recommendation Engine**                    |               | Best - Uses Prometheus to generate and store a historical timeseries of workload usage metrics, driving finer-grained resource recommendations | Good - Uses Vertical Pod Autoscaler (VPA) to generate resources recommendations. Lacks a historical timeseries of workload usage metrics |                                                                        |
| **Generates Action Items**                   |               | X                                                                                                                                                    | X                                                                                                                                                       |                                                                        |
| **Average Total Cost**                       | Workloads     | Best - Cost is calculated using the max(requests or usage)                                                                                          | Better - Cost is calculated using the max(requests or VPA recommendation)                                                                              | Good - Estimates are based on the average of requests and limits |
| **Total Cost with Recommendations**          | Workloads     | X                                                                                                                                                    | X                                                                                                                                                       |                                                                        |
| **Cost Difference with Recommendations**     | Workloads     | X                                                                                                                                                    | X                                                                                                                                                       |                                                                        |
| **Request/Limit Recommendations**            | Workloads     | X                                                                                                                                                    | X                                                                                                                                                       |                                                                        |
| **Quality of Service (QoS) Recommendations** | Workloads     | X                                                                                                                                                    |                                                                                                                                                         |                                                                        |
| **Visualize Historical Usage**               | Workloads     | X                                                                                                                                                    |                                                                                                                                                         |                                                                        |
| **Rolling 30 days of Cluster Usage**         | Cluster       | X                                                                                                                                                    |                                                                                                                                                         |                                                                        |
| **Historical Cluster Utilization**           | Cluster       | X                                                                                                                                                    |                                                                                                                                                         |                                                                        |
| **Works with AWS Billing Integration**       | Cluster       | X                                                                                                                                                    |                                                                                                                                                         |                                                                        |

          
