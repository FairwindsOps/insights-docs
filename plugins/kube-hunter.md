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
