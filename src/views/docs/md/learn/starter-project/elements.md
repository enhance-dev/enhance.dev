---
title: Elements
---

Elements are the components of enhance applications. They are pure functions authored as single file components and can be static or update dynamically to state changes. Elements live in the `app/elements/` folder in the enhance starter project and you register them in the `app/elements.mjs` file.

> Learn about single file components here](/docs/learn/concepts/single-file-components)

## Registration

In order to use your own elements with your app you need to tell enhance what single file component should be mapped to what tag name. Cracking open the `app/elements.mjs` file you can see how the tag `<el-header>` has it's tag name and backing template registered.

```javascript
import Header from './elements/header.mjs'
import Footer from './elements/footer.mjs'

// set the tag name for the template
const elements = {
  'el-header': Header,
  'el-footer': Footer,
}

export default elements
```

Having an elements file means that you don't need to add duplicate imports to every component and you can choose what tag name a template corresponds to.

