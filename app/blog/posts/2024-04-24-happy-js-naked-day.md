---
title: "Happy JS Naked Day"
image: '/_public/blog/post-assets/1st-birthday.jpg'
image_alt: "A chocolate cupcake with a happy birthday sign and a giant number one candle."
photographer: "Brett Garwood"
photographer_url: "https://unsplash.com/@brettgarwood?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
category: progressive enhancement
description: "We are excited to participate in the first annual JS Naked Day."
author: 'Simon MacDonald'
avatar: 'simon.png'
mastodon: "@macdonst@mastodon.online"
published: "April 24, 2024"
---

Here at Begin, we are proud advocates for progressive enhancement. So much so, we created the HTML-first web component framework [Enhance](https://enhance.dev/). When we heard about the first annual [JS Naked Day](https://js-naked-day.org/) it was a no–brainer for us to get on board. We always build our sites with HTML and CSS first, before adding on JavaScript to enhance the experience for end users. So we were confident that disabling JavaScript on our sites wouldn't impair users.

## js-naked-day Enhance Component

Since we want to set ourselves up for all future JS Naked Days, we wrote an Enhance component that we can use to wrap our `<script>` tags. When the component detects the page is being requested in the time frame of JS Naked Day, it skips rendering the `<script>` tags passed to it via slots. Otherwise, the script tags are added to the page as usual.

Here's the component in its entirety:

<begin-code filename="app/elements/js-naked-day.mjs">

```javascript
function isNakedDay () {
  const now = new Date()
  const year = now.getFullYear()
  const start = new Date(year, 3, 24, -14, 0, 0).getTime() / 1000
  const end = new Date(year, 3, 24, 36, 0, 0).getTime() / 1000
  const z = now.getTimezoneOffset() * 60
  const currentTime = now.getTime() / 1000 - z

  return currentTime >= start && currentTime <= end
}

export default function JSNakedDay ({ html }) {
  return html`
    ${isNakedDay() ? '' : '<slot></slot>'}
  `
}
```

</begin-code>

And here is how we use it:

<begin-code>

```html
<js-naked-day>
    <script type="module" src="/_public/components/code.mjs"></script>
</js-naked-day>
```

</begin-code>

Not everyone uses Enhance, but you can use the `isNakedDay` function on your own site to determine whether or not to include script tags.

# Next Steps

We encourage you to check out [JS Naked Day](https://js-naked-day.org/) and try surfing the web without JavaScript for a day. We are sure that it will be very enlightening.
