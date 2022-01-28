---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation. How to configure you the Admission controller. "
---
# Configuration
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
setting on the Helm chart:
```yaml
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

## Policies
You can fine-tune which policies are applied by the admission controller. Any policy with a `high` or `critical` severity will instruct the Admission Controller to deny the deployment. 

Specifically, the following auditing tools
can be enabled or disabled as part of admission control:
* Polaris - checks for security and best practices
* OPA - apply custom policies to resources ([see docs](/configure/policy/policy))
* Pluto - disallow resources that have been deprecated

Enforce policies from the above auditing tools ([see docs](/configure/admission/enforce))

To enable or disable a particular report, run:
```bash
curl -X POST https://insights.fairwinds.com/v0/organizations/$org/admission/reports/$report \
  -H "Authorization: Bearer $token" \
  -d '{"enabled": false}'
```

where:
* `$report` is one of `polaris`, `opa`, or `pluto`
* `$org` is your organization's name in Insights
* `$token` is the admin token found on your organization settings page

### Polaris
You can also upload a custom
[Polaris configuration](https://polaris.docs.fairwinds.com/customization/checks/)
to set which checks are marked as `danger`, and will therefore cause a workload to be rejected.


You can also use the Polaris configuration to write
[custom checks using JSON Schema](https://polaris.docs.fairwinds.com/customization/custom-checks/)

```
curl -X POST https://insights.fairwinds.com/v0/organizations/$org/admission/reports/polaris/config \
  -H "Authorization: Bearer $token" \
  -H "Content-Type: text/yaml" \
  -d @polaris-config.yaml
```