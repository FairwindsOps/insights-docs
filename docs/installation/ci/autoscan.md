---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to Use Auto Scan"
---
# Setup Auto-Scan
## What is Auto-Scan?
Auto-Scan enables organizations using GitHub to enable infrastructure-as-code scanning across multiple repositories without
having to configure individual CI pipelines. Scans will use the Fairwinds Insights SaaS infrastructure to run the checks.

This eliminates the need to configure individual CI pipelines, allows organizations to save on compute resources and turns
on "shift left" infrastructure-as-code testing in minutes.

This feature requires you to first connect Fairwinds Insights to GitHub. Fairwinds Insights will
request the following permissions:
* **Read access to code and metadata:** These permissions allow Fairwinds Insights to identify relevant infrastructure-as-code
files, such as YAML and Helm Charts that can be scanned for security, efficiency and reliability best practices.
* **Read and write access to commit statuses, issues and repository hooks:** These permissions allow Fairwinds Insights
to create issues within a repository (as part of Create Ticket workflows), post scan findings as comments on pull requests
and update commit statuses with a summary of scan results. The repository hooks that Fairwinds Insights monitors
are `push` and `pull request`.

## Step 1: Connect Insights to GitHub
Connecting Insights to your GitHub repository will help you get the most out of the CI integration.
To get started:
1. Visit your organization's `Repositories` page and click `Add Repository`
2. Click on `Connect GitHub`
3. Follow the on-screen instructions to authorize Fairwinds Insights access to GitHub

Once you authorize GitHub, you can choose which repositories you'd like to add to Insights:
<img :src="$withBase('/img/github-add-repo.png')" alt="Add repo in GitHub">

## Step 2: Configure Auto-Scan on Specific Repositories
Once you have connected Fairwinds Insights to GitHub, you will need to intentionally enable Auto-Scan for specific repositories. This is done within Fairwinds Insights

1. Visit your organization's `Repositories` page
2. Click on `Settings` in the upper-right of the page
3. A modal will appear for configuring Auto-Scan and GitHub Issue creation for each repository. Toggle the `Auto-Scan`
option to enable/disable Auto-Scan for that specific repository.

## Step 3: Running Your First Scan
For the repositories you've enable Auto-Scan on, Fairwinds Insights will crawl those repositories and scan any YAML and Helm charts on your next pull request.

#### Scanning Container Images With Auto-Scan
Insights will automatically scan any public container images mentioned in your manifets. You can also add
additional images to scan in your fairwinds-insights.yaml

Scanning private container images is not yet supported in Auto-Scan, but is currently on-roadmap.

## Troubleshooting Auto-Scan
Please see the [Configure > Infrastructure-as-Code Scanning > Auto-Scan](/configure/ci/autoscan#troubleshooting-auto-scan) page for troubleshooting information.

