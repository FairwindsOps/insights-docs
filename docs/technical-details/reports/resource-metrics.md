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

### 3. Create Google service account to run prometheus query
1. Go to IAM & Admin > Select Service Account
2. Click Create Service Account
3. Give the service account a name then "Create and Continue"
4. Grant roles: "Monitoring Viewer" and "Service Account Token Creator" and click Done
5. Use the service account when configuring prometheus-metrics with the service account created

```yaml
prometheus-metrics:
  enabled: true
  installPrometheusServer: false
  address: https://monitoring.googleapis.com/v1/projects/gcp-prime/location/global/prometheus # managed prometheus address
  managedPrometheusClusterName: "my-autopilot-cluster"
  serviceAccount:
    annotations:
      iam.gke.io/gcp-service-account: <my-service-account>@gcp-prime.iam.gserviceaccount.com  
```
- address: required when you are not using our standard prometheus installation, at the example above provide the GCP Managed Prometheus address
- managedPrometheusClusterName: required only when using Managed Promehteus, as Managed Prometheus may have data from multiple clusters

6. Make kubernetes insights-agent-prometheus-metrics service account member to google service account and bind to workload identity role
gcloud iam service-accounts add-iam-policy-binding <my-service-account>@gcp-prime.iam.gserviceaccount.com \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:gcp-prime.svc.id.goog[insights-agent/insights-agent-prometheus-metrics]"

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

