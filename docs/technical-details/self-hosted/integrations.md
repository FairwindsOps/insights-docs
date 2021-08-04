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

## Slack
You'll need to create a
[Slack app](https://api.slack.com/apps/) to enable the Slack integration.

It will need the following scopes:
* `channels:join`
* `channels:read`
* `chat:write`

You'll also need to add callback URL for
```
$HOSTNAME/v0/slack/oauth/callback
```

## GitHub
You'll need to create a
GitHub app at `https://github.com/organizations/YOUR_ORG_NAME/settings/apps`
to enable the GitHub integration.

To set up your app,
* set `Callback URL` to `$HOSTNAME/v0/github/callback`
* set `Post Installation Setup URL` to `$HOSTNAME/v0/github/callback`
    * Check `Redirect on update`
* under `Webhook`:
  * check `Active`
  * set `Webhook URL` to `$HOSTNAME/v0/github/webhook`
  * set `Webhook secret` (same value and env variable above)
* enable `SSL verification`


