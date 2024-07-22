---
title: "Past Informs the Present: Our Approach to CSS"
image: "/_public/blog/post-assets/cole-css/ashley-west-edwards-usUA4BT_JiU-unsplash.jpg"
category: uncategorized
description: "In this article, we briefly recap some of the history and evolution of CSS. We then use that information to inform a focus on several methodologies — some battle tested, some more recent — for making the process of styling web apps and components both enjoyable and effective."
author: "Cole Peters"
avatar: "cole.jpg"
mastodon: "@colepeters@mastodon.online"
published: "January 10, 2023"
---

![Photograph of four small paint samples, in green, blue, pink, and magenta, against a flat off white background](/_public/blog/post-assets/cole-css/ashley-west-edwards-usUA4BT_JiU-unsplash.jpg)
<small>Photo by <a href='https://unsplash.com/photos/usUA4BT_JiU'>Ashley West Edwards on Unsplash</a></small>

CSS occupies an interesting position among web technologies: while it can appear almost quaint in its simplicity, it’s also been interpreted by some as the most vexing language in web development. Despite its approachability, CSS sometimes gets a bad rap — one that I believe derives from a fundamental misunderstanding of CSS’ history, evolution, and function as an API for styling on the web.

In this article, we’re going to review some of that history and evolution. We’ll then use that information to inform a focus on several methodologies — some battle tested, some more recent — for making the process of styling web apps and components both enjoyable and effective.

## The origins of CSS

In order to gain a deep understanding of CSS, it’s important to first understand the ecosystem from which it emerged: that is, the early days of the World Wide Web. Getting familiar with this context is essential to understanding why CSS works the way it does — and also provides some insight into just how far it has come since its inception.

In contrast to the dynamic and interactive nature of the Web of today, the Web started out as a comparatively simple medium: that is, one for publishing documents. This intent was clearly stated on [the first ever website, authored by Tim Berners-Lee](http://info.cern.ch/hypertext/WWW/TheProject.html):

> The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents.

This first website was launched on August 6, 1991, but the world would have to wait until December of 1996 for [the official arrival of CSS](https://www.w3.org/Press/CSS1-REC-PR.html), at the hands of Håkon Wium Lie and Bert Bos. At the risk of oversimplifying things, at its highest level, this first draft of CSS could be reduced to three fundamental tenets:

1. CSS is a language for authoring style sheets for HTML documents.
1. CSS encourages the independence of markup from style sheets, thereby preserving content fidelity and structure, while allowing for the application of reusable styles.
1. CSS’ style sheets _cascade_ — that is, styling rules declared by the user agent may be overruled by styles declared by the document author, which themselves may be overruled by the end user.

This third tenet — the cascading nature of CSS — was a source of great debate at the time, and traces of this debate even carry on amongst web practitioners today. And yet, CSS’ cascade is perhaps one of its most defining attributes: it underscores the web as a medium where content and its presentation is informed not only by browser makers, but also by content authors, end users, and those users’ devices and their capabilities. Even from the Web’s earliest days as a platform for static documents, CSS was, in its own way, declaring in no uncertain terms that the presentation of content on the Web must be approached not dictatorially, but democratically — or, to use a more modern and technical term: responsively.

The second tenet, referencing CSS’ global scope and its independence from HTML, will of course be a familiar topic to anyone who has touched frontend development over the past two decades. We’ll get deeper into this later in the article.

The first tenet I’ve proposed above, however, is perhaps the most impactful, yet also the easiest to overlook. In fact, I believe the nature of this principle is one that a great many web developers to this day tend to forget (or never learn in the first place), and this in turn has become a source of some of the deepest struggles in frontend web development over the years.

And so, let us spell it out clearly: **CSS, as game changing as it was, was not created as an application or component styling API** — it was designed as a means of styling static documents, authored in HTML. Documents and applications (and components), however, present drastically different contexts for design. The nature of the standardized Web, meanwhile, as one of (perhaps the most) [backwards compatible](https://www.w3.org/People/Bos/DesignGuide/compatibility.html#:~:text=The%20Web%20itself%20is%20designed,of%20files%2C%20not%20just%20HTML.) software platforms, has in turn meant that CSS’ origin story was always going to be inescapable. Unlike so many technology stacks of today, turning CSS into an application styling API would never be a matter of simply shipping a breaking change and letting end users deal with the fallout. As the web matured into a platform not just for documents, but rather one for the multidirectional flow of _information_, CSS as its UI layer would have to evolve gradually along with it.

This, then, establishes what I consider the _grain_ of CSS — a grain that many web developers continue to struggle with.

## With and against the grain

![Photograph of a tree with deeply ridged bark in a forest in Sequoia National Park, United States](/_public/blog/post-assets/cole-css/lucas-davies-zL4o0NkEURY-unsplash.jpg)
<small>Photo by <a href='https://unsplash.com/photos/zL4o0NkEURY'>Lucas Davies on Unsplash</a></small>

With the transition away from documents and toward applications and components, web developers began devising methodologies to execute increasingly complex user interfaces with a styling API that was still heavily targeted towards static documents. Some of these methodologies were successful — even essential — in pushing both CSS and styling on the web more broadly into the future; others were less so. In my experience, the most important developments in CSS methodologies were those that were designed with the grain of CSS in mind; the least successful candidates, meanwhile, tended to push quite hard against it.

Perhaps the most important CSS methodology to emerge during the web’s transition towards application-like websites was [Object Oriented CSS (OOCSS)](https://github.com/stubbornella/oocss/wiki), devised by [Nicole Sullivan](http://www.stubbornella.org/content/) in 2009. Nicole’s now legendary article, [‘The Media Object Saves Hundreds of Lines of Code’](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/), represented a fundamental rethinking on the composition of [CSS rulesets](https://css-tricks.com/css-ruleset-terminology/) and their relationship to HTML content. Instead of writing CSS styles around specific HTML content or basing styles on the location of content within the DOM, OOCSS prioritized writing reusable styling rules based on design patterns (in the case of the media object: ‘a fixed size media element (e.g. image or video) along with other variable size content (e.g. text)’). As perhaps the first instance of a CSS methodology systematically informed by a visual pattern language, OOCSS was also a critical step towards a more modular, reusable approach to writing CSS.

As style sheets became the responsibility of larger and larger teams, CSS’ global scope and [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#:~:text=Specificity%20is%20an%20algorithm%20that,(or%20pseudo%2Delement)) were often at odds with team dynamics. Style collisions became increasingly common, where changes introduced by one developer would inadvertently affect styles elsewhere on the website. As the old joke goes: two CSS properties walk into a bar; a bar stool in a completely different bar falls over. As these issues and the number of people experiencing them multiplied, so too did new CSS methodologies, particularly those focused on style sheet architectures. Before long, we had [SMACSS](http://smacss.com/), [SUIT CSS](https://suitcss.github.io/), [BEM](https://getbem.com/), [ITCSS](https://www.youtube.com/watch?v=1OKZOV-iLj4), and more. Third party supersets of CSS also appeared during this time, such as [Sass](https://sass-lang.com/) and [LESS](https://lesscss.org/), which gave style sheet authors access to scripting features like variables and loops.

The extent to which CSS supersets benefitted or hindered the progress of styling on the web is debatable. Sass, for example, should be credited for introducing variables to CSS, which in turn inspired CSS’ own [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (which improved upon Sass’ implementation in several ways). In the same breath, however, I personally believe techniques such as nesting, mixins, loops, and extends, introduced by Sass and LESS, were less beneficial. These techniques resulted in excessively bloated and complex CSS being shipped to the browser. To add insult to injury, due to inherent differences between authored code and generated code, CSS written in these supersets became much harder to debug (a task which, due to increases in complexity, became increasingly necessary).

Similarly, and despite the best of intentions, some CSS methodologies could be considered more beneficial than others. For example, let’s take the ruleset format proposed by the likes of BEM, where classes are constructed with multifaceted declaration blocks bound to context aware class names. The ‘context aware’ part here is important — BEM’s [‘Block, Element, Modifier’ construct](https://getbem.com/naming/) declares that classes should be named based on a hierarchy derived from both markup and state. This strategy introduces a dependency between the structure of a page’s markup and its styles, a strategy CSS itself had attempted to avoid.

BEM is not the only methodology to use this kind of ruleset format — many other methodologies rely on markup context (or content context) to inform the construction of classes. Herein lies the problem, though: while this approach could be said to encourage pleasant developer ergonomics, the results are inherently brittle (due to the tight coupling between markup and styles). On top of that, the prioritization of selector nomenclature above the actual styles being applied to those selectors often results in style sheets that are bloated with repeating property declarations — see for example these styles from the Financial Times’ website:

```css
.o-ads--label-left .o-ads__inner:before {
  content: "▼ Advertisement ▼";
  display: block;
  font-size: 14px;
  text-align: "left";
}
.o-ads--label-right .o-ads__inner:before {
  content: "▼ Advertisement ▼";
  display: block;
  font-size: 14px;
  text-align: "right";
}
.o-ads--label-center .o-ads__inner:before {
  content: "▼ Advertisement ▼";
  display: block;
  font-size: 14px;
  text-align: "center";
}
.o-ads--label-with-borders {
  font-size: 14px;
  text-align: "left";
}
```

In these ways and others, many of the aforementioned methodologies could be said to work against the grain of CSS, despite their intent to make styling easier and more robust. As such, the process of writing and maintaining CSS in the mid 2010s had become increasingly complex; but it also set the stage for a radical rethinking, and a move towards simpler, more efficient, and more resilient methods of styling content on the web.

## The atomization of CSS

![Image of a swirling sphere-like shape made up of individual blue particles](/_public/blog/post-assets/cole-css/pawel-czerwinski-n6_MK8-xMP4-unsplash.jpg)
<small>Image by <a href='https://unsplash.com/photos/n6_MK8-xMP4'>Pawel Czerwinski on Unsplash</a></small>

For many years, the semantic nature of HTML led many to proclaim that CSS should also be written ‘semantically’. However, this tight coupling between HTML semantics and CSS selectors, despite being recommended even by the W3C as a best practice, does not have a basis in reality. [Content semantics in HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) are expressed through the use of meaningful elements like `h1`, `nav`, `footer`, `ul`, etc., and the way in which these elements are structured to create a document tree. CSS, meanwhile — being a _presentational language_ — has no notion of content semantics; there is no way for a machine to glean information about HTML content from a style sheet. Nicolas Gallagher, in [an article I still consider to be of foundational importance](https://nicolasgallagher.com/about-html-semantics-front-end-architecture/), spelled this out quite clearly in 2012:

> The primary purpose of a class name is to be a hook for CSS and JavaScript. If you don’t need to add presentation and behavior to your web documents, then you probably don’t need classes in your HTML.

In the absence of a mandate to describe particular nodes of content or [ontological](http://web.dfc.unibo.it/buzzetti/IUcorso2007-08/mdidattici/ontology-definition-2007.htm#:~:text=In%20computer%20and%20information%20science,some%20domain%2C%20real%20or%20imagined.) relationships between them, CSS authors were free to consider other approaches to authoring CSS — and by the early 2010s, many were doing just that. The first article I recall reading that suggested a fundamental shift was underway was one written in 2013 by Thierry Koblentz, appropriately entitled [‘Challenging CSS Best Practices’](https://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/). At the heart of Koblentz’s article was a well-argued overview of how so-called ‘best practices’ in CSS at the time often lead to multiple rewrites of both CSS and HTML whenever UI requirements change (that hardly ever happens, right?), leading to ever-growing, [‘append only’ style sheets](https://css-tricks.com/oh-no-stylesheet-grows-grows-grows-append-stylesheet-problem/) that become more brittle over time. His proposal, worked out in practice during his time at Yahoo!, was simple but nigh on heretical to many at the time:

> The smaller the unit [in a larger system], the more reusable it is. To break down styles into irreducible units, we can map classes to a single style, rather than many. This will result in a more granular palette of rules, which in turn improves reusability.

This Lego-like approach to CSS can arguably be traced back to Nicole Sullivan’s OOCSS (and, it could be argued, early ‘utility’ classes like [`.clearfix`](https://css-tricks.com/clearfix-a-lesson-in-web-development-evolution/)), but what Koblentz and others were proposing — generally referred to as ‘atomic CSS’ — took this approach to the logical extreme.

To illustrate the drastic difference in approaches, consider the following two implementations of the media object (for simplicity, implemented with flexbox):

<figure>

  ```html
  <!-- ‘Best practices’ media object -->
  <style>
    .media {
      display: flex;
    }

    .media-img {
      flex-shrink: 0;
      padding-right: 8px;
      width: 128px;
      height: 128px;
    }

    .media-content {
      flex-grow: 1;
    }
  </style>
  <div class='media'>
    <img class='media-img' src='…' alt='…' />
    <div class='media-content'>
      Here’s a traditional media object.
    </div>
  </div>

  <!-- ‘Atomic’ media object -->
  <style>
    .flex { display: flex; }
    .flex-shrink0 { flex-shrink: 0; }
    .flex-grow1 { flex-grow: 1; }
    .padding-right2: { padding-right: 8px; }
    .width6 { width: 128px; }
    .height6 { height: 128px; }
  </style>
  <div class='flex'>
    <img class='flex-shrink0 padding-right2 width6 height6' src='…' alt='…' />
    <div class='flex-grow1'>
      Here’s an atomic media object.
    </div>
  </div>
  ```

  <figcaption>

  Note how each class in the atomic version maps to just a single CSS property and value. In fact, if I hadn’t included the second `<style>` block, I bet you’d have had no problem determining each class’ effect from the markup alone! This is a hallmark of atomic CSS — the effect of a class is typically self evident from its name alone, whereas the specifics of a class name like `media` are more ambiguous.

  </figcaption>

</figure>


For anyone familiar with atomic CSS today, the example above will likely appear unremarkable. The transition towards this approach was anything but, however — and on some corners of the web today, debate still rages about whether atomic CSS has been the best or worst thing to happen to styling on the web since CSS.

There was, however, clearly an appetite for this approach amongst a non-trivial swath of web developers: the year 2014 saw the release of both Adam Morse’s [Tachyons](https://tachyons.io/) and Brent Jackson’s [Basscss](https://basscss.com/), the first two frameworks to go all-in on atomic CSS. These frameworks were instrumental in writing the blueprints for the atomic CSS methodology and turning the status quo on its head — and indeed, the shift was so monumental that, within a number of years, ‘utility-first’ CSS frameworks started becoming [multimillion dollar businesses](https://adamwathan.me/tailwindcss-from-side-project-byproduct-to-multi-mullion-dollar-business/).

The atomization of CSS had officially begun.

## Atomic CSS: successes and perceived failures

In order to understand the success of atomic CSS (even if that success remains a point of debate in some circles), we should first examine its principles, and the goals those principles seek to achieve. Many of these principles are derived from [functional programming](https://en.wikipedia.org/wiki/Functional_programming), hence the alternative name ‘functional CSS’. Additional inspiration came from [the Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy).

The most fundamental principles of atomic CSS are:

<dl class='pl2'>

  <dt>Classes should have a single purpose.</dt>
  <dd class='mb0'>Classes should do one thing, and they should do it well. This makes each class more reusable. A class that applies a margin, and only a margin, is more reusable than a class that applies and margin and a text colour.</dd>

  <dt>A class’ effect should be self evident.</dt>
  <dd class='mb0'>There should be no mystery about the effect of using a class — clarity should always trump cleverness. The effect of a class named <code>flex</code> which sets the <code>display</code> property to <code>flex</code> is self evident. The effect of a class named <code>media</code> which may set any number of property values is ambiguous.</dd>

  <dt>Classes should be composable.</dt>
  <dd class='mb0'>Complex styles should be achieved by composing multiple single purpose classes together, rather than by writing new, complex, and less reusable classes.</dd>

  <dt>Classes should be immutable and free of side effects.<dt>
  <dd class='mb0'>For example, the <code>underline</code> class should only ever apply an underline style. It should never <em>not</em> apply the underline, or apply another style, or change any other property of any other element. Under no circumstances should it change the effect of another class.</dd>

</dl>

It’s important to note that these principles were not devised for their own sake — each plays an important role in authoring performant, maintainable, robust styles:

- Single purpose classes are more reusable and composable than multipurpose classes. Thus, single purpose classes provide **greater flexibility** as well as **reduced CSS file sizes**, both at the outset of new projects and throughout their lifecycle (as fewer styles need to be added to deliver iterations and additions to UI).
- Classes with singular, self evident effects **reduce cognitive overhead for developers**; the resultant styling systems are thus easier to learn, and this in turn helps frontend teams scale their efforts across people and time.
- Classes which are immutable and free of side effects result in **fewer bugs** — and where bugs occur, easier debugging and resolution follows.

In these ways and in others, I have always felt that the nature of atomic CSS flows very much with the grain of CSS itself. Remember that CSS was designed to be independent of markup, and atomic CSS is by design untethered to any particular markup structure or content based semantics. Atomic CSS also honors CSS’ specificity algorithm rather than attempting to game it — it does not concern itself with optimized selector ranking or scope, since every class is of single purpose and equal specificity. This also means [CSS’ inheritance model](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance) becomes an advantage as it was originally intended: compositions can be built up with inheritance in mind, over several layers of markup.

There are, however, many common objections raised against the atomic CSS methodology. In general, these tend to be:

<dl class='pl2'>
  <dt>’It’s not semantic.’</dt>
  <dd class='mb0'>We’ve touched on this already, but it’s worth repeating: semantics, accessibility, and clarity <em>do</em> matter, but with all due respect to <a href='https://www.zeldman.com/2017/01/03/kiss-my-classname/'>Zeldman</a>, there is nothing inherently unsemantic, inaccessible, or unclear about ‘visual class names’, nor is there a reason for CSS to map to the same semantics as HTML.</dd>

  <dt>‘This is inline styles all over again.’</dt>
  <dd class='mb0'>Nope. Inline styles are defined in HTML; atomic classes are defined in a style sheet. Inline styles do not permit media queries, pseudo elements, or pseudo classes; atomic classes do. Inline styles have a specificity ranking of 1-0-0-0, which can only be outranked by <code>!important</code>; atomic classes have a specificity of 0-0-1-0, the same as any single class. An inline style’s source of truth is its own singular invocation on a given element; an atomic class’ source of truth is a style sheet. There is a lexical resemblance between <code>class='red'</code> and <code>style='color: red'</code>; this is where the similarities end.

  <dt>‘Putting so many classes on my elements looks ugly/is hard to read.’</dt>
  <dd class='mb0'>Admittedly, <code>&lt;article class='font-sans text1-xl leading4 m-auto mt0 mb0 mt2-md mb2-md mt4-lg mb4-lg p0 p2-sm p4-md p5-lg p6-xl'/&gt;</code> doesn’t read like poetry (and yes, that snippet is taken from this very page as of this writing). However, something that <em>is</em> a delight is being able to rapidly iterate on this composition — from the logical origin of that composition (the markup), whether in the browser or my editor — to explore <a href='https://www.colepeters.dev/posts/an-introduction-to-constraint-based-design-systems'>different combinatorial spaces within the bounds of a design system</a>. Iterating in this fashion simply cannot be matched when using other methodologies.</dd>

  <dt>‘This is so not <a href='https://en.wikipedia.org/wiki/Don%27t_repeat_yourself'>DRY</a>.’</dt>
  <dd class='mb0'>It’s true, atomic CSS can lead to repeating <em>declarations</em> of various styling rules — but I vastly prefer repeating declarations to repeating <em>definitions</em> (which, in my experience, are much harder to maintain). Also, remember that every time you repeat a class name, that’s one more addition you didn’t have to make to your style sheet! Ultimately, this is a matter of choosing what kind of repetition you want, not one of avoiding repetition altogether.</dd>

  <dt>‘Atomic CSS is at odds with modern component modeling.’</dt>
  <dd class='mb0'><a href='https://reactjs.org/docs/thinking-in-react.html'>‘Thinking in React’</a> is one of those articles that changed the way I thought about web development when it was published, and there’s no denying that building frontends on the web has become a component centric process. However, it’s important to differentiate the process of <em>thinking</em> in components and the process of <em>styling</em> components. A conceptual abstraction does not require an equivalent material abstraction, and the fact of a component’s existence does not necessitate a dedicated CSS class.

  <dt>‘This still doesn’t solve the problem of global scope or one off styles.’</dt>
  <dd class='mb0'>It doesn’t, and in fact atomic CSS is not designed for this. For scoped or one off styles, a different approach is absolutely required.</dd>

</dl>

Atomic CSS can provide a fantastic foundation that covers the vast majority of styling needs for a given website and its constituent components, and it can deliver those styles in a fraction of the file size and complexity of other methodologies. To be clear, these claims are not theoretical: this has been my experience both as a contributor and leader of frontend teams over the past 8 years, and the same has been true for many others both within and outside of my professional circle. But as we’ve noted, atomic CSS doesn’t cover every use case: scoped and one off styles are not part of its wheelhouse. So what’s to be done when a need for these sorts of styles emerges?

## Going bespoke

![Photograph of a blacksmith working metal at a grinder.](/_public/blog/post-assets/cole-css/chris-ralston-AGhXDA_l8KI-unsplash.jpg)
<small>Photo by <a href='https://unsplash.com/photos/AGhXDA_l8KI'>Chris Ralston on Unsplash</a></small>

Where one off styles are needed, or where we want to ensure certain styles are scoped to a given component, additional measures beyond an atomic CSS methodology will be required. There are several techniques that can be used to address these concerns, with a few notable examples having become more popular in recent years:

<dl class='pl2'>
  <dt>CSS in JS</dt>
  <dd class='mb0'>The obvious contender in this list. I used CSS in JS for many years myself, and have to say the developer ergonomics are pretty impressive, as is the ability to leverage both repeatable and bespoke, scoped styles (especially when using libraries like <a href='https://styled-system.com/'>Styled System</a> or <a href='https://theme-ui.com/'>Theme UI</a>). Unfortunately, great developer ergonomics and scoping are not enough. CSS in JS can add significant weight to client side bundles, along with increased setup complexity (especially when server side rendering is involved). Some solutions can also lock you in to certain frontend frameworks, limiting the portability of your styles. There are some solutions emerging to address these concerns (e.g. <a href='https://vanilla-extract.style/'>Vanilla Extract</a>), but at the end of the day, I admit I’m growing tired of learning abstractions of CSS — there are so many more valuable things I could be doing with my time. This isn’t necessarily a popular opinion, but I think CSS is actually pretty amazing on its own, and the closer to the metal I can stay, the happier I am.</dd>

  <dt>CSS Modules</dt>
  <dd class='mb0'>The name may suggest that CSS Modules are part of the CSS spec, but this is not the case. CSS Modules allow authors to extract styles from a vanilla <code>.css</code> file and into a JavaScript file containing markup; at build time, these extracted styles are then regenerated as locally scoped styles wherever they are used. This seems to offer some of the benefits of CSS in JS, but without the ergonomics of colocating styles, content, and behavior within a given component.</dd>

  <dt>Shadow DOM</dt>
  <dd class='mb0'>Shadow DOM is a web standards specification which is designed to provide encapsulation of content, styles, and behavior — but it has a number of hard to swallow caveats. For one, Shadow DOM roots need to be initialized in JavaScript (though <a href='https://web.dev/declarative-shadow-dom/'>Declarative Shadow DOM</a> should address this in the future.) Further, <a href='https://lamplightdev.com/blog/2019/03/26/why-is-my-web-component-inheriting-styles/'>styling encapsulation doesn’t work quite like you think it does</a>, and this can cause some headaches. I believe the Shadow DOM holds promise, but for many use cases, it can end up being more trouble than it’s worth.</dd>
</dl>

Fortunately, a compelling solution for dealing with scoped and one off styles exists in the form of HTML custom elements, which are part of [the web components spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components) along with Shadow DOM and HTML templates. I may be biased, but I think the best way to work with custom elements right now is with [Enhance](https://enhance.dev/docs/) (though to be fair, I got a sneak peak at Enhance before joining Begin in 2022, and was just as enthusiastic at that time).

Using Enhance to author custom elements in the form of [Single File Components](https://enhance.dev/docs/learn/concepts/single-file-components) (SFCs) has a number of huge benefits:

1. Custom elements are expanded on the server, providing **great performance and an excellent baseline for progressive enhancement** on the client.
1. **Locally scoped, one off styles** can be authored simply by including a `<style>` block in your SFC. When your component is expanded on the server, these style blocks will be hoisted into the document head, with all of that style block’s selectors scoped to your custom element. This allows for one off styles to be encapsulated and scoped to the component they’re authored in, without needing to touch the Shadow DOM. Scoped styles written within an SFC are also a great place to leverage strategies like [intrinsic design](https://css-tricks.com/are-we-in-a-new-era-of-web-design-what-do-we-call-it/), which can happily coexist alongside a global, atomic class system.
1. If you don’t need to write client side behavior, **you never have to interface with JavaScript classes or the [Custom Elements Registry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry)**. This is particularly handy for engineers (or designers) who might excel at HTML and CSS but lack experience in JavaScript. Although SFCs are authored as JavaScript functions, the bulk of the authored code is written in HTML and CSS, as seen below:

<begin-code class="mb2">

```javascript
// my-button.mjs
export default function MyButton({ html }) {
  return html`
    <style>
      /* One off styles applied only to button elements rendered by MyButton. */
      /* Any button outside this component will not be affected. */
      button {
        appearance: none;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
    </style>
    <!-- Atomic classes used for repeating styles -->
    <button class='p1 radius-pill cursor-pointer'>
      <slot></slot>
    </button>
  `
}

// index.html
<my-button>Click Me!</my-button>
```

</begin-code>

Of course, one need not use Enhance to gain the benefits of using custom elements. Being [a web platform standard](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements), you could author the above component and scoped styles without the use of Enhance — it would simply involve writing more boilerplate (although server rendering would be harder to implement from scratch). My personal experience, however, is that the current implementation of custom elements (and web components as a whole) leaves a fair bit to be desired, influenced as it is by the JavaScript framework wars of years past. Perhaps one day we’ll have a more HTML centric spec for web components (as hinted at by specs like Declarative Shadow DOM), but for now, I find the abstractions provided by Enhance to be incredibly useful and pleasant to use.

Enhance also comes with [an atomic CSS system out of the box](https://enhance.dev/docs/learn/concepts/styling/utility-classes), which can be easily customized to integrate with design systems or brand guidelines. Enhance thus presents an end to end styling solution that offers all the benefits of atomic CSS as well as the power to easily create one off, locally scoped styles on a per component basis. (You may have also realized that, since SFC styles are authored within a JavaScript file, those style blocks can also take advantage of some CSS in JS niceties — such as leveraging JS variables or functions — without authors having to worry about client side performance. While I’ve yet to find much of a need for this, the possibility is there.)

## Summing up

We’ve covered a lot of ground in this article — some of it historical, some of it subjective. Although I’ve used a lot of words to describe the benefits that I and many others have encountered with atomic CSS in comparison to other methodologies, I do want to assert that, as with so much on the web, your mileage may vary. Technical methodologies of all kinds inherently attract certain folks and repel others, and [as Jeremy Keith has said](https://adactio.com/journal/18982), ‘this is about matching the right tool to the right mindset’ (though, with the deepest respect to Jeremy, I look forward to rebutting some other aspects of his article in the near future).

With that said, I’ve found that a great deal of misinformation has been shared over the years concerning atomic CSS, and I think this has helped to create a mindset that may have kept many web professionals from giving this methodology a fair shake. As a thorough foundation for styling — especially when configured to align with a team’s design system — atomic CSS is tough to beat in terms of its performance, flexibility, and robustness across scales of complexity and time. In combination with a tight strategy for dealing with one off or scoped styles (as with Enhance SFCs), atomic CSS can act as a powerful styling API for documents, applications, and components, which will serve individuals and teams (and thus end users) well for a long time to come.

## Further Reading

- [A Brief History of CSS Until 2016](https://www.w3.org/Style/CSS20/history.html)
- [What Are Classes For?](https://mrmrs.cc/writing/what-are-classes-for/)
- [CSS and Scalability](https://mrmrs.cc/writing/scalable-css)
- [Designing in the Browser Faster](https://jxnblk.com/blog/designing-in-the-browser-faster/)
- [On the Growing Popularity of Atomic CSS](https://css-tricks.com/growing-popularity-atomic-css/)
- [Let's Talk About Web Components](https://bradfrost.com/blog/post/lets-talk-about-web-components/?ck_subscriber_id=478716172)

