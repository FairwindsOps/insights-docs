---
meta:
  - name: title
    content: Fairwinds Insights Slack Integration
  - name: description
    content: Fairwinds Insights has an integration with Slack, so you can get notifications about critical changes to your clusters.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, Slack Integration
---
# Slack Notifications

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
