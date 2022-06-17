---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Admission Controller helm configuration"
---
# Helm
The Admission Controller can be further configured using Helm. To see the full list of options,
check out the [Insights Admission Helm chart](https://github.com/FairwindsOps/charts/tree/master/stable/insights-admission)

## Resources
By default, the Admission Controller will monitor the following resources:
* `apps/(v1|v1beta1|v1beta2)`
  * Deployments
  * DaemonSets
  * StatefulSets
* `batch/(v1|v1beta1)`
  * Jobs
  * CronJobs
* `core/v1`
  * Pods
  * ReplicationControllers

If you'd like to add additional resources, you can use the `rules`
setting on the Helm chart. Adding this to the `values.yaml` when installing the Insights Agent:
```yaml
insights-admission:
  webhookConfig:
    rules:
    - apiGroups:
      - custom
      apiVersions:
      - v1
      operations:
      - CREATE
      - UPDATE
      resources:
      - customResource
      scope: Namespaced
```
