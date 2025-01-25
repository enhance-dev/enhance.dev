---
title: Sharing
links: # Further Reading
  - Contributing packages to the npm registry: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
---

As you build Enhance applications, you may notice a pattern where you create components for forms, buttons, cards, etc., that are often very similar across each application. You can combine these components into a single library to make their sharing between applications easier.

A pattern that works quite well with Enhance applications follows.

## Publishing

Most folks will create an npm package to collect their shared components. The structure of this package is up to you, but we recommend that the [main](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#main) field of your `package.json` file points to a file structured like the following example.

In the file that represents the main entry point to your module, start by first importing the components you wish to publish.

```javascript
import CheckBox from './packages/check-box/CheckBox.js'
import TextInput from './packages/text-input/TextInput.js'
```

Next, create an `elements` object that will map the custom element tag name to the [pure function](https://en.wikipedia.org/wiki/Pure_function) that generates your component.

```javascript
const elements = {
    "enhance-checkbox": CheckBox,
    "enhance-text-input": TextInput,
}
```

Then export this `elements` object so it may be imported in your Enhance applications.

```javascript
export default elements
```

Finally, export each component by name to add more flexibility to your components package. This step is optional but beneficial if you have projects that don’t use all components in your component suite.

```javascript
export {
    CheckBox,
    TextInput
}
```

Here's the complete code for our example entry point for the module.

<doc-code filename="index.js">

```javascript
import CheckBox from './packages/check-box/CheckBox.js'
import TextInput from './packages/text-input/TextInput.js'

const elements = {
    "enhance-checkbox": CheckBox,
    "enhance-text-input": TextInput,
}

export default elements

export {
    CheckBox,
    TextInput
}
```

</doc-code>

## Importing

To use your component library in your Enhance application first install it as an Enhance dependency. For the rest of this document, we will use `@enhance/form-elements` as our example package name.

```bash
npm install @enhance/form-elements
```

Now that we've included one (or more) component libraries in our app we need to tell Enhance where to find them. To do that, we will edit, or create if it doesn't exist, the `app/enhance.mjs` file. It is in this file where we can import components from external packages.

<doc-code filename="app/elements.mjs">

```javascript
import formElements from '@enhance/form-elements'
let elements = { ...formElements }
export default elements
```

</doc-code>

### Multiple Component Libraries

If you combine multiple component libraries, you will use the same approach in your `app/elements.mjs` file.

<doc-code filename="app/elements.mjs">

```javascript
import formElements from '@enhance/form-elements'
import exampleComponents from '@example/components'
let elements = { ...formElements, ...exampleComponents }
export default elements
```

</doc-code>

### Renaming Components

Occasionally, you will find that you need to rename an imported component because of a conflict in tag names. Let's pretend we already have a component called `enhance-checkbox` and we also want to use the `enhance-checkbox` from `@enhance/form-elements`. To do that we'll give the `enhance-checkbox` in `@enhance/form-elements` a new tag name of `my-checkbox`.

<doc-code filename="app/elements.mjs">

```javascript
import formElements from '@enhance/form-elements'
delete Object.assign(
    formElements,
    {['my-checkbox']: formElements['enhance-checkbox'] }
)['enhance-checkbox'];
let elements = { ...formElements }
export default elements
```

</doc-code>

### Selective Imports

You will often find that you don’t need all of the components in the component library you are importing. If the component library you are using follows our recommendation to provide name exports, this is easy to accomplish. For example, our `@enhance/form-elements` example exports a `CheckBox` and a `TextInput`, but our application only needs the Che`ckBox. We can then write our `app/elements.mjs` file like this:

<doc-code filename="app/elements.mjs">

```javascript
import { CheckBox } from '@enhance/form-elements'
let elements = {
    "enhance-checkbox": CheckBox
}
export default elements
```

</doc-code>
