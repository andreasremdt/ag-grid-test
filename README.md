# Test cases

## Row relection

- The `onRowSelected` prop should be forwarded to the table called accordingly.
- The prop `getSelectionOptions` can be set on the table and accepts a function.
- The selection controls are not rendered unless at least one row is selected and unless at least one action is provided.
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

## Context source

- The prop `contextSource` can be set on the table and accepts an object with an async `get` function. The `get` function returns an object with as many properties as needed.
- The `get` function is called upon grid initialization, fetching all data. That data is persisted as `metadata` in the grid's internal context.

## Custom views

- The prop `customViewsLayout` can be set on the table and accepts "dropdown", "simple", or "none".

### "simple" custom view layout

- As long as the table state remains unchanged, no controls are visible.
- When the table state changes (sort order, column order, filter, etc.) and no custom view is currently selected, the "Create custom view" and "Reset view" buttons appear on the top left.
- If the table state is changed back to what it was before, the "Create custom view" and "Reset view" buttons disappear.
- Clicking on "Reset view" resets it back to the original state, including filters, columns, sort order, etc.
- Clicking on "Create custom view" displays an inline textbox, allowing for the name to be entered.
  - While the textbox is visible, the "Create custom view" and "Reset view" buttons remains hidden.
  - Pressing ESC while the textbox is visible hides it again, making no changes to custom views or the table.
  - Pressing Enter or clicking "Ok" while the textbox value is empty does nothing.
  - Pressing Enter or clicking "Ok" with a valid value confirms the name and creates a new custom view.
- Creating a new custom view calls the `onCreateCustomView` prop, if provided. Then, the custom view is selected and the grid re-renders.
- When the table state changes and a custom view is currently selected, an additional "Save changes" button appears next to "Create custom view" and "Reset view".
- If a custom view is selected, clicking on "Reset view" resets the view back to its unmodified state, not the table's default state.
- If a custom view is selected, clicking on "Save changes" updates the custom view state and calls `onSaveCustomView`.
- If a custom view is selected, clicking on "Create custom view" does the exact same thing as when no custom view is selected.
- At no times is there a button for the view deletion available in this layout.
- If the "Custom view quick actions" are disabled, the "Create custom view", "Save changes", and "Reset view" buttons will never be displayed.

### "dropdown" custom view layout

- The custom views dropdown is always displayed, showing the currently active custom view.
- If no custom view is selected, the default "Default view" is selected.
- As long as the table state remains unchanged, the "Add new custom view" button is disabled.
- When the table state changes (sort order, column order, filter, etc.), the "Add new custom view" button becomes enabled, and a "Reset view" button appears to the right of the dropdown.
- If the table state is changed back to what it was before, the "Add new custom view" and "Reset view" buttons disappear.
- Clicking on "Reset view" resets it back to the original state, including filters, columns, sort order, etc.
- Clicking on "Add new custom view" displays an inline textbox, allowing for the name to be entered.
  - While the textbox is visible, the "Add new custom view" and "Reset view" buttons remains hidden.
  - Pressing ESC while the textbox is visible hides it again, making no changes to custom views or the table.
  - Pressing Enter or clicking "Ok" while the textbox value is empty does nothing.
  - Pressing Enter or clicking "Ok" with a valid value confirms the name and calls the `onCreateCustomView` prop.
- Creating a new custom view calls the `onCreateCustomView` prop, if provided. Then, the custom view is selected and the grid re-renders.
- The dropdown renders all custom views provided via the `customViews` prop.
- Each entry in the custom views list has 3 buttons: "Delete", "Rename", and "Save"
  - Clicking on "Delete" displays a confirmation modal.
  - Canceling the deletion closes the modal and leaves everything as-is.
  - Confirming the deletion closes the modal and calls the `onDeleteCustomView` prop.
  - While the textbox is visible, all other controls for that custom view remain hidden.
  - Pressing ESC while the textbox is visible hides it again, making no changes to custom views or the table.
  - Pressing Enter or clicking "Ok" while the textbox value is empty does nothing.
  - Pressing Enter or clicking "Ok" with a valid value confirms the new name and calls the `onSaveCustomView` prop.
  - When the table state changes and a custom view is currently selected, the "Save" button becomes enabled.
  - Clicking "Save" calls the `onSaveCustomView` prop and disables the button again.

## Table menu

- The table menu is rendered on the top right corner at all times.

### Custom view actions

- If the `customViewsLayout` prop is set to "dropdown", the `Change custom view" button is visible.
  - Clicking "Change custom view" hides all other table menu contents and displays a list of custom views, if available.
  - If there're no custom views available, only the "Default view" is shown.
  - On top of the custom views list, a "Back" button is visible.
  - Clicking the "Back" button shows the original table menu contents.
- If the `customViewsLayout` is set to "simple", the "Change custom view" button is hidden.
- The "Add new custom view" button is disabled unless the table state is changed.
- Clicking on "Add new custom view" displays an inline textbox, allowing for the name to be entered.
  - While the textbox is visible, the "Add new custom view" button remains hidden.
  - Pressing ESC while the textbox is visible hides it again, making no changes to custom views or the table.
  - Pressing Enter or clicking "Ok" while the textbox value is empty does nothing.
  - Pressing Enter or clicking "Ok" with a valid value confirms the name and calls the `onCreateCustomView` prop.
- The "Save new changes" button is disabled unless the table state is changed.
- Clicking on "Save new changes" calls the `onSaveCustomView` prop.
- The "Reset custom view" button is disabled unless the table state is changed.
- Clicking on "Reset custom view" resets the table to its initial state.
  - If a custom view is currently selected, the table state is reset to the initial state of that custom view.
  - If no custom view is currently selected, the table state is reset back to its default state.

### Table actions

- The prop `getTableActions` can be set on the table and accepts a function.
- If the prop is not provided, the table actions section is not rendered inside the table menu.
- If the prop is provided and has at least one action, the table actions section is rendered inside the table menu.
- For each action, a button and icon are rendered. The callback is called when the button is clicked.

### Highlight errors

- The prop `getRowErrorState` can be set on the table and accepts a function.
- If the prop `getRowErrorState` is set, the option "Highlight errors" appears in the table menu.
- If the prop `getRowErrorState` is not set, the option "Highlight errors" does not appears in the table menu.
- Disabling error highlights via the table menu no longer shows conditional error states for rows.
- Enabling error highlights via the table menu shows conditional error states for rows.
- Error highlights are scoped to one table - switching it doesn't affect other tables.
- Switching the setting keeps the table state, like column order, sort order, filters, and more.

### Column header format

- The prop `columnHeaderFormat` can be set on the table and accepts `text` or `code`.
- The prop `onToggleColumnHeaderFormat` can be set on the table and accepts a function.
- If the prop `onToggleColumnHeaderFormat` is set, the option "Show column headers in code format" appears in the table menu. Otherwise, it's hidden.
- If `columnHeaderFormat` is set to `text`, the column definitions' `headerName` will be rendered, if provided.
- If `columnHeaderFormat` is set to `code`, the column definitions' `field` will be rendered.
- Clicking on the "Show column headers in code format" option in the table menu calls `onToggleColumnHeaderFormat`.
- Column header format is a global setting - switching it affects other tables.
- Switching the setting keeps the table state, like column order, sort order, filters, and more.

### Live updates

- The prop `liveUpdatesInterval` can be set on the table and accepts a number.
- The prop `onToggleLiveUpdates` can be set on the table and accepts a function.
- If the prop `onToggleLiveUpdates` is set, the option "Live updates" appears in the table menu. Otherwise, it's hidden.
- The table data is refetched in the same interval as specified by `liveUpdatesInterval`.
- If `liveUpdatesInterval` is not set, the table data is not refetched.
- Clicking on the "Live updates" option in the table menu calls `onToggleLiveUpdates`.
- Live updates is a global setting - switching it affects other tables.
- Switching the setting keeps the table state, like column order, sort order, filters, and more.

### Advanced filters

- The boolean prop `enableAdvancedFilter` can be set on the table.
- If the prop `enableAdvancedFilter` is set, the option "Advanced filter" appears in the table menu. The table is not using the advanced filter by default, it has to be enabled explicitly.
- If the prop `enableAdvancedFilter` is not set, the option "Advanced filter" does not appears in the table menu.
- Enabling advanced filter via the table menu switches the table to display the advanced filter toolbar at the top.
- Disabling advanced filter via the table menu switches the table to hide the advanced filter toolbar at the top.
- Switching the setting keeps the table state, like column order, sort order, and more. The only exception is filters, which will be reset naturally.
- Advanced filters are scoped to one table - switching it doesn't affect other tables.

### Custom views quick actions

- The prop `customViewsQuickActions` can be set on the table and accepts a boolean.
- The prop `onToggleCustomViewsQuickActions` can be set on the table and accepts a function.
- If the prop `onToggleCustomViewsQuickActions` is set, the option "Custom view quick actions" appears in the table menu. Otherwise, it's hidden.
- Disabling custom view quick actions via the table menu hides all custom view controls in the _table toolbar_ (on the left side).
- Enabling custom view quick actions via the table menu shows all custom view controls in the _table toolbar_ (on the left side), given that any custom view state has changed.
- Switching the setting keeps the table state, like column order, sort order, filters, and more.
