# Changelog

All notable changes to this project will be documented in this file.

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
