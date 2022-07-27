---
title: Custom element expansion
---

Custom element expansion enables authoring of a custom element tag that has the contents of it's registered template added during render. This is an approach to reusable components that leverages HTML and standard JavaScript. You are not required to use custom file extensions or learn any domain specific languages. Enhance expands custom elements on the server just as you would in the browser so you can author cleaner HTML pages that are prepped for progressive enhancement in the browser.

Enhance single file components are designed to be used without needing to import dependencies. Dependency free components means less unplanned work and fewer breaking changes. In order to avoid a list of imports for every custom element you need on your pages enhance instead uses an elements object that maps a tag name to a single file component.

## Elements manifest
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

Use the elements object when Initializing your enhance `html` render function so it knows which template to use for your desired tag name.
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

## Expansion

Now that your elements are registered and your `html` render function is initialized we can look at how enhance expands custom elements at render time.

Given this single file component
```javascript
export default function MyHeader({ html, state }) {
  const { attrs={} } = state
  const heading = attrs?.heading || 'Default'
  return html`
<header>
  <h1>${ heading }</h1>
</header>
  `
}
```

You could author an HTML file
```html
<my-header heading="Welcome"></my-header>
This is my index page
```

Which would output
```html
<!DOCTYPE html>
<head>
  <title>Index</title>
</head>

<my-header heading="Welcome">
  <h1>Welcome</h1>
</my-header>

This is my index page

<template id="my-header-template">
  <header>
    <h1>Default</h1>
  </header>
</template>
```

Notice how the custom element is expanded with the template's contents and a template tag with the default content is appended to the page with an `id` of `my-header-template`. This sets your page for progressive enhancement. If you ever want to dynamically add a `my-header` to the page dynamically you could add a script tag that defines you custom element.

[Next read how enhance expands `<slot>` tags.](http://localhost:3333/docs/learn/concepts/rendering/slots)
