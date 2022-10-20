---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Integrate into the CI process for infrastructure-as-code, helping spot issues before they make it into production"
---
# Choosing Insights CI or Auto-Scan
Fairwinds Insights offers integrations into popular Git and CI/CD tools to enable infrastructure-as-code scanning in your development process. Scans can be initiated on every pull request and commit on any repository, enabling organizations to "shift left" and help catch image vulnerabilities and Kubernetes misconfigurations _before_ they make it into production.

There are two options for this:
- [**Auto-Scan**](/installation/ci/autoscan): The easiest option is using our Auto-Scan feature. Auto-Scan uses a GitHub integration to enable infrastructure-as-code scanning across multiple repositories without having to configure individual CI pipelines. This option will use the Fairwinds Insights SaaS infrastructure to run the checks and is recommended for organizations using Github. Currently, Auto-Scan is only able to scan container images from public repositories; for private image scanning, please use the [**Insights CI Script**](/installation/ci/insights-ci-script) instead.
- [**Insights CI Integration**](/installation/ci/insights-ci-script): Recommended for organizations not using Github, this option involves executing our Insights CI script as part of your CI/CD pipelines. In addition, running Insights in your CI/CD pipeline allows you to optionally pull private images and scan them.

Insights will run the following report types in CI:
* Polaris (configuration validation for best practices)
* Trivy (scan Docker images for vulnerabilities)
* OPA (run custom policies)
* Pluto (detect deprecated resources)

### Comparing Auto-Scan and Insights CI Options
|                                                       | **Auto-Scan**                                                                                                    | **Insights CI Integration**                                                                                                   |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Key Differences**                                   | Requires GitHub. Enables IaC scanning on multiple repos in minutes. Does not scan private images (soon). | Works with popular CI/CD systems. Integrates into individual CI pipelines. Scans private images. |
| **Target Use Case**                                   | DevOps Leaders adopting GitOps who need Infrastructure-as-Code scanning across multiple teams and repos quickly | DevOps Leaders with a few infrastructure repos, need to scan private images or need scanning to be done on their CI/CD compute |
| **Main Value Proposition**                            | - Add infrastructure-as-code scanning to multiple repos in minutes<br />- Reduce cost of fixing issues                      | Reduce cost of fixing issues                                                                                                     |
| **GitHub Integration**                                | Required                                                                                                         | Optional                                                                                                                         |
| **Where scans are run**                               | Fairwinds Insights SaaS infrastructure                                                                           | Your CI/CD platform                                                                                                              |
| **Automatic discovery of YAML/Helm charts in a repo** | Yes                                                                                                              | No - manually specify in `fairwinds-insights.yaml`                                                                               |
| **Publish scan results as a GitHub Comment**          | Yes                                                                                                              | Yes (only if GitHub is integrated)                                                                                         |
| **Publish GitHub commit status**                      | Yes                                                                                                              | Yes (only if GitHub is integrated)                                                                                         |
| **Scan Container Images?**                               | Public images only                                                                                                      | Yes - Public and Private images                                                                                                                     |
| **How do I get started?**                             | Navigate to: `Repositories > Add Repository > Connect GitHub`                                              | Navigate to: `Repositories > Add Repository > Connect Manually`
