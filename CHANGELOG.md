# Changelog

All notable changes to this project will be documented in this file.

## 2026-08-28

### Added

- Two-factor authentication (MFA/TOTP) for Api Keys:
  - A new section on the Api Keys page to set up TOTP (QR code plus the secret as text), confirm a pending setup, start one over, and disable an active one. Disabling also clears the "Requires MFA" flag on all your Api Keys, that is spelled out before you do it
  - The login form asks for the code when the Api Key requires MFA, and offers the whole TOTP enrollment right there when the key requires it but no setup exists yet. After confirming the setup it asks for the _next_ code, the one used for the confirmation can't mint a token anymore
- The per-key security settings the API gained are now visible and editable:
  - New `MFA`, `Trusted`, `Allowed IPs` and `Expires` columns in the Api Keys table, with expired keys marked
  - Per-key edit form for all four, sending only the fields which were actually changed. `Allowed IPs` takes up to 10 IPs or IPv4 CIDR ranges, `Expires` can be cleared
  - When the API refuses a change because it would lock the key you're currently using out (a whitelist without your IP, a past expiry, clearing `trusted`), the reason is shown together with a button to do it anyway
  - The same four settings on the create form for a new Api Key
  - The pre-2021 legacy key is left alone, the API rejects any of these settings on it
- Optional "Initial Api Key" settings (comment, trusted, requires MFA, allowed IPs, expires) when creating a membership for a _new_ user. `Trusted` there is the only way to give a read-only user a key which can rotate its own keys, and the form explains why requiring MFA needs it too
- `REACT_APP_ROKKA_API_HOST` to point the dashboard at another rokka API, a local one for example

### Changed

- Login mints its token explicitly instead of letting the first request do it implicitly, so authentication failures show what actually went wrong (expired key, IP not allowed, MFA needed, wrong code, too many code attempts) instead of a blanket "Authentication failed"
- Logging in with an Api Key drops a leftover token from a previous session first. It might belong to another user, and while still valid it would have been used instead of the key just entered
- Api Key creation errors are shown inline and keep the form, instead of an `alert()` which threw the input away
- Upgrade the rokka SDK to 4.3.0 (`trusted` on Api Keys, `api_key` options for new memberships)

## 2026-02-22

### Added

- Basic test coverage for string utils, auth HOC, state management, Modal, and ErrorBoundary
- Docker setup for development (`Dockerfile`)
- CLAUDE.md project documentation

### Changed

- Upgrade from Node 14 to Node 22
- Replace node-sass with Dart Sass for modern Node compatibility
- Upgrade react-scripts from 2.1.0 to 5.0.1
- Fix SCSS for Dart Sass compatibility (operator spacing, asset URL paths, inline Bourbon Neat helpers)
- Fix React hooks rule violation in PreviewSidebar (useState before early return)
- Add `npm run lint` and `npm run lint:fix` scripts (ESLint + Prettier)
- Upgrade prettier from 1.x to 3.x
- Upgrade react-transition-group from 2.x to 4.x
- Upgrade rokka SDK from 3.x to 4.x

### Security

- Upgrade highcharts from 6.x to 12.x and switch to `highcharts-react-official` wrapper (fixes XSS vulnerabilities)
- Upgrade react-dnd from 5.x to 14.x (fixes node-fetch header forwarding vulnerability via recompose dependency chain)

### Removed

- Remove husky and lint-staged (pre-commit hook)
- Remove unused emotion and jest-emotion dependencies
- Remove @mapbox/node-pre-gyp (no longer needed without node-sass)

### Fixed

- Prevent cancel button from creating API key
- Fix documentation link
