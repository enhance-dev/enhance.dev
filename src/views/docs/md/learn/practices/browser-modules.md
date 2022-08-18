---
title: Browser modules
---


## Local modules
Enhance projects empower you to share modules with the browser via bundles. The benefit to using the built in bundling system is that your bundles will be shared from your own domain instead of from a third-party registry. No need to fuss over CORS or external downtime.

## Node modules
Inevitably you will want to install a dependency from `npm` for use in the browser. Good news is enhance projects are preconfigured to handle this as well.

## Exporting bundles
To export modules you will need to set the name and path in your `.arc` file under the `@bundles` pragma.

```arc
@bundles
todo-item './app/elements/todo-item.mjs'
store './node_modules/@enhance/store/index.mjs'
router './node_modules/@enhance/router/index.mjs'
```
What the bundles plugin does is it combines all of a modules dependencies into a single payload then makes it available to the browser from `/_static/bundles/your-bundle.mjs`.
