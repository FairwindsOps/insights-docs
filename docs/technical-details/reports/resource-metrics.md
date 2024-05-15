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

### 3. Create Google service account to run Prometheus query
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
- address: required when you are not using our standard prometheus installation, at the example above provides the GCP Managed Prometheus address
- managedPrometheusClusterName: required only when using Managed Promehteus, as Managed Prometheus may have data from multiple clusters

6. Make kubernetes insights-agent-prometheus-metrics service account member to google service account and bind to workload identity role
```bash
gcloud iam service-accounts add-iam-policy-binding <my-service-account>@gcp-prime.iam.gserviceaccount.com \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:gcp-prime.svc.id.goog[insights-agent/insights-agent-prometheus-metrics]"
```

# Terraform snippets
Collect Kubelet/cAdvisor metrics 
```terraform
resource "null_resource" "patch_operator_config" {
  provisioner "local-exec" {
    command = <<EOF
kubectl patch operatorconfig/config --namespace gmp-public --type merge --patch 'collections:\n   kubeletScraping:\n     interval: 30s' 
EOF  
  }
}
```

Install `kube-state-metrics`
```yaml
resource "kubectl_manifest" "install_kube_state_metrics" {
    yaml_body = <<YAML
# Copyright 2023 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

apiVersion: apps/v1
kind: StatefulSet
metadata:
  labels:
    app.kubernetes.io/name: kube-state-metrics
    app.kubernetes.io/version: 2.8.2
  namespace: gmp-public
  name: kube-state-metrics
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: kube-state-metrics
  serviceName: kube-state-metrics
  template:
    metadata:
      labels:
        app.kubernetes.io/name: kube-state-metrics
        app.kubernetes.io/version: 2.8.2
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: kubernetes.io/arch
                operator: In
                values:
                - arm64
                - amd64
              - key: kubernetes.io/os
                operator: In
                values:
                - linux
      containers:
      - name: kube-state-metric
        image: k8s.gcr.io/kube-state-metrics/kube-state-metrics:v2.8.2
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        args:
        - --pod=$(POD_NAME)
        - --pod-namespace=$(POD_NAMESPACE)
        - --port=8080
        - --telemetry-port=8081
        ports:
        - name: metrics
          containerPort: 8080
        - name: metrics-self
          containerPort: 8081
        resources:
          requests:
            cpu: 100m
            memory: 190Mi
          limits:
            memory: 250Mi
        securityContext:
          allowPrivilegeEscalation: false
          privileged: false
          capabilities:
            drop:
            - all
          runAsUser: 1000
          runAsGroup: 1000
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 5
          timeoutSeconds: 5
        readinessProbe:
          httpGet:
            path: /
            port: 8081
          initialDelaySeconds: 5
          timeoutSeconds: 5
      serviceAccountName: kube-state-metrics
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/name: kube-state-metrics
    app.kubernetes.io/version: 2.8.2
  namespace: gmp-public
  name: kube-state-metrics
spec:
  clusterIP: None
  ports:
  - name: metrics
    port: 8080
    targetPort: metrics
  - name: metrics-self
    port: 8081
    targetPort: metrics-self
  selector:
    app.kubernetes.io/name: kube-state-metrics
---
apiVersion: v1
kind: ServiceAccount
metadata:
  namespace: gmp-public
  name: kube-state-metrics
  labels:
    app.kubernetes.io/name: kube-state-metrics
    app.kubernetes.io/version: 2.8.2
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: gmp-public:kube-state-metrics
  labels:
    app.kubernetes.io/name: kube-state-metrics
    app.kubernetes.io/version: 2.8.2
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: gmp-public:kube-state-metrics
subjects:
- kind: ServiceAccount
  namespace: gmp-public
  name: kube-state-metrics
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: gmp-public:kube-state-metrics
  labels:
    app.kubernetes.io/name: kube-state-metrics
    app.kubernetes.io/version: 2.8.2
rules:
- apiGroups:
  - ""
  resources:
  - configmaps
  - secrets
  - nodes
  - pods
  - services
  - resourcequotas
  - replicationcontrollers
  - limitranges
  - persistentvolumeclaims
  - persistentvolumes
  - namespaces
  - endpoints
  verbs:
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
- apiGroups:
  - extensions
  resources:
  - daemonsets
  - deployments
  - replicasets
  - ingresses
  verbs:
  - list
  - watch
- apiGroups:
  - apps
  resources:
  - statefulsets
  - daemonsets
  - deployments
  - replicasets
  verbs:
  - list
  - watch
- apiGroups:
  - apps
  resources:
  - statefulsets
  verbs:
  - get 
- apiGroups:
  - batch
  resources:
  - cronjobs
  - jobs
  verbs:
  - list
  - watch
- apiGroups:
  - autoscaling
  resources:
  - horizontalpodautoscalers
  verbs:
  - list
  - watch
- apiGroups:
  - authentication.k8s.io
  resources:
  - tokenreviews
  verbs:
  - create
- apiGroups:
  - authorization.k8s.io
  resources:
  - subjectaccessreviews
  verbs:
  - create
- apiGroups:
  - policy
  resources:
  - poddisruptionbudgets
  verbs:
  - list
  - watch
- apiGroups:
  - certificates.k8s.io
  resources:
  - certificatesigningrequests
  verbs:
  - list
  - watch
- apiGroups:
  - storage.k8s.io
  resources:
  - storageclasses
  - volumeattachments
  verbs:
  - list
  - watch
- apiGroups:
  - admissionregistration.k8s.io
  resources:
  - mutatingwebhookconfigurations
  - validatingwebhookconfigurations
  verbs:
  - list
  - watch
- apiGroups:
  - networking.k8s.io
  resources:
  - networkpolicies
  - ingresses
  verbs:
  - list
  - watch
- apiGroups:
  - coordination.k8s.io
  resources:
  - leases
  verbs:
  - list
  - watch
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: kube-state-metrics
  namespace: gmp-public
spec:
  maxReplicas: 10
  minReplicas: 1
  scaleTargetRef:
    apiVersion: apps/v1
    kind: StatefulSet
    name: kube-state-metrics
  metrics:
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 60
  behavior:
    scaleDown:
      policies:
      - type: Pods
        value: 1
        # Under-utilization needs to persist for `periodSeconds` before any action can be taken.
        # Current supported max from https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/horizontal-pod-autoscaler-v2beta2/.
        periodSeconds: 1800
      # Current supported max from https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/horizontal-pod-autoscaler-v2beta2/.
      stabilizationWindowSeconds: 3600
---
apiVersion: monitoring.googleapis.com/v1
kind: ClusterPodMonitoring
metadata:
  name: kube-state-metrics
  labels:
    app.kubernetes.io/name: kube-state-metrics
    app.kubernetes.io/part-of: google-cloud-managed-prometheus
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: kube-state-metrics
  endpoints:
  - port: metrics
    interval: 30s
    metricRelabeling:
    - action: keep
      # Curated subset of metrics to reduce costs while populating default set of sample dashboards at
      # https://github.com/GoogleCloudPlatform/monitoring-dashboard-samples/tree/master/dashboards/kubernetes
      # Change this regex to fit your needs for which objects you want to monitor    
      regex: kube_(daemonset|deployment|replicaset|pod|namespace|node|statefulset|persistentvolume|horizontalpodautoscaler|job_created)(_.+)?
      sourceLabels: [__name__]
  targetLabels:
    metadata: [] # explicitly empty so the metric labels are respected
---
apiVersion: monitoring.googleapis.com/v1
kind: PodMonitoring
metadata:
  namespace: gmp-public
  name: kube-state-metrics
  labels:
    app.kubernetes.io/name: kube-state-metrics
    app.kubernetes.io/part-of: google-cloud-managed-prometheus
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: kube-state-metrics
  endpoints:
  - port: metrics-self
    interval: 30s
YAML
}
```

 Create Google service account to run Prometheus query
 ```terraform
resource "google_service_account" "prometheusqueryaccess" {
  account_id   = "prometheusqueryaccess"
  display_name = "Prometheus query Access"
}

resource "google_project_iam_policy" "prometheus_project_iam_policy" {
  project     = "${var.project_name}"
  policy_data = "${data.google_iam_policy.prometheus_monitoring_viewer_access.policy_data}"
}

data "google_iam_policy" "prometheus_monitoring_viewer_access" {
  binding {
    role = "roles/monitoring.viewer"
    members = [
       "serviceAccount:${google_service_account.prometheusqueryaccess.email}",
    ]
  }
  binding {
    role = "roles/iam.serviceAccountTokenCreator"
    members = [
       "serviceAccount:${google_service_account.prometheusqueryaccess.email}",
    ]
  }
}

resource "google_service_account_iam_binding" "prometheus_workload_identity" {
  service_account_id = "${google_service_account.prometheusqueryaccess.name}"
  role               = "roles/iam.workloadIdentityUser"
  members = [
    "serviceAccount:${var.project_name}.svc.id.goog[insights-agent/insights-agent-prometheus-metrics]",
  ]
}

 ```


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

