---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Integrate into the CI process for infrastructure-as-code, helping spot issues before they make it into production."
---
# About
Fairwinds Insights can integrate into the CI process for your infrastructure-as-code,
helping you spot issues _before_ they make it into production.

By adding Fairwinds Insights into your Continuous Integration process, you can catch image
vulnerabilities and Kubernetes misconfigurations early in the development process. Insights
can scan changes in each pull request, notifying developers or breaking the build
whenever security, efficiency, or reliability issues are found.

Insights will run the following report types in CI:
* Polaris (configuration validation for best practices)
* Trivy (scan Docker images for vulnerabilities)
* OPA (run custom policies)
* Pluto (detect deprecated resources)
