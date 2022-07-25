---
title: Custom element expansion
---

Custom element expansion is an approach to reusable components that leverages HTML and standard JavaScript. You are not required to use custom file extensions or learn any domain specific languages. Enhance expands custom elements on the server just as you would in the browser so you can author cleaner HTML pages that are prepped for progressive enhancement in the browser.

Enhance single file components are designed to be used with out needing to import dependencies. Dependency free components means less unplanned work and fewer breaking changes. In order to avoid a list of imports for every custom element you need on your pages enhance instead uses an elements object that maps a tag name to a single file component.

An example elements object:
```javascript
import MyPage from '/@architect/views/pages/my-page.mjs'
import MyHeader from '/@architect/views/elements/my-header.mjs'
import MyFooter from '/@architect/views/elements/my-footer.mjs'

const elements = {
  'my-page': MyPage,
  'my-header': MyHeader,
  'my-footer': MyFooter
}

export default elements
```

Initialize your enhance `html` render function with the elements object:
```javascript
import enhance from '@enhance/ssr'
import elements from '@architect/views/elements.mjs'

const html = enhance({
  elements
})
```

Your `MyPage` component can use the tag names defined in the `elements` object without needing to import the `MyHeader` or `MyFooter` component cutting down on coupling as well as duplication.

```javascript
export default function MyPage({ html }) {
  return html`
  <my-header></my-header>
  Some content
  <my-footer></my-footer>
  `
}
```

Another benefit of loose coupling is that you could define a different `my-header` per page if need be by supplying a different `elements` object.


```javascript
import MyOtherPage from '/@architect/views/pages/my-other-page.mjs'
import MyAuthHeader from '/@architect/views/elements/my-auth-header.mjs'
import MyFooter from '/@architect/views/elements/my-footer.mjs'

const elements = {
  'my-page': MyOtherPage,
  'my-header': MyAuthHeader,
  'my-footer': MyFooter
}

export default elements
```
