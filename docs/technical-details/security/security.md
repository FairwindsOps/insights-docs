# Security Details
## CVE Patching
Fairwinds uses a variety of methods, including Fairwinds Insights, to detect emerging CVEs in
our agent Helm charts and source code. We use common alerting techniques through feeds, as well
as scanning in our CI/CD process and clusters in which we run the agent ourselves.

When CVEs are discovered, we make a best-effort to remediate the vulnerability following the
objectives below.

### Affected Items
* Code Libraries (e.g. golang module)
* Base Images - (e.g. alpine)
* Third-Party Docker Images (e.g. kube-hunter)

### Response Times
All objectives are from the date that a patched version becomes available.
Fairwinds relies on third parties to patch the underlying code to fix vulnerabilities.
Once this fix is released, Fairwinds aligns to the following timeframes for upgrading various dependencies:

* Low (CVSS v3.x 0.1-3.9) - During Next Upgrade Cycle
* Medium (CVSS v3.x 4.0-6.9) - 5 Business Days
* High (CVSS v3.x 7.0-8.9) - 3 Business Days
* Critical (CVSS v3.x 9.0-10.0) - One Business Day

## RBAC Requirements
Each Fairwinds Insights plugin requires a unique set of permissions in order to do its job.
Here we provide a list of permissions requested by each plugin. You can also review
the [Helm chart](https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent) to
see the exact RBAC configurations for each plugin.

Notably, some plugins require **read access to secrets**. This is because they examine Helm 3
releases, which store metadata inside of a `Secret` object.

If a particular plugin requires permissions that you're uncomfortable with, you can disable it
in the Helm chart by adding `--set $plugin.enabled=false`.

### Permission List
| Plugin          | View Secrets       | View Resources (non-secrets) | Other/Notes |
|-----------------|:------------------:|:----------------------------:|-------------- |
| kube-bench      |                    |                              |   |
| kube-hunter     |                    |                              |   |
| Polaris         |                    | :white_check_mark:           |   |
| RBAC reporter   |                    | :white_check_mark:           |   |
| Trivy           |                    | :white_check_mark:           |   |
| Workloads       |                    | :white_check_mark:           |   |
| Goldilocks      |                    | :white_check_mark:           | Create/Delete VPAs |
| Release Watcher | :white_check_mark: | :white_check_mark:           | Needs secrets to view Helm releases |
| Pluto           | :white_check_mark: | :white_check_mark:           | Needs secrets to view Helm releases |

## Network Egress
The Fairwinds Insights agent needs egress to the following URLs:

### API (all methods)
* insights.fairwinds.com/*

### Docker Images (pull only)
* quay.io/fairwinds/*
* us-docker.pkg.dev/fairwinds-ops/*
* index.docker.io/aquasec/*
* index.docker.io/curlimages/*

### Supplementary Data (GET only)
* raw.githubusercontent.com/FairwindsOps/* (goldilocks)
* github.com/aquasecurity/* (trivy)
* artifacthub.io/api/v1/* (nova)

