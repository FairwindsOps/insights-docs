---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation. The Prometheus Collector report provides fine-grained resource usage data. "
---
# Prometheus Collector

The Prometheus Collector report gathers workload metrics from a Prometheus installation
in order to provide fine-grained resource usage data. This can be used to gauge how much
different workloads cost, understand cost trends, and help set resource requests and limits.

> Note: Prometheus Collector requires **`kube-state-metrics`** to be installed and running in the cluster.

## Use an existing Prometheus installation
To use an existing Prometheus installation the prometheus service endpoint that exists within the cluster, set the address in your values.yaml:

```yaml
prometheus-metrics:
  address: "http://<prometheus-service-name>.<namespace>.svc.cluster.local:<port>"
```

## Install a new Prometheus
The Insights Agent chart can also install a new Prometheus server in your cluster to use.
To install Prometheus alongside the Agent, add the following to your values.yaml:
```
prometheus-metrics:
  installPrometheusServer: true
```

## Sample Report
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
