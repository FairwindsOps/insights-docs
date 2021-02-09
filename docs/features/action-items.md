---
meta:
  - name: title
    content: How Fairwinds Insights Action Items Work
  - name: description
    content: Action Items are at the heart of Fairwinds Insights. Every audit tool may generate one or more Action Items, depending on results. Read the documentation. 
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, action items
---
# Action Items
Action Items are at the heart of Fairwinds Insights. Every auditing tool may generate one or more
Action Items, depending on what it finds in your cluster.

When a particular Action Item disappears from a report, it will automatically be marked as `fixed`,
and will disappear from the default Action Items view.

<img :src="$withBase('/img/action-items.png')" alt="action items">

## Filtering
By default, Insights won't show you items that have been fixed or resolved. If you'd like to
see these items, you can clear the filters by clicking the down arrow next to each and unchecking the selected value:

<div class="mini-img">
  <img :src="$withBase('/img/action-item-filters.png')" alt="action item filters">
</div>

You can also add new filters to the Action Items table, by clicking the arrow
next to a column's name:

<div class="mini-img">
  <img :src="$withBase('/img/action-item-apply-filter.png')" alt="action item add filters">
</div>

## Sorting
By default, Insights sorts Action Items by severity. You can sort by a different field
by clicking the header of a column:

<div class="mini-img">
  <img :src="$withBase('/img/action-item-sort.png')" alt="action item sort">
</div>

## Assigning
Action Items can be assigned to any member of your organization.

To assign a single Action Item, use the dropdown in its row:

<div class="mini-img">
  <img :src="$withBase('/img/action-item-assign.png')" alt="action item assign">
</div>

You can also assign many Action Items at once by using the checkboxes on the left.
You may want to apply some filters first, then use the top checkbox to select
all visible items.

<div class="mini-img">
  <img :src="$withBase('/img/action-item-assign-many.png')" alt="action item assign many">
</div>

## Resolving
Action Items can be resolved manually, by marking them as **Will not fix** or **Working as intended**.
Resolved Action Items will no longer appear on the default Action Items view.

<div class="mini-img">
  <img :src="$withBase('/img/action-item-resolve.png')" alt="action item resolve">
</div>

You can also resolve many Action Items at once by using the checkboxes on the left.
You may want to apply some filters first, then use the top checkbox to select
all visible items.

<div class="mini-img">
  <img :src="$withBase('/img/action-item-resolve-many.png')" alt="action item resolve many">
</div>

## Ticketing Integrations
Insights can connect to external ticketing systems (currently only GitHub) to help you track
your Action Items where you already live.

To turn an Action Item into a ticket, click the `create ticket` button in the Action Items UI:

<div class="mini-img">
  <img :src="$withBase('/img/create-ticket.png')" alt="create ticket">
</div>

