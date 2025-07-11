---
meta:
  - name: title
    content: Fairwinds Insights Release Notes
  - name: description
    content: "Fairwinds Insights | Release Notes. See what's new in the Kubernetes governance software. "
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
sidebarDepth: 1
---
# Release Notes

## 16.4.97 (2025-06-11)
### Bug Fixes and Enhancements
* Improve CVE report
* Add [UTM-Stack integration support](https://insights.docs.fairwinds.com/features/integrations/#utm-stack-beta)

## 16.4.91 (2025-06-05)
### Bug Fixes and Enhancements
* Remove TFSec report support

## 16.4.87 (2025-06-02)
### Bug Fixes and Enhancements
* Add Customer Dashboard support

## 16.4.79 (2025-05-23)
### Bug Fixes and Enhancements
* Trigger vulnerabilities sync when user access the Vulnerabilities page

## 16.4.67 (2025-05-16)
### Bug Fixes and Enhancements
* Add filter CI Action Items by labels and annotations

## 16.4.47 (2025-04-30)
### Bug Fixes and Enhancements
* Jira Basic Auth is broken because it can't create webhook
* Improve cluster and organization deletion flow

## 16.4.42 (2025-04-22)
### Bug Fixes and Enhancements
* Remove Mixpanel and event-track endpoint 

## 16.4.41 (2025-04-16)
### Bug Fixes and Enhancements
* Create admission settings for each org

## 16.4.39 (2025-04-15)
### Bug Fixes and Enhancements
* Remove support for aws-costs from Insights

## 16.4.31 (2025-04-08)
### Bug Fixes and Enhancements
* Add utility function to log Go runtime and environment variables

## 16.4.22 (2025-04-03)
### Bug Fixes and Enhancements
* Fix Additional Description is lost when the ticket is updated

## 16.4.21 (2025-04-02)
### Bug Fixes and Enhancements
* Fix selected Ticket Additional Description is not a valid JSON, it must comply with the Atlassian Document Format (ADF)

## 16.4.20 (2025-04-01)
### Bug Fixes and Enhancements
* Cloud costs failing for Autopilot

## 16.4.12 (2025-03-24)
### Bug Fixes and Enhancements
* API to download a CSV with policies enforced by Insights

## 16.4.5 (2025-03-18)
### Bug Fixes and Enhancements
* Jira webhook support

## 16.3.71 (2025-03-07)
### Bug Fixes and Enhancements
* Teams app groups: cluster overview is returning 404 for super admin

## 16.3.66 (2025-03-04)
### Bug Fixes and Enhancements
* Fix clusters > version is `N/A` for non-admin users
* Fix admission requests count API should respect all query params

## 16.3.53 (2025-02-20)
### Bug Fixes and Enhancements
* New Feature: Ticket Additional Descriptions

## 16.3.52 (2025-02-20)
### Bug Fixes and Enhancements
* Minor internal fixes

## 16.3.51 (2025-02-19)
### Bug Fixes and Enhancements
* Add support for team-management using AppGroups (beta)

## 16.3.50 (2025-02-14)
### Bug Fixes and Enhancements
* Improve database schema to support logical replication

## 16.3.49 (2025-02-11)
### Bug Fixes and Enhancements
* Improve Right-Sizing page load time

## 16.3.48 (2025-02-10)
### Bug Fixes and Enhancements
* Minor improvements on audit logs

## 16.3.47 (2025-02-10)
### Bug Fixes and Enhancements
* Fix event label some audit log events
* Fix executor on audit log for some system events

## 16.3.46 (2025-02-04)
### Bug Fixes and Enhancements
* Cluster deletion improvements
* Add more routes to re-auth flow

## 16.3.45 (2025-02-03)
### Bug Fixes and Enhancements
* Fix on monthly CVE email format.

## 16.3.44 (2025-01-31)
### Bug Fixes and Enhancements
* New Feature: Organizations may now enable require re-authentication for owner actions  
* Fix: SSO users should not be redirect to Survey

## 16.3.43 (2025-01-27)
### Bug Fixes and Enhancements
* New Feature: CVE Audit Log Monthly Report Email
* Improvements on Event Audit logs

## 16.3.42 (2025-01-23)
### Bug Fixes and Enhancements
* Add Settings > Audit Logs tab (owners only)

## 16.3.41 (2025-01-22)
### Bug Fixes and Enhancements
* Fix MSTeams integration channel retrieval
* Fix a bug where not all labels from Jira where pulled

## 16.3.40 (2025-01-17)
### Bug Fixes and Enhancements
* Remove kubesec from Insights Portal

## 16.3.39 (2025-01-16)
### Bug Fixes and Enhancements
* Fix bug when using labels to create action item lists
* Internal improvements [2]

## 16.3.38 (2025-01-15)
### Bug Fixes and Enhancements
* Internal improvements [1]

## 16.3.37 (2025-01-14)
### Bug Fixes and Enhancements
* Fix bug when trying to edit/delete OPA libraries
* Add new combo-box fields for Jira ticket provider

## 16.3.36 (2025-01-13)
### Bug Fixes and Enhancements
* Add auto-close code scan action items
* Increase CVE audit log retention [2]

## 16.3.35 (2025-01-09)
### Bug Fixes and Enhancements
* Improve error handling in the Insights Portal
* Fix bug when creating ticket inside image details

## 16.3.34 (2025-01-08)
### Bug Fixes and Enhancements
* Increase CVE audit log retention [1]
* Fix on vulnerabilities ticket creation

## 16.3.33 (2025-01-08)
### Bug Fixes and Enhancements
* Fix bug when creating tickets for images [3]

## 16.3.32 (2025-01-07)
### Bug Fixes and Enhancements
* Fix bug when creating tickets for images [2]

## 16.3.31 (2025-01-07)
### Bug Fixes and Enhancements
* Fix bug when creating tickets for images [1]

## 16.3.30 (2025-01-06)
### Bug Fixes and Enhancements
* Adjust x-axis for Cost Over Time card on Cost page

## 16.3.29 (2025-01-06)
### Bug Fixes and Enhancements
* Minor improvements

## 16.3.28 (2025-01-03)
### Bug Fixes and Enhancements
* Fix export CVEs by App Group visibility from image details page
* Fix on MS Teams integrations errors that prevented some messages to be send

## 16.3.27 (2025-01-02)
### Bug Fixes and Enhancements
* Added ticket column on vulnerabilities page

## 16.3.26 (2024-12-20)
### Bug Fixes and Enhancements
* Added new column `source` on images details CVEs

## 16.3.25 (2024-12-20)
### Bug Fixes and Enhancements
* Fix `QoS` selection on the right-sizer page

## 16.3.24 (2024-12-19)
### Bug Fixes and Enhancements
* Minor improvements

## 16.3.23 (2024-12-18)
### Bug Fixes and Enhancements
* Added `OPA-Lib` filtering differentiator

## 16.3.22 (2024-12-12)
### Bug Fixes and Enhancements
* Added warning of OPA v1 deprecation
* Restricted CVE report filter to 2 months

## 16.3.21 (2024-12-10)
### Bug Fixes and Enhancements
* Minor improvements

## 16.3.20 (2024-12-10)
### Bug Fixes and Enhancements
* upgrade daily and realtime notifications to support both slack and msteams
* Right-sizing: dynamically fit cpu and memory charts to window
* bump alpine to 3.21

## 16.3.19 (2024-12-05)
### Bug Fixes and Enhancements
* delete not specified cluster admission settings when ingesting settings.yaml
* add microsoft teams integration

## 16.3.18 (2024-12-04)
### Bug Fixes and Enhancements
* Introduced the ability to filter the CVEs generated report on date, status, and severity

## 16.3.17 (2024-12-03)
### Bug Fixes and Enhancements
* Jira/Slack ticket should link to new Right-Sizing page

## 16.3.16 (2024-11-27)
### Bug Fixes and Enhancements
* Upgrade CI image_version to 5.7

## 16.3.15 (2024-11-22)
### Bug Fixes and Enhancements
* Allow ticket to be Unassigned when creating a ticket
* Compliance Reports: Add option to create, view and unlink tickets

## 16.3.9 (2024-11-13)
### Bug Fixes and Enhancements
* Add 3 new checks to polaris

## 16.3.8 (2024-11-13)
### Bug Fixes and Enhancements
* Action Items report: multi Status Side-by-Side comparison

## 16.3.6 (2024-11-08)
### Bug Fixes and Enhancements
* fixed average nodes counting
  
## 16.3.2 (2024-11-05)
### Bug Fixes and Enhancements
* added ability to unlink tickets
* improved Capacity page performance

## 16.3.1 (2024-10-31)
### Bug Fixes and Enhancements
* add passivel-fail on admission requests graph

## 16.3.0 (2024-10-31)
* improve admission requests count to have PassiveFailCount

## 16.2.41 (2024-10-30)
### Bug Fixes and Enhancements
* Added passive fail filter support on admission controller page

## 16.2.40 (2024-10-18)
### Bug Fixes and Enhancements
* Improved App Groups Report performance
* 
## 16.2.39 (2024-10-18)
### Bug Fixes and Enhancements
* App Groups reports page clean up

## 16.2.38 (2024-10-17)
### Bug Fixes and Enhancements
* Improved CVE reports performance

## 16.2.35 (2024-10-15)
### Bug Fixes and Enhancements
* Added link to Download CVE report by App Groups
* Added export link to App Groups Reporting

## 16.2.34 (2024-10-14)
### Bug Fixes and Enhancements
* Added CVEs Audit log

## 16.2.33 (2024-10-10)
### Bug Fixes and Enhancements
* panic: ERROR: cannot accumulate arrays of different dimensionality (SQLSTATE 2202E)

## 16.2.32 (2024-10-10)
### Bug Fixes and Enhancements
* Right-Sie Page: show button should show if single workload is in filtered view
* Improve IaC Files linkback to repositories

## 16.2.30 (2024-10-08)
### Bug Fixes and Enhancements
* Implement IaC Files support on action items page
* Add list of values for IaCFiles on filter API 

## 16.2.29 (2024-10-07)
### Bug Fixes and Enhancements
* App Groups Reporting
* Expose iac files filters on action items API

## 16.2.28 (2024-10-07)
### Bug Fixes and Enhancements
* create cronjob to sync action items and iac files
* Save Action Items statistics by App Group

## 16.2.27 (2024-10-03)
### Bug Fixes and Enhancements
* Show SSO org indication and redirect to login via SSO using that org
* Implement API to de-link ticket from agent action-item

## 16.2.25 (2024-09-27)
### Bug Fixes and Enhancements
* Added a card and a link to the new Right-size page
* Added date picker on the Right-size page
* 

## 16.2.24 (2024-09-25)
### Bug Fixes and Enhancements
* Right-size: Added CPU and memory graphs
* Fixed Date filter on Automation Logs

## 16.2.22 (2024-09-20)
### Bug Fixes and Enhancements
* Implemented quality of service selection box
* Migrate Insights to Go 1.23
* Use Error field to enhance the unscanned_images action item

## 16.2.21 (2024-09-17)
### Bug Fixes and Enhancements
* Added Action Items filter by image, tag and sha

## 16.2.18 (2024-09-16)
### Bug Fixes and Enhancements
* Bug fix for auto closing tickets

## 16.2.17 (2024-09-11)
### Bug Fixes and Enhancements
* Support disabled param on PUT for custom OPA policies

## 16.2.16 (2024-09-10)
### Bug Fixes and Enhancements
* Fix Kyverno Action Items title

## 16.2.15 (2024-09-09)
### Bug Fixes and Enhancements
* Bug fix on dryRun should be checked before providers creating tickets

## 16.2.14 (2024-09-09)
### Bug Fixes and Enhancements
* add workloads and repositories links to image tickets
* improved admission requests performance

## 16.2.12 (2024-09-06)
### Bug Fixes and Enhancements
* fixed bug on creating manual lists

## 16.2.10 (2024-09-04)
### Bug Fixes and Enhancements
* Fixed start/end date for firstSeen on action-items page
* Clean up cost filter drop downs 

## 16.2.8 (2024-08-29)
### Bug Fixes and Enhancements
*  Fixed bug when creating ticket for list for azure
*  Kyverno: add support for old and new versions
*  Fixed bug in github integration

## 16.2.7 (2024-08-26)
### Bug Fixes and Enhancements
*  Added API do add/update/delete multiple Teams
  
## 16.2.5 (2024-08-21)
### Bug Fixes and Enhancements
* Date Range Selector Fixes

## 16.2.4 (2024-08-21)
### Bug Fixes and Enhancements
* Add new Qos Burstable+
* Add fields Reporter and Assignee when creating Jira ticket
 
## 16.2.3 (2024-08-19)
### Bug Fixes and Enhancements
* Improve admission action items App Group and Policy Mapping match visibility

## 16.1.31 (2024-08-08)
### Bug Fixes and Enhancements
* Costs: period selector has double border
* Costs: Updating dates on calendar does not change URL dates params unless Apply is clicked
* Tooltip is broken from some graphs: AI, Vulnerabilities and Dashboard
* Add [AppGroups to Automation Rules](https://insights.docs.fairwinds.com/features/automation-rules/#appgroups-associateship)

## 16.1.30 (2024-08-07)
### Bug Fixes and Enhancements
* Changed Export button on Costs page

## 16.1.29 (2024-08-06)
### Bug Fixes and Enhancements
* Added [OPA library and imports support](https://insights.docs.fairwinds.com/features/policies/#custom-policies-with-opa)
* Library regos should be shown differently on policies table 

## 16.1.26 (2024-07-29)
### Bug Fixes and Enhancements
* New users created via SSO can be assigned a default team
  
## 16.1.24 (2024-07-24)
### Bug Fixes and Enhancements
* Costs: Add "Last X days" to Costs Date Selector

## 16.1.20 (2024-07-18)
### Bug Fixes and Enhancements
* Pull OPA Policies into PolicyMappings UI
* Created default App Group and Policy Mapping

## 16.1.19 (2024-07-17)
### Bug Fixes and Enhancements
* repositories are not being counted on top APIs

## 16.1.18 (2024-07-16)
### Bug Fixes and Enhancements
* added support to batch snooze at Action Items page

## 16.1.17 (2024-07-15)
### Bug Fixes and Enhancements
* bug fix on Adding CI Code Scan
* support App Groups in Vulnerabilities

## 16.1.16 (2024-07-12)
### Bug Fixes and Enhancements
* added new parameter NetworkingLessThanInMB to costs APIs
  
## 16.1.15 (2024-07-12)
### Bug Fixes and Enhancements
* persist scan resources namespace and labels

## 16.1.14 (2024-07-10)
### Bug Fixes and Enhancements
* improved rate limiting

## 16.1.13 (2024-07-09)
### Bug Fixes and Enhancements
* not showing title on dashboard
* add last scanned filter on vulnerabilities page

## 16.1.12 (2024-07-01)
### Bug Fixes and Enhancements
* Fix on filter options in vulnerabilities page 
* Adding date picker filter on Action Items page
* Improved logs

## 16.1.11 (2024-06-28)
### Bug Fixes and Enhancements
* Add support for HPA min and maxAvailable checks

## 16.1.10 (2024-06-26)
### Bug Fixes and Enhancements
* improved capacity page performance
  
## 16.1.9 (2024-06-24)
### Bug Fixes and Enhancements
* added new parameter min days for resources recommendation
* improved S3 validation
* updated alpine to 3.20
  
## 16.1.8 (2024-06-21)
### Bug Fixes and Enhancements
* restricted CountryAlpha2 at User information endpoint to max 2 chars
  
## 16.1.7 (2024-06-18)
### Bug Fixes and Enhancements
* Improved admission requests page performance
 
## 16.1.5 (2024-06-18)
### Bug Fixes and Enhancements
* Fixed Total Costs at Pie chart for Costs page when filter returns no workload
 
## 16.1.4 (2024-06-17)
### Bug Fixes and Enhancements
* Improved admission requests data model

## 16.1.2 (2024-06-13)
### Bug Fixes and Enhancements
* Update filtering columns on vulnerabilities all images page

## 16.1.0 (2024-06-10)
### Bug Fixes and Enhancements
* Update minimum recommended memory to 64Mi

## 16.0.27 (2024-06-06)
### Bug Fixes and Enhancements
* [self-hosted] Add migration support for older Timescale version

## 16.0.26 (2024-06-05)
### Bug Fixes and Enhancements
* [self-hosted] Add migration support for latest RDS version

## 16.0.25 (2024-06-05)
### Bug Fixes and Enhancements
* [self-hosted] update Timescale migrations to be idempotent

## 16.0.23 (2024-06-04)
### Bug Fixes and Enhancements
* Add new query parameters support (`hasRepositories` and `hasWorkloads`) on all vulnerabilities top API

## 16.0.22 (2024-06-04)
### Bug Fixes and Enhancements
* Add `pdbDisruptionsIsZero` check to policies page
* Add fees to nodes total costs in Costs page 

## 16.0.21 (2024-05-29)
### Bug Fixes and Enhancements
* Support for contextualized filtering on cost filter API

## 16.0.18 (2024-05-22)
### Bug Fixes and Enhancements
* Add overhead costs support on Costs page
* Fix App Groups labels match/exclusion on admission context
* Add support to wildcard on Costs Page

## 16.0.15 (2024-05-14)
### Bug Fixes and Enhancements
* Update user's permission for organization creation (cont.)

## 16.0.14 (2024-05-14)
### Bug Fixes and Enhancements
* Fix bug on GitHub comments not considering Policy Mappings configuration
* Fix miss formatted cost in CI/CD Action Items

## 16.0.13 (2024-05-09)
### Bug Fixes and Enhancements
* Fix bug on cost APIs when using appGroups query param
* Add support for enabled/disabled policy mappings

## 16.0.11 (2024-05-06)
### Bug Fixes and Enhancements
* Bump github.com/go-playground/validator/v10 from 10.19.0 to 10.20.0

## 16.0.10 (2024-05-01)
### Bug Fixes and Enhancements
* Fix `Billed Cost Greater Than` filter handling on costs saved views API

## 16.0.9 (2024-04-30)
### Bug Fixes and Enhancements
* Add App Groups list of values on Costs filters API

## 16.0.8 (2024-04-29)
### Bug Fixes and Enhancements
* Add sorted list of values for App Groups filter on Action Items page

## 16.0.7 (2024-04-26)
### Bug Fixes and Enhancements
* Fix costs page when select hourly data
* Fix `Teams` drop down isn't filtering correctly on Action Items page

## 16.0.5 (2024-04-25)
### Bug Fixes and Enhancements
* Add App Groups filtering support on Action Items Summary page

## 16.0.4 (2024-04-23)
### Bug Fixes and Enhancements
* Improve load performance on App Groups summary page

## 16.0.3 (2024-04-22)
### Bug Fixes and Enhancements
* Fix costs `NaN` issues

## 16.0.2 (2024-04-22)
### Bug Fixes and Enhancements
* Add support for persisting CPU and memory idle info into node capacity history
* Fix `NaN` values in timescale
* Fix `GCP` cores cost calculation

## 16.0.1 (2024-04-19)
### Bug Fixes and Enhancements
* Fix some potential division by zero on `aws-cost` and `cloud-cost` report processing

## 16.0.0 (2024-04-18)
### Bug Fixes and Enhancements
* Fix a bug that prevented the setup of multiple basic-auth integrations
* Add `Billed Cost Greater Than` and `Efficiencies` filters to Costs page

## 15.7.1 (2024-04-15)
### Bug Fixes and Enhancements
* Add support for App Groups in Costs Saved Views

## 15.7.0 (2024-04-11)
### Bug Fixes and Enhancements
* Fix recommended CPU cost being $0.00 in some cases

## 15.6.4 (2024-04-08)
### Bug Fixes and Enhancements
* Add Policy Mapping names to App Group Summaries API
* Add support for App Groups filtering in Costs API
* Improve performance on Automation Rule Log page

## 15.6.3 (2024-04-04)
### Bug Fixes and Enhancements
* Fix on update rule API to only update `logsEnabled` field if explicitly set

## 15.6.2 (2024-04-03)
### Bug Fixes and Enhancements
* Improve loading time for vulnerabilities page

## 15.6.1 (2024-04-02)
### Bug Fixes and Enhancements
* Improve loading time for vulnerabilities page

## 15.6.0 (2024-03-29)
### Bug Fixes and Enhancements
* Fix for time range on costs page
* Fix for aggregating by label on costs

## 15.5.8 (2024-03-27)
### Bug Fixes and Enhancements
* Fix for app group action item counts
* Fix for cost saved views with labels
* Fix for event type aggregation in Action Item Reports

## 15.5.7 (2024-03-25)
### Bug Fixes and Enhancements
* Speed up for clusters page
* Style fix on addons page

## 15.5.6 (2024-03-22)
### Policy Mappings
You can now create Policy Mappings in the UI. Policy Mappings associate a set of policies
with App Groups, allowing you to fine-tune Action Item reporting and blocking
by resource and policy.

### Bug Fixes and Enhancements
* Fix for cluster switcher on Install Hub
* Improvements to Aggregated Action Items page (links, team filtering)
* Fix for repositories that report `HEAD` as the branch name
* Fix for filtering by team in Action Items
* Speed improvements to Clusters page

## 15.5.5 (2024-03-20)
### Bug Fixes and Enhancements
* Fix for API server memory usage 

## 15.5.4 (2024-03-20)
### Bug Fixes and Enhancements
* Fix redirect on Install Hub for old clusters

## 15.5.3 (2024-03-11)
* Rollback of 15.5.2

## 15.5.2 (2024-03-19)
### Bug Fixes and Enhancements
* Small fixes for App Groups
* Show resolution message in Admission Action Items
* Added monthly projected cost savings to right-sizing action items
* Improved repository summaries for repos without branch names
* Removed stale resource-metrics Action Items
* Fixed up cluster admission status display when org-wide settings are used

## 15.5.1 (2024-03-11)
### Bug Fixes and Enhancements
* Added a settings link to the Admission tab
* Improvements to ticket updating

## 15.5.0 (2024-03-07)
### Bug Fixes and Enhancements
* Moved link to Cost Settings
* Fix for empty graphs when there's not enough data on Costs page
* Major improvements to performance of the Vulnerabilities page

## 15.4.1 (2024-03-04)
### Bug Fixes and Enhancements
* Updates to third-party libraries

## 15.4.0 (2024-03-04)
### Bug Fixes and Enhancements
* Fix for multiple loads when the "clear" button is clicked on the Costs page
* Fix for default time period on Costs page
* Fix for AWS Costs status indicator
* Updates to Costs "Saved View" modal styles


## 15.3.4 (2024-03-01)
### List Ticket Auto-Updates
Tickets created in Jira, Azure DevOps, or GitHub that correspond to a list of Action Items
will now auto-update as the list of Action Items changes. The body of the ticket will
update to reflect the latest information about which Action Items still need to be addressed,
and will be closed when all Action Items are addressed.

### Bug Fixes and Enhancements
* Fix for viewing workloads that lack cost data
* Fix for datepicker on Costs page
* Added a "View Ticket" link for lists that have an associated ticket
* Removed "trends" from the Clusters page

## 15.3.3 (2024-02-28)
### Bug Fixes and Enhancements
* Fixed a bug that prevented new users from adding their first cluster
* Corrected node counts being sent to Datadog metrics

## 15.3.2 (2024-02-27)
### Bug Fixes and Enhancements
* Fixed bug that prevented respository deletion
* Added a `block` field to Policy Mappings
* Minor updates to the App Groups UI

## 15.3.1 (2024-02-23)
### CI resolutions
You can now resolve Action Items associated with a particular Infrastructure as Code repository.
This will prevent the Action Item from showing up in future scans. You can also "snooze" an
Action Item to mute it for a period of time.

### Bug Fixes and Enhancements
* Performance improvements for Admission page

## 15.3.0 (2024-02-20)
### App Groups
You can now create logical groupings of Kubernetes resources on the App Groups page. App Groups
can select resources by name, namespace, label, kind, cluster, or any combination of the above.
You can also use asterisks, like `kube-*`, to match a prefix.

We expect App Groups to become integrated into other features, like policies, costs, and team
management, in the near future.

### Admission Controller UI
We've moved the Admission Controller UI to the main navigation. You can also now
view admission requests across all clusters, instead of focusing on one cluster at a time.

### Clusters Page improvements
We've redesigned the Clusters page to show the current Kubernetes version, as well
as agent and admission controller status.

### Efficiency Scores
The Costs UI has a new column that displays efficiency scores for each workload. These
scores tell you how optimized a workload is, regardless of its overall scale.

## 15.2.1 (2024-02-15)
### Bug Fixes and Enhancements
* Fixed an issue with filenames in tfsec findings

## 15.2.0 (2024-02-13)
### Aggregated Action Items
There is a new **Summary** tab in the Action Items page, which can show you a breakdown of your action items
by cluster, namespace, report type, or other dimensions. This is a great way to see where you have the
most issues and where you're doing well.

### Bug Fixes and Enhancements
* Added description and remediation for `metadata.name` Polaris check
* Better logic to check if reports are enabled
* Fix UI crash on Repositories page

## 15.1.3 (2024-02-07)
### Bug Fixes and Enhancements
* Minor backend fixes

## 15.1.2 (2024-02-02)
### Admission Request Resolutions
Admission Request Action Items can now be marked as resolved in the UI.
If an issue is marked "will not fix" or "working as intended", that Action Item
will no longer block that workload going forward. You can also use "snooze" to
stop blocking for a set period of time.

### Bug Fixes and Enhancements
* Fix links from Costs to Action Items page

*Please see the [CHANGELOG for the Fairwinds Insights Agent Helm Chart](https://github.com/FairwindsOps/charts/blob/master/stable/insights-agent/CHANGELOG.md) for additional release notes.*

## 15.1.1 (2024-02-02)
### Bug Fixes and Enhancements
* Fix for freeze and repeated tooltip items on the Costs page
* Admission settings now show correct default for passive mode

## 15.1.0 (2024-01-30)
### Bug Fixes and Enhancements
* Fix for copying links in the Costs page
* Removed guided tour for first-time users
* Fix for mismatch between daily and hourly data in Costs page 

## 15.0.2 (2024-01-24)
### Bug Fixes and Enhancements
* Speed improvements for costs backend

## 15.0.1 (2024-01-24)
### Bug Fixes and Enhancements
* Fix for saved views when a cluster is selected
* Fix for incorrect "last scanned" date in vulnerabilities
* Fix an issue with cluster deletion

## 15.0.0 (2024-01-23)
### Bug Fixes and Enhancements
* Links to Action Items page now appear in Costs page
* Fix for cluster switcher when on admission controller page
* Fix for label aggregators in saved views
* Fix for unsaved pod labels

## 14.13.4 (2024-01-18)
### Bug Fixes and Enhancements
* Fix for links from action items to costs page
* Replaced `metadataAndNameMismatched` policy on the policies page with updated version

## 14.13.3 (2024-01-10)
### Bug Fixes and Enhancements
* Fix for date range on costs page

## 14.13.2 (2024-01-09)
### Bug Fixes and Enhancements
* Fix for container selector on costs page
* Improved speed when filtering by labels on costs page

## 14.13.1 (2024-01-02)
### Bug Fixes and Enhancements
* Fix for table borders
* Better error message for creating duplicate saved views

## 14.13.0 (2023-12-29)
### Bug Fixes and Enhancements
* Fix for "clear" button on costs page

### Costs: Saved Views
Users can now save any set of filters and aggregators on the Costs page as a "Saved View". This
allows you to easily revisit the same metrics at a later time, or share them with coworkers.

## 14.12.2 (2023-12-28)
### Bug Fixes and Enhancements
* Fix for dates on the costs page
* Redirect user after initial cluster install
* Fix for blank repository pages
* Fix for precision in workload cost settings

## 14.12.1 (2023-12-27)
### Bug Fixes and Enhancements
* Updated CI image version
* Fixed OPA policy template search
* Removed duplicate API calls
* Fixed links on report history page


## 14.12.0 (2023-12-26)
### Bug Fixes and Enhancements
* Allow use of space key in CI scan search box
* Fix org switcher on home page
* Changed fallback filename of "polaris.json" for CI scan findings with unknown filenames

### Repository scanning now only scans changed files on Pull Request
Fairwinds Insights has improved our CI/CD and Auto-Scan feature to scan only changed files as part of pull requests, rather than scanning all infrastructure-as-code (IaC) files within the entire repository. This will improve the developer experience so engineers only see findings for the files they have changed and responsible for.

For context, we've learned that oftentimes an IaC repo may contain files for many different teams and users. As a result, the developers don't want feedback for things they aren't able to fix. By only scanning changed files, developers get timely, actionable, and less overwhelming feedback.

## 14.11.1 (2023-12-20)
### Bug Fixes and Enhancements
* Fix for label filtering in the costs page
* Fixed an issue when retrieving historical report data
* Added `eventType` to the Action Items CSV export
* UI fixes for costs page
* Added ability to filter for modified files in CI scans

## 14.11.0 (2023-12-18)
### Bug Fixes
* Fix for cluster filtering on Action Items page

### Redesigned GitHub Comments
The GitHub Comment generated after Repo Scans has been redesigned to improve developer experience. Blocking issues are now highlighted at the top of the comment so developers know exactly what is causing a PR to fail. Additionally, developers can see which of their Action Items can be auto-fixed with Fairwinds Insights' Automated Fix PR functionality.

## 14.10.0 (2023-12-13)
### Link to Action Items from Resources Per Pod graph
Users on the Efficiency > Cost page can now quickly see the relevant Action Items for that workload when reviewing the Resources per Pod graph. This makes it easier to assign Action Items and create tickets for specific resource recommendations.

### Updates Burstable and Limited QoS Recommendtions
These updates should make workloads more reliable, and reduces the gap between Burstable and Guaranteed QoS recommendations. Please review the [Quality of Service](https://insights.docs.fairwinds.com/first-steps/cost-efficiency/#quality-of-service-qos-recommendations) page to see the updated formulas.

## 14.9.3 (2023-12-13)
* Fix for empty Resources Per Pod graph on costs page

## 14.9.2 (2023-12-07)
* Fix for password reset
* Fix for vulnerabilities links
* Fix for Slack digest errors
* Fix for network and storage costs

## 14.9.1 (2023-12-04)
* Fix for Action Items Reporting print view
* Fix for tooltip on capacity page

## 14.9.0 (2023-12-04)
* Improvements to costs UI, including a consolidated control row

## 14.8.4 (2023-11-22)
* Minor bugfixes

## 14.8.3 (2023-11-21)
* Minor bugfixes

## 14.8.2 (2023-11-21)
* Minor bugfixes

## 14.8.1 (2023-11-17)
* Fix for deleting Action Items when a report is uninstalled
* Updates to automation rule library

## 14.8.0 (2023-11-17)
* Improvements to Action Item lifecycle, including deletion

## 14.7.17
* Minor bugfixes

## 14.7.16 (2023-11-15)
* Minor bugfixes

## 14.7.15 (2023-11-15)
* Minor bugfixes

## 14.7.14 (2023-11-15)
* Minor bugfixes

## 14.7.13 (2023-11-15)
* Minor bugfixes

## 14.7.12 (2023-11-15)
* Minor bugfixes

## 14.7.11 (2023-11-14)
* `.git` suffix is now removed from repository names

## 14.7.10 (2023-11-14)
* Delete action items when a report is disabled
* Fix issue with Polaris severities

## 14.7.9 (2023-11-13)
* Fix for costs when a cluster is intermittently available
* Fix for Action Item severities

## 14.7.8 (2023-11-10)
* Minor bugfixes

## 14.7.7 (2023-11-10)
* Minor bugfixes

## 14.7.6 (2023-11-07)
* Ensure token is visible on "add repository" modal
* Added a last login column to the team management page
* Added title attributes to some fields on the Action Items table
* Better handling of Pluto findings when APIs are removed entirely
* Fix for Action Item severities

## 14.7.5 (2023-11-07)
* Fix for node names on cost settings page
* Added details for some falco checks

## 14.7.4 (2023-11-06)
* Minor bugfixes

## 14.7.3 (2023-11-03)
* Minor bugfixes

## 14.7.2 (2023-11-01)
* Minor bugfixes

## 14.7.1 (2023-11-01)
* Minor bugfixes

## 14.7.0 (2023-10-30)
### Bug Fixes and Improvements
* Updated the move icon throughout Insights
* UI polishes to the left navigation bar
* Fixed the badge colors on the `Policy` page
* Better loading mechanism for elements on the `Costs` page

## 14.6.0 (2023-10-24)
### Improved Reliability of Action Item Deletion and Reporting
Fairwinds has implemented additional improvements for deleting Action Items when that workload no longer exists in a cluster.
As a basic rule, Insights already tracks the lifecycle of Action Items, and deletes Action Items when a namespace disappears from a cluster. 

Now, for short-lived workloads, such as ephemeral Jobs and unmanaged Pods, the Action Items associated with those workloads will be deleted from the Action Item table, even if their namespace isn’t deleted. Previously, these Action Items would sometimes persist in the table (rather than get deleted), and get counted as “Fixed” within the Progress Reporting feature (available under Action Items > Reports page) – thus inflating the “Fixed” count. Handling of these scenarios has been improved.

Additionally, “Open” Action Items (e.g., fixed=false) that get deleted when a workload disappears will be properly counted as “Deleted” within the Progress Reporting feature. Action Items where true fixes have been made and verified will be marked “Fixed” (fixed=true) – ensuring developers still get credit.

In summary:
* For organizations with lots of Kind=Job or Pod workloads, these improvements may result in an immediate reduction of Action Items, but a more manageable experience / less “Action Item overload”.
* Progress Reporting data will be retroactively altered to account for the deleted items
* Going forward, the Progress Reporting feature will show more accurate / realistic Fixed and Deleted counts

### Bug Fixes and Improvements
* For organizations using basic auth in Jira, tickets will auto close when an Action Item is manually resolved or fixed 

## 14.5.0 (2023-10-24)
### Updated Costs Settings
New Costs Settings allows users to set their cost for Disk and Network which will make the Costs reflected
on the `Costs` page more accurate. Users can access these new settings by visiting `Efficiency > Costs` and
selecting the `Settings` in the top right.

### Bug Fixes and Improvements
* Changed the Total Cost chart in `Costs` to reflect percentages of the total cost
* Fixed the date range on the `Costs` page

## 14.4.0 (2023-10-17)
### Bug Fixes and Improvements
* UI polishes to Action Items Reports
* Small changes to the `Costs` page loading

## 14.3.0 (2023-10-12)
### Bug Fixes and Improvements
* UI polishes to the left navigation bar
* Removed Goldilocks report from `Install Hub` cards

## 14.2.0 (2023-10-11)
### Bug Fixes and Improvements
* Fixed sorting issues in `Costs`
* Updating some colors throughout Insights
* Fixed an issue which sometimes prevented Slack channels showing up on `Settings > Notifications` page 

## 14.1.0 (2023-10-10)
### Bug Fixes and Improvements
* UI polishes across Insights

## 14.0.0 (2023-10-03)
### CI/CD Action Items for Right Sizing
Action Items for right-sizing workloads are now available in CI/CD. 
You'll see one Action Item per cluster where the workload appears.

### Bug Fixes and Improvements
* UI polishes to the `Team Management` page
* Fixed default QoS for clusters
* Fixed `Cost Difference` sorting in `Costs`

## 13.13.0 (2023-09-29)
### Bug Fixes and Improvements
* Insights Agent 2.24 is now recommended in the `Install Hub`
* Fixed Slack integration

## 13.12.0 (2023-09-20)
### Action Items Report
Progress reporting enables organizations to easily view and share their achievements or
identify areas to improve with their teams or stakeholders. To view your organization's
progress, visit the `Action Items` page and click on the `Reports` tab.

### Consolidated Resource Recommendations
Decrease information overload and ticket creation with a single right-sizing recommendation per resource.

## 13.11.0 (2023-09-15)
### Kyverno Plugin
Organizations can now use the Kyverno plugin to convert their Kyverno background scan policy reports into Action Items. 
To see how to use the Kyverno plugin, visit the `Install Hub` page.

### Bug Fixes and Improvements
* Fixed ordering issues in the table of the `Costs` page
* UI change to the `Home` Top Issues chart

## 13.10.0 (2023-09-11)
### Bug Fixes and Improvements
* Fixed issue where sometimes the user would be taken back to the Install Hub page incorrectly
* UI polishes to the trend lines
* Fixed SSO page tab title

## 13.9.0 (2023-08-31)
### Bug Fixes and Improvements
* UI polishes and fixes to the Install hub page
* Fixed secondary nav disappearing on the Automation page on refresh

## 13.8.0 (2023-08-24)
### Bug Fixes and Improvements
* UI polishes across Insights
* Fixed bug in Cluster Overview page where switching clusters was not updating some information
* Fixed bug in the `Costs` page where in some instance, the Resources Per Pod chart would switch QoS settings

## 13.7.0 (2023-08-16)
### Network and Storage Costs
Provides a more complete picture of in-cluster spend by attributing network and disk costs.

### Bug Fixes and Improvements
* UI polishes across Insights
* Fixed the cost `Efficiency > Capacity` to show correctly based on range selected

## 13.6.0 (2023-08-10)
### Added Hourly Costs Data
Users are now able to see hourly data in the `Costs` page by selecting a time range of less than 3 days.

### Bug Fixes and Improvements
* Fixed small issue with the latest commits section on the `Repositories` page
* UI polishes to the `Danger Zone` page and `Action Items` charts

## 13.5.0 (2023-08-08)
### Pin a Cluster
We have added the ability to pin a cluster on Insights to only show information relevant to that cluster as users navigate to the
different pages. This allows users to focus on a single cluster while on Insights.

### Bug Fixes and Improvements
* Fixed issue with filtering on Repository branches

## 13.4.0 (2023-07-28)
### Bug Fixes and Improvements
* Insights Agent 2.23 is now recommended in the `Install Hub`

## 13.3.0 (2023-07-25)
### Bug Fixes and Improvements
* Fixed labels on bar charts
* Fixed multiple issues on the `Costs` page

## 13.2.0 (2023-07-19)
### Vulnerabilities Page Now Only Shows Main Branch for Repositories
Going forward, only vulnerable images from the main branch found during repo scanning will be reported on the `Vulnerabilities` page.
Previously, vulnerable images from all branches were reported. This update will streamline the number of findings to those most relevant.

### Bug Fixes and Improvements
* UI polishes and color changes throughout Insights

## 13.1.0 (2023-07-17)
### Bug Fixes and Improvements
* UI polishes and cleanup throughout Insights

## 13.0.0 (2023-07-07)
### Bug Fixes and Improvements
* Insights Agent 2.21 is now recommended in the `Install Hub`
* New Insights CI script 5.1
* OPA Policy Editor UI polishes
* Multiple UI and performance improvements to the `Costs` page

## 12.17.0 (2023-06-26)
### Prometheus-Metrics Will No Longer Generate Action Items for Pods
Action Items from prometheus-metrics will no longer be generated for Pod resource kinds. Some users may notice a dramatically
lower Action Item count as a result, which should make Action Items easier to manage and less overwhelming.
If you have individual Pods you need resource recommendations for, please follow these steps:
* Navigate to `Efficiency > Costs`
* Select Quick Views > Top Workloads
* Under the `Filtering` dropdown, select `Kind = Pod`
* Click on a workload to see the Resources per Pod graph

We are open to feedback on scenarios where Action Items for Pods are still necessary. If you have a user scenario you'd like to share,
please reach out to support@fairwinds.com so we can capture your feedback.

### Bug Fixes and Improvements
* Fixed minor navigation issues on the `Automation` page
* Removed the search for users when assigning an Action Item
* Fixed issue with SSO logins

## 12.16.0 (2023-06-20)
### Bug Fixes and Improvements
* Fixed issue where the country information was getting overridden when updating user information
* UI polishes for the compliance checks

## 12.15.0 (2023-06-12)
### New Polaris policies and changes to some default severities
The latest version of Insights Agent, 2.20.0, includes a newer version of Polaris, which adds the following policies:
* priorityClassNotSet
* metadataAndNameMismatched
* missingPodDisruptionBudget
* automountServiceAccountToken
* missingNetworkPolicy

Additionally, Insights Agent 2.20.0 change the default severity to High or Critical for the following existing Polaris policies:
* sensitiveContainerEnvVar
* sensitiveConfigmapContent
* clusterrolePodExecAttach
* rolePodExecAttach
* clusterrolebindingPodExecAttach
* rolebindingClusterRolePodExecAttach
* rolebindingRolePodExecAttach
* clusterrolebindingClusterAdmin
* rolebindingClusterAdminClusterRole
* rolebindingClusterAdminRole

While this provides even more visibility to the state of your Kubernetes health, the Policies that change the default severity to High or Critical may block some Admission Controller requests. If you need to mitigate this impact, Fairwinds recommends creating an Automation Rule that lowers the severity of those policies so it does not trigger blocking behavior. If you need assistance with this, please reach out to support@fairwinds.com.

> NOTE: As-of this release, the Install Hub continues to recommend Insight Agent 2.19, although Insights Agent 2.20.0 and newer versions are available from the [Insights Agent chart repository](https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent).

### Removed Workloads Page
The `Efficiency > Workloads` page has been officially deprecated and removed. Resource recommendations for workloads have moved to the `Efficiency > Costs` page.
To retrieve these recommendations, try the following:
* Navigate to `Efficiency > Costs`
* Select Quick Views > Top Workloads
* Click on a workload to see the Resources per Pod graph

## 12.14.0 (2023-06-07)
### Bug Fixes and Improvements
* Fixed cluster overview graph not loading
* Better feedback for user when Action Items list is created from table
* Better Action Items table experience with filters
* Updated RBAC permissions labels
* Fixed modal not closing after deleting SSO from organization
* UI polishes across Insights
* Fixed empty query list not loading

## 12.13.0 (2023-06-01)
### Bug Fixes and Improvements
* Action Item IDs are now searchable
* Insights Agent 2.19 is now recommended in the `Install Hub`

## 12.12.0 (2023-05-31)
### New Additional Fields for Creating Tickets
* Users are now able to provide additional fields when creating a ticket for an Action Item.

### Bug Fixes and Improvements
* Added additional information on what an automated compliance check is checking for in the cluster
* Various UI polishes across Insights

## 12.11.0 (2023-05-25)
### Bug Fixes and Improvements
* Multiple improvements to the `Costs` page
* Fixed discrepancies in the CI report
* Action Items table filters now only show applicable filters in dropdown
* UI Improvements to the `Integrations` page
* Fixed issue with reporting prometheus-metrics Action Items
* `Add Ons` page can now be exported to CSV

## 12.10.0 (2023-05-12)
### Official Launch of Costs
The Costs page has been officially launched. This replaces the previous `Workloads` page and adds a lot more functionality.
To check it out, visit `Efficiency > Costs` in Insights.

### Bug Fixes and Improvements
* Fixed `All Policies` table filters getting wrapped
* Removed the `Announcements` page
* Fixed breadcrumb navigation on vulnerabilities
* Added a `Select All` option to some filters in `Costs`
* UI polishes to the `Settings` in `Repositories`
* Multiple UI fixes in `Costs`
* Added `Last Scanned` column to the vulnerabilities table
* Multiple fixes to the `Compliance` report page
* Fixed bulk unassign function in Action Items

## 12.9.0 (2023-05-10)
### Bug Fixes and Improvements
* Fixed issues with the `Cost Settings` in `Costs`
* Changed the format of the `Quick Views` in `Costs`
* Captcha added after an unsuccessful login

## 12.8.0 (2023-05-05)
### Bug Fixes and Improvements
* Added a new workload dropdown in the `Costs` page
* Fixed `Workloads` Settings page

## 12.7.0 (2023-05-03)
### Bug Fixes and Improvements
* All users can now create and edit their own Action Items lists
* New Automated Compliance Checks

## 12.6.0 (2023-05-01)
### Bug Fixes and Improvements
* Minor UI changes to the `Costs` page
* Automated Compliance checks are now searchable
* Multiple UI polishes in the `Compliance` page
* Automated Pull Requests only show up on GitHub connected Repositories
* Trivy is now added automatically to Insights Agent installs for new clusters

## 12.5.0 (2023-04-26)
### Bug Fixes and Improvements
* Added `Last Scanned` column to the Vulnerabilities table
* Fixed missing entry in sign up flow
* Multiple improvements to the `Costs` page
* Automation Rules logs are off by default

## 12.4.0 (2023-04-20)
### Bug Fixes and Improvements
* Users will be able to see if logging is enabled for an Automation Rule from the `All Rules` page
* Additional information for the user signup
* Added a tooltip for the donut chart in `Costs`
* Fixed tab showing "undefined" when on the `Repositories` page
* Various UI fixes throughout Insights
* Indicate if a report is old on the `Costs` page

## 12.3.0 (2023-04-17)
### Enabling and Disabling Automation Rule Logs
Users can now enable or disable the logs for their Automation Rules. On the Automation Rule edit page, toggle the
`Logs` to enable or disable the logs for the specific rule.

### Bug Fixes and Improvements
* Various UI polishes throughout Insights

## 12.2.0 (2023-04-11)
### Bug Fixes and Improvements
* Minor UI fixes in the `User Settings` pages
* Fixed issue where sometimes the `Resources Per Pod` chart in `Costs` was blank

## 12.1.0 (2023-04-04)
### Bug Fixes and Improvements
* Many UI polishes and improvements throughout Insights

## 12.0.0 (2023-04-03)
### Bug Fixes and Improvements
* Fixed an issue with the Captchas on user register
* Small UI fixes in `User Settings`
* Fixed Auto-Scan logs sometimes showing multiple runs

## 11.13.0 (2023-03-29)
### New NSA Hardening Compliance Report
A new compliance report is added to the `Compliance` page to help organizations with their NSA Hardening Compliance.
Insights Agent will be able to automatically check some of the compliance checks for the NSA Hardening and for the remaining compliance checks, users
are able to mark the state manually.

### Bug Fixes and Improvements
* New look for the `Add Ons` page
* Fixed OPA policies not being blocked by admission controller
* New `Total Savings Available` in the `Costs` page
* Fixed and issue where somtimes not all filters showing up in `Action Items` table
* Removed `Cost Strategy` option from the `Costs` settings page

## 11.12.0 (2023-03-20)
### Automated PRs
We're excited to announce the launch of Automated Fix PRs!

With this new functionality, repositories setup using Auto-Scan will be able to open a Pull Request that fixes one or more Action Items in your infrastructure-as-code.

In order to achieve this, we've added permissions to our GitHub integration to write to repository contents.
This only applies to repositories you connect to Insights via GitHub, and will always occur on a separate branch -- enabling you to review fix PRs before deciding to merge.

Visit the [Github permissions](features/integrations#fairwinds-insights-github-application-permissions-required) to learn more.

[You can also learn more about Auto-Scan here.](features/infrastructure-as-code-scanning)

### Bug Fixes and Improvements
* Selecting a team in the Action Items table now shows correct Action Items
* Added a loading indicator in `Reports > History`
* Multiple fixes to the `Costs` page

## 11.11.0 (2023-03-13)
### Bug Fixes and Improvements
* Removed the `Set Up Insights` section from the `Home` page
* Minor UI fixes to the `Costs` page

## 11.10.0 (2023-03-08)
### Bug Fixes and Improvements
* Fix current usage and historical node capacity for cpu and memory in use
* Fixed filtering of OPA policies in the `Policy` page
* Small UI improvements to the `Costs` page

## 11.9.0 (2023-03-06)
### Bug Fixes and Improvements
* [Breaking] We released a fix for file references in the CI/CD script. You may see action items get fixed and re-opened in the first change using script 5.0. This will automatically roll out for auto-scan users.
* Fixed an error when visiting `Compliance` page when there are no reports
* Multiple UI improvements to the `Efficiency > Capacity` page
* The tooltip in `Efficiency > Capacity` now displays correctly

## 11.8.0 (2023-02-28)
### Costs [Beta] Page Updates
We're getting ready to take the Costs page out of beta! We've launched a few new features in preparation:
* A donut chart, to help contextualize the numbers as you filter and aggregate
* Quick Views, so you can jump to useful sets of filters and aggregators
* Recommendation visualizations, so you can see how our recommended memory and CPU settings might affect your workloads

### Bug Fixes and Improvements
* Fixed issue with resizing of columns in Action Items table
* Tooltip for Node capacity chart in Efficiency page has correct limits and requests
* Added Quick views to the costs page

## 11.7.0 (2023-02-22)
### Bug Fixes and Improvements
* Some UI improvements to the `Costs` page
* The `Compare` page was removed from the navigation bar. It is still available at `insights.fairwinds.com/orgs/{org}/compare`
* Added falco and right-sizer to the automation rules options
* Insights Agent 2.10 is now recommended in the `Install Hub`

## 11.6.0 (2023-02-15)
### Cluster Overview Page Improvements
The Cluster Overview page has many new improvements in this release of Insights. This includes changing
the behavior of the Action Items chart as well as adding new cluster level data. Users are now able to
get a quick idea of the overall state of their clusters by visiting this page.

### Bug Fixes and Improvements
* Users can now navigate to the Affected Images in the Vulnerabilities pages
* Fixed the node capacity chart not showing in the Efficiency page
* Users may now select their time zone by visiting the `User Settings > Region` page
* Fixed an issue with the `Table View` functionality on Action Items lists

## 11.5.0 (2023-02-07)
### Bug Fixes and Improvements
* Small improvements to the cluster overview page
* Fixed creating third party ticket flow
* Fixed Vulnerabilities - All Images page not loading for some organizations

## 11.4.0 (2023-01-31)
### Automated Compliance TLS for Ingresses
This compliance test can now be run automatically using Insights. Using polaris, Insights checks whether
all ingresses within the kubernetes cluster have TLS configured.

### Bug Fixes and Improvements
* New Sign Up flow for Insights

## 11.3.0 (2023-01-31)
### New CI Script 4.2
The new Insights CI script adds the ability to scan terraform files. Furthermore, the Auto-Scan
feature allows private image scanning.
For more information visit [Auto-Scan](features/infrastructure-as-code-scanning)

## 11.2.0 (2023-01-25)
### Bug Fixes and Improvements
* Improvements to the `Costs` page
* Fixed redirect of the `Upgrade` button for free tier
* Fixed editing of Compliance reports
* Removed the `Set up Insights` from Cluster Overview page

## 11.1.0 (2023-01-10)
### Bug Fixes and Improvements
* Fixed Admission Controller result dropdown
* Fixed Action Items list export sometimes not working
* Minor UI fixes

## 11.0.0 (2023-01-04)
### Bug Fixes and Improvements
* Fixed `Cost Over Time` chart in `Costs` page

## 10.12.0 (2022-12-27)
### Bug Fixes and Improvements
* Hide settings and add repository buttons from non-owners

## 10.11.0 (2022-12-21)
### Bug Fixes and Improvements
* Updated Insights welcome Email

## 10.10.0 (2022-12-15)
### Bug Fixes and Improvements
* Insights Agent 2.9 is now recommended in the `Install Hub`

## 10.9.0 (2022-12-12)
### Bug Fixes and Improvements
* Status indicator for Auto-Scan repositories takes user to scan logs
* Fixed order of Action Items in the Health Score card in `Clusters`
* Added the file name to the Action Items card in `Repositories`

## 10.8.0 (2022-11-29)
### Bug Fixes and Improvements
* Added more states to `Compliance` report checks
* Ability to filter compliance report checks by control IDs
* Fixed advanced filtering in Costs beta page

## 10.7.0 (2022-11-21)
### New Insights CI script 2.2.0
The Insights CI/CD script has been updated to better handle various Git checkout states,
improving reliability of CI/CD scans. Errors such as "unable to GIT merge-base" should be
reduced by upgrading to the latest version of the Insights CI/CD script. Customers who use
Insights Continuous Integration (CI) script can now scan Terraform files for security weaknesses.
This enables organizations to achieve greater Infrastructure-as-Code scan coverage. Please
note this feature is not yet available as part of Auto-Scan. To get the script,
navigate to Repositories > Add Repository > Connect Manually.

## 10.6.0 (2022-11-16)
### Bug Fixes and Improvements
* Users are now able to search for projects when creating a third party ticket
* New `Cost Over Time` chart in the new `Efficiency > Costs` beta page

## 10.5.0 (2022-11-09)
* No user-facing changes

## 10.4.0 (2022-11-03)
### Bug Fixes and Improvements
* List all open source projects used in Insights

## 10.3.0 (2022-10-24)
### New Costs Page - Beta
Fairwinds has released a beta version for the new `Costs` page. Organizations can use this page to get
a better understanding of the breakdown of their Kubernetes cluster costs. To check out this new page,
visit `Efficiency > Costs` in Insights.

### Bug Fixes and Improvements
* New `Notes` section in Action Item description
* Add ability to configure multiple email domains for SSO

## 10.2.0 (2022-10-19)
### Bug Fixes and Improvements
* Insights Agent 2.8 is now recommended in the `Install Hub`
* New `ID` column in the Action Items table
* UI indicates when a cluster is being deleted in `Danger Zone`
* Changed the filters on the `Fixed Version` column in `Vulnerabilities`

## 10.1.0 (2022-10-12)
# Auto-Scan Logs
Repositories that have Auto-Scan turned on will now see an `Auto-Scan Logs` section at the bottom of their
repository page. This will help users better debug issues with the Auto-Scan feature.

### Bug Fixes and Improvements
* `Label` column in Action Items cannot be sorted anymore
* Improvement to the SSO Login flow

## 10.0.0 (2022-10-05)
### Re-Run Autoscan
Users are now able to re-run the Insights scan on their branches if the repository is setup with Auto-Scan. To do so,
visit the `Repositories` page, select the repository and the branch and click the `Re-Run Autoscan` button.

### Bug Fixes and Improvements
* Fixed issue with creating tickets on Azure DevOps Scrum projects

## 9.13.0 (2022-09-28)
### Bug Fixes and Improvements
* Changed the filters on the `Recommended Tag` column in `Vulnerabilities`
* Users are no longer able to create compliance reports with the same names
* The `Log in with SSO` link will prompt the user for their organization name
* Fixed issue with Azure DevOps tickets not getting closed after Action Items are `Resolved` or `Fixed`
* Fixed right-sizer description

## 9.12.0 (2022-09-20)
### Close Third Party Tickets for Fixed and Resolved Action Items
When an Action Item has a GitHub, Azure DevOps or Jira ticket associated with it and the Action Item is
`Fixed` or `Resolved`, the third party ticket will automatically close.

### Bug Fixes and Improvements
* Improvements for loading the `Clusters` page faster
* Repositories that have Auto-Scan turned on will now have a scan status
* New version of Nova in Insights Agent 2.6.11 will create Action Items for out of date containers
* Fixed labels on `Top Issues` chart in `Repositories`
* Fixed export function for the `Vulnerabilities > All Images` table

## 9.11.0 (2022-09-14)
### Right-Sizer, AWS Costs and Falco
We have added the `Right-Sizer`, `AWS Costs` and `Falco` reports to the `Install Hub` page. The `Right-Sizer` report
can be added as usual using the `Quick Add` option under the report. However, the `AWS Costs` and `Falco` require more
configuration and the `Quick Add` option is not available for those reports. Instead you will be taken to the documentation
pages for those reports.

* [AWS Costs report] technical-details/reports/aws-costs
* [Falco report](technical-details/reports/falco)
* [Right-Sizer report](technical-details/reports/right-sizer)

### New NamespaceLabels and NamespaceAnnotations in Automation Rules
Users can now access namespace labels and namespace annotations for Action Items in Automation Rules. To access these values
use `ActionItem.NamespaceLabels` and `ActionItem.NamespaceAnnotations`.

### Bug Fixes and Improvements
* Users will find the following new information in the `Home` page:
  * Number of `Average Nodes L30D` (Last 30 days)
  * Number of `Custom Policies Set`
  * Number of `Custom Rules Set`
* Users can now set a different scale for the `Cluster Comparison` in the `Efficiency` page

## 9.10.0 (2022-09-08)
### Bug Fixes and Improvements
* When selecting the `Efficiency` page, the `All Clusters` view is always shown
* By default, the `Most Recent Data` is selected in `Efficiency`
* For new `Image has vulnerabilities` Action Items, the image is listed under the `Description`

## 9.9.0 (2022-08-31)
### Bug Fixes and Improvements
* Minor UI fixes throughout Insights

## 9.8.0 (2022-08-24)
### Bug Fixes and Improvements
* Nodes list in `Efficiency` page is now sorted by `Role` by default
* Fixed `Prometheus Collector` documentation link
* Fixed searching of nodes in `Efficiency` page
* `Node Capacity` memory chart in `Efficiency` now displays correctly
* Only organization `owners` are able to add new repositories to Insights
* Health Scores are now using the new TimeScale DB so health scores may differ slightly

## 9.7.0 (2022-08-17)
### New Azure DevOps Integration
The new Azure DevOps integration allows organizations to connect their Azure DevOps to Insights and create tickets
for Action Items manually or through Automation Rules. To learn more about the Azure DevOps integration
visit the [Azure DevOps documentation.](features/integrations)

### Bug Fixes and Improvements
* Fixed issue where repository names were being cut off in the `Repositories` page
* The `Name` column under `All Repositories` is now expandable

## 9.6.0 (2022-08-10)
### Bug Fixes and Improvements
* Fairwinds Insights `Details` link in public repositories redirects to the new `Repositories` page
* New Insights CI script version 2.1.0 recommended during the `Connect Manually` flow for adding repositories
* Captcha added for register and support pages
* The columns are now fully expandable in the `Action Items` table
* Fixed `Organization` dropdown in the left hand navigation when visiting the `User Settings` pages
* Fixed `ISO 27001` dropdown in the `Compliance` reports
* Insights Agent 2.6 is now recommended in the `Install Hub`

## 9.5.0 (2022-08-02)
### New Design of Vulnerabilities
We have redesigned the `Vulnerabilities` page in Insights. The new design enables teams to understand risk at a high level
and address those with the biggest impact. The `All Images` tab allows organizations to see which images are at a higher risk
while the `All Vulnerabilities` tab helps users determine if they have been impacted by certain vulnerabilities.

### Pluto in Admission Controller
Pluto has been enabled in the Admission Controller. Admission requests will create low and medium severity Action Items
if deprecated or removed Kubernetes resources are used. To learn about how to configure reports in the Admission Controller
visit the [Install Hub and Policies documentation.](features/admission-controller)

### Bug Fixes and Improvements
* `Settings` button in `Repositories` allows easier access to enable/disable Auto-Scan
* The Action Items table in `Repositories` now has a `File Name` column
* The top left Cluster dropdown has been fixed on several pages

## 9.4.0 (2022-08-01)
### Bug Fixes and Improvements
* Passwords for new users require numbers, letters and symbols

## 9.3.0 (2022-07-21)
### Bug Fixes and Improvements
* Code copy works properly now when selecting `Connect Manually` in `Repositories`
* Fixed errors in `Efficiency > Workloads` page when charts are empty
* Fixed Auto-Scan toggle in `Repositories`

## 9.2.0 (2022-07-20)
### Bug Fixes and Improvements
* `Event ID` in the Action Items table is now `Event Type`
* In the Clusters Overview page, `Insights Version` was changed to `Agent Version`

## 9.1.0 (2022-07-13)
### Bug Fixes and Improvements
* Updated recommended Insights Agent version to 2.4
* `Viewers` are now able to see the `Logs` in `Automation`

## 9.0.0 (2022-07-07)
### Bug Fixes and Improvements
* Fixed link to vulnerability for Jira tickets
* Added description and remediation for `Only one replica is scheduled` Action Item
* OPA policies now have the correct `Event Type`

## 8.12.0 (2022-06-29)
### Bug Fixes and Improvements
* Improved accessibility throughout Insights
* Added an Export option for Repository Action Items
* Fixed links to documentation

## 8.11.0 (2022-06-22)
### Bug Fixes and Improvements
* `Clusters` page loading improvements

## 8.10.0 (2022-06-15)
### New Design of Policy Page
We have redesigned the `Policy` page in Insights. The `Policy` page will now show a list of all Policies that come as part of Insights
as well as any OPA policies added by users. Users are now able to see the severity of every Policy as well as whether they will currently
block admission requests or the CI/CD pipeline. Furthermore, users are now able to set these values 
[using the Insights CLI to customize Policies](https://insights.docs.fairwinds.com/features/insights-cli) to their needs.

### Insights CI Script 2.0
A new Insights CI script is available for our users to use in their CI/CD pipelines. The new 2.0 Insights CI script will now block admission
requests and CI/CD pipelines according to the values set in the Policy for `Admission` and `CI`.
Users
[using the Auto-Scan feature](https://insights.docs.fairwinds.com/features/infrastructure-as-code-scanning/) will automatically use this new script version.
The 2.0 script also defaults to blocking only on Action Items that have `High` or `Critical` severity.

### Bug Fixes and Improvements
* Workloads can now be exported even when filtered
* Fixed the display of Admission Controller chart when displaying percentages

## 8.9.0 (2022-06-08)
### Creating New Policies in Insights Using OPA v2
When creating new Policies using the Insights UI, we will be using OPA v2. The biggest change here is a YAML instance is no longer
required. All v1 Policies will continue to work, and are still able to be edited from within the Insights web UI.
OPA v2 is only available with [Insights Agent 2.x](https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent#version-20).
To learn more about the differences between OPA v1 and v2,
check out [V1 and V2 Insights OPA Policies](https://insights.docs.fairwinds.com/features/policies/#v1-and-v2-insights-opa-policies)

### Bug Fixes and Improvements
* Deleting a cluster now requires typing in the cluster name before confirmation
* Fixed missing `Name` field and duplicated `Namespace` field when exporting Action Items
* Improvement to Pluto Action Items description and titles

## 8.8.0 (2022-06-03)
### Bug Fixes and Improvements
* Added instructions for setting up CI integration for different platforms
* Removed nodes that were showing blank in the Node Capacity chart
* Fixed issue with the contact form
* Updated Insights CI script

## 8.7.0 (2022-05-24)
### CSV Export of NSA Hardening Guidance
Users are now able to export a report guiding their clusters towards NSA hardening. This report will show the NSA policy, the
relevant Insights check and the number of Action Items that require resolving. In order to obtain the report, go to the
`Action Items` page, select a cluster from the top left drop down and click the `Export > Export NSA Report` button.

### Bug Fixes and Improvements
* Fixed ordering of Top Issues chart in `Repositories`
* Improvements to make the Cluster Overview page load faster

## 8.6.0 (2022-05-17)
### Bug Fixes and Improvements
* New background for login pages
* Fixed popups getting cut off when hovering over `Top Issues` chart in `Home`
* Some workload metrics were showing `N/A` incorrectly

## 8.5.0 (2022-05-10)
### Introducing Auto-Scan for Infrastructure as Code
Fairwinds is upgrading the GitHub integration and making new infrastructure-as-code scanning capabilities available to all customers.
Please note that existing users of our GitHub integration may be prompted for an additional permissions request from GitHub.
If you choose to accept these permissions, the following new features will become available:

**Auto-Scan for Infrastructure-as-Code**

[Auto-Scan](https://insights.docs.fairwinds.com/features/infrastructure-as-code-scanning/) enables organizations using GitHub to enable infrastructure-as-code scanning across multiple repositories without having to
configure individual CI pipelines. Scans can be initiated on every pull request on any GitHub repo, and will use the
Fairwinds Insights SaaS infrastructure to run the checks.
* This eliminates the need to configure individual CI pipelines, allows organizations to save on compute resources,
and turns on "shift left" infrastructure-as-code testing in minutes.

* Of course, any existing CI pipelines that are configured will continue to operate normally.
If you decide that Auto-Scan is not for you, no problem — simply choose "Connect Manually" when prompted to add a new repository.
This will provide the option of running scans in a CI pipeline on your own infrastructure and does not require GitHub permissions.

**Automated discovery of infrastructure-as-code files**

Now, using the new permissions, Fairwinds will automatically locate Helm and YAML files that are available for scanning within your
GitHub repositories. This avoids the need to specify the exact location of Helm and YAML manifests in a fairwinds-insights.yaml file
at the root of your repository.

**Scan results posted GitHub Comments**

Using the new permissions, Insights will also post scan results as GitHub comments, keeping developers within their workflow.

**Enhanced Repositories UI**

The Repositories UI has been enhanced to support Auto-Scan and our latest UX standards.

These new features are available to all customers, and accepting the permissions is optional.
If you choose not to accept the permissions, Auto-Scan will not be available, but users can still adopt infrastructure-as-code
scanning by integrating Insights into their their existing CI/CD systems.

### Bug Fixes and Improvements
* Fixed various documentation links across Insights
* Faster loading of cluster overview page

## 8.4.0 (2022-05-04)
### Bug Fixes and Improvements
* UI improvements to the Efficiency pages
* Fixed issue where sometimes Nodes were being duplicated in the Nodes Capacity chart
* Fixed node names in the Nodes Capacity chart
* Corrected the colors on the Nodes Capacity chart
* Open source repos should now load in the Repositories page
* Cluster pages will load faster

## 8.3.0 (2022-04-28)
### Bug Fixes and Improvements
* Fixed memory difference showing `0 (N/A)` if the difference is too large
* Links to Action Items table are now working
* Clicking the `All Clusters` option from the dropdown goes to the correct page
* Fixed un-assigning and un-snoozing Action Items
* Choosing multiple filters on the Action Items table now shows correct results

## 8.2.0 (2022-04-20)
### New Insights Agent 2.0
We're excited to announce version 2.0 of our Insights Agent!

This new release comes with some small breaking changes to improve the usability of the Helm Chart. While your existing 1.x
installation will continue working as expected, you may need to change your `values.yaml` when upgrading to Agent 2.0.
There are also some minor changes to Admission Controller and CI behavior that will take place when updating to a new version.
[Here is a list of breaking and behavior changes](https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent#version-20)

### Bug Fixes and Improvements
* Fixed an issue with the `Contact Us` page when not logged in
* New Clusters can be created with the same name as a previously deleted Cluster (Clusters deleted prior to 8.1.0 release)

## 8.1.0 (2022-04-13)
### New Cluster and Node Costs
This new page allows users to quickly visualize how much resources they are using compared to what is available. This is a great
tool to help users identify clusters that are under or over utilized. Users in the organization can compare resource utilization
between all their clusters and view the costs associated with each one. Furthermore, they can understand the resource utilization
of each node within a cluster. The new page can be found under `Efficiency > Capacity`

### Bug Fixes and Improvements
* Users are now able to create a cluster with the same name as a previously deleted cluster

## 8.0.0 (2022-04-05)
### Bug Fixes and Improvements
* Fixed JIRA integration not staying authenticated
* Fixed issue when creating JIRA tickets for some Action Items
* Added `Report` column to the Automation Logs
* Improved Trivy recommendations
* Loading indicator now works properly in the Automation Logs

## 7.15.0 (2022-03-29)
### Bug Fixes and Improvements
* Saved Lists in the Action Items table will now populate correctly
* Moved the **STATUS** column further left in the Automation Logs
* Fixed navigation issues resulting in 404 errors
* Fixed Slack messages incorrectly stating Prometheus is offline

## 7.14.0 (2022-03-23)
### Bug Fixes and Improvements
* Owners of organizations are now able to remove SSO for Insights through the UI
* UI fixes for the Automation Logs page
* Updated how some columns get displayed in the Action Items table

## 7.13.0 (2022-03-16)
### Automation Rule Logs
We've added a tab to the Automation Rules page which shows logs for your Automation Rules.
This makes it easier to debug Automation Rules e.g. by adding `console.log` statements, or
seeing any runtime errors.

### Suggested Image Upgrades
Trivy will now search for available updates in the source repo which would resolve the CVEs
present in the currently-installed image. You'll find these recommendations in the **Remediation**
text within Trivy Action Items.

You'll need to update to the latest version of the Insights Agent (`1.17.28`) to get this functionality.

### Bug Fixes and Improvements
* Some fixes for adding/updating Action Item Lists
* Trivy now allows passing in the `--ignore-unfixed` flag
* Automation Rules are more robust to runtime errors

## 7.12.0 (2022-03-08)
### Ability to Block Access for Teams
Owners of organizations are now able to block teams from accessing specific Clusters, Namespaces and Respoitories within Insights. Members of
teams with specific blocked access will no longer be able to see the Clusters, Namespaces and Repositories in the blocked list.

### Bug Fixes and Improvements
* Action Items can now be closed using the `Esc` keyboard button
* All Clusters on the **Home** page show without scrolling
* Better performance when using search on the **Workloads** page
* Fixed navigation issue for when the left Navigation Bar is collapsed

## 7.11.0 (2022-03-03)
### New Insights Status Page
Users can use this page to track the status of Insights. If we are experiencing wide spread issues, we will
keep our users informed through this page. The new status page can be found under the **Help** items.
[Fairwinds Status Page](https://fairwindsops.statuspage.io/)

### Search by Label on Workloads
Users can now search workloads based on labels. On the Efficiency > Workloads page, use the Search functionality
to search for desired labels. Example: `app=myApp` 

### Bug Fixes and Improvements
* Many UI improvements and fixes across Insights
* Description is now added when Action Items are exported to CSV
* Users will be asked to choose an organization before being presented the navigation menu

## 7.10.0 (2022-03-02)
### Updated Fairwinds Insights Terms and Conditions
Fairwinds has renamed the Customer Agreement to **Fairwinds Insights Terms and Conditions**. In addition, the Terms and Conditions have been updated.

### Bug Fixes and Improvements
* Improvements to the cluster navigation
* Better user message when first accessing the Efficiency page
* Top logo will now redirect to the **Home** page
* Fixed navigating to Action Items page from an external link
* The cluster list on the **Home** page is now scrollable

## 7.9.0 (2022-02-24)
### Navigation Improvements
**A consistent navigation experience across the app** 
* No more dynamically changing navigation when users switch from the Organization View -> Cluster View

**Introducing the Efficiency page**
* A new home for the **Workloads** page
* A placeholder for future Cost Optimization and Reporting enhancements

**Finding Action Items**
* Easy toggle to look for Action Items for a single cluster, or for the entire Organization from a single page

[Watch the video showing off the new navigation](https://www.youtube.com/watch?v=zrBkTWo2PsI)

## 7.8.0 (2022-02-22)
### Bug Fixes and Improvements
* Added Recommended Limits and Recommended Requests visuals to CPU and Memory charts in workloads
* UI Improvements to the Admission Controller chart
* Sorting by First Seen and Last Reported on Action Items table now works properly
* Refreshing the page does not remove the filters on the Action Items table

## 7.7.0 (2022-02-16)
* No user-facing changes

## 7.6.0 (2022-02-14)
### Bug Fixes and Improvements
* Faster load times for Action Items and Vulnerabilities pages

## 7.5.0 (2022-02-09)
### New Single Sign-On Settings Page
Owners of Organizations can now setup SSO for Insights through the UI. Setting up SSO requires a valid Metadata URL and Email Domain. Furthermore, Organizations
will be able to enforce the use of SSO through Insights.

### Snoozing of Action Items
Users are now able to **Snooze** Action Items for a fixed period of time (1 month, 1 week, or 1 day). This will set the Action Item Resolution to **Snoozed**. Users can take advantage of this feature for Action Items
that require remediation but are not an immediate priority. 

### Bug Fixes and Improvements
* The **Create Ticket** button will no longer display a JIRA error if JIRA is not set up
* Fixed an issue where Action Items were not displaying correctly upon selecting a Saved List
* Admission requests times are now shown using local time
* The Support button now directs users to our **Contact Us** page
* Fixed an issue where Action Items charts were not displaying correctly for specific filters

## 7.4.0 (2022-02-02)
### Bug Fixes and Improvements
* We've updated the Insights Agent with some minor improvements and fixes
* Fixed creating JIRA tickets from the Action Items table
* Admission Controller UI improvement and fixes

## 7.3.0 (2022-01-26)
### Bug Fixes and Improvements
* Fixed issue where duplicated PagerDuty incidents were being sent out
* Admission Controller search will no longer cause admission requests to disappear
* UI improvements in Admission Controller

## 7.2.0 (2022-01-24)
### Admission Controller Redesign
Users will notice a completely new design for the **Admission Controller** page. This page now has a chart so users can quickly see the number of successful
and failed admission requests for their clusters during a specific Time Range. The Action Items for each failed admission request will appear on the right side in
a table format.

### Bug Fixes and Improvements
* Users can no longer create a Compliance report without a name
* Changing cost difference colors in the **Workloads** page for better accessibility

## 7.1.0 (2022-01-19)
### Bug Fixes and Improvements
* After updating a Policy, the page will remain on the Policy page
* Updating Trivy to 0.22.0
* Updating Insights CI script to new version 0.6.1
* Overall improvements to make pages load faster

## 7.0.0 (2022-01-11)
### Bug Fixes
* Better error messages when a repository is already scanned as part of another organization
* Fixed link issue when creating a ticket for an Action Items list
* Report type badges now have different colors
* Action Items table would incorrectly show all Action Items when selecting an empty list
* Workload page no longer shows an error when opened by an owner
* UI improvements across Insights

## 6.11.0 (2022-01-05)
### Action Items Charts
The **Action Items** pages in Insights now have charts that visually categorize the Action Items by Severity, Top Issues, Top Namespaces and Top Workloads. Users are
also able to filter the Action Items table by clicking on the items in the charts.

### Bug Fixes
* Out of date Insights Agent Slack messages now show which clusters are out of date
* Issue with Insights Agent Fleet install
* Some trivy vulnerabilities were not showing in the detailed vulnerability page
* The Automation Rule **ignore-system-namespaces** (created automatically by Insights) now has **Context** set to **Agent**

## 6.10.0 (2021-12-27)
* No user-facing changes

## 6.9.0 (2021-12-22)
### New Compliance Feature
This feature allows Organizations to create Compliance Reports for their clusters. Organizations can keep track of their SOC 2, HIPAA and ISO compliances by creating
reports and taking the self assessments for each check. During the self assessments, users can provide evidence on how they are adhering to each check.
The full report can also be downloaded as a PDF at any time.

### Configure the Admission Controller
Users are now able to configure settings for the Admission Controller through Insights. The Admission Controller can be set to Passive Mode which will perform the usual
checks but will not block any admission requests. Furthermore, users are able to choose which reports should block admission requests. These settings are accessible to
the Organization's owner when they visit the **Install Hub** and click on **Admission Controller**.

### Bug Fixes
* The Slack **Notifications** page will now show which Slack channels are used for a cluster's notifications once a cluster has been selected
* Issue with Policy creation through **Create From Template**
* Issue with deleting some Automation rules

## 6.8.0 (2021-12-14)
### Bug Fixes
* Users were unable to create JIRA tickets for some Action Items
* Added consistency across badges within All Repositories
* Fixed PagerDuty integration

## 6.7.0 (2021-12-08)
### Admission Controller Kubernetes 1.22 Support
Admission Controller was updated to support kubernetes 1.22. Users running kubernetes 1.22 on their clusters are now able to use Admission Controller in their clusters.

### Bug Fixes
* Query list sometimes would show incorrect filters when creating a list from the table
* Tooltip added to the cost settings in the workload page for the different QoS settings

## 6.6.0 (2021-12-02)
### New Action Items Table and Lists
Users will find the new `Action Items` page under their Organization's navigation bar as well as under a specific Cluster's navigation bar.
The page includes a completely redesigned version of our Action Items table with a couple of new features such as hiding and showing table columns.
Users will also be able to create lists with Action Items. Lists can be used for keeping track of important Action Items and any progress made resolving them.

### New Automation Rule Created By Default
A new Automation Rule is created which will mark Action Items in certain namespaces with a `Won't Fix` resolution. This rule will be disabled by default for existing organizations but enabled
for new organizations.

### Bug Fixes
* Policies without an instance had issues loading and being edited
* Only admins and editors of Clusters are now able to change the QoS of workloads
* Vulnerabilities that have fixes available can now be filtered correctly

## 6.5.0 (2021-11-23)
### Admission Controller events now include username of who made the deployment
When users navigate to the Admission Controller page, they will see events that include the name of the user who made the deployment. This helps Cluster Administrators who support multiple teams/users within a cluster to understand who made a particular deployment.

### Base Image information now available in Image Vulnerability Action Items
Insights now detects the Base Image layer for Image Vulnerabilities. You can find this information in the Action Item description for Image Vulnerabilities. This helps Developers quickly determine which Base Image they are running, so they can check if a newer version is available with fixes for any reported CVEs.

### Bug Fixes
* Faster loading time for the Organization dashboard
* Various UI improvements across Insights

## 6.4.0 (2021-11-11)
### Enable and Disable Admission Controller Passive Mode
Users are now able to enable and disable Passive Mode for the Admission Controller through the API. 
[Learn more about the Admission Controller Passive Mode](https://insights.docs.fairwinds.com/features/admission-controller/#installation)

** Starting from this release, the Admission Controller is set to Passive Mode by default for any new clusters **

### Agent v1.15
We've updated the Insights Agent with some minor improvements and fixes.

## 6.3.0 (2021-11-03)
### Scanning Remote Helm Repositories
Organizations will now be able to scan charts from remote helm repositories for issues. By providing the `name`,
`repo` and `chart` in the `fairwinds-insights.yaml` file, Insights will be able to download the chart from the remote
repository and run appropriate scans.

### Bug Fixes
* Modifying an Automation Rule now shows which user updated it and when it was updated
* Passing Action Items were missing from the Health Score card

## 6.2.0 (2021-10-29)
### Bug Fixes
* The "Log in with SSO" link did not redirect correctly for some organizations
* Inconsistent count for Action Items on the cluster overview page 

## 6.1.0 (2021-10-22)
### New Prometheus Action Items
The Prometheus Collector report will now generate Action Items based on workload metrics. 

### Bug Fixes
* Faster loading time of clusters table in organization dashboard
* Various UI improvements across Insights

## 6.0.0 (2021-10-06)
### Renaming Navigation Bar Items
Some Navigation bar items have been renamed. We've changed Report Hub to Install Hub, Repos to All Repositories,
and Clusters to All Clusters.

### Bug Fixes
* Main Repositories page still used old Action Items badges
* Admission Controller items wouldn't load after collapsing
* Links under the history bar graph on the Cluster Overview page were broken

## 5.7.0 (2021-09-29)
### PagerDuty Integration
Organizations can now setup the PagerDuty integration to automatically send incident events from Insights.
[Learn more about the PagerDuty Integration](https://insights.docs.fairwinds.com/features/automation-rules/#pagerduty-incidents)

### Bug Fixes
* Team Management displays a better error when inviting a user that is already part of the organization

## 5.6.0 (2021-09-22)
### Quality of Service for Workloads
The new Quality of Service (QoS) parameter allows users to indicate the importance of their workloads and have
Insights recommend resources based on this parameter. From highest to lowest importance the values are
Critical, Guaranteed, Burstable and Limited.

### Bug Fixes
* The Action items count for a cluster no longer include passing Action Items in the Organization dashboard
* Action Items table was not correctly filtering based on resolution
* UI fixes on the organization dashboard

## 5.5.0 (2021-09-09)
### New Organization Dashboard
A new Organization Dashboard is now available in Insights! The dashboard allows users to see how their
organization is doing in a quick glance. See a high level status of each of their clusters, top organization
issues, the overall health of the organization and more!

### New Action Item Severities
We've introduced more granularity to Action Item severities. The new severities are Critical, High, Medium,
Low and None. This will help users distinguish which items are more important and should be tackled first.

### Automatic Rollback When Installing the Agent
The `--atomic` option is now used when installing the Insights Agent. This will automatically rollback the upgrade
if the Agent fails to install.

### Bug Fixes
* Users would show up as "Pending" when being added to a team even if they were part of the organization
* Users would not show up in the correct tabs in Team Management
* All projects in Jira would not show up in Insights
* Jira integration would not show correct status in the Settings page
 
## 5.4.0 (2021-08-25)
### Bug Fixes
* Used “last seen” instead of “first seen” to count fixed Action Items. Fixed action item numbers are more accurate now
* Previous channel selected didn't display when searching for a different slack channel
* Users could not delete repositories
* Issue occurred when enabling SAML
[Learn More About SAML Integration](https://insights.docs.fairwinds.com/installation/sso/about/)

## 5.3.0 (2021-08-11)
### Team Management
We launched a new interface and API for managing teams within your organization. Within an organization,
you can create multiple teams, each of which has access to a particular set of clusters, namespaces, and repositories.
Members of those teams can be assigned a specific role to limit the actions they can take on those objects.

This is a great way to limit access to sensitive information, and to get the right information in front of the right
people. [Read more in the docs](https://insights.docs.fairwinds.com/features/team-management//)

### Agent v1.14
We've updated the Insights Agent with some minor improvements, including better support for Kubernetes 1.21 and the latest plugin updates.

## 5.2.0 (2021-07-28)
### Updated Settings
We’ve made some changes to settings. First, we’ve introduced User Settings which is the place to update any personal user information or password updates. Second, we’ve consolidated organization and cluster settings into one place.

### Token Revocation
We made it easier to regenerate, provision, and manage tokens. To make any future token changes find this capability under Tokens within settings.

### Updated Digest Email and Slack Notifications
We’ve updated the digest emails and Slack notifications to include warnings when charts are out-of-date.

### Bug Fixes
* User wasn’t able to open up the Cost Settings page. We now display a toast when non-admins attempt to navigate to that section of the application
* Users weren't allowed to create tickets on the vulnerability page
* Issue with how duplicate reports are displayed on the report history page

## 5.0.0 (2021-06-30)
### SAML Capabilities - Beta
We are happy to announce we now offer SAML capabilities! Contact us if you want to try it.
[Learn More](https://insights.docs.fairwinds.com/configure/sso/setup/)

### Save Views in Action Item Table
You can now save filtered views on the Action Items table. Use the star button at the top of the table and assign the view a name. You will then be able to access that view in the future without needing to re-select filtering options.

### Navigation Scroll Bar
We added a scroll bar to repositories and clusters options in the navbar to improve usability.

### Improved Error Message Handling in the UI
We updated how we handle presenting error messages. We now allow users to explicitly dismiss the notifications and increased the amount of time we display the message. This way, users have more time to read the error or ignore it more quickly.

### Bug Fixes
* Information wasn’t showing up under remediation for Polaris Action Items
* Superusers could not see Action Items in kube-system. We also fixed a bug where some Action Items were hidden for non-admins on commonly named namespaces

## 4.4.0
### Better Install Hub Syncing
Most of our users encode their insights-agent installation in Infrastructure-as-Code,
rather than copy/pasting the `helm install` instructions provided in the Insights UI.
Now, if you make a change in your Helm installation, the UI will incorporate those
changes automatically.

### Sort/Filter by Ticket Creation
You can now sort and filter Action Items by whether a ticket has been created or not.

### Fixes for Admission Controller
We fixed a few minor issues in the Admission Controller
* Duplicate Action Items will no longer trigger a 400 response
* Because the Admission Controller doesn't run on a regular schedule, we can't
automatically detect if it's offline or just quiet. So we've turned off
notifications for the Admission Controller being offline.

## 4.3.0
### Custom Notifications Using Automation Rules
We've added the ability to add custom Slack webhook URLs to send custom messages to the slack environment of your choosing, 
[Learn More](https://insights.docs.fairwinds.com/features/automation-rules/#writing-rules)


### Bug Fixes
* Issue prevented the name/resource kind from continually showing up in the Admission Controller UI
* The "fix available" filter option wasn't filtering correctly
* Github labels weren’t showing up in the create issue popup

## 4.2.0
### Vulnerabilities UI
We’re happy to introduce The Vulnerabilities UI! We introduced a new UI to help you dig into vulnerable images running in your cluster. To use this feature, click the Vulnerabilities tab in the navigation bar.

### Add Labels and Annotations to Automation Work
When creating an automation rule, we've added the feature to check and write rules based on resources label and annotations.

### Remove Extra Clusters Column
We've removed a column that presented duplicitous data in the Action Items table.

### Add SHA hash to CI script
We've implemented integrity checking in our CI/CD instructions. Please update your Insights CI/CD feature.

## 4.1.0
### Installation Codes for Self-Hosted - Beta
All the great features of Insights but hosted on your infrastructure. Self-hosted is in beta. Contact us if you want to try it.
[Learn More](technical-details/self-hosted/installation)
 
### Jira Frontend
You can now create tickets in Jira. Use the "Create Tickets" button at the top of the Action Items table.
[Learn More](features/integrations)

### Fleet Installation Method (Charts)
You can now easily install the Insights Agent across a large fleet of clusters using a single helm install command.

### Removed Raw Reports From the History Page
We've improved the history pages' performance by providing links to download and view raw report data.

### Bug Fixes
* Selecting a report would not update the data on the cluster overview page

## 4.0.0
### New Cluster Overview UI
We redesigned the cluster overview page to better visualize what's happening in your cluster. Users can now see their cluster's health score, Action Items aggregated by namespace and report, top Action Items, a cost summary, assigned Action Items, and more!


### Updated Customer Agreement
We’ve updated our customer agreement, you will need to accept the new agreement the next time you login.

## 3.4.0
### Export SOC2 report
Fairwinds Insights now has alpha support for checking compliance with SOC 2 certification within the context of Kubernetes. Insights will check that certain resources are being monitored for vulnerabilities and configuration issues, mapping these to particular SOC 2 sections. You can export the findings as a CSV you can provide to your auditor.

### Fixed chart widths
We fixed a bug that made the workloads chart expand to fullscreen upon closing the chart, it now acts as intended.

## 3.3.0
### Added Install Hub install link
We added a way to get to the Install Hub from the navigation bar. 

### Fixed Helm names
We now provide more helpful file paths in the CI/CD interface.

## 3.2.0
### Automation Rules UI
We are happy to introduce The Automation Rules UI! Insights provides over 100 checks for Kubernetes clusters and resources. These checks are increasingly run in a variety of contexts, such as CI/CD, admission control, and in-cluster. Some checks may be more appropriate in specific contexts, require a higher level of severity, or trigger different alert/response mechanisms. Rules allow users to modify existing Action Items within Insights and customize how they see fit. Please find the Automation Rules under Automation in the navigation bar.

If you’re feeling stuck and need inspiration on how to use the automation rules, use the Create from Template section of the feature, and we have eight pre-made rules that can help you get started.

[Learn More](features/automation-rules)

### Collapsible Navigation 
The navigation bar is now collapsible. All you need to do is click on the small arrow to expand and collapse the navigation bar.
 
### Support for Chart Names in CI
We’ve changed the way filenames for Helm charts are handled in CI. Filenames will now match the file location inside your repo. You may see some spurious action item changes as this rolls out.
 
### Offline Report Notifications
We will now alert you via our notifications to let you know if your reports have gone offline.

### Bug Fixes
* Issue that made the application challenging to open on a mobile phone

## 3.1.0
### OPA UI
The frontend is out for OPA! Find this new feature under Policy in the navigation bar. You can now create and run custom checks to create Action Items. Read our docs to learn more.
[Learn More](features/policies)

### Bug Fixes
* Issue that impacts broken buttons in outlook. Outlook users can now use the links provided in emails

## 3.0.0
### New Navigation
We made changes to the navigation bar. We’ve moved the bar to the left-hand-side and rearranged the information architecture. 

### Prometheus Report
We added a new report called The Prometheus Collector. The report gathers workload metrics from a Prometheus installation in order to provide fine-grained resource usage data. This can be used to gauge how much different workloads cost, understand cost trends and help set resource requests and limits. Read our docs to learn more. 
[Learn More](technical-details/reports/resource-metrics)

### Prometheus Graph on Workloads View
We added visualizations to the workloads feature. You will now be able to see Memory and CPU displayed via a line graph.

### New Integration With Github
We added the ability to create issues in GitHub from Insights Action Items so that you can use your existing workflows for resolving issues and keeping yourself secure.

### Deleting Clusters Without Data
You can now delete any cluster at any time. 

### Speed improvements

We’re always trying to make the application more efficient, and we’ve made some improvements that speeds up the application.

## 2.3.0
### Admission Controller
We rolled out a new UI that will let you see what’s going on with your Admission Controller. If a resource is rejected from your cluster, you will now see all of the Action Items associated with that event, along with a remediation recommendation. 
 
## 2.2.0
### Rules Engine - Closed Beta
We are happy to introduce The Rules Engine!

Fairwinds Insights provides over 100 checks for Kubernetes clusters and resources. These checks are increasingly run in a variety of contexts, such as CI/CD, admission control, and in-cluster. Some checks may be more appropriate in specific contexts, require a higher level of severity, or trigger different alert/response mechanisms. The Rules Engine allows users to modify existing Action Items within Insights and customize how they see fit. 

The Rules Engine is currently in closed beta. Please reach out if you’re interested in using this functionality. <support@fairwinds.com>

### CI/CD Free for Open Source
If a repo is public, we will allow anyone to view that repo’s CI/CD page. If you’re interested in using this please reach out to us at <support@fairwinds.com>

## 2.0.0
### Install Hub
We are happy to introduce The Install Hub, a way for users to cut down on the number of findings they receive when they first sign up for Insights.

The Install Hub allows users to decide which reports they would like to run in their clusters. Users will be able to configure each report and set the timeout and schedule when the report runs.

[Learn More](features/in-cluster-scanning)

### Filtering on Workloads
We’ve added filtering options to the Workloads table, and now the graphs will reflect the data from the table shown.

### Add Exemptions to CI
You can now add exemptions into your CI flow. You can tell Insights that certain files or checks should be excluded from the CI scan. Insights will look for Action Items that match all of the provided fields and mark them as exempt.

### Added Commit Messages to CI/CD
We now display commit messages wherever commits are shown.

### Aggregated Trivy Results
If you have multiple versions of the same image, we can now aggregate the results together.

### Updated Customer Agreement
We have updated our [Fairwinds Customer Agreement](https://insights.fairwinds.com/customer-agreement), effective 10/19/2020.

## 1.12.0
### Tracking Vulnerable Image
If a vulnerable image is referenced in a Kubernetes manifest, we’ll now track the container name.

### Identifying Repo Names
Fairwinds Insights now supports integrations into your CI/CD pipeline. We've added a cleaner way to detect repository names, making it easy to get started with this feature.

### Docker Pull
We will now run docker pull if an image isn’t available locally.

## 1.11.0
### Workload Visualization
We’ve added visualizations to help you better understand your workload costs. 

### Workload Badges
The new badges in the workload table let you know what percentage of your workloads are included in the total cost (hover to get the exact number).  

### Action Items
Minor improvements to the Action Items table UI.

## 1.10.0
### Dynamic Open Policy Agent (OPA) - Beta
You can now create and run custom checks in Rego (OPA's policy language) to create Action Items in Fairwinds Insights. To get started, visit our Docs to [learn how to add Rego policies to Fairwinds Insights](features/policies).

### CI/CD Integration - Beta
We’ve recently shipped a CI/CD integration with Fairwinds Insights to shift Kubernetes configuration validation earlier in the development process. We’ve found that the handoff of Kubernetes applications from development to operations can result in configuration mistakes that lead to future incidents, security risks, and extra infrastructure cost. Today, Ops teams are manually looking for these mistakes, but with our CI/CD integration we are able to shift that closer to the development team to prevent mistakes from entering production.

We support all major CI/CD platforms and check container images for vulnerabilities, as well as Kubernetes deployment configurations (e.g. YAML files and helm charts) for common configuration mistakes. [Check out our docs to learn how to integrate Fairwinds Insights into your CI/CD workflow](https://insights.docs.fairwinds.com/features/infrastructure-as-code-scanning).

### Introducing Nova
We have integrated [Fairwinds Nova](https://github.com/FairwindsOps/Nova) (formerly known as "Release Watcher"), an open source project that monitors Helm 2 and 3 deployments, with Fairwinds Insights. This data is available via the "Add-ons" tab.

### Bug Fixes
* Issue that didn’t allow users to unsubscribe from marketing emails

## 1.9.0
### Group Workloads by Namespace or Label
On the Workloads tab, you can now group your workloads by namespace or label
in order to see aggregate costs, as well as potential cost savings.

### Cleaning Out Old Action Items
We've started removing Action Items for workloads that no longer exist. This is especially
helpful for organizations that create ephemeral feature deployments in their staging clusters.

### New Registration Page
We've launched an updataed registration workflow for new users.

## 1.8.0
### Better Pod Counts
We've started tracking pod counts for each workload over the course of a month. By averaging
the pod count over a longer period of time, we can give a more accurate view into how much
a given workload really costs.

We've also made some adjustments to how we calculate pod counts for Jobs and CronJobs, which
are typically short-lived.

### Polaris 1.0
We now support [Polaris 1.0](https://www.fairwinds.com/blog/fairwinds-polaris-1.0-best-practices-for-kubernetes-workloads)
in Insights. That comes with new checks, as well as the ability to create your own custom checks!

### Feedback Form
If you have feedback on your experience with Insights so far, you can click the feedback
tab on the right side of the screen. We'd love to hear from you!

## 1.7.0
### Action Items Performance
Performance on the Action Items table has been strongly improved by pushing more
of the querying logic into the backend. This means the UI will have a smaller
memory footprint, and will do less heavy-lifting of filtering and sorting data.

### Report Failure Warnings
It can be difficult to spot and debug failed reports. Now the Cluster Overview page
will show an item under Cluster Activity if a report fails, along with a link
to the logs.

### Longer Trial Duration
Free trials are now extended to 30 days.

### Cost Estimates now available in Datadog
For customers who integrate Fairwinds Insights with Datadog, workload cost estimates are now available as a custom metric. Fairwinds Insights provides an estimated cost for these custom metrics on the Organization Settings page.

## 1.6.0
### Bring Your Own Cloud Pricing
Estimating workload cost in Kubernetes is a hard problem. Many factors go into estimating the cost, such as assumptions about memory/CPU intensive applications, as well as current resource requests and limits. However, another critical input is the current per-instance price you pay for your compute resources. 

Fairwinds Insights now lets you select the instance type you currently use to run worker nodes in Kubernetes, and configure the per-hour price, number of vCPUs, as well as GB of memory. You can also override the default prices used by cloud providers with your own price. This is useful if you have any special Committed Use Discounts, or run workloads in an on-premise data center.

### Weekly Email Digest
Users can now receive a weekly email digest for new Action Items found by Fairwinds Insights. These email alerts will not include specific information about findings; for that, users will need to login to Fairwinds Insights. Users can subscribe and unsubscribe from email notifications by clicking their username in the upper-right corner of the screen, or 'Unsubscribe' from the email itself.

## 1.5.0
### Single Page App Enhancements
A variety of “behind the scenes” improvements have been made to the Single Page Application architecture of the interface. This should enable a more consistent experience as you navigate through the application.

### Redesigned Workloads Page
The Workloads page has been completely redesigned to make it easier for users to find deployments, filter on namespaces, and understand the estimated cost of specific workloads. More improvements are on their way to this page! Let us know what you think!

## 1.4.0
### New Tool: Fairwinds Pluto
As Kubernetes matures, the project may decide to deprecate some apiVersions. The recent Kubernetes 1.16 release deprecated several, making it difficult to find all the places where you might have used a deprecated version. Pluto enables you to quickly uncover these locations, and results are now integrated with Fairwinds Insights as Action Items.

### Helm 2 Support
The Add-ons page is powered by Fairwinds Release Watcher. This software now supports monitoring of Helm 2 charts so you can keep track of what version you’re using, and if there are newer versions available.

### UX Improvements for Add-Ons and RBAC Pages
A UX “face lift” has been implemented on the Add-ons and RBAC pages, bringing a more consistent feel to the interface.

### Slack Notification Improvements
Many users have adopted our Slack integration feature to stay on top of deployment and configuration issues. The Slack notifications now feature a cleaner message format, making it easier to learn about new issues at a glance.

## 1.3.0
### Recategorized Action Items
All findings are now normalized to one of three categories: Security, Efficiency, and Reliability. Categories can also have findings from multiple report types and sources. For example, Fairwinds Polaris will report findings for all three categories, while Kube-bench will only report findings for Security.

### New Dashboard: Findings by Report Type
The Cluster Overview page now includes a summary of findings by Report Type, listing the top issues and the number of workloads that are affected by those issues. For example, a user who is concerned about memory and CPU configurations may look at the Fairwinds Goldilocks report to understand how many workloads are affected with excessively high or low resource limits.

## 1.2.0
### Cluster Overview Enhancements
Fairwinds Insights is a comprehensive configuration validation platform that enables engineering and DevOps teams to run applications on Kubernetes securely, efficiently, and reliably. The software reports findings and recommendations for containers, deployments, and cluster infrastructure. Ultimately, making sense of this data and helping users answer “now what” is a key problem that Fairwinds Insights is uniquely positioned to solve. 

We have completely redesigned the Cluster Overview page to summarize data in your cluster and namespaces by severity and category. Users can click into these specific views to get “shortcut” access to relevant findings.

### DataDog Integration (Beta)
We are excited to announce the Beta release of our integration with DataDog. Many Fairwinds Insights customers use DataDog to monitor overall infrastructure performance and respond to problems. Integrating proactive recommendations around security, efficiency, and reliability is a natural extension of this experience. With this integration, SREs and DevOps engineers can leverage Fairwinds Insights data from within DataDog.

The feature can be found under the Organization Settings section and requires you to have a DataDog API key. Give it a try and tell us what you think!

### Accessibility Improvements
Accessibility has been improved throughout the Fairwinds Insights platform to make the system more operable and understandable for all users. Specific changes include:
* Icon buttons, such as pagination controls on the Action Items page, now have labels
* Non-icon buttons, such as the filters on the Action items page, now have labels
* Form fields have been paired with labels, such as those found on the login and registration forms
* Logical groupings now have title attributes, such as the row of filters on the Action Items page

### Ease of Use Improvements for CIS Benchmark (Kube-Bench) Findings
The CIS Benchmark for Kubernetes is a popular baseline for assessing the security posture of a cluster. By default, Fairwinds leverages [Kube-bench](https://github.com/aquasecurity/kube-bench) for this information. The following improvements have been made to the display of findings:
* Test number is now displayed in the finding title, making it easier to map findings back to specific CIS Benchmark tests
* The command used to run the test is now available in the Description, providing easier reproducibility
* Fine grained severities have been applied to Kube-bench findings, making it easier to prioritize results

### Fairwinds Announcements
Fairwinds has introduced a new “Announcements” tab under the Organization overview screen to provide visibility into security and vulnerability announcements investigated by the Fairwinds SRE team. This is a feature of the ClusterOps Managed Service that is now available to commercial users of Fairwinds Insights.

## 1.1.0
### Free Text Search through Action Items
The Action Items page now includes free text search, enabling users to quickly locate Action Items by any of the visible columns in the table.

### UI Refresh
Various UI refreshes have been made, including enhancements to the data tables. Additional UI enhancements are expected in the coming months.

## 1.0.0
### Trial Functionality
New Organizations created on Fairwinds Insights will automatically opt-in to a 14 Day Trial with access to all functionality. After the 14 day period, users will have the option of purchasing a subscription for their Organization or moving to the Community tier, which is feature-limited but free to use.

### Updates to Our Customer Agreement
As part of our General Availability, we have updated our [Customer Agreement](https://insights.fairwinds.com/customer-agreement). The Customer Agreement (formerly referred to as the Fairwinds Insights Terms of Use), effective March 13th, 2020, provides the following major updates:
* Customer definitions. Customers who do not meet the definition of a “Commercial Customer” may lose functionality. This typically occurs at the end of a Trial period if no commercial subscription is purchased; as a result, the Organization is assigned to the Fairwinds Insights Community tier
* Customers who have purchased Fairwinds Insights to run locally in a self-hosted manner are classified as a “Local Customer” in the Customer Agreement


## 0.9.0
### User Documentation
We are excited to launch our self-service documentation center! You can learn more about Fairwinds Insights and how to use new and existing features at https://insights.docs.fairwinds.com. 

### Slack Daily Digest Improvements
We have made improvements to the Slack Daily Digest feature. Users can activate this feature by navigating to their Organization Page, clicking on “Settings”, and then enabling the Slack integration.

### Labels, Annotations, and Pod Counts Added to Workloads Tab
We have added additional metadata about services running in your cluster to the Workload tab. Expect future usability enhancements to this page using label, annotation, and pod count data.

### Additional Remediation Guidance
We have added additional remediation guidance to findings generated by Fairwinds Insights. Expect continuous improvements to this information going forward as well.

## 0.8.0
### Export Action Items to CSV
Action Items can now be exported from the Fairwinds Insights platform into CSV format. This enables DevOps Leads and Managers to build custom reports, charts, and integrate findings with other business processes.

### View RBAC Roles
Well configured RBAC permissions are important for maintaining a secure Kubernetes environment. As infrastructure changes, DevOps engineers and SREs need a way to keep tabs on RBAC configurations so users and applications only get access to the permissions they need. We have made it easy to view which users/accounts have access to what resources, and whether they may be over-permissioned.

### Usability Improvements for Container Image Vulnerabilities
Within a container image finding, the layout of vulnerable package information is now easier to read and navigate.

### Vulnerable Packages Now Include “Fixed in Version” Information
Fairwinds Insights now reports “Fixed Version” information for vulnerable packages identified within container images. This saves time for DevOps engineers who need to find a secure version to upgrade to.

### Slack Notification Improvements
We’ve continued to enhance our Slack integration based on customer feedback. Admins can now select which channel Slack notifications are sent to. In addition, Admins can select whether to receive notifications for new findings in real-time, or as a “Daily Digest” summarizing new findings from the past day.

### Limit Cluster Comparison to a Specific Namespace
In the previous release, we released a cluster comparison feature that enables DevOps engineers and SREs to visually review configuration differences between two different clusters. For a cluster with dozens of workloads or namespaces, this can be a lot of information. Users now have the option to limit the comparison to specific namespaces, making results easier to review and analyze.

### CIS Benchmark Scanning
The CIS Kubernetes benchmark is a popular standard and baseline for assessing the security of your cluster. The test includes manual and automated tests; for the current implementation, Fairwinds runs the automated tests from the kube-bench open source project and reports back items that currently fail the test. CIS Benchmark Scanning is just the start of some larger Policy Management use cases we’re hearing from clients, so expect additional innovation in this area.

## 0.7.0
### Admin users can limit cluster access for users
Admins who add a user to an existing Organization can select whether they see all clusters, or specific clusters only. In the future, Admins will also be able to manage namespace access via UI controls.

### Get Slack Notifications for New Action Items
Slack is a big part of our user’s day-to-day workflow. We’ve implemented foundational support for Slack notifications for new Action Items generated by Fairwinds Insights. We are seeking early adopters to try the feature so we can shape it in a way that works for multiple teams and user types.

### Visually Review Configuration Differences Between Workloads in Different Clusters
For organizations who manage many clusters, keeping them aligned to a common, consistent standard can be time consuming. This is especially true when infrastructure is managed by different teams. We have developed a way to visualize the differences between two clusters so DevOps engineers can troubleshoot infrastructure issues and identify inconsistencies that need to be prioritized for resolution.

### Monitor Add-on Versions (Requires Helm 3)
Keeping track of the add-ons installed in your cluster, the version you’re using, and whether there are any new updates available, can be manual and time-consuming. We’ve automated this effort by monitoring add-ons and their versions so you can stay on top of changes in the Kubernetes community. This feature requires Helm 3.

### More Efficient Image Scanning
Trivy now runs more efficiently. Instead of scanning all images each time it runs, it will only scan 20 images at a time, with a preference for new images. This helps reduce overall compute overhead required for image scanning.

### Self-Hosted
We have also started assessing demand for a self-hosted version of Fairwinds Insights. If you are interested in this capability, please reply to this email or contact us at <insights@fairwinds.com>.

## 0.6.0
### Cost Metrics Improvements
We've made some improvements to the way we report cost. You can now see your cluster's overall
utilization, as well as see potental savings from incorporating Goldilocks recommendations.

### Action Item Notes
Action items can now have notes attached to them, to help you keep track of their status,
or record reasons for dismissing them.

### Report Encryption
All reports in Insights are now encrypted by default.

## 0.5.0
### Cost metrics
We've started estimating cost based on CPU and memory limits and requests. You'll see
a cost estimate for your cluster as a whole (on the Cluster Overview tab) as well as for
each individual workload (so long as resource limits are set).

### Scan Private Container Images
We've added support for private containers to our Trivy plugin. You'll need to create a secret
with your docker repo credentials. Expand the Helm Chart customization on the cluster settings tab
and check `private images` in the Trivy section to see detailed instructions.

### Helm Chart Version Updates
We've added a new report type, `release-watcher` which will create an action item when
one of your Helm charts has a new release available. Currently only Helm 3 is supported.

### Assign Action Items
To help triage Action Items, you can now assign them to any user in your organization. Action
items can be assigned individually, or in bulk.

### Action Items Links
The URL for pages showing Action Items will now update when you change the filters or the sort
field. This allows you to easily share links to specific views of the Action Items page.

### API Key Support
You can now interact with the Insights API programmatically using API key authorization.
If you're interested in using the Insights API, get in touch with us at <insights@fairwinds.com>
for more details.

### Helm Install Customization
You can now modify the `helm install` command via the UI to alter the set of enabled reports, timeouts,
and schedules. Changes will be persisted, so you'll have the same command the next time you update the agent.

### User Surveys
To better understand and serve our users, we've added a post-signup survey. The next time you log
in, you'll be asked to provide your name, title, organization, and any feedback you have for us.

We're always looking to improve the application, so if you have suggestions for new features,
don't hesitate to reach out to us at <insights@fairwinds.com>.

### Email Alerts
When you add a user to your organization, they'll get an email letting them know.

## 0.4.0
### Workload Reports
We've started gathering metadata on all the workloads running in your cluster,
and surfacing this information in the UI. More to come here.

### Container Scanning
Container scanning is quickly becoming a must-have capability for any DevOps team running Kubernetes.

Fairwinds Insights now supports vulnerabilities generated by Trivy,
an open source container scanning tool. Vulnerability data reported by Trivy can be
ingested by Fairwinds Insights and will appear in your Action Items list.

Currently this only works for public images, but support for private images is on the way.

### Manual Resolution of Action Items
Action Items can now be marked as `will not fix` or `working as intended`.
These items won't show up on the default view, but can still be seen
by changing the filters on the Action Items table.

Items can be marked individually, or in bulk.

### Deletion
You can delete clusters and organizations now.

### Goldilocks Update
We've made Goldilocks installs a bit more stable and repeatable.

## 0.3.0
#### Action Items Pagination
The Action Items page will now show only 100 items at a time.

### Reports Tab
See a list of available reports, and see the latest data available from each report type.

### Bug Fixes
A few minor bugs were squashed related to:
* Email validation
* Agent version checking
* Updating org memberships

#### Terms of Use and Privacy Policy
We've updated our terms of use and privacy policy

## 0.2.0 - Beta Release

### Fairwinds Goldilocks Now Available by Default
Fairwinds Goldilocks helps engineers set the resource requests and limits for their Kubernetes deployments. Recommendations from Goldilocks will now appear in the Action Items pane.

### Aqua Kube-Hunter Now Available by Default
Aqua Kube-hunter is an excellent tool for identifying weaknesses in Kubernetes clusters. The tool is included as part of the Agent installation, and defaults to running in passive mode.

### Navigation Enhancements
An updated navigation UI has been implemented to help users find information faster. One notable change is on the Cluster details screen, which provides quick access to Action Items under the security, reliability, and efficiency categories.

### Multi-Cluster Action Items
Prioritizing Action Items across a multi-cluster environment is a core goal of Fairwinds Insights. Now, when you click on an Organization, you will be able to select an Action Items tab to view findings across all of your clusters running the Fairwinds Insights Agent.

### Action Items API
The Action Items API enables users to publish additional findings from your own audit tools, or third-party audit tools you use.

### Findings Source Field
A new column has been added to the Action Items screen so you can see the particular source of a finding.
