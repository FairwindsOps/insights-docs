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
To get started:
- Navigate to "Repositories:
- Click on "Add Repository" in the upper-right
- Select "Connect GitHub"

Then, in the GitHub UI, choose which repositories you'd like to link to Insights:
<img :src="$withBase('/img/github-add-repo.png')" alt="Add repo in GitHub">

# Using the GitHub Integration
Connect GitHub with Fairwinds Insights unlocks several features:
- Auto-Scan for Infrastructure-as-Code
- Scan results posted to Pull Requests as Comments
- Fairwinds Insights Status on Pull Requests

## Example: Status on Pull Requests
For example, once your repository is linked, you'll start seeing a Fairwinds Insights status on each of your pull requests.
<img :src="$withBase('/img/github-status.png')" alt="Check GitHub status">

We recommend setting `options.setExitCode: false` in your fairwinds-insights.yaml, since
this check will now fail in place of your CI pipeline.


