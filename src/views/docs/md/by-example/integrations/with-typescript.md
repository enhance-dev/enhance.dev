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

## Enhance Type Definitions

Enhance offers a set of common type definitions for use in both `.mjs` (via JSDoc) and `.ts` files.
These will help when writing custom elements, API middleware, and other critical pieces of an Enhance project.

Save @enhance/types to your development dependencies:

```shell
npm i -D @enhance/types
```

### JSDoc usage

If your editor supports autocomplete and error detection (like Intellisense) via commented types, you can indicate that a function adheres to a certain type.

In this case, we'll mark this API GET handler as the type `EnhanceApiFn`:

```javascript
/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function get(req) {
  console.log(`Handling ${req.path}...`);

  const todos = [
    { title: "todo 1", completed: false },
    { title: "todo 2", completed: true },
    { title: "todo 3" },
  ];

  const response = {
    json: { todos },
  };

  return response;
}
```

<doc-callout level="info" mark="none" thin>

This approach can also be used for custom element definitions and the Head function.
For more examples, [see the @enhance/types README](https://github.com/enhance-dev/types)

</doc-callout>

### TypeScript usage

If you are authoring API handlers, custom elements, etc. with TypeScript ([see below](#bring-your-own-build-tool)), you can cast the handler function with a specific type:

```typescript
import type { EnhanceApiFn } from "@enhance/types";
import type Todo from './your/type-defs'

export const get: EnhanceApiFn = async function (req) {
	console.log(`Handling ${req.path}...`);

	const todos: Todo[] = [
		{ title: "todo 1", completed: false },
		{ title: "todo 2", completed: true },
	];

	return {
		json: { todos },
	};
};
```

<doc-callout level="info" mark="none" thin>

This approach can also be used for custom element definitions and the Head function.
For more examples, [see the @enhance/types README](https://github.com/enhance-dev/types)

</doc-callout>

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
