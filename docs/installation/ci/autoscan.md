---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to Use Auto Scan"
---
# Using Auto-Scan
### What is Auto-Scan for Infrastructure-as-Code?
Auto-Scan enables organizations using GitHub to enable infrastructure-as-code scanning across multiple repositories without
having to configure individual CI pipelines. Scans will use the Fairwinds Insights SaaS infrastructure to run the checks.

This eliminates the need to configure individual CI pipelines, allows organizations to save on compute resources, and turns
on "shift left" infrastructure-as-code testing in minutes.

This feature requires you to first connect Fairwinds Insights to GitHub. Fairwinds Insights will
request the following permissions:
* **Read access to code and metadata:** These permissions allow Fairwinds Insights to identify relevant infrastructure-as-code
files, such as YAML and Helm Charts that can be scanned for security, efficiency and reliability best practices.
* **Read and write access to commit statuses, issues, and repository hooks:** These permissions allow Fairwinds Insights
to create issues within a repository (as part of Create Ticket workflows), post scan findings as comments on pull requests
and update commit statuses with a summary of scan results. The repository hooks that Fairwinds Insights monitors
are `push` and `pull request`.

### Connecting to GitHub
For customers who do not have GitHub connected to Fairwinds Insights, follow the steps documented here
to [setup the GitHub integration.](/installation/ci/github/)

### Configuring Auto-Scan for Specific Repositories
Once you have connected Fairwinds Insights to GitHub, you will need to intentionally enable Auto-Scan for the repositories
you've selected in the previous steps.

1. Visit your organization's `Repositories` page and click `Add Repository`
2. Click on `Connect Github`
3. A new modal will appear for configuring Auto-Scan and GitHub Issue creation for each repository. Toggle the Auto-Scan
option to enable/disable Auto-Scan for that specific repository.

Now, next time you make a pull request, Fairwinds Insights will look for YAML and Helm charts in that pull request and 
automatically scan them.

Note: We will be streamlining this user experience in coming releases — stay tuned!
