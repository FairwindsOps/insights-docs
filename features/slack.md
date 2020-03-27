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
