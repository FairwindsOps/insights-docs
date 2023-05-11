---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Insights architecture"
---
# Insights Architecture

Fairwinds Insights consists of two main components:
* Client - this consists of the users' cluster, where the Insights Agent runs each of the enabled reports
* Server - this consists of the Insights backend, database, and file storage

<img :src="$withBase('/img/architecture.png')" alt="Insights Architecture">

## Report Architectures
Typically each report runs as a CronJob on a configurable schedule (usually once/hour by default).
The report will analyze resources in the cluster then send a JSON report with its findings
to `insights.fairwinds.com`.

While each report has its own requirements, there are some baseline requirements needed by the
Insights Agent:

* Sufficient RBAC permissions to create new Jobs in the cluster
* The `view` ClusterRole
* Network access to `insights.fairwinds.com`

Additional architecture notes and RBAC requirements for different reports are listed below.
Note that the Insights Agent only requires _egress_ from the cluster. You will not need to
open up access for any kind of network ingress.

Any exceptions or additions to this flow are listed below.

### Goldilocks
In addition to the typical cronjob, Goldilocks will run a long lived Deployment for controlling
VPA objects. Goldilocks will add a VPA (in `recommend` mode) to any incoming Deployment in order to
provide resource recommendations.

Goldilocks needs access to `raw.githubusercontent.com` in order to access the CRDs for VPA objects
which will be installed in the cluster alongside the Insights Agent.

Goldilocks also requires a `metrics-server` installation.

### kube-bench
kube-bench can run in one of two modes:
* `cronjob` (default) - this runs the report for a single node
* `daemonset` - this runs the report on all nodes

If your nodes are homogenous (i.e. you only have a single node pool), the `cronjob` mode
is sufficient. But if your nodes have different configurations, you'll likely want to run
kube-bench as a DaemonSet.

kube-bench needs access to some resources on the node in order to perform its audit, including:
* `/var/lib`
* `/etc/systemd`
* `/etc/kubernetes`
* `/usr/local/mount-from-host/bin`
* root access

### kube-hunter
kube-hunter runs in [pod mode](https://github.com/aquasecurity/kube-hunter#pod) in order to discover what
running a malicious container can discover and do on your cluster.

### Nova
Nova needs access to `Secrets` which contain metadata about installed Helm charts.

Nova will also need network access to any third-party Helm repositories from which Helm charts have
been installed (e.g. `https://kubernetes-charts.storage.googleapis.com`).

Nova will find all Helm charts installed in the cluster then cross-check those charts with the upstream
repositories to check for new versions.

### OPA
The OPA report will reach out to the Insights API to pull down any Rego policies that have been added to your
organization. It will need `view` access to the cluster in order to run those policies against existing resources.

### Pluto
Pluto needs `view` access to the cluster in order to check for deprecated API versions.

### Polaris
Polaris needs `view` access to the cluster in order to analyze workload configurations. It also needs
access to Secrets in order to examine Helm charts.

### RBAC Reporter
RBAC Reporter needs `view` access to the cluster to aggregate information about RBAC roles and bindings.

### Trivy
Trivy will download a list of known CVEs [from GitHub](https://github.com/aquasecurity/trivy-db)
then cross-check these against images in your cluster.

You may need to grant Trivy access to [private images](technical-details/reports/trivy#private-images) if your nodes
don't automatically have access to your private Docker registries.

### Workloads
The Workloads report needs `view` access to your cluster.

