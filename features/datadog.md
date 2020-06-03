---
meta:
  - name: title
    content: Fairwinds Insights Datadog Integration
  - name: description
    content: Fairwinds Insights documentation on the beta integration to Datadog useful for correlating issues with an attempt to fix or when introducing new workloads.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, Datadog integration
---
# Datadog Integration *Beta*

Fairwinds Insights has a beta integration to feed data into Datadog.

An Event is sent into Datadog whenever an action item is first discovered or when it's fixed. This can be very helpful for correlating issues with either an attempt to fix an action item or introducing a new workload that has additional action items.

Also a metric is sent to Datadog representing the number of open action-items with tags that allow you to filter or compare data.
