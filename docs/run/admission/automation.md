---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation. Get fine-grained customization of Admission Controller actions with the Automation Rules feature"
---
# Automation Rules
Fairwinds provides a powerful, flexible solution for fine-grained customization of Admission Controller actions with the [Automation Rules](https://insights.docs.fairwinds.com/features/rules/) feature. 

## Passive Mode
For example, first time users of Admission Controller may want to monitor all activities, but not yet deny any deployments.

To do this, you can create [Automation Rule](https://insights.docs.fairwinds.com/features/rules/) with the following settings:
* **Context:** Admission Controller
* **Report:** All
* **Cluster:** All
* **Action:** `ActionItem.Severity = 0.1;`

> **NOTE:** Any severity value >.66 is automatically considered a `danger` severity. Anything <=.66 is considered a `warning` severity.

When this is enabled, the Admission Controller will automatically consider all checks to be `warning`, and therefore allow all deployments to pass into the cluster.


