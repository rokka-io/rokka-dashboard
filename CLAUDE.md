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
npm run lint                     # ESLint + Prettier check
npm run lint:fix                 # ESLint autofix + Prettier format
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
- ESLint config in package.json (`"extends": "react-app"`)

## Testing

Jest + Enzyme 3 with React 16 adapter. Test setup in `src/setupTests.js` (Enzyme adapter + requestAnimationFrame shim). Test fixtures in `src/__tests__/` (JSON mocks).

Patterns:

- Snapshot tests via `react-test-renderer` with `toMatchSnapshot()`
- Components with routing wrapped in `MemoryRouter`
- Components with routing props need `match: { params: {} }` in test props
- Drag-and-drop tests use `DragDropContext` with `TestBackend`
- Mocks declared at module level: `jest.mock('../rokka')`

## Api Key security features (MFA, IP whitelist, expiry, trusted)

The rokka API has four per-key settings, all surfaced on `/apikeys` (`Apikeys.js` +
`ApikeyRow.js`) and — for the initial key of a new user — on `/memberships`:

- `requires_mfa` — the key can only be exchanged for a JWT together with a TOTP code
- `allowed_ips` / `expires` — enforced **retroactively**, they also invalidate tokens
  minted before the restriction was set. Max 10 IPs / CIDR ranges
- `trusted` — exempts that one key from the read-only-user guard, so a user with only
  `read` / `upload` / `sourceimages:read` can still rotate its own keys. Grants no
  organization permissions. `POST /organizations/{org}/memberships` with an `api_key`
  object is the only way to set it on a user which is read-only from the start

Things which cost time to figure out:

- **Authentication failures have a flat body** (`{code, message, error, invalid_authentication}`,
  from `ApiKeyAuthenticator::onAuthenticationFailure()`), unlike normal API errors which nest
  it in `body.error.message`. `src/utils/errors.js` handles both — use `getAuthErrorMessage()`
  for auth failures and `getApiErrorMessage()` for everything else, never `err.body.error.message`
  directly.
- **`login()` mints the token explicitly** (`rka.user.getNewToken()`) before the first request.
  The SDK's implicit minting swallows everything but a 403, which turned every MFA / expiry / IP
  error into a generic "Authentication failed". It also drops a leftover token first when an Api
  Key is given — a still-valid stale token would otherwise be used as a Bearer instead of the key
  just entered, hiding `mfa_required` behind a successful request.
- **`rawKeyClient()` in `src/rokka.js`** is a client _without_ `apiTokenGetCallback`, so requests
  go out with the `Api-Key` header. Needed for the enrollment-gated case: with the callback set,
  every request first tries to mint a token, which is exactly what an MFA key can't do before
  TOTP exists. Login's inline enrollment uses it.
- **TOTP replay protection**: the code used for `confirmMfaTotp()` can't mint a token right
  after. The UI has to ask for the _next_ code, otherwise enrollment looks broken.
- **The pre-2021 legacy key** (its `id` equals the `user_id`, fetch it with `rokka().user.getId()`)
  can't carry any of the four settings, the API rejects them. The edit UI is hidden for it.
- **Self-lockout guard**: a `PATCH` on the key you're authenticating with is refused with a 400
  when it would strand you (whitelist without your IP, past expiry, clearing `trusted`). All three
  messages contain `?force=true`, which is how `ApikeyRow` decides whether to offer "Do it anyway"
  (retry with `{force: true}`).
- `PATCH` sends **only the fields the user actually touched** (`ApikeyRow.buildPatch()`), so an
  untouched field never re-triggers the guard. `allowed_ips: null` and `expires: null` clear.
- `REACT_APP_ROKKA_API_HOST` points the dashboard at another rokka API (a local docker one).

## Notable Quirks

- `NewStack.js` is the most complex component (~18KB) handling stack creation/editing
- Stack API responses are normalized: `stack_operations` → `operations`
- IP protection settings capped at 8 entries (API max is 10)
- `cloudFrontDistributionReady` is hardcoded to `true` (TODO in codebase)
- Session storage tracks last edited stack
- SCSS uses inline Bourbon Neat helper functions (`is-even`, `is-not`, `belongs-to`) in `src/scss/mixins/_breakpoint.scss`
