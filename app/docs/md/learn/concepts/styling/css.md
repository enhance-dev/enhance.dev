---
 title: Styling with CSS
---

Using CSS with Enhance is as easy adding CSS to a`<style>` tag.
Just edit the `head.mjs` file in the root of your project and add a `<style>` tag. It's that easy.

## Adding a style tag to your `head.mjs`

Look for the `head.mjs` file in the root of your app.

```
app
└── head.mjs
```

Add a style tag and start writing CSS.

<doc-code filename='app/head.mjs'>

```javascript
export default function Head () {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title></title>
      <link rel="icon" href="/_public/favicon.svg">
      <style>
        body {
          background-color: rebeccapurple;
        }
      </style>
    </head>
`
}
```

</doc-code>

The benefits of adding styles to a style tag in the head is that the styles will be immediately available when the page loads which will help avoid FOUCing your users.
Downsides are too much CSS can weigh down your page as well as make it hard to edit.

## Linking to CSS file

Some developers prefer to write CSS in a `.css` file so let's look at how to do that.

Add a `styles.css` file to the public folder.

```
app
├── public ............ static assets
│   └── styles.css
└── head.mjs .......... custom <head> component
```

Then open up the `head.mjs` file and link to your new `styles.css` file at `/_public/styles.css`. Obviously you can put your CSS file in any nested folder you like in the public folder and name the file whatever you like, just remember update the path in your link tag.

<doc-callout level="none" mark="🔔">

  `/_public` is a special path that will automatically forward to a fingerprinted version of your static assets.

</doc-callout>


```javascript
export default function Head () {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title></title>
      <link rel="icon" href="/_public/favicon.svg">
      <link rel="stylesheet" href="/_public/styles.css">
    </head>
`
}
```

Now get to styling with CSS! We can't wait to see what you make.









