---
meta:
  - name: title
    content: Supported Checks
  - name: description
    content: A list of supported checks that produce Action Items in Fairwinds Insights
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, supported checks
---

# Supported Checks
Fairwinds Insights supports multiple, out-of-the-box [Reports](https://insights.docs.fairwinds.com/reports/polaris/) that generate Action Items related to Kubernetes security, efficiency and reliability. 

The table below enumerates all Action Items currently produced by Fairwinds Insights, including their respective `ReportType` and `EventType` codes for use with the [Automation Rules.](/configure/automation/rules)

> Note: Not all available Reports, such as RBAC Reporter, generate Action Items.


| ReportType | EventType | Supported Context | Action Item title | Category | Severity Description | Severity Value |
| ---------- | --------- | ----------------- | ----------------- | -------- | -------------------- | -------------- |
| goldilocks | cpu\_limits\_empty | In-Cluster | CPU Limits Empty | Efficiency | medium | 0.5 |
| goldilocks | cpu\_limits\_too\_high | In-Cluster | CPU Limits Too High | Efficiency | low | 0.12 |
| goldilocks | cpu\_limits\_too\_low | In-Cluster | CPU Limits Too Low | Efficiency | low | 0.17 |
| goldilocks | cpu\_limits\_too\_low | In-Cluster | CPU Limits Too Low | Reliability | low | 0.17 |
| goldilocks | cpu\_requests\_empty | In-Cluster | CPU Requests Empty | Efficiency | medium | 0.5 |
| goldilocks | cpu\_requests\_too\_high | In-Cluster | CPU Requests Too High | Efficiency | low | 0.12 |
| goldilocks | cpu\_requests\_too\_low | In-Cluster | CPU Requests Too Low | Efficiency | low | 0.17 |
| goldilocks | cpu\_requests\_too\_low | In-Cluster | CPU Requests Too Low | Reliability | low | 0.17 |
| goldilocks | memory\_limits\_empty | In-Cluster | Memory Limits Empty | Efficiency | medium | 0.5 |
| goldilocks | memory\_limits\_too\_high | In-Cluster | Memory Limits Too High | Efficiency | low | 0.11 |
| goldilocks | memory\_limits\_too\_low | In-Cluster | Memory Limits Too Low | Efficiency | low | 0.11 |
| goldilocks | memory\_limits\_too\_low | In-Cluster | Memory Limits Too Low | Reliability | low | 0.11 |
| goldilocks | memory\_requests\_empty | In-Cluster | Memory Requests Empty | Efficiency | medium | 0.5 |
| goldilocks | memory\_requests\_too\_high | In-Cluster | Memory Requests Too High | Efficiency | low | 0.11 |
| goldilocks | memory\_requests\_too\_low | In-Cluster | Memory Requests Too Low | Efficiency | low | 0.11 |
| goldilocks | memory\_requests\_too\_low | In-Cluster | Memory Requests Too Low | Reliability | low | 0.11 |
| kube-bench | 2.1 | In-Cluster | Check 2.1 - Etcd Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 2.2 | In-Cluster | Check 2.2 - Etcd Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 2.4 | In-Cluster | Check 2.4 - Etcd Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 2.5 | In-Cluster | Check 2.5 - Etcd Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.1 | In-Cluster | Check 1.1.1 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.11 | In-Cluster | Check 1.1.11 - Master Node Configuration Files | Security | critical | 0.99 |
| kube-bench | 1.1.12 | In-Cluster | Check 1.1.12 - Master Node Configuration Files | Security | critical | 0.99 |
| kube-bench | 1.1.13 | In-Cluster | Check 1.1.13 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.14 | In-Cluster | Check 1.1.14 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.15 | In-Cluster | Check 1.1.15 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.16 | In-Cluster | Check 1.1.16 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.17 | In-Cluster | Check 1.1.17 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.18 | In-Cluster | Check 1.1.18 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.2 | In-Cluster | Check 1.1.2 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.3 | In-Cluster | Check 1.1.3 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.4 | In-Cluster | Check 1.1.4 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.5 | In-Cluster | Check 1.1.5 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.6 | In-Cluster | Check 1.1.6 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.7 | In-Cluster | Check 1.1.7 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.1.8 | In-Cluster | Check 1.1.8 - Master Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 1.2.14 | In-Cluster | API Server | Security | critical | 1 |
| kube-bench | 1.2.16 | In-Cluster | Check 1.2.16 - API Server | Security | medium | 0.667 |
| kube-bench | 1.2.21 | In-Cluster | Check 1.2.21 - API Server | Security | medium | 0.667 |
| kube-bench | 1.2.22 | In-Cluster | Check 1.2.22 - API Server | Security | medium | 0.667 |
| kube-bench | 1.2.23 | In-Cluster | Check 1.2.23 - API Server | Security | medium | 0.667 |
| kube-bench | 1.2.24 | In-Cluster | Check 1.2.24 - API Server | Security | medium | 0.667 |
| kube-bench | 1.2.25 | In-Cluster | Check 1.2.25 - API Server | Security | medium | 0.667 |
| kube-bench | 1.2.33 | In-Cluster | Check 1.2.33 - API Server | Security | high | 0.8 |
| kube-bench | 1.2.6 | In-Cluster | Check 1.2.6 - API Server | Security | medium | 0.667 |
| kube-bench | 1.3.1 | In-Cluster | Check 1.3.1 - Controller Manager | Security | medium | 0.667 |
| kube-bench | 1.3.2 | In-Cluster | Check 1.3.2 - Controller Manager | Security | medium | 0.667 |
| kube-bench | 1.3.6 | In-Cluster | Check 1.3.6 - Controller Manager | Security | critical | 0.9 |
| kube-bench | 1.4.1 | In-Cluster | Check 1.4.1 - Scheduler | Security | medium | 0.667 |
| kube-bench | 2.1.1 | In-Cluster | Check 2.1.1 - Kubelet | Security | medium | 0.667 |
| kube-bench | 2.1.10 | In-Cluster | Check 2.1.10 - Kubelet | Security | medium | 0.667 |
| kube-bench | 2.1.13 | In-Cluster | Check 2.1.13 - Kubelet | Security | medium | 0.667 |
| kube-bench | 2.1.14 | In-Cluster | Check 2.1.14 - Kubelet | Security | medium | 0.667 |
| kube-bench | 2.1.2 | In-Cluster | Check 2.1.2 - Kubelet | Security | medium | 0.667 |
| kube-bench | 2.1.3 | In-Cluster | Check 2.1.3 - Kubelet | Security | medium | 0.667 |
| kube-bench | 2.1.4 | In-Cluster | Check 2.1.4 - Kubelet | Security | medium | 0.667 |
| kube-bench | 2.1.6 | In-Cluster | Check 2.1.6 - Kubelet | Security | medium | 0.667 |
| kube-bench | 2.1.7 | In-Cluster | Check 2.1.7 - Kubelet | Security | medium | 0.667 |
| kube-bench | 2.1.9 | In-Cluster | Check 2.1.9 - Kubelet | Security | medium | 0.667 |
| kube-bench | 2.2.3 | In-Cluster | Check 2.2.3 - Configuration Files | Security | medium | 0.667 |
| kube-bench | 2.2.4 | In-Cluster | Check 2.2.4 - Configuration Files | Security | medium | 0.667 |
| kube-bench | 2.2.5 | In-Cluster | Check 2.2.5 - Configuration Files | Security | medium | 0.667 |
| kube-bench | 2.2.6 | In-Cluster | Check 2.2.6 - Configuration Files | Security | medium | 0.667 |
| kube-bench | 2.2.7 | In-Cluster | Check 2.2.7 - Configuration Files | Security | medium | 0.667 |
| kube-bench | 2.2.8 | In-Cluster | Check 2.2.8 - Configuration Files | Security | medium | 0.667 |
| kube-bench | 4.1.1 | In-Cluster | Check 4.1.1 - Worker Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 4.1.10 | In-Cluster | Check 4.1.10 - Worker Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 4.1.2 | In-Cluster | Check 4.1.2 - Worker Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 4.1.3 | In-Cluster | Check 4.1.3 - Worker Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 4.1.4 | In-Cluster | Check 4.1.4 - Worker Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 4.1.5 | In-Cluster | Check 4.1.5 - Worker Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 4.1.6 | In-Cluster | Check 4.1.6 - Worker Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 4.1.8 | In-Cluster | Check 4.1.8 - Worker Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 4.1.9 | In-Cluster | Check 4.1.9 - Worker Node Configuration Files | Security | medium | 0.667 |
| kube-bench | 4.2.1 | In-Cluster | Check 4.2.1 - Kubelet | Security | medium | 0.4 |
| kube-bench | 4.2.10 | In-Cluster | Check 4.2.10 - Kubelet | Security | medium | 0.667 |
| kube-bench | 4.2.12 | In-Cluster | Kubelet | Security | medium | 0.667 |
| kube-bench | 4.2.2 | In-Cluster | Check 4.2.2 - Kubelet | Security | medium | 0.4 |
| kube-bench | 4.2.3 | In-Cluster | Check 4.2.3 - Kubelet | Security | medium | 0.667 |
| kube-bench | 4.2.4 | In-Cluster | Check 4.2.4 - Kubelet | Security | medium | 0.5 |
| kube-bench | 4.2.6 | In-Cluster | Check 4.2.6 - Kubelet | Security | low | 0.2 |
| kube-hunter | access\_to\_api\_using\_service\_account\_token | In-Cluster | Access to API using service account token | Security | medium | 0.5 |
| kube-hunter | anonymous\_authentication | In-Cluster | Anonymous Authentication | Security | high | 0.75 |
| kube-hunter | arbitrary\_access\_to\_cluster\_scoped\_resources | In-Cluster | Arbitrary Access To Cluster Scoped Resources | Security | high | 0.75 |
| kube-hunter | cluster\_health\_disclosure | In-Cluster | Cluster Health Disclosure | Security | medium | 0.5 |
| kube-hunter | exposed\_kubelet\_cmdline | In-Cluster | Exposed Kubelet Cmdline | Security | medium | 0.5 |
| kube-hunter | exposed\_pods | In-Cluster | Exposed Pods | Security | medium | 0.5 |
| kube-hunter | exposed\_run\_inside\_container | In-Cluster | Exposed Run Inside Container | Security | high | 0.75 |
| kube-hunter | exposed\_running\_pods | In-Cluster | Exposed Running Pods | Security | medium | 0.5 |
| kube-hunter | exposed\_system\_logs | In-Cluster | Exposed System Logs | Security | medium | 0.5 |
| kube-hunter | k8s\_version\_disclosure | In-Cluster | K8s Version Disclosure | Security | medium | 0.5 |
| kube-hunter | KHV002 | In-Cluster | K8s Version Disclosure | Security | medium | 0.5 |
| kube-hunter | KHV005 | In-Cluster | Unauthenticated access to API | Security | low | 0.25 |
| kube-hunter | KHV007 | In-Cluster | Listing namespaces as anonymous user | Security | medium | 0.5 |
| kube-hunter | KHV024 | In-Cluster | Possible Ping Flood Attack | Security | medium | 0.5 |
| kube-hunter | KHV025 | In-Cluster | Possible Reset Flood Attack | Security | medium | 0.5 |
| kube-hunter | KHV026 | In-Cluster | Arbitrary Access To Cluster Scoped Resources | Security | high | 0.75 |
| kube-hunter | KHV036 | In-Cluster | Anonymous Authentication | Security | high | 0.75 |
| kube-hunter | KHV038 | In-Cluster | Exposed Running Pods | Security | medium | 0.5 |
| kube-hunter | KHV040 | In-Cluster | Exposed Run Inside Container | Security | high | 0.75 |
| kube-hunter | KHV043 | In-Cluster | Cluster Health Disclosure | Security | medium | 0.5 |
| kube-hunter | KHV044 | In-Cluster | Privileged Container | Security | low | 0.25 |
| kube-hunter | KHV045 | In-Cluster | Exposed System Logs | Security | medium | 0.5 |
| kube-hunter | KHV046 | In-Cluster | Exposed Kubelet Cmdline | Security | medium | 0.5 |
| kube-hunter | KHV047 | In-Cluster | Pod With Mount To /var/log | Security | high | 0.75 |
| kube-hunter | listing\_cluster\_roles\_using\_service\_account\_token | In-Cluster | Listing cluster roles using service account token | Security | medium | 0.5 |
| kube-hunter | listing\_namespaces\_using\_service\_account\_token | In-Cluster | Listing namespaces using service account token | Security | medium | 0.5 |
| kube-hunter | listing\_pods\_using\_service\_account\_token | In-Cluster | Listing pods using service account token | Security | medium | 0.5 |
| kube-hunter | listing\_roles\_using\_service\_account\_token | In-Cluster | Listing roles using service account token | Security | medium | 0.5 |
| kube-hunter | None | In-Cluster | Exposed Pods | Security | medium | 0.5 |
| kube-hunter | possible\_ping\_flood\_attack | In-Cluster | Possible Ping Flood Attack | Security | medium | 0.5 |
| kube-hunter | possible\_reset\_flood\_attack | In-Cluster | Possible Reset Flood Attack | Security | medium | 0.5 |
| kube-hunter | privileged\_container | In-Cluster | Privileged Container | Security | low | 0.25 |
| kube-hunter | unauthenticated\_access\_to\_api | In-Cluster | Unauthenticated access to API | Security | low | 0.25 |
| nova | helm\_chart\_outdated | In-Cluster | A new release for the aerospike Helm chart is available | Security | none | 0 |
| pluto | api\_version\_deprecated | CI/CD, Admission Controller, In-Cluster | An apiVersion for accounts/accounts has been deprecated | Reliability | low | 0.2 |
| pluto | api\_version\_removed | CI/CD, Admission Controller, In-Cluster | An apiVersion for airflow/airflow-redis-master has been removed | Reliability | medium | 0.5 |
| polaris | capabilities | CI/CD, Admission Controller, In-Cluster | The following security capabilities should not be added: SYS\_ADMIN | Security | high | 0.75 |
| polaris | capabilitiesAdded | CI/CD, Admission Controller, In-Cluster | The following security capabilities should not be added: AUDIT\_READ, AUDIT\_CONTROL | Security | low | 0.25 |
| polaris | capabilitiesAddedBeyond | CI/CD, Admission Controller, In-Cluster | The following security capabilities should not be added: NET\_ADMIN | Security | low | 0.25 |
| polaris | cpuLimitsMissing | CI/CD, Admission Controller, In-Cluster | CPU limits should be set | Efficiency | low | 0.25 |
| polaris | cpuLimitsMissing | CI/CD, Admission Controller, In-Cluster | CPU limits should be set | Resources | low | 0.25 |
| polaris | cpuRequestsMissing | CI/CD, Admission Controller, In-Cluster | CPU requests should be set | Efficiency | low | 0.25 |
| polaris | cpuRequestsMissing | CI/CD, Admission Controller, In-Cluster | CPU requests should be set | Resources | low | 0.25 |
| polaris | dangerousCapabilities | CI/CD, Admission Controller, In-Cluster | Container should not have dangerous capabilities | Security | high | 0.75 |
| polaris | hostIPCSet | CI/CD, Admission Controller, In-Cluster | Host IPC should not be configured | Security | high | 0.75 |
| polaris | hostNetworkSet | CI/CD, Admission Controller, In-Cluster | Host network should not be configured | Security | low | 0.25 |
| polaris | hostPIDSet | CI/CD, Admission Controller, In-Cluster | Host PID should not be configured | Security | high | 0.75 |
| polaris | hostPortSet | CI/CD, Admission Controller, In-Cluster | Host port should not be configured | Security | low | 0.25 |
| polaris | insecureCapabilities | CI/CD, Admission Controller, In-Cluster | Container should not have insecure capabilities | Security | low | 0.25 |
| polaris | livenessProbeMissing | CI/CD, Admission Controller, In-Cluster | Liveness probe should be configured | Reliability | low | 0.25 |
| polaris | memoryLimitsMissing | CI/CD, Admission Controller, In-Cluster | Memory limits should be set | Efficiency | low | 0.25 |
| polaris | memoryLimitsMissing | CI/CD, Admission Controller, In-Cluster | Memory limits should be set | Resources | low | 0.25 |
| polaris | memoryRequestsMissing | CI/CD, Admission Controller, In-Cluster | Memory requests should be set | Efficiency | low | 0.25 |
| polaris | memoryRequestsMissing | CI/CD, Admission Controller, In-Cluster | Memory requests should be set | Resources | low | 0.25 |
| polaris | notReadOnlyRootFilesystem | CI/CD, Admission Controller, In-Cluster | Filesystem should be read only | Security | low | 0.25 |
| polaris | privilegeEscalationAllowed | CI/CD, Admission Controller, In-Cluster | Privilege escalation should not be allowed | Security | high | 0.75 |
| polaris | pullPolicyNotAlways | CI/CD, Admission Controller, In-Cluster | Image pull policy should be "Always" | Reliability | low | 0.25 |
| polaris | readinessProbeMissing | CI/CD, Admission Controller, In-Cluster | Readiness probe should be configured | Reliability | low | 0.25 |
| polaris | runAsPrivileged | CI/CD, Admission Controller, In-Cluster | Should not be running as privileged | Security | high | 0.75 |
| polaris | runAsRootAllowed | CI/CD, Admission Controller, In-Cluster | Should not be allowed to run as root | Security | low | 0.25 |
| polaris | tagNotSpecified | CI/CD, Admission Controller, In-Cluster | Image tag should be specified | Reliability | high | 0.75 |
| polaris | tlsSettingsMissing | CI/CD, Admission Controller, In-Cluster | Ingress does not have TLS configured | Security | low | 0.25 |
| trivy | image\_vulnerability | CI/CD, In-Cluster | Image has vulnerabilities | Security | none | 0 |
| trivy | unscanned\_images | CI/CD, In-Cluster | Images failed to scan | Security | low | 0.2 |
| [opa](https://insights.docs.fairwinds.com/reports/opa/) | create-your-own-EventType | CI/CD, Admission Controller, In-Cluster | Use the [Policy](/configure/policy/opa-policy) feature to create your own custom Action Item | Any | Any | 0 - 1 |
