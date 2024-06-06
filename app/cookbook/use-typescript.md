---
title: Use TypeScript
---

If you prefer to work with TypeScript, we recommend starting with our [TypeScript starter project](https://github.com/enhance-dev/enhance-starter-typescript).


## Getting Started

Assuming you’re starting a new Enhance project, you would run the command:

```bash
npx "@enhance/cli@latest" new ./myproject \
  --template https://github.com/enhance-dev/enhance-starter-typescript -y
```

This will set up a new Enhance project where you’ll code your APIs, elements and pages in TypeScript instead of JavaScript. Instead of editing files in the `app` folder, you’ll do your editing in the `ts` folder.


### Project Structure

``` \
ts
├── api ............... data routes
│   └── index.mts
├── browser ........... browser JavaScript
│   └── index.mts
├── components ........ single file web components
│   └── my-card.mts
├── elements .......... custom element pure functions
│   └── my-header.mts
├── pages ............. file-based routing
│   └── index.html
└── head.mts .......... custom <head> component
```

Note: We are using `.mts` to tell the TypeScript Compiler to generate ES Modules as `.mjs` files..


## Local Development

Running the local development environment is the same as any other Enhance project. The new `@enhance/plugin-typescript` is responsible for watching the `ts` folder for any file changes. If a file with an `.mts` extension is updated, it will be re-compiled with the compilation target being the `app` folder. All other file types are simply copied to their corresponding locations in the `app` folder.

## Authoring Code

Write your code in TypeScript. We already have [types](https://github.com/enhance-dev/types) that you can import into your elements:

<begin-code filename="ts/api/todo-item.mts">

```typescript
import type { EnhanceElemArg } from "@enhance/types"

export default ({ html, state: { attrs } }: EnhanceElemArg) => {
  const { state = "" } = attrs
  return html`
    ${state === "complete" ? "☑" : "☐"}
    <slot></slot>
  `
}
```

</begin-code>

Or APIs:

<begin-code filename="ts/api/todos.mts">

```typescript
import type {
  EnhanceApiFn,
  EnhanceApiReq,
  EnhanceApiRes,
} from "@enhance/types";

type Todo = {
  title: string;
  completed?: boolean;
};

export const get: EnhanceApiFn = async function (
  request: EnhanceApiReq,
): Promise<EnhanceApiRes> {

  console.log(`Handling ${request.path}...`);

  const todos: Todo[] = [
    { title: "todo 1", completed: false },
    { title: "todo 2", completed: true },
    { title: "todo 3" },
  ];

  const response: EnhanceApiRes = {
    json: { todos },
  };

  return response;
};
```

</begin-code>

## Deploying

Use the [`@begin/deploy`](https://begin.com/deploy/docs/workflows/deploying-code) package to deploy your application. Alternatively, you can write a GitHub Action to [deploy on every commit](https://github.com/enhance-dev/enhance-starter-typescript/blob/main/.github/workflows/CI.yml).
