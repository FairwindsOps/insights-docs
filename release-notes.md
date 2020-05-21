---
title: Fairwinds Insights Release Notes
tags: fairwinds insights kubernetes security reliability efficiency docker audit
---

# Release Notes

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
