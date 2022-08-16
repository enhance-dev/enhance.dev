---
title: Script Transforms
---

Single file components co-locate scripts  with your Custom Element output for progressive enhancement. All the scripts are collected and moved to the end of the body during render. Enhance supports transform plugins for processing the contents of these scripts if needed.

## Basic Usage
Below is an example script transform for use when deploying to [arc.codes](arc.codes). This transform rewrites import paths to point to the proper urls when deployed.

```javascript
import arc from '@architect/functions'
import enhance from '@enhance/ssr'
import { importTransform } from '@enhance/import-transform'

const html = enhance({
  scriptTransforms: [
    importTransform({
      lookup: arc.static,
      workers: [{ label: '__API_WORKER__', path: '/_static/worker.mjs' }]
    })
  ]
})

const myDoc = html`<my-app></my-app>`
```

## API
Script Transforms are passed as an array. Transforms are called with a single object argument with the following properties:
- `raw`: a string with the contents of the script tag
- `attrs`: with any attributes on the script tag
- `tagName`: the custom element tagName

The return value from the transform should be the new string contents of the script tag.
