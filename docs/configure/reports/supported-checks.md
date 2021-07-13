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
Fairwinds Insights supports multiple, out-of-the-box [Reports](https://insights.docs.fairwinds.com/reports/polaris/) that generate Action Items related to Kubernetes security, efficiency, and reliability. 

The table below enumerates all Action Items currently produced by Fairwinds Insights, including their respective `ReportType` and `EventType` codes for use with the [Automation Rules](https://insights.docs.fairwinds.com/features/rules/) feature.

> Note: Not all available Reports, such as RBAC Reporter, generate Action Items.


|ReportType |EventType                                        |Action Item title                                                                            |Category   |Severity Description|Severity Value|
|-----------|-------------------------------------------------|---------------------------------------------------------------------------------------------|-----------|--------------------|--------------|
|goldilocks |cpu_limits_empty                                 |CPU Limits Empty                                                                             |Efficiency |warning             |0.5           |
|goldilocks |cpu_limits_too_high                              |CPU Limits Too High                                                                          |Efficiency |warning             |0.12          |
|goldilocks |cpu_limits_too_low                               |CPU Limits Too Low                                                                           |Efficiency |warning             |0.17          |
|goldilocks |cpu_limits_too_low                               |CPU Limits Too Low                                                                           |Reliability|warning             |0.17          |
|goldilocks |cpu_requests_empty                               |CPU Requests Empty                                                                           |Efficiency |warning             |0.5           |
|goldilocks |cpu_requests_too_high                            |CPU Requests Too High                                                                        |Efficiency |warning             |0.12          |
|goldilocks |cpu_requests_too_low                             |CPU Requests Too Low                                                                         |Efficiency |warning             |0.17          |
|goldilocks |cpu_requests_too_low                             |CPU Requests Too Low                                                                         |Reliability|warning             |0.17          |
|goldilocks |memory_limits_empty                              |Memory Limits Empty                                                                          |Efficiency |warning             |0.5           |
|goldilocks |memory_limits_too_high                           |Memory Limits Too High                                                                       |Efficiency |warning             |0.11          |
|goldilocks |memory_limits_too_low                            |Memory Limits Too Low                                                                        |Efficiency |warning             |0.11          |
|goldilocks |memory_limits_too_low                            |Memory Limits Too Low                                                                        |Reliability|warning             |0.11          |
|goldilocks |memory_requests_empty                            |Memory Requests Empty                                                                        |Efficiency |warning             |0.5           |
|goldilocks |memory_requests_too_high                         |Memory Requests Too High                                                                     |Efficiency |warning             |0.11          |
|goldilocks |memory_requests_too_low                          |Memory Requests Too Low                                                                      |Efficiency |warning             |0.11          |
|goldilocks |memory_requests_too_low                          |Memory Requests Too Low                                                                      |Reliability|warning             |0.11          |
|kube-bench |2.1                                              |Check 2.1 - Etcd Node Configuration Files                                                    |Security   |danger              |0.667         |
|kube-bench |2.2                                              |Check 2.2 - Etcd Node Configuration Files                                                    |Security   |danger              |0.667         |
|kube-bench |2.4                                              |Check 2.4 - Etcd Node Configuration Files                                                    |Security   |danger              |0.667         |
|kube-bench |2.5                                              |Check 2.5 - Etcd Node Configuration Files                                                    |Security   |danger              |0.667         |
|kube-bench |1.1.1                                            |Check 1.1.1 - Master Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |1.1.11                                           |Check 1.1.11 - Master Node Configuration Files                                               |Security   |danger              |0.99          |
|kube-bench |1.1.12                                           |Check 1.1.12 - Master Node Configuration Files                                               |Security   |danger              |0.99          |
|kube-bench |1.1.13                                           |Check 1.1.13 - Master Node Configuration Files                                               |Security   |danger              |0.667         |
|kube-bench |1.1.14                                           |Check 1.1.14 - Master Node Configuration Files                                               |Security   |danger              |0.667         |
|kube-bench |1.1.15                                           |Check 1.1.15 - Master Node Configuration Files                                               |Security   |danger              |0.667         |
|kube-bench |1.1.16                                           |Check 1.1.16 - Master Node Configuration Files                                               |Security   |danger              |0.667         |
|kube-bench |1.1.17                                           |Check 1.1.17 - Master Node Configuration Files                                               |Security   |danger              |0.667         |
|kube-bench |1.1.18                                           |Check 1.1.18 - Master Node Configuration Files                                               |Security   |danger              |0.667         |
|kube-bench |1.1.2                                            |Check 1.1.2 - Master Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |1.1.3                                            |Check 1.1.3 - Master Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |1.1.4                                            |Check 1.1.4 - Master Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |1.1.5                                            |Check 1.1.5 - Master Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |1.1.6                                            |Check 1.1.6 - Master Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |1.1.7                                            |Check 1.1.7 - Master Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |1.1.8                                            |Check 1.1.8 - Master Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |1.2.14                                           |API Server                                                                                   |Security   |danger              |1             |
|kube-bench |1.2.16                                           |Check 1.2.16 - API Server                                                                    |Security   |danger              |0.667         |
|kube-bench |1.2.21                                           |Check 1.2.21 - API Server                                                                    |Security   |danger              |0.667         |
|kube-bench |1.2.22                                           |Check 1.2.22 - API Server                                                                    |Security   |danger              |0.667         |
|kube-bench |1.2.23                                           |Check 1.2.23 - API Server                                                                    |Security   |danger              |0.667         |
|kube-bench |1.2.24                                           |Check 1.2.24 - API Server                                                                    |Security   |danger              |0.667         |
|kube-bench |1.2.25                                           |Check 1.2.25 - API Server                                                                    |Security   |danger              |0.667         |
|kube-bench |1.2.33                                           |Check 1.2.33 - API Server                                                                    |Security   |danger              |0.8           |
|kube-bench |1.2.6                                            |Check 1.2.6 - API Server                                                                     |Security   |danger              |0.667         |
|kube-bench |1.3.1                                            |Check 1.3.1 - Controller Manager                                                             |Security   |danger              |0.667         |
|kube-bench |1.3.2                                            |Check 1.3.2 - Controller Manager                                                             |Security   |danger              |0.667         |
|kube-bench |1.3.6                                            |Check 1.3.6 - Controller Manager                                                             |Security   |danger              |0.9           |
|kube-bench |1.4.1                                            |Check 1.4.1 - Scheduler                                                                      |Security   |danger              |0.667         |
|kube-bench |2.1.1                                            |Check 2.1.1 - Kubelet                                                                        |Security   |danger              |0.667         |
|kube-bench |2.1.10                                           |Check 2.1.10 - Kubelet                                                                       |Security   |danger              |0.667         |
|kube-bench |2.1.13                                           |Check 2.1.13 - Kubelet                                                                       |Security   |danger              |0.667         |
|kube-bench |2.1.14                                           |Check 2.1.14 - Kubelet                                                                       |Security   |danger              |0.667         |
|kube-bench |2.1.2                                            |Check 2.1.2 - Kubelet                                                                        |Security   |danger              |0.667         |
|kube-bench |2.1.3                                            |Check 2.1.3 - Kubelet                                                                        |Security   |danger              |0.667         |
|kube-bench |2.1.4                                            |Check 2.1.4 - Kubelet                                                                        |Security   |danger              |0.667         |
|kube-bench |2.1.6                                            |Check 2.1.6 - Kubelet                                                                        |Security   |danger              |0.667         |
|kube-bench |2.1.7                                            |Check 2.1.7 - Kubelet                                                                        |Security   |danger              |0.667         |
|kube-bench |2.1.9                                            |Check 2.1.9 - Kubelet                                                                        |Security   |danger              |0.667         |
|kube-bench |2.2.3                                            |Check 2.2.3 - Configuration Files                                                            |Security   |danger              |0.667         |
|kube-bench |2.2.4                                            |Check 2.2.4 - Configuration Files                                                            |Security   |danger              |0.667         |
|kube-bench |2.2.5                                            |Check 2.2.5 - Configuration Files                                                            |Security   |danger              |0.667         |
|kube-bench |2.2.6                                            |Check 2.2.6 - Configuration Files                                                            |Security   |danger              |0.667         |
|kube-bench |2.2.7                                            |Check 2.2.7 - Configuration Files                                                            |Security   |danger              |0.667         |
|kube-bench |2.2.8                                            |Check 2.2.8 - Configuration Files                                                            |Security   |danger              |0.667         |
|kube-bench |4.1.1                                            |Check 4.1.1 - Worker Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |4.1.10                                           |Check 4.1.10 - Worker Node Configuration Files                                               |Security   |danger              |0.667         |
|kube-bench |4.1.2                                            |Check 4.1.2 - Worker Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |4.1.3                                            |Check 4.1.3 - Worker Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |4.1.4                                            |Check 4.1.4 - Worker Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |4.1.5                                            |Check 4.1.5 - Worker Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |4.1.6                                            |Check 4.1.6 - Worker Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |4.1.8                                            |Check 4.1.8 - Worker Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |4.1.9                                            |Check 4.1.9 - Worker Node Configuration Files                                                |Security   |danger              |0.667         |
|kube-bench |4.2.1                                            |Check 4.2.1 - Kubelet                                                                        |Security   |warning             |0.4           |
|kube-bench |4.2.10                                           |Check 4.2.10 - Kubelet                                                                       |Security   |danger              |0.667         |
|kube-bench |4.2.12                                           |Kubelet                                                                                      |Security   |danger              |0.667         |
|kube-bench |4.2.2                                            |Check 4.2.2 - Kubelet                                                                        |Security   |warning             |0.4           |
|kube-bench |4.2.3                                            |Check 4.2.3 - Kubelet                                                                        |Security   |danger              |0.667         |
|kube-bench |4.2.4                                            |Check 4.2.4 - Kubelet                                                                        |Security   |warning             |0.5           |
|kube-bench |4.2.6                                            |Check 4.2.6 - Kubelet                                                                        |Security   |warning             |0.2           |
|kube-hunter|access_to_api_using_service_account_token        |Access to API using service account token                                                    |Security   |warning             |0.5           |
|kube-hunter|anonymous_authentication                         |Anonymous Authentication                                                                     |Security   |danger              |0.75          |
|kube-hunter|arbitrary_access_to_cluster_scoped_resources     |Arbitrary Access To Cluster Scoped Resources                                                 |Security   |danger              |0.75          |
|kube-hunter|cluster_health_disclosure                        |Cluster Health Disclosure                                                                    |Security   |warning             |0.5           |
|kube-hunter|exposed_kubelet_cmdline                          |Exposed Kubelet Cmdline                                                                      |Security   |warning             |0.5           |
|kube-hunter|exposed_pods                                     |Exposed Pods                                                                                 |Security   |warning             |0.5           |
|kube-hunter|exposed_run_inside_container                     |Exposed Run Inside Container                                                                 |Security   |danger              |0.75          |
|kube-hunter|exposed_running_pods                             |Exposed Running Pods                                                                         |Security   |warning             |0.5           |
|kube-hunter|exposed_system_logs                              |Exposed System Logs                                                                          |Security   |warning             |0.5           |
|kube-hunter|k8s_version_disclosure                           |K8s Version Disclosure                                                                       |Security   |warning             |0.5           |
|kube-hunter|KHV002                                           |K8s Version Disclosure                                                                       |Security   |warning             |0.5           |
|kube-hunter|KHV005                                           |Unauthenticated access to API                                                                |Security   |warning             |0.25          |
|kube-hunter|KHV007                                           |Listing namespaces as anonymous user                                                         |Security   |warning             |0.5           |
|kube-hunter|KHV024                                           |Possible Ping Flood Attack                                                                   |Security   |warning             |0.5           |
|kube-hunter|KHV025                                           |Possible Reset Flood Attack                                                                  |Security   |warning             |0.5           |
|kube-hunter|KHV026                                           |Arbitrary Access To Cluster Scoped Resources                                                 |Security   |danger              |0.75          |
|kube-hunter|KHV036                                           |Anonymous Authentication                                                                     |Security   |danger              |0.75          |
|kube-hunter|KHV038                                           |Exposed Running Pods                                                                         |Security   |warning             |0.5           |
|kube-hunter|KHV040                                           |Exposed Run Inside Container                                                                 |Security   |danger              |0.75          |
|kube-hunter|KHV043                                           |Cluster Health Disclosure                                                                    |Security   |warning             |0.5           |
|kube-hunter|KHV044                                           |Privileged Container                                                                         |Security   |warning             |0.25          |
|kube-hunter|KHV045                                           |Exposed System Logs                                                                          |Security   |warning             |0.5           |
|kube-hunter|KHV046                                           |Exposed Kubelet Cmdline                                                                      |Security   |warning             |0.5           |
|kube-hunter|KHV047                                           |Pod With Mount To /var/log                                                                   |Security   |danger              |0.75          |
|kube-hunter|listing_cluster_roles_using_service_account_token|Listing cluster roles using service account token                                            |Security   |warning             |0.5           |
|kube-hunter|listing_namespaces_using_service_account_token   |Listing namespaces using service account token                                               |Security   |warning             |0.5           |
|kube-hunter|listing_pods_using_service_account_token         |Listing pods using service account token                                                     |Security   |warning             |0.5           |
|kube-hunter|listing_roles_using_service_account_token        |Listing roles using service account token                                                    |Security   |warning             |0.5           |
|kube-hunter|None                                             |Exposed Pods                                                                                 |Security   |warning             |0.5           |
|kube-hunter|possible_ping_flood_attack                       |Possible Ping Flood Attack                                                                   |Security   |warning             |0.5           |
|kube-hunter|possible_reset_flood_attack                      |Possible Reset Flood Attack                                                                  |Security   |warning             |0.5           |
|kube-hunter|privileged_container                             |Privileged Container                                                                         |Security   |warning             |0.25          |
|kube-hunter|unauthenticated_access_to_api                    |Unauthenticated access to API                                                                |Security   |warning             |0.25          |
|kubesec    |containers_information_leaks                     |Other containers information leaks                                                           |Security   |danger              |0.7           |
|kubesec    |large_container_attack_surface                   |Large container attack surface                                                               |Security   |warning             |0.1           |
|kubesec    |large_syscall_attack_surface                     |Drop all capabilities and add only those required to reduce syscall attack surface           |Security   |warning             |0.1           |
|kubesec    |missing_servicea_account_name                    |Service accounts restrict Kubernetes API access and should be configured with least privilege|Security   |warning             |0.3           |
|kubesec    |remove_hosts_aliases                             |DNS should be managed by the orchestrator                                                    |Security   |warning             |0.6           |
|kubesec    |run_as_high_uid_user                             |Run as a high-UID user to avoid conflicts with the host user table                           |Security   |warning             |0.1           |
|nova       |helm_chart_outdated                              |A new release for the aerospike Helm chart is available                                      |Security   |warning             |0             |
|pluto      |api_version_deprecated                           |An apiVersion for accounts/accounts has been deprecated                                      |Reliability|warning             |0.2           |
|pluto      |api_version_removed                              |An apiVersion for airflow/airflow-redis-master has been removed                              |Reliability|warning             |0.5           |
|polaris    |capabilities                                     |The following security capabilities should not be added: SYS_ADMIN                           |Security   |danger              |0.75          |
|polaris    |capabilitiesAdded                                |The following security capabilities should not be added: AUDIT_READ, AUDIT_CONTROL           |Security   |warning             |0.25          |
|polaris    |capabilitiesAddedBeyond                          |The following security capabilities should not be added: NET_ADMIN                           |Security   |warning             |0.25          |
|polaris    |cpuLimitsMissing                                 |CPU limits should be set                                                                     |Efficiency |warning             |0.25          |
|polaris    |cpuLimitsMissing                                 |CPU limits should be set                                                                     |Resources  |warning             |0.25          |
|polaris    |cpuRequestsMissing                               |CPU requests should be set                                                                   |Efficiency |warning             |0.25          |
|polaris    |cpuRequestsMissing                               |CPU requests should be set                                                                   |Resources  |warning             |0.25          |
|polaris    |dangerousCapabilities                            |Container should not have dangerous capabilities                                             |Security   |danger              |0.75          |
|polaris    |hostIPCSet                                       |Host IPC should not be configured                                                            |Security   |danger              |0.75          |
|polaris    |hostNetworkSet                                   |Host network should not be configured                                                        |Security   |warning             |0.25          |
|polaris    |hostPIDSet                                       |Host PID should not be configured                                                            |Security   |danger              |0.75          |
|polaris    |hostPortSet                                      |Host port should not be configured                                                           |Security   |warning             |0.25          |
|polaris    |insecureCapabilities                             |Container should not have insecure capabilities                                              |Security   |warning             |0.25          |
|polaris    |livenessProbeMissing                             |Liveness probe should be configured                                                          |Reliability|warning             |0.25          |
|polaris    |memoryLimitsMissing                              |Memory limits should be set                                                                  |Efficiency |warning             |0.25          |
|polaris    |memoryLimitsMissing                              |Memory limits should be set                                                                  |Resources  |warning             |0.25          |
|polaris    |memoryRequestsMissing                            |Memory requests should be set                                                                |Efficiency |warning             |0.25          |
|polaris    |memoryRequestsMissing                            |Memory requests should be set                                                                |Resources  |warning             |0.25          |
|polaris    |notReadOnlyRootFilesystem                        |Filesystem should be read only                                                               |Security   |warning             |0.25          |
|polaris    |privilegeEscalationAllowed                       |Privilege escalation should not be allowed                                                   |Security   |danger              |0.75          |
|polaris    |pullPolicyNotAlways                              |Image pull policy should be "Always"                                                         |Reliability|warning             |0.25          |
|polaris    |readinessProbeMissing                            |Readiness probe should be configured                                                         |Reliability|warning             |0.25          |
|polaris    |runAsPrivileged                                  |Should not be running as privileged                                                          |Security   |danger              |0.75          |
|polaris    |runAsRootAllowed                                 |Should not be allowed to run as root                                                         |Security   |warning             |0.25          |
|polaris    |tagNotSpecified                                  |Image tag should be specified                                                                |Reliability|danger              |0.75          |
|polaris    |tlsSettingsMissing                               |Ingress does not have TLS configured                                                         |Security   |warning             |0.25          |
|trivy      |image_vulnerability                              |Image has vulnerabilities                                                                    |Security   |warning             |0             |
|trivy      |unscanned_images                                 |Images failed to scan                                                                        |Security   |warning             |0.2           |
|[opa](https://insights.docs.fairwinds.com/reports/opa/)|create-your-own-EventType|Use the [Policy](/configure/policy/policy/) feature to create your own custom Action Item |Any|Any|0 - 1|
