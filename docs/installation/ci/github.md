---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to connect Fairwinds Insights to GitHub"
---
# Connect to GitHub
Connecting Insights to your GitHub repository will help you get the most out of the CI integration.
To get started:
1. Visit your organization's `Repositories` page and click `Add Repository`
2. Click on `Connect Github`

Then, in the GitHub UI, choose which repositories you'd like to link to Insights:
<img :src="$withBase('/img/github-add-repo.png')" alt="Add repo in GitHub">

### Using the GitHub Integration
Connecting GitHub with Fairwinds Insights unlocks several features:
- Auto-Scan for Infrastructure-as-Code
- Scan results posted to pull requests as comments
- Fairwinds Insights status on pull requests

### Example: Status on Pull Requests
For example, once your repository is linked, you'll start seeing a Fairwinds Insights status on each of your pull requests.
<img :src="$withBase('/img/github-status.png')" alt="Check GitHub status">
