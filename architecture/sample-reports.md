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
            "deploymentName": "fwinsights",
            "namespace": "fwinsights"
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

