# Ticketing

## Introduction

The following integrations provide ticketing capabilities for specific resources in Fairwinds Insights:

- [GitHub](/features/integrations#github)
- [Jira](/features/integrations#jira)
- [Azure DevOps](/features/integrations#azure-devops)

This functionality enables you to track the following resources externally:

* In-Cluster Action Items
* Infrastructure-as-Code Action Items
* Images
* Compliance Report Checks
* Action Item Lists

## Ticket Creation

Within the Fairwinds Insights UI, you will find a `Create Ticket` button that opens a modal window. This modal allows you to select various fields to configure how your ticket is created.

Depending on the ticket provider and/or project selected, different configuration options may be available.

## Additional Description

Tickets are created with default descriptions based on the originating resource. For example:

- **Action Item Lists:** The ticket includes details about the list and its underlying action items.
- **Images:** The ticket includes information about the image and any related CVEs.

You may also choose to append an `Additional Description` to the ticket. Additional descriptions must be registered on the `Settings > Ticketing` page.

When creating the `Tickets Additional Descriptions` catalog, note that each provider supports its own formatting:

- For **Jira**, use the Atlassian Document Format (ADF). [Atlassian ADF WYSIWYG](https://developer.atlassian.com/cloud/jira/platform/apis/document/playground)
- For **Azure DevOps**, you can use either HTML or raw text. [HTML WYSIWYG](https://wysiwyghtml.com/)
- For **GitHub**, you can use either Markdown or raw text. [Markdown WYSIWYG](https://dillinger.io)

## Additional Fields

TBD