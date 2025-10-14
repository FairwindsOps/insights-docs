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

You may also choose to append an `Additional Description` to the ticket. Additional descriptions must be created on the `Settings > Ticketing` page.

When creating a `Ticket Additional Description`, note that each provider supports its own formatting:

- For **Jira**, use the Atlassian Document Format (ADF). [Atlassian ADF WYSIWYG](https://developer.atlassian.com/cloud/jira/platform/apis/document/playground)
- For **Azure DevOps**, you can use either HTML or raw text.
- For **GitHub**, you can use either Markdown or raw text. [Github Markdown Reference](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/about-writing-and-formatting-on-github)

## Custom Fields

Fairwinds Insights supports advanced custom field configuration for Jira tickets. Custom fields allow you to:

* Map existing Jira fields to Insights custom fields
* Set default values for consistent ticket creation
* Configure field validation and constraints
* Support complex field types like cascading selects and user pickers

Custom fields are configured per Jira project and can be set to display by default in the ticket creation modal or selected on-demand.

For detailed configuration instructions, see [Jira Custom Fields](/features/jira-custom-fields).
