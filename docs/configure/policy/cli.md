# CLI Utility

The [Fairwinds Insights CLI](https://github.com/FairwindsOps/insights-cli)
is a command-line tool for interacting with
the Fairwinds Insights API. In particular, it makes it easy to manage
policy-as-code, keeping your Insights policies synced to a Git repository.

## Installation
### Homebrew Tap
```bash
brew install FairwindsOps/tap/insights
```

### Binary
Install the binary from our [releases](https://github.com/FairwindsOps/insights-cli/releases) page.

## Usage
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
organization name
```yaml
options:
  organization: acme-co
```

By default, the CLI will look for this file at `./fairwinds-insights.yaml`, but its
location can be configured by passing in the `--config <filename>` flag.

