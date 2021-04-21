# Configuration

## Report Hub
We recommend using the [Report Hub](/run/agent/report-hub) to configure the Insights Agent.
Making changes in the Report Hub will change the provided installation command by setting new
Helm parameters (see below).

## Helm
The Insights Agent can be configured using Helm. To see the full list of options,
you can check out the
[Insights Agent Helm chart](https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent)

In particular, for any given report type, you can set the following options:
* `enabled` - this is typically set to `true` by default
* `schedule` - a cron expression dictating when this report should run. This is typically set to a random minute every hour
* `timeout` - how long to wait for output, in seconds
* `resources` - requests and limits for CPU and memory for this report

