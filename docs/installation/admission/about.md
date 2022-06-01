---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation about the Admission Controller. Reject resources from entering your cluster if they don't comply with policies"
---

# About
Fairwinds Insights can run as an Admission Controller. This means it will reject any Kubernetes resources from entering your cluster
if they don't conform to your organization's policies.

Insights will run the following report types in Admission Controller:
* Polaris (configuration validation for best practices)
* OPA (run custom policies)