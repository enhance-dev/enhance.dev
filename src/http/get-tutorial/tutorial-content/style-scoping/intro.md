# Style Scoping

Enhance has built in style scoping. This can be overridden or customized if needed. Scoping follows these rules:

- Styles are scoped to the component and below so they can't leak outward. 
- Caution with deep selectors. Styles can bleed into nested elements if overly general selectors are used. Avoid `div a {color:blue}` in favor of `div > a {color:blue}`. 
- Components can be styled with shadow CSS (:host, ::slotted, and ::part) even if shadow DOM is not used.
- Relative specificity is maintained between scoped CSS in most cases. Specificity is increased by one element to achieve scoping so there can be a specificity reversal to similar global rules.  
- Opt out of scoping with a `scope="global"` attribute on the style tag.

[^*]: There are a few rare edge cases where this is not the case. 


## Styles Scoped to Components

```javascript 
//my-div.mjs
export default function({html}){
  return html`
    <style>
      div.container {
        color:red;
      }
    </style>
    <div class="container>
      <slot></slot>
    </div>
  `
}
```

```html
<my-div>I'm Red</my-div>
<div>but I'm not</div>
```

```html
<style>
  my-div div.container {
    background:lightgreen;
  }
</style>
```



