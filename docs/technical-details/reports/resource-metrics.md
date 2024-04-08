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
  enabled: true
  address: "http://<prometheus-service-name>.<namespace>.svc.cluster.local:<port>"
```

## Install a New Prometheus
The Insights Agent chart can also install a new Prometheus server in your cluster to use.
To install Prometheus alongside the Agent, add the following to your `values.yaml`:
```
prometheus-metrics:
  enabled: true
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

## Integration with GKE Autopilot / GCP Managed Prometheus

Insights requires a Prometheus server to collect metrics for workload usage. Typically, this is a Prometheus server that is already running in a Kubernetes cluster, or a Prometheus server that is installed directly via the Insights Agent Helm Chart.

In GKE Autopilot, users are required to use the GCP Managed Prometheus offering to collect the require container metrics. GCP Managed Prometheus may increase your overall GCP spend and requires additional configuration for the Insights Agent to read those metrics. 

Follow the below steps for setting up GCP Managed Prometheus and connecting it to Fairwinds Insights.

### 1. Collect Kubelet/cAdvisor metrics

GCP Managed Prometheus must be configured to scrape the Kubelet for Kubelet and cAdvisor metrics. This can be setup by editing the OperatorConfig resource as documented here:
[Install kubelet-cadvisor](https://cloud.google.com/stackdriver/docs/managed-prometheus/exporters/kubelet-cadvisor)

### 2. Install `kube-state-metrics`

GCP Managed Prometheus needs a Kube State Metrics instance installed in order to get metrics from the Kubernetes API. Use the configuration in the "Install Kube State Metrics" section at link below to set this up: 
[Configure kube-state-metrics](https://cloud.google.com/stackdriver/docs/managed-prometheus/exporters/kube_state_metrics#install-exporter)

### 3. Install the GCP Managed Prometheus frontend

Many GCP APIs require OAuth 2.0. The Insights Agent requires an "authentication proxy" to get metrics from GCP Managed Prometheus, and GCP provides a mechanism for this via their Prometheus frontend UI deployment. 

This section will outline the steps to set this up, and will refer to this guide: [Configure a query interface for Google Cloud Managed Service for Prometheus](https://cloud.google.com/stackdriver/docs/managed-prometheus/query-api-ui):

- You will need to create Google and Kubernetes service accounts, make sure they have the right permissions, and bind them together. In the guide referenced above, starting from [Set up a namespace](https://cloud.google.com/stackdriver/docs/managed-prometheus/query-api-ui#namespace-setup) (if you would like a separate namespace for the frontend deployment), proceed through to the end of the [Authorize the service account section](https://cloud.google.com/stackdriver/docs/managed-prometheus/query-api-ui#authorize-sa).

- Now, do step 1 in the [Deploy the frontend UI](https://cloud.google.com/stackdriver/docs/managed-prometheus/query-api-ui#promui-deploy) section, with one change to the YAML. In the Deployment spec, add the name of the Kubernetes serviceAccount created in the previous step to spec.spec.serviceAccount: <name of Kubernetes service account>. If you like, you can run the port-forward command in step 2. to verify that the frontend is able to connect and get metrics from GCP Managed Prometheus.

### 4. Point prometheus-collector to the frontend

This last step configures the prometheus-metrics report in the Insights Agent to get Prometheus metrics through the frontend service. Here are the Helm values to use in the Insights Agent `values.yaml`:

```yaml
prometheus-metrics:
  enabled: true
  installPrometheusServer: false
  address: "http://frontend.<frontend namespace>.svc:9090"
```

>NOTE: `<frontend namespace>` is the namespace where the Prometheus frontend UI has been installed.

## Integration with AKS / Azure Monitor

If Azure Monitor managed service for Prometheus is being used for Prometheus in the cluster, prometheus-metrics can be configured to pull from its API.

If Azure Monitor has not been enabled, follow these steps in this guide:  [Enable Azure Monitor in an existing cluster](https://learn.microsoft.com/en-us/azure/azure-monitor/containers/kubernetes-monitoring-enable?tabs=cli#existing-cluster-prometheus-and-container-insights)

### 1. Deploy a Prometheus authorization proxy

An authorization proxy is used for prometheus-metrics to pull metrics from the Azure Monitor API. Follow this guide to configure and deploy the proxy to your AKS cluster: [Deploy a prometheus authorization proxy](https://learn.microsoft.com/en-us/azure/azure-monitor/containers/prometheus-authorization-proxy?tabs=query-metrics-example)

### 2. Update the `insights-agent` values

Update the `insights-agent` values with the the service name of the authorization proxy created in the previous step:

```yaml
prometheus-metrics:
  enabled: true
  installPrometheusServer: false
  address: http://<proxy-service-name>.<proxy-service-namespace>.svc.cluster.local
```

## Troubleshooting
If the current resource values of your workloads are missing or reporting as 'unset' in the Efficency section and you are instaling your own prometheus instance, it's likely that kube-state-metrics (KSM) is not installed. 

If you are installing with the kube-prometheus-stack chart, kube-state-metrics is enabled by default and is controlled with the top level key [kube-state-metrics.enabled: true](https://artifacthub.io/packages/helm/prometheus-community/kube-prometheus-stack?modal=values&path=kubeStateMetrics.enabled)

It can also be installed via the dedicated kube-state-metrics chart here: 
[Install kube-state-metrics](https://artifacthub.io/packages/helm/prometheus-community/kube-state-metrics)

If KSM appears to be running fine, check for any network policies that might prevent Prometheus from scraping `kube-state-metrics`.

