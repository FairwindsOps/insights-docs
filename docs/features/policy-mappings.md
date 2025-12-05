---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: About the Policy Mappings."
---

# Policy Mappings

Policy Mappings are user-defined collections of specific Policies. A Policy Mapping can apply to one or many [App Groups](/features/app-groups).

For example, as a Platform Admin, you may need finer-grained control of your Kubernetes guardrails and policies:

- You may want to define a set of **cluster-wide** best practices that all resources must abide by

- You may need to create **policy exceptions** by defining excluded resources within the associated App Groups.

- You may need to ensure certain **Mission Critical applications** are compliant with standards like SOC 2 or ISO 27001.

- You may want to reduce **“Action Item overload”** by only focusing on a few policies to start


## Scan Mode
Scan Mode makes it easy to transition from the default Insights behavior - scanning all resources for all availabe policies - to one that is more focused.

There are two Scan Modes:
- **Everything (default)**: Scans all resources using all available policies for maximum coverage. This may generate many Action Items.
- **Focused (recommended)**: Scans only the resources and policies defined in App Groups and Policy Mappings.

### Switching between Scan Modes

**Switching from Everything to Focused**: When you switch from `Everything` to `Focused`, Insights will enable the Policy Mappings feature and apply the logic found in your Policy Mappings.

**Switching from Focused to Everything**: When you switch from `Focused` to `Everything`, Policy Mappings will be disabled and Insights will continue to report all policies across all Kubernetes resources. 
- In `Everything` mode, Admission Controllers in Blocking mode and Repository Scans will default to blocking on Action Items with a severity of High or Critical only
- You may notice the count of Action Items under the "Action Items" page increase as a result of switching to `Everything` scan mode. This is expected since Insights will return to scanning all policies across all resources.

You can find Scan Mode under the "Policy > Policy Mappings" page.

## Policy Mapping Examples

### Only report specific Policies in `Agent` context
Below is a simple example of configuring Insights to only report Action Items for policies found in Polaris and Trivy across all workloads in the [`match-all` App Group](/features/app-groups#appgroup-examples)

```yaml
type: PolicyMapping
name: scan-images-and-config
spec:
  appGroups: [match-all]
  policies: [polaris, trivy]
  contexts: [Agent] # possible values are "CI", "Agent" and "Admission"
```

### Enforce a "baseline policy" across all your clusters
Imagine you have defined a minimum standard you want all Kubernetes resources to align to, and therefor want to report and enforce these policies across your organization. An example may be requiring CPU and Memory requests on all workloads. 

This "baseline policy" example below will:
- report on resources with missing CPU and Memory requests in the clusters right now (e.g., `Agent` context)
- enforce/block Admission Requests with resources missing CPU and Memory requests (via the [`block: true` configuration](#blocking-and-enforcement))

```yaml
type: PolicyMapping
name: baseline-policy
spec:
  block: true
  appGroups: [match-all]
  policies: [polaris.memoryRequestsMissing, polaris.cpuRequestsMissing]
  contexts: [Agent, Admission]
```

### Scan only `polaris.livenessProbeMissing` policy
Note, if you do not specify any `contexts`, Insights will default to all contexts (Agent, Admission, and CI).

```yaml
type: PolicyMapping
name: liveness-probe-missing-only
spec:
  appGroups: [ecommerce-business-unit]
  policies: [polaris.livenessProbeMissing]
```

### Disable a Policy Mapping

```yaml
type: PolicyMapping
name: liveness-probe-missing-only
spec:
  enabled: false # enabled by default
  appGroups: [match-all]
  policies: [polaris.livenessProbeMissing]
```

### Block any `polaris` policy at Admission or in Repo scans

```yaml
type: PolicyMapping
name: block-polaris-at-admission
spec:
  block: true
  appGroups: [match-all]
  policies: [polaris]
  contexts: [Admission, CI]
```

## Blocking and Enforcement
The `block` configuration in a Policy Mapping only applies to Admission Controllers in Blocking mode (e.g., Passive Mode is disabled) and Repo Scans configured to fail pipelines.

- `block` is `null` or not present (default) - Insights will only block if the Action Item has a severity of High or Critical
- `block: true` - Insights will always block if any of the `policies` are present
- `block: false` - Insights will never block (but continue to report Action Items) if any of the `policies` are present

### When a Kubernetes Resource has conflicting `block` directives
In a scenario where a Kubernetes resource is subject to multiple Policy Mappings with conflicting `block` values (e.g., one with `block: true` and another with `block: false`), Insights will default to `block:true`, meaning Insights will attempt to enforce/block that Admission Request or Repo Scan.

## Managing Policy Mappings


You can manage Policy Mappings "as code" via the Insights CLI, or through the Insights UI.
- For managing Policy Mappings via CLI, refer to [Insights CLI - Policy Mappings](/features/insights-cli#policy-mappings).
- For managing Policy Mappings via the Insights UI, you must have an `Owner` role. Select the "Policy" navigation link, then select "Policy Mappings" to add, edit, or delete your Policy Mapping configurations.

