## TypeScript Web Components

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

The `@bundles` feature combines all of a module's dependencies into a single payload and makes it available to the browser from `/_public/bundles/your-bundle.mjs`.
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
import TodoItem from '/_public/bundles/todo-item.mjs'
```

```html
<script type="module" src="/_public/bundles/todo-item.mjs">
```
