---
title: "Building Underdark with Enhance"
image: '/_public/blog/post-assets/underdark.png'
category: uncategorized
description: "I sit down for a conversation with Jonathan Lipps who recently built and deployed his site, Notes from the Underdark, using Enhance."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
published: 'October 26, 2022'
---

![Underdark](/_public/blog/post-assets/underdark.png)

We love to hear about people building sites and applications with [Enhance](https://enhance.dev/). Today we wanted to introduce you to one such site, [Notes from the Underdark](https://underdark.quest/), created by [Jonathan Lipps](https://twitter.com/jlipps). Let's jump into the conversation we had with Jonathan.

**Thanks for speaking with me, Jonathan. Why don't you introduce yourself?**

So, what do I do? I work at a company called [HeadSpin](https://www.headspin.io/), which is in the test automation slash developer tools space. I'm the lead maintainer of a popular open-source test automation framework called [Appium](https://appium.io/). I've been doing this type of work for the last ten years, first at [SauceLabs](https://saucelabs.com/) and now at HeadSpin. Before that, I was a web developer for a long time, which ties into this conversation.

I do lots of other things that are not related to technology. I’m into [Dungeons & Dragons (D&D)](https://dnd.wizards.com/), but that's not been a lifelong hobby for me the way it has been for some. I produce music under various monikers (for example my band [Splendour Hyaline](https://splendourhyaline.bandcamp.com/)). I do a lot of outdoor stuff, like climbing and running and yoga and all the things you have to do when you live in Vancouver.

![Underdark](/_public/blog/post-assets/dnd-logo.jpg)

**You mentioned that you only recently got into D&D. What sparked your interest?**

I have always been super curious about it. I wrote more about the whole story on the [about page](https://underdark.quest/about) on the Underdark site. But basically, growing up in a very Christian Texas in the middle of the Bible belt, there was a lot of vague environmental antagonism towards D&D and related stuff, which I didn’t get, because I was always a huge fantasy nerd.

I thought, *"I guess I'm not allowed to do this,"* but I didn't understand the big deal. Then, because it wasn’t a part of my life growing up, and I didn’t get involved in it during college either, I sort of just missed it.

Then, I started listening to a bunch of D&D podcasts during the pandemic. I got started with [The Adventure Zone](https://maximumfun.org/podcasts/adventure-zone/), which a friend recommended to me and which is super fun. Then there's [Critical Role](https://critrole.com/) which everyone has heard about at this point. There's [Not Another D&D Podcast](https://www.naddpod.com/), which is pretty fun. I'm still relatively early on in that one. And then there's one I have queued up that a friend recommended that I haven't listened to yet, but he said it is quite good. It's called [Dungeons and Daddies](https://www.dungeonsanddaddies.com/).

![Underdark](/_public/blog/post-assets/podcasts.png)

Anyway, not only is D&D not somehow an objectionable hobby, but what I realized is that it is an awesome way to connect with people. D&D is a really creative hobby that includes problem-solving and teamwork. Listening to the podcasts, they had so many incredible moments and creative elements. I thought, *"I have to do this myself."* I don't want to just listen to people play games. I want to take part. It took me a while, but I finally found a friend of mine in Vancouver who was a veteran [Dungeon Master](https://en.wikipedia.org/wiki/Dungeon_Master) and had space to start DMing a new campaign.

So we got a bunch of other new players together and we’ve been doing that for a while, and this is what spawned the idea for Underdark. I thought, *"what would it be like to treat our sessions as the raw material for a story?"* I don't have aspirations for turning this into a novel (though I do aspire to write novels someday in general), but I just wanted to have some outlet for some creative writing. I thought it would be fun to write down the summaries of the sessions. Of course, if I'm doing all that work, I want to share it with people. So I needed a website, and so of course I had to go to town on the website.

**So why build your own website for Underdark?**

Basically, no big reason, I just wanted to, it's essentially a blog, but I wanted to develop it in a way that required a bit of customization. I didn't want to mess with WordPress plugins, because I have gone down that dark path before. Honestly though, it would not have been a good idea to build a custom site for this if I weren't a web developer. I wanted to play around, and I haven't built a web app in a while. I wanted to see how things have changed since I was last building web apps.

So I had this simple idea for a markdown-driven blog, where the whole content database is just flat markdown files with some metadata at the top of the file. Those files get compiled into the set of stories that have been published. Then I thought, this should be more like a wiki where you can have pages on individual characters or campaigns, and they're all linked together.

Also, since I've enjoyed listening to all these D&D podcasts, I thought, I should make this a podcast as well! I told myself that *"I don't think anyone will listen to it,"* but I wanted to see what it's like to publish a podcast just as an experiment. So then I needed dynamically generated XML, I needed to record these stories, and I needed to write some music. It just kind of snowballed. You have to do everything, right? Building your own CMS is never the right idea unless it's for fun, right? So I built my own CMS, essentially.

**I think everyone should build their own CMS at least once in their life, if only so they never want to do it a second time. When you were starting to develop this website, what drew you to Enhance? Was it a timing thing where you had this idea and Enhance dropped relatively simultaneously?**

I had heard about Enhance just before the big reveal at [Cascadia.js](https://2022.cascadiajs.com/). I had previously just started a project with [Architect](https://arc.codes/). That project got superseded by Underdark, but it was also fantasy related. I had this idea for a text-based, party-based dungeon crawler in Discord, like a Discord role-playing game (RPG). You would get four or five people together of different classes and abilities and go through a dungeon, level up and stuff like that. So I started working on this game, and my technical goal for that project was to use a serverless architecture. The last time I did web apps, serverless existed as a concept, but it wasn’t really a very popular design yet, and I was still much more comfortable just spinning up a Linux box with Nginx and Node and doing it the whole full stack way. So with this new project I wanted to finally wrap my brain around serverless by building something, since without that concrete experience I felt pretty limited in how well I could understand it.

So I decided I should use Architect because, well, basically, I follow friends like [Brian](https://twitter.com/brianleroux) and [Fil](https://twitter.com/filmaj) on Twitter. They're always talking about Architect, and I thought, well that's the tool that I should experiment with.

It was a great experience. I received some very helpful hand-holding on the Architect and the Enhance Discords. With that help, I was ultimately able to get a TypeScript-driven Discord bot running. I didn't complete the game that I had designed, but I got it to an I/O proof of concept. You can create a new character, and the character has stats and stuff. Anyway, while I was getting stoked on all of that, I went to Cascadia.js.

**As an aside, I would definitely play that Discord game.**

I hope to come back to it because it's a cool idea. There are some other fun Discord games out there, and I think this one would be unique and interesting too.

Anyway, a big theme of Cascadia JS was that the open standard web has all the tools you need to make awesome applications.

I've used a bunch of front-end frameworks. I've used React, and one of the things I still maintain is called Appium Inspector, an electron app that lets people drive Appium sessions. It's quite a complex desktop-style app.

I started it five or six years ago, so it's all React and Redux. It was just the recommended, very complex front-end architecture du jour.

**Ah yes, whatever was the new hotness at the time. The latest fashion in JavaScript is the way that I've been describing it for years.**

Yeah, it sometimes gets to be a bit much to keep up with all that stuff. Then I'm hearing folks at Cascadia.js talk about, here's what you can do with CSS now, like on its own without resorting to [Sass](https://sass-lang.com/), and here’s what you can do with JavaScript now and web components.

That inspired me. I want to do that, and what am I into right now? My D&D campaign. It would be fun to publish, and Enhance had just come out and was promoting the same kind of message about quickly making personal sites that didn’t need to leverage the huge amount of complexity in JS frameworks that was out there.

I hadn't done a standard web, pure JavaScript, and pure CSS web app in a while. I wanted a solution with no transpiling, no CSS, no JS, and none of that stuff. That was enough for me to give Enhance a shot, so I did. And as you know I was in your Discord for a week, working through the kinks.

So that's why I chose Enhance.

**What were the good points of Enhance? What did Enhance make easy for you?**

It's a convention-based framework. It's easy to understand where to put your files for them to become APIs, routes or components. The file-based routing is very convenient, and of course this is table stakes nowadays. But you don't have to do it from scratch.

The fact that it was all built on top of Architect means it just works on a bunch of different levels, and I had already experienced the power of Architect so I was ready for that.

Enhance has a great developer experience, where you save a file, and it hot reloads. That's something that we've come to expect in our developer tools, but Enhance’s version of it felt simple and bombproof. I’ve definitely had hot reloading not work as simply or as well in the context of other tools, e.g., Webpack. It’s also amazing that with Enhance you can develop your app locally with local services, then run one command to deploy to AWS and have it just work.

You still have to do a few things manually in AWS, like managing domains and SSL certificates. However, once you hook that up, it's pretty cool. You don't have to know anything about serverless, really, for all of this to work. You just have to follow the conventions of writing API functions that return data, and writing functions that return pure HTML strings that generate your markup.

So that's all super straightforward. What else did I like? I felt like it was easy for me to build my site in a compositional way. I could think in components and how they are built of smaller components. It was cool that I didn't need any client-side JavaScript, as Enhance would expand my custom elements for me inline, so at the end of the day it really kept the HTML and JS file sizes small while giving me the freedom to develop in a totally compositional, encapsulated way.

That was a huge win!

It was also just really fun to go back to basics. I feel like I learned a couple of things about HTML that are new within the last five years and a couple of things about CSS that are new as well. I didn’t have to reach for a custom solution for anything. These things are now just part of the standard, which is pretty sweet.

**Was there anything about Enhance that was confusing to you?**

Some of the things that were a little confusing or were gotchas were that it took me a while to rip out the Enhance stuff that already existed. That tends to be my preference. I don't usually scaffold. I typically try to understand how you add specific files and code and then write things from scratch. That feels cleaner to me, somehow.

I spent a while modifying the existing `styles.css` and saving it, but then having all my changes go away before I realized, oh, this is an auto-generated file that I shouldn’t edit. That was probably documented somewhere.

It was also a little challenging to figure out how to serve an XML `content-type` because it wasn't documented what attribute to return the data on if you didn’t want to respond as a typical API route does with JSON.

> **Editors note**: That functionality is documented over on [arc.codes](https://arc.codes/docs/en/reference/runtime-helpers/node.js#responses) and we are constantly working on improving Enhance docs.

**Any final thoughts?**

Just that I’m a big fan of what you guys are doing. I'm probably not a good judge of comparing Enhance to x, y, z or other approaches. Enhance was something I saw that I wanted to try, but I didn’t have a lot of deep experience with whatever the competitor frameworks might be.

Overall it was a great experience. It feels like for the project that I had, it was a great tool for the job. I think I could also push it to some greater complexity if I needed to. I'm not doing something that has a complex backend. I chose for my backend to be flat files, super simple.

But, I could see how I could make a dynamic data-driven, web-based application using the same set of tools. And so, yeah, I would probably reach for Enhance instead of React or whatever if I were starting another similar project on my own.

**Thanks, Jonathan. I really appreciate the chat. We'll talk soon.**

Awesome. Thanks, Simon.
