COMPONENTS - Components that are used globally
PAGES - Components that represent the modules.
SERVICES - Services used in this project. Examples are, axios, hooks, contexts...etc
UTILs - helpful files to support our components globally.

CONTEXTS - To prevent multiple props and state from parent to child components, we use context states.

- PageContext - Handles the current page
- FormContext - Handles the form itself. This usually is used for module creation and update.
- DialogContext - Handles the the modal dialog. Usually this is used for Update data.
- ConfirmDialogContext - This is also a modal, but shows a confirmation. This is usually used for module delete and retrieve.
