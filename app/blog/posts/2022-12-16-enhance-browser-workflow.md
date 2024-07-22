---
title: "New in Enhance: Browser JS Workflow"
image: "/_public/blog/post-assets/axol-and-rollup.png"
category: uncategorized
description: "The Enhance web framework now has a built-in pipeline for your project's browser JavaScript. Easily import and bundle Node.js modules into your client-side code."
author: "Taylor Beseda"
avatar: "tbeseda-2022.jpg"
mastodon: "@tbeseda@indieweb.social"
published: "December 16, 2022"
---

![Axol and rollup.js](/_public/blog/post-assets/axol-and-rollup.png)

<small>
Forgive my digital illustration skills, but I will always use an opportunity to put <em>Axol</em> in a post.
</small>

The latest release of [Enhance](https://enhance.dev) adds a convenient way to build browser JavaScript at deploy-time (and in real-time during development) to a helpful path where your project's static assets are served. Developers can include third party Node modules, installed via npm, to use in their client-side code.

This new workflow is powered by [Rollup](https://rollupjs.org)'s [`node-resolve` plugin](https://github.com/rollup/plugins/tree/master/packages/node-resolve).
Conveniently, this engine can replace most use cases where the "`@bundles`" plugin has been used.

## Zero config workflow

There's no need to alter a config file. Author browser JavaScript in `app/browser/` and your code is bundled/concatenated automatically. It's then available to your front-end application at the `/_public/pages/` route.

These "entrypoint" files can import any Node module installed to your project dependencies and will be rolled up with imported dependencies.

## Show me some code!

Let's add [the Tiptap text editor](https://tiptap.dev/) to an Enhance project. Tiptap is a friendly, "headless" wrapper around [ProseMirror](https://prosemirror.net/), a rich content editor.

First install the Tiptap core library and the starter-kit extension:

```bash
npm install @tiptap/core @tiptap/starter-kit
```

Create `app/browser/tiptap.mjs`:

```javascript
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

new Editor({
  element: document.querySelector('.editor'),
  extensions: [ StarterKit ],
  content: '<p>Hello World!</p>',
})
```

Finally, create a new page and add an HTML element with the class `editor`, a script tag, and some simple CSS - `app/pages/editor.html`:

```html
<style>
  .editor {
    padding: 1rem;
    border: 1px solid SlateGray;
  }
  .editor p {
    color: DarkGray;
    margin-bottom: 0.5rem;
  }
</style>

<div class="editor"></div>

<script type="module" src="/_public/pages/tiptap.mjs" />
```

Start up your dev server and visit `/editor`, to see a fully functioning content editor ready for styling and integration via [the Tiptap/ProseMirror API](https://tiptap.dev/api/introduction) 🎉

## Upgrade existing projects

When you update `@enhance/arc-plugin-enhance` to v4.3, you'll automatically get the new JS workflow.

Try it out by creating an `app/browser/` directory and adding a new `my-feature.mjs` file. When starting your development server, Enhance will build your browser code to the `public/pages/` folder.

Import "my-feature" from your client-side app by including the script in HTML views where that specific JS enhancement is needed:

```html
<script type="module" src="/_public/pages/my-feature.mjs">
```

Or as a part of a specific element's `<script>` tag:

```html
<script type="module">
import myFeature from '/_public/pages/my-feature.mjs'
// ...
</script>
```

<div class="font-light text0 p-1" style="background: var(--p2);">
<span class="text1 mr-2">🚧</span> Be sure to add the `public/pages/` path to your `.gitignore` file -- <a href="https://github.com/enhance-dev/enhance-starter-project/blob/main/.gitignore" target="_blank">see our base .gitignore here</a>.
</div>

## Rollup powered

The Enhance team chose [rollup.js](https://rollupjs.org), specifically the node-resolve plugin, for its emphasis on simplicity and compatibility. The net change in Enhance's codebase is minimal but very powerful.

Rollup's description of their plugin says it best:

> 🍣 A Rollup plugin which locates modules using the [Node resolution algorithm](https://nodejs.org/api/modules.html#modules_all_together), for using third party modules in `node_modules`

Combined with Rollup's base features, this addition to Enhance will streamline the process of building front-end features with third party Node modules.

## Feedback

Do you plan to use this new workflow? Either way, we'd love to hear about your project. Connect in our [Discord server](https://enhance.dev/discord) or on Mastodon [@enhance_dev@fosstodon.org](https://fosstodon.org/@enhance_dev).
