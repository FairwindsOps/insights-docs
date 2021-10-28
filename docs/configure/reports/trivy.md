---
meta:
  - name: title
    content: Trivy and Fairwinds Insights
  - name: description
    content: Trivy, an open source tool for scanning Docker images for vulnerabilities, runs scans on your cluster, and results are uploaded to Fairwinds Insights.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, Trivy, open source
---

# Trivy
[Trivy](https://github.com/aquasecurity/trivy) is an open source tool for scanning Docker images
for vulnerabilities. These scans run on your cluster, and the results are uploaded to Insights

## Vulnerability Database
Trivy's vulnerability database is managed via [this GitHub repository](https://github.com/aquasecurity/trivy-db/tree/main/pkg/vulnsrc).
The database is refreshed every 6 hours, and pulls from many different sources, including
NIST's NVD, RedHat, Debian, etc. You can see the [full list here](https://github.com/aquasecurity/trivy-db/tree/main/pkg/vulnsrc)

## Remediation
If you're seeing Action Items from the Trivy report, there are two typical routes for resolution:
* If the report is for a third-party library (e.g. a Helm chart), try updating to the latest version.
If that doesn't solve the problem, notify the maintainer that the latest version has a vulnerability,
e.g. by opening a GitHub issue.
* If the report is for an application you own, try updating the base image and any libraries you've
installed on top of it.

## Private Images
On some cloud providers, your nodes will be automatically configured to have access to your
container registry. For example, GKE nodes should be able to pull images from Google Container
Registry automatically.

But in many cases, you'll need to grant Trivy permission to access private images. To do so,
you'll need to create a Kubernetes Secret, and pass the name of that secret to the Helm
installation of the Insights Agent

For example, to create a secret from your personal dockerconfig, you could run:
```bash
kubectl create secret generic insights-pull --from-file=config.json=$HOME/.docker/config.json -n insights-agent
```

Note that we named the secret `insights-pull`, and put it in the `insights-agent` namespace.
We can then install the agent with
```bash
  --set trivy.privateImages.dockerConfigSecret=insights-pull
```
