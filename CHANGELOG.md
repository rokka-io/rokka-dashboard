# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

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

### Removed

- Remove husky and lint-staged (pre-commit hook)
- Remove unused emotion and jest-emotion dependencies
- Remove @mapbox/node-pre-gyp (no longer needed without node-sass)

### Fixed

- Prevent cancel button from creating API key
- Fix documentation link
