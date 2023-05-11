---
meta:
  - name: description
    content: "Fairwinds Insights is a Kubernetes config validation platform. View the documentation on how to install and learn about features and supported plugins."
  - name: keywords
  - content: "Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation"
---
# Fairwinds Insights
<blockquote class="github-only">
<p>
You're currently viewing the documenation on GitHub. Links, images,
and other features will not work properly.
</p>
<p>
To view the full docs, visit
<a href="http://insights.docs.fairwinds.com">insights.docs.fairwinds.com</a>
</p>
</blockquote>

[Fairwinds Insights](https://fairwinds.com/insights) is a policy-driven Configuration Validation platform
that integrates an extensible set of trusted open source auditing tools.
Fairwinds Insights runs across the entire development lifecycle, from CI to Admission to Production.

The platform enables DevOps teams to find and prevent configuration problems as applications move
from development to production. It provides out-of-the-box
[integrations into CI/CD workflows](/features/infrasturcture-as-code-scanning),
an [admission controller](/features/admission-controller)
for enforcing custom policies (using Polaris or Open Policy Agent) at pre-deployment,
and automation for running
[Kubernetes auditing tools](/features/in-cluster-scanning).
Findings and recommendations are stored in a single location, enabling operators to gain visibility
and control over multiple Kubernetes clusters, track and prioritize issues,
and monitor the security and cost of Kubernetes workloads.

Learn more about
[installing Fairwinds Insights](/features/in-cluster-scanning),
features like [Slack notifications](/features/integrations),
and our [supported plugins](/technical-details/reports/polaris).

<!-- Begin boilerplate -->
## Join the Fairwinds Open Source Community

The goal of the Fairwinds Community is to exchange ideas, influence the open source roadmap,
and network with fellow Kubernetes users.
[Chat with us on Slack](https://join.slack.com/t/fairwindscommunity/shared_invite/zt-e3c6vj4l-3lIH6dvKqzWII5fSSFDi1g)
or
[join the user group](https://www.fairwinds.com/open-source-software-user-group) to get involved!

<a href="https://insights.fairwinds.com/auth/register/">
  <img src="https://www.fairwinds.com/hubfs/Doc_Banners/Fairwinds_OSS_User_Group_740x125_v6.png"
  alt="Love Fairwinds Open Source? Automate Fairwinds Open Source for free with Fairwinds Insights. Click to learn more" />
</a>

## Other Projects from Fairwinds

Enjoying insights-docs? Check out some of our other projects:
* [Polaris](https://github.com/FairwindsOps/Polaris) - Audit, enforce, and build policies for Kubernetes resources, including over 20 built-in checks for best practices
* [Goldilocks](https://github.com/FairwindsOps/Goldilocks) - Right-size your Kubernetes Deployments by compare your memory and CPU settings against actual usage
* [Pluto](https://github.com/FairwindsOps/Pluto) - Detect Kubernetes resources that have been deprecated or removed in future versions
* [Nova](https://github.com/FairwindsOps/Nova) - Check to see if any of your Helm charts have updates available
* [rbac-manager](https://github.com/FairwindsOps/rbac-manager) - Simplify the management of RBAC in your Kubernetes clusters

Or [check out the full list](https://www.fairwinds.com/open-source-software?utm_source=insights-docs&utm_medium=insights-docs&utm_campaign=insights-docs)
