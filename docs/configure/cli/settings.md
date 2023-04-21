---
meta:
  - name: description
    content: "You can use the Insights CLI to manage the configuration of Policies. Be sure to first read the Insights CLI documentation which covers installation and preparation."
---
# Policies Configuration With the CLI
You can use the Insights CLI to manage the configuration of Policies.
Be sure to first read the [Insights CLI documentation](/configure/cli/cli) which covers installation and preparation.

Check out the [Policy Configurator](/configure/policy/configurator) documentation on use cases for configuring Policies.

## Pushing Policies Configuration to Insights
When pushing configuration of Policies to Insights, the CLI expects a `settings.yaml` file in the current directory.
The file should follow the following format:
```yaml
checks:
  $reportType: # You can find this in the Action Items or Policy UI (e.g. `polaris`)
    $eventType: # You can find this in the Action Items or Policy UI (e.g. `runAsRootAllowed`)
      severity: <critical/high/medium/low/none>
      ci:
        block: <true/false>
      admission:
        block: <true/false>
AdmissionSettings: # Optionally specify per-org or per-cluster admission controller settings
  passiveMode: <true/false> # Sets passive mode organization-wide
  opaEnabled: <true/false> # Enable OPA policies with admission, organization-wide
  plutoEnabled: <true/false> # Enable pluto with admission, organization-wide
  polarisEnabled: <true/false> # Enable polaris with admission, organization-wide
  Clusters: # Specify settings per-cluster
    - ClusterName: dev
      passiveMode: <true/false>
      opaEnabled: <true/false>
      plutoEnabled: <true/false>
      polarisEnabled: <true/false>
```

* For OPA policies under the `checks` section, the `$reportType` is `opa` and the `$eventType` is the Policy name.
* The `AdmissionSettings` section requires the `passiveMode` and `polarisEnabled` options to be specified.

Once the file has been created, use the following command to push the Policies Configuration:
```
insights-cli push settings
```

### Pushing Policies Configuration Example
Create the `settings.yaml` file:
```yaml
checks:
  polaris:
    runAsRootAllowed:
      severity: medium
    livenessProbeMissing:
      severity: high
      ci:
        block: true
      admission:
        block: false
```

Next use the Insights CLI to push these configurations to Insights:

```bash
insights-cli push settings
```

>The customizations in the `checks` portion of `settings.yaml` will override any previous customizations made in Insights. For example, if the above yaml was later pushed without `livenessProbeMissing`, that Policy would revert to the default values.

## Verifying the Configuration of Policies
1. In Insights, go to the `Policy` page
2. In the Policies table, for the `Configuration` column select the `Customized` filter

This should show you the Policies that have been modified using the `settings.yaml` file.

## Pushing Policies Configuration Along With Other Configuration Types
Configuration of Policies can be pushed to Insights along with other types of Insights configuration using the single command `insights-cli push all`. For additional information see
* [Automation Rules with CLI](/configure/cli/automation-rules)
* [OPA policies With CLI](/configure/cli/opa)
