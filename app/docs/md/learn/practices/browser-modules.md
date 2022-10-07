---
title: Browser Modules
---

<doc-callout level="info" mark="🧺">

Enhance projects let you share modules with the browser via ***"bundles"***.
Using the built in bundling system serves code via your own domain instead of from a third-party registry.  
No need to fuss over CORS or external downtime.

</doc-callout>

Under the hood, the Enhance Starter Project uses the [Architect](https://arc.codes) framework.
Architect projects have a manifest file: `.arc`.  
To bundle code for the browser, simply add an entry to your `.arc` file.
Set the **name** and **path** under the `@bundles` setting (called "pragmas").

## Bundle Project Browser Code

The `@bundles` feature combines all of a module's dependencies into a single payload and makes it available to the browser from `/_static/bundles/your-bundle.mjs`.

### Basic Example

If you have written a bit of JS for your app that has an external dependency, you'll likely want to bundle your script with its dependency.

Let's use [Algolia's autocomplete](https://github.com/algolia/autocomplete) as an example.

<doc-code filename="/utils/autocomplete.mjs">

```javascript
import { autocomplete } from '@algolia/autocomplete-js'

addEventListener('DOMContentLoaded', () => {
  autocomplete({
    container: '#autocomplete',
    // ...
  })
})
```

</doc-code>

Assuming this file is located at `/utils/autocomplete.mjs`, update your `.arc` file (adding the `@bundles` line if needed) with this entry:

```arc
@bundles
autocomplete '/utils/autocomplete.mjs'
```

The bundled asset will now be available at `/_static/bundles/autocomplete.mjs` and can be imported or referenced in a script tag.

```html
<script type="module" src="/_static/bundles/autocomplete.mjs">
```

### Multi-file Source to Single Bundle

If your project grows to a certain size, it is beneficial to extract Web Component definitions (that is JS classes that extend `HTMLElement`) from their source in /app/elements/ into a common place.

For this example, we'll create an arbitrary directory outside of app/ called "components/" and place a couple classes there with an index file:

```
.
├── .arc
├── app/
└── components/
    ├── todo-list.mjs
    ├── todo-item.mjs
    └── index.mjs
```

The index file works as a manifest, exporting all requirements:

<doc-code filename="/components/index.mjs">

```javascript
export { default as TodoList } from './todo-list.mjs'
export { default as TodoItem } from './todo-item.mjs'
```

</doc-code>

We'll update our `.arc` file, adding `@bundles` if it's not already present:

```arc
@bundles
todos '/components/index.mjs'
```

These classes can now be imported as needed.

```javascript
import { TodoList, TodoItem } from '/_static/bundles/todos.mjs'
```


## Bundling External Modules

You may want to install an external dependency for use in the browser.
Enhance `@bundles` handles this, as well.

### Example: [`wc-toast`](https://github.com/abdmmar/wc-toast)

`wc-toast` provides a nice custom element definition and accompanying API for creating alert messages in an application. We'll install it as a project dependency:

```shell
npm i wc-toast
```

The `wc-toast` project ships with a nice entry point for a bundle. We will bundle and expose `wc-toast`'s main index file as "wc-toast" by updating `.arc` with:

```arc
@bundles
wc-toast './node_modules/wc-toast/src/index.js'
```

<doc-callout level="tip" mark="🗝️">

The name "wc-toast" can be anything you'd like, but we prefer to stick as close to the source library's name as possible.

</doc-callout>

Now, we're able to import bundle, or a named export in this case, from the `/_static/bundles/` endpoint:

```javascript
import { toast } from '/_static/bundles/wc-toast.mjs'
```

## TypeScript Web Components

With the `@bundles` feature, you can write browser code with TypeScript.
It is automatically converted to browser compatible JavaScript and served to the client.

### Example `.ts` Definition

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
To have our `todo-item.ts` transpiled and served to our front end, just give it a name and a path in the project's `.arc` file:

```arc
@bundles
todo-item /components/todo-item.ts
```

Now it can be imported from your custom element or with a script tag:

```javascript
import TodoItem from '/_static/bundles/todo-item.mjs'
```

```html
<script type="module" src="/_static/bundles/todo-item.mjs">
```
