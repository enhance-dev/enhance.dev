---
title: A React Developers Guide to Writing Enhance Components
---

Frequently, we are asked by React developers why patterns they have learned while writing components using JSX do not translate to writing web components. In this doc, we'll describe some common gotchas that developers coming from React or other JavaScript frameworks may run into when writing plain vanilla web components.

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
const image = `<img src="${href}" alt="${altText}" />`;
```

</doc-code>


<doc-code filename="React">

```javascript
const image = <img src={href} alt={altText} />
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

For a more verbose description the different between Enhance and React components [read this post](https://begin.com/blog/posts/2024-03-08-a-react-developers-guide-to-writing-enhance-components).
