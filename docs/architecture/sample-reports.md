# Sample Reports
Below is sample data for each report type. This should help give a sense for
what sort of data is being reported back to Fairwinds Insights.

## Goldilocks
Goldilocks reports contain information about resource usage for each Deployment.
```json
{
    "deployments": [
        {
            "containers": [
                {
                    "containerName": "fairwinds-insights",
                    "limits": {
                        "cpu": "500m",
                        "memory": "1Gi"
                    },
                    "lowerBound": {
                        "cpu": "25m",
                        "memory": "262144k"
                    },
                    "requests": {
                        "cpu": "500m",
                        "memory": "1Gi"
                    },
                    "target": {
                        "cpu": "1000m",
                        "memory": "3Gi"
                    },
                    "uncappedTarget": {
                        "cpu": "2000m",
                        "memory": "3Gi"
                    },
                    "upperBound": {
                        "cpu": "2000m",
                        "memory": "3Gi"
                    }
                }
            ],
            "deploymentName": "my-app",
            "namespace": "my-app"
        }
    ]
}
```

## kube-bench
kube-bench reports contain a list of Nodes, plus the results of checks that have been run on those Nodes.
```json
{
    "5": {
        "id": "5",
        "node_type": "policies",
        "tests": [
            {
                "desc": "RBAC and Service Accounts",
                "fail": 0,
                "info": 0,
                "pass": 0,
                "results": [
                    {
                        "AuditConfig": "",
                        "actual_value": "",
                        "audit": "",
                        "expected_result": "",
                        "remediation": "Identify all clusterrolebindings to the cluster-admin role. Check if they are used and\nif they need this role or if they could use a role with fewer privileges.\nWhere possible, first bind users to a lower privileged role and then remove the\nclusterrolebinding to the cluster-admin role :\nkubectl delete clusterrolebinding [name]\n",
                        "scored": false,
                        "status": "WARN",
                        "test_desc": "Ensure that the cluster-admin role is only used where required (Not Scored)",
                        "test_info": [
                            "Identify all clusterrolebindings to the cluster-admin role. Check if they are used and\nif they need this role or if they could use a role with fewer privileges.\nWhere possible, first bind users to a lower privileged role and then remove the\nclusterrolebinding to the cluster-admin role :\nkubectl delete clusterrolebinding [name]\n"
                        ],
                        "test_number": "5.1.1",
                        "type": "manual"
                    }
                ]
            }
        ]
    }
}
```

## kube-hunter
kube-hunter reports contain a list of Nodes, Services, and detected vulnerabilities.

```json
{
    "_fairwindsReportVersion": "501",
    "hunter_statistics": [
        {
            "description": "Checks if Node is running a Kubernetes version vulnerable to known CVEs",
            "name": "K8s CVE Hunter",
            "vulnerabilities": 0
        }
    ],
    "nodes": [
        {
            "location": "10.244.0.1",
            "type": "Node/Master"
        }
    ],
    "services": [
        {
            "description": "The Kubelet is the main component in every Node, all pod operations goes through the kubelet",
            "location": "10.244.0.1:10250",
            "service": "Kubelet API"
        }
    ]
}
```

## kubesec
kubesec reports contain a list of Namespaces, Deployments, StatefulSets, and DaemonSets,
as well as any potential configuration issues discovered.
```json
{
    "namespaces": {
        "my-app": {
            "daemonsets": [],
            "statefulsets": [],
            "deployments": [
                {
                    "name": "my-app",
                    "namespace": "my-app",
                    "results": [
                        {
                            "message": "Passed with a score of 4 points",
                            "object": "Deployment/my-app.my-app",
                            "score": 4,
                            "scoring": {
                                "advise": [
                                    {
                                        "points": 3,
                                        "reason": "Well defined AppArmor policies may provide greater protection from unknown threats. WARNING: NOT PRODUCTION READY",
                                        "selector": ".metadata .annotations .\"container.apparmor.security.beta.kubernetes.io/nginx\""
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
}
```

## Nova
Nova reports contain a list of Helm releases in the cluster, as well as the installed version.
```json
{
    "helm_releases": [
        {
            "namespace": "nginx-ingress",
            "newest": "",
            "outdated": false,
            "release": "nginx-ingress",
            "version": "0.2.0"
        }
    ]
}
```

## OPA
OPA reports contain a list of Action Items generated by your OPA policies
```json
{
    "ActionItems": [
        {
            "Category": "Reliability",
            "Description": "String: No horizontal pod autoscaler found",
            "Remediation": "Create an HPA",
            "ResourceKind": "Deployment",
            "ResourceName": "local-path-provisioner",
            "ResourceNamespace": "local-path-storage",
            "Severity": 0,
            "EventType": "hpa-required",
            "Title": "HPA is required"
        }
    ]
}
```

## Pluto
Pluto reports contain a list of resources that have deprecated API versions
```json
{
    "items": [
        {
            "name": "cert-manager/cert-manager-webhook",
            "api": {
                "version": "admissionregistration.k8s.io/v1beta1",
                "kind": "MutatingWebhookConfiguration",
                "deprecated-in": "v1.16.0",
                "removed-in": "v1.19.0",
                "replacement-api": "admissionregistration.k8s.io/v1"
            },
            "deprecated": true,
            "removed": false
        }
    ]
}
```

## Polaris
Polaris reports contain a list of workloads as well as any potential configuration issues in those workloads.
The report also contains some metadata about the cluster.
```json
{
    "AuditTime": "2020-07-15T15:20:38Z",
    "SourceName": "",
    "SourceType": "Cluster",
    "ClusterInfo": {
        "Controllers": 8,
        "Namespaces": 6,
        "Nodes": 1,
        "Pods": 8,
        "Version": "1.17"
    },
    "DisplayName": "k8test",
    "PolarisOutputVersion": "1.0",
    "Results": [
        {
            "CreatedTime": "0001-01-01T00:00:00Z",
            "Kind": "Deployment",
            "Name": "coredns",
            "Namespace": "kube-system",
            "PodResult": {
                "ContainerResults": [
                    {
                        "Name": "coredns",
                        "Results": {
                            "cpuLimitsMissing": {
                                "Category": "Resources",
                                "ID": "cpuLimitsMissing",
                                "Message": "CPU limits should be set",
                                "Severity": "warning",
                                "Success": false
                            }
                        }
                    }
                ]
            }
        }
    ]
}
```

## Prometheus Collector
Prometheus Collector contains CPU and Memory usage for different workloads
```json
{
    "Values": [
        {
            "Container": "autoscaler",
            "ControllerKind": "Deployment",
            "ControllerName": "kube-dns-autoscaler",
            "ControllerNamespace": "kube-system",
            "LimitValue": 0,
            "Metric": "Memory",
            "PodName": "kube-dns-autoscaler-b48d96894-mjtkt",
            "Request": 10485760,
            "StartTime": "2021-02-01T13:20:00Z",
            "Value": 8777728
        },
        {
            "Container": "autoscaler",
            "ControllerKind": "Deployment",
            "ControllerName": "kube-dns-autoscaler",
            "ControllerNamespace": "kube-system",
            "LimitValue": 0,
            "Metric": "CPU",
            "PodName": "kube-dns-autoscaler-b48d96894-mjtkt",
            "Request": 20,
            "StartTime": "2021-02-01T13:21:00Z",
            "Value": 0
        }
    ]
}
```


## RBAC Reporter
RBAC Reporter reports contain a list of Roles, ClusterRoles, RoleBindings, and ClusterRoleBindings.
```json
{
    "cluster_role_bindings": [
        {
            "metadata": {
                "annotations": {
                    "rbac.authorization.kubernetes.io/autoupdate": "true"
                },
                "creationTimestamp": "2020-01-30T10:36:18Z",
                "labels": {
                    "kubernetes.io/bootstrapping": "rbac-defaults"
                },
                "name": "cluster-admin",
                "resourceVersion": "96",
                "selfLink": "/apis/rbac.authorization.k8s.io/v1/clusterrolebindings/cluster-admin",
                "uid": "297abf64-0f2f-4263-b15d-7fb74f75f154"
            },
            "roleRef": {
                "apiGroup": "rbac.authorization.k8s.io",
                "kind": "ClusterRole",
                "name": "cluster-admin"
            },
            "subjects": [
                {
                    "apiGroup": "rbac.authorization.k8s.io",
                    "kind": "Group",
                    "name": "system:masters"
                }
            ]
        }
    ],
    "cluster_roles": [
        {
            "metadata": {
                "annotations": {
                    "rbac.authorization.kubernetes.io/autoupdate": "true"
                },
                "creationTimestamp": "2020-01-30T10:36:18Z",
                "labels": {
                    "kubernetes.io/bootstrapping": "rbac-defaults"
                },
                "name": "cluster-admin",
                "resourceVersion": "45",
                "selfLink": "/apis/rbac.authorization.k8s.io/v1/clusterroles/cluster-admin",
                "uid": "ad307e81-e1f3-4d57-a2f3-19dbfe196c9d"
            },
            "rules": [
                {
                    "apiGroups": [
                        "*"
                    ],
                    "resources": [
                        "*"
                    ],
                    "verbs": [
                        "*"
                    ]
                },
                {
                    "nonResourceURLs": [
                        "*"
                    ],
                    "verbs": [
                        "*"
                    ]
                }
            ]
        }
    ]
}
```

## Trivy
Trivy reports contain a list of images running in the cluster, as well as any CVEs in those images
```json
{
    "Images": [
        {
            "ID": "docker.io/bitnami/postgresql@sha256:8008fdf764dc072a04fabf71812c8bbb39d2611f54310fbc325405d85437baf1",
            "Name": "docker.io/bitnami/postgresql:11.6.0-debian-9-r48",
            "Namespace": "my-app",
            "OwnerKind": "StatefulSet",
            "OwnerName": "my-app-postgresql/my-app-postgresql",
            "Report": [
                {
                    "Target": "docker_io_bitnami_postgresql_sha256_8008fdf764dc072a04fabf71812c8bbb39d2611f54310fbc325405d85437baf1 (debian 9.11)",
                    "Vulnerabilities": [
                        {
                            "InstalledVersion": "1.4.9",
                            "PkgName": "apt",
                            "VulnerabilityID": "CVE-2011-3374"
                        }
                    ]
                }
            ]
        }
    ],
    "Vulnerabilities": {
        "CVE-2011-3374": {
            "Description": "It was found that apt-key in apt, all versions, do not correctly validate gpg keys with the master keyring, leading to a potential man-in-the-middle attack.",
            "References": [
                "https://access.redhat.com/security/cve/cve-2011-3374",
                "https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=642480",
                "https://people.canonical.com/~ubuntu-security/cve/2011/CVE-2011-3374.html",
                "https://security-tracker.debian.org/tracker/CVE-2011-3374",
                "https://snyk.io/vuln/SNYK-LINUX-APT-116518"
            ],
            "Severity": "MEDIUM",
            "Title": "",
            "VulnerabilityID": "CVE-2011-3374"
        }
    }
}
```

## Workloads
Workloads reports contain a list of workloads, Namespaces, and Nodes in the cluster
```json
{
    "CreationTime": "2020-02-11T19:08:07.287236228Z",
    "ServerVersion": "1.16",
    "SourceName": "https://10.96.0.1:443",
    "SourceType": "Cluster",
    "Controllers": [
        {
            "Containers": [
                {
                    "CreationTime": "0001-01-01T00:00:00Z",
                    "Image": "k8s.gcr.io/coredns:1.6.2",
                    "ImageID": "",
                    "Name": "coredns",
                    "Resource": {
                        "Limits": {
                            "CPU": "0",
                            "Memory": "170Mi"
                        },
                        "Requests": {
                            "CPU": "100m",
                            "Memory": "70Mi"
                        }
                    }
                }
            ],
            "Kind": "Deployment",
            "Name": "coredns",
            "Namespace": "kube-system",
            "ParentUID": "",
            "UID": "081e8080-4649-420b-87da-ff48401842a7"
        }
    ],
    "Namespaces": [
        {
            "metadata": {
                "creationTimestamp": "2020-02-11T17:55:14Z",
                "name": "default",
                "resourceVersion": "146",
                "selfLink": "/api/v1/namespaces/default",
                "uid": "604f448f-6613-40b0-a01c-10702f2d742e"
            },
            "spec": {
                "finalizers": [
                    "kubernetes"
                ]
            },
            "status": {
                "phase": "Active"
            }
        }
    ],
    "Nodes": [
        {
            "Allocatable": {
                "cpu": "2",
                "ephemeral-storage": "61255492Ki",
                "hugepages-1Gi": "0",
                "hugepages-2Mi": "0",
                "memory": "2037620Ki",
                "pods": "110"
            },
            "AllocatedLimits": {
                "cpu": "1250m",
                "memory": "2471Mi",
                "pods": "13"
            },
            "AllocatedRequests": {
                "cpu": "1665m",
                "memory": "1988Mi",
                "pods": "13"
            },
            "Annotations": {
                "kubeadm.alpha.kubernetes.io/cri-socket": "/run/containerd/containerd.sock",
                "node.alpha.kubernetes.io/ttl": "0",
                "volumes.kubernetes.io/controller-managed-attach-detach": "true"
            },
            "Capacity": {
                "cpu": "2",
                "ephemeral-storage": "61255492Ki",
                "hugepages-1Gi": "0",
                "hugepages-2Mi": "0",
                "memory": "2037620Ki",
                "pods": "110"
            },
            "CreationTimestamp": "2020-02-11T17:55:12Z",
            "KubeProxyVersion": "v1.16.3",
            "KubeletVersion": "v1.16.3",
            "Labels": {
                "beta.kubernetes.io/arch": "amd64",
                "beta.kubernetes.io/os": "linux",
                "kubernetes.io/arch": "amd64",
                "kubernetes.io/hostname": "kind-control-plane",
                "kubernetes.io/os": "linux",
                "node-role.kubernetes.io/master": ""
            },
            "Name": "kind-control-plane",
            "Utilization": {
                "cpuLimitsFraction": 0.625,
                "cpuRequestsFraction": 0.8325,
                "memoryLimitsFraction": 1.2417938575396787,
                "memoryRequestsFraction": 0.9990636134313562
            }
        }
    ]
}
```
