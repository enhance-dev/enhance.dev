---
title: "Styling TodoMVC with Enhance Styles"
image: '/_public/blog/post-assets/style.jpg'
category: uncategorized
description: In this post we'll learn how to style our todo app with @enhance/styles.
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
published: 'September 15, 2022'
---

![style](/_public/blog/post-assets/style.jpg)
<small>Photo by <a href="https://unsplash.com/@marcus_ganahl?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Marcus Ganahl</a> on <a href="https://unsplash.com/s/photos/todo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></small>

[Last week](https://blog.begin.com/posts/2022-09-06-enhancing-todomvc) I mentioned that this isn’t exactly how we would build a Todo app if we started from scratch, and one of the main things we would do differently is styling. So this week, we'll dive deeper into how to use `@enhance/styles` instead of discussing progressive enhancing the app with JavaScript.

## TL;DR

If you just want to jump right into the app, you can:

```bash
git clone git@github.com:macdonst/enhance-todomvc.git
cd enhance-todomvc
git checkout styles
npm install
npm start
```

Once the app starts up, navigate to [http://localhost:3333/todos](http://localhost:3333/todos).

## What is `@enhance/styles`?

[@enhance/styles](https://github.com/enhance-dev/enhance-styles) is an npm package that provides [CSS utility classes](https://designsystem.digital.gov/utilities/) for your Enhance application. The package is [customizable](https://enhance.dev/docs/learn/concepts/styling/utility-classes#customize) so you can modify the theme colors, borders, radii, etc.

## Where can I find the utility classes?

`@enhance/styles` creates the file `public/styles.css` which is included by default in the Enhance [Head](https://enhance.dev/docs/learn/starter-project/head) component. If you override the Head component in your Enhance application and you are using `@enhance/styles` don’t forget to include the following line in your Head component:

```html
<link rel="stylesheet" href="/_static/styles.css">
```

> ⚠️ Do not directly modify `public/styles.css` as it is  regenerated automatically. If you need to change values in `styles.css` read up on how to [customize](https://enhance.dev/docs/learn/concepts/styling/utility-classes#customize) `@enhance/styles`.

## How do I use the utility classes?

The same as you would any CSS class. For example, our todo list uses a `ul` element. We want to ensure that no bullets are added to the list and that the margin and padding are set to zero. So we add the classes `list-none, m-none, p-none` to our `ul` element.

```javascript
export default function ToDoList ({ html, state }) {
  const { store } = state
  let todos = store.todos || []
  return html`
<ul class="list-none m-none p-none">
  ${todos.map(todo => `<todo-item key="${todo.key}" item="${todo.item}" ${todo.completed ? 'checked' : ''}>${todo.item}</todo-item>
`).join('\n')}
</ul>`
}
```

## But what about the styles not covered by the utility classes?

You are not limited to only the styles in `public/styles.css`. You can add your own CSS file to the public folder and then override the Head component to include a link to your CSS file. That’s precisely what we did in the first version of TodoMVC, where we had [a link to the CSS](https://github.com/macdonst/enhance-todomvc/blob/main/app/head.mjs#L9) provided by the `todomvc-app-css` npm package.

You can get pretty far just by using the utility classes, but here are a few reasons why you’ll want to provide your own CSS, and they are CSS pseudo-classes and color. It’s in these situations where [element styles](https://enhance.dev/docs/learn/concepts/styling/element-styles) come into play. Enhance comes pre-configured with a styling system that allows you to target individual web components.

For example, in our todo list we want the last todo item not to have a border because the todo list itself already has a border. For that we’d use the pseudo-class `:last-child`:

```javascript
export default function ToDoList ({ html, state }) {
 const { store } = state
 let todos = store.todos || []
 return html`
<style>
todo-item:last-child {
 border-bottom: none;
}
</style>
<ul class="todo-list list-none m-none p-none">
 ${todos.map(todo => `<todo-item key="${todo.key}" item="${todo.item}" ${todo.completed ? 'checked' : ''}>${todo.item}</todo-item>
`).join('\n')}
</ul>`
}
```

And when we hover over an individual todo item we want the destroy button to become visible and be colored red.

```javascript
export default function ToDoList ({ html, state }) {
 const { store } = state
 let todos = store.todos || []
 return html`
<style>
todo-item:last-child {
 border-bottom: none;
}
li:hover todo-item-destroy button {
 display: block;
 color: red;
}
</style>
<ul class="todo-list list-none m-none p-none">
 ${todos.map(todo => `<todo-item key="${todo.key}" item="${todo.item}" ${todo.completed ? 'checked' : ''}>${todo.item}</todo-item>
`).join('\n')}
</ul>`
}
```

Besides being able to target the contents of the web component you can use the pseudo-class `:host` to target the custom element tag as well. For example, if we wanted to change the display property of our custom element to `block` instead of the default `inline` we'd write it like:

```html
<style>
  :host {
    display: block;
  }
</style>
```


## 🪄 What kind of wizardry is this?

Your Enhance project is set up to run a [style transform](https://enhance.dev/docs/learn/features/transforms/style-transforms) to relocate these component-based styles to the `head` element for optimal performance and eliminate that flash of unstyled content. It also does a transform to add the element name, `todo-list`, to each rule to provide some scoping. So our above example would produce this `style` tag in our page’s head tag:

```html
<style>
todo-list todo-item:last-child {
  border-bottom: none;
}
todo-list li:hover todo-item-destroy button {
  display: block;
  color: red;
}
todo-list {
  display: block;
}
</style>
```

## Next Steps

1. Try out the [Enhance Quickstart!](https://enhance.dev/docs/)
2. [Sign up](https://docs.google.com/forms/d/e/1FAIpQLScPxdqdFI2zkNZ3syCze_Mgj2ba3ZzHWQawKJbFukqFMVrXsA/viewform) for early access to the next version of Begin
