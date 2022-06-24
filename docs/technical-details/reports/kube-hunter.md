---
meta:
  - name: title
    content: Kube-hunter and Fairwinds Insights
  - name: description
    content: Kube-hunter hunts for security weaknesses in Kubernetes clusters and is integrated in Fairwinds Insights.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, open source, Kube-hunter
---
# Kube-hunter
Kube-hunter hunts for security weaknesses in Kubernetes clusters.
The tool was developed to increase awareness and visibility for security issues in Kubernetes environments.

We run kube-hunter in **passive** mode. This means kube-hunter will not attempt to exploit
any of the vulnerabilities it finds in order to find additional vulnerabilities.

We also run kube-hunter in [pod mode](https://github.com/aquasecurity/kube-hunter#pod). This effectively
discovers what a malicious pod (or someone who gained access to a vulnerable pod) would be able to
do inside the cluster.

## Remediation
Refer to the [kube-hunter documentation](https://aquasecurity.github.io/kube-hunter/kbindex.html)
for details and remediation steps for each particular kube-hunter finding.

## Sample Report 
kube-hunter reports contain a list of Nodes, Services and detected vulnerabilities.

```json
{
    "_fairwindsReportVersion": "501",
    "hunter_statistics": [
        {
            "description": "Checks if Node is running a Kubernetes version vulnerable to known CVEs",
            "name": "K8s CVE Hunter",
            "vulnerabilities": 0
        }
    ],
    "nodes": [
        {
            "location": "10.244.0.1",
            "type": "Node/Master"
        }
    ],
    "services": [
        {
            "description": "The Kubelet is the main component in every Node, all pod operations goes through the kubelet",
            "location": "10.244.0.1:10250",
            "service": "Kubelet API"
        }
    ]
}
```