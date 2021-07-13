---
meta:
  - name: title
    content: Fairwinds Insights Release Notes
  - name: description
    content: Read the latest version updates at Fairwinds Insights release notes documentation.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
---
# Release Notes

## 5.0.0
### SAML Capabilities - Beta
We are happy to announce we now offer SAML capabilities! Contact us if you want to try it. 
[Learn More](https://insights.docs.fairwinds.com/configure/management/membership/#single-sign-on-beta)

### Save Views in Action Item Table
You can now save filtered views on the action items table. Use the star button at the top of the table and assign the view a name. You will then be able to access that view in the future without needing to re-select filtering options.

### Navigation Scroll Bar
We added a scroll bar to repositories and clusters options in the navbar to improve usability.

### Improved Error Message Handling in the UI
We updated how we handle presenting error messages. We now allow users to explicitly dismiss the notifications and increased the amount of time we display the message. This way, users have more time to read the error or ignore it more quickly. 

### Fixed Remediation Bug
We fixed a bug where information wasn’t showing up under remediation for Polaris action items. 

### Fixed Action Item Bugs
We fixed a bug where superusers could not see action items in kube-system. We also fixed a bug where some action items were hidden for non-admins on commonly named namespaces.

## 4.4.0
### Better Report Hub Syncing
Most of our users encode their insights-agent installation in Infrastructure-as-Code,
rather than copy/pasting the `helm install` instructions provided in the Insights UI.
Now, if you make a change in your Helm installation, the UI will incorporate those
changes automatically.

### Sort/Filter by Ticket Creation
You can now sort and filter action items by whether a ticket has been created or not.

### Offline Reports will stop showing Admission Controller

### Fixes for Admission Controller
We fixed a few minor issues in the Admission Controller
* Duplicate Action Items will no longer trigger a 400 response
* Because the Admission Controller doesn't run on a regular schedule, we can't
automatically detect if it's offline or just quiet. So we've turned off
notifications for the Admission Controller being offline.

## 4.3.0

### Custom notifications using automation rules
We've added the ability to add custom Slack webhook URLs to send custom messages to the slack environment of your choosing, 
[Learn More](https://insights.docs.fairwinds.com/configure/policy/rules/#writing-rules)
 
### Fixed a bug where name/resource kind weren't always showing up
We've fixed a bug that prevented the name/resource kind from continually showing up in the Admission Controller UI.

### Fixed the "fix available" filter on the detailed CVE page
We've fixed a bug where the "fix available" filter option wasn't filtering correctly.

### On the create issue for action item page, fixed the list of labels pulled from GitHub
We've fixed a bug where the labels weren’t showing up.

## 4.2.0

### Vulnerabilities UI
We’re happy to introduce The Vulnerabilities UI! We introduced a new UI to help you dig into vulnerable images running in your cluster. To use this feature, click the Vulnerabilities tab in the navigation bar.

### Add labels and annotations to automation work
When creating an automation rule, we've added the feature to check and write rules based on resources label and annotations.

### Remove extra clusters column
We've removed a column that presented duplicitous data in the action items table.

### Add SHA hash to CI script
We've implemented integrity checking in our CI/CD instructions. Please update your Insights CI/CD feature.

## 4.1.0

### Installation codes for self-hosted - Beta
All the great features of Insights but hosted on your infrastructure. Self-hosted is in beta. Contact us if you want to try it.
[Learn More](/technical-details/self-hosted/installation)
 
### Jira frontend
You can now create tickets in Jira. Use the "Create Tickets" button at the top of the Action Items table.
[Learn More](/run/agent/action-items#ticketing-integrations)
 
### Fix health score chart
Fixed a bug where selecting a report would not update the data on the cluster overview page.

### Fleet installation method (charts)
You can now easily install the Insights Agent across a large fleet of clusters using a single helm install command.

### Removed raw reports from the history page
We've improved the history pages' performance by providing links to download and view raw report data.

## 4.0.0

### New Cluster Overview UI
We redesigned the cluster overview page to better visualize what's happening in your cluster. Users can now see their cluster's health score, action items aggregated by namespace and report, top action items, a cost summary, assigned action items, and more!

[Learn More](/run/agent/cluster-summary)

### Updated customer agreement
We’ve updated our customer agreement, you will need to accept the new agreement the next time you login.

## 3.4.0

### Export SOC2 report
Fairwinds Insights now has alpha support for checking compliance with SOC 2 certification within the context of Kubernetes. Insights will check that certain resources are being monitored for vulnerabilities and configuration issues, mapping these to particular SOC 2 sections. You can export the findings as a CSV you can provide to your auditor.

### Fixed chart widths
We fixed a bug that made the workloads chart expand to fullscreen upon closing the chart, it now acts as intended.

## 3.3.0

### Added report hub install link
We added a way to get to the report hub from the navigation bar. 

### Fixed Helm names
We now provide more helpful file paths in the CI/CD interface.

## 3.2.0

### Automation Rules UI
We are happy to introduce The Automation Rules UI! Insights provides over 100 checks for Kubernetes clusters and resources. These checks are increasingly run in a variety of contexts, such as CI/CD, admission control, and in-cluster. Some checks may be more appropriate in specific contexts, require a higher level of severity, or trigger different alert/response mechanisms. Rules allow users to modify existing action items within Insights and customize how they see fit. Please find the Automation Rules under Automation in the navigation bar.

If you’re feeling stuck and need inspiration on how to use the automation rules, use the Create from Template section of the feature, and we have eight pre-made rules that can help you get started.

[Learn More](/configure/policy/rules)

### Collapsible Navigation 
The navigation bar is now collapsible. All you need to do is click on the small arrow to expand and collapse the navigation bar.
 
### Support for Chart Names in CI
We’ve changed the way filenames for Helm charts are handled in CI. Filenames will now match the file location inside your repo. You may see some spurious action item changes as this rolls out.
 
### Offline Report Notifications
We will now alert you via our notifications to let you know if your reports have gone offline.

### Mobile Fix
We fixed a bug that made the application challenging to open on a mobile phone.

## 3.1.0

### OPA UI
The frontend is out for OPA! Find this new feature under Policy in the navigation bar. You can now create and run custom checks to create Action Items. Read our docs to learn more.
[Learn More](/configure/policy/policy)


### Fixed email bug
 We fixed a bug that impacts broken buttons in outlook. Outlook users can now use the links provided in emails.

## 3.0.0
### New navigation

We made changes to the navigation bar. We’ve moved the bar to the left-hand-side and rearranged the information architecture. 

### Prometheus Report

We added a new report called The Prometheus Collector. The report gathers workload metrics from a Prometheus installation in order to provide fine-grained resource usage data. This can be used to gauge how much different workloads cost, understand cost trends and help set resource requests and limits. Read our docs to learn more. 
[Learn More](/configure/reports/resource-metrics)

### Prometheus Graph on Workloads view

We added visualizations to the workloads feature. You will now be able to see Memory and CPU displayed via a line graph.

 ### New integration with GitHub
We added the ability to create issues in GitHub from Insights Action Items so that you can use your existing workflows for resolving issues and keeping yourself secure.


### Deleting Clusters without Data

You can now fix any cluster at any time. 

### Speed improvements

We’re always trying to make the application more efficient, and we’ve made some improvements that speeds up the application.

## 2.3.0
### Admission Controller
We rolled out a new UI that will let you see what’s going on with your Admission Controller. If a resource is rejected from your cluster, you will now see all of the action items associated with that event, along with a remediation recommendation. 
 
## 2.2.0
### Rules Engine - Closed Beta
We are happy to introduce The Rules Engine!

Fairwinds Insights provides over 100 checks for Kubernetes clusters and resources. These checks are increasingly run in a variety of contexts, such as CI/CD, admission control, and in-cluster. Some checks may be more appropriate in specific contexts, require a higher level of severity, or trigger different alert/response mechanisms. The Rules Engine allows users to modify existing action items within Insights and customize how they see fit. 

The Rules Engine is currently in closed beta. Please reach out if you’re interested in using this functionality. <support@fairwinds.com>

### CI/CD Free for Open Source
 
If a repo is public, we will allow anyone to view that repo’s CI/CD page. If you’re interested in using this please reach out to us at <support@fairwinds.com>

## 2.0.0

### Report Hub
We are happy to introduce The Report Hub, a way for users to cut down on the number of findings they receive when they first sign up for Insights.

The Report Hub allows users to decide which reports they would like to run in their clusters. Users will be able to configure each report and set the timeout and schedule when the report runs.

[Learn More](/run/agent/report-hub)

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
Minor improvements to the action items table UI.

## 1.10.0

### Dynamic Open Policy Agent (OPA) - Beta
You can now create and run custom checks in Rego (OPA's policy language) to create Action Items in Fairwinds Insights. To get started, visit our Docs to [learn how to add Rego policies to Fairwinds Insights](/configure/policy/policy).

### CI/CD Integration - Beta
We’ve recently shipped a CI/CD integration with Fairwinds Insights to shift Kubernetes configuration validation earlier in the development process. We’ve found that the handoff of Kubernetes applications from development to operations can result in configuration mistakes that lead to future incidents, security risks, and extra infrastructure cost. Today, Ops teams are manually looking for these mistakes, but with our CI/CD integration we are able to shift that closer to the development team to prevent mistakes from entering production.

We support all major CI/CD platforms and check container images for vulnerabilities, as well as Kubernetes deployment configurations (e.g. YAML files and helm charts) for common configuration mistakes. [Check out our docs to learn how to integrate Fairwinds Insights into your CI/CD workflow](https://insights.docs.fairwinds.com/features/continuous-integration).

### Introducing Nova
We have integrated [Fairwinds Nova](https://github.com/FairwindsOps/Nova) (formerly known as "Release Watcher"), an open source project that monitors Helm 2 and 3 deployments, with Fairwinds Insights. This data is available via the "Add-ons" tab.

### Unsubscribe from Email
Fixed bug that didn’t allow users to unsubscribe from marketing emails

## 1.9.0

### Group Workloads by Namespace or Label
On the Workloads tab, you can now group your workloads by namespace or label
in order to see aggregate costs, as well as potential cost savings.

### Cleaning Out Old Action Items
We've started removing action items for workloads that no longer exist. This is especially
helpful for organizations that create ephemeral feature deployments in their staging clusters.

### New Registration Page
Check out insights.fairwinds.com/auth/register to see our new registration flow

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
Users can now receive a weekly email digest for new Action Items found by Fairwinds Insights. These email alerts will not include specific information about findings; for that, users will need to login to Fairwinds Insights. User can subscribe and unsubscribe from email notifications by clicking their username in the upper-right corner of the screen, or 'Unsubscribe' from the email itself.

## 1.5.0
### Single Page App enhancements
A variety of “behind the scenes” improvements have been made to the Single Page Application architecture of the interface. This should enable a more consistent experience as you navigate through the application.

### Redesigned Workloads Page
The Workloads page has been completely redesigned to make it easier for users to find deployments, filter on namespaces, and understand the estimated cost of specific workloads. More improvements are on their way to this page! Let us know what you think!

## 1.4.0
### New Tool: Fairwinds Pluto
As Kubernetes matures, the project may decide to deprecate some apiVersions. The recent Kubernetes 1.16 release deprecated several, making it difficult to find all the places where you might have used a deprecated version. Pluto enables you to quickly uncover these locations, and results are now integrated with Fairwinds Insights as Action Items.

### Helm 2 support
The Add-ons page is powered by Fairwinds Release Watcher. This software now supports monitoring of Helm 2 charts so you can keep track of what version you’re using, and if there are newer versions available.

### UX improvements for Add-ons and RBAC pages
A UX “face lift” has been implemented on the Add-ons and RBAC pages, bringing a more consistent feel to the interface.

### Slack notification improvements
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

### Ease of use Improvements for CIS Benchmark (Kube-bench) Findings
The CIS Benchmark for Kubernetes is a popular baseline for assessing the security posture of a cluster. By default, Fairwinds leverages [Kube-bench](https://github.com/aquasecurity/kube-bench) for this information. The following improvements have been made to the display of findings:
* Test number is now displayed in the finding title, making it easier to map findings back to specific CIS Benchmark tests.
* The command used to run the test is now available in the Description, providing easier reproducibility.
* Fine grained severities have been applied to Kube-bench findings, making it easier to prioritize results.

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

### Updates to our Customer Agreement
As part of our General Availability, we have updated our [Customer Agreement](https://insights.fairwinds.com/customer-agreement). The Customer Agreement (formerly referred to as the Fairwinds Insights Terms of Use), effective March 13th, 2020, provides the following major updates:
* Customer definitions. Customers who do not meet the definition of a “Commercial Customer” may lose functionality. This typically occurs at the end of a Trial period if no commercial subscription is purchased; as a result, the Organization is assigned to the Fairwinds Insights Community tier.
* Customers who have purchased Fairwinds Insights to run locally in a self-hosted manner are classified as a “Local Customer” in the Customer Agreement.


## 0.9.0
### User Documentation
We are excited to launch our self-service documentation center! You can learn more about Fairwinds Insights and how to use new and existing features at https://insights.docs.fairwinds.com. 

### Slack Daily Digest Improvements
We have made improvements to the Slack Daily Digest feature. Users can activate this feature by navigating to their Organization Page, clicking on “Settings”, and then enabling the Slack integration.

### Labels, Annotations, and Pod Counts added to Workloads Tab
We have added additional metadata about services running in your cluster to the Workload tab. Expect future usability enhancements to this page using label, annotation, and pod count data.

### Additional Remediation Guidance
We have added additional remediation guidance to findings generated by Fairwinds Insights. Expect continuous improvements to this information going forward as well.

## 0.8.0
### Export Action Items to CSV
Action Items can now be exported from the Fairwinds Insights platform into CSV format. This enables DevOps Leads and Managers to build custom reports, charts, and integrate findings with other business processes.

### View RBAC Roles
Well configured RBAC permissions is important for maintaining a secure Kubernetes environment. As infrastructure changes, DevOps engineers and SREs need a way to keep tabs on RBAC configurations so users and applications only get access to the permissions they need. We have made it easy to view which users/accounts have access to what resources, and whether they may be over-permissioned.

### Usability Improvements for Container Image Vulnerabilities
Within a container image finding, the layout of vulnerable package information is now easier to read and navigate.

### Vulnerable Packages now include “Fixed In Version” information
Fairwinds Insights now reports “Fixed Version” information for vulnerable packages identified within container images. This saves time for DevOps engineers who need to find a secure version to upgrade to.

### Slack Notification Improvements
We’ve continued to enhance our Slack integration based on customer feedback. Admins can now select which channel Slack notifications are sent to. In addition, Admins can select whether to receive notifications for new findings in real-time, or as a “Daily Digest” summarizing new findings from the past day.

### Limit cluster comparison to a specific namespace
In the previous release, we released a cluster comparison feature that enables DevOps engineers and SREs to visually review configuration differences between two different clusters. For a cluster with dozens of workloads or namespaces, this can be a lot of information. Users now have the option to limit the comparison to specific namespaces, making results easier to review and analyze.

### CIS Benchmark Scanning
The CIS Kubernetes benchmark is a popular standard and baseline for assessing the security of your cluster. The test includes manual and automated tests; for the current implementation, Fairwinds runs the automated tests from the kube-bench open source project and reports back items that currently fail the test. CIS Benchmark Scanning is just the start of some larger Policy Management use cases we’re hearing from clients, so expect additional innovation in this area.

## 0.7.0
### Admin users can limit cluster access for users
Admins who add a user to an existing Organization can select whether they see all clusters, or specific clusters only. In the future, Admins will also be able to manage namespace access via UI controls.

### Get Slack notifications for new Action Items
Slack is a big part of our user’s day-to-day workflow. We’ve implemented foundational support for Slack notifications for new Action Items generated by Fairwinds Insights. We are seeking early adopters to try the feature so we can shape it in a way that works for multiple teams and user types.

### Visually review configuration differences between workloads in different clusters
For organizations who manage many clusters, keeping them aligned to a common, consistent standard can be time consuming. This is especially true when infrastructure is managed by different teams. We have developed a way to visualize the differences between two clusters so DevOps engineers can troubleshoot infrastructure issues and identify inconsistencies that need to be prioritized for resolution.

### Monitor Add-on versions (requires Helm 3)
Keeping track of the add-ons installed in your cluster, the version you’re using, and whether there are any new updates available, can be manual and time-consuming. We’ve automated this effort by monitoring add-ons and their versions so you can stay on top of changes in the Kubernetes community. This feature requires Helm 3.

### More efficient image scanning
Trivy now runs more efficiently. Instead of scanning all images each time it runs, it will only scan 20 images at a time, with a preference for new images. This helps reduce overall compute overhead required for image scanning.

### Self-hosted
We have also started assessing demand for a self-hosted version of Fairwinds Insights. If you are interested in this capability, please reply to this email or contact us at <insights@fairwinds.com>.

## 0.6.0
#### Cost metrics improvements
We've made some improvements to the way we report cost. You can now see your cluster's overall
utilization, as well as see potental savings from incorporating Goldilocks recommendations.

#### Action item notes
Action items can now have notes attached to them, to help you keep track of their status,
or record reasons for dismissing them.

#### Report encryption
All reports in Insights are now encrypted by default.

## 0.5.0
#### Cost metrics
We've started estimating cost based on CPU and memory limits and requests. You'll see
a cost estimate for your cluster as a whole (on the Cluster Overview tab) as well as for
each individual workload (so long as resource limits are set).

#### Scan private container images
We've added support for private containers to our Trivy plugin. You'll need to create a secret
with your docker repo credentials. Expand the Helm Chart customization on the cluster settings tab
and check `private images` in the Trivy section to see detailed instructions.

#### Helm chart version updates
We've added a new report type, `release-watcher` which will create an action item when
one of your Helm charts has a new release available. Currently only Helm 3 is supported.

#### Assign action items
To help triage action items, you can now assign them to any user in your organization. Action
items can be assigned individually, or in bulk.

#### Action items links
The URL for pages showing action items will now update when you change the filters or the sort
field. This allows you to easily share links to specific views of the action items page.

#### API key support
You can now interact with the Insights API programmatically using API key authorization.
If you're interested in using the Insights API, get in touch with us at <insights@fairwinds.com>
for more details.

#### Helm install customization
You can now modify the `helm install` command via the UI to alter the set of enabled reports, timeouts,
and schedules. Changes will be persisted, so you'll have the same command the next time you update the agent.

#### User Surveys
To better understand and serve our users, we've added a post-signup survey. The next time you log
in, you'll be asked to provide your name, title, organization, and any feedback you have for us.

We're always looking to improve the application, so if you have suggestions for new features,
don't hesitate to reach out to us at <insights@fairwinds.com>.

#### Email alerts
When you add a user to your organization, they'll get an email letting them know.

## 0.4.0
#### Workload Reports
We've started gathering metadata on all the workloads running in your cluster,
and surfacing this information in the UI. More to come here.

#### Container Scanning
Container scanning is quickly becoming a must-have capability for any DevOps team running Kubernetes.

Fairwinds Insights now supports vulnerabilities generated by Trivy,
an open source container scanning tool. Vulnerability data reported by Trivy can be
ingested by Fairwinds Insights and will appear in your Action Items list.

Currently this only works for public images, but support for private images is on the way.

#### Manual Resolution of Action Items
Action Items can now be marked as `will not fix` or `working as intended`.
These items won't show up on the default view, but can still be seen
by changing the filters on the Action Items table.

Items can be marked individually, or in bulk.

#### Deletion
You can delete clusters and organizations now

#### Goldilocks Update
We've made Goldilocks installs a bit more stable and repeatable.

## 0.3.0
#### Action Items Pagination
The action items page will now show only 100 items at a time

#### Reports Tab
See a list of available reports, and see the latest data available from each report type.

#### Bug fixes
A few minor bugs were squashed related to:
* email validation
* agent version checking
* updating org memberships

#### Terms of Use and Privacy Policy
We've updated our terms of use and privacy policy

## 0.2.0 - Beta Release

#### Fairwinds Goldilocks now available by default
Fairwinds Goldilocks helps engineers set the resource requests and limits for their Kubernetes deployments. Recommendations from Goldilocks will now appear in the Action Items pane.

#### Aqua Kube-hunter now available by default
Aqua Kube-hunter is an excellent tool for identifying weaknesses in Kubernetes clusters. The tool is included as part of the agent installation, and defaults to running in passive mode.

#### Navigation Enhancements
An updated navigation UI has been implemented to help users find information faster. One notable change is on the Cluster details screen, which provides quick access to Action Items under the security, reliability, and efficiency categories.

#### Multi-cluster Action Items
Prioritizing Action Items across a multi-cluster environment is a core goal of Fairwinds Insights. Now, when you click on an Organization, you will be able to select an Action Items tab to view findings across all of your clusters running the Fairwinds Insights agent.

#### Action Items API
The Action Items API enables users to publish additional findings from your own audit tools, or third-party audit tools you use.

#### Findings Source Field
A new column has been added to the Action Items screen so you can see the particular source of a finding.
