# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- Lightweight: No heavy UI frameworks - uses only vanilla CSS and React
- Modern UI: Clean, responsive design with KAVIA brand styling
- Fast: Minimal dependencies for quick loading times
- Simple: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open http://localhost:3000 to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Current Demo Screen (Settings → Notifications)

This app currently renders an initial implementation of the Settings → Notifications screen for the Personal Notes Manager.

This screen is built from design notes in `assets/settings_notifications_design_notes.md` and includes:
- App shell using CSS Grid: header, primary + secondary sidebars, content
- Header with brand (AcooDo), global search, and utility icon buttons
- Primary sidebar (icon-only) and Settings sidebar (section list)
- Context bar with a "Notifications" tab
- Main content with a section title and a functional, accessible toggle: "Enable Status Sharing"
- Responsive adjustments to collapse the secondary sidebar at narrower widths

### Key Files

- `src/design.css` — Design variables and layout
  - Design tokens (colors, spacing, typography)
  - App grid layout (header, sidebars, content)
  - Header, sidebars, context bar, and notification section styles
  - Accessible custom switch styles
- `src/App.js` — Page composition and UI components
  - AppHeader, PrimarySidebar, SettingsSidebar, ContentTabs
  - PUBLIC_INTERFACE ToggleRow component (accessible switch)
  - Theme toggle utility retained (bottom-right)
- `src/App.css` — Existing template styles (theme toggle and base CRA styles)
- `src/index.css` — Base resets updated to match the design font stack

## Customization

- Colors and spacings follow tokens in `src/design.css`.
- Extend Components:
  - Add more tabs in `ContentTabs`
  - Add or wire settings links in `SettingsSidebar`
  - Replace emoji placeholders with SVG icons in `AppHeader` and sidebars
- Functionality:
  - Wire global search submit handling
  - Hook header action buttons to app features
  - Persist the "Enable Status Sharing" toggle via API/local storage as needed

## Roadmap

- Integrate actual SVG icon set (20–24px)
- Add routing to navigate among Settings sections and broader notes UI
- Implement notes listing and editor panes
- Connect settings state to backend or local persistence

## Learn More

To learn React, check out the React documentation: https://reactjs.org/

### Code Splitting

Docs: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

Docs: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

Docs: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

Docs: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

Docs: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

Docs: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
