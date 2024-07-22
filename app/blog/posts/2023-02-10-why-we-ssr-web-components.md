---
title: "Why we Server Side Render Web Components"
image: "/_public/blog/post-assets/jamdev.png"
category: enhance, webdev, webcomponents, SSR
description: "Our rational on choosing the platform over chasing JavaScript frameworks."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "February 10, 2023"
---

Back on January 25th I presented at [thejam.dev](https://cfe.dev/events/the-jam-2023/) an on-line event featuring talks on Jamstack, web development and serverless hosted by our friends at [Certified Fresh Events](https://cfe.dev/). What follows is our rationale on choosing the platform over chasing JavaScript frameworks. A transcript follows immediately after the video.

## Video

<div class="relative h-0 overflow-auto iframe-container">
    <iframe class="absolute inset-bs-0 inset-is-0 si-100 sb-100" src="https://www.youtube.com/embed/ArDHZfTRkcw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Transcript

I’m here today to talk to you about server-side rendering web components, and we’re going to get into that. Unfortunately, we have to do some background information first to get there, but we’ll build up to it.

I’m going to start off my talk by asking a very silly question: have you ever had a dependency break on you?

![if you could not as stupid questions](/_public/blog/post-assets/if-you-could.jpg)

Okay, it's a stupid question. I mean, dependencies are unstable and can be a time sink. This unplanned work keeps you from iterating on your product, and it's frustrating.

There's an excellent quote from Jeff Bezos.

> I very frequently get the question: 'What's going to change in the next 10 years?'
> I almost never get the question: 'What's not going to change in the next 10 years?'
> And I submit to you that that second question is actually the more important of the two -- because you can build a business strategy around the things that are stable in time.
>
> Jeff Bezos

People always ask him what will change in the next ten years and how we will prepare for this. Still, they rarely ask what’s not going to change in 10 years, what’s going to be stable. He thinks the second question is way more important because you can build a strategy for the stable things you can create a business on. I would argue that it’s way easier to predict the things that aren’t going to change over the next couple of years, and that’s what you can use as a solid foundation to build your business.

### Why do we want to build businesses on top of things that don't change?

Software is complicated, and it is certainly not made less complex by adding a lot of dependencies to your software. Arguably, it's made way worse because these dependencies often conflict with one another and that can be a huge pain.

Now we've seen this kind of thrash before. Web browsers used to be very broken. The browser ecosystem used to change all of the time. It was not uncommon for different browsers to interpret capabilities differently, and therefore they would break different websites.

Web browsers don't break anymore. When it comes down to it, the web standards that we have evolved to now give you consistent behavior across a bunch of different browsers as long as the standards are implemented. Which they are in most cases, and the browsers automatically update themselves to be evergreen. You never have to worry about them being terribly out of date. To remain competitive in the browser marketplace, they must maintain this backward compatibility, so you know that these things will always work.

Web browsers are backwards compatible. What we mean by this backwards compatibility is that if you look at sites and code written over 25 years ago, you'll see that they still work perfectly well in today's modern browsers. One example of this is jQuery. jQuery was used in many sites to smooth over the differences in these browsers. Over time, as the browsers became more and more standard compliant, we didn't need jQuery anymore. We were able to drop that dependency and use what was in the platform, but if you have a site written in 2003, it'll still work even with an old version of jQuery because the browsers have not introduced breaking changes.

### We have to ask ourselves: if the browser can be that stable, can our own source code be that stable as well?

I would posit that breaking changes are optional. Unfortunately, we tend to opt into them eagerly. Just because you know you're picking a framework that compiles to a web standard doesn't mean that you're enjoying those web standards, so you might think about that a little bit more.

When it comes to changes, there are two kinds of change, and of course, the answer to my previous question is yes, we can opt into things so that our source code doesn't break and it's very stable.

There are two kinds of changes that we have to look out for. The first is the bad one. That is a breaking change. That's when we see the removal of APIs, interfaces, or behaviors. In some cases, if you're removing something because it's a security issue, it makes perfect sense to get rid of it. A lot of times, there's breaking changes for the sake of being a breaking change.

Many times the package is handling things using semver correctly. Updating to a major whenever breaking changes are introduced. Introducing a breaking change on a minor or patch release is terrible because that is different from how semver is supposed to work.

Those who have been around long enough probably remember the giant breaking change from going from Angular 1.x to 2.x. It was a complete rewrite of your application, and then they did it to us again in a later version of Angular. A lot of people were burnt too many times by Angular and moved on to other frameworks. React 18 has some breaking changes in it as well. It's handling things properly because it's breaking things on a major version bump. Typescript 4.8, a minor update, also includes breaking changes that are not what you want to see. You want those changes to be introduced on major versions. If you follow semver and see Typescript 4.8 is out, you think, "I'll just upgrade it because it's only a minor change. It shouldn't have any breaking issues," and there you go. You've introduced a breaking change, and you've got a whole bunch of unplanned work because of it, so you want to pick dependencies wisely or eliminate them.

Frameworks that properly handle these changes for you and ensure that they're using semver properly are the other type of change that is the good change. An additive change is just that it adds new functionality without removing any of the old stuff. HTTP 1.x to 2.x is great as it gives us new capabilities, but it keeps the old protocol intact. We used to use  `XMLHTTPRequest` for Ajax. That was a pretty good API to start with, but we've refined it into `fetch` and that's a much better API for developer ergonomics. We've added things like async/await, which you can use, or you can still do promises or callbacks. We've added the module type of a script tag as well. Instead of just using the old standard script tag, we can tell people that this is like a new ES module. These are all examples of additive changes to the platform without breaking anything else, and that's just great.

Now the front end itself is also very complicated. The front end is this vast ecosystem with many compatibility problems, so it's very common for you to transpile code. But those subtle differences between the code you write and the code that is run can cause unexpected breakages, which is very frustrating.

Looking at these templating systems, earlier versions of JavaScript didn't have the string template literal concept, so we took a page from other runtimes like Java or Ruby or Python, and we created these templating languages. It's like embedding a smaller language into your bigger language, and sometimes it makes the syntax hard to read. Because it's not very standard, it's not JavaScript. Then we have other things like non-standard dialects like JSX. JSX is not JavaScript. It looks like JavaScript. It acts like JavaScript, but you can't run that code directly in a browser. You have to do a translation step for JSX to be executed in the browser, so the code that you write and the code that you run in the situation is very different again.

Another way of doing things is introducing a completely new programming language and then using it to compile down to web standards. That's the thinking behind Svelte, and it has all the same problems as a templating language. It's like HTML, it's like JavaScript, but it isn't. Now you have to give credit to Svelte because they are very upfront with this being a non-standard dialect, and you know they stand by the idea that a compiler is a better solution because it can output more efficient code.

### Transpilation

Okay, let's take a look at some of the transpilers output. The problem with transpilers is that they obfuscate the runtime code. It's bad, and it gets worse as you dig in. Let's take a look at this code example:

<begin-code>

```javascript
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push( [ [59172], {
    95627: function(t, e, r) {
        var 1 = r(15686). Buffer,
        n = r (4163);
        !function() {
            var e,
            a,
            0,
            5,
            f,
            h,
            d,
            C,
            u = {
                7160: function(t, e, r) {
                    var i = e;
                    1.bignum = r(711),
                    1.define = r(495). define,
                    i.base = r (853),
                    1. constants = r (7335),
                    i. decoders = r (6701),
                    i.encoders = r (3418)
                },
                495: function(t, e, r) {
                    var i = r(7160),
                    n = r(3782);
                    function a(t, e) {
                        this.name = t,
                        this. body = e,
                        this. decoders = 0),
                        this.encoders = {}
                    }
                    e.define = function(t, e) {
                        return new a(t, e)
                    a.prototype. _createNamed = function(t) {
                        var e;
                        try {
                            e = r(6144) .runInThisContext ("(function " + this.name + "(entity) {\n
                            this._initNamed (entity); \n})")
                        } catch (i) {
                            e = function (t) {
                            this._initNamed(t)
                        }
                        }
                        return n(e, t), e-prototype. _initNamed = function (e) {
                            t.call(this, e)
                        }, new e(this)
                    },
```

</begin-code>


That could be more readable. Any kind of debugging in this environment will be tough to diagnose. You need to figure out where things are coming from because this isn't the code you wrote. It has no bearing on the code that you wrote.

<begin-code>

```javascript
            e.Decipheriv = s.Decipheriv,
            e.createDecipheriv = s.createDecipheriv,
            e.getCiphers = s.getCiphers,
            e.listCiphers = s. listCiphers,
            f = P(6587),
            e. DiffieHellmanGroup = f.DiffieHellmanGroup,
            e.createDiffieHellmanGroup = f. createDiffieHellmanGroup,
            e.getDiffieHellman = f.getDiffieHellman,
            e.createDiffieHellman = f.createDiffieHellman,
            e.DiffieHellman = f.DiffieHellman,
            h = p(4078),
            e. createSign = h. createSign,
            e.Sign = h. Sign,
            e. createVerify = h.createVerify,
            e.Verify = h. Verify,
            e. createECDH = p(9942),
            d = p(9783),
            e.publicEncrypt = d.publicEncrypt,
            e.privateEncrypt = d.privateEncrypt,
            e.publicDecrypt = d.publicDecrypt,
            e.privateDecrypt = d.privateDecrypt,
            c = p(6445),
            e. randomFill = c. randomFill,
            e. randomFillSync = c. randomFillSync,
            e. createCredentials = function () {
            throw Error("sorry, createCredentials is not implemented yet\we accept pull
                requests\nhttps://github.com/crypto-browserify/crypto-browserify")
            },
            e.constants = {
                DH_CHECK_P_NOT_SAFE_PRIME: 2,
                DH_CHECK_P_NOT_PRIME: 1,
                DH_UNABLE_TO_CHECK_ GENERATOR: 4,
                DH_NOT_SUITABLE_GENERATOR: 8,
                NPN_ENABLED: 1,
                ALPN_ENABLED: 1,
                RSA_PKCS1_PADDING: 1,
                RSA_SSLV23_PADDING: 2,
                RSA_NO_PADDING: 3,
                RSA_PKCS1_0AEP_PADDING: 4,
                RSA_X931_PADDING: 5,
                RSA_PKCS1_PSS_PADDING: 6,
                POINT CONVERSION UNCOMPRESSED?"'4, POINT_CONVERSION_UNCOMPRESSED:
                POINT_CONVERSION_HYBRID: 6
            },
            t.exports = b
        }()
    }
}]);
```

</begin-code>

Now, 12,000 lines of code is normal for a trivial bundle, and that's not very efficient, and it's a terrible developer experience for you to debug. Many people will think that Source Maps will fix this problem, but quite often, they fail to work, especially when you're running in an environment like Node.js, which is not built for this type of thing.

Do you know what your tools are doing when you introduce something like a transpilation step? You're just counting on them to do the right thing for you, so let me give you an example of something I recently encountered when inspecting an application.

```javascript
(self.__LOADABLE_LOADED_CHUNKS__=self.
_LOADABLE_LOADED_CHUNKS. - I| []). push (C[9158], {9158:(-,e,r)=>
{var o=r (85081) ("toLower", r(46129),r (39478));o.placeholder=r
(48051), -. exports=o}, 46129:(-,e,r)=>{var o=r (26478);-.
exports=function(_){return o(_).toLowerCase ()}}}]);
```

This one-liner is 296 bytes. A tiny, completely separate JavaScript file. As near as I can tell it adds a method called `toLower`, which calls `toLowerCase`.

How is that optimizing code for you? Why is that better? I don't understand. It saves me typing four characters, but going through this every time I need to call something in the platform is a bad idea that will add overhead. Regardless, check what your tools are doing, folks.

### Static !== Dynamic

Earlier today, Henri discussed metrics like first contentful paint and time to interactive. These metrics could be better when we're using our giant frameworks. What's happening is we have to send JavaScript down to the browser to be able to create the user interface, which then makes API calls to the back end to populate the interface with the data. So that's going to impact your first contentful paint and your time to interaction.

You really want to look at that — is that really the right way to do things? We have way too many moving parts in today's modern JavaScript environment. What can we get rid of?

We can simplify this situation. What are the root causes of the complexity? How do we avoid this kind of stuff? One of the ways that we can prevent this is by going back to the way web pages and websites were previously written, and we have a new case for Progressive enhancement.

### Progressive enhancement

Progressive enhancement is not new people have been doing it for a long time. At some point, it ran out of fashion, and you know I love JavaScript. It helped me not buy my house but put a pretty good down payment on it, but it does get to be a bit fashiony sometimes.

Progressive enhancement went out of style, but we should bring it back and think about it more because there are many reasons. First, the ethical reason for inclusivity. We want as many people as possible to use our websites and applications, and when you build with progressive enhancement, you start with a working HTML. The most accessible application that you could start with.

There are business reasons as well if you need to make that argument. The bigger your audience, the more devices and people can use it. This translates to more money they will spend on your products or services. Finally, there's the selfish developer reason, as I hate fixing broken stuff.

I like it when stuff works. If I have a way that it will work for screen readers and old web browsers, it will work for the evergreen web browsers. It's going to work on a new device that's coming out that is a virtual voice assistant or something like that, all because we're using progressive enhancement techniques. That's what I want because I will spend more time working on the product adding new functionality that makes my customers happy instead of chasing a bunch of breaking changes.

With progressive enhancement, you start with working HTML and using standard anchors and forms. Then you make it better by adding JavaScript to it. Not the other way around. Don't start with a bunch of JavaScript to see where it fails, and then make sure that the failure cases are still workable. That's graceful degradation!

IMHO, progressive enhancement is way better than graceful degradation. When we talk about doing HTML first, we're not talking about HTML only. JavaScript comes second in your application because that's how web browsers work. Open up any site with your inspector and go to the network tab. The first thing that gets loaded is your HTML, and then your HTML is used to structure the page. After your HTML and your CSS are loaded, then JavaScript is loaded. That's what makes your page better. It gives it more interactivity, but it should be a sprinkling of JavaScript, not a tsunami of JavaScript.

### Next Generation

There are a lot of Next Generation front-end Frameworks that are HTML first. For example, 11ty, Remix and Astro. All of these frameworks are looking at doing HTML first. HTML first is the new marketing way of saying progressive enhancement. As I mentioned earlier, progressive enhancement got a bad reputation and went out of style. You could look at any of these Frameworks and see how they're doing things.

At Begin, we've had this open-source project since 2017. Tens of thousands of apps are built on top of Architect, which has always been HTML first. We develop our applications using Cloud functions to output HTML directly from the server, so everything that comes down from the server is working HTML that we then enhance with JavaScript on the client side. We've been doing this for five or six years now. The things we learned during that time inferred what we would do later with the Enhance framework.

What if the entire back end was just pure cloud functions? Architect the open source project is mainly concerned with the back end. Instead of load balancing a whole bunch of web servers, let's just make all of the back-end things like small cloud functions that we can manage using Architect, and it's been working pretty amazing so far.

With the modern JS ecosystem, we've got some major problems. First, it's brittle; these ecosystems are incompatible with each other and often fail. We also have these non-standard template libraries or, worse, opaque programming languages that we have to add on top of things adding more complexity to building web applications. Quite often, they are static, not dynamic. You're not getting the content that the user wants right from the very beginning, and it results in all of these kinds of spinners, skeleton screens and bad metrics on your time to first interaction.

Can our front-end Source be pure standard-based HTML, CSS and JavaScript? What if we started with web standards instead of learning a non-standard programming language like JSX and compiling it into JavaScript? Let's start with some very basic primitives and get things working incrementally. Let's pick HTML and CSS. We'll start with that from the very beginning, take those Legos, and stack them up to build bigger and better things. Once it all works, we can add client-side JavaScript for more enhanced browser behavior.

In other words, what I'm trying to say is

![use the platform](/_public/blog/post-assets/use-the-platform.webp)

### Use the platform

Back in the day, we used to use jQuery for everything, but now we rarely need to reach for it since the most important parts of jQuery have become part of the platform. It made it so much easier to do query selectors in jQuery. Still, now we have `querySelectorAll` built into the platform, and it's because of the popularity of jQuery that we have those APIs.

It's the same thing with some of our modern JavaScript Frameworks that we use to build reusable component user interfaces. We've popularized a lot of them, but is there something in the platform that we can use today that will reduce our dependencies on some of those Frameworks? Of course, there is.

### Web components

Web components are a suite of different technologies that allow you to create reusable custom elements and utilize them in your web applications. These custom elements are all encapsulated away from the rest of your code. The styling and the behavior can be contained in a single file so that you can reuse them in different projects, and it doesn't affect other parts of your application. Three main specifications are used when you're building web components.

Custom elements: A set of JavaScript APIs that allow you to define custom elements and their behavior, which can then be used as desired in your user interface.
Shadow DOM: A set of JavaScript APIs for attaching an encapsulated "shadow" DOM tree to an element — rendered separately from the main document DOM — and controlling associated functionality. In this way, you can keep an element's features private, so they can be scripted and styled without the fear of colliding with other parts of the document.
HTML templates: The `<template>` and `<slot>` elements enable you to write markup templates that are not displayed in the rendered page. These can then be reused multiple times as the basis of a custom element's structure.

React is about to have its 10th birthday in mid-2023. Web components have already had their 10th birthday because it's been out since 2012. The difference is it was an evolving standard. For many years I wouldn't say that it was ready for prime time, but we've reached a point now where web components are available across all of the evergreen browsers, and there's no reason not to use them right now, so if you can use a web component and get rid of some of the large JavaScript frameworks that you're using to build UIs right now you should probably take a look at doing something like that.

Web Components have problems. All solutions have issues. A couple of things that you will notice with web components is that they don't progressive enhancement very well. Unfortunately, when you set up a web component, you use JavaScript to define it. You have to call the `customElements.define` method in order to register your component with the browser. If JavaScript fails for any reason, and believe me, there are a lot of reasons that JavaScript may fail, and it's not because somebody has just decided to turn it off because they feel like watching the world burn. There are network issues, DNS problems, and captive portal, just to name a few. There are lots of good reasons why JavaScript may run into issues. This is a problem with web components because if you don't have JavaScript, you will not be able to instantiate that web component, and the browser won't know what to do with the custom tag you're giving it.

The other problem is the way that browsers work. First, you load the HTML, then the CSS and finally, the JavaScript. If you have a tag that is your custom element until that JavaScript is loaded, parsed and executed, it won't know how to display that custom element. Instead, you get a white box, which will flash into what it should look like. That's called the flash of unstyled custom element (FOUCE). These are a couple of things that you have to be aware of when you're dealing with web components. There are common problems, but I would only bring these up if it had a solution for them.

![Enhance](/_public/blog/post-assets/enhance-type.png)

Enhance is an HTML framework. It's another open-source project that we work on at Begin. It allows you to author your pages in HTML using generally available web standards like web components to build your UIs and then progressively enhance that working HTML with some client-side JavaScript to make everything better.

The fun thing about Enhance is you write your web component as a pure cloud function. Using Enhance, your custom element is expanded on the server. We determine which parts of the web component to send down the wire so that when the initial HTML is loaded in the browser we don't need to wait for `customElements.define` because all of the HTML inside it is already expanded. This removes the issue if JavaScript fails and you can't call `customElements.define`. It also removes the Flash of unstyled custom element because your initial HTML is already there. It also allows you to do kind of that personalization on the server where you send all the data down immediately, and that's also going to help your metrics. Your time to first interactive is going to be a lot quicker your first contentful paint is going to be better as well because the data is already there in the HTML. We're not waiting for the JavaScript to be load and we're not waiting for that API call to be made after the page is loaded - we've already got that data for you.

### Demo

<div class="relative h-0 overflow-auto iframe-container">
    <iframe class="absolute inset-bs-0 inset-is-0 si-100 sb-100" src="https://www.youtube.com/embed/ArDHZfTRkcw?start=1530" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### Enhance key concepts

* File based routing with plain HTML
* Reuse markup with custom elements
* Built-in utility CSS based on scales rather than absolute values
* API routes without manually wiring props
* Progressively enhance with standard JS; no special syntax
* Full stack FWA under the hood

![frontend backend](/_public/blog/post-assets/frontend-backend.png)

With enhance.dev, we are doing a good job of bringing together both the front end and the back end.

Suppose you are going to do some in client-side JavaScript. You would end up adding a script tag to what you send down to the client, and that's where you would instantiate your web component on the client side, register your event listeners and do all your other standard JavaScript.

Underneath the hood, we're using Architect to deploy. We're using AWS to run your cloud functions and Dynamo DB for your database. It's a fully functional web app with infrastructure as code to manage everything for you.

### Further resources

If you want more information on this, the best thing to do is check out Enhance docs at enhance.dev. Join our Discord to ask us questions, as we're happy to hear from you, and of course, follow us on Mastodon.

### Q&A

**Sean Davis** Thanks, Simon I love that presentation. I have so many questions, so I’m going to jump right in.
You know here at TheJam.Dev we’re often talking about the Jamstack and different trends. I know that folks are still holding on in some ways to the more traditional static site generators, but we’re seeing more server-side rendered content. So I imagine a lot of folks are watching your presentation and thinking, is it just is it like exclusively SSR or do you have an option to pre-render content with Enhance? Is that in the works or are you solely focused on the server?

**Simon MacDonald** We’re exclusively focused on the server-side rendering piece. One of the things that I neglected to show is that there is a public bucket which maps to an S3 bucket. If you wanted to run a process outside of enhance that would populate that bucket with your static site-generated content, you can do that. One of the traditional things I’ve seen people use Jamstack for is rendering a bunch of markdown files, converting them into HTML, and storing them in your bucket.

We’ve had a lot of success automatically generating that HTML on the fly. It does not take very long at all. Enhance.dev itself uses that approach. It’s an open-source project. You can see how we did it. We’ve written an article on it before as well. There’s not a performance penalty on that and one of the nice things about rendering things this way is that if you have to insert any kind of dynamic content or personalization based upon the user that is logged in you can query that on the server side and send it down the wire with the initial page load and not have to wait for another API call to be done after the fact and that’s kind of where this step fits into the new definition of Jamstack because there’s no one right way to do it anymore.

**Sean Davis** I imagine you will be able to use this in conjunction with Begin, but what about a lot of those other Cloud providers? Can you deploy an Enhance application anywhere?

**Simon MacDonald** Right now, Enhance applications are deployable to AWS. We’ll give you the best experience possible on Begin to deploy to our infrastructure, but if you do not feel like using Begin, you can use Architect to deploy directly to AWS. Of course, if you really feel like you want to manage it all yourself, you can eject from Architect and deploy directly to AWS. In that case, you’ve got to manage cloud formation, and I do not recommend that. In this case, you’d definitely want to use a tool to do your infrastructure as code. A 10-line Architect manifest file with maybe five API calls and a static bucket ends up being 1400 lines of CloudFormation. You don’t want to write that. That’s just terrible.

**Sean Davis** A case where using the abstraction layer is totally okay right?

**Simon MacDonald** Exactly!

**Sean Davis** I also noticed that there were a handful of MJS files in the project and I know this is very like very polarizing topic. I’m curious about your opinion, and Enhance’s opinion on typescript. Is that something that you have native support for, or do you feel like that goes against the idea of getting back to the basics using native libraries etc.?

**Simon MacDonald** Personally, I’m not a fan of typescript. You can use typescript with Enhance and Begin, but you’re adding a transpilation step to your project. The typescript code you write is not the JavaScript code that gets executed on your browser, and we’re trying to avoid that. It makes your code more difficult to debug. I know that people love a lot of Typescript’s functionality I’m very excited about one of the proposals that TC39, which is to add type annotations to JavaScript. Enabling static type checking at development time while not adding any overhead at runtime.

**Sean Davis** Henri mentioned that he profiled the CBS Sports website and said that they’re currently running jQuery version 1.8.3, which was launched back in November 2012. I loved the beginning of your talk where you had the quote from Jeff Bezos on what will change in the next ten years and getting back to focusing on what will be stable. So I’m just curious, from a general perspective, do you see it as bad practice to use old libraries if jQuery still works? Is that still okay to use? How do we balance that with all the new shiny stuff coming out?

**Simon MacDonald** I don’t have any problem with using jQuery. My recommendation in that particular case would be to stop using it because many of the things in jQuery have ended up in the platform. You can reduce the amount of JavaScript you send to your client using the platform directly. That’s one of my arguments with a lot of the other UI Frameworks. They were around when we didn’t have a good component model in the browser, but now that we do, they should be starting to remove some of their complexity in favor of web components. But we’re not seeing that right now, so we’ll see what happens.

The nice thing is if you started a business ten years ago building WordPress and using jQuery, you’re still making a lot of money doing that right now. It may not be sexy. It may not be the most technically difficult thing, but you’re still making a living on it because the platform isn’t breaking on you

If you started using React five years ago or seven years ago, you went from `createElement` to JSX to hooks to whatever is the new thing this year. This churn happens every 18 months or so as React re-invents itself, and you’re chasing those changes non-stop. You have to ask yourself, did I waste a lot of time I could have used building functionality for my customers and making money? Instead of just chasing these unplanned outages? I try not to slag on React too much as I have used it for many years, but I think I have seen the light.

**Sean Davis** Totally fair. Now there are mixed opinions on this, but you mentioned web components had their 10th birthday already, and I felt like there was a lot of noise in the first couple of years and then fell off for a while. React got super popular and still is, but within the last six to 12 months, I have seen a lot more noise around web components in this space. I know that you’re betting on it. I’m curious about your perspective. Do you see the same trend? I guess what I’m trying to ask is, are you seeing this approach resonate with folks? Do you feel like we’re going to start to see some other Frameworks pop up as well? Is this a trend we’re seeing getting back to the basics?

**Simon MacDonald** I believe that. We are seeing things, not just Enhance, but Astro, 11ty with WebC also using web components. Major companies like Google have built YouTube using web components. Adobe is making all of its Creative Cloud Web apps using web components. Web components are ready for prime time right now. When it was initially announced it was a spec that was still evolving, and it wasn’t quite ready yet. When it comes to the evolution of specs, it takes a while before these things solidify and get all of the use cases right. That’s where client-side libraries are super helpful because they can iterate rather quickly. jQuery is an example, it iterated quickly, and eventually, those things ended up in the platform. On the mobile side, Adobe PhoneGap/Apache Cordova implemented a bunch of APIs for connecting to the camera, using geolocation and other mobile APIs that eventually made their way into the platform. Why aren’t some of the things React, Vue and Angular do being replaced with what the platform already has available? That’s web components! I think you’ll see many people starting to head in that direction.

**Sean Davis** That makes a lot of sense. I’m going to keep an eye on it because I love the concept of getting back to the basics using native libraries, and I’m excited about what you’ve got going on with Enhance.
