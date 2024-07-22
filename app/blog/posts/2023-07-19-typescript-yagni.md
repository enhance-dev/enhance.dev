---
title: "TypeScript: YAGNI"
image: "/_public/blog/post-assets/ts-post-hero.png"
image_alt: "Frustrated man working with TypeScript, happy woman working with JSDoc"
category: typescript, jsdoc, JavaScript
description: "TypeScript! What is it good for? I wouldn’t go as far as to say “absolutely nothing” like the song. I’m not trying to start a war here."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "July 19, 2023"
---

TypeScript! What is it good for? I wouldn’t go as far as to say “absolutely nothing” like the song. I’m not trying to start a war here. It certainly is widespread, with JetBrains estimating it has [nearly tripled in popularity over the past six years](https://www.jetbrains.com/lp/devecosystem-2022/#languages-six-years-dynamics-heatmap), with 34% of respondents reporting they’ve coded with TypeScript in the past year. However, we are scientists and using popularity as a reason for adopting a new tool is an excellent way to commit a logical fallacy.


## Why use TypeScript?

We asked folks why they like TypeScript, and their reasons can be summarized as follows:

**Static Typing:** TypeScript introduces static typing to JavaScript, allowing developers to define explicit types for variables, function parameters, and return values. This enables early detection of type-related errors during development, reducing bugs and improving code quality.

**Enhanced IDE Support:** With TypeScript, IDEs and code editors can provide advanced features such as auto-completion, type checking, and code navigation. The static typing information enables intelligent code suggestions and catches errors before runtime, leading to a more efficient development experience.

**Code Maintainability:** The use of explicit types in TypeScript enhances code maintainability. It provides self-documenting code by making it easier to understand the function signatures and data structures used throughout the codebase. This leads to improved collaboration among team members and better long-term maintainability.

**Early Error Detection:** TypeScript catches type-related errors at compile-time, which helps identify issues before running the code. This reduces the likelihood of encountering runtime errors and provides developers with faster feedback during development.

Well, that sounds good to me, so we should all switch to TypeScript, right?

> Fighting with TypeScript is so exhausting. My tasks take easily 50-75% longer, and it's so much easier to get sidetracked making TS happy to the point of forgetting what I was aiming to do 😫
>
> Is the big secret in tech that this happens even to the aficionados and they just pretend it's fine?
>
> [Stephanie Eckles, June 27 2023](https://front-end.social/@5t3ph/110619078003210639)

🤔 maybe everything is not all happy in the state of TypeScript.


## Reasons not to use TypeScript?

Let’s dig into some reasons why not to use TypeScript:

**Compilation Step:** TypeScript is not JavaScript. Therefore, to be executable in the browser, it must be transpiled into JavaScript. This means you’ll be introducing a compilation step into your project. Setting up the build step, whether it be via tsc, webpack, vite, rollup, etc. can be intimidating for new developers adding unnecessary complexity to your project. Do you know what is quicker than a highly optimized build step? No build step at all.

**Unplanned Work:** Any project that includes external dependencies, and that’s pretty much all of them these days, is signing up for unplanned work when one of these dependencies updates its types. Since some dev decided to change a type in their fizz buzz widget, you must update your codebase to keep your editor and compiler from screaming at you.

But the most egregious example of TypeScript leading to unplanned work is:

> A lot of you like TypeScript. How do you deal with the fact that it does not respect semantic versioning? This seems so much of a deal breaker to me... and I get bitten by it every single time I use TS.
>
> [Matteo Collina, July 11 2023](https://fosstodon.org/@mcollina/110696343919474487)

Yup, that’s right, TypeScript doesn’t respect semver and will introduce breaking changes on [minor version bumps](https://github.com/microsoft/TypeScript/wiki/API-Breaking-Changes). So even if your TypeScript dependency in your package.json is set not to update to new major versions automatically, you can still introduce breaking changes by updating to a new minor version.

**False Sense of Security:** Many devs think the compile time checking of types is enough and don’t guard against these issues at runtime when they are far more dangerous.


## Can we get the benefits of TypeScript without using TypeScript?

Yes.

## How?

By using [JSDoc](https://jsdoc.app/) we can get most of the benefits of using TypeScript without worrying about setting it up or adding a build step to our project.

JSDoc is a comments system by design. It’s not just for documentation but also for type annotations. This means that you can define the types of your variables and describe their usage in the same place. This is especially useful for documenting the types of parameters and return values of functions: you can provide more context than just the type, like a usage example or a deprecation warning with a reference to the new function.

**Static Typing:** Using JSDoc annotations, you can provide type hints in your code. For example, here is a method where we add two numbers together with TypeScript:

```javascript
function sum(a: number, b: number) {
  return a + b;
}
```

And here is the corresponding method using JSDoc comments.

```javascript
/**
 * @param {number} a
 * @param {number} b
 */
function sum(a, b) {
  return a + b;
}
```

JSDoc may be a bit more verbose, but it still offers type hinting while coding.

**Enhanced IDE Support:** good news, VS Code supports the same intelligent code suggestions if you use JSDoc in favor of TypeScript.

![VS Code](/_public/blog/post-assets/ts-post-3.png)

**Code Maintainability:** JSDoc comments provide the same code maintainability benefits as TypeScript. In my own experience having the type information co-located with the code makes it more likely for me to keep them updated.  As an added bonus, you can import types using JSDoc if your project or dependency makes them available.

```javascript
/**
 * @typedef {import('../types').RendererOptions} RendererOptions
 */
/**
 * @param {RendererOptions} options
 * @returns {string}
 */
function render(options)
```

**Early Error Detection:** Arguably, the most important feature of TypeScript is catching errors during development. Luckily, you can enable this functionality in VS Code without needing TypeScript installed. Just add “// @ts-check” to the top of the file. Alternatively, you can enable it project-wide by turning on the setting:

```
"js/ts.implicitProjectConfig.checkJs": true
```

Congrats, you now have TypeScript without TypeScript.

## Is this all a moot point?

Maybe? There is a proposal in front of the TC-39 steering committee to add [static type syntax](https://tc39.es/proposal-type-annotations/) to JavaScript. It wouldn’t add static type checking to the language rather, it would standardize the syntax to make the development of tooling easier.

## Conclusion

The TypeScript vs JavaScript debate is tedious. If you are having success with TypeScript then I’m happy for you. However, what we can learn from the debate is not to pick our tools based purely on how popular they are. With a bit more digging, we can get 98% of the benefits of TypeScript without using TypeScript. That means no opting into breaking changes and build steps.

We are not the only ones to reach this conclusion. Recently Svelte switched from TypeScript to JSDoc for their project. In his response to this news reaching the front page of Hacker News Rich Harris commented that they are [not abandoning type safety](https://news.ycombinator.com/item?id=35892250). Instead they are opting for:

1. Shipping smaller packages, no giant source maps
2. Easier debugging, right click and you are taken right to the source
3. No build step

These are goals we can all get behind.

***// @ts-check***

No lies detected
