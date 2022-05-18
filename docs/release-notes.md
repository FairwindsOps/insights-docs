---
meta:
  - name: title
    content: Fairwinds Insights Release Notes
  - name: description
    content: "Fairwinds Insights | Release Notes. See what's new in the Kubernetes governance software. "
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
---
# Release Notes

## 8.6.0
### Bug Fixes and Improvements
* New background for login pages
* Fixed popups getting cut off when hovering over `Top Issues` graph in `Home`
* Some workload metrics were showing `N/A` incorrectly

## 8.5.0
### Introducing Auto-Scan for Infrastructure as Code
Fairwinds is upgrading the GitHub integration and making new infrastructure-as-code scanning capabilities available to all customers.
Please note that existing users of our GitHub integration may be prompted for an additional permissions request from GitHub.
If you choose to accept these permissions, the following new features will become available:

**Auto-Scan for Infrastructure-as-Code**

Auto-Scan enables organizations using GitHub to enable infrastructure-as-code scanning across multiple repositories without having to
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

## 8.4.0
### Bug Fixes and Improvements
* UI improvements to the Efficiency pages
* Fixed issue where sometimes Nodes were being duplicated in the Nodes Capacity chart
* Fixed node names in the Nodes Capacity chart
* Corrected the colors on the Nodes Capacity chart
* Open source repos should now load in the Repositories page
* Cluster pages will load faster

## 8.3.0
### Bug Fixes and Improvements
* Fixed memory difference showing `0 (N/A)` if the difference is too large
* Links to Action Items table are now working
* Clicking the `All Clusters` option from the dropdown goes to the correct page
* Fixed un-assigning and un-snoozing Action Items
* Choosing multiple filters on the Action Items table now shows correct results

## 8.2.0
### New Insights Agent 2.0
We're excited to announce version 2.0 of our Insights Agent!

This new release comes with some small breaking changes to improve the usability of the Helm Chart. While your existing 1.x
installation will continue working as expected, you may need to change your `values.yaml` when upgrading to Agent 2.0.
There are also some minor changes to Admission Controller and CI behavior that will take place when updating to a new version.
[Here is a list of breaking and behavior changes](https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent#version-20)

### Bug Fixes and Improvements
* Fixed an issue with the `Contact Us` page when not logged in
* New Clusters can be created with the same name as a previously deleted Cluster (Clusters deleted prior to 8.1.0 release)

## 8.1.0
### New Cluster and Node Costs
This new page allows users to quickly visualize how much resources they are using compared to what is available. This is a great
tool to help users identify clusters that are under or over utilized. Users in the organization can compare resource utilization
between all their clusters and view the costs associated with each one. Furthermore, they can understand the resource utilization
of each node within a cluster. The new page can be found under `Efficiency > Capacity`

### Bug Fixes and Improvements
* Users are now able to create a cluster with the same name as a previously deleted cluster

## 8.0.0
### Bug Fixes and Improvements
* Fixed JIRA integration not staying authenticated
* Fixed issue when creating JIRA tickets for some Action Items
* Added `Report` column to the Automation Logs
* Improved Trivy recommendations
* Loading indicator now works properly in the Automation Logs

## 7.15.0
### Bug Fixes and Improvements
* Saved Lists in the Action Items table will now populate correctly
* Moved the **STATUS** column further left in the Automation Logs
* Fixed navigation issues resulting in 404 errors
* Fixed Slack messages incorrectly stating Prometheus is offline

## 7.14.0
### Bug Fixes and Improvements
* Owners of organizations are now able to remove SSO for Insights through the UI
* UI fixes for the Automation Logs page
* Updated how some columns get displayed in the Action Items table

## 7.13.0
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

## 7.12.0
### Ability to Block Access for Teams
Owners of organizations are now able to block teams from accessing specific Clusters, Namespaces and Respoitories within Insights. Members of
teams with specific blocked access will no longer be able to see the Clusters, Namespaces and Repositories in the blocked list.

### Bug Fixes and Improvements
* Action Items can now be closed using the `Esc` keyboard button
* All Clusters on the **Home** page show without scrolling
* Better performance when using search on the **Workloads** page
* Fixed navigation issue for when the left Navigation Bar is collapsed

## 7.11.0
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

## 7.10.0
### Updated Fairwinds Insights Terms and Conditions
Fairwinds has renamed the Customer Agreement to **Fairwinds Insights Terms and Conditions**. In addition, the Terms and Conditions have been updated.

### Bug Fixes and Improvements
* Improvements to the cluster navigation
* Better user message when first accessing the Efficiency page
* Top logo will now redirect to the **Home** page
* Fixed navigating to Action Items page from an external link
* The cluster list on the **Home** page is now scrollable

## 7.9.0
### Navigation Improvements
**A consistent navigation experience across the app** 
* No more dynamically changing navigation when users switch from the Organization View -> Cluster View

**Introducing the Efficiency page**
* A new home for the **Workloads** page
* A placeholder for future Cost Optimization and Reporting enhancements

**Finding Action Items**
* Easy toggle to look for Action Items for a single cluster, or for the entire Organization from a single page

[Watch the video showing off the new navigation](https://www.youtube.com/watch?v=zrBkTWo2PsI)

## 7.8.0
### Bug Fixes and Improvements
* Added Recommended Limits and Recommended Requests visuals to CPU and Memory charts in workloads
* UI Improvements to the Admission Controller chart
* Sorting by First Seen and Last Reported on Action Items table now works properly
* Refreshing the page does not remove the filters on the Action Items table

## 7.7.0
* No user-facing changes

## 7.6.0
### Bug Fixes and Improvements
* Faster load times for Action Items and Vulnerabilities pages

## 7.5.0
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

## 7.4.0
### Bug Fixes and Improvements
* We've updated the Insights Agent with some minor improvements and fixes
* Fixed creating JIRA tickets from the Action Items table
* Admission Controller UI improvement and fixes

## 7.3.0
### Bug Fixes and Improvements
* Fixed issue where duplicated PagerDuty incidents were being sent out
* Admission Controller search will no longer cause admission requests to disappear
* UI improvements in Admission Controller

## 7.2.0
### Admission Controller Redesign
Users will notice a completely new design for the **Admission Controller** page. This page now has a chart so users can quickly see the number of successful
and failed admission requests for their clusters during a specific Time Range. The Action Items for each failed admission request will appear on the right side in
a table format.

### Bug Fixes and Improvements
* Users can no longer create a Compliance report without a name
* Changing cost difference colors in the **Workloads** page for better accessibility

## 7.1.0
### Bug Fixes and Improvements
* After updating a Policy, the page will remain on the Policy page
* Updating Trivy to 0.22.0
* Updating Insights CI script to new version 0.6.1
* Overall improvements to make pages load faster

## 7.0.0
### Bug Fixes
* Better error messages when a repository is already scanned as part of another organization
* Fixed link issue when creating a ticket for an Action Items list
* Report type badges now have different colors
* Action Items table would incorrectly show all Action Items when selecting an empty list
* Workload page no longer shows an error when opened by an owner
* UI improvements across Insights

## 6.11.0
### Action Items Charts
The **Action Items** pages in Insights now have charts that visually categorize the Action Items by Severity, Top Issues, Top Namespaces and Top Workloads. Users are
also able to filter the Action Items table by clicking on the items in the charts.

### Bug Fixes
* Out of date Insights Agent Slack messages now show which clusters are out of date
* Issue with Insights Agent Fleet install
* Some trivy vulnerabilities were not showing in the detailed vulnerability page
* The Automation Rule **ignore-system-namespaces** (created automatically by Insights) now has **Context** set to **Agent**

## 6.10.0
* No user-facing changes

## 6.9.0
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

## 6.8.0
### Bug Fixes
* Users were unable to create JIRA tickets for some Action Items
* Added consistency across badges within All Repositories
* Fixed PagerDuty integration

## 6.7.0
### Admission Controller Kubernetes 1.22 Support
Admission Controller was updated to support kubernetes 1.22. Users running kubernetes 1.22 on their clusters are now able to use Admission Controller in their clusters.

### Bug Fixes
* Query list sometimes would show incorrect filters when creating a list from the table
* Tooltip added to the cost settings in the workload page for the different QoS settings

## 6.6.0
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

## 6.5.0
### Admission Controller events now include username of who made the deployment
When users navigate to the Admission Controller page, they will see events that include the name of the user who made the deployment. This helps Cluster Administrators who support multiple teams/users within a cluster to understand who made a particular deployment.

### Base Image information now available in Image Vulnerability Action Items
Insights now detects the Base Image layer for Image Vulnerabilities. You can find this information in the Action Item description for Image Vulnerabilities. This helps Developers quickly determine which Base Image they are running, so they can check if a newer version is available with fixes for any reported CVEs.

### Bug Fixes
* Faster loading time for the Organization dashboard
* Various UI improvements across Insights

## 6.4.0
### Enable and Disable Admission Controller Passive Mode
Users are now able to enable and disable Passive Mode for the Admission Controller through the API. 
[Learn more about the Admission Controller Passive Mode](https://insights.docs.fairwinds.com/installation/admission/setup/#installation)

** Starting from this release, the Admission Controller is set to Passive Mode by default for any new clusters **

### Agent v1.15
We've updated the Insights Agent with some minor improvements and fixes.

## 6.3.0
### Scanning Remote Helm Repositories
Organizations will now be able to scan charts from remote helm repositories for issues. By providing the `name`,
`repo` and `chart` in the `fairwinds-insights.yaml` file, Insights will be able to download the chart from the remote
repository and run appropriate scans.

### Bug Fixes
* Modifying an Automation Rule now shows which user updated it and when it was updated
* Passing Action Items were missing from the Health Score card

## 6.2.0
### Bug Fixes
* The "Log in with SSO" link did not redirect correctly for some organizations
* Inconsistent count for Action Items on the cluster overview page 

## 6.1.0
### New Prometheus Action Items
The Prometheus Collector report will now generate Action Items based on workload metrics. 

### Bug Fixes
* Faster loading time of clusters table in organization dashboard
* Various UI improvements across Insights

## 6.0.0
### Renaming Navigation Bar Items
Some Navigation bar items have been renamed. We've changed Report Hub to Install Hub, Repos to All Repositories,
and Clusters to All Clusters.

### Bug Fixes
* Main Repositories page still used old Action Items badges
* Admission Controller items wouldn't load after collapsing
* Links under the history bar graph on the Cluster Overview page were broken

## 5.7.0
### PagerDuty Integration
Organizations can now setup the PagerDuty integration to automatically send incident events from Insights.
[Learn more about the PagerDuty Integration](https://insights.docs.fairwinds.com/configure/automation/rules/#pagerduty-incidents)

### Bug Fixes
* Team Management displays a better error when inviting a user that is already part of the organization

## 5.6.0
### Quality of Service for Workloads
The new Quality of Service (QoS) parameter allows users to indicate the importance of their workloads and have
Insights recommend resources based on this parameter. From highest to lowest importance the values are
Critical, Guaranteed, Burstable and Limited.

### Bug Fixes
* The Action items count for a cluster no longer include passing Action Items in the Organization dashboard
* Action Items table was not correctly filtering based on resolution
* UI fixes on the organization dashboard

## 5.5.0
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
 
## 5.4.0
### Bug Fixes
* Used “last seen” instead of “first seen” to count fixed Action Items. Fixed action item numbers are more accurate now
* Previous channel selected didn't display when searching for a different slack channel
* Users could not delete repositories
* Issue occurred when enabling SAML
[Learn More About SAML Integration](https://insights.docs.fairwinds.com/installation/sso/about/)

## 5.3.0
### Team Management
We launched a new interface and API for managing teams within your organization. Within an organization,
you can create multiple teams, each of which has access to a particular set of clusters, namespaces, and repositories.
Members of those teams can be assigned a specific role to limit the actions they can take on those objects.

This is a great way to limit access to sensitive information, and to get the right information in front of the right
people. [Read more in the docs](https://insights.docs.fairwinds.com/configure/management/membership/)

### Agent v1.14
We've updated the Insights Agent with some minor improvements, including better support for Kubernetes 1.21 and the latest plugin updates.

## 5.2.0
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

## 5.0.0
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
[Learn More](https://insights.docs.fairwinds.com/configure/automation/rules/#writing-rules)


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
[Learn More](/technical-details/self-hosted/installation)
 
### Jira Frontend
You can now create tickets in Jira. Use the "Create Tickets" button at the top of the Action Items table.
[Learn More](/installation/integrations/jira)

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

[Learn More](/configure/automation/rules)

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
[Learn More](/configure/policy/policy)

### Bug Fixes
* Issue that impacts broken buttons in outlook. Outlook users can now use the links provided in emails

## 3.0.0
### New Navigation
We made changes to the navigation bar. We’ve moved the bar to the left-hand-side and rearranged the information architecture. 

### Prometheus Report
We added a new report called The Prometheus Collector. The report gathers workload metrics from a Prometheus installation in order to provide fine-grained resource usage data. This can be used to gauge how much different workloads cost, understand cost trends and help set resource requests and limits. Read our docs to learn more. 
[Learn More](/technical-details/reports/resource-metrics)

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

[Learn More](/configure/agent/install-hub)

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
You can now create and run custom checks in Rego (OPA's policy language) to create Action Items in Fairwinds Insights. To get started, visit our Docs to [learn how to add Rego policies to Fairwinds Insights](/configure/policy/policy).

### CI/CD Integration - Beta
We’ve recently shipped a CI/CD integration with Fairwinds Insights to shift Kubernetes configuration validation earlier in the development process. We’ve found that the handoff of Kubernetes applications from development to operations can result in configuration mistakes that lead to future incidents, security risks, and extra infrastructure cost. Today, Ops teams are manually looking for these mistakes, but with our CI/CD integration we are able to shift that closer to the development team to prevent mistakes from entering production.

We support all major CI/CD platforms and check container images for vulnerabilities, as well as Kubernetes deployment configurations (e.g. YAML files and helm charts) for common configuration mistakes. [Check out our docs to learn how to integrate Fairwinds Insights into your CI/CD workflow](https://insights.docs.fairwinds.com/features/continuous-integration).

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
