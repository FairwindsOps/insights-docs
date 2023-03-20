---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to connect Fairwinds Insights to GitHub"
---
# Connect to GitHub

## Connect Insights to Github
Connecting Insights to your GitHub repository will help you get the most out of the CI integration.
To get started:
1. Visit your organization's `Repositories` page and click `Add Repository`
2. Click on `Connect Github`

Then, in the GitHub UI, choose which repositories you'd like to link to Insights:
<img :src="$withBase('/img/github-add-repo.png')" alt="Add repo in GitHub">

## Using the GitHub Integration
Connecting GitHub with Fairwinds Insights unlocks several features:
1. Auto-Scan for Infrastructure-as-Code
2. Scan results posted to pull requests as comments
3. Fairwinds Insights status on pull requests
4. Automated Pull Request Fix
5. Create an Github Issue based on a Fairwinds Insights Action Item

## Fairwinds Insights GitHub Application Permissions Required
To provide these features, the Fairwinds Insights GitHub Application requires the following permissions:

| Repositories Permission | Read    | Write   | Description | Used for features |
|-------------------------|---------|---------|-------------|-------------------|
| Metadata                | &check; |         | Search repositories, list collaborators, and access repository metadata. | (mandatory) |
| Commit statuses         | &check; | &check; |             | 3 |
| Content                 | &check; | &check; | Repository contents, commits, branches, downloads, releases, and merges. | 1, 4|
| Issues                  | &check; | &check; | Issues and related comments, assignees, labels, and milestones. | 5 |
| Pull Request            | &check; | &check; | Pull requests and related comments, assignees, labels, milestones, and merges.  | 2, 4 |
| WebHooks                | &check; | &check; | Manage the post-receive hooks for a repository. | |

### Status on Pull Requests Example
For example, once your repository is linked, you'll start seeing a Fairwinds Insights status on each of your pull requests.
<img :src="$withBase('/img/github-status.png')" alt="Check GitHub status">
