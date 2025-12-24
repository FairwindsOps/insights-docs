---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Fairwinds Insights integrates with GitHub, Jira, Slack, Datadog, Azure DevOps and Microsoft Teams"
---
# Integrations
Fairwinds Insights integrates with a number of third-party tools to better support your team's needs.

## GitHub
You can connect Insights to GitHub to:
* Open issues in GitHub repos
* Get a better CI/CD experience for Infrastructure-as-Code scanning

### Connecting
Connecting Insights to your GitHub repository will help you get the most out of the CI integration.
To get started:
1. Visit your organization's `Repositories` page and click `Add Repository`
2. Click on `Connect Github`

Then, in the GitHub UI, choose which repositories you'd like to link to Insights:
<img :src="$withBase('/img/github-add-repo.png')" alt="Add repo in GitHub">

### Using the GitHub Integration
Connecting GitHub with Fairwinds Insights unlocks several features:
1. Auto-Scan for Infrastructure-as-Code
2. Scan results posted to pull requests as comments
3. Fairwinds Insights status on pull requests
4. Automated Pull Request Fix
5. Create an Github Issue based on a Fairwinds Insights Action Item

### Fairwinds Insights GitHub Application Permissions Required
To provide these features, the Fairwinds Insights GitHub Application requires the following permissions:

| Repositories Permission | Read    | Write   | Description | Used for features |
|-------------------------|---------|---------|-------------|-------------------|
| Metadata                | &check; |         | Search repositories, list collaborators, and access repository metadata. | (mandatory) |
| Commit statuses         | &check; | &check; |             | 3 |
| Content                 | &check; | &check; | Repository contents, commits, branches, downloads, releases, and merges. | 1, 4|
| Issues                  | &check; | &check; | Issues and related comments, assignees, labels, and milestones. | 5 |
| Pull Request            | &check; | &check; | Pull requests and related comments, assignees, labels, milestones, and merges.  | 2, 4 |
| WebHooks                | &check; | &check; | Manage the post-receive hooks for a repository. | |

### Status on Pull Requests Example
For example, once your repository is linked, you'll start seeing a Fairwinds Insights status on each of your pull requests.
<img :src="$withBase('/img/github-status.png')" alt="Check GitHub status">

## Jira
Fairwinds Insights can connect to Jira in order to create Jira tickets
from Action Items with support for custom field mapping and advanced ticket configuration.

### Installation
>We recommend creating a "robot account" to connect to your Insights organization
and granting this user the ability to create tickets on all of your Jira projects.
The linked account will show as the creator of any tickets created via Insights

1. Visit your organization's `Settings > Integration` page
2. Hover over `Jira` and click `Add Integration`
3. Once you have connected Jira to Insights, you can create tickets for Action Items manually or 
[automatically using Automation Rules](/features/automation-rules#tickets)

### Jira Custom Fields
Fairwinds Insights supports advanced Jira custom field mapping, allowing you to:
* Map existing Jira fields to Insights custom fields for enhanced ticket creation
* Configure default values and display preferences
* Support all standard Jira field types discovered through the API
* Create sophisticated field mappings with validation and constraints

See [Jira Custom Fields](/features/jira-custom-fields) for detailed configuration instructions.

### Jira Tickets and Action Items
If an Action Item that is associated with a Jira ticket is marked as `Resolved` or `Fixed`,
the Jira ticket will automatically close.

## Azure DevOps
Fairwinds Insights can connect to Azure DevOps in order to create Work Items from Action Items.

### Installation
> We recommend creating a "robot account" to connect to your Insights organization
and granting this user the ability to create Work Items on all of your Azure DevOps projects.
The linked account will show as the creator of any Work Items created via Insights

1. Visit your organization's `Settings > Integration` page
2. Hover over `Azure DevOps` and click `Add Integration`
3. Once you have connected Azure DevOps to Insights, you can create Work Items for Action Items manually or 
[automatically using Automation Rules](/features/automation-rules#tickets)

### Azure DevOps Work Items and Action Items
If an Action Item that is associated with an Azure DevOps work item is marked as `Resolved` or `Fixed`, 
the Azure DevOps work item will automatically close.

## Slack
Fairwinds Insights has an integration with Slack so you can get notifications
about critical changes to your clusters.

There are two types of Slack notifications:
* Realtime: Alert every time one of your reports generate new Action Items.
This is good for production clusters which deserve more attention and should be relatively stable
* Daily Digest: One alert per day highlighting any new Action Items or fixed Action Items
in your cluster from the previous day

Read our [privacy policy](https://www.fairwinds.com/privacy-policy) to learn more about how Fairwinds Insights handles user data.

### Installation
To set up Slack notifications:
1. Visit your organization's `Settings > Integration` page
2. Hover over `Slack` and click `Add Integration`
3. Once you have connected Slack to Insights, you can choose which channels you'd like notifications to be
sent to in the `Settings > Notifications` page

See the configure section to [customize Slack alerts through Automation Rules.](/features/automation-rules#slack-notifications)

## PagerDuty
The PagerDuty integration allows you to create PagerDuty incidents for
any Action Item in Fairwinds Insights. This includes all three contexts:
Insights Agent, CI/CD and Admission Controller.

PagerDuty incidents are created via [Automation Rules](/features/automation-rules#pagerduty-incidents).
You can customize your Automation Rule to only trigger on particular events
(e.g. critical level container CVEs from Trivy). You can also customize the
PagerDuty incident with different levels of urgency, add resource metadata
and remediation details to the incident body and more.

### How It Works
Users can create new PagerDuty incidents for specific scenarios using
Fairwinds Insights’ Automation Rule functionality. Automation Rules trigger
automatically when certain scenarios are met. For example, a common user
scenario is creating a PagerDuty incident when a new high severity security
misconfiguration is found in the Kubernetes cluster.

At a minimum, a PagerDuty incident requires:
* An incident title
* A PagerDuty service ID
* An urgency threshold (low or high)

Users can optionally configure an incident description which are good places to store remediation
recommendations and workload related details. Incidents may also be routed to
an escalation policy or assigned to specific PagerDuty user IDs.

Once a PagerDuty incident is created, it will appear in the PagerDuty console
under the specific service ID specified.

### Installation
>The user who authorizes the application will appear in the PagerDuty UI as
having triggered the incident. We suggest creating a "robot account" for authenticating
with Fairwinds Insights to prevent any confusion

1. Visit your organization's `Settings > Integration` page
2. Hover over `PagerDuty` and click `Add Integration`
3. Once you have connected PagerDuty to Insights, you can use [Automation Rules to trigger incidents](/features/automation-rules#pagerduty-incidents)

## Datadog
Fairwinds Insights has an integration to feed data into Datadog.

An Event is sent into Datadog whenever an Action Item is first discovered or when it's fixed. This can be very helpful for correlating issues with either an attempt to fix an Action Item or introducing a new workload that has additional Action Items.

Also a metric is sent to Datadog representing the number of open Action Items with tags that allow you to filter or compare data.

### Installation
To set up Datadog integration:
1. Visit your organization's `Settings > Integration` page.
2. Hover over `Datadog` and click `Add Integration`.
3. Enter your `API key`.
4. Choose the appropriate `Datadog site` (e.g., datadoghq.com, datadoghq.eu).
5. Click `Connect to Datadog` to complete the setup.

## Microsoft Teams
Fairwinds Insights has an integration with Microsoft Teams so you can get notifications about critical changes to your clusters.

There are two types of Microsoft Teams notifications:
* Realtime: Alert every time one of your reports generate new Action Items.
This is good for production clusters which deserve more attention and should be relatively stable
* Daily Digest: One alert per day highlighting any new Action Items or fixed Action Items
in your cluster from the previous day

Read our [privacy policy](https://www.fairwinds.com/privacy-policy) to learn more about how Fairwinds Insights handles user data.

### Installation
To set up Microsoft Teams notifications:
1. Visit your organization's `Settings > Integration` page
2. Hover over `Microsoft Teams` and click `Add Integration`
3. Once you have connected Microsoft Teams to Insights, you can choose which teams > channels you'd like notifications to be sent to in the `Settings > Notifications` page

See the configure section to [customize MS Teams alerts through Automation Rules.](/features/automation-rules#microsoft-teams-notifications)

## UTM Stack (beta)
Fairwinds Insights now integrates with UTM Stack to enhance your security and incident management processes. 
This integration automatically creates incidents in UTM Stack based on action items from Fairwinds Insights and keeps them in sync as the action items’ statuses change. 
Whether an action item is `resolved`, `reopened`, or `fixed`, the corresponding incident in UTM Stack reflects those changes in "real-time" (every 5 minutes), ensuring your team stays informed and aligned.

### Installation

Follow these steps to set up the UTM Stack integration:

#### Access Integration Settings
- Navigate to your organization’s `Settings > Integration` page in Fairwinds Insights.
#### Initiate UTM Stack Integration
- Locate the `UTM Stack` option, hover over it, and click `Add Integration`.
#### Configure the Integration
- A modal will appear prompting you to enter the following details:
  - `URL`: The base URL of your UTM Stack instance (e.g., https://your-utm-stack-instance.com).
  - `User`: The username of the UTM Stack account used for authentication.
  - `Password`: The password associated with the specified user account.
  - `Skip TLS verification`: If checked, Insights will not verify the TLS certificate when connecting to your UTM Stack instance. **Not recommended**
  - `CA Certificate or Chain (PEM file)`: (optional) Upload a PEM-encoded CA certificate or certificate chain if your UTM Stack instance uses a custom or self-signed TLS certificate. This allows Fairwinds Insights to securely validate the UTM Stack server's identity. If not provided, system default CAs are used unless "Skip TLS verification" is checked.
  - Click `Connect` to test your credentials

**Note: For security and clarity, consider creating a dedicated bot or service account in UTM Stack for this integration rather than using personal credentials.**
- Configure Policies and Save
  - `Policies`: A list of Fairwinds Insights policies for which action items should generate incidents in UTM Stack. Only action items tied to these policies will be synced.
  - Click `Save Settings` to enable the integration.
  - Fairwinds Insights will begin syncing existing action items for the selected policies and will continue to update them as changes occur.

### Using the Integration

#### Once activated, the integration works as follows:

- Incident Creation: New action items in Fairwinds Insights that match your selected policies are automatically turned into incidents in UTM Stack.
- Status Synchronization: Updates to action items—such as marking them as `resolved` or `fixed` are reflected in the corresponding UTM Stack incidents.

### Best Practices

- Dedicated Account: Use a bot or service account in UTM Stack for this integration to improve security and maintain separation from personal accounts.
- Policy Selection: Choose policies thoughtfully to avoid flooding UTM Stack with unnecessary incidents—focus on critical issues.
- Regular Monitoring: Periodically review the Incidents section in UTM Stack to confirm that action items are syncing correctly.