---
title: Browser modules
---

Enhance projects empower you to share modules with the browser via bundles. The benefit to using the built in bundling system is that your bundles will be shared from your own domain instead of from a third-party registry. No need to fuss over CORS or external downtime.

## Node modules

Inevitably you will want to install a dependency from `npm` for use in the browser. Good news is Enhance projects are preconfigured to handle this as well.

## Exporting bundles

Under the hood, the Enhance starter project uses the backend framework <a href=https://arc.codes>Architect</a>. To export modules you will need to set the name and path in your `.arc` manifest file under the `@bundles` pragma.

```arc
@bundles
todo-item 'public/todo-item.mjs'
store './node_modules/@enhance/store/index.mjs'
router './node_modules/@enhance/router/index.mjs'
```

What the bundles plugin combines all of a modules dependencies into a single payload then makes it available to the browser from `/_static/bundles/your-bundle.mjs`.
