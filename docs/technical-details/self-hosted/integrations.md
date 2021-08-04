# Integrations
To add support for integrations like Slack, GitHub, and Jira, you can add the
following environment variables to your `fwinsights-secrets` secret:

* SLACK_CLIENT_ID
* SLACK_CLIENT_SECRET
* GITHUB_CLIENT_ID
* GITHUB_CLIENT_SECRET
* GITHUB_WEBHOOK_SECRET
* ATLASSIAN_CLIENT_ID
* ATLASSIAN_CLIENT_SECRET


## Slack Setup

In order to set up a slack integration you'll need to go to https://api.slack.com/apps

1. Create an app called "Fairwinds". 
2. Copy the necessary secrets and add them to the `fwinsights-secrets` secret
3. On the left side, click OAuth & Permissions
4. Add a redirect URL that is equal to your instance url + `/v0/slack/oauth/callback`
5. Add the following OAuth Scopes: `channels:join`, `channels:read` and `channels:write`
6. Once finished, restart the API pod and then go to `<host-url>/orgs/<org-name>/settings/integrations` and install the Slack Integration.

You can now configure notifications to send to public slack channels. To do this go to `Settings` -> `Notifications` and you should be good to go. 
