---
title: TypeScript template
---

We know you like [TypeScript](https://www.typescriptlang.org/). We’ve seen how often you search for TypeScript on the [Enhance](https://enhance.dev) documentation site. We’ve heard from users on our [Discord](https://enhance.dev/discord) that they want a way to work with TypeScript in their Enhance projects.

The thing is, you’ve always been able to use TypeScript with Enhance. The reason we haven’t officially described a way to set up an Enhance project with TypeScript before is because TypeScript configurations are a matter of taste and we didn’t want to give folks the impression that this is the only way.

However, this has given a number of folks the impression that you cannot use TypeScript with Enhance and we wanted to dispel that myth. According to one user we were giving serious “not a real project” vibes by not supporting TypeScript.

So today, we are introducing the [Enhance TypeScript Starter](https://github.com/enhance-dev/enhance-starter-typescript).


## Getting Started

Assuming you are starting a new Enhance project you would run the command:

```bash
npx "@enhance/cli@latest" new ./myproject \
  --template https://github.com/enhance-dev/enhance-starter-typescript -y
```

This will set up a new Enhance project where you will code your APIs, elements and pages in TypeScript instead of JavaScript. Instead of editing files in the `app` folder you will do your editing in the `ts` folder.


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

Running the local development environment is the same as any other Enhance project. The new `@enhance/plugin-typescript` is responsible for watching the `ts` folder for any file changes. If the file has an `.mts` extension they are re-compiled with the compilation target being the `app` folder.  All other file types are simply copied to their corresponding locations in the `app` folder.

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
