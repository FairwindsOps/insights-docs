---
meta:
  - name: title
    content: Kyverno and Fairwinds Insights
---
# Kyverno
Refer to the [Kyverno documentation](https://kyverno.io/docs/) for using Kyverno in your project. Make sure you have [installed Kyverno](https://kyverno.io/docs/installation/) with the accompanying CRDs before proceeding.

## Setup
Here is an example of installing Kyverno with the `test-org` organization and `prod` cluster:

### Install `insights-agent` with helm and enable Kyverno plugin

**For Kyverno Policy Scanning (reports Action Items):**
```yaml
insights:
  organization: "test-org"
  cluster: "prod"
kyverno:
  enabled: true
```

**For Kyverno Policy Sync (deploys policies from Insights):**
```yaml
insights:
  organization: "test-org"
  cluster: "prod"
kyverno:
  enabled: true
kyverno-policy-sync:
  enabled: true
```

```bash
kubectx kind-kind
helm repo update
helm upgrade --install insights-agent fairwinds-stable/insights-agent -f values.yaml \
  --version "2.23.*" \
  --create-namespace \
  --namespace insights-agent \
  --wait \
  --atomic
```

### Create Kyverno Policies

We'll create some test policies provided from the Kyverno documentation:

```bash
# pods should have resource requests and limits
kubectl apply -f https://raw.githubusercontent.com/kyverno/policies/main/best-practices/require-pod-requests-limits/require-pod-requests-limits.yaml
# pods should have a readiness or liveness probe configured
kubectl apply -f https://raw.githubusercontent.com/kyverno/policies/main/best-practices/require-probes/require-probes.yaml
# pod containers should not use the `latest` tag
kubectl apply -f https://raw.githubusercontent.com/kyverno/policies/main/best-practices/disallow-latest-tag/disallow-latest-tag.yaml
```

#### Note on Mapping Kyverno Policies to Action Items in Insights

If you inspect one of the example policies provided in the Kyverno documentation, you'll see that the following annotations are set:

```
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-latest-tag
  annotations:
    policies.kyverno.io/title: Disallow Latest Tag
    policies.kyverno.io/category: Best Practices
    policies.kyverno.io/minversion: 1.6.0
    policies.kyverno.io/severity: medium
    policies.kyverno.io/subject: Pod
    policies.kyverno.io/description: >-
      The ':latest' tag is mutable and can lead to unexpected errors if the
      image changes. A best practice is to use an immutable tag that maps to
      a specific version of an application Pod. This policy validates that the image
      specifies a tag and that it is not called `latest`.
```

These annotations are mapped to the corresponding action item when a Kyverno report is sent to Insights in the following way:

* `policies.kyverno.io/title:`, `title`
* `policies.kyverno.io/category` and an Insights `category` are used in different ways. While `policies.kyverno.io/category` can be set to anything, there are only three categories currently supported by Insights. Those are `Efficiency`, `Reliability` and `Security`. If the annotation is not set to any of the categories supported by insights, it will fall back to `Security`
* Similar to `category`, `policies.kyverno.io/severity` should be set to one of the severeties defined in Insights. Those values are `Critical`, `High`, `Medium`, `Low` and `None`. These are not case-sensitive.
* `policies.kyverno.io/description` will correspond to the Insights Action Item description

At minimum, you should try to set `policies.kyverno.io/title` when creating a new `policy`/`clusterpolicy` so your Action Items are easy to identify and resolve.

### Create `deployment`

```bash
kubectl -n default apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
EOF
```

Note how this Deployment:

* Has no resource requests or limits

* Has no readiness or liveness probe

* Uses the `latest` tag

These should all now be picked up by our new Kyverno policies. After a minute or so, we should see new `PolicyReport` objects in our cluster. We can either wait for the Kyverno insights plugin to run again, or trigger the job manually:

```
kubectl -n insights-agent create job --from=cronjob/kyverno kyverno-test-job
```

Once this runs, we should see corresponding Action Items in the Insights UI.

### Check `PolicyReport` status
```bash
kubectl get policyreport -A
```

### Remediate

Let's fix the findings

```bash
# fix requests/limits
kubectl -n default patch deployment nginx-deployment --patch '{"spec":{"template":{"spec":{"containers":[{"name":"nginx","resources":{"requests":{"memory":"64Mi","cpu":"250m"},"limits":{"memory":"128Mi","cpu":"500m"}}}]}}}}'
# fix pod probes
kubectl -n default patch deployment nginx-deployment --patch '{"spec":{"template":{"spec":{"containers":[{"image":"nginx","imagePullPolicy":"IfNotPresent","name":"nginx","resources":{},"ports":[{"containerPort":80}],"readinessProbe":{"httpGet":{"path":"/","port":80}}}]}}}}'
# fix latest tag
kubectl -n default patch deployment nginx-deployment --type JSON -p '[{"op":"replace","path":"/spec/template/spec/containers/0/image","value":"nginx:1.14.2"}]'
```

You should see `PolicyReport`s with each `Policy` name. Under the displayed column with status `fail`, you should see that those are now resolved. The corresponding Action Items should also be resolved after the `kyverno` insights job runs again.

## Kyverno Policy Sync

The `kyverno-policy-sync` is a **separate component** from the Kyverno report plugin. While the Kyverno plugin **scans existing policies** and reports violations as Action Items, the policy sync component **deploys and manages policies** from Insights to your clusters.

### Key Distinction:
- **Kyverno Plugin**: Scans → Reports violations as Action Items
- **Policy Sync**: Fetches policies from Insights → Deploys to cluster

The `kyverno-policy-sync` automatically keeps your cluster's Kyverno policies in sync with the policies defined in Fairwinds Insights.

### Key Features

- **Automatic Policy Synchronization**: Keeps cluster policies in sync with Insights
- **Insights-Managed Only**: Only affects policies with `insights.fairwinds.com/owned-by: "Fairwinds Insights"` annotation
- **Distributed Locking**: Uses Kubernetes Lease-based leader election for preventing concurrent operations
- **kubectl Integration**: Uses `kubectl apply` and `kubectl delete` for all policy operations
- **Multi-Resource Support**: Supports all Kyverno policy types (ClusterPolicy, Policy, ValidatingAdmissionPolicy, etc.)
- **Dry-Run Mode**: Preview changes before applying them
- **Comprehensive Logging**: Detailed audit trail of all operations

### Enabling Policy Sync

Policy sync is typically deployed as a CronJob through the Helm chart:

```yaml
kyverno-policy-sync:
  enabled: true
  # CronJob schedule (every 5 minutes)
  schedule: "*/5 * * * *"
  # Dry run mode - preview changes without applying
  dryRun: false
  # Log level (debug, info, warn, error)
  logLevel: "info"
  # Resource configuration
  resources:
    limits:
      memory: "256Mi"
      cpu: "200m"
    requests:
      memory: "128Mi"
      cpu: "100m"
```

### Configuration Options

The `kyverno-policy-sync` section supports the following options:

- `enabled`: Enable/disable policy sync (required)
- `schedule`: CronJob schedule (default: `"*/5 * * * *"`)
- `dryRun`: Preview changes without applying (default: `false`)
- `logLevel`: Log level - debug, info, warn, error (default: `"info"`)
- `resources`: Resource limits and requests for the sync job

### Environment Variables

The sync uses environment variables for configuration (automatically set by Helm):

- `FAIRWINDS_INSIGHTS_HOST`: Insights API host (required)
- `FAIRWINDS_TOKEN`: Insights API token (required)
- `FAIRWINDS_ORG`: Organization name (required)
- `FAIRWINDS_CLUSTER`: Cluster name (required)
- `DRY_RUN`: Enable dry-run mode (optional, default: false)
- `LOG_LEVEL`: Log level (optional, default: info)

### How Policy Sync Works

1. **Fetch Policies**: Retrieves expected policies from Insights API based on:
   - Organization and cluster configuration
   - App Group criteria matching the cluster
   - Policy Mapping configurations
2. **Compare States**: Compares expected policies with currently deployed policies
3. **Determine Actions**: Identifies policies to apply, update, or remove
4. **Acquire Lock**: Uses Kubernetes Lease-based leader election to prevent concurrent operations
5. **Execute Changes**: Applies, updates, or removes policies using kubectl commands
6. **Release Lock**: Releases the leader election lock
7. **Report Results**: Logs comprehensive results of the sync operation

### Policy Management

#### Policy Ownership
Only policies with the following annotation are managed by the sync:

```yaml
metadata:
  annotations:
    insights.fairwinds.com/owned-by: "Fairwinds Insights"
```

#### Policy Operations
The sync performs operations using kubectl:

1. **Apply**: New policies from Insights
   ```bash
   kubectl apply -f policy.yaml
   ```

2. **Update**: Existing policies that have changed
   ```bash
   kubectl apply -f policy.yaml  # Handles both create and update
   ```

3. **Remove**: Policies no longer in Insights
   ```bash
   kubectl delete clusterpolicy policy-name
   ```

#### Supported Policy Types
The sync supports all Kyverno policy resource types:
- `clusterpolicies` (ClusterPolicy)
- `policies` (Policy)
- `validatingpolicies` (ValidatingPolicy)
- `validatingadmissionpolicies` (ValidatingAdmissionPolicy)
- `clustercleanuppolicies` (ClusterCleanupPolicy)
- `imagevalidatingpolicies` (ImageValidatingPolicy)
- `mutatingpolicies` (MutatingPolicy)
- `generatingpolicies` (GeneratingPolicy)
- `deletingpolicies` (DeletingPolicy)
- `namespacedvalidatingpolicies` (NamespacedValidatingPolicy)
- `policyexceptions` (PolicyException)

### Monitoring Policy Sync

#### Check Sync Job Status
```bash
# View recent sync jobs
kubectl get jobs -n insights-agent -l app=kyverno-policy-sync

# Check CronJob status
kubectl get cronjob -n insights-agent kyverno-policy-sync

# View job logs
kubectl logs -n insights-agent -l job-name=kyverno-policy-sync-<timestamp>
```

#### Manual Policy Sync
```bash
# Trigger a manual sync
kubectl create job -n insights-agent \
  --from=cronjob/kyverno-policy-sync \
  manual-policy-sync-$(date +%s)
```

#### Verify Deployed Policies
```bash
# List all cluster policies
kubectl get clusterpolicy

# Check policies managed by Insights
kubectl get clusterpolicy -l insights.fairwinds.com/owned-by="Fairwinds Insights"

# View policy details
kubectl describe clusterpolicy <policy-name>
```

#### Lock Operations for debug
```bash
# Check lease status
kubectl get lease kyverno-policy-sync-lock -n <namespace>

# View lease details
kubectl describe lease kyverno-policy-sync-lock -n <namespace>

# Manual lease release (if needed - lease will expire automatically)
kubectl delete lease kyverno-policy-sync-lock -n <namespace>
```

### Sync Results Logging

The sync provides detailed logging for monitoring:

```json
{
  "level": "info",
  "msg": "Policy sync completed",
  "success": true,
  "duration": "5.2s",
  "summary": "Applied 2, Updated 1, Removed 0, Failed 0",
  "applied": ["policy1", "policy2"],
  "updated": ["policy3"],
  "removed": [],
  "failed": []
}
```

### Troubleshooting Policy Sync

#### Common Issues

**Policy Application Failed**
Policy has syntax errors or kubectl apply fails:
```bash
# Check job logs for application errors
kubectl logs -n insights-agent -l job-name=kyverno-policy-sync-<timestamp> | grep -i error

# Test policy manually
kubectl apply -f policy.yaml --dry-run=client
```

**API Authentication Failed**
Invalid token or permissions:
```bash
# Verify API token is configured
kubectl get secret -n insights-agent insights-token

# Check token permissions in logs
kubectl logs -n insights-agent -l job-name=kyverno-policy-sync-<timestamp> | grep -i auth
```

**Kubernetes API Errors**
Cluster connectivity or RBAC issues:
```bash
# Check RBAC permissions
kubectl auth can-i create clusterpolicies --as=system:serviceaccount:insights-agent:kyverno-policy-sync

# Verify network connectivity
kubectl exec -n insights-agent <pod-name> -- curl -I https://insights.fairwinds.com
```

### RBAC Requirements

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: kyverno-policy-sync
rules:
# All Kyverno policy types
- apiGroups: ["kyverno.io"]
  resources: ["policies", "clusterpolicies"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
- apiGroups: ["wgpolicyk8s.io"]
  resources: ["validatingpolicies", "namespacedvalidatingpolicies"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
- apiGroups: ["admissionregistration.k8s.io"]
  resources: ["validatingadmissionpolicies"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
- apiGroups: ["kyverno.io"]
  resources: ["clustercleanuppolicies", "imagevalidatingpolicies", "mutatingpolicies", "generatingpolicies", "deletingpolicies", "policyexceptions"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
# Lease for leader election
- apiGroups: ["coordination.k8s.io"]
  resources: ["leases"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
# Events for logging
- apiGroups: [""]
  resources: ["events"]
  verbs: ["create"]
```

### Best Practices

1. **Start with Dry Run**: Enable `dryRun: true` initially to preview changes
2. **Monitor Leader Election**: Watch for leadership conflicts or extended wait times
3. **Resource Limits**: Set appropriate resource limits for the sync job
4. **Backup Policies**: Keep local backups of critical policies before enabling sync
5. **Staged Rollout**: Test policy changes in non-production clusters first
6. **Monitor Logs**: Regularly review sync logs for errors or warnings
7. **Policy Ownership**: Ensure only policies managed by Insights have the ownership annotation
