---
meta:
  - name: title
    content: Fairwinds Insights Install Hub
  - description:
    content: The Install Hub allows you to choose which Kubernetes reports run in your cluster
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
  - name: description
    content: "Fairwinds Insights | Documentation: Report customization through the Install Hub"

---
# Install Hub

## Report Customization
You can customize any of the reports through the `Install Hub`:
1. Visit your organization's `Clusters` page
2. After selecting a cluster, go to the `Install Hub` page
3. Click on a report and navigate to `Configure` 

<img :src="$withBase('/img/report-hub-customize.png')" alt="customize report">

You will see the following options:
* `schedule` - a Cron expression describing when to run this report
* `timeout` - the maximum time this report should run before an error is triggered (seconds)

These options will be reflected in the `helm install` command you'll see when you click `Ready to Install`
in the `Install Hub`.
Be sure to run the new command after making any changes here.
