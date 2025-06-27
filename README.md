# Test Cases

## Row Selection

- The `onRowSelected` prop should be forwarded to the table called accordingly.
- The prop `getSelectionOptions` can be set on the table and accepts a function.
- The selection controls are not rendered unless at least one row is selected.
- The selection controls are rendered as specified in the `getSelectionOptions` return value and receive the selection array.

## Quick filter

- The prop `quickFilter` can be set on the table and accepts a string.
- If the prop `quickFilter` is set, the search button appears in the table toolbar.
- If the prop `quickFilter` is not set, the search button does not appear in the table toolbar.
- Clicking on the search button shows the search textbox. It is hidden otherwise.
- Typing into the search textbox sets the `s` query parameter with a delay of 500ms.
- Typing into the search textbox updates the grid with a delay of 500ms.
- If the URL query parameter `s` is set while the page loads, the search textbox will apply that as its default value.
- Pressing ESC while the search textbox is visible clears the URL query parameter, resets the grid, and hides the textbox.
- Clicking on the Close button while the search textbox is visible clears the URL query parameter, resets the grid, and hides the textbox.

## Custom views

- The prop `customViewsLayout` can be set on the table and accepts "dropdown", "simple", or "none".

### "simple" custom view layout

- As long as the table state remains unchanged, no controls are visible.
- When the table state changes (sort order, column order, filter, etc.) and no custom view is currently selected, the "Create custom view" and "Reset view" button appear on the top left.

## Table menu

### Highlight errors

- The prop `getRowErrorState` can be set on the table and accepts a function.
- If the prop `getRowErrorState` is set, the option "Highlight errors" appears in the table menu.
- If the prop `getRowErrorState` is not set, the option "Highlight errors" does not appears in the table menu.
- Disabling error highlights via the table menu no longer shows conditional error states for rows.
- Enabling error highlights via the table menu shows conditional error states for rows.
- The error highlights setting is scoped to one table - switching it doesn't affect other tables.
- Switching the setting keeps the table state, like column order, sort order, filters, and more.

### Column header format

- The option "Show column headers in code format" is always visible in the table menu.
- Enabling column header format changes the column header name to the property name from the data source.
- Disabling column header format changes the column header name to the provided, formatted string from the column definitions.
- Column header format is a global setting - switching it affects other tables.
- Switching the setting keeps the table state, like column order, sort order, filters, and more.

### Live updates

- The prop `refreshInterval` can be set on the table and accepts a number.
- If the prop `refreshInterval` is set, the option "Live updates" appears in the table menu.
- If the prop `refreshInterval` is not set, the option "Live updates" does not appears in the table menu.
- The table data is refetched in the same interval as specified by `refreshInterval`.
- Disabling live updates via the table menu pauses the refresh interval.
- Enabling live updates via the table menu resumes the refresh interval.
- Live updates is a global setting - switching it affects other tables.
- Switching the setting keeps the table state, like column order, sort order, filters, and more.

### Advanced filters

- The boolean prop `enableAdvancedFilter` can be set on the table.
- If the prop `enableAdvancedFilter` is set, the option "Advanced filter" appears in the table menu. The table is not using the advanced filter by default, it has to be enabled explicitly.
- If the prop `enableAdvancedFilter` is not set, the option "Advanced filter" does not appears in the table menu.
- Enabling advanced filter via the table menu switches the table to display the advanced filter toolbar at the top.
- Disabling advanced filter via the table menu switches the table to hide the advanced filter toolbar at the top.
- Switching the setting keeps the table state, like column order, sort order, and more. The only exception is filters, which will be reset naturally.
- The error advanced filter is scoped to one table - switching it doesn't affect other tables.

### Custom views quick actions

- The menu option "Custom view quick actions" is only visible of the `customViewsLayout` is set to "simple".
- Disabling custom view quick actions via the table menu hides all custom view controls in the _table toolbar_ (on the left side).
- Enabling custom view quick actions via the table menu shows all custom view controls in the _table toolbar_ (on the left side), given that any custom view state has changed.
