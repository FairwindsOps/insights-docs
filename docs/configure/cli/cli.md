---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation. The Fairwinds Insights CLI is a command-line tool for interacting with the API. It can be used to push OPA policies and automation rules to Insights, and test/validate OPA policies offline."
---
# CLI Utility

The [Fairwinds Insights CLI](https://github.com/FairwindsOps/insights-cli)
is a command-line tool for interacting with
the Fairwinds Insights API. In particular, it makes it easy to manage
Insights OPA policies and automation rules as code, and test/validate OPA policies offline.

## Installation
### Homebrew Tap
```bash
brew install FairwindsOps/tap/insights
```

### Binary
Install the binary from our [releases](https://github.com/FairwindsOps/insights-cli/releases?q=draft%3Afalse+prerelease%3Afalse&expanded=true) page.

## Preparation
To start using the Insights CLI, you'll need to retrieve your admin token
from your organization's settings page at insights.fairwinds.com/orgs

Set that token in your environment with

```bash
export FAIRWINDS_TOKEN=$YOUR_ADMIN_TOKEN
```

You'll also need to specify the `--organization` flag when running the CLI,
passing in the name of your organization. Alternatively, you can use the
fairwinds-insights.yaml configuration file (below)

### fairwinds-insights.yaml
You can set up a YAML file containing details for the CLI, including your
organization name and hostname (for self-hosted deployments)
```yaml
options:
  organization: acme-co
  hostname: https://insights.example.com
```

By default, the CLI will look for this file at `./fairwinds-insights.yaml`, but its
location can be configured by passing in the `--config <filename>` flag.

## Working With OPA Policies and Automation Rules

To learn more about using the CLI to work with OPA policies and automation rules, see the
[CLI OPA Policy docs](/configure/cli/opa) and the
[CLI Automation Rule docs](/configure/cli/automation-rules).
