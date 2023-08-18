---
 title: Styling with CSS
---

Using CSS with Enhance can be as easy as adding a`<style>` tag to the head of your HTML document.
Just edit the `head.mjs` file in the root of your project and add a `<style>` tag. That's it.

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

The benefits of adding a style tag to the head is that the styles will be immediately available when the page loads which will help avoid [FOUCing](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) your users.
Downsides are too much CSS in the head can weigh down your page as well as make harder to edit.

## Linking to CSS file

Some developers prefer to write CSS in a `.css` file so let's look at how to do that.

Add a `styles.css` file to the public folder.

```
app
├── public ............ static assets
│   └── styles.css
└── head.mjs .......... custom <head> component
```

Then open up the `head.mjs` file and link to your new `styles.css` file at `/_public/styles.css`. Obviously you can put your CSS file anywhere you like in the public folder as well as name it whatever you like, just remember update the `href` in your link tag.

<doc-callout level="none" mark="🔔">

  [`/_public`](/docs/learn/starter-project/public) is a special path that will automatically forward to a fingerprinted version of your static assets.</br>

  [Read more about fingerprinting here](/docs/learn/starter-project/public#automatic-%E2%80%9Cfingerprinting%E2%80%9D) →

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









