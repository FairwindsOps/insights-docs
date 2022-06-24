---
meta:
  - name: title
    content: Fairwinds Insights and Workloads report
  - name: description
    content: The Workloads report uploads a list of all the workloads running in your cluster and is used to generate the Fairwinds Insights workloads page
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, Workloads, open source
---
# Workloads
The Workloads report uploads a list of all the workloads running in your cluster
including `Deployments`, `Jobs`, `CronJobs`, `ReplicaSets`, `DaemonSets` and `Pods`.
This information is used to generate the information in the workloads page. Make sure to have Goldilocks or Prometheus Collector installed.

The Workloads report does not generate any Action Items.

## Sample Report 
Workloads reports contain a list of workloads, Namespaces and Nodes in the cluster
```json
{
    "CreationTime": "2020-02-11T19:08:07.287236228Z",
    "ServerVersion": "1.16",
    "SourceName": "https://10.96.0.1:443",
    "SourceType": "Cluster",
    "Controllers": [
        {
            "Containers": [
                {
                    "CreationTime": "0001-01-01T00:00:00Z",
                    "Image": "k8s.gcr.io/coredns:1.6.2",
                    "ImageID": "",
                    "Name": "coredns",
                    "Resource": {
                        "Limits": {
                            "CPU": "0",
                            "Memory": "170Mi"
                        },
                        "Requests": {
                            "CPU": "100m",
                            "Memory": "70Mi"
                        }
                    }
                }
            ],
            "Kind": "Deployment",
            "Name": "coredns",
            "Namespace": "kube-system",
            "ParentUID": "",
            "UID": "081e8080-4649-420b-87da-ff48401842a7"
        }
    ],
    "Namespaces": [
        {
            "metadata": {
                "creationTimestamp": "2020-02-11T17:55:14Z",
                "name": "default",
                "resourceVersion": "146",
                "selfLink": "/api/v1/namespaces/default",
                "uid": "604f448f-6613-40b0-a01c-10702f2d742e"
            },
            "spec": {
                "finalizers": [
                    "kubernetes"
                ]
            },
            "status": {
                "phase": "Active"
            }
        }
    ],
    "Nodes": [
        {
            "Allocatable": {
                "cpu": "2",
                "ephemeral-storage": "61255492Ki",
                "hugepages-1Gi": "0",
                "hugepages-2Mi": "0",
                "memory": "2037620Ki",
                "pods": "110"
            },
            "AllocatedLimits": {
                "cpu": "1250m",
                "memory": "2471Mi",
                "pods": "13"
            },
            "AllocatedRequests": {
                "cpu": "1665m",
                "memory": "1988Mi",
                "pods": "13"
            },
            "Annotations": {
                "kubeadm.alpha.kubernetes.io/cri-socket": "/run/containerd/containerd.sock",
                "node.alpha.kubernetes.io/ttl": "0",
                "volumes.kubernetes.io/controller-managed-attach-detach": "true"
            },
            "Capacity": {
                "cpu": "2",
                "ephemeral-storage": "61255492Ki",
                "hugepages-1Gi": "0",
                "hugepages-2Mi": "0",
                "memory": "2037620Ki",
                "pods": "110"
            },
            "CreationTimestamp": "2020-02-11T17:55:12Z",
            "KubeProxyVersion": "v1.16.3",
            "KubeletVersion": "v1.16.3",
            "Labels": {
                "beta.kubernetes.io/arch": "amd64",
                "beta.kubernetes.io/os": "linux",
                "kubernetes.io/arch": "amd64",
                "kubernetes.io/hostname": "kind-control-plane",
                "kubernetes.io/os": "linux",
                "node-role.kubernetes.io/master": ""
            },
            "Name": "kind-control-plane",
            "Utilization": {
                "cpuLimitsFraction": 0.625,
                "cpuRequestsFraction": 0.8325,
                "memoryLimitsFraction": 1.2417938575396787,
                "memoryRequestsFraction": 0.9990636134313562
            }
        }
    ]
}
```