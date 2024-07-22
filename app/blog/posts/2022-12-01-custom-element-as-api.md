---
title: "HTML Custom Element as a Feature API"
image: "/_public/blog/post-assets/my-charts-css.png"
category: uncategorized
description: "Utilize a custom element definition as a friendlier interface for app features leveraging external front-end libraries."
author: "Taylor Beseda"
avatar: "tbeseda.jpg"
mastodon: "@tbeseda@indieweb.social"
published: "December 1, 2022"
---

Say you've found a helpful front-end library you'd like to use for a feature in your web app, but you aren't thrilled with the interface.
It requires an awkward data structure or tedious markup.
Let's use an [Enhance](https://enhance.dev) [custom element definition](https://enhance.dev/docs/learn/starter-project/elements) to use as an adapter.

## JavaScript-less Charts with [charts.css](http://chartscss.org/)

For this guide, I'll make use of a slick library called “[charts.css](http://chartscss.org/)” — it's a pure CSS way to turn tabular data into really nice charts.

Let's start with the end in mind. Here's the result we'd like to target using just HTML + charts.css:

<!-- CodePen Start -->
<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dyKdaLm" data-user="tbeseda" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/tbeseda/pen/dyKdaLm">
  Simple charts.css demo</a> by tbeseda (<a href="https://codepen.io/tbeseda">@tbeseda</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
<!-- /CodePen End -->

Be sure to scroll through the HTML code here.
That's a lot of markup! And a lot of repetition.
But thankfully, it's just a standard HTML `<table>` with a few special classes and some CSS variable declarations mixed inline.

## Data structure

Our 2016 Olympics medal data isn't likely in an HTML-ready format, so let's assume it comes from a database or API as an array of objects.
We can return that set from our [Enhance API route](https://enhance.dev/docs/learn/starter-project/api):

```javascript
export function get(req) {
  const medals = [
    {
      label: 'USA',
      values: [46, 37, 38],
    },
    {
      label: 'GBR',
      values: [27, 23, 17],
    },
    {
      label: 'CHN',
      values: [26, 18, 26],
    },
  ]

  return { json: { medals } }
}
```

## Implementation

Again, we'll start with the goal in mind and author the desired code we want to write for the above chart (CodePen example):

```html
<my-chart
  data-key="medals"
  type="bar"
  heading="2016 Summer Olympics Medal Table"
  value-key="Country"
  value-names="Gold,Silver,Bronze"
  multiple
  show-labels>
</my-chart>
```

Super simple interface and even follows charts.css conventions without all the markup.
Here is the Enhance element definition where I've implemented the above interface:

```javascript
export default function MyChart({ html, state }) {
  const { attrs, store } = state

  const config = {
    dataKey: attrs['data-key'],
    type: attrs.type || 'bar',
    heading: attrs.heading || null,
    valueKey: attrs['value-key'],
    valueNames: attrs['value-names']?.split(',') || [],
    multiple: typeof attrs.multiple === 'string',
    showLabels: typeof attrs['show-labels'] === 'string',
  }

  const data = store.chartData[config.dataKey]
  const allClasses = [
    'charts-css',
    config.type,
    config.multiple ? 'multiple' : null,
    config.showLabels ? 'show-labels' : null,
  ]

  return html`
    <table class="${allClasses.join(' ')}">
      <caption>${config.heading}</caption>
      <thead>
        <tr>
          <th scope="col">${config.valueKey}</th>
          ${config.valueNames.map(v =>
            `<th scope="col">${v}</th>`
          ).join('\n')}
        </tr>
      </thead>
      <tbody>
        ${data.map(d => `
          <tr>
            <th scope="row"> ${d.label} </th>
            ${d.values.map((v, i) => {
              const style = [
                `--start: calc(${v}/100);`,
                `--size: calc(${v}/100);`,
                d.colors?.at(i) ? `--color: ${d.colors.at(i)}` : null,
              ]
              return `<td style="${style.join(' ')}">${v}</td>`
            }).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `
}
```

At its core, it's a function to loop over the `medals` data structure to generate `<tr>` elements for charts.css.
The applied classes are informed by the element attributes added to the `<my-chart>` element.

Whenever we use the `<my-chart>` element in our app, this definition will be used by Enhance to render our custom element.
Bonus: this custom element ships **zero** browser JavaScript!

Not only have we vastly improved the experience of creating new charts in our application, but we've centralized this adapter.
We can iterate on it over time when we want to add features or when the shape of the data inevitably changes.
