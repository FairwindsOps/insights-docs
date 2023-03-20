---
meta:
  - name: description
    content: The Fairwinds Insights CLI is a tool for interacting with the API. It can be used to manage Policies and Automation Rules in Insights and validate OPA policies offline
---
# CLI Setup
The [Fairwinds Insights Command-Line Interface](https://github.com/FairwindsOps/insights-cli) (CLI)
is a command-line tool for interacting with
the Fairwinds Insights API. In particular, it makes it easy to manage
Insights Policies and Automation Rules as code and validate OPA policies offline.

## Installation
### Homebrew Tap
```bash
brew install FairwindsOps/tap/insights
```

### Binary
Install the binary from our [releases](https://github.com/FairwindsOps/insights-cli/releases?q=draft%3Afalse+prerelease%3Afalse&expanded=true) page.

## Preparation
To start using the Insights CLI, you'll need to retrieve your admin token
from your organization's `Settings` page at `insights.fairwinds.com`.

Set that token in your environment with:

```bash
export FAIRWINDS_TOKEN=$YOUR_ADMIN_TOKEN
```

### fairwinds-insights.yaml
You can set up a YAML file containing details for the CLI, including your
organization name and hostname (required for self hosted deployments):
```yaml
options:
  organization: acme-co
  hostname: https://insights.example.com
```

By default, the CLI will look for the file `fairwinds-insights.yaml` in the current directory, but its
location can be configured by passing in the `--config <filename>` flag.

If the `fairwinds-insights.yaml` file does not exist, the `--organization` flag must be used when running the CLI,
passing in the name of your organization.

## Working With Policies and Automation Rules

To learn more about using the CLI to work with Policies and Automation Rules, check out:

* [OPA Policies with CLI](/configure/cli/opa)
* [Automation Rules with CLI](/configure/cli/automation-rules)
* [Policies Configuration with CLI](/configure/cli/settings)
