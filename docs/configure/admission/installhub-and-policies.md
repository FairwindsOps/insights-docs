---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Admission Controller configuration through Install Hub and Configuration of Policies"
---
# Install Hub and Policies
## Enable or Disable Reports Through Install Hub
The Admission Controller currently runs the following report types:
* Polaris - checks for security and best practices
* [OPA](/configure/policy/opa-policy) - apply custom policies to resources

To enable or disable a particular report:
1. Visit your organization's `Clusters` page
2. After selecting a cluster, go to the `Install Hub` page
3. Click the `Admission Controller` report and navigate to `Configure`
4. Use the toggle to enable or disable a report and click `Update`

<img :src="$withBase('/img/admission-reports.png')" alt="enable reports">

## Customize Policies 
To see the current Policies applicable to the Admission Controller:
1. Visit your organizations `Policy` page
2. Under the `Admission` column, select the `Warn` and `Block` filters

If the Admission Controller is not in [Passive Mode](/installation/admission/setup#installation), the Policies that have `Block` under `Admission` will cause admission requests to fail. Others will only create Action Items but will not block admission requests.

To customize the severity or whether a Policy should block an admission request, you can use the
[Insights CLI to configure Policies.](/configure/cli/settings)
