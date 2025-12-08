---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Manage and deploy Kyverno policies across your Kubernetes clusters using App Groups and Policy Mappings."
---

# Kyverno Policies

## About

Fairwinds Insights allows you to centrally manage Kyverno policies and automatically deploy them to your Kubernetes clusters. By combining [App Groups](/features/app-groups) and [Policy Mappings](/features/policy-mappings), you can create sophisticated policy deployment strategies that apply different policies to different resources across your clusters.

### Key Benefits

- **Centralized Management**: Manage all Kyverno policies from a single location
- **Cluster-Specific Deployment**: Automatically deploy policies to specific clusters based on App Group criteria
- **Policy Scoping**: Use App Groups to control which resources policies apply to
- **Enforcement Control**: Configure whether policies block or audit via Policy Mappings
- **Automatic Sync**: Policies are automatically synced to clusters when changes are made

## Prerequisites

Before managing Kyverno policies in Insights, ensure:

1. **Kyverno is installed** in your clusters (see [Kyverno installation guide](https://kyverno.io/docs/installation/))
2. **Kyverno plugin is enabled** in your Insights Agent (see [technical documentation](/technical-details/reports/kyverno))
3. **Kyverno Policy Sync is enabled** for clusters where you want to deploy policies

## Creating Kyverno Policies

Kyverno policies can be managed using the Insights CLI. This allows you to manage policies as code and keep them in version control.

> **Note**: Currently, Kyverno policies can only be created and managed via the CLI. The Insights UI can be used to view policies, but creation and editing must be done through the CLI.

### Via the Insights CLI

You can manage Kyverno policies as code using the Insights CLI. This is recommended for managing policies in version control.

See the [Insights CLI documentation](/features/insights-cli#kyverno-policies) for detailed instructions.

**Quick example:**

```bash
# Create a directory for your policies
mkdir -p kyverno-policies

# Create a policy file
cat > kyverno-policies/require-resource-limits.yaml <<EOF
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-resource-limits
spec:
  validationFailureAction: Enforce
  rules:
    - name: check-limits
      match:
        any:
          - resources:
              kinds: [Pod]
      validate:
        message: "Resource limits required"
        pattern:
          spec:
            containers:
              - resources:
                  limits:
                    memory: "?*"
                    cpu: "?*"
EOF

# Validate the policy (optional but recommended)
insights-cli validate kyverno-policies -b ./kyverno-policies

# Push policies to Insights
insights-cli push kyverno-policies
```

**Common CLI commands:**

```bash
# Download existing policies from Insights
insights-cli download kyverno-policies -d .

# List policies
insights-cli list kyverno-policies
insights-cli list kyverno-policies --local  # List local files
insights-cli list kyverno-policies --cluster production  # List for cluster

# Validate policies
insights-cli validate kyverno-policies -b ./kyverno-policies
insights-cli validate kyverno-policies --cluster production

# Push with options
insights-cli push kyverno-policies --dry-run  # Preview changes
insights-cli push kyverno-policies -p policy1,policy2  # Push specific policies
insights-cli push kyverno-policies --delete  # Delete policies not in local files
```

### Policy Validation

All policies are validated before being saved:
- **Security validation**: Prevents potentially dangerous policy configurations
- **Kyverno CLI validation**: Ensures the policy is valid according to Kyverno specifications
- **Conflict detection**: Prevents creating policies that conflict with existing cluster policies

If validation fails, you'll receive detailed error messages to help fix the issue.

## Mapping Policies to App Groups

To deploy policies to specific clusters and resources, you need to create a Policy Mapping that connects your Kyverno policies to App Groups.

### Basic Policy Mapping Example

This example maps a Kyverno policy to all resources in all clusters:

```yaml
type: PolicyMapping
name: require-resource-limits
spec:
  appGroups: [match-all]
  policies: [kyverno.require-resource-limits]
  contexts: [Agent]
```

### Policy Reference Format

When referencing Kyverno policies in Policy Mappings, use the `kyverno.` prefix:

- `kyverno.policy-name` - References a specific policy
- `kyverno` - References all Kyverno policies managed by Insights

### Cluster-Specific Policy Deployment

To deploy policies only to specific clusters, create an App Group that matches those clusters:

```yaml
# App Group for production clusters
type: AppGroup
name: production-clusters
spec:
  match:
    - clusters: [prod-us-east, prod-us-west]

# Policy Mapping
type: PolicyMapping
name: production-security-policies
spec:
  appGroups: [production-clusters]
  policies: [kyverno.require-resource-limits, kyverno.disallow-privileged]
  contexts: [Agent, Admission]
```

### Resource-Specific Policy Deployment

You can scope policies to specific resources using App Group criteria:

```yaml
# App Group for frontend services
type: AppGroup
name: frontend-services
spec:
  match:
    - namespaces: [frontend, web]
      labels:
        - app: frontend

# Policy Mapping
type: PolicyMapping
name: frontend-policies
spec:
  appGroups: [frontend-services]
  policies: [kyverno.require-https, kyverno.disallow-latest-tag]
  contexts: [Agent, Admission]
```

## Policy Enforcement

### Blocking vs Auditing

You can control whether policies block or audit using the `block` setting in Policy Mappings:

```yaml
type: PolicyMapping
name: enforce-security-policies
spec:
  block: true  # Always block violations
  appGroups: [match-all]
  policies: [kyverno.disallow-privileged]
  contexts: [Admission, CI]
```

**Block Settings:**
- `block: true` - Always block violations (enforce mode)
- `block: false` - Never block, only report (audit mode)
- `block: null` or omitted - Uses the original behavior from the policy (preserves the policy's default enforcement setting)

### Enforcement Contexts

Policies can be enforced in different contexts:

- **Agent**: Background scanning of existing resources
- **Admission**: Blocking at deployment time (requires Admission Controller)
- **CI**: Blocking in CI/CD pipelines

```yaml
type: PolicyMapping
name: multi-context-policy
spec:
  block: true
  appGroups: [match-all]
  policies: [kyverno.require-resource-limits]
  contexts: [Agent, Admission, CI]  # Apply in all contexts
```

## Policy Transformation with App Groups

When a Kyverno policy is deployed to a cluster, Insights automatically transforms it based on the App Groups in the Policy Mapping. This ensures policies only apply to the resources specified in your App Groups.

### How Transformation Works

1. **Rules-Based Policies** (`ClusterPolicy`, `Policy`):
   - Each rule is multiplied by each App Group
   - Rule names become `{original-name}-{app-group-name}`
   - Match/exclude criteria from App Groups are added to each rule

2. **CEL-Based Policies** (`ValidatingPolicy`, `ValidatingAdmissionPolicy`):
   - `matchConstraints` are overwritten with App Group criteria
   - Operations are set from Policy Mapping `operations` field

3. **Other Policy Types**:
   - Cleanup, Mutating, Generating, and other policy types are transformed similarly
   - Match/exclude criteria are applied at the appropriate level

### Example Transformation

**Original Policy:**
```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-resource-limits
spec:
  rules:
    - name: check-limits
      match:
        any:
          - resources:
              kinds: [Pod]
      validate:
        message: "Resource limits required"
```

**After Transformation (with App Group matching `namespace: production`):**
```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-resource-limits
spec:
  rules:
    - name: check-limits-production
      match:
        any:
          - resources:
              kinds: [Pod]
              namespaces: [production]
      validate:
        message: "Resource limits required"
```

## Viewing Deployed Policies

### Via the Insights CLI

You can view policies using the CLI:

```bash
# List all policies from Insights
insights-cli list kyverno-policies

# List policies for a specific cluster (with app groups applied)
insights-cli list kyverno-policies --cluster production

# Export cluster policies as YAML
insights-cli list kyverno-policies --cluster production --format yaml
```

### Validating Policies

Before deploying, you can validate all policies for a cluster using the CLI:

```bash
# Validate policies for a specific cluster
insights-cli validate kyverno-policies --cluster production
```

The validation will show:
- Which policies are valid
- Any errors or warnings
- Which App Groups are applied to each policy
- Overall validation status

## Policy Sync

Policies are automatically synced to clusters when:

- A policy is created, updated, or deleted
- An App Group is modified that affects policy deployment
- A Policy Mapping is created, updated, or deleted

### Manual Sync Trigger

If you need to manually trigger a sync:

1. Make any change to a policy, App Group, or Policy Mapping using the CLI
2. The sync will be triggered automatically

Or use the API to trigger sync for a specific cluster (requires appropriate permissions).

### Sync Status

Sync status can be checked by:

1. Reviewing cluster logs for sync activity
2. Checking the cluster's policy deployment status
3. Validating policies for the cluster to ensure they're correctly deployed

## Supported Policy Types

Insights supports the following Kyverno policy kinds:

- **ClusterPolicy** - Cluster-wide policies
- **Policy** - Namespace-scoped policies
- **ValidatingPolicy** - CEL-based validation policies
- **ValidatingAdmissionPolicy** - Kubernetes ValidatingAdmissionPolicy
- **NamespacedValidatingPolicy** - Namespace-scoped validating policies
- **ClusterCleanupPolicy** - Cluster-wide cleanup policies
- **CleanupPolicy** - Namespace-scoped cleanup policies
- **MutatingPolicy** - Mutating policies
- **GeneratingPolicy** - Generating policies
- **DeletingPolicy** - Deleting policies
- **ImageValidatingPolicy** - Image validation policies
- **PolicyException** - Policy exceptions

## Best Practices

### 1. Use Descriptive Policy Names

Choose clear, descriptive names for your policies:
- ✅ `require-resource-limits-production`
- ❌ `policy1`

### 2. Organize with App Groups

Create App Groups that match your organizational structure:
- `production-workloads`
- `frontend-services`
- `backend-services`
- `system-components`

### 3. Use Policy Mappings for Enforcement

Create separate Policy Mappings for different enforcement levels:
- `security-policies-enforce` - Critical security policies that always block
- `best-practices-audit` - Best practices that only report

### 4. Test Before Enforcing

1. Create policies with `block: false` first
2. Monitor Action Items to see what would be blocked
3. Once confident, change to `block: true`

### 5. Use Namespaces for Namespaced Policies

For `Policy` and `NamespacedValidatingPolicy` kinds, always specify the namespace:
- Ensures policies are deployed to the correct namespace
- Prevents conflicts with cluster-wide policies

### 6. Validate Before Deploying

Always validate policies before deploying:
- Use CLI validation: `insights-cli validate kyverno-policies -b ./kyverno-policies`
- Check for errors and warnings
- Review the transformed YAML output using: `insights-cli list kyverno-policies --cluster <cluster> --format yaml`

## Troubleshooting

### Policy Not Appearing in Cluster

1. **Check App Group criteria**: Ensure the App Group matches the cluster
2. **Check Policy Mapping**: Verify the Policy Mapping is enabled and has the correct context
3. **Check Sync status**: Verify the policy sync has completed
4. **Check cluster configuration**: Ensure Kyverno Policy Sync is enabled for the cluster

### Policy Not Enforcing

1. **Check `block` setting**: Verify `block: true` is set in the Policy Mapping
2. **Check context**: Ensure the context includes `Admission` or `CI` for blocking
3. **Check Admission Controller**: Verify Admission Controller is enabled and in blocking mode
4. **Check policy spec**: Verify the policy's `validationFailureAction` is set correctly

### Policy Validation Errors

1. **Review error messages**: The validation provides specific error details
2. **Check Kyverno version**: Ensure your policy is compatible with your Kyverno version
3. **Check policy syntax**: Verify JSON/YAML syntax is correct
4. **Check required fields**: Ensure all required fields are present for the policy kind

### Transformation Issues

1. **Check App Group criteria**: Verify App Group criteria are valid
2. **Check rule names**: Rule names are automatically generated; very long names may be truncated
3. **Review transformed YAML**: Download and review the final YAML to see how policies are transformed

## Related Documentation

- [App Groups](/features/app-groups) - Learn how to define resource groups
- [Policy Mappings](/features/policy-mappings) - Learn how to map policies to App Groups
- [Insights CLI - Kyverno Policies](/features/insights-cli#kyverno-policies) - Manage policies as code
- [Kyverno Technical Details](/technical-details/reports/kyverno) - Setup and installation guide
- [Admission Controller](/features/admission-controller) - Enforce policies at deployment time

