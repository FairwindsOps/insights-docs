---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation. The Prometheus Collector report provides fine-grained resource usage data. "
---
# Prometheus Collector

The Prometheus Collector report gathers workload metrics from a Prometheus installation
in order to provide fine-grained resource usage data. This can be used to gauge how much
different workloads cost, understand cost trends, and help set resource requests and limits.

## Use an existing Prometheus installation
To use an existing Prometheus installation pass the following flag to the Helm chart installation:
```
--set resourcemetrics.address="http://prometheus-server.<namespace>"
```

Alternatively, you can click on **Prometheus** from the [Report Hub](/run/agent/report-hub), and then:
1. Click on the **Configure** tab
2. Enter the service address of the existing Prometheus instance
3. Click "Save"
4. Be sure to [Re-install the Fairwinds Insights agent](/run/agent/installation) in your cluster

## Install a new Prometheus
The Insights Agent chart can also install a new Prometheus server in your cluster to use.
To install Prometheus alonside the Agent, pass the following flag to the Helm chart installation:
```
--set resourcemetrics.installPrometheus=true
```
