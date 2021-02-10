# OPA Policies

The [OPA Report](/reports/opa) allows you to define custom policies for checking Kubernetes resources.
This is useful for enforcing policies that are specific to your organization - e.g. particular labeling
schemes or required annotations.

This page discusses the Policy UI - to learn more about how to write OPA
policies you can check out the [OPA Documentation](/reports/opa)

## Create a Policy
To get started, go to the `Policy` tab, and click the `Create Custom Policy` button.

<div>
  <img :src="$withBase('/img/policy.png')" alt="create policy">
</div>

First, be sure to give your policy a good name and description, so you can refer back to it later.

You'll see a sample policy that disallows Deployments named `evil`. This should give you a quick sense for
how to write OPA policies for Insights.

The top box contains the Rego, which will check the Kubernetes resource for violations, and report back
details of the violation to Insights.

The bottom boxes tell Insights which types of resources this check should be applied to. Be sure to give these a descriptive name as well.

<div>
  <img :src="$withBase('/img/sample-policy.png')" alt="sample policy">
</div>

## Create from Template
Insights also comes with a library of OPA Policies which you can clone and modify as needed:

<div>
  <img :src="$withBase('/img/policy-templates.png')" alt="policy templates">
</div>

