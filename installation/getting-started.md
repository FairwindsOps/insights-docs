---
meta:
 - name: title
   content: Getting Started with Fairwinds Insights
 - description:
   content: Getting started documentation on Fairwinds Insights. Getting started includes three easy steps - sign up, create a cluster and install the agent.
 - name: keywords
   content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
---


# Getting Started

## Create a new Cluster

To get started with Fairwinds Insights, [create an account](https://insights.fairwinds.com/auth/register)

Once you've signed up and confirmed your email address, you'll be prompted to
create a new organization:

![New Org](/img/new-org.png)

Choose a unique name for your organization, like `acme-co`. You'll be able to add clusters to this
organization, as well as any coworkers you'd like to collaborate with.

Once you've created an organization, you can create a new cluster, e.g. `staging`

![New Cluster](/img/new-cluster.png)

## Install the Agent

When you create the cluster, you'll be prompted to install the [Insights Agent](insights-agent)
You'll need to use [Helm](https://helm.sh/) to install - if you'd like to view the Kubernetes
manifests first, you can use `helm template` to generate the YAML files.

[See the Report Hub documentation](report-hub) for next steps.

