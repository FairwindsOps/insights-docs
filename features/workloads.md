# Workloads

The Workloads tab gives an overview of every workload running in your cluster.
You can see what images are being used, resource requests and limits,
and cost estimates.

<img :src="$withBase('/img/workloads.png')" alt="workloads">

## Cost Estimates
We estimate costs based on pricing for AWS reserved EC2 instances.

We use the numbers provided by AWS to come up with average per-CPU and per-GB-RAM costs.
We multiply these by the resources available in your cluster, and use the maximum
of CPU and RAM cost to come up with the final number.

This results in a conservative estimate - your bill will likely be less.


