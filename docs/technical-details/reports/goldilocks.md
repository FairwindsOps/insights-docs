---
meta:
  - name: title
    content: Goldilocks and Fairwinds Insights
  - name: description
    content: Goldilocks, by Fairwinds, makes recommendations for Kubernetes resource requests and limits based on actual usage. Fairwinds Insights integrates Goldilocks
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, Goldilocks, open source
---

# Goldilocks
[Goldilocks](https://github.com/FairwindsOps/goldilocks/) watches your Kubernetes
deployments and makes recommendations for resource requests and limits
based on actual usage.

Goldilocks utilizes the
[vertical-pod-autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)
in recommendation mode to extract suggested CPU and Memory limits/requests.

## Requirements
Make sure you have
[metrics-server](https://github.com/kubernetes-sigs/metrics-server)
installed in your cluster.

You'll also need
[vertical-pod-autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler).
Goldilocks will install this for you by default, but if you're managing
your own VPA installation, you can `--set goldilocks.installVPA=false`.

## Remediation

Goldilocks Action Items will suggest particular amounts for CPU and Memory limits/requests.
You can copy/paste these recommendations into your workload configuration.

If Goldilocks is making recommendations for a third-party application, you can likely set
its requests/limits using its helm chart, or by editing its installation YAML by hand.

## Sample Report 

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