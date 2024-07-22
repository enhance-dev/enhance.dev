---
title: "A React Developers Guide to Writing Enhance Components"
image: "/_public/blog/post-assets/guide.jpg"
image_alt: "Hands holding a map"
photographer: "Sylwia Bartyzel"
photographer_url: "https://unsplash.com/@sylwiabartyzel?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
category: enhance, begin, html
description: "Frequently, we are asked by React developers why patterns they have learned while writing components using JSX do not translate to writing web components. In this post, I'll try to capture some common gotchas that developers coming from React or other JavaScript view frameworks may run into when writing plain vanilla web components."
author: 'Simon MacDonald'
avatar: 'simon.png'
mastodon: "@macdonst@mastodon.online"
published: "March 8, 2024"
---

Frequently, we are asked by React developers why patterns they have learned while writing components using JSX do not translate to writing web components. In this post, I'll try to capture some common gotchas that developers coming from React or other JavaScript view frameworks may run into when writing plain vanilla web components. Thanks to [Discord](https://enhance.dev/discord) user `taphill` for the inspiration on this post.

## Why is there so much confusion?

In my opinion, it is because **JSX is not HTML**. Some folks may see that as controversial, but it isn't. In fact, legacy React documentation [explicitly states](https://legacy.reactjs.org/docs/introducing-jsx.html#:~:text=This%20funny%20tag%20syntax%20is,the%20full%20power%20of%20JavaScript.) that JSX is not HTML.


### JSX is not…

* HTML
* A String
* A templating language

### JSX is…

* A syntax extension to JavaScript

This explains why JSX must be compiled into vanilla JavaScript before it can run in the browser.

In the immortal words of [tanaradoublechocolate](https://www.tiktok.com/@tanaradoublechocolate), “See how this looks like something you've seen before but isn't?"

```javascript
const element = <h1>{title}</h1>;
```

Without JSX, you would write this as:

```javascript
const element = `<h1>${title}</h1>`;
```

The syntax changes are not significant, but they are enough to trip you up as you transition from writing React components to web components.

Let's take a look at some of the other frequent gotchas that developers are likely to encounter.

## Quoting Attributes

In JSX, it is customary to provide the value of an attribute without quotes:

```javascript
const image = <img src={href} alt={altText} />
```

This is because properties in React are passed by reference, not by value. This makes a lot of sense when you think about how React handles re-renders. The child component needs to know when the parent component has changed the value of the property.

Writing the same tag using a string template in JavaScript would look like this:

```javascript
const image = `<img src="${href}" alt="${altText}" />`;
```

We are using a [string template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to create the tag and the `${}` syntax to provide string interpolation, that is, substituting the values of `href` and `altText` into our string.

However, this doesn't address why we double quote our attributes. Even the HTML specification says these quotes are optional. Well, they are optional until they aren't. Let's look at an example.

```javascript
const href = 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg'
const altText = 'white cat'
const image = `<img src="${href}" alt="${altText}" />`
```

This produces the HTML

```html
<img src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg" alt="white cat" /> \
```

If we had omitted the double quoting of attributes, we get

```html
<img src=https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg alt=white cat /> \
```

Nothing would break, but your HTML would be subtly wrong. The image's alt text would only be `white`, and there would be this dangling attribute on the image tag with the name of `cat`. The browser will still display the image correctly, but your alt text will be wrong.


## Naming Attributes

It is well known that when you specify CSS class names in a HTML page you use the `class` attribute. As well, it is commonly known that when you specify CSS class names in a JSX you use the `className` attribute — but why is that? The answer refers back to the beginning of this post, JSX is not HTML, JSX is an extension of JavaScript and [`class` is a reserved word](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class) in JavaScript. This necessitates that when writing JSX you use `className` instead, just as the JSX attribute `htmlFor` is used instead of the  `for` attribute.

React [recommends that you use camel cased attributes](https://legacy.reactjs.org/docs/dom-elements.html#all-supported-html-attributes). Once again this is fine when you are writing JavaScript, but in HTML all [attributes are lowercased](https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes:~:text=All%20attribute%20names%20on%20HTML%20elements%20in%20HTML%20documents%20get%20ASCII%2Dlowercased%20automatically). So when you are writing web components, it's best to default to lowercase attribute names — or use kebab or snake case if you must.

Of particular concern here is that [the attributeChangedCallback function](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes) will not fire for attributes with uppercase characters (because of the aforementioned parser behavior). Therefore, attributes named with multiple words should be delimited using kebab-casing or snake_casing (or not delimited at all).

<div class="overflow-x-scroll">

| case | attribute | JS access | `attributeChangedCallback` |
|---|---|---|:-:|
| lower | `imagewidth` | `attrs.imagewidth` | ✅ |
| kebab | `image-width` | `attrs['image-width']` | ✅ |
| snake | `image_width` | `attrs.image_width` | ✅ |
| camel | `imageWidth` | `attrs.imageWidth` | ❌ |

</div>

## Complex Attributes

React developers are used to being able to pass objects into their components via properties. When writing HTML you are limited to using attributes — and in HTML, all attributes are strings. For example:

```javascript
const person = {
  id: 'user0',
  firstName: 'Axol',
  lastName: 'Lotl'
}

const element = <User person={person} />

function User({ person }) {
  return (…);
}
```

Then in your User component you can access all the properties of the `person` object.

However, when writing web components if you wrote:

```javascript
const person = {
  id: 'user0',
  firstName: 'Axol',
  lastName: 'Lotl'
}

const element = `<user-card person="${person}"></user-card>`
```

Then inside your `user-card` component the value of `person` would be `[object Object]`. This is to be expected since, once again, all attributes are strings. So, how do we go about passing objects into web components?

If the object is relatively small, you can set multiple attributes on your component:

```javascript
const element = `<user-card id="${person.id}"  firstname="${person.firstName}"  lastname="${person.lastName}"></user-card>`
```

However, if your object is very complex, you will want to fetch your data from the component. We use the store to hold complex data when writing an Enhance web component. For example:

```javascript
// app/elements/user-card.mjs
export default function UserCard({ html, state }) {
  const { attrs, store } = state
  const { id } = attrs
  const { users } = store
  const user = users[id]

  return html`… `
}

// app/pages/card.mjs
const element = `<user-card id="${id}"></user-card>`
```

<deploy-docs-callout level="info">

Tip: For more information on the [Store](https://enhance.dev/docs/elements/state/store) read the [Enhance Docs](https://enhance.dev/docs).

</deploy-docs-callout>

## Rendering Markup from Arrays

A common pattern in many apps is looping over some data to create our UI. Quite often in React apps you will see something like this:

```javascript
const todoList = <ul>
  {todos.map((todo) => (
    <li key={todo.id}>{todo.text}</li>
  ))}
</ul>
```

When using this pattern in an Enhance app, you might automatically write the web component version of this code like this:

```javascript
const todoList = `<ul>
  ${todos.map((todo) => (
    `<li key="${todo.id}">${todo.text}</li>`
  ))}
</ul>`
```

That works, sort of. When viewing your output in the browser, you will notice a comma between each `li` tag. That is because the `map` function returns an `array`. When you convert an `array` to a string in JavaScript, it adds that comma between each item.

In order to prevent this default behavior, we use the `join` method.

```javascript
const todoList = `<ul>
  ${todos.map((todo) => (
    `<li key="${todo.id}">${todo.text}</li>`
  )).join('')}
</ul>`
```

We call the `join` method in the above code with the empty string. This will produce one large string that will get inserted into the DOM. If you prefer to make your HTML source pretty, you can pass the newline character to the `join` method. Don't forget to escape the newline character properly; it should look like `join('\\n')`.

## Conclusion

Hopefully that clears up some of the confusion when coming from React projects to writing web components — whether or not you are using the Enhance framework or not. If you are interested in learning more about Enhance:

* [Follow](https://fosstodon.org/@enhance_dev) Axol, the Enhance Mascot on Mastodon…
* Join the [Enhance Discord](https://enhance.dev/discord) and share what you've built, or ask for help.
