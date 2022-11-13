---
title: With TypeScript
links:
  - "@enhance/types": https://github.com/enhance-dev/types
  - esbuild: https://esbuild.github.io/
  - swc: https://swc.rs/
  - TypeScriptLang.org: https://www.typescriptlang.org/
docs-pager: false
---

Enhance does not have a convention for full TypeScript project transpilation. However, it is definitely possible given the array of compiler tools available.

## Bring Your Own Build Tool

If you'd like to write your server-side code (API handlers, custom element templates, Head function) with TypeScript, Enhance doesn't have any opinions how to do that.
But targeting [the conventional /app file structure](/docs/learn/starter-project/structure) is straightforward.

<doc-callout level="tip" mark="📢">

**If you've built a novel way to add whole-project compilation to Enhance, let us know!**
And if you see any opportunities for improving the official types or this doc, feel free to file issues and/or open a PR.
We're always open to outside contribution, especially from domain experts.

</doc-callout>

Some options for transpiling your TypeScript to JavaScript for Node.js:

- [esbuild](https://esbuild.github.io/) - fast/scriptable; used by [Enhance `@bundles`](/docs/learn/practices/browser-modules) for *browswer* code
- [Speedy Web Compiler](https://swc.rs/) (aka SWC) - super fast and scriptable
- [Parcel](https://parceljs.org/languages/typescript/) - uses SWC under the hood
- [Webpack](https://webpack.js.org/guides/typescript/) - ol' reliable
- [Compile with VS Code](https://code.visualstudio.com/docs/typescript/typescript-compiling) 🤯

<doc-callout level="caution">

Be wary of build tools that are intended for client side projects. With an "HTML first" principle, most of Enhance is executing in a server-side Node.js environment.
Read more about [using TS to build Web Component definitions for the browser with `@bundles`](/docs/learn/practices/browser-modules#typescript-web-components).

</doc-callout>

<!--
### ...and Typechecking

The tools mentioned above do not usually perform typechecking out-of-the-box.
If you are using tool other than the official TypeScript compiler, `tsc`, to build your code, you'll likely want to use a linting/typechecking step.
`tsc --no-emit` is useful here.
-->
