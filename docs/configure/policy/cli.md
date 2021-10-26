---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation. The Fairwinds Insights CLI is a command-line tool for interacting with the API. Keep policies synced to Git repository."
---
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
organization name and hostname (for self-hosted deployments)
```yaml
options:
  organization: acme-co
  hostname: https://example.com
```

By default, the CLI will look for this file at `./fairwinds-insights.yaml`, but its
location can be configured by passing in the `--config <filename>` flag.

## Directory Structure

The Insights CLI expects to find two directories (either in the current working directory,
or in the directory specified in the `--directory` flag):
* `./checks/` - a directory containing any OPA policies
* `./rules/` - a diretory containing any automation rules

An example directory structure might look like this:
```
.
+-- checks
|   +-- policy1
|       +-- policy.rego
|       +-- instance1.yaml
|   +-- policy2
|       +-- policy.rego
|       +-- instance1.yaml
|       +-- instance2.yaml
+-- rules
|   +-- rule1.yaml
|   +-- rule2.yaml
```

To learn more about the individual file formats, see the
[OPA Policy docs](/configure/policy/policy#uploading-policies) and the
[Automation Rule docs](/configure/policy/rules#cli)

## Syncing
To sync your infrastructure-as-code repo to Insights, you can run

```bash
insights policy sync --directory /path/to/iac/
```

### Full Sync
By default, Insights will not _delete_ any remote rules/checks - it will
only upload new rules/checks, or update existing rules/checks.
This means there might be some rules/checks that are running in Insights, but not
tracked in your IaC repository.

If you'd like to ensure a perfect sync, you can add the `--fullsync` flag, which
will delete any remote rules that do not exist in your IaC repository.
