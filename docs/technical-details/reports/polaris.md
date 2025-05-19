---
meta:
  - name: title
    content: Polaris Integration with Fairwinds Insights
  - name: description
    content: Polaris, by Fairwinds, is an open source tool for checking workload configurations against a set of best-practices. Fairwinds Insights integrates Polaris.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, Polaris, open source
---
# Polaris
[Polaris](https://github.com/FairwindsOps/polaris) is an open source tool for
checking workload configurations against a set of best-practices. It can
be configured and fine tuned for each organization that uses it and custom
checks can be written using JSON Schema.

Polaris validation checks fall into several different categories:

* Health Checks
* Images
* Networking
* Resources
* Security

## Remediation
Remediating Polaris issues involves editing the Helm chart or YAML for your workloads. This is probably
stored in an infrastructure-as-code repository. Once you've made the necessary changes, you'll need
to redeploy.

## Sample Report 
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
