The goal of this styling approach is to be able to style components one way and have a consistent result before and after the custom element hydrates and regardless of whether shadowDOM is used. To accomplish this the styling tools for shadow DOM are used and their behavior is backfilled for use before or without shadowDOM. For the no shadowDOM side encasulation is achieved by scoping. In order for this to work a user must follow some guidelines so that their styles don't inadvertently leak out of the intended scope. 
1. Be as specific in selectors as possible
2. Avoid deep selectors in components with lots of nested components
3. Minmal use of global styles
4. Utility classes are best 


- Styling approach that works with SSR and web components
- With a few self imposed limits you get a very powerful set of tools that make it possible to style your app for both SSR and shadowDOM
- w/o shadow DOM there is no way to get the full encapsulation. `div {background:red important!}` will always win. 
- We use proper scoping to compensate for lack of encapsulation.
  1. Use utility classes first (scoped to element)
  2. Use component template styles next (with scoping to the component or instance)
  3. Use the most specific selectors you can.
  4. Be aware of deep selecting (prefer `>` to ` ` (decendant selector)) 
  5. As few globals styles as possible
  6. Use :host, ::slotted etc. with SSR polyfill
  7. Generally avoid competing styles declairations meant to override one another in subtle ways. This exposes edge cases between SSR and shadowDOM more frequently. 
  8. Ultimatly you are limiting your self in a few ways to have the freedom to build apps that work with and without JS. 
``` html
//my-component
<style scope="component">
  ::part("tab") {
    display:block;
  }
</style>
<div part="tab"></div>
```

``` html
<style >
  [part="tab"][part="my-component"] {
    display:block;
  }
</style>
<div part="tab my-component"></div>
```