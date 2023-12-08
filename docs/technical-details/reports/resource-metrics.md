---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: The Prometheus Collector report provides fine-grained resource usage data"
---
# Prometheus Collector

The Prometheus Collector report gathers workload metrics from a Prometheus installation
in order to provide fine-grained resource usage data. This can be used to gauge how much
different workloads cost, understand cost trends and help set resource requests and limits.

> Note: Prometheus Collector requires **`kube-state-metrics`** and **`metrics-server`** to be installed and running in the cluster.

## Use an Existing Prometheus Installation
If you already have Prometheus installed you can point Insights to the service endpoint of your installation. If you installed the Prometheus operator, the service endpoint will likely end in `port 9090`, and if you only installed the prometheus-server the service endpoint will probably end in `port 80`. To configure this in the `values.yaml` file use the following format:

```yaml
prometheus-metrics:
  address: "http://<prometheus-service-name>.<namespace>.svc.cluster.local:<port>"
```

## Install a New Prometheus
The Insights Agent chart can also install a new Prometheus server in your cluster to use.
To install Prometheus alongside the Agent, add the following to your `values.yaml`:
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

## Running on GKE Autopilot
GKE Autopilot makes it hard to allow a self-installed Prometheus server, however it does have GCP Managed Prometheus set up by default. GCP Managed Prometheus can provide the metrics that are required, and prometheus-collector can retrieve metrics from GCP Managed Prometheus, with some additional configuration.
1. CollectKubelet/cAdvisor metrics
GCP Managed Prometheus must be configured to scrape the Kubelet for Kubelet and cAdvisor metrics. This can be set up by editing the OperatorConfig resource as documented here:
[Install kubelet-cadvisor](https://cloud.google.com/stackdriver/docs/managed-prometheus/exporters/kubelet-cadvisor)

2. Install kube-state-metrics
GCP Managed Prometheus needs a Kube State Metrics instance installed in order to get metrics from the Kubernetes API. Use the configuration in the "Install Kube State Metrics" section at link below to set this up. install Kube State Metrics. You only need to use this part of the document, you don't need the "Define rules and alerts" section.
[Configure kubec state metrics](https://cloud.google.com/stackdriver/docs/managed-prometheus/exporters/kube_state_metrics#install-exporter)

3. Install the GCP Managed Prometheus frontend
Many GCP APIs require OAuth 2.0. The prometheus-collector requires an "authentication proxy" to get metrics from GCP Managed Prometheus, and GCP provides a mechanism for this through their Prometheus frontend UI deployment. This section will outline the steps in this document that are needed to set this up.
First, you will need to create Google and Kubernetes service accounts, make sure they have the right permissions, and bind them together. Starting from Set up a namespace (if you would like a separate namespace for the frontend deployment), proceed through the Authorize the service account section.
Next, do step 1. in the Deploy the frontend UI section, with one change to the YAML. In the Deployment spec, add the name of the Kubernetes serviceAccount created in the previous step to spec.spec.serviceAccount: <name of Kubernetes service account>. If you like, you can run the port-forward command in step 2. to verify that the frontend is able to connect and get metrics from GCP Managed Prometheus.
[Configure a query interface for Google Cloud Managed Service for Prometheus](https://cloud.google.com/stackdriver/docs/managed-prometheus/query)

4. Point prometheus-collector to the frontend
This last step configures the prometheus-collector to get Prometheus metrics through the frontend service. Here are the Helm values to set in our values.yaml:
```yaml
prometheus-metrics:
  enabled: true
  installPrometheusServer: false
  address: "http://frontend.<frontend namespace>.svc:9090"
```
where <frontend namespace> is the namespace where the frontend has ben installed.


