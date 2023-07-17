---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Fairwinds Insights provides cost attribution and resource tuning"
---
# Cost Efficiency

## Choosing between Goldilocks or Prometheus
Fairwinds Insights provides workload-level resource request and limit recommendations. This is sometimes referred to as "app right-sizing".

You can choose one of two reports to generate resource request and limit recommendations:
- **Prometheus (Recommended):** Uses historical workload usage metrics to generate finer-grained recommendations. This report unlocks additional features in the Insights platform, such as usage graphs.
- **Fairwinds Goldilocks:** Uses Vertical Pod Autoscaler (VPA) to generate resources recommendations, but lacks a historical timeseries of workload usage metrics

Check out a summary of the differences between each tool below:

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
[AWS Costs is enabled](/technical-details/reports/aws-costs). You can also set custom numbers
if you're running on a different cloud provider or if you're using spot instances. If you have
multiple node types in your cluster, use the most representative type.

These numbers don't have to be perfectly accurate. They simply give us a baseline for converting
memory and CPU to dollars. We will take the `Cost per Node`, attribute half that
cost to memory and half to CPU. By dividing those numbers by the amount of memory and CPU in
a single node, we can come to per-CPU and per-GB-memory costs.

You can [read more about cost estimation on our blog](https://www.fairwinds.com/blog/5-problems-with-kubernetes-cost-estimation-strategies)

## Viewing Workload Costs

On the `Efficiency > Costs` page, you can see a list of all the workloads in your cluster by filtering by cluster and selecting workloads as an aggregator. To see additional information on a workload, such as kind or namespace, select those as aggregators also or select `Top Workloads` from the quickview dropdown menu. By default, they'll be sorted by their `Billed Cost`. Costs are computed using actual workload usage or configured memory and CPU settings.

- If you have the `prometheus-metrics` or `goldilocks` report installed, Fairwinds Insights will use the maximum of requests and actual usage (`max(requests, usage)`) in order to compute the `Billed Cost` of this workload
- If neither report is installed, Fairwinds Insights will use the average of requests and limits. (This can be less precise since some workloads may not have requests and limits configured, or the spread between requests and limits can be large.)

In the next column you'll see `Recommended Cost`, followed by `Cost Difference`.
If you're not seeing values in these fields, make sure the `prometheus-metrics` or `goldilocks` report is installed and operating properly.

When `goldilocks` or `prometheus-metrics` is installed, Insights will analyze actual resource usage for your workloads and make recommendations for
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

## Quality of Service (QoS) Recommendations
When you install the `prometheus-metrics` report, Fairwinds Insights allows you to generate different resource request and limit recommendations based on your workload's behavior. 

The resource recommendation calculations are different depending on your QoS target. See below for additional detail.

| **QoS**                  | **Description**                                                                     | **Requests recommendation**                | **Limits recommendation**                 |
|--------------------------|-------------------------------------------------------------------------------------|--------------------------------------------|-------------------------------------------|
| **Critical**             | Used for mission-critical workloads that should be over-provisioned for reliability | **max** usage observed over last 2 weeks   | **max**  usage observed over last 2 weeks |
| **Guaranteed (default)** | Production workloads that can withstand some variability                            | **p95** usage observed over last 2 weeks   | **p95**  usage observed over last 2 weeks |
| **Burstable**            | Workloads that should prioritize cost efficiency over maximum reliability           | **mean** usage observed over last 2 weeks  | **p95**  usage observed over last 2 weeks |
| **Limited**              | Workloads that should be given as little resources as needed to operate             | **mean**  usage observed over last 2 weeks | **mean**  usage observed over last 2 weeks |
