---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to connect Fairwinds Insights to Datadog"
---
# Datadog
Fairwinds Insights has an integration to feed data into Datadog.

An Event is sent into Datadog whenever an Action Item is first discovered or when it's fixed. This can be very helpful for correlating issues with either an attempt to fix an Action Item or introducing a new workload that has additional Action Items.

Also a metric is sent to Datadog representing the number of open Action Items with tags that allow you to filter or compare data.

## Installation
To set up DataDog integration:
1. Visit your organization's `Settings > Integration` page
2. Hover over `DataDog` and click `Add Integration`
3. Add the `API key` and click `Connect to Datadog`
