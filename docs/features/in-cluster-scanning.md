---
meta:
  - name: title
    content: Fairwinds Insights Agent
  - name: description
    content: "Fairwinds Insights | Documentation: The Insights Agent runs inside your Cluster, and sends back data to Fairwinds Insights"
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
---
# In-Cluster Scanning
## About
The Insights Agent runs inside your cluster and sends back data to Fairwinds Insights. The data is then used to indicate specific security, reliability and efficiency issues in the cluster. These issues are called `Action Items` in Insights.

The Insights Agent comes with several different open source reporting tools, each of which can be
configured independently using the [Install Hub.](/features/in-cluster-scanning#install-hub)
To read more about the different report types, see the [Reports Section](/technical-details/reports/polaris).
## Installation
### Install Hub
When you create a cluster, you'll be taken to the `Install Hub` page for the cluster. To install the Insights Agent:
1. Decide which reports you would like to run in your cluster
2. Hover over each of the desired reports, then click the `Quick Add` button at the bottom of the report
3. Click the `Ready to Install` icon located in the top right corner of the page

Follow the instructions to install the Insights Agent with Helm. If you'd like to view the Kubernetes
manifests first, you can use `helm template` to generate the YAML files.

### Fleet Installation
To better serve customers with a large number of clusters,
we've created a flow that allows you to easily deploy the Insights Agent across your fleet.

You can use the following commands to install the insights-agent in many clusters,
changing `insights.cluster` to a unique identifier for each cluster (e.g. generated using
your kube context).
```
kubectl delete job --all -n insights-agent
helm upgrade --install insights-agent fairwinds-stable/insights-agent \
  --namespace insights-agent \
  --create-namespace \
  --set fleetInstall=true  \
  --set insights.organization="$YOUR_ORGANIZATION" \
  --set insights.cluster="$CLUSTER_IDENTIFIER" \
  --set insights.tokenSecretName=insights-token \
  --set insights.apiToken="$YOUR_API_TOKEN"
```

With these flags set, the Helm chart will create a new cluster in the Insights UI with the specified name
(unless a cluster with that name already exists) before installing the agent.

Here's a description of the flags above:
* `fleetInstall` - Boolean - specify if this install is using the fleet install flow
* `insights.organization` - String - the name your organization in Insights
* `insights.cluster` - String - the name you want to give this cluster in the Insights UI. You may want to auto-generate this from your kubectl context
* `insights.tokenSecretName` - String - the name of the secret where Insights will store your cluster's token. We recommend `insights-token`
* `insights.apiToken` - String - the admin token from your organization's `Settings > Tokens` page

You'll also want to set `$report.enabled` for each of the reports you want to run,
as well as any other [chart options](https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent)

Here is an example of installing the Insights Agent with the `Polaris` and `Trivy` reports inside a cluster named `test-cluster` within the `test-org` organization:
```
kubectl delete job --all -n insights-agent
helm upgrade --install insights-agent fairwinds-stable/insights-agent \
  --namespace insights-agent \
  --create-namespace \
  --set fleetInstall=true  \
  --set insights.organization="test-org" \
  --set insights.cluster="test-cluster" \
  --set insights.tokenSecretName=insights-token \
  --set insights.apiToken="thisIsTheTestOrgAdminToken1234567"
```

When reinstalling the Agent in the same cluster, you can omit `apiToken` and `fleetInstall`
and simply specify `tokenSecretName`.
This allows you to hand off control of the Agent to other teams without sharing your
organization's apiToken.

## Configuration
### Helm
The Insights Agent can be configured using Helm. To see the full list of options, check out the
[Insights Agent Helm chart.](https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent)

In particular, for any given report type, you can set the following options:
* `enabled` - Boolean - set to `true` to enable the report
* `schedule` - String - a Cron expression describing when to run this report. This is typically set to a random minute every hour
* `timeout` - String - the maximum time this report should run before an error is triggered (seconds)
* `resources` - requests and limits for CPU and memory for this report

### Install Hub
You can customize any of the reports through the `Install Hub`:
1. Visit your organization's `Clusters` page
2. After selecting a cluster, go to the `Install Hub` page
3. Click on a report and navigate to `Configure`

<img :src="$withBase('/img/report-hub-customize.png')" alt="customize report">

You will see the following options:
* `schedule` - a Cron expression describing when to run this report
* `timeout` - the maximum time this report should run before an error is triggered (seconds)

These options will be reflected in the `helm install` command you'll see when you click `Ready to Install`
in the `Install Hub`.
Be sure to run the new command after making any changes here.

## Reporting
Insights tracks Action Item remediation progress over-time under the `Action Items > Reports` page. Insights will tally Action Item counts for the following dimensions:
- Introduced: The number of unique Action Items reported as 'new' for that date window
- Fixed: The number of Action Items that were verified as fixed and marked as `Fixed=True`. A fixed Action Item is when the policy violation is no longer triggered and the Kubernetes resource continues to persist in the cluster.
- Deleted: The number of Action Items that have been deleted from the system because the Kubernetes resource no longer exists in the cluster.
- Open: The number of Action Items that remained in the cluster for that given month
- Manually Resolved: The number of Action Items that were manually set as `Working as intendend` or `Won't fix`.

### Reporting Fixed and Deleted Action Items
The below table outlines the logic Insights follows for deleting Action Items or marking them as "Fixed":
|                                             | **Resource no longer exists in cluster** | **Resource is running in cluster**                                                                                             |
|---------------------------------------------|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| **Action Item is Fixed (Fixed=True)**       | Action Item will get deleted*            | Action Item will be reported with these values <br>- `Fixed=True` <br> - `Last Reported` = date when Fixed                              |
| **Action Item is Not Fixed  (Fixed=False)** | Action Item will get deleted*             | Action Item will be reported with these values <br> - `Fixed=False` <br> - `Last Reported` = date of most recent report (usually < 1 hr) |

\* Action Item deletion may take up to 1 hour after the resource is removed from the cluster.

## Troubleshooting
### Debugging
If you suspect something is wrong with the Insights Agent installation, you can use `kubectl` to
debug the problem.

After the agent runs, `kubectl get pods` should show something like this:
```
$ kubectl get pods -n insights-agent
NAME                                                    READY   STATUS      RESTARTS   AGE
goldilocks-5sh8s                                        0/2     Completed   0          18m
goldilocks-7pgp6                                        0/2     Completed   0          19m
insights-agent-goldilocks-controller-5b6b45d678-vgbrk   1/1     Running     0          19m
insights-agent-goldilocks-vpa-install-566h8             0/1     Completed   0          19m
kube-bench-dpvbz                                        0/2     Completed   0          18m
kube-hunter-tnmsw                                       0/2     Completed   0          18m
polaris-zk4px                                           0/2     Completed   0          18m
rbac-reporter-1583952600-kwmfz                          0/2     Completed   0          105s
rbac-reporter-sf9cz                                     0/2     Completed   0          18m
release-watcher-6lhm7                                   0/2     Completed   0          18m
trivy-8nw9d                                             0/2     Completed   0          18m
workloads-1583951700-dj6wb                              0/2     Completed   0          16m
workloads-q6gzt                                         0/2     Completed   0          18m
```

If any of the pods show an error, you can look at the logs. There are typically two containers
per pod in the Insights Agent - one to run the auditing tool and another to upload the results.
For example, here are typical logs for kube-bench:

```bash
$ kubectl logs kube-bench-dpvbz -n insights-agent -c kube-bench
time="2020-03-11T18:32:51Z" level=info msg="Starting:"
time="2020-03-11T18:32:51Z" level=info msg="Updating data."
time="2020-03-11T18:32:54Z" level=info msg="Data updated."
```

If nothing suspicious appears there, you might find an answer in the second container which uploads the results.
It should end with something like this:
```bash
$ kubectl logs kube-bench-dpvbz -n insights-agent -c insights-uploader
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  174k  100    16  100  174k     23   254k --:--:-- --:--:-- --:--:--  274k
+ exit 0
{"Success":true}
```

### Resource Limits
We have set reasonable resource requests and limits on each of the audits, but some clusters
may push the boundaries of our assumptions. If you're seeing out-of-memory errors or other
resource related issues, try setting higher resource limits.

If you're using the helm chart, you can do this by adding

```bash
--set $reportType.resources.limits.memory=1Gi
# or
--set $reportType.resources.limits.cpu=1000m
```
to your `helm update --install` command.

### Timeouts
We have set a reasonable timeout for each of the audits, but again, some clusters may
push the boundaries of our assumptions. If you're seeing timeout issues in the `insights-uploader`
container in one of the report types, you can adjust the timeout by adding:

```bash
--set $reportType.timeout=3600  # 3600s = 5min
```
to your `helm update --install` command.

## Event Watcher

The `insights-event-watcher` is a Kubernetes plugin that monitors policy-related resources and events, with a special focus on **ValidatingAdmissionPolicy violations** that block resource installation. It supports both local audit logs and AWS CloudWatch integration for EKS clusters.

### Key Features

- **ValidatingAdmissionPolicy Focus**: Primary focus on detecting policy violations that block resource installation
- **Dual Log Sources**: Supports both local audit logs (Kind/local clusters) and CloudWatch logs (EKS clusters)
- **Policy Violation Detection**: Automatically detects and processes policy violations from Kubernetes events
- **CloudWatch Integration**: Real-time processing of EKS audit logs from AWS CloudWatch
- **Insights Integration**: Sends blocked policy violations directly to Fairwinds Insights API for display on the Admission page

### Enabling Event Watcher

Event watcher is configured through the Helm chart:

#### Local Mode (Kind/Local Clusters)
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

#### CloudWatch Mode (EKS Clusters)
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

### Configuration Options

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

### How Event Watcher Works

1. **Log Source Selection**: Monitors either local audit logs or CloudWatch logs based on configuration
2. **Policy Violation Detection**: Identifies ValidatingAdmissionPolicy and Kyverno policy violations
3. **Event Processing**: Processes events that contain "(blocked)" indicators showing policy enforcement
4. **Insights Transmission**: Sends policy violation events to Fairwinds Insights API for display on the Admission page
5. **Health Monitoring**: Provides health check endpoints for Kubernetes monitoring

### Monitored Policy Violations

The event watcher specifically looks for policy violations that **block** resource creation:

#### ValidatingAdmissionPolicy Events
```bash
Warning   PolicyViolation     validatingadmissionpolicy/disallow-host-path   Deployment default/nginx: [disallow-host-path] fail (blocked); HostPath volumes are forbidden...
```

#### Kyverno Policy Events
```bash
Warning   PolicyViolation     deployment/nginx                               policy disallow-host-path/disallow-host-path fail (blocked): HostPath volumes are forbidden...
```

### CloudWatch Integration (EKS)

For EKS clusters, the event watcher can process audit logs directly from CloudWatch:

#### IAM Setup
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

#### Service Account Annotation
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: insights-event-watcher
  annotations:
    eks.amazonaws.com/role-arn: "arn:aws:iam::ACCOUNT_ID:role/insights-watcher-cloudwatch-role"
```

### Event Watcher Operations

#### Check Event Watcher Status
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

#### Manual Testing
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

### Troubleshooting Event Watcher

#### Common Issues

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

### RBAC Requirements

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

### Best Practices

1. **Policy Focus**: Configure policies with enforcement mode to generate blocked events
2. **CloudWatch Filtering**: Use specific filter patterns to reduce data transfer costs
3. **Resource Limits**: Set appropriate limits based on cluster size and event volume
4. **Health Monitoring**: Use health check endpoints for proper Kubernetes integration
5. **Testing**: Regularly test policy violations to ensure event watcher is functioning
