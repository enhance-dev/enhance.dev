# Enhance.dev Website

Powered by HTML + cloud functions ([Enhance](https://enhance.dev) and [Architect](https://arc.codes)) and Markdown ([Arcdown](https://github.com/architect/arcdown)).

## Writing docs

All documentation content lives in `src/views/docs/md`.

Navigation data is stored in `src/views/docs/nav-data.mjs`.

## Development

Recommended prefs.arc:

```arc
@sandbox
livereload true
```

### Main site

Currently redirects to Enhance documentation at "/docs/".

### Docs engine

The main "/docs/*" route lives in `app/api/docs/$$.mjs`.

This route uses the path (accounting for trailing slashes) to look up a .md document and render it to HTML with Arcdown. This document HTML is combined with `nav-data` and passed as state to Enhance to render the full view.

### Tutorial

WIP

### Playground

WIP
