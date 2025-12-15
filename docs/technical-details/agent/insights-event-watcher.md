---
meta:
  - name: title
    content: Event Watcher and Fairwinds Insights
  - name: description
    content: The Event Watcher captures real-time Kubernetes admission policy violations and blocked deployments, integrating with Fairwinds Insights for actionable reporting.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Event Watcher, policy violation, admission controller, Kyverno, ValidatingAdmissionPolicy, audit logs, CloudWatch, Kubernetes security
---

# Event Watcher

The `insights-event-watcher` is a specialized Kubernetes component that captures **real-time policy violations** during resource admission. Unlike regular policy scans that find existing violations, the event watcher captures **blocked deployments** as they happen.

## Purpose & Data Flow:
- **Regular Kyverno Plugin**: Scans existing resources → Reports as Action Items
- **Event Watcher**: Captures blocked admissions → Reports to Admission page
- **Focus**: ValidatingAdmissionPolicy and Kyverno policy violations that **prevent** resource creation

The component supports both local audit logs and AWS CloudWatch integration for EKS clusters.

## Key Features

- **ValidatingAdmissionPolicy Focus**: Primary focus on detecting policy violations that block resource installation
- **Dual Log Sources**: Supports both local audit logs (Kind/local clusters) and CloudWatch logs (EKS clusters)
- **Policy Violation Detection**: Automatically detects and processes policy violations from Kubernetes events
- **CloudWatch Integration**: Real-time processing of EKS audit logs from AWS CloudWatch
- **Insights Integration**: Sends blocked policy violations directly to Fairwinds Insights API for display on the Admission page

## Enabling Event Watcher

Event watcher is configured through the Helm chart:

### Local Mode (Kind/Local Clusters)
```yaml
insights-event-watcher:
  enabled: true
  logLevel: "info"
  logSource: "local"
  auditLogPath: "/var/log/kubernetes/kube-apiserver-audit.log"
  resources:
    limits:
      cpu: 100m
      memory: 128Mi
    requests:
      cpu: 50m
      memory: 64Mi
```

### CloudWatch Mode (EKS Clusters)
```yaml
insights-event-watcher:
  enabled: true
  logLevel: "info"
  logSource: "cloudwatch"
  cloudwatch:
    enabled: true
    logGroupName: "/aws/eks/production-eks/cluster"
    region: "us-west-2"
    filterPattern: "{ $.stage = \"ResponseComplete\" && $.responseStatus.code >= 400 && $.requestURI = \"/api/v1/*\" }"
    batchSize: 100
    pollInterval: "30s"
    maxMemoryMB: 512
  serviceAccount:
    annotations:
      eks.amazonaws.com/role-arn: "arn:aws:iam::ACCOUNT_ID:role/insights-watcher-cloudwatch-role"
  resources:
    limits:
      cpu: 500m
      memory: 1Gi
    requests:
      cpu: 100m
      memory: 256Mi
```

## Configuration Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `insights-event-watcher.enabled` | Enable/disable event watcher | `false` |
| `insights-event-watcher.logLevel` | Log level (debug, info, warn, error) | `info` |
| `insights-event-watcher.logSource` | Log source (local, cloudwatch) | `local` |
| `insights-event-watcher.auditLogPath` | Path to audit log file (local mode) | `/var/log/kubernetes/kube-apiserver-audit.log` |
| `insights-event-watcher.cloudwatch.logGroupName` | CloudWatch log group name | - |
| `insights-event-watcher.cloudwatch.region` | AWS region for CloudWatch | - |
| `insights-event-watcher.cloudwatch.filterPattern` | CloudWatch filter pattern | - |
| `insights-event-watcher.cloudwatch.batchSize` | Events per batch | `100` |
| `insights-event-watcher.cloudwatch.pollInterval` | Poll interval | `30s` |

## How Event Watcher Works

1. **Log Source Selection**: Monitors either local audit logs or CloudWatch logs based on configuration
2. **Policy Violation Detection**: Identifies ValidatingAdmissionPolicy and Kyverno policy violations
3. **Event Processing**: Processes events that contain "(blocked)" indicators showing policy enforcement
4. **Insights Transmission**: Sends policy violation events to Fairwinds Insights API for display on the Admission page
5. **Health Monitoring**: Provides health check endpoints for Kubernetes monitoring

## Monitored Policy Violations

The event watcher specifically looks for policy violations that **block** resource creation:

### ValidatingAdmissionPolicy Events
```bash
Warning   PolicyViolation     validatingadmissionpolicy/disallow-host-path   Deployment default/nginx: [disallow-host-path] fail (blocked); HostPath volumes are forbidden...
```

### Kyverno Policy Events
```bash
Warning   PolicyViolation     deployment/nginx                               policy disallow-host-path/disallow-host-path fail (blocked): HostPath volumes are forbidden...
```

## CloudWatch Integration (EKS)

For EKS clusters, the event watcher can process audit logs directly from CloudWatch:

### IAM Setup
Create an IAM role with CloudWatch logs permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:FilterLogEvents",
        "logs:GetLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:*:*:log-group:/aws/eks/*/cluster",
        "arn:aws:logs:*:*:log-group:/aws/eks/*/cluster:*"
      ]
    }
  ]
}
```

### Service Account Annotation
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: insights-event-watcher
  annotations:
    eks.amazonaws.com/role-arn: "arn:aws:iam::ACCOUNT_ID:role/insights-watcher-cloudwatch-role"
```

## Event Watcher Operations

### Check Event Watcher Status
```bash
# View event watcher deployment
kubectl get deployment -n insights-agent insights-event-watcher

# Check event watcher logs
kubectl logs -n insights-agent -l app=insights-event-watcher

# View health check endpoints
kubectl port-forward -n insights-agent deployment/insights-event-watcher 8080:8080
curl localhost:8080/healthz
curl localhost:8080/readyz
```

### Manual Testing
```bash
# Create a policy that blocks resources
kubectl apply -f - <<EOF
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-host-path
spec:
  validationFailureAction: Enforce  # This generates "(blocked)" events
  rules:
  - name: disallow-host-path
    match:
      resources:
        kinds: [Pod]
    validate:
      message: "HostPath volumes are forbidden"
      pattern:
        spec:
          =(volumes):
            - X(hostPath): "null"
EOF

# Try to create a pod that violates the policy
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - name: test
    image: nginx
  volumes:
  - name: host-vol
    hostPath:
      path: /tmp
EOF
```

## Troubleshooting Event Watcher

### Common Issues

**Event Watcher Not Starting**
```bash
# Check deployment status
kubectl describe deployment -n insights-agent insights-event-watcher

# Check for RBAC issues
kubectl auth can-i get events --as=system:serviceaccount:insights-agent:insights-event-watcher
```

**No Policy Violations Detected**
1. Verify policies are configured with `validationFailureAction: Enforce`
2. Check that events contain "(blocked)" text
3. Ensure audit logging is enabled in the cluster
4. For CloudWatch mode, verify log group and filter pattern

**CloudWatch Authentication Issues**
```bash
# Check service account annotations
kubectl describe sa insights-event-watcher -n insights-agent

# Verify IAM role permissions
aws sts get-caller-identity
aws logs describe-log-groups --log-group-name-prefix /aws/eks/
```

## RBAC Requirements

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: insights-event-watcher
rules:
# Kubernetes events - CRITICAL for policy violation detection
- apiGroups: [""]
  resources: ["events"]
  verbs: ["get", "list", "watch"]
# ValidatingAdmissionPolicy resources - PRIMARY FOCUS
- apiGroups: ["admissionregistration.k8s.io"]
  resources: ["validatingadmissionpolicies", "validatingadmissionpolicybindings"]
  verbs: ["get", "list", "watch"]
# Kyverno policy resources (secondary)
- apiGroups: ["wgpolicyk8s.io"]
  resources: ["policyreports", "clusterpolicyreports"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["kyverno.io"]
  resources: ["policies", "clusterpolicies"]
  verbs: ["get", "list", "watch"]
```

## Best Practices

1. **Policy Focus**: Configure policies with enforcement mode to generate blocked events
2. **CloudWatch Filtering**: Use specific filter patterns to reduce data transfer costs
3. **Resource Limits**: Set appropriate limits based on cluster size and event volume
4. **Health Monitoring**: Use health check endpoints for proper Kubernetes integration
5. **Testing**: Regularly test policy violations to ensure event watcher is functioning
