---
title: "Island Architecture with Web Components"
image: '/_public/blog/post-assets/islands.jpg'
image_alt: "Bay of Islands, New Zealand"
photographer: "Linde Lanjouw"
photographer_url: "https://unsplash.com/@artbylinde?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
category: enhance, web components, islands
description: "Learn about island architecture with web components and how it fits seamlessly with Enhance's philosophy."
author: 'Simon MacDonald'
avatar: 'simon.png'
mastodon: "@macdonst@mastodon.online"
published: "July 9, 2024"
---

Island Architecture is a concept first described by [Katie Sylor-Miller](https://front-end.social/@ksylor) and later expanded upon by [Jason Miller](https://mastodon.social/@developit) in his [post](https://jasonformat.com/islands-architecture/). Island Architecture, as described by Jason, involves server-rendering HTML and then injecting placeholders or slots around highly dynamic regions. These regions, or "islands," are initially rendered on the server and then upgraded to interactive components on the client side.

🤔 Does that sound like any framework you know?

By breaking down a web page into smaller, independently upgradeable units, Island Architecture achieves a balance between server-side rendering (SSR) and client-side interactivity. This method is akin to progressive enhancement but with a focus on maintaining a clear separation between static and dynamic content​.

Let’s use the page you are currently reading as an example.

![page structure](/_public/blog/post-assets/islands-page.png)

The majority of the page is static content but we have two islands of interactivity, the header and our “made with” component. Both are server side rendered with default content on the initial page load, then they are upgraded to interactive components when their script tag loads.

<deploy-docs-callout level="info">

**Note:** go ahead and turn off JavaScript in your browser. The page will continue to function.

</deploy-docs-callout>

## Benefits of Using Web Components in an Island Architecture

Web components are a perfect fit for Island Architecture due to their encapsulation, reusability, and ability to function independently. Here's how they enhance the architecture:

1. **Encapsulation and Reusability:** Web components allow developers to create custom HTML elements with their own styles and behaviors. This encapsulation ensures that each component can be developed, tested, and maintained independently, aligning perfectly with the principles of Island Architecture.
2. **Progressive Hydration:** Web components facilitate progressive hydration, where interactive elements are initialized over time based on their visibility and importance. This technique improves performance by ensuring that only the essential parts of the page are interactive immediately, reducing the initial load time.
3. **SEO and Accessibility:** By serving meaningful HTML from the server, Island Architecture ensures that the essential content is accessible to search engines and assistive technologies. Web components enhance this by allowing developers to build interactive elements without compromising the underlying HTML structure.
4. **Improved Performance:** Unlike SPAs that require a complete JavaScript bundle to be loaded and parsed before rendering the page, Island Architecture loads smaller JavaScript chunks corresponding to individual components. This leads to faster load times and a better user experience, especially on mobile devices​.

Modern JavaScript frameworks contain a lot of JavaScript. However, most web pages/applications fall somewhere between needing no JavaScript (for example: a docs site or blog) and sites that need a lot of JavaScript (like an interactive dashboard or social media site).

Can you imagine sending a modern JS framework over the wire just to create this page when there are only two components that require JavaScript?  I checked one major framework blog page and it included 1.4 MB of JavaScript. Contrast that with the 7 kb of JavaScript used on this page.

## Creating an Enhance Island

When building a web application with Enhance we default to using [elements](https://enhance.dev/docs/conventions/elements) as the reusable building blocks. Our elements are server side renderable out of the box, offering incredible performance and a seamless path for progressive enhancement.

However, when you are building islands of interactivity with Enhance, [components](https://enhance.dev/docs/conventions/components) are the solution you are looking for. They offer all the same benefits of elements as they are server side renderable but they also include client side JavaScript so you can add interactivity.

```javascript
import CustomElement from "@enhance/custom-element"

class MadeWith extends CustomElement {
 constructor() {
   super()
   this.getRandomItem = this.getRandomItem.bind(this)
   this.placeContainer = this.querySelector('.js-made-with-place')
   this.emojiContainer = this.querySelector('.js-made-with-emoji')
   this.swap = this.swap.bind(this)
   this.selectedVariant = null

   this.variants = [
     {
       place: 'Longmont, CO',
       emojis: [
       '&#127957;', // camping
       '&#129452;', // bison
       '&#127784;', // snow cloud
       ],
     },
     … // etc.
   ]
 }

 render({html}) {
   return html`
    Made with <span class="js-made-with-emoji">&#128150;</span>
    <span class="inline-block">in
      <span class='js-made-with-place'>California</span>
    </span>
   `
 }

 getRandomItem(array = []) {
   return array[Math.floor(Math.random() * array.length)]
 }

 async getNewVariant() {
   let selection = this.getRandomItem(this.variants)

   // avoid selecting the same variant twice in a row
   if (selection.place === this.selectedVariant?.place) {
     this.getNewVariant()
   } else {
     this.selectedVariant = selection
     return
   }
 }

 async swap() {
   await this.getNewVariant()
   this.placeContainer.innerHTML = this.selectedVariant.place
   this.emojiContainer.innerHTML = this.getRandomItem(
     this.selectedVariant.emojis
   )
 }

 connectedCallback() {
   this.interval = setInterval(this.swap, 2000)
 }

 disconnectedCallback() {
   window.cancelIterval(this.interval)
 }
}

customElements.define('made-with', MadeWith)
```

## Wrapping Up

Using frameworks like Enhance can simplify the implementation of Island Architecture with web components. Enhance’s approach involves rendering the entire page as static HTML at request time and then selectively hydrating only the necessary components on the client side. This method ensures that the critical content is always available instantly, and interactive parts are progressively enhanced as needed​.

In conclusion, combining web components with Island Architecture offers a powerful way to build modern web applications that are fast, scalable, and accessible. By focusing on rendering static content server-side and enhancing it with client-side interactivity, developers can achieve a seamless user experience without the drawbacks of traditional heavyweight JavaScript frameworks.

## Further Reading

If you are interested in learning how to communicate between different islands on your page, read our post on [Component Communication in Enhance](/blog/posts/2024-06-20-component-communication-in-enhance)
