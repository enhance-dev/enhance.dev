# Enhance.dev Website

Powered by HTML ([Enhance](https://enhance.dev)), cloud functions ([Architect](https://arc.codes)), and Markdown ([Arcdown](https://github.coms/architect/arcdown)).

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

The main "/docs/*" HTTP function is `src/http/get-docs-catchall/index.mjs`.  
(`src/http/get-docs/` redirects "/docs" to "/docs/")

This function uses the path (accounting for trailing slashes) to look up a .md document and render it to HTML with Arcdown. This HTML is combined with `nav-data` and then handed to `enhance-ssr` to render the full view.

### Tutorial

WIP `src/http/get-tutorial-catchall/`

### Playground

WIP `src/http/get-playground/`
