---
title: Enhancing FWAs with web components with Brian LeRoux
image: "/_public/blog/post-assets/podrocket.jpg"
category: FWA, web components, web development
description: Brian jumps on PodRocket to talk about their conference talk, “Enhance your functional web apps with web components” from last year’s CascadiaJS conference.
author: 'Brian LeRoux'
avatar: 'brian.jpg'
twitter: "brianleroux"
mastodon: "@brianleroux@indieweb.social"
published: "February 23, 2023"
---

![PodRocket](/_public/blog/post-assets/podrocket.jpg)

In a [recent episode](https://podrocket.logrocket.com/enhancing-fwas-with-web-components) of [PodRocket](https://podrocket.logrocket.com/), [Sean Rayment](https://www.linkedin.com/in/sean-rayment-8180a512b/) talks to Brian LeRoux about [FWAs](https://fwa.dev/) and [Enhance](https://enhance.dev/). You can listen to the episode below:

<audio controls src="https://media.fireside.fm/file/fireside-audio/podcasts/audio/3/3911462c-bca2-48c2-9103-610ba304c673/episodes/8/8fbd3a29-d8c8-4619-9bdc-c36fd66d1275/8fbd3a29-d8c8-4619-9bdc-c36fd66d1275.mp3"></audio>

or subscribe to the podcast in your podcast player of choice [Apple Podcasts](https://podcasts.apple.com/us/podcast/podrocket/id1539945251), [Overcast](https://overcast.fm/itunes1539945251), [Google Podcast](https://podcasts.google.com/feed/aHR0cDovL3BvZHJvY2tldC5sb2dyb2NrZXQuY29tL3Jzcw?sa=X&ved=0CBUQ27cFahcKEwiQ1K3c-ZjtAhUAAAAAHQAAAAAQCA), [Stitcher](https://www.stitcher.com/show/podrocket), [Pocket Casts](https://pca.st/fn09zyvs), [Spotify](https://open.spotify.com/show/6oFuKu89C9X1wQ7bT0QEM2) or [RSS](https://podrocket.logrocket.com/rss).

## Transcript

**Sean:**
Hi, and welcome to PodRocket, a web development podcast from LogRocket. I'm Sean, and with me today is Brian LeRoux, extremely hardcore founder of Begin, a cloud platform for functional web apps. Here to talk about his conference talk, Enhance your Functional Web Apps with Web Components, from last year's CascadiaJS conference. Welcome to the show, Brian.

**Brian:**
Thanks for having me.

**Sean:**
We're excited to have you. And before we get into the talk, I'm just curious if you could walk us through your journey as a developer, and how you got to where you are today.

**Brian:**
Yeah, for sure. And also, just for everyone's edification, the extremely hardcore thing is a tongue in cheek.

**Sean:**
Nice. I love it.

**Brian:**
Response to Elon Musk's. I don't know whatever you would even call what he's doing. I don't want to call it engineering management, because it's definitely not that. Okay. Yeah.
So how did I get into software? It kind of just happened all around me as I was growing up. I'm a pretty seasoned web developer, let's say. I was born in the '70s, so I got to watch all this stuff rise up around me as I was growing up. And in the late '90s, I had a friend show me the internet, and I was like, "The graphics suck. I don't think this is going anywhere."
And then in a few years I was hacking a thing called HoTMetaL Pro, which is this really early way to build HTML sites. And, yeah, I just fell backwards into the whole thing, and I've been building and loving the web since the '90s.

**Sean:**
Yeah. It's come a long way.

**Brian:**
Yes.

**Sean:**
How did you get to think about starting Begin? How'd you become an extremely hardcore founder?

**Brian:**
Yes. Yeah. Begin was also maybe a bit of a series of mistakes. In an earlier portion of my career, I was really excited about mobile development, when that kicked off. And for me, in my perspective, that wasn't iPhone, Blackberries were the first devices that really were bringing the web to mobile, and so we were doing some of that.
I ended up working on a project that got really popular, and it sort of led me down this path where I was working in building on a cloud service. And when I left that role, I knew that the future was most certainly going to be on the cloud, but it probably wasn't going to be load balanced web servers. I got really, really excited about, both messaging, and things like AWS Lambda.
And so I really went deep on those ideas, maybe too long, created a project called Architect. Architect has grown quite well over the years. And recently we've decided that most of the larger growth out there is around front-end web development, so we've started retooling Architect with a front-end focus, and that's what we call Enhance.
It's effectively a concept that I've been calling functional web apps. The idea is you're building applications out of pure functions. And you probably do this anyways, like if you build a Rails app, it's a lot of functions. The difference is, in a Rails app, there's no separation between those functions, and the abstraction is this idea of a web server.
But your business probably doesn't have an abstraction called a web server, it's going to have domain-specific ideas that are very related to that business. And in a functional web app, we would just model those ideas as functions, and not have to think about things like servers. And it's a really nice way to build, but this is all still pretty heady and early stuff. I'm certain a lot of the stuff I'm going to say is going to sound like total heresy to the listeners, so this should be exciting.

**Sean:**
Yeah, the cloud functions stuff is definitely something that's unique compared to some of these other web frameworks that are coming out. I'd love to dig in more. How does Begin combine these new web standards, functional component type ideas with those cloud functions, like you said, maybe give you better abstractions to what your business logic is actually doing?

**Brian:**
Yeah. Well, I think a lot of people could relate to the following statement. React taught us about writing pure functions, and in particular you'd see a lot of people talk about how your UI is a function that accepts state, and returns an HTML string. And that's a really good idea, by the way, I like that idea a lot. And it doesn't just have to be returns an HTML string, it could be your application is a function, that it has state and returns a UI. But it also does a whole lot of other stuff.
Begin is really focused on deploying applications to serverless destinations. We have our own, but you can also deploy to AWS directly, which we think a lot of companies want to do, probably already do. So we're not interested in locking you into our cloud. You've probably already locked yourself into AWS anyways.
And instead of having to worry about this huge world of servers, and Kubernetes, and load balancers, and all that other junk, we're saying, "Well, what if you just wrote pure functions, and it talked to the database, and that's how that worked?" And then you could take the same concept, like React originally had, and bring that through the whole stack.
Now, the problem, ultimately, that we've run into, is React is a moving target. And that's a big bummer, because it's a great project, and it definitely had a positive impact, but I think it's time has come. They've been iterating like crazy for the last few years, introducing ideas like Hooks, or now more recently server components. And all that's fine and good, but that means you have to rewrite your app every time they do this, and that's not stable.
And the particular thing that irks me about this, is the web is stable. We used to have a pretty breaky web, like in the early days, those late '90s, early-2000s, with more than one web browser. The pitch of a lot of early front-end was you needed to normalize across browsers. It was just what we had to do, they were competing with each other. Firefox and IE were not the same thing.
But you might notice we don't do that anymore. Web browsers are generally standardized quite well. Code you write for one browser is probably going to run in another browser. And browsers have a secondary thing that's pretty exciting, they're called evergreen.
Many listeners might not even be aware of this, but back in the day, whatever browser you got, was the browser you had until you decided to upgrade. And if you're a hardcore online person, you might do that, but most people did. And so, if they had an old Windows machine, chances are they had an old version of IE. And that was keeping the web back.
Now, browsers are evergreen, they update themselves. But when you update Chrome, silently, when you turn your computer on, it doesn't break the web, your websites still work. So that's really worth examining. Can you imagine if your software just automatically upgraded and nothing broke? That sounds like science fiction to an NPM install developer.
So how do we get there? We get there through good web standards, and we get there through additive change. This is not new, these are fairly old concepts. And tools like React just really haven't embraced those ideas, and I think they're showing their age, and we don't need to rewrite our front-ends every year. You can build an HTML site, and it's going to render just fine in 10 years, I'm certain of that. It shouldn't need any external tooling or thrash to get there.

**Sean:**
You started off the talk with this point of dependency breaking, and it's just something that has become a common occurrence in web development. And for some reason we've either become numb to it, or just have not been fighting back against it. Why do you think that the browsers fix this issue of being backwards compatible, and we don't see browser updates breaking HTML parsing or something, but in web frameworks that we use, were constantly expected to update our apps to support new versions?

**Brian:**
It's a multifaceted thing. I don't want to be critical of the audience, but let's look at how many web developers there are. In 2012, we think there was 20 million. If GitHub is to be believed today, there's 100 million. In 10 years, that's a 5x growth.
Most of those people, their introduction to programming was most likely front-end web development, and that's great. But another way of looking at that is there's a lot of newbs, and they really haven't embraced a lot of the experience and learning over the years. They're kind of just charging straight ahead, and building ... moving fast and breaking things. That's kind of a negative way of looking at it, and I'm not super comfortable doing that. I'm not trying to gate keep or anything.
But there's well-established ways to be forwards and backwards compatible, and they're just choosing not to be, and they're probably just learning as they go. And the easiest way to make this fix is to change everything, and cascade breaking changes out to your user base, but it's, frankly, unprofessional, and not necessary.
There's two kinds of change. I talk about this in the talk. There's additive change, and there's breaking change, and it's a choice. You get to choose if you're going to break something.
A breaking change is when you remove an API, or an interface, or a behavior from the code. So if you have an API, and now the endpoint is some other endpoint, that's not breaking, that's additive. If you didn't remove the original endpoint, you just added a new endpoint, now you can be forward and backwards compatible cleanly.
Additive change is where we do the new thing, but we leave the old thing, and leave the old path around. The browsers do this all the time. Probably easiest one for folks to understand on the front end would be XMLHttpRequest, or XHR, used to be the way we did networking from the client side. Now, most people use a thing called Fetch. The introduction of Fetch did not break XHR, it's still there, so all that code still works, but Fetch is nicer, so we use that.

**Sean:**
So this additive change idea, how do you think it fits into how we write our source code? And I know you talked about this in the talk, but do you think the answer is getting closer to HTML? What is the philosophy of Begin in this way?

**Brian:**
Yeah. Well, Begin is a hosting service, and we deploy your functional web apps, either to our cloud, or AWS's. So it's kind of indifferent to how you go about that. But Enhance-

**Sean:**
Or, of Enhance, excuse me.

**Brian:**
Yeah. Enhance is an HTML-first web framework. In particular, Enhance makes one assertion that most people aren't making these days, and that's HTML is pretty good. It's pretty good. If you listen to Reactor, or Quick Dev, or Angular folks, they're all like, "HTML sucks, use this thing instead."
And we're saying, "Actually, no, it's pretty good. It does the job." In fact, I would go so far as to say HTML is a lot better, because it doesn't break all the time. And HTML's got another nice trick up its sleeve, in that it's really fast actually. So people will say things like it's slow, or it's complicated, and introduce all this tooling, and all these build steps, and all this translation for ... Wait, for HTML? Is that really the hardest part of our stack? Talking to the database, or infrastructure's code, or these other things that we have to do to make an app live? So it's a poor choice.
It was maybe necessary at one point, but I don't really see that today. I see very few compelling arguments for it. It's more like, "Use this because HTML sucks, or the web platform sucks," and that's just, frankly, false.
Enhance says, "Yeah, let's write HTML. Let's keep as close to the grain of the wood as we can, and build to the platform that we're building for, and enjoy the benefits of that, which include forwards and backwards compatibility and stability."
When I write code, I don't want to have to revisit it every few weeks. It's really nice to write code, and then have the value for my time compound. And that compounding is really important if you're a business. You want to be focused on customer features, you don't want to be spinning your tires re-implementing stuff over and over again that already worked, just because something in the aesthetics changed.
Enhance is really a standard space framework. It's HTML-first on purpose. We think that's more performant, and will last a lot longer. And by the way, this isn't anti-JavaScript in any way. I'm a lover of JavaScript.
When we're saying HTML-first, we're just saying start there. I'm not saying stop there. You can still add the JavaScript. Make that form better, but make the form work first without it, and make those links work first without it, because you're going to have a way better user experience.

**Sean:**
And that kind of ties into that idea of the progressive enhancement, which you talked about. So maybe we can dig into that more. So how does progressive enhancement fit in to Enhance, starting with the HTML, and then where do you go from there?

**Brian:**
So progressive enhancement is a weird one, because it's like an old-school concept too. And I think it's having a moment right now, which is great, because there was a gaslighty few years there, where people were saying it was a bad idea or something, and there was no data to back that up. It was always faster to write HTML first.
That's how your browser works, by the way. Your browser doesn't load JavaScript first. It loads the script tag, which requests the JavaScript, which then runs. And there is no world where that's going to change. So it's always going to be faster to load that HTML right away.
And your backend is probably going to be a more predictable place to emit and generate that. It's going to have more resources, it's closer to the database. Lots of reasons you want to do this.
Progressive enhancement came around after ... There was another idea called graceful degradation, and I actually don't like this term. The idea is, if something fucks up in the network, and your JavaScript doesn't load for some reason, you're still going to have a good experience, it's going to degrade gracefully. So that's one of the ways of looking at this.
But another way of looking at this is, build the simplest thing that can work first. So instead of installing a webpack, and babel, and a framework, and adding link tags, and running a build script to just have a link, just throw that anchor tag right in there, it's going to be okay, and it's going to render just fine. And if the customer complains about that link tag, says, "I really want this, when I click it, to be a modal," that's the time to bring in JavaScript, but not the first cut.
And so progressive enhancement is more about that, it's more about starting with a working application, and then progressively making it better and better and better with the tools and stuff that you have available to you. And React was really allergic to this idea, because the rendering to strings is not very performant. There's a transpile step in there, and it's just low. And so they were saying, for years, "Client side render is the way to go."
And then the Remix team was like, "Actually, it's not that bad. Once you get that HTML it's pretty good." And so they started to push this idea. Thankfully, the community has now kind of done a 180, and it's coming around to these concepts really fast, which is great, because it's always been a better way to do things anyways.

**Sean:**
Yeah, it's been interesting to see it come full circle, where now server side rendering is everywhere. And I think that there's server side components now. But going back to what you said about the browser loads the HTML first, then pulls in the necessary JavaScript, and that's not going to change, but it sounds like there's also, what you touched on, is a developer velocity side to the progressive enhancement, in terms of being able to prototype something. Maybe MVP could be the right word here, just get something out in front of customers before perfecting it.

**Brian:**
A hundred percent. So the other day I had to rent a brush cutter out of Home Depot, and so I went online to their terrible website, just awful SPA spinnerrama. Finally get through their Byzantine navigation to get myself a brush cutter.
And then go there, and they had two waiting for me, because the form didn't work properly, or reloaded, or something. And it's just like, this is classic, right? This was not necessary. I assure you there are no Home Depot customers that wanted an SPA, or needed one at that moment. They just want to get a brush cutter, and one, not two.
So getting that first cut working, like actually working, and then make the experience ... Maybe then you could make the form, I don't know, have a bunch of spinners or something, but you didn't need to do all that.

**Sean:**
And it really drives the point home when there's a real-world manifestation of the form not working, in terms of getting the two items at Home Depot. That definitely drives it home.

**Brian:**
And you know what? This is common. Have you ever used the Nintendo e-store?

**Sean:**
Yes. Yeah.

**Brian:**
Terrible SPA, like that is the slowest website ever made. Whatever technology that is using, should not exist.
Another one, there's a popular grocery store here in Canada, Save-On-Foods, and I broke my leg last year, and I needed to get groceries, and their SPA is unusable on phone. This is an accessibility thing. I needed groceries, I didn't need an app-like experience on my phone that didn't work. And so it really does have impacts.
And we have a responsibility as web developers to build professional websites that get the information to people, on whatever device they're using, not just the latest Mac with the most RAM. So it's a big, tough conversation, because I think some people have been sold a bad bill of goods, and they're feeling a little ripped off, and/or that somebody is grifting them. And I think that is true.

**Sean:**
And sometimes when we develop things, we have our perhaps beefy work machines, and a bunch of CPUs, like a new MacBook, and not all of our users have those, especially if they're on mobile, and we're developing on desktop. But you mentioned the server side rendering thing, I wanted to talk more about the backend, because there's these data/API routes in Enhance too. I'd love to hear more about how those work, and the philosophy there.

**Brian:**
Enhance is really an extension of the tool that we call Architect, which is a low-level serverless framework. It was built roughly around the same time as the other one that's called Serverless Framework, which is awkward and annoying.
Architect is very much about single responsibility functions, pure functions. It's asking the idea, what is my architecture like if I build everything out of pure functions? And so, under the hood, Enhance gets to enjoy all that stuff, and your API routes are a nice little bonus. And so, under the hood, that's actually API Gateway, which is an AWS service, for doing HTTP calls to Lambda functions. And under the hood, of course, it talks to Lambda. And then by default we hook it up with DynamoDB.
Now, Lambda is the first, and still most complete, serverless primitive. And the idea is ... You've probably seen this with load balanced web servers, we always say you want your servers to be stateless. And the reason we say that, is because if you're load balancing a bunch of web servers, you have 10 web servers behind a load balancer, one of the disc drives dies, and you got to replace that server to keep up with your traffic, if it was stateful, if there was session data or anything on there, life's not going to be great. But if it's stateless, you don't care. You kill that server, you add another one, life's good.
So Lambda is the same idea, except for we bill by the millisecond, and it's auto-scaling by default up and down. But the problem with Lambda is that it's stateless. And so a lot of people will cheat, they'll be like, "My web server is stateless," but it actually keeps open a stable socket connection to a database. And database servers are really stateful, so scaling web servers is hard. Starting a database server is very, very hard, very painful.
So Lambda's analog for data is DynamoDB. You can feed DynamoDB unlimited data, you will never affect latency. They promise single digit millisecond latency, no matter how much data you have. And it's a stateless protocol, so it could run inside Lambda and there's no hit. You don't have a socket wide open, and none of the pain with that.
Enhance gets all that for free. You just write API routes, which are just little http handlers. But under the hood it's this massively scalable serverless system.
An even neater thing that Enhance does, and this one's tricky, people might not get this, so I recommend trying out the step-by-step tutorial. If you define an API route, like say I have an API route called Count, and it's like slash get slash count. And inside my folders I would have app, API, count and it would export a function called get, and it would return the value.
If I added an HTML page called Count, we'll automatically pass that state to the web components on that page, and it'll populate that page for you. Now, if your client-side JavaScript kicks in, it can make a request to the API route, with either an accept header, or a JSON, or a ... So you make a request with a Fetch, and it will give you the JSON back, so you can do progressive enhancement from the client. It sounds a little weird, but other API route systems will force you to figure out the wiring between these pages, whereas Enhance just does this automatically, based on conventions, since we have these routes anyways.

**Sean:**
Yeah, that reminds me a little bit of Next.js, it does offer the service and function that will run whenever your route loads, but then you have to know what API you want to hit. Perhaps it's a convention thing, that once people get used to it, it actually ends up running a lot smoother.

**Brian:**
Yeah, it's similar to that. It's also similar to Remix. In Remix, they call them loaders and actions. And then we call them get and post, because that's how the web works. And it's funny, because everybody's sort of copying each other, but with their own little names and stuff with this stuff. But we're trying to stay as low level as possible, stay as close to the real platform as possible.

**Sean:**
That's really cool though that someone can define an API route, but then not have to worry about independently scaling up a web server, versus their database. Was there a point when you saw the writing on the wall that the cloud was headed this way, and it would be really useful if application developers didn't have to worry about those things?

**Brian:**
I was trepidatious at first. I was really worried about lock in. I was definitely a big open source developer.
But having done the thing, where you build out a large cloud system, with a load balance web server architecture, and talking to a Postgres, or a MySQL, you're locked in there too. You're not taking your RDS charted database, and moving it over to Google Cloud anytime soon, or fast. And it's the same thing for the web server side of it.
So at that point, I was like, well, Amazon's kind of a shoe-in here. I love them, but it's a, I can't beat them, so I'm joining them kind of thing. They've got a 10-year lead on people, like Azure and GCP are just way behind. And this isn't being mean, this is just where we're at.
So one of the very basic things that you need when you're deploying is determinism. You don't want to be clicking around in a web console to deploy your stuff, because if you have a team of more than one, somebody's going to click something wrong, and you're not going to know what's going on. So we have a concept called infrastructure as code. It's very similar to a package JSON. So in a package JSON file, I say, "These are my code dependencies, and these are the versions I expect." With infrastructure as code, I'm saying, "These are the cloud resources I need, and this is what I expect." And I check it in to my repo, and then the next guy's running the code, or girl, it's going to get the exact same thing.
And so infrastructure as code is table stakes for me. I will not build a system that I can't reproduce within a minute and a half, from a computer I've never touched before. The other clouds are barely there. The other clouds don't even have a concept of ephemeral compute. They've got these long-lived Kubernetes container type things, which they call all serverless, but they're not really, and I just don't have time for that. They'll catch up in 10 years, and when they do, maybe I'll make my workload portable to them.
But in the meantime, I'm trying to get shit done, and AWS is a very safe choice. People will say, "I want to use the most popular cloud vendor." If you do, well that's AWS. And yeah, it's going to be janky and tough to figure out what to do, so you're probably going to need a deployment framework. But there's tons of those, and it's very easy to get started, truly.

**Sean:**
Yeah. I know there's some sort of infrastructures, I think Terraform is one infrastructure as code, or we can go cross cloud, I'm just curious if you've ever considered that? Or are the analogs to Lambda and DynamoDB just not what you'd want to be able to have it go cross cloud?

**Brian:**
Yeah, so Terraform is cool. It came a few years after cloud formation, so it's actually a little bit of a later introduction to the discussion, but it always gets the hype, because people are like, "Let's cross cloud." It's cross cloud, but the primitives it exposed are not.
If you're going to build a Kubernetes cluster on GCP, you can't just copy-paste that and have it run on AWS. You got to write brand new Terraform. So there's zero reuse across these clouds, other than there's a similar syntax for the HTML files.
At which point, I would say, "Why are you introducing a third-party?" You might as well use cloud formation on AWS, and whatever GCP comes up with in five years, and that will be probably a little bit closer to the metal, it'll be faster, it'll be better maintained, you won't have a third-party in the way. And this isn't to say Terraform is bad or something. It's great, and it's extremely mature, and it's hella good, and all about inference code. It's better than nothing. But if you're already all in on Amazon, I think you probably want to go with the native solution.

**Sean:**
Yeah, that makes sense. It's a bet that you won't regret up making. Just to, I guess, come up out of the weeds for a little bit, and think about it from a high level, what do you think about, how is this going to impact how developers make web apps in the future?

**Brian:**
I thought that we'd be doing a little bit more of this by now. There's been a lot of resistance to the idea of this, and I think that's good. Skepticism is healthy.
We're in the fun part right now, frankly. There's no consolidation, there's a million options, everybody's shouting at each other, there's a ton of diversity. On one hand, you've got this crowd that's obsessed with load balancing their monoliths with Kubernetes now, instead of something else like OpenShift. And on the other hand, you've got these serverless folks, and we're all like, "Don't do that. Just write your code, and deploy it, and let it scale itself."
I think the future here is always moving up the stack, it's not getting more complicated. So, to me, it's a given, we're going to end up just writing pure functions, and they're going to scale for us. And I feel the momentum is showing that. There's more and more startups that are embracing this way of building.
The data face is still a huge sticking point. Dynamo solved this almost 10 years ago, and yet people are scared of it, because they're worried that Amazon's going to pull an Oracle, and start charging them an arm and a leg out of nowhere. And maybe they're right, maybe they're wrong, I don't know. But what I do know is I've got a job to get done, and Dynamo's going to do it without bugging me in the meantime, so I'm cool going there, but there's still a ton of resistance.
I personally think cloud functions, manage database, infrastructure as code are the pillars for building a modern app. I think HTML's the easy part, frankly, and that we really over-index on that side of the tooling. I think it'll be indicated with time, but I don't know when that time's going to come.

**Sean:**
Do you think there currently are legitimate limitations to adopting progressive enhancement, and Enhance right now? Or do you think most of the resistance is just, like you said, people aren't ready to fully commit into a DynamoDB stack?

**Brian:**
Yeah. Well, there are legitimate reasons, like experience is one of them. If you have none, you're going to have to build that up. And if you're a shop that's trying to get something done, and all you know is Create React App and a Kubernetes cluster, then you're going to do that. And I think that's totally okay.
I think, at a certain point, the economies to scale are going to hit, and you're going to want to get with the program a little, and start doing things a little more efficiently. But, in the prevailing time, it's perfectly okay to use the tools that you're comfortable with. I just wouldn't say that, just because you're comfortable with them, doesn't make them always a hundred percent right.
And the same goes for if you're big on the serverless thing, or whatever, maybe there's political reasons. Maybe you're Walmart, you're not going to adopt Amazon if you're Walmart, and that's fine, don't then. Maybe you have really rigid data at rest compliance requirements that preclude you from using particular databases, because you have to actually have a key to the data center and be able to walk in there at any moment and serve a warrant or something. And those use cases happen more than people know, especially with sensitive data like medical or finance data.
It's not really a clear cut thing. I think everybody wants a context free, this is the right way to do things, answer, and of course it doesn't exist. But I think for the grand majority of an app that renders an HTML page, that maybe submits a form that talks to a database, you would be very well served to look at a functional web app architecture. But if you've got these extraneous political, cultural or friction points, then do what you got to do.

**Sean:**
Yeah. I guess, like all things, there are trade-offs. And I'm curious if you can offer us a little bit of what might be on the roadmap in 2023 for Enhance, and just what does the future look like?

**Brian:**
We're with the developer community in being excited about the idea of streaming. But, where we differ is we don't think it's the initial render where it matters.
Right now, a lot of people are very excited about edge streaming. And this is nice if you have a slow database. If it takes a while for the database to get the information, then it's pretty cool to be able to stream bites. But, just like a big loading spinner on your page, this is still not actually a very great experience. And if you have a slow database, HTML is not going to fix that.
So in our view, if you have a slow database, you should use a fast one, like Dynamo. And the place where streaming gets exciting is real-time, so podcasts, or chat apps, or that kind of thing. And the primitive for that is WebSockets.
We've got a prototype that's cooking, and we should have available and begin this year, for building real-time apps, using Socket streaming for the rendering. And it's pretty nifty, so we're excited about that. Definitely brand new territory, serverless WebSockets is a barely recognized concept.
Amazon actually solved this years ago, like 2018. And the idea is that you get three lambdas, you get one to connect, you get one to disconnect, and you get one for default message passing. And they go away, but you get a little bit of session state with it, so you can keep ... It feels like the connections are kept alive, even though the compute is completely ephemeral and stateless. You can build really cool things with that. So anything real-timey is on the radar for us.
The other big theme for us is privacy and control. Twitter, this year, has been a pretty good example of how centralized systems maybe aren't super great, and people are flooding to places like Mastodon, and the indie web at large. And we think one good thing you can do for yourself is to have a domain, and you should probably have your own domain you control, that you deploy to, and you can do your own thing with.
And so we're looking at expanding into indie web type primitives, for Begin in particular, built on top of Enhance. So protocols like Webmention, or ActivityPub, which Mastodon on is built on, we see that as a pretty exciting future. And a real one, like a practical one, not a fake Bitcoiny one.
Those are the things I'm thinking about a lot lately, web standards, open source, decentralization, real-time.

**Sean:**
Yeah, those are super exciting. The real-time stuff, does DynamoDB have streaming features that's building off of?

**Brian:**
Yes. Yes. So when you write a record to Dynamo, you can have a Lambda function sitting there listening to it, and you can listen to particular events, or you can listen to all of them. And so you could imagine, when a new user gets entered into that user's table, it's a really good time to send an email, and when someone joins a chat room, and does that little thing at the bottom, it's like, "Join the chat room." A game, a perfect use for DynamoDB streams.
Dynamo's got another serverless feature, that people actually don't really talk about a whole lot, and I love it. It's got an idea of a TTL on the row, so you can have data that scales to zero. And that sounds like a weird thing, why would I want that? Well, there's lots of reasons. One of them is like sessions. When you're on a website, and you're browsing around, the website doesn't know who the hell you are, we have to use a cookie to keep track of you, but a cookie is really a small place, and it's an insecure place. A better way is to have an identifier that uses the database to track you, and a whole bunch of stuff opens up if we put this on the back end. Yeah, Dynamo for streaming is good.

**Sean:**
That is super cool. Yeah, so I'm excited to keep looking out in 2023.

**Brian:**
You know what else it's good for? Logs. Which LogRocket does, I hear.

**Sean:**
Yes, we definitely are big users of logs, it's right in the name there. It's been really great to have you on. We're excited about Enhance. And is there anything else, before you go, anything else you want to plug, or let our listeners know about?

**Brian:**
Well, join the Enhance Discord, and check out enhance.dev. Build an app, and find me on Twitter, or Mastodon, and yell at me if you find anything wrong with it, or if I could make something better.

**Sean:**
Awesome. Sweet. Yeah. Well, thank you so much for coming on.

**Brian:**
Yeah, thanks for having me, Sean.

