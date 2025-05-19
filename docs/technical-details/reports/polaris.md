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

## Polaris custom checks
Polaris custom checks can be used in Insights.

For more information about Polaris custom checks, check out:
[Polaris Custom Checks](https://polaris.docs.fairwinds.com/customization/custom-checks/#custom-checks)

### Using Polaris custom checks with Insights Admission:
You can use polaris custom checks with Insights Admission for either Admission and Mutations.
For accomplishing that add the custom check to your values.yaml, following the example below:

```yaml
insights-admission:
  enabled: true
  webhookConfig:
    mutating:
      enable: true
  polaris:
    config:
      mutations:
        - addMissingLabel  
      checks:
        addMissingLabel: warning
      customChecks:
        addMissingLabels:
          successMessage: labels are correct
          failureMessage: missing labels
          category: Efficiency
          target: app/Deployment
          schema:
            '$schema': http://json-schema.org/draft-07/schema
            type: object
            properties:
              metadata:
                type: object
                required:
                  - labels
                  - annotations
                properties:
                  labels:
                    type: object
                    required:
                      - my-required-label
                    properties:
                      tmy-required-label:
                        type: string
          mutations:
            - op: add
              path: "/spec/template/metadata/labels/test3"
              value: "my-value"
```              