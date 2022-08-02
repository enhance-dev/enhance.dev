---
title: JavaScript Transforms
---

Single file components include any scripts for progressive enhancement with the custom element definition. But when these components are rendered into a document all these scripts are collected and moved to the end of the body. There is a plugin API to transform these scripts as needed before when they are moved.

## Basic Usage
Below is an example script transform for use when deploying to [arc.codes](arc.codes). This transform rewrites import paths to point to the proper urls when deployed. 

```JavaScript
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




All top level `<script>` tags are transformed and moved to the end of the document body. Any script that is not at the top level will be passed through without being transformed or moved. 

```JavaScript
export default Component({html}){
  return html`
    <div>Hello World</div>
    <script>
      //this script will be transformed and moved 
    </script>
    <div>
      <script>
        //this script is left alone
      </script>
    </div>
  `
}