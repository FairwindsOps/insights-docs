# Interacting With Policies Configuration Via the CLI
You can use the Insights Command-line Interface (CLI) To manage policies configuration.
Be sure to first read the [general CLI documentation](/configure/cli/cli) which covers instllation and prerequisites.

## Pushing Policies Configuration to Insights
The Insights CLI `push settings` command expects a `settings.yaml` file to be located at the top-level of the directory being used to push files to Insights.

### Pushing Policies Configuration Example
Create the `settings.yaml` file in the current directory:
```yaml
checks:
  polaris:
    runAsRootAllowed:
      severity: medium
    livenessProbeNotSpecified:
      severity: high
      ci:
        block: true
      admission:
        block: false
        mutate: true
```

Next use the Insights CLI to push these complete settings to Insights:

```bash
FAIRWINDS_TOKEN=YOUR_TOKEN insights-cli push settings --organization YOUR_ORG_NAME
```

* This pushes policies Configuration from the current directory, expecting it to contain the `settings.yaml` file.
* Note that the customizations in `settings.yaml` will override any previous customizations made in Insights. For example, if the above yaml was later pushed without the Polaris `livenessProbeNotSpecified` stanza, that check would revert to the Insights defaults.
* Typically the `FAIRWINDS_TOKEN` environment variable is set elsewhere and is not included each time the CLI is run.
* The Insights organization can also be specified in a configuration file, described in the [general Insights CLI documentation](/configure/cli/cli).
* Use the `--push-directory` option to specify an alternative base directory.

#### Verifying Success
Please check the Insights UI to view the customizations you have just made via the CLI.

## Pushing Policies Configuration With Other Configuration Resources
Policies configuration can be pushed to Insights along with other Insights configuration using the single command `insights-cli push all`. For additional information see
* [CLI automation rules documentation](/configure/cli/automation-rules)
* [CLI OPA documentation](/configure/cli/opa)
