# Prometheus Collector

The Prometheus Collector report gathers workload metrics from a Prometheus installation
in order to provide fine-grained resource usage data. This can be used to gauge how much
different workloads cost, understand cost trends, and help set resource requests and limits.

## Use an existing Prometheus installation
To use an existing Prometheus installation pass the following flag to the Helm chart installation:
```
--set resourcemetrics.address="http://prometheus-server"
```

## Install a new Prometheus
The Insights Agent chart can also install a new Prometheus server in your cluster to use.
To install Prometheus alonside the Agent, pass the following flag to the Helm chart installation:
```
--set resourcemetrics.installPrometheus=true
```
