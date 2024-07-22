---
title: "Redefining Developer Experience"
image: "/_public/blog/post-assets/cole-dev-ex/analogue-life-japanese-scissors.jpg"
image_alt: Three pairs of rustic looking Japanese scissors laying on a piece of light grey cloth
photographer: Analogue Life
photographer_url: https://www.analoguelife.com/en/products/tajika-household-scissors
category: uncategorized
description: "For years now, the most popular JS frameworks have carried out intense marketing initiatives based on the premise of improving developer experience (DX). What is it about these promises of great DX that is consistently delivering poor user experiences? Can we change our approach to DX for the betterment of end users?"
author: "Cole Peters"
avatar: "cole.jpg"
mastodon: "@colepeters@mastodon.online"
published: "February 28, 2023"
---

If recent activity is any indication, 2023 is looking like it could be a year of upheaval in the web development industry. For some, this upheaval may be welcome, and indeed a long time coming; for others, it may be more discomforting.

As [Simon previously mentioned](https://begin.com/blog/posts/2023-02-21-why-does-everyone-suddenly-hate-single-page-apps), Guillermo Rauch, CEO of Vercel, [recently tweeted](https://twitter.com/rauchg/status/1619492334961569792) that ‘SPAs were a zero interest rate phenomenon.’ Although criticism of the Single Page Application (SPA) architecture had been growing for quite some time before this, Guillermo’s tweet certainly amplified the debate. A number of articles were published shortly thereafter, responding to this tweet and more broadly the impact of modern JavaScript frameworks (and Guillermo’s own role in popularizing them). Among those articles were pieces from [Andy Bell](https://andy-bell.co.uk/speed-for-who/), [Alex Russell](https://infrequently.org/2023/02/the-market-for-lemons), and [Manuel Matuzović](https://www.matuzo.at/blog/2023/single-page-applications-criticism/).

This article is not an argument for or against SPAs per se. Instead, I want to focus on a theme running through these articles and the accompanying dialogue throughout the web development community — that is, the topic of developer experience (DX).

> I’ve always found the focus on developer experience as a framework feature uncomfortable. […] I personally think developer experience is one of the least important aspects.\
> —[Andy Bell](https://andy-bell.co.uk/speed-for-who/)
>
> Once the lemon sellers embed the data-light idea that improved “Developer Experience” (“DX”) leads to better user outcomes, improving “DX” became and end unto itself. […] As marketing goes, the “DX” bait-and-switch is brilliant, but the tech isn't delivering for anyone but developers.\
> —[Alex Russell](https://infrequently.org/2023/02/the-market-for-lemons)
>
> If I hear one more time about how developer experience is better and crickets for user experience I’ll implode\
> —[Karolina Szczur](https://bell.bz/@fox@front-end.social/109785750860828976)

For years now, the most popular JS frameworks have carried out intense marketing initiatives based on the premise of improving DX. On the surface, this doesn’t seem too contentious — developers are, after all, the consumers of these frameworks, and developers are the ones who will advocate for using one framework or another within their organizations. Why not prioritize the development and marketing of quality of life improvements for those developers?

As the quotes above describe, the problem is that this massive focus on DX has [measurably been to the detriment of user experience (UX)](https://infrequently.org/2022/12/performance-baseline-2023/). Frameworks promising next generation DX are almost invariably the same ones prone to delivering sub par UX, due largely to factors such as:

- [Ballooning JS bundle sizes](https://almanac.httparchive.org/en/2022/javascript), which require more of an end user’s time (and money) to be downloaded, parsed, and executed on the browser
- Reliance on JS being properly downloaded, parsed and executed on those browsers (which is [far from guaranteed](https://www.kryogenix.org/code/browser/everyonehasjs.html))
- [Build systems](https://jvns.ca/blog/2023/02/16/writing-javascript-without-a-build-system/) being a core feature of many of these frameworks (TypeScript and JSX, for example, cannot be run in the browser, so they must be transpiled to JS), thus creating a delta between authored code and executed code which can make debugging significantly more challenging
- Frequent breaking changes and shifting API surfaces, requiring developers to repeatedly relearn core aspects of these frameworks, which can also make an excellent breeding ground for bugs

This relationship between apparent improvements to DX and obvious degradations in UX begs the question: shouldn’t we just drop the focus on DX altogether?

Personally, I’d raise a different question — that is: what is it about these promises of great developer experience that is consistently delivering poor user experiences?

## What do we mean when we say ‘DX’?

While the definition of ‘developer experience’ could be debated, [Microsoft’s take](https://microsoft.github.io/code-with-engineering-playbook/developer-experience/) feels like a good summation that most could agree on:

> Developer experience refers to how easy or difficult it is for a developer to perform essential tasks needed to implement a change. A positive developer experience would mean these tasks are relatively easy for the team.

When we talk about DX, we’re generally referring to various measures that impact a software team’s ability to get things done with as little difficulty as possible. For a product to deliver good DX, it would typically need to be:

- easy to learn (to help teams get up to speed quickly)
- efficient (to enable tasks to be completed as quickly as possible)
- consistent (to prevent teams from wasting time relearning how to do their work)
- transparent (to allow bugs to be diagnosed and solved easily)
- resilient (to ensure what works today also works next year)

At the end of the day, the promise of good DX typically boils down to improved team velocity and a reduction of points of failure. This makes sense — software teams are often encouraged to work faster and to deliver more value and fewer bugs, in order to generate more business for their company in as short a time as possible.

But while ‘more business’ inherently requires end users to actually engage with the product or service being labored over, it’s hard to miss that end users are typically not represented within the goals of developer experience. This is not always the case — some frameworks like [Remix](https://remix.run/) and [Nuxt](https://nuxt.com/) do (as of this writing) allude to improvements to user experience in their marketing materials — but more frequently, good DX is simply presumed to cause a trickle down effect to the benefit of end users. [This is, unfortunately, not often the case](https://andy-bell.co.uk/speed-for-who/).

But even if good DX doesn’t inherently deliver good UX, surely it at least delivers on improving the quality of life and work of developers, right? Personally, I’m not sure this is often the case, either.

## Developer experience in practice

I’ve been working on the web professionally for the better part of 15 years — and for years before that as an amateur — and my work has primarily revolved around design and frontend engineering. At the risk of painting too pastoral a scene, my first years in frontend were almost blissfully simple compared to the status quo of today. My toolchain consisted of HTML (version 4), CSS (version 2), and a sprinkling of jQuery on those rare occasions when I could understand how to use it. Sometimes I’d bash out some half decent PHP if a client needed some help on their WordPress. Getting my code from my computer to the Web was a matter of dropping my HTML and CSS files from Finder onto an FTP client (after checking to make sure I wasn’t about to blow away the work of another developer, of course — version control was not something I’d yet encountered). What might be considered ‘developer experience’ at this point in my career mainly consisted of learning web platform fundamentals — largely from books, or from articles posted by generous and talented professionals in the industry. A simpler time, indeed.

Fast forward to 2022, when I was working as a lead frontend engineer at a technology startup. At this point in my career, I’d learned to wield several major versions of React with substantial expertise (starting with class components, then function components, then hooks…), along with the wider React ecosystem. React Router, Redux, Redux Select, Redux Saga, the Context API, XState, React Query, Styled Components, Styled System, Radix, React Spring, Framer Motion, React DND, DNDKit, Jest, Enzyme, React Testing Library, NextJS, and others were all under my belt, and in most cases my experience in using them tended toward the skilled end of the spectrum. And this was just to render and test UI!

Deeper under the hood, I was working with NPM, Babel and Webpack to manage packages and builds (having previously worked with tools like Bower, Grunt, and Gulp), and deployment providers like Heroku and Vercel. Of course, all of this was managed through GitHub version control, with some of the pipeline instrumented with GitHub Packages and Actions, and with everything running through ESLint and Prettier to catch formatting inconsistencies, opportunities for optimization, and potential bugs. Underlying all of this were my ongoing efforts to stay on top of developments in HTML, CSS, and JS/ES-What-Year-Is-This, including aspects like accessibility and performance, but also with respect to concepts like functional programming and frontend architecture in general. I was also trying to get familiar with the principles of technical leadership, as I was continuing to advance in my career.

When I decided to start looking for a new role later in the year, I realized I’d likely need to start picking up TypeScript to maintain my competitiveness as a candidate for frontend engineering roles, and I’d likely have to start picking up knowledge about other frameworks like Vue or Svelte, and the wider ecosystems and metaframeworks that go along with them. Oh, and along with these technologies, I was also constantly working to excel in my specialty as a design engineer — which meant staying on top of design trends and [gestalt principles](https://www.interaction-design.org/literature/topics/gestalt-principles), the rapidly shifting space of design systems, and the soft skills associated with being able to perform in these spaces.

At this point, let me assure you: I am not enumerating all of these areas of concern to impress you or to sell you on my expertise. The picture I’ve just painted you is the reality of ‘developer experience’ in the 2020s — at least as far as frontend engineering is concerned. ‘Developer experience’ means getting familiar with an increasingly expansive array of tools — all of which, frankly, change to some degree every single year. What’s hot today is not tomorrow, what worked one way yesterday is broken today. And every day, the expectation is that you accept this state of affairs, and keep the pedal to the metal (and maybe hit the turbo thruster while you’re at it). Your team’s velocity depends on it.

There was a time, probably somewhere between 2018 and 2021 where the amount of things I knew — indeed, _had_ to know in order to do my job at my level — filled me with pride and excitement. I even got to feeling a little cocky about the amount of framework minutia taking up space in my brain (which in retrospect might be a bit cringe worthy, but hey, we’re all works in progress). As 2022 came to a close and I began to reconsider my professional goals, however, the amount of things I _had_ to know started to feel less like an accomplishment and more like a burden. I began to realize that every hour I spent learning how React 18 was subtly but critically different from React 17 was an hour I’d have to spend again next year when React 19 inevitably landed (substitute ‘React’ for your JS tool of choice — the outcome will likely be the same or worse). At the end of the day, how much of this thrash was making me more effective at crafting supremely enjoyable user experiences?

Suffice it to say that Late 2022 Cole got pretty frustrated with the state of developer experience; I even considered transitioning entirely into a technical writing role at one point, just to get out of the constant cycle of relearning how to do my job as an engineer. (Thankfully, an offer from the crew at Begin saved me from the stress of a complete change of career, and also gave me the opportunity to get back to working with platform fundamentals!)

Of course, all of what I’ve just told you is anecdotal, and not all engineers will have the exact same ‘developer experience’. But based on the aforementioned blog posts published recently, I’m willing to bet that my experience isn’t terribly unique. If that’s true, this should be a huge red flag for our industry. Developer experience of this sort leads to a number of serious problems:

- Senior engineers are required to know an ever exploding number of technologies in order to carry out the most basic parts of their jobs.
- The vast number of things one needs to know to advance to a senior engineer position thus makes that progress harder to realize.
- This can in turn make for a more intimidating career path for earlier career engineers — or, alternatively, it can create the impression that professional seniority is simply about the number of things you know as opposed to the quality of work you can produce with a subset of those things.

Perhaps most problematic of all is the effect that contemporary developer experience has on educational programs (be they traditional classes, bootcamps, workshops, or anything in between). Such a rapidly expanding and ever changing technological ecosystem necessarily means that curricula struggle to keep up, and that the fundamentals of web development (e.g. HTML, CSS, HTTP, browser APIs…) are often glossed over in favor of getting students into the technologies more likely to land them jobs (like React and its many pals). This leads to an outpouring of early career developers who may speak confidently about things like React hooks or Redux state reducers, but who also lack any concept about the nature of HTML semantics or the most basic accessibility considerations. To be clear, I’m not throwing shade at those developers — they have been failed by an industry obsessed with the new and shiny at the expense of foundational practices and end user experiences.

And so, I ask: what exactly are we buying when we are sold ‘developer experience’ today? Who is benefiting from it? And if it is indeed something many of us aren’t too excited about (to put it kindly), how can we change it for the better?

## Realigning

In my opinion, simply dropping our industry’s focus on DX is not the solution here. [There were over 26 million web developers in the world as of 2021](https://slash.co/articles/people-behind-your-tech-how-many-developers-are-there-in-the-world/), and that number is expected to double by 2030. This is a massive industry of people who care about their experience with web technologies, and simply telling them to drop the focus on their quality of life for the sake of altruism isn’t likely to cut it.

Instead, I think we need to carefully consider what we mean when we talk about developer experience — and how what we say translates into what we do.

If I may risk verging on the idealistic, I would suggest that developer experience needs to pivot from a concept centered on feeling fast and living on the bleeding edge to one based on the enabling of developers to deliver reliable and first rate end user experiences — for as many users as possible, and for as long as possible. This doesn’t mean developers shouldn’t have great tools with which to carry out the crafting of great UX — but it does shift the narrative from one of ‘trickle down UX’ to something more honest, where the fruit of our labors is prioritized a little more above our labors themselves.

As discussed, developer experience today encompasses a nearly countless number of technologies that change and break both reliably and regularly, and which deliver poor user experiences rife with loading spinners, random bugs that are difficult to diagnose and fix, and interminable load times (especially for users not fortunate enough to be working with a rock solid connection to fiber based internet). But there are alternatives — alternatives focused first and foremost not on the new and shiny, but on the stable, enduring, and reliable.

### A brief tangent on scissors

Allow me a moment to construct a metaphor. Take a look at these scissors:

<blog-image src="/_public/blog/post-assets/cole-dev-ex/tajika-herb-clippers.jpg" alt="A pair of herb clippers by Tajika. Rustic looking appearance, two small hand forged blades are joined by an elongated U shaped piece of steel."></blog-image>

These scissors may look ancient, but in fact they are herb clippers, crafted today by Tajika Haruo Ironworks in Oto city, Japan. The father and son duo of Takeo and Daisuke Tajika forge these clippers by hand, transforming raw steel into precise configurations. These herb clippers in particular are intended for the kind of work where ordinary scissors would lack the required measure of precision: the delicate trimming of herbs in the garden or kitchen, or the creation of exquisite floral arrangements. Because of their design, the user need only apply a small amount of pressure to make a perfect cut, and the extreme sharpness of the blades means that the plants from which cuttings are made will be able to heal with the least amount of effort (just as in human tissue, where an incision from a scalpel is easier to heal than, say, the sort of rough abrasion caused by accidentally running one’s hand into cheese grater — don’t ask me how I know).

In short, these herb clippers are designed to do one thing, and they do it extremely well; indeed, they have done so for centuries since their design was first introduced. Secondarily to this, they are also exquisitely beautiful; the simplicity of their purpose is born out in their rustic, utilitarian design. No bells or whistles, nothing unnecessary, just a pair of perfectly edged blades joined together by a simple spring mechanism.

Now consider these ‘scissors’:

<blog-image src="/_public/blog/post-assets/cole-dev-ex/swiss-army-knife.jpg" alt="A Swiss Army Knife, with its can opener, knives, scissors, screwdriver, and other assorted tools exposed."></blog-image>

Ah, the venerable Swiss Army Knife. A pair of herb clippers this is not. The Swiss Army Knife takes the opposite approach of the Tajikas. This is a tool designed to maximize functionality — a tool for heading out into the great unknown, for tackling emergencies and tasks you may not be able to anticipate. With this one piece of equipment, you could accomplish any number of tasks, from fastening a screw, opening a can or bottle, chopping small vegetables, preparing a fish for cooking, whittling a piece of wood, and, yes, cutting up materials with the scissors. I wouldn’t expect to be able to do any of these tasks particularly _well_ (nor would I trim herbs or flowers with those scissors if another option was available), but that’s never been the point of the Swiss Army Knife; the point has always been to be prepared to deal with a variety of tasks with a modicum of success. It’s a tool for survival, not fine craft.

Contemporary developer experience, to me, feels very much like we’ve been building websites with the code equivalent of Swiss Army Knives. We’ve erected Swiss Army Knife schools, and venerated the ability to jump fluidly from the knife to the scissor to the can opener to the corkscrew, celebrating our speed with the screwdriver even as we ignore the fact that the screws we’ve installed all have stripped heads, and that the plants we’ve made cuttings from all bear unattractive scars that have prevented those same plants from putting energy into new growth. Meanwhile, the thought of going back to using older, more focused tools — like the herb clippers — seems unfathomable. Why return to such an outdated, limited tool when we have the Swiss Army Knife?

It’s understandable that those of us who may have invested many years of practice with Swiss Army Knives (okay, JS mega stacks) would be reticent to leave them behind — they’re familiar, they’re comfortable, even if we recognize their shortcomings, and after all, we spent all that time honing our skills with them. But I think it’s also a very worthwhile practice to consider whether _the experience_ of using these tools is really something we’re enjoying (and if these tools are even right for the job), and more importantly, whether that experience is leading to positive outcomes for those using what we make.

But herein lies an opportunity to refocus ourselves, our tools, and our craft. Why would we abandon the Swiss Army Knife? Because it’s not the right tool for the job — it’s not really that enjoyable to use, its many tools don’t even work that well, and the work we make with them isn’t of the caliber it deserves to be for those making use of it.

If we want to achieve perfect trimming of herbs and delicate plants, we can choose to get comfortable with those herb clippers. If we want to prepare a meal, we can seek out a single good kitchen knife (please ditch those knife block sets, they’re horrible and a waste of money). And if we want to create lasting, reliable, excellent user experiences? Well, I know of a tool for that too. It’s been around for awhile, and it might appear a little bit primitive to some at first glance, but it’s actually quite effective — and it happens to come with a pretty great developer experience, too.

## The web platform as developer experience

To restate my proposition, I believe ‘good developer experience’ needs to be re-imagined as the enabling of developers to deliver reliable and first rate end user experiences — for as many users as possible, and for as long as possible. With this goal in mind, I think we’d be hard pressed to find a better starting point than [the fundamentals of the web platform](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/The_web_and_web_standards#overview_of_modern_web_technologies) — that is, web browsers, HTTP, HTML, CSS, and JavaScript. These technologies have existed for decades in a near total state of backwards compatibility, while also consistently evolving to offer web developers ever more powerful techniques to deliver exceptional user experiences.

It’s true that many modern JavaScript frameworks began as attempts to fill in some gaps in web standards, but in 2023, many of those gaps have been filled by the web standards themselves. HTML now has templates and custom elements, CSS has an incredible range of APIs for animation and complex, dynamic, and responsive layouts, and JavaScript itself has evolved to become a powerful programming language without the need for supersets or frameworks.

Browsers, meanwhile, have become better at converging on implementations (for the most part, anyway… WebKit has some catching up to do) and at offering built in optimizations like back/forward caching, and they automatically update so that end users have access to the best new features. Cloud based deployment solutions and general increases in global internet speeds have done much to mitigate slow response times (providing you’re not shipping megabytes of JavaScript over the wire), allowing multi-page applications to become just as fast (if not faster overall) than single page applications.

All of this is available to every single web developer on the planet, and (perhaps with the exception of deployment providers) without having to `npm install` a single thing. Even more impressively, time spent learning these fundamentals today is not time you will need to spend again next month or next year. Because of the web’s inherent backwards compatibility, the knowledge you acquire today will never go out of date. This is not, however, to say that the web platform is stagnant and never changes — changes are arriving faster than ever before, but these changes are additive and stable, rather than subtractive and in constant flux.

On top of all of this, web platform fundamentals deliver exceptional user experiences, as long as they are used with an eye towards accessibility and performance. The results that can be achieved solely with vanilla HTML, CSS, and the lightest sprinkling of JavaScript in 2023 is truly remarkable (just wait until you see what we’ve been cooking up for the launch of [Enhance](https://enhance.dev) 1.0), and these results can be delivered to end users with unparalleled speed and resiliency.

The web standards platform in 2023 is, to put it bluntly, fantastic. I joined Begin in 2022 and haven’t touched a lick of React or any of the aforementioned frameworks or ecosystems since (aside from NPM), and while I accept that my position in the company may bias me, I have to say: this has been both a relief and a joy. Getting back into working with the fundamentals has been supremely exciting, especially where picking up knowledge of the world of web components is concerned. I spend so much more of my time solving important (end user) problems now, and when my work ships, it’s delivered in a fraction of the time and with so much more stability and resiliency than anything I’ve shipped in the past decade.

I won’t go so far as to say the web platform is perfect. There are things about the nature of web components (primarily their tight coupling to JavaScript classes that are designed to run on the client) that frustrate me. There are sometimes hold ups (like [WebKit](https://github.com/WebKit/standards-positions/issues/97)) to certain standards being implemented universally (like [extending built in HTML elements](https://lists.w3.org/Archives/Public/public-webapps/2013OctDec/1051.html)). But compared to the feeling of permanent red alert that I felt working with JS mega stacks, things are blissfully calm.

What’s really exciting for me to think about is the fact that more people getting on board with web standards makes for more people to help push those standards ahead. Imagine if instead of fighting for certain updates to land in React, we could all work together to help certain updates land across the entire web platform, and every single user of it. Isn’t that a developer experience that would be truly exciting?

To put it simply, the developer experience I’ve been wanting for years has, in fact, been around for years — I was just too caught up in other stacks to notice it. And the fact that this developer experience also has the power and tendency to create exceptional user experiences…? Now that’s a phenomenon I want to be a part of.

## First steps

If you’re ready to take the first step towards better DX and better UX, the first step is to (re)acquaint yourself with web platform fundamentals. The Mozilla Developer Network (MDN) has [a great learning pathway touching on HTML, CSS and JavaScript](https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer), and this could be a great place to start.

Once you’re familiar with the basics (or if you are already and want to take them further), [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) offer a standards based methodology for creating custom reusable components. As previously mentioned, Web Components require JavaScript to run in the browser by default, and their class based interface can take some getting used to. Enhance, our HTML first framework, steps around this issue by providing you with a standards compliant way to render custom elements on the server, only requiring you to interface with the Web Components JavaScript API when progressive enhancement is called for. Plus, we’ve got a really cute mascot. [Give Enhance a try today!](https://enhance.dev)

