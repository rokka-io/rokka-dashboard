# Rokka dashboard

A serverless application for [rokka](https://rokka.io) to manage a rokka account.

*⚠️  This repository is a work in progress and an early preview*

## Features

- Show statistics
- List images and apply changes to them
- Upload images
- List stacks
- Create new stacks.

## Usage

For using rokka-dashboard you need to clone the repository and run the build for yourself at the moment.
We plan to add automatic builds in the future.

The `HOMEPAGE_PATH` is a placeholder for the target page where you want to run it.
For example if you want to run the rokka UI on `https://example.com/rokkaui/` then specify that URL as the target.

This ensures the paths for including scripts etc. are correct in the built HTML and CSS files.

1. clone the repo: `git clone https://github.com/rokka-io/rokka-dashboard.git && cd rokka-dashboard`
2. run npm install: `npm install`
3. run build: `npm run build HOMEPAGE_PATH`
4. open / deploy build directory: `open build/index.html`

## Development / Contributing

1. clone the repo: `git clone https://github.com/rokka-io/rokka-dashboard.git && cd rokka-dashboard`
2. run npm install: `npm install`
3. run npm start: `npm start`
4. start hacking
5. run linter: `npm run lint`
6. send a PR

## License

See LICENSE.md
