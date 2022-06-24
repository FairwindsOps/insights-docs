---
meta:
  - name: title
    content: Kube-bench and Fairwinds Insights
  - name: description
    content: Kube-bench checks Kubernetes clusters against the CIS Kubernetes Benchmark
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, open source, Kube-hunter, CIS Benchmark
---
# Kube-bench

[Kube-bench](https://github.com/aquasecurity/kube-bench/) checks your Kubernetes cluster against the
[CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes/) which
is aimed at keeping clusters secure.

Kube-bench can run in two different modes:
* `cronjob` - will run kube-bench on a single node
* `daemonset` - will run kube-bench on all nodes

If you're confident that your nodes are all using the same configuration, `cronjob` mode should
suffice. But if you want to be certain, `daemonset` mode will check every node in your cluster
against the CIS benchmark.

## Sample Report 
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