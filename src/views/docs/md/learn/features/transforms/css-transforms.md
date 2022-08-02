---
title: CSS Transforms
links:
  - enhance-style-transform: https://github.com/enhance-dev/enhance-style-transform
---

## CSS Transformations

Enhance is designed to deliver working HTML that is improved when JavaScript loads. If the shadowDOM is used this means the initial markup is replaced later. The goal is to only have to write styles once that will work before and after that happens. And in general to be able to use a consistent approach to styling all components.  

Style transforms make this possible. When the page is rendered styles are transformed and relocated to optimize performance. 

## Style context
The style transform has two contexts. 

- Template Context: Styles encapsulated in the shadowDOM are left with the component template tag. 
- SSR Context: Server rendered styles (whether scoped through selectors or not) are collected and moved to the head of the document. 

## API
Style Transforms are passed as an array. they are called with a single object argument with the following properties:
- `raw`: a string with the contents of the script tag
- `attrs`: with any attributes on the script tag
- `context`: a value of 'markup' for SSR global CSS, and 'template' for shadowDOM CSS
- `tagName`: the custom element tagName

The return value from the transform is the new string contents of the style tag.


## Basic Usage
Below is the usage of a style transform for deploying to [arc.codes](arc.codes). This transform provides some scoping of styles without the need for the shadow DOM. 

### Input
```JavaScript
//Renderer handler.mjs
import enhance from '@enhance/ssr'
import styleTransform from '@enhance/enhance-style-transform'

const html = enhance({
  styleTransforms: [styleTransform]
})

const myDoc = html`<my-tag>Something</my-tag>`
```

```JavaScript
//<my-tag> component definition
export default function MyTag({html}){
  return html`
    <style>
      h1 {
        background: red;
      }
    </style>

    <h1>
      <slot></slot>
    </h1>
  `
}
```

### Output
```html
<!-- Rendered Output-->
<head>
  <style>
    /* scoped version of styles from <my-tag> */
    my-tag h1 {
      background: red;
    }
  </style>
</head>
<body>
  <template>
    <style>
    /* unscoped version of styles from <my-tag> */
      h1 {
        background: red;
      }
    </style>

    <h1>
      <slot></slot>
    </h1>
  </template>
  <my-tag>
    <h1>Something</h1>
  </my-tag>
</body>
```
## Enhance Style plugin
The [@enhance/enhance-style-transform](https://github.com/enhance-dev/enhance-style-transform) is the recommended plugin for use with Enhance. It provides style scoping for enhance components. 

### Component scoping
Basic component scoping is done by adding a component selector to every rule. This effectively sets the upper bound to all rules so styles cannot leak outside the component. The rule `div {background: red}` becomes `my-tag div {background: red}`. This sets a firm upper bound on styles but it does not limit deep selecting for anything nested inside the component. This is sometimes useful and sometimes a problem. To limit deep selection you can use more specificity in your selector choice. Combining this technique with utility classes also helps limit deep selection by minimizing the number of rules that need to be written for each component. 

#### `:host` `:host()` `:host-context()` 
When writing components it is often necessary to add styles to the element itself. The `:host` selector and its variations solve this problem, but they do not work when there is no shadowDOM. For the SSR context these styles are converted so that they work for both. `:host` itself is a selector stand in for the element. The function form of `:host()` is [required](https://drafts.csswg.org/css-scoping/#host-selector:~:text=it%20takes%20a%20selector%20argument%20for%20syntactic%20reasons%20(we%20can%E2%80%99t%20say%20that%20%3Ahost.foo%20matches%20but%20.foo%20doesn%E2%80%99t)%2C%20but%20is%20otherwise%20identical%20to%20just%20using%20%3Ahost%20followed%20by%20a%20selector.) to specify a class or attribute on the host itself. In order to select the context outside of host you can use the `:host-context()` form. 

```CSS
/* Scoping without host */
div { color: red; }
/* Becomes */
my-tag div { color: red; }

/* Scoping with host selector */
:host { color: red; }
/* Becomes */
my-tag { color: red; }

:host(.some-class) div { color: red; }
/* Becomes */
my-tag.some-class div { color: red; }

:host-context(footer > h1) div { color: red; }
/* Becomes */
footer > h1 my-tag div { color: red; }

```

#### `::slotted()` 
With shadowDOM `<slot>`'s child elements in the light DOM are rendered inside the shadowDOM. The `::slotted()` pseudo selector is used inside the shadowDOM to style these elements. Any selector argument will be applied to any matching elements that are slotted. The transform takes rules like `div::slotted([slot=here]) { color:red; }` and returns `div[slot=here] { color: red; }`. This allows for styles to be written that work both with and without the shadowDOM. It also lets you write styles so the intent is clear. Use caution picking the selector argument so that it does not select more than intended after transformation. `::slotted(*)` for instance would select all elements. `::slotted([slot])` is useful for selecting all named slot contents.  
#### `::part()` 
The shadow parts API allows selected elements to be exposed for styling outside the shadowDOM. By labeling an element inside the component with a `part=something` attribute it can be selected outside that component with a `the-tag::part(something) {color: red;}` selector. For server rendering this is transformed into `the-tag [part*=something] { color: red; }`. Notice again that this does not stop deep selection. This selector will match any part of the same name nested within. 

#### `scope=global`
Global unscoped styles can be added to components if desired. If a `scope=global` attribute is added to a style tag the styles will be collected and added to the head tag as with other styles. But no transforms or scoping will be done. These styles are removed from the template tag so that they will not appear inside shadowDOM. 
```html
<style scope=global>
  /* this rule will be put in the head and */
  /* will select all div's in the document */
  div { color:red; }
</style>
```
A style tag that is nested inside a component but is not a direct child will not be transformed or collected at all by the transform. 
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
```

## limitations
This approach doesn't completely avoid unintentional deep selection of nested elements. It makes tradeoffs to improve scoping without creating other problems. Transformed shadow selectors can also select some unintended elements if they are written to too broadly (i.e. `::slotted(*)` will select all children). If you prefer a bullet proof style encapsulation and are willing to accept the downsides (broken forms, FOUC, etc.) use the shadowDOM.   
## Other Recommendations
- Use with utility classes.
  This transform works well in combination with utility class styles. We recommend writing most styles as utility classes directly on the elements in your template. This only leaves styles that cannot be written as utility classes which can be added to the component.
- Use specific selectors to avoid deep selecting.
  It is better to use the `>` child selector rather than the general descendent selector when possible(i.e. `:host > div` ). 
- With slotted and part be specific enough to avoid over selection
  

