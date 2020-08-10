# Getting Value from Fairwinds Insights

So you've [installed the Insights agent](/installation/insights-agent),
and you're getting some results
back from your audits. Chances are, you're seeing quite a few
[Action Items](/features/action-items) showing up. Where should you start?

While its good to look through the entire list of Action Items to get a sense for what's there,
you probably already have a sense for where you should be focusing your efforts. Below are
three common use cases for Insights, as well as more instructions on how to achieve them.

## Workload Configuration
Often development and ops teams will assume that since the application is running,
their work is done. But if you fail to set some basic configuration
(like resource limits and liveness probes) for each workload,
it can cause serious headaches down the line.

Check out the [workload configuration section](../workload-configuration) to learn how to audit your
workloads for best practices.

## Container Security
Containers are the easiest way for vulnerabilities to sneak into your application. Each container
comes with its own operating system and installed libraries, so detecting and prioritizing vulnerabilities
can become a huge burden at scale.

Check out the [container security section](../contianer-security) to learn how to audit your Docker
images for known CVEs.

## Cost Efficiency
Running workloads in Kubernetes can get expensive quickly. It can be hard to understand which
workloads have the biggest impact on your bottom line, and often teams are tempted to overprovision
resources in order to ensure their application always functions properly.

Check out the [cost efficiency section](../cost-efficiency) to learn how to get a better understanding
of workload cost, as well as detect workloads that are under- or over-provisioned.
