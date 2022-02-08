---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to connect Fairwinds Insights to GitHub. "
---
# Slack

Fairwinds Insights has an integration with Slack, so you can get notifications
about critical changes to your clusters.

There are two types of Slack notifications:
* Realtime: we'll send an alert every time one of your reports generates new Action Items.
This is good for production clusters, which deserve more attention and should be relatively stable.
* Daily Digest: we'll send one alert per day highlighting any new Action Items that have appeared
in your cluster

Notifications can be configured for your entire organization, or for individual clusters.

<img :src="$withBase('/img/slack.png')" alt="slack settings">

Read our [privacy policy](https://www.fairwinds.com/privacy-policy) to learn more about how Fairwinds Insights handles user data.

# Installation
To set up Slack notifications, visit your organization's settings page and go to the `Integration` tab.
Click `Add Integration` under Slack. Once you have Slack setup, you can then choose which channels you'd like notifications to be
sent to in the `Notifications` tab.

See the confgure section to customize Slack Alerts through Automation Rules

# Datadog Integration 

Fairwinds Insights has an integration to feed data into Datadog.

An Event is sent into Datadog whenever an Action Item is first discovered or when it's fixed. This can be very helpful for correlating issues with either an attempt to fix an Action Item or introducing a new workload that has additional Action Items.

Also a metric is sent to Datadog representing the number of open Action Items with tags that allow you to filter or compare data.