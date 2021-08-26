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

Copy the client ID and secret, and add them to the `fwinsights-secrets` secret (see above).

Then, on the left side, click OAuth & Permissions.

You'll need to add the following scopes:
* `channels:join`
* `channels:read`
* `chat:write`

You'll also need to add callback URL for
```
$HOSTNAME/v0/slack/oauth/callback
```

Once finished, restart the API pod and then go to `<host-url>/orgs/<org-name>/settings/integrations` and install the Slack Integration.


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


### Permissions
In the `Permissions and Events` tab, add the following permissions:
* Issues - Read and Write
* Metadata - Read-only
* Commit Statuses - Read and Write

And the following events:
* Status
