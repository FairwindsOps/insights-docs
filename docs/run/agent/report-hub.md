---
meta:
  - name: title
    content: Fairwinds Insights Report Hub
  - description:
    content: The Report Hub allows you to choose which Kubernetes reports run in your cluster
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
  - name: description
    content: "Fairwinds Insights | Documentation: Using the Report Hub to decide which open source tools to run in your cluster. "

---
# Report Hub

Use the Report Hub to decide which reports you'd like to run in your cluster.

<img :src="$withBase('/img/report-hub.png')" alt="report hub tiles">

The easiest way to install is to use the `Quick Add` button below a report, then click the
`Install` icon at the top-right:

<img :src="$withBase('/img/report-hub-install.png')" alt="report hub install">

You'll then be prompted with instructions for installing the Insights Agent in your cluster:

<img :src="$withBase('/img/helm-install.png')" alt="helm install">

## Customization
You can customize any of the reports by clicking on its tile.

<img :src="$withBase('/img/report-hub-customize.png')" alt="customize report">

Some common options are:
* `schedule` - a Cron expression describing when to run this report
* `timeout` - the maximum time this report should run before an error is triggered

These options will be reflected in the `helm install` command you'll see when you click the `Install` icon.
Be sure to run the new command after making any changes here.

## Report History
The `History` tab will show you a list of recent reports for each report type.

<img :src="$withBase('/img/report-history.png')" alt="report history">

You can click the `View Report` link to see the raw data from each report.
This can be helpful for debugging.
