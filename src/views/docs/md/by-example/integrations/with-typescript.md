---
title: With TypeScript
links:
  - "@enhance/types": https://github.com/enhance-dev/types
  - esbuild: https://esbuild.github.io/
  - swc: https://swc.rs/
  - TypeScriptLang.org: https://www.typescriptlang.org/
docs-pager: false
---

With Enhance you can write your front end [Web Component definitions as TypeScript](#build-web-components-with-bundles) right out-of-the-box, thanks to `@bundles`.

There are also [type definitions available](#enhance-type-definitions) for both JavaScript and TypeScript usage.

Enhance does not have a convention for full TypeScript project transpilation, but [that's not to say it's not possible](#bring-your-own-build-tool) and even easy to set up.

## Build Web Components with `@bundles`

With the `@bundles` feature, you can already write front end code as `.ts`.
It is automatically converted to browser compatible JavaScript and served to the client.

### Example component

Imagine we have a simple Web Component definition that lives in a components/ folder in our project root:

<doc-code filename="components/todo-item.ts">

```typescript
export class TodoItem extends HTMLElement {
  public label: string;
  public completed: boolean;
  checkbox: HTMLInputElement | null;

  constructor() {
    super();

    this.label = this.getAttribute("label") || "";
    this.completed = typeof this.getAttribute("completed") === "string";
    this.checkbox = this.querySelector("input");
  }

  public static get observedAttributes(): string[] {
    return ["label", "completed"];
  }
}

customElements.define("todo-item", TodoItem);
```

</doc-code>

This example doesn't do a whole lot yet, but it's a good starting place.  
To have our todo-item.ts transpiled and served to our front end, just give it a name and a path in the project's `.arc` file:

```arc
@bundles
todo-item /components/todo-item.ts
```

Now it can be imported from your custom element or with a script tag:

```javascript
import TodoItem from '/_static/bundles/todo-item.mjs'
```

```html
<script src="/_static/bundles/todo-item.mjs">
```

## Bring Your Own Build Tool

If you'd like to write your server-side code (API handlers, custom element templates, Head function) with TypeScript, Enhance doesn't have any opinions how to do that.
But targeting [the conventional /app file structure](/docs/learn/starter-project/structure) is straightforward.

Some options for transpiling your TypeScript to JavaScript executed with Node.js:

- [esbuild](https://esbuild.github.io/) - fast/scriptable; used by Enhance `@bundles`
- [Speedy Web Compiler](https://swc.rs/) (aka SWC) - super fast and scriptable
- [Parcel](https://parceljs.org/languages/typescript/) - uses SWC under the hood
- [Webpack](https://webpack.js.org/guides/typescript/) - ol' reliable
- [Compile with VS Code](https://code.visualstudio.com/docs/typescript/typescript-compiling) 🤯

### ...and Typechecking

The tools mentioned above do not usually perform typechecking out-of-the-box.
If you are using tool other than the official TypeScript compiler, `tsc`, to build your code, you'll likely want to use a linting/typechecking step.
`tsc --no-emit` is useful here.

<doc-callout level="tip" mark="📢">

**If you've built a novel way to add whole-project compilation to Enhance, let us know!**  
And if you see any opportunities for improving the official types or this doc, feel free to file issues and/or open a PR.
We're always open to outside contribution, especially from domain experts.

</doc-callout>
