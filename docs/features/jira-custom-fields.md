---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Configure Jira custom fields for enhanced ticket creation with field mapping, validation, and advanced field types"
  - name: keywords
    content: "Fairwinds Insights, Jira, Custom Fields, Ticket Creation, Field Mapping"
---

# Jira Custom Fields

## Overview

Fairwinds Insights provides advanced Jira custom field support, allowing you to create sophisticated field mappings between Insights and your Jira projects. This feature enables enhanced ticket creation with custom field validation, default values, and support for complex Jira field types.

## Prerequisites

Before configuring custom fields, ensure you have:
* [Connected Jira to your Insights organization](/features/integrations#jira)
* Administrative access to your Jira projects
* Understanding of your Jira project's field requirements

## Accessing Custom Fields Management

1. Navigate to your organization's `Settings` page
2. Click on `Jira Custom Fields` in the sidebar
3. Select a Jira project to view available fields

## Creating Custom Field Mappings

### Step 1: Browse Available Fields

1. Click `Create from Jira Field` button
2. Select your target Jira project from the dropdown
3. Browse the list of available Jira fields
4. Click on a field to create a custom mapping

### Step 2: Configure Field Mapping

When creating a custom field mapping, you can configure:

#### Basic Configuration
* **Custom Field Name**: Display name in Insights ticket creation
* **Description**: Helper text for users
* **Display by Default**: Show field automatically in ticket creation modal

#### Advanced Configuration
* **Default Value**: Pre-populate field with a default value
* **Field Type**: Automatically detected from Jira field schema
* **JSON Template**: Advanced field value formatting (for API integrations)

### Step 3: Save and Test

1. Click `Create Mapping` to save your configuration
2. Test the field in the ticket creation modal
3. Verify the field appears correctly in created Jira tickets

## Supported Field Types

Fairwinds Insights supports 30+ Jira field types:

### Text Fields
* **Text Field**: Single-line text input
* **Text Area**: Multi-line text input
* **Rich Text**: Formatted text with Atlassian Document Format

### Selection Fields
* **Select**: Single-option dropdown
* **Multi-Select**: Multiple-option selection
* **Cascading Select**: Hierarchical option selection
* **Radio Buttons**: Single-option radio selection
* **Checkboxes**: Multiple-option checkbox selection

### Date and Time
* **Date Picker**: Date selection
* **Date Time**: Date and time selection

### User Management
* **User Picker**: Single user selection
* **Multi-User Picker**: Multiple user selection
* **Group Picker**: Group selection
* **Multi-Group Picker**: Multiple group selection

### Specialized Fields
* **Labels**: Tag-based labeling
* **URL**: Web address input
* **Number**: Numeric input
* **Version**: Project version selection
* **Project**: Project selection

## Field Configuration Options

### Default Values

Set default values for consistent ticket creation:

* **Text Fields**: Static text or dynamic placeholders
* **Select Fields**: Pre-selected options from available values
* **User Fields**: Default assignees or watchers
* **Date Fields**: Relative dates (e.g., "today + 7 days")

### Display Settings

* **Display by Default**: Field appears automatically in ticket creation
* **Optional Selection**: Field available in "Add Custom Field" dropdown

### Validation Rules

Configure field validation (where supported):
* Required field enforcement
* Format validation for text fields
* Range validation for numeric fields

## Managing Custom Fields

### Viewing All Custom Fields

The custom fields management page shows:
* **Project Organization**: Fields grouped by Jira project
* **Field Details**: Name, Jira field ID, type, and description
* **Usage Statistics**: Number of tickets using each field

### Editing Custom Fields

1. Click `Edit` next to any custom field
2. Modify configuration options
3. Save changes to update the field mapping

### Deleting Custom Fields

1. Click `Delete` next to the field to remove
2. Confirm deletion in the modal
3. Field will be removed from future ticket creation (existing tickets unaffected)

## Using Custom Fields in Ticket Creation

### Automatic Display

Fields marked "Display by Default" appear automatically in the ticket creation modal with:
* Field label and description
* Appropriate input component based on field type
* Default value pre-populated (if configured)

### Manual Selection

Other custom fields can be added via:
1. Click `Add Custom Field` in ticket creation modal
2. Select desired fields from the dropdown
3. Configure field values as needed

### Field Validation

Custom fields are validated before ticket creation:
* Required fields must be completed
* Field formats are validated (URLs, emails, etc.)
* Option selections are verified against available values

## Advanced Features

### JSON Templates

For advanced integrations, custom fields support JSON templates:

```json
{
  "type": "{{.fieldType}}",
  "value": "{{.value}}",
  "metadata": {
    "source": "fairwinds-insights",
    "timestamp": "{{.timestamp}}"
  }
}
```

### Context-Aware Fields

Some Jira fields are context-aware and may show different options based on:
* Selected issue type
* Project configuration
* User permissions

### Field Dependencies

Certain field types support dependencies:
* Cascading selects with parent-child relationships
* Conditional field display based on other field values

## Troubleshooting

### Common Issues

**Field Not Appearing in Ticket Creation**
* Verify field is marked "Display by Default" or manually add it
* Check Jira project permissions for the field
* Ensure field is available for the selected issue type

**Default Values Not Working**
* Verify default value format matches field type requirements
* Check for special characters or formatting issues
* Test with simple values first

**Field Options Not Loading**
* Verify Jira connection is active
* Check project permissions for field access
* Refresh the page and try again

### Getting Help

If you encounter issues with custom fields:
1. Check the Insights UI for error messages
2. Verify Jira permissions and field configuration
3. Contact Fairwinds support with specific error details

## Best Practices

### Field Organization
* Use descriptive names for custom fields
* Group related fields logically
* Limit the number of default-display fields to avoid cluttered UI

### Default Values
* Set sensible defaults for frequently-used values
* Use dynamic values where appropriate (dates, user assignments)
* Test default values across different scenarios

### Maintenance
* Regularly review and clean up unused custom fields
* Update field descriptions as requirements change
* Monitor field usage to optimize ticket creation workflows

## API Integration

Custom fields are fully supported in the Insights API:

```bash
# Get custom fields for a project
GET /v0/organizations/{org}/jira/projects/{project}/insights-custom-fields

# Create a custom field
POST /v0/organizations/{org}/jira/projects/{project}/insights-custom-fields

# Update a custom field
PUT /v0/organizations/{org}/jira/projects/{project}/insights-custom-fields/{id}
```

See the [API documentation](/technical-details/api/authentication) for complete endpoint details.

