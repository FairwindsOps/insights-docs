# Cost Efficiency

Cost attribution and resource tuning can be one of the most difficult and tedious
parts of running Kubernetes at scale. Fairwinds Insights provides some features to
help make this process simpler and more automated.

The first step is to start mapping CPU and memory usage back to dollars. This is a
[very difficult problem](https://www.fairwinds.com/blog/5-problems-with-kubernetes-cost-estimation-strategies)
and inevitably somewhat subjective: how should we rank a CPU-intensive application against
a memory-intensive application? In order to accurately attribute cost, we have to find ways of
comparing apples to oranges.

To help us best estimate workload costs in your cluster, we ask for a few pieces of information
the first time you visit the **Workloads** tab: your average node size, your average node cost,
and the strategy you'd like to use for workload estimation (more on that below).

<img :src="$withBase('/img/cost-settings.png')" alt="Cost settings">

We've pre-populated a list of instance types from AWS and GCP, but you can also set custom numbers
if you're running on a different cloud provider or if you're using spot instances. If you have
multiple node types in your cluster, use the most representative type.

These numbers don't have to be perfectly accurate - they simply give us a baseline for converting
memory and CPU to dollars. Namely, we will take the cost per node-hour, and attribute half that
cost to memory, and half to CPU. By dividing those numbers by the amount of memory and CPU in
a single node, we can come to per-CPU and per-GB-memory costs.

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

## Viewing Workload Costs

On the **Workloads** tab, you can see a list of all the workloads in your cluster. By default, they'll
be sorted by their _Average Total Cost_. This number utilizes resource requests and limits (if specified),
and average pod count to estimate the average cost of each workload.

<img :src="$withBase('/img/workload-costs.png')" alt="Workload costs">

In the next column, you'll see _Total Costs with Recommendations_, followed by _Cost Difference with Recommendations_.
If you're not seeing values in these fields, make sure the `goldilocks` report is installed and
operating properly.

Goldilocks analyzes actualy resource usage for your `Deployments`, and makes recommendations for
how much memory and CPU you _should_ be setting for your requests and limits. While it may recommend
moving resources up or down, we typically find that teams have set resources too high, since
workloads with resources that are too low will experience noticeable performance issues.

If you notice a workload with substantial savings available, you can click into it to see what
Goldilocks recommends you set your resource requests and limits to:

<img :src="$withBase('/img/workload-recommendations.png')" alt="Workload recommendations">

Here, Goldilocks has recommended that we change our memory requests and limits from `1Gi` to
`263M` (a savings of around 75%), and our CPU requests and limits from `500m` to `25m`, for a savings
of 95%.

Note that these recommendations should be sanity checked by the user. If your application experiences
periodic bursts in traffic, you may want to keep your limits relatively high. For mission-critical
applications, it's wise to make these changes gradually, monitoring your application for any degradation
in performance along the way.

It's also good to let Goldilocks gather usage data for 1-7 days before taking its recommendations.
Without a good, representative baseline for actual resource usage, Goldilocks won't be able to
make confident recommendations.
