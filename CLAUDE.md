# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rokka Dashboard is a serverless React application for managing [Rokka](https://rokka.io) image service accounts — images, stacks, costs, API keys, and memberships. Built with React 16 class components (PureComponent), React Router 5 (HashRouter), and a custom observable state management pattern.

## Commands

```bash
npm start                        # Dev server at http://localhost:3000
npm test                         # Jest tests in watch mode
npm test -- --watchAll=false     # Run all tests once
npm test -- path/to/test.js      # Run a single test file
npm test -- --testNamePattern="pattern"  # Run tests matching name
npm run build                    # Production build to /build
npm run prettier                 # Format all source files
```

Node 22 required (see .nvmrc).

## Architecture

### State Management (`src/state/index.js`)

Custom observable pattern — no Redux or Context API. A single `internalState` object holds all global state. `updateState()` merges partial state and notifies the single listener (App.js), which re-renders and passes state as props to all children.

Key state functions: `login()`, `logout()`, `listStacks()`, `createStack()`, `deleteStack()`, `deleteImage()`, `setAlert()`, `cloneStack()`, `normalizeStack()`.

### API Layer (`src/rokka.js`)

Uses the `rokka` npm SDK. Authentication stores org name and API token in localStorage (`rokka-dashboard-token`, `rokka-dashboard-org`). Tokens auto-refresh (72h expiry, refresh after 48h).

### Routing (`src/components/App.js`)

HashRouter with routes: `/`, `/images`, `/stacks`, `/stacks/:name/:tabindex?`, `/new-stack/:tabindex?`, `/costs`, `/apikeys`, `/memberships`, `/signup`, `/signedup`. Protected routes use the `authRequired` HOC (`src/utils/auth.js`) which checks `props.auth.apiToken`.

### Component Patterns

- Most components are `React.PureComponent` class-based; some use hooks
- Global state flows via props drilling from App.js
- Layout wrappers: `BaseLayout` (with sidebar) and `FramelessLayout`
- CSS class prefix: `rka-` (rokka)
- SCSS in `src/scss/` with component-specific files in `scss/components/`

### Data Flow

User action → component method → state function (in `src/state/`) → rokka API call → `updateState()` → App re-renders → props propagate down.

## Code Style

- No semicolons, single quotes (Prettier config in `.prettierrc`)
- 2-space indentation, LF line endings, 100-char max line length
- Husky pre-commit hook runs Prettier via lint-staged
- ESLint config in package.json (`"extends": "react-app"`)

## Testing

Jest + Enzyme 3 with React 16 adapter. Test setup in `src/setupTests.js` (Enzyme adapter + requestAnimationFrame shim). Test fixtures in `src/__tests__/` (JSON mocks).

Patterns:

- Snapshot tests via `react-test-renderer` with `toMatchSnapshot()`
- Components with routing wrapped in `MemoryRouter`
- Components with routing props need `match: { params: {} }` in test props
- Drag-and-drop tests use `DragDropContext` with `TestBackend`
- Mocks declared at module level: `jest.mock('../rokka')`

## Notable Quirks

- `NewStack.js` is the most complex component (~18KB) handling stack creation/editing
- Stack API responses are normalized: `stack_operations` → `operations`
- IP protection settings capped at 8 entries (API max is 10)
- `cloudFrontDistributionReady` is hardcoded to `true` (TODO in codebase)
- Session storage tracks last edited stack
- SCSS uses inline Bourbon Neat helper functions (`is-even`, `is-not`, `belongs-to`) in `src/scss/mixins/_breakpoint.scss`
