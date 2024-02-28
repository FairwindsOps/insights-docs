---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: About the Policy Mappings."
---

# Policy Mappings

Policy Mappings allow the users to specify the Policies that are allowed to run. Previously, all Policies were run by default. Now, organizations owners can take an “opt-in” approach and declare specific Policies they’d like to run against those resources (provided by the App Groups) – helping Owners reduce Action Item “information overload”.

## Policy Mapping examples:

### Select all `polaris` policies:

```yaml
type: PolicyMapping
name: all-polaris-and-trivy
spec:
  appGroups: [match-all]
  policies: [polaris, trivy]
```

### Select only `polaris.livenessProbeMissing` policy:

```yaml
type: PolicyMapping
name: liveness-probe-missing-only-and-trivy
spec:
  appGroups: [match-all]
  policies: [polaris.livenessProbeMissing, trivy]
```

### Disable the policy:

```yaml
type: PolicyMapping
name: liveness-probe-missing-only
spec:
  enabled: false # enabled by default
  appGroups: [match-all]
  policies: [polaris.livenessProbeMissing]
```

### Select policy only in `Agent` Context:

```yaml
type: PolicyMapping
name: liveness-probe-missing-only
spec:
  enabled: false
  appGroups: [match-all]
  policies: [polaris.livenessProbeMissing]
  contexts: [Agent] # possible values are "CI/CD", "Agent" and AdmissionController
```

### Block any polaris policy at Admission:

```yaml
type: PolicyMapping
name: block-polaris-at-admission
spec:
  block: true
  appGroups: [match-all]
  policies: [polaris]
  contexts: [Admission]
```

### Disable policy-mapping:

```yaml
type: PolicyMapping
name: liveness-probe-missing-only
spec:
  enabled: false
  block: true
  appGroups: [match-all]
  policies: [polaris.livenessProbeMissing]
```

## Managing Policy Mappings

For managing Policy Mappings via CLI, refer to [insights CLI - Policy Mappings](/features/insights-cli#policy-mappings).