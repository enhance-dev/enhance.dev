---
title: Translate React syntax to Enhance elements
---

We’re often asked by React developers why patterns they’ve learned while writing JSX don’t translate to writing web components. In this doc, we’ll describe some common gotchas that developers coming from React or other JavaScript frameworks may run into when writing plain vanilla web components.

## String Interpolation

<code-compare>

<doc-code filename="JavaScript">

```javascript
const element = `<h1>${title}</h1>`;
```

</doc-code>


<doc-code filename="React">

```javascript
const element = <h1>{title}</h1>;
```

</doc-code>

</code-compare>

## Attribute Quoting

<code-compare>

<doc-code filename="JavaScript">

```javascript
const image = `<img src="${href}" />`;
```

</doc-code>


<doc-code filename="React">

```javascript
const image = <img src={href} />
```

</doc-code>

</code-compare>

## Rendering Markup from Arrays

<code-compare>

<doc-code filename="JavaScript">

```javascript
const todoList = `<ul>
  ${todos.map((todo) => (
    `<li key="${todo.id}">${todo.text}</li>`
  ))}
</ul>`
```

</doc-code>


<doc-code filename="React">

```javascript
const todoList = <ul>
  {todos.map((todo) => (
    <li key={todo.id}>{todo.text}</li>
  ))}
</ul>
```

</doc-code>

</code-compare>

For a more in depth look at the differences between Enhance and React components, [read this post on the Begin blog](https://begin.com/blog/posts/2024-03-08-a-react-developers-guide-to-writing-enhance-components).
