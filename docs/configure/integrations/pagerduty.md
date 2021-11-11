# PagerDuty
The PagerDuty integration allows you to create PagerDuty incidents for
any Action Item in Fairwinds Insights. This includes all three contexts -
CI/CD, Admission Control, and In-Cluster.

PagerDuty incidents are created via [Automation Rules](/configure/policy/rules#pagerduty-incidents).
You can customize your Automation Rule to only trigger on particular events
(like critical-level container CVEs from Trivy). You can also customize the
PagerDuty incident with different levels of urgency, add resource metadata
and remediation details to the incident body, and more.

## How it Works
Users can create new PagerDuty incidents for specific scenarios using
Fairwinds Insights’ Automation Rule functionality. Automation Rules trigger
automatically when certain scenarios are met. For example, a common user
scenario is creating a PagerDuty incident when a new high severity security
misconfiguration is found in the Kubernetes cluster.

At a minimum, a PagerDuty incident requires an incident title, a PagerDuty
service ID, and an urgency threshold (low or high). Users can optionally
configure an incident description, which are good places to store remediation
recommendations and workload-related details. Incidents may also be routed to
an escalation policy or assigned to specific PagerDuty user IDs.

Once a PagerDuty incident is created, it will appear in the PagerDuty console
under the specific service ID specified.

## Requirements
An Admin or Account Owner will need to perform a one-time setup of the integration.
This can be done via OAuth by visiting
[insights.fairwinds.com](https://insights.fairwinds.com)
and going to Settings > Integrations > PagerDuty.

The user who authorizes the application will appear in the PagerDuty UI as
having triggered the incident. We suggest creating a "robot account" for authenticating
with Fairwinds Insights to prevent any confusion.

## Support
If you need help with this integration, please contact support@fairwinds.com.

## Integration Walkthrough

In Fairwinds Insights, set up the PagerDuty integration:
* Navigate to “Settings”
* Click on “Integrations”
* Click “Add Integration” under the PagerDuty icon
* Login to PagerDuty and authorize the integration

Then configure an Automation Rule:
* Navigate to your Organization in Fairwinds Insights
* Click on “Automation”
* Click “Create Custom Rule”
* Configure the context of the rule. Learn more about [Automation Rule configuration here](/configure/policy/rules#automation-rules)
* Inside the Automation Rule scripting area, you can use the `createPagerDutyIncident` function to create incidents. You can see [details for this function here](/configure/policy/rules#pagerduty-incidents)

### Example
```js
if (ActionItem.Severity >= CRITICAL_SEVERITY && ActionItem.IsNew) {
  incident = {
        "title": ActionItem.Title,
        "serviceID": "PIIWGG1",
        "urgency": "high",
        "bodyDetails": ActionItem.Description,
        "assignmentIDs": ["P6GC8ZZ"] // optional
  }
  createPagerDutyIncident("insights@acme-co.com", incident)
}

```

## How to Uninstall
To uninstall the PagerDuty integration, login to Fairwinds Insights:
* Navigate to “Settings”
* Click “Integrations”
* Click “Remove” under the PagerDuty icon

Please note, any Automation Rules using PagerDuty may no longer work as expected.
