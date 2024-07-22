---
title: "Web Component Therapy"
image: "/_public/blog/post-assets/therapy.jpg"
image_alt: "measuring tap"
photographer: "Nik Shuliahin"
photographer_url: "https://unsplash.com/@tjump?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
category: enhance, light DOM, shadow DOM
description: "In two recent episodes of the ShopTalk podcast, Dave Rupert and Chris Coyier talked about Web Component Therapy. Chris and Dave have a few concerns about web components that require therapy. I’ve decided to put those concerns on the couch to see if we can talk through some solutions to these issues."
author: 'Simon MacDonald'
avatar: 'simon.png'
mastodon: "@macdonst@mastodon.online"
published: "December 13, 2023"
---

In two [recent](https://shoptalkshow.com/592/) [episodes](https://shoptalkshow.com/593/) of the [ShopTalk podcast](https://shoptalkshow.com/), [Dave Rupert](https://mastodon.social/@davatron5000) and [Chris Coyier](https://front-end.social/@chriscoyier) talked about Web Component Therapy.

> **Dave:** Web component therapy.
>
> **Chris:** [Laughter] One of them is that we had... We've talked about Web components forever, and I think it's pretty good. But Light DOM Web components are having a moment.

We couldn’t agree more. Light DOM web components are certainly having a moment. Besides our post, [Head Toward the Light DOM](https://begin.com/blog/posts/2023-11-10-head-toward-the-light-dom), many other folks seem to be coming to the same conclusion:

* [Why Web Components](https://buttondown.email/cascade/archive/005-why-web-components/), by Robin Rendle
* [Blinded By the Light DOM](https://meyerweb.com/eric/thoughts/2023/11/01/blinded-by-the-light-dom/), by Eric Meyer
* [HTML web components](https://adactio.com/journal/20618), by Jeremy Keith
* [HTML Web Components ](https://blog.jim-nielsen.com/2023/html-web-components/)(again), by Jim Nielsen
* ["Shadow dom is not a good default"](https://buttondown.email/cascade/archive/006-shadow-dom-is-not-a-good-default/), by Robin Rendle
* [HTML Web Components: An Example](https://blog.jim-nielsen.com/2023/html-web-components-an-example/), by Jim Nielsen
* [Step into the light (DOM)](https://aaadaaam.com/notes/step-into-the-light-dom/) by Adam Stoddard
* [Using Web Components on My Icon Galleries Websites](https://blog.jim-nielsen.com/2023/web-components-icon-galleries/) by Jim Nielsen
* [Light-DOM-Only Web Components](https://frontendmasters.com/blog/light-dom-only/) are Sweet by Chris Coyier

Chris and Dave have a few concerns about web components that require therapy. I’ve decided to put those concerns on the couch to see if we can talk through some solutions to these issues.


## Style Scoping

> **Chris:** Whatever HTML you want to put in there, and then you could drop some CSS in there, and it's not going to bleed outside of the Web component. I'm so unconvinced that I even care about that anymore. Of course, I like style scoping, but we have scope in CSS now. It's just not that hard of a problem to solve that I don't want to use the hammer of the Shadow DOM to do that. But also, I can use stuff like a button element inside of it and not worry that styles from the outside are going to affect that element, too. I kind of get that part of it.

The shadow DOM has been touted as THE way of doing style encapsulation. While the shadow DOM is a valid way of doing style encapsulation, it certainly isn’t the only way. In Enhance components, we automatically prepend your custom element’s tag name to its CSS rules so they only apply to your components. The simplest thing that could possibly work tends to be the best place to start which is why that’s the default for Enhance.

However, our way is not the only way. New CSS capabilities like `@layer` (supported in all evergreen browsers)  and `@scope` (not yet supported by FireFox or Safari) give you ways of encapsulating styles. Plus, there are methodologies like [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/), [BEM](https://getbem.com/), and [SMACSS](https://smacss.com/) folks have used for years to provide encapsulation.


## Progressive Enhancement

> **Chris:** If your idea is, "I want to put as little in there as possible," which I think you could be in that headspace. You can be like, "The point of me making this component is abstraction. I don't want to have any responsibility for what goes inside there because that's what the JavaScript should be doing." I think that's a reasonable thought but maybe one that can't last because it's not progressive enhanced at all.
>
> **Dave:** Mm-hmm.
>
> **Chris:** If the JavaScript doesn't run, you get nothing at all then.
>
> **Dave:** Right.

What I think Chris and Dave are talking about here is writing your web components in such a way that they can be progressively enhanced. The terminology for these progressively enhanced web components seems to be coalescing around the term "HTML Web Components".

Take for instance, a button component that deletes a todo item that you would typically see in a JavaScript framework like React:

```html
<DeleteTodo onClick={() => deleteTodo()}>
  Delete
</DeleteTodo>
```

This component will work perfectly fine in a React application, but if anything goes wrong with your application's JavaScript, this button becomes useless.

Now, let’s look at a web component built using the same thinking:

```html
<delete-todo>
  Delete
</delete-todo>
```

The component structure looks familiar to what we’ve seen in the React example. The main difference is we are no longer passing in a function to be called on click. Since web components are HTML elements, they only support attribute string values. This means we need to add our `deleteTodo()` handler inside of the `class` that defines our web component — but once again, if anything goes wrong with your application’s JavaScript this button will become useless.

Let’s tweak our thinking towards HTML Web Components:

```html
<delete-todo key="item0" action="/removetodo">
  <form method="post" action="/removetodo">
    <button>
      Delete
    </button>
    <input type="hidden" value="item0"/>
  </form>
</delete-todo>
```

Here, we are writing our web component in a declarative way such that if JavaScript fails, then we revert to good old form submit. However, if your JavaScript is loaded correctly, your button component is enhanced by adding the click event listener in the `class` that defines your button.

*"But Simon,"* you say, *"I don’t want to add that much markup in all of my buttons. That’s what the shadow DOM is good at."* While true, you don’t need shadow DOM in order to get the same level of developer experience you would with the previous examples. With Enhance components, we use server-side rendering to cut down on the amount of markup you need to write. Your component could be implemented as follows:

```javascript
export default function MyButton({ html, state }) {
  const { attrs, store={} } = state
  const { key, action } = attrs

  return html`
      <form method="post" action="${action}"">
        <button>
          <slot></slot>
        </button>
        <input type="hidden" value="${key}"/>
      </form>
  `
}
```

While developing, this allows you to only write:

```html
<delete-todo key="item0" action="/removetodo"></delete-todo>
```

…and the markup will arrive fully expanded on the client at runtime. Said another way, Enhance uniquely enables HTML "SSR" _without_ a build step or forcing authors to manually expand markup.

## Slotting

> **Chris:** I love the idea of slots. But in this hot week that we're talking about, everybody is so hot on Light DOM, which means, don't use Shadow DOM, which means you don't have to worry about all the styling problems and potentially reaching in with JavaScript problems and stuff. There's just been a little bit of love for the idea of not using the Shadow DOM.
>
> **Dave:** Mm-hmm. Mm-hmm. And I think I'm for it. I'm like, "Let's explore that world." I think, eventually, we'll come around, like the final answer will be, "Uh, slots are kind of cool," and so any of the extra Chrome you add should probably be Shadow. But I think just showing people that you can do most of the stuff in Light DOM and never deal with Shadow DOM is very attractive to people.

Chris and Dave bring up an interesting point here. Slots are cool and useful, but they require the Shadow DOM. So, are HTML Web Components left out in the cold? Well, yes and no.

Since we believe in paving the cow paths, Enhance’s web components support slots in both their [server-side](https://enhance.dev/docs/conventions/elements) and [client-side](https://enhance.dev/docs/conventions/components) variations. Slots are incredibly cool, and they should be supported in Light DOM web components, so we figured out a way to add slotting without the shadow DOM.

<iframe height="300" style="width: 100%;" scrolling="no" title="SuperSlider" src="https://codepen.io/macdonst/embed/MWLjpqK?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/macdonst/pen/MWLjpqK">
  SuperSlider</a> by Simon MacDonald (<a href="https://codepen.io/macdonst">@macdonst</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Conclusion

HTML Web components are certainly having a moment, but they are not without their limitations. With Enhance, we’ve attempted to address these limitations head-on, so [developers need not reach for the Shadow DOM](https://begin.com/blog/posts/2023-08-18-shadow-dom-not-by-default) until they absolutely need to add that complexity to their application.

## Next Steps

* Try out the new `@enhance/custom-element` and `@enhance/element` releases and share some components you’ve written with us.
* [Follow](https://fosstodon.org/@enhance_dev) Axol, the Enhance Mascot on Mastodon…
* Join the [Enhance Discord](https://enhance.dev/discord) and share what you’ve built, or ask for help.
