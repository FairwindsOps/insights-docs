---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to connect Fairwinds Insights to PagerDuty"
---
# PagerDuty
The PagerDuty integration allows you to create PagerDuty incidents for
any Action Item in Fairwinds Insights. This includes all three contexts:
Insights Agent, CI/CD and Admission Controller.

PagerDuty incidents are created via [Automation Rules](/configure/automation/integrations#pagerduty-incidents).
You can customize your Automation Rule to only trigger on particular events
(e.g. critical level container CVEs from Trivy). You can also customize the
PagerDuty incident with different levels of urgency, add resource metadata
and remediation details to the incident body and more.

## How It Works
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

## Installation
>The user who authorizes the application will appear in the PagerDuty UI as
having triggered the incident. We suggest creating a "robot account" for authenticating
with Fairwinds Insights to prevent any confusion

1. Visit your organization's `Settings > Integration` page
2. Hover over `PagerDuty` and click `Add Integration`
3. Once you have connected PagerDuty to Insights, you can use [Automation Rules to trigger incidents](/configure/automation/integrations/#pagerduty-incidents)
