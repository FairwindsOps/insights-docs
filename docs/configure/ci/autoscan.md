---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to configure Auto-Scan"
---
# Auto-Scan

## Gating pull requests with GitHub Protected Branches
*Documentation coming soon!*

## Using Auto-Scan to scan private images
Scanning private container images is not yet supported in Auto-Scan, but is currently on-roadmap.

## Re-running an Auto-Scan
You can manually re-run an Auto-Scan for specific repository branches. This may be useful if you'd like a refreshed result set, or if you'd like to verify any fixes or changes.

To re-run an Auto-Scan:
- Navigate to the `Repositories` page
- Select a repository that has been enabled with Auto-Scan
- Click the `Re-Run Autoscan` in the upper-right

Re-running an Auto-Scan job usually takes a few minutes. Look for the 'Completed' status to see your latest results.

## Customizing Auto-Scan using fairwinds-insights.yaml

Unlike the Insights CI integration, Auto-Scan does not require users to create a `fairwinds-insights.yaml` configuration file at the base of their Git repo. However, sometimes users may want to customize Auto-Scan behaviors for a specific repo, such as:
- Configuring specific exemptions
- Enabling/disabling specific scanning tools
- Scanning additional container images not present in your manifests

To customize Auto-Scan behavior, please review the [configuration options for `fairwinds-insights.yaml`](/configure/ci/configuration).

## Troubleshooting Auto-Scan

### Reviewing Auto-Scan Logs
Occassionally, you may run an Auto-Scan and it will return an error. You will see an Error status like this when you navigate to the `Repositories` page and click on a repo.
<img :src="$withBase('/img/autoscan-error.png')" alt="An Auto-Scan that has reported an error">

If you see this error, you can scroll to the bottom of the page and get detailed logs about the issue. 
<img :src="$withBase('/img/autoscan-logs.png')" alt="Auto-Scan logs provide details about errors generated during the scan">

### Helm Chart with invalid values file
