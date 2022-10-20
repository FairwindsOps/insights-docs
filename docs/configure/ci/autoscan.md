---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to configure Auto-Scan"
---
# Auto-Scan
## Gating Pull Requests With Github Protected Branches
*Documentation coming soon!*

## Using Auto-Scan to Scan Private Images
Scanning private container images is not yet supported in Auto-Scan but is currently on-roadmap.

## Re-Running an Auto-Scan
You can manually re-run an Auto-Scan for specific repository branches. This may be useful if you'd like a refreshed result set, or if you'd like to verify any fixes or changes.

To re-run an Auto-Scan:
- Navigate to the `Repositories` page
- Select a repository that has been enabled with Auto-Scan
- Click the `Re-Run Autoscan` in the upper-right

Re-running an Auto-Scan job usually takes a few minutes. Look for the 'Completed' status to see your latest results.

## Customizing Auto-Scan Using Fairwinds-insights.yaml
Unlike the Insights CI integration, Auto-Scan does not require users to create a `fairwinds-insights.yaml` configuration file at the base of their GitHub repository. This is because Auto-Scan will automatically crawl and discover YAML manifests, Helm charts, and docker images available for scanning.

However, sometimes users may want to customize Auto-Scan behaviors for a specific repo. To do this, you can create a `fairwinds-insights.yaml` file at the root of your git repo and customize things like:
- [Configuring specific exemptions](/configure/ci/configuration#managing-exemptions)
- Enabling/disabling specific scanning tools
- [Scanning additional container images not present in your manifests](/configure/ci/configuration#scanning-container-images)

> NOTE: When you add a `fairwinds-insights.yaml` file to an Auto-Scan enabled repository, automatic discovery of YAML manifests, Helm charts, and docker images is disabled. You must specify the location of these artifacts within the `fairwinds-insights.yaml` file.

To customize Auto-Scan behavior, please review the [configuration options for `fairwinds-insights.yaml`](/configure/ci/configuration).

## Troubleshooting Auto-Scan
### Reviewing Auto-Scan Logs
Occassionally, you may run an Auto-Scan and it will return an error. You will see an error status like this when you navigate to the `Repositories` page and click on a repository.
<img :src="$withBase('/img/autoscan-error.png')" alt="An Auto-Scan that has reported an error">

If you see this error, you can scroll to the bottom of the page and get detailed logs about the issue. 
<img :src="$withBase('/img/autoscan-logs.png')" alt="Auto-Scan logs provide details about errors generated during the scan">

### Helm Chart With Invalid Values File
