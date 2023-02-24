---
title: Static Assets
links:
  - Rails Guides on fingerprinting: https://guides.rubyonrails.org/asset_pipeline.html#what-is-fingerprinting-and-why-should-i-care-questionmark
---

## Public folder → `/_public/` route

Static assets like CSS, images, and scripts are a vital part of any web application.
Enhance provides a convention for fingerprinting and serving assets from the root public directory via the convenient `/_public/` route.

## Adding files

Simply drop files in your Enhance project's public folder.
Assets can be organized with any sort of directory structure you'd like.

```
.
├── app/ ............... dynamic app features
└── public ............. static assets
    ├── blog-comment.mjs
    ├── docs.css
    └── img
        └── logo.png
```

## Referencing files

Given the structure above, your application can include assets from the `/_public/` route:

<doc-code callout="2-/_public/,6-/_public/,8-/_public/">

```html
<script type="module">
  import BlogComment from '/_public/blog-comment.mjs'
  // ...
</script>

<link rel="stylesheet" href="/_public/docs.css">

<img src="/_public/img/logo.png" />
```

</doc-code>

## Automatic "fingerprinting"

<doc-callout level="info" mark="🧬">

File "fingerprinting" is giving static files a unique filename based on that file's contents.
Typically this uses a computational hash of that file's content as part of the name.
`logo.png` becomes `logo-cd94b3594d.png`.

</doc-callout>

Under the hood, Enhance will dynamically fingerprint each file based on its contents.
As a developer, you don't need to worry about creating hashed file names, keeping a reference to each file's actual name on disk, etc.
Enhance (via [Architect](https://arc.codes)) will create and track fingerprinted files for you.

Further, when your project code uses the `/_public/` route to reference files, Enhance will help update references with the fingerprinted filename.

### Caching & Cache-invalidation

The purpose of fingerprinting static files is to provide long cache times to clients (browser's, CDNs, etc.) while still allowing for those assets to be replaced by newer versions.
New file contents == new file name.
This way clients know to keep their downloaded copy of a file and re-use it on subsequent requests.
When the content of that file changes, the references to that file change, and the browser downloads and caches the new asset.

### Configuration

Static asset fingerprinting can be controlled in your project's `.arc` file:

```arc
@static
fingerprint true # or false
```

If the setting is not present, fingerprinting is disabled.
However, all new Enhance projects created with `npx "@enhance/create@latest"` automatically get the above configuration.

<doc-callout mark="💁" level="none">

Regardless of `fingerprint` configuration, the `/_public/` route is the most reliable approach to referencing files.

</doc-callout>

## Combining with `@bundles`

The `/_public` route does not provide any sort of concatenation or compilation of assets.
However, it does play nicely with another Enhance feature: the `@bundles` pragma.

<doc-link-callout link="/docs/learn/practices/browser-modules" mark="🧺">

Learn about bundling browser modules (JS, CSS, + TS) with `@bundles`

</doc-link-callout>

If the following is specified in your `.arc` file:

```arc
@bundles
todos '/components/index.mjs'
```

The bundled and fingerprinted asset will be available like

<doc-code callout="1-/_public/bundles/">

```javascript
import { TodoList, TodoItem } from '/_public/bundles/todos.mjs'
```

</doc-code>

<!--
## `/_public/`

TODO? explain that /_public/ is still available
-->
