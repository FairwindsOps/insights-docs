---
meta:
  - name: title
    content: Fairwinds Insights|Create New Plugin
  - name: description
    content: Documentation for creating and contributing custom plugins in Fairwinds Insights
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, plugin
---
# Create a new plugin

The plugin-based architecture of Fairwinds Insights makes it easy to add new data and create
your own Action Items. You just need to generate some JSON, pull out any Action Items, and
send a POST request to the Insights API.

If you develop a custom Insights plugin, you can either keep it private, or contribute it
back to the community as open source. If your plugin is accepted as a core Insights plugin,
it may get some extra functionality, like report events or a special UI.

Most of our existing plugins are open source, so you can check out
[the repository](https://github.com/FairwindsOps/insights-plugins)
for examples.

We're also happy to help with any questions or problems - reach out to <insights@fairwinds.com>
and we'll work with you to add your custom data.

## Example
Let's say we have an organization-wide policy to never use the `default` namespace
in our Kubernetes clusters. We want to create a new Insights plugin that will
look in `default` and create an action item to delete any resources that show up there.

### The Data
The first thing to do is to get the data in JSON format. For our example, that's pretty easy:
```
kubectl get all -n default -o json > report.json
```

The response looks something like this:
```json
{
    "apiVersion": "v1",
    "items": [
        {
            "apiVersion": "v1",
            "kind": "Pod",
            "metadata": {
                "labels": {
                    "app": "nginx"
                },
                "name": "nginx-deployment-5b69968587-55ljl",
                "namespace": "default"
            },
            "spec": {}
        }
    ]
}
```
though we've shortened it up for brevity.

### Action Items
Now that we've got our baseline report, we need to create some Action Items.

We'll use [jq](https://stedolan.github.io/jq/) to parse through the report
and create them. You can check out
[some examples of how to use jq](https://shapeshed.com/jq-json/),
but the basic idea is that we'll use it to transform one JSON object (our report)
into another JSON object (the Action Items).

For example, say we wanted to transform the `items` array above into an array of the `kind`s
of each item. We could write:
```
$ cat report.json | jq '[.items[].kind]'
[
  "Pod",
  "Pod",
  "Pod",
  "Service",
  "Deployment",
  "ReplicaSet"
]
```

For each Action Item, we'll need a few fields:
* `EventType` - an ID for the type of Action Item, e.g. `resource_in_default_namespace`
* `Severity` - A number in [0, 1] describing how important the Action Item is, with 1 being critical
* `ResourceKind` - the kind of the affected resource, e.g. `Deployment` or `RoleBinding`
* `ResourceNamespace` - the namespace of the affected resource, e.g. `kube-system`
* `ResourceName` the name of the affected resource
* `Title` - a title for the action item
* `Description` - a description of the action item
* `Remediation` - some instructions on how to go about fixing the issue (markdown is OK here)

Let's see how we can set those fields with jq:
```
$ cat report.json | jq '
[.items[] |
{
  EventType: "resource_in_default_namespace",
  Severity: .3,
  ResourceKind:.kind,
  ResourceNamespace: .metadata.namespace,
  ResourceName: .metadata.name,
  Title: "Resource found in the default namespace",
  Description: "We disallow resources in the default namespace. Please delete this resource",
  Remediation: ("`kubectl delete " + .kind + " " + .metadata.name + " -n default`"),
}]' > action-items.json
```

### Packaging the data
Next, we'll need to package both the report and action items into a single JSON object.
We'll also include a `ReportVersion` so we can keep track of any changes to the report's
output structure.

To do this, run:
```
jq -s '{ReportVersion: "0.0.1", Report: .[0], ActionItems: .[1]}' \
    report.json action-items.json > request.json
```

### Sending the data to Insights
We'll use the `custom-reports` API endpoint to send our report back to Fairwinds Insights.
Note that you'll need to know your organization name, cluster name, and cluster auth token.

To get your cluster auth token, copy the `base64token` from the Helm installation instructions
on your cluster's settings page, and run:
```
CLUSTER_TOKEN=$(echo $BASE_64_TOKEN | base64 -d)
```

```
curl -X POST \
  -H "Authorization: Bearer $CLUSTER_TOKEN" \
  -H "Content-Type: application/json" \
  "https://insights.fairwinds.com/v0/organizations/$ORG/clusters/$CLUSTER/custom-reports/default-check" \
  -d @request.json
```

You should see action items appearing in the Insights UI!

### Putting it all together
To start running your report regularly, you'll want to package all of your commands into
a single bash script, e.g.
```
#! /bin/bash
kubectl get all -n default -o json > report.json

cat report.json | jq '
[.items[] |
{
  EventType: "resource_in_default_namespace",
  Severity: .3,
  ResourceKind:.kind,
  ResourceNamespace: .metadata.namespace,
  ResourceName: .metadata.name,
  Title: "Resource found in the default namespace",
  Description: "We disallow resources in the default namespace. Please delete this resource",
  Remediation: ("`kubectl delete " + .kind + " " + .metadata.name + " -n default`"),
}]' > action-items.json

jq -s '{ReportVersion: "0.0.1", Report: .[0], ActionItems: .[1]}' \
    report.json action-items.json > request.json

curl -X POST \
  -H "Authorization: Bearer $CLUSTER_TOKEN" \
  -H "Content-Type: application/json" \
  "https://insights.fairwinds.com/v0/organizations/$ORG/clusters/$CLUSTER/custom-reports/default-check" \
  -d @request.json
```

You can this put this inside a Docker container, and wrap that Docker container
with a Kubernetes CronJob to run it on a regular basis. But be sure that the service
account it uses has the necessary RBAC permissions!
