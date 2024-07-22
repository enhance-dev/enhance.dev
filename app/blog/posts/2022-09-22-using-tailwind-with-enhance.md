---
title: "Using Tailwind CSS with Enhance"
image: '/_public/blog/post-assets/kite.jpg'
category: uncategorized
description: Setup your Enhance application to use Tailwind CSS.
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
published: 'September 22, 2022'
---

![kite](/_public/blog/post-assets/kite.jpg)
<small>Photo by <a href="https://pixabay.com/users/caproche-1024152/">Caproche</a> on <a href="https://pixabay.com/">Pixabay</a></small>

Obviously, we are a bit biased around here, and we think that `@enhance/styles` is an excellent solution for styling your web application, but we acknowledge that there is more than one way to write an app. Plus, we ask you to learn a bunch of new ways of doing things when you build an Enhance app so you may feel comfortable with a different CSS utility framework.

## Adding Tailwind CSS to your Enhance app

Many folks are familiar with [Tailwind CSS](https://tailwindcss.com/), so we thought we’d give you a quick tutorial on setting it up in an Enhance context.

### Step 1: Install arc-plugin-tailwind

The first step is to install `arc-plugin-tailwind` from community member [@andybee](https://github.com/andybee).

```bash
npm i -D arc-plugin-tailwindcss
```

> Do you know of other community-developed plugins needing more of a spotlight? Please let us know on [Twitter](https://twitter.com/enhance_dev).

### Step 2: Add the plug-in to your .arc file

In your favorite text editor, open up the `.arc` as we will add a few lines to enable and configure the plugin.

First, in the `@plugins` section under the entry for `enhance/arc-plugin-enhance` add a new line for `arc-plugin-tailwindcss` as this will enable the plugin for the Enhance application. Then we’ll add a few more lines to configure the plugin.

```arc
@tailwindcss
  src my-styles.css
  build public/tailwind.css
```

The `src` line tells the plugin where to find the Tailwind CSS directives file. More on that in step 4. The `build` line specifies where the output of the Tailwind CSS build should live.

If you started with a default Enhance project, your `.arc` file should look like this:

```arc
@app
begin-app

@plugins
enhance/arc-plugin-enhance
arc-plugin-tailwindcss

@tailwindcss
  src my-styles.css
  build public/tailwind.css
```

### Step 3: Create your `tailwind.config.js` file

At the root of your project, create a file called `tailwind.config.js`.We need to tell the Tailwind CSS compiler to look at all our `.html` and `.mjs` files in our app folder for utility classes. Any utility classes found in these files will be added to our `public/tailwind.css` file.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{html,mjs}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 4: Create a Tailwind CSS directives file

In step 2, we told the Tailwind CSS plugin that the directives would be stored in `my-styles.css`, so let's  create that file and populate it with the following lines:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```


### Step 5: Override the default Head component

Enhance provides a [Head](https://enhance.dev/docs/learn/starter-project/head) component that automatically includes `@enhance/styles`, but now we want to use Tailwind CSS instead. We’ll create a file named `app/head.mjs` and populate it with the following lines:

```javascript
export default function Head() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>My Enhance Project</title>
      <link rel="stylesheet" href="/_static/tailwind.css">
      <link rel="icon" href="/_static/favicon.svg">
    </head>
  `
}
```

Whew, we are all done. Now, if you run `npm start`, you can develop your application locally using Tailwind CSS. Every time you edit a file under the `app` folder, `arc-plugin-tailwind` will automatically run the Tailwind CSS compiler and regenerate the `public/tailwind.css` file.

## Example component

Create a new file `app/elements/my-button.mjs` with the contents:

```javascript
export default function MyButton({ html }) {
  return html`
      <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        My Button
      </button>
    `
}
```

Check out how the file watcher automatically updates the `tailwind.css` file.

Happy styling!
