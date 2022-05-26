---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Integrate into the CI process for infrastructure-as-code, helping spot issues before they make it into production."
---
# About
Fairwinds Insights offers integrations into popular Git and CI/CD tools to enable infrastructure-as-code scanning in your development process. This enables organizations to "shift left" and help you spot issues _before_ they make it into production.

There are two options for this:
- [**CI/CD Integration**](https://insights.docs.fairwinds.com/installation/ci/setup/): Fairwinds Insights can integrate into your Continuous Integration process, so you can catch image vulnerabilities and Kubernetes misconfigurations before they are pushed to production. Insights can scan changes in each pull request, notifying developers or breaking the build whenever security, efficiency, or reliability issues are found.
- [**Auto-Scan**](https://insights.docs.fairwinds.com/installation/ci/autoscan/): Auto-Scan uses a GitHub integration to enable infrastructure-as-code scanning across multiple repositories without having to configure individual CI pipelines. Scans can be initiated on every pull request on any GitHub repo, and will use the Fairwinds Insights SaaS infrastructure to run the checks.

Insights will run the following report types in CI:
* Polaris (configuration validation for best practices)
* Trivy (scan Docker images for vulnerabilities)
* OPA (run custom policies)
* Pluto (detect deprecated resources)

## Comparing Auto-Scan and CI/CD Integration options
|                                                       | **Auto-Scan**                                                                                                    | **Insights CI/CD Integration**                                                                                                   |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Target Use Case**                                   | DevOps Leaders adopting GitOps who need Infrastructure-as-Code scanning across multiple teams and repos quickly. | DevOps Leaders with a few infrastructure repos, need to scan private images, or need scanning to be done on their CI/CD compute. |
| **Main Value Proposition**                            | - **Save time rolling out Infrastructure-as-Code scanning**<br />- Reduce cost of fixing issues                      | Reduce cost of fixing issues                                                                                                     |
| **GitHub Integration**                                | Required                                                                                                         | Optional                                                                                                                         |
| **Where scans are run**                               | Fairwinds Insights SaaS infrastructure                                                                           | Your CI/CD platform                                                                                                              |
| **Automatic discovery of YAML/Helm charts in a repo** | Yes                                                                                                              | No - manually specify in `fairwinds-insights.yaml`                                                                               |
| **Publish scan results as a GitHub Comment**          | Yes                                                                                                              | Yes - optional (if GitHub is integrated)                                                                                         |
| **Publish GitHub commit status**                      | Yes                                                                                                              | Yes - optional (if GitHub is integrated)                                                                                         |
| **Scan Container Images?**                               | Public images only                                                                                                      | Yes - Public and Private images                                                                                                                     |
| **How do I get started?**                             | Navigate to: Repositories > Add Repository > **_“Connect GitHub”_**                                              | Navigate to: Repositories > Add Repository > **_“Connect Manually”_**   
