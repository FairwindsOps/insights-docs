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
for vulnerabilities. These scans run on your cluster and the results are uploaded to Insights.

## Vulnerability Database
Trivy's vulnerability database is managed via [this GitHub repository](https://github.com/aquasecurity/trivy-db/tree/main/pkg/vulnsrc).
The database is refreshed every 6 hours and pulls from many different sources, including
NIST's NVD, RedHat, Debian, etc. You can see the [full list here.](https://github.com/aquasecurity/trivy-db/tree/main/pkg/vulnsrc)

## Remediation
If you're seeing Action Items from the Trivy report, there are two typical routes for resolution:

**1. Third-party containers:** If the report is for a third-party container (e.g. a Helm chart), try updating to the latest version. Fairwinds will automatically scan newer versions of the container image from the source repository and recommend versions that have fewer vulnerabilities. Upgrade recommendations are refreshed each time the container image is re-scanned. To learn more, [read our blog post about third-party image recommendations](https://www.fairwinds.com/blog/kubernetes-vulnerability-management-third-party-images-up-to-date).

If that doesn't solve the problem, notify the maintainer that the latest version has a vulnerability(e.g. by opening a GitHub issue).

**2. First-party containers you own and maintain:** If the report is for an application you own, try updating the base image and any libraries you've
installed on top of it. Fairwinds provides functionality to identify if vulnerable libraries have a known fix available.

## Private Images
On some cloud providers your nodes will be automatically configured to have access to your
container registry. For example, GKE nodes should be able to pull images from Google Container
Registry automatically.

But in many cases you'll need to grant Trivy permission to access private images. There are a couple of different ways to do this. 

### Passing in Access Keys Directly
For this, you'll need to create a Kubernetes Secret and pass the name of that secret to the Helm
installation of the Insights Agent.

For example, to create a secret from your personal dockerconfig, you could run:
```bash
kubectl create secret generic insights-pull --from-file=config.json=$HOME/.docker/config.json -n insights-agent
```

Note that we named the secret `insights-pull` and put it in the `insights-agent` namespace.
We can then install the agent with:
```bash
  --set trivy.privateImages.dockerConfigSecret=insights-pull
```

### Using IRSA (IAM Role for Service Accounts)
The Insights Helm chart allows us to pass Trivy an IAM role name to give Trivy the permissions it needs to access an AWS repository. In the Insights Agent's `values.yaml` add:

```yaml
trivy:
  serviceAccount:
    annotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::ACCOUNT_ID:role/IAM_ROLE_NAME
```

### Using Workload Identity Federation for GKE
The Insights Helm chart allows us to configure Trivy with the necessary permissions to access a Google Cloud repository by leveraging Workload Identity. In the Insights Agent's `values.yaml`, add the following configuration and ensure Workload Identity is properly set up:

```yaml
trivy:
  serviceAccount:
    annotations:
      iam.gke.io/gcp-service-account: {IAM_SA_NAME}@{IAM_SA_PROJECT_ID}.iam.gserviceaccount.com
```

## Sample Report 
Trivy reports contain a list of images running in the cluster as well as any CVEs in those images
```json
{
    "Images": [
        {
            "ID": "docker.io/bitnami/postgresql@sha256:8008fdf764dc072a04fabf71812c8bbb39d2611f54310fbc325405d85437baf1",
            "Name": "docker.io/bitnami/postgresql:11.6.0-debian-9-r48",
            "Namespace": "my-app",
            "OwnerKind": "StatefulSet",
            "OwnerName": "my-app-postgresql/my-app-postgresql",
            "Report": [
                {
                    "Target": "docker_io_bitnami_postgresql_sha256_8008fdf764dc072a04fabf71812c8bbb39d2611f54310fbc325405d85437baf1 (debian 9.11)",
                    "Vulnerabilities": [
                        {
                            "InstalledVersion": "1.4.9",
                            "PkgName": "apt",
                            "VulnerabilityID": "CVE-2011-3374"
                        }
                    ]
                }
            ]
        }
    ],
    "Vulnerabilities": {
        "CVE-2011-3374": {
            "Description": "It was found that apt-key in apt, all versions, do not correctly validate gpg keys with the master keyring, leading to a potential man-in-the-middle attack.",
            "References": [
                "https://access.redhat.com/security/cve/cve-2011-3374",
                "https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=642480",
                "https://people.canonical.com/~ubuntu-security/cve/2011/CVE-2011-3374.html",
                "https://security-tracker.debian.org/tracker/CVE-2011-3374",
                "https://snyk.io/vuln/SNYK-LINUX-APT-116518"
            ],
            "Severity": "MEDIUM",
            "Title": "",
            "VulnerabilityID": "CVE-2011-3374"
        }
    }
}
```
