---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Insights Agent helm configuration"
---
# Helm
The Insights Agent can be configured using Helm. To see the full list of options, check out the
[Insights Agent Helm chart.](https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent)

In particular, for any given report type, you can set the following options:
* `enabled` - Boolean - set to `true` to enable the report
* `schedule` - String - a Cron expression describing when to run this report. This is typically set to a random minute every hour
* `timeout` - String - the maximum time this report should run before an error is triggered (seconds)
* `resources` - requests and limits for CPU and memory for this report
