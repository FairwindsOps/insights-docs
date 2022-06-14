---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to connect Fairwinds Insights to Slack"
---
# Slack
Fairwinds Insights has an integration with Slack so you can get notifications
about critical changes to your clusters.

There are two types of Slack notifications:
* Realtime: Alert every time one of your reports generate new Action Items.
This is good for production clusters which deserve more attention and should be relatively stable
* Daily Digest: One alert per day highlighting any new Action Items or fixed Action Items
in your cluster from the previous day

Read our [privacy policy](https://www.fairwinds.com/privacy-policy) to learn more about how Fairwinds Insights handles user data.

## Installation
To set up Slack notifications:
1. Visit your organization's `Settings > Integration` page
2. Hover over `Slack` and click `Add Integration`
3. Once you have connected Slack to Insights, you can choose which channels you'd like notifications to be
sent to in the `Settings > Notifications` page

See the confgure section to [customize Slack alerts through Automation Rules.](/configure/automation/integrations#slack-notifications)
