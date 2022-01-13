---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to connect Fairwinds Insights to GitHub. "
---
# Connect to GitHub
> You can still use the Continuous Integration feature without GitHub.
>
> Using Gitlab, Bitbucket, or another Git host? Let us know!

Connecting Insights to your GitHub repository will help you get the most out of the CI integration.
To get started, click the **Install Now** link on your organization's repositories tab.

Then, in the GitHub UI, choose which repositories you'd like to link to Insights:
<img :src="$withBase('/img/github-add-repo.png')" alt="Add repo in GitHub">

Once your repository is linked, you'll start seeing a Fairwinds Insights status on each of your
pull requests.
<img :src="$withBase('/img/github-status.png')" alt="Check GitHub status">

We recommend setting `options.setExitCode: false` in your fairwinds-insights.yaml, since
this check will now fail in place of your CI pipeline.
