# Prismic to Static HTML

Generate static HTML pages of Prismic content to be easily embedded in other projects without
Prismic as a dependency.

Prerequisites:

- [Node 18+ LTS](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/installation)

If you plan on contributing to the repository ensure you install
[pre-commit](https://pre-commit.com/#install) , and after checking out the repository ensure you run
`pre-commit install` in the repo root.

## Usage

Configure `builder/slicemachine.config.js`, ensure it has especially the `repositoryName` set to
your Prismic repo.

Set up the env variable called `PRISMIC_ACCESS_TOKEN` with an access token to the Prismic repository
or `builder/.env` with the contents:

```shell
PRISMIC_ACCESS_TOKEN=your-prismic-token
```

Ensure the `builder/src/routes/[uid]/+page.server.ts` file's `entries()` function includes all the
UIDs for pages you want to generate static HTML of.

Then run:

```shell
cd builder
pnpm run build
```

The contents will be rendered to `builder/build/*.html` for full HTML pages and then their `<main>`
element's contents will also be further extracted to `builder/build/*.extracted.html` in case you
want to directly embed them in another page.

## Development

```shell
cd builder
pnpm run dev
```

Currently, the setup only supports Prismic slices called "TextBlock" (`text_block`), with rich text
content.

If you want more, you need to add them to `builder/src/lib/slices/`, create the slice, and update
`index.ts`. You may however want to use SliceMachine for managing them.
