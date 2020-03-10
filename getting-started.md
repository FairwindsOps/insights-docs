# Getting Started

## Create a new Cluster

To get started with Fairwinds Insights, [create an account](https://insights.fairwinds.com/auth/register)

Once you've signed up and confirmed your email address, you'll be prompted to
create a new organization:

![New Org](img/new-org.png)

Choose a unique name for your organization, like `acme-co`. You'll be able to add clusters to this
organization, as well as any coworkers you'd like to collaborate with.

Once you've created an organization, you can create a new cluster, e.g. `staging`

![New Cluster](img/new-cluster.png)

## Install the Agent

When you create the cluster, you'll be prompted to install the [Insights Agent](./insights-agent)
We recommend using Helm (either v2 or v3) to install the agent, as this will
allow you to customize your installation.

![Helm install](img/helm-install.png)
