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
To set up Slack notifications, visit your organization's settings page and click the "Add to Slack"
button to link your account. You can then choose which channel you'd like notifications to be sent to.

If you'd like to set up notifications for a particular cluster, rather than all clusters in
your organization, you can visit that cluster's settings page.
