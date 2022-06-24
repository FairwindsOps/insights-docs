# Integrations
To add support for integrations like Slack, GitHub, Jira and PagerDuty you can add any of the
following environment variables to your `fwinsights-secrets` secret:

* SLACK_CLIENT_ID
* SLACK_CLIENT_SECRET
* GITHUB_CLIENT_ID
* GITHUB_CLIENT_SECRET
* GITHUB_WEBHOOK_SECRET
* ATLASSIAN_CLIENT_ID
* ATLASSIAN_CLIENT_SECRET
* PAGERDUTY_CLIENT_ID
* PAGERDUTY_CLIENT_SECRET

## Slack
You'll need to create a
[Slack app](https://api.slack.com/apps/) to enable the Slack integration.

1. Copy the client ID and secret and add them to the `fwinsights-secrets` secret (see above)
2. On the left side, click `OAuth & Permissions`
3. You'll need to add the following scopes:
* `channels:join`
* `channels:read`
* `chat:write`

4. You'll also need to add callback URL for:
```
$HOSTNAME/v0/slack/oauth/callback
```

5. Restart the API pod and go to `<host-url>/orgs/<org-name>/settings/integrations` and install the Slack Integration


## GitHub
You'll need to create a
GitHub app at `https://github.com/organizations/YOUR_ORG_NAME/settings/apps`
to enable the GitHub integration.

To set up your app:
1. Set `Callback URL` to `$HOSTNAME/v0/github/callback`
2. Set `Post Installation Setup URL` to `$HOSTNAME/v0/github/callback`
  </br>a. Check `Redirect on update`
3. Under `Webhook`:
  </br>a. Check `Active`
  </br>b. Set `Webhook URL` to `$HOSTNAME/v0/github/webhook`
  </br>c. Set `Webhook secret` (same value and env variable above)
4. Enable `SSL verification`


### Permissions
In the `Permissions and Events` tab, add the following permissions:
* Issues - Read and Write
* Metadata - Read-only
* Commit Statuses - Read and Write

And the following events:
* Status

## PagerDuty
To set up PagerDuty, create an app at
https://pagerduty.com/developer/apps (the URL for your organization may be different).

You will need `Read/Write` scope and should add a `Redirect URL` to
`$HOSTNAME/v0/pagerduty/oauth/callback`
