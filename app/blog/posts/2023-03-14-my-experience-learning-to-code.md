---
title: "My Experience Learning to Code"
image: "/_public/blog/post-assets/hedge-maze.jpeg"
image_alt: "Hedge Maze"
image_site: Unsplash
image_site_url: "https://unsplash.com"
photographer: Tobias Rademacher
photographer_url: "https://unsplash.com/@tobbes_rd?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
category: beginner, learning
description: "About 10 years ago, I built my first site using the web. A few years after that, I made it a goal to do it professionally. Since that time, the number of developers worldwide has grown by roughly 5-10X. Which means most of us are new here. Early on, I read anything I could find sharing how others learned to code."
author: 'Ryan Bethel'
avatar: 'ryanbethel.png'
twitter: "ryanbethel"
mastodon: "@ryanbethel@indiweb.social"
published: "March 14, 2023"
---

About 10 years ago, I built my first site using the web.
A few years after that, I made it a goal to do it professionally.
Since that time, the number of developers worldwide has grown by roughly 5-10X[^1].
Which means most of us are new here.

Early on, I read anything I could find sharing how others learned to code.
Some were helpful.
Some were not.
I hope this is helpful.
But to be clear, this is not meant to be prescriptive or motivational.
Everyone's experience is very different.
There are a lot of thought pieces lately by long time industry experts about the rise and fall of frameworks etc.
This is not that.
As I said, I am relatively new here.
These are just observations from my own experience.

## TL&DR

One of the biggest challenges in learning to code on my own was choosing what to learn and how to invest my limited time and resources.
Learning to code, as I experienced it, was a very non-linear process.
I felt utterly stuck for long periods, followed by sudden breakthroughs where all the pieces fell into place.
I chose early to invest heavily in learning React.
Looking back, I would do that differently.
One especially true paradox in coding is that it takes much longer to master, but less time to be productive than you think.
I got stuck for a long time on the content consumption treadmill taking course after course.
A better use of time is creating more real things that people use, even if they are just for yourself.

## Background

I started my career as an engineer doing integrated circuit design.
I did no web development, but I did use scripting languages like PERL, source control (before there was Git), and vim was my daily driver.
Later that technical foundation helped accelerate my learning.
But after just a few years, I burned out in that job.
I made a career change away from tech completely for the next 12 years.

![I gotta get outta here, I think I'm gonna lose it.](/_public/blog/post-assets/get-out-of-here.gif)

For most of those years, I worked on a small specialized team in a much larger organization.
I was a guide leading outdoor trips like whitewater rafting.
As I slowly recovered from burnout, I realized I had missed working with technology.

![This isn't so bad](/_public/blog/post-assets/working-outside.gif)

As our team grew, we needed some tools to manage our trips, but we had no budget and no resources to get them.
So we decided to build them ourselves.
Building and maintaining those internal tools became a part time job for the next couple of years.
Initially it was all about making things work any way I could.
This was low code, no code, just get it done.
I built many small websites and single purpose web apps to serve our teams.
It was fun.
In my mind, I could never build a "real app", but I could make a thing people could get to with a URL to do what they needed.

I would not have called myself a developer at this point.
But when I decided to make this my career, my pragmatic technology choices were suddenly clouded by asking myself how a real developer would do this.
That might have been a good question if I knew the answer, but since I did not, it led me to overcomplicate things with tools I saw people talking about on Twitter.


## My Goal

I had two goals in learning to code.
First, to become proficient in solving problems using the web and second, to get a job as a developer.
There is a big difference between those two goals.
They are often completely at odds.

Hiring in this industry is broken.

[Interviews are broken](https://par.nsf.gov/servlets/purl/10139106).

If you are here to find my advice on how to get a job, I am sorry.
I wish I had answers, but I don't.
And I am not the right person to write that post.

If, on the other hand, your goal is to build useful things, I can point out some mistakes I made that will hopefully save you time.
The biggest mistake was not resisting the urge to follow what is popular.
This is hard to do because it feels like a shortcut to credibility, but these fads die as fast as they are born.

A podcast host (who I greatly respect still and will not name) recommended people learn Gatsby and GraphQL to advance their careers.
I followed that advice.
Recently, he was dumping on both of those tools on that same podcast.
Few things feel as bad as spending months or years to learn Gatsby only to watch it become a punchline.
That is the danger of chasing the hype train.
To be fair, this is complicated.
I do think that some of my early job opportunities came from having React, GraphQL, and Gatsby on my resume.

## Finding time

So I decided to get serious about becoming a developer.
But I had a full-time job and a family.
Bootcamp was not realistic, so I had to find a different way.
My solution was to wake up early.
Before my family was up and before work started, for about two years (give or take), I woke up around 4 am to spend about two hours learning before my normal day started.
I do not endorse this.
I was sleep deprived and unhealthy because of it.
If you are trying to make space and time for a career change, don't neglect your mental health, physical health, or family.
If you do you might reach your goal and find it is not all you hoped it would be.

![Thanks Mario but our princess is in another castle](/_public/blog/post-assets/another-castle.png)

Another way I supplemented learning was by consuming all the web dev content I could find.
I didn't care what was popular, but I did take what was popular as a proxy for what must be good.
I had no other sources.
I didn't even know anybody in the industry personally.
Twitter, podcasts, and blogs were what I had.
So I immersed myself in the web dev communities there.
Watching, listening, occasional DM's, but rarely making any noise myself.
I listened to a steady diet of content while driving, washing dishes, mowing the lawn, etc.
Like learning a foreign language by watching films without subtitles.
It is not the fastest way, but it is one way to make use of unfocused time. If I heard something like "DOM" come up repeatedly I would make a note to study that up when I had time.


## What to learn

Choosing what to learn on your own is like writing the curriculum for Calculus without any perspective of what is most important and what order to put it in.
You don't know enough to do it well, but you have a sense that many people suggesting an answer have ulterior motives.
Prior to this, my first real app was four HTML pages with forms served with JavaScript from Google Apps Scripts (GAS).
The database/backend was a Google Sheet.
I cobbled it together knowing almost nothing about web dev.
I copy/pasted most of my code.
I used Bootstrap to make it look decent.
But now I wanted to be a professional, so this approach wouldn’t do.
Everything I heard from my steady content diet said I had to choose Angular or React to be a pro.
This was around 2016, so Angular was the industry leader and React was the new kid.
No one (that I heard) was even suggesting you could build for the web without a framework.
This was right during the Angular to Angular 2 transition that created a lot of negative sentiment toward Angular.
That was enough to tip the scales for me toward React.
So I went all in.
From then on I narrowed my content consumption and learning heavily to React.
React only grew from there.
Which confirmed to me I had made the right choice.


What I didn’t realize at the time was that many professionals just mind their business and do their job quietly.
Their opinions are underrepresented on Twitter.
Some of the most vocal people online are trying to look like professionals.
Frameworks are still a huge industry, but a growing community is pointing back to using the platform with fewer layers of abstraction.
I did not find this community until I was already working with an agency that placed React developers as contractors.
I was starting to see the problems with jamming every website into a React shaped box.
Even simple tasks required dozens of dependencies (meaning hundreds or thousands of sub-dependencies) that would break frequently.
The simplest “Hello World” required complicated and fragile tooling setups.
And the list goes on.


The lesson I learned from my long framework detour is I wish that I had invested more time in learning the underlying fundamentals of the platform first.
Whatever the hot framework is next year will be built on those same fundamentals.
If you feel like you need to learn the blazingly fast, awesome DX, Kerplunk framework to get a job, then you should do that.
But you can learn it faster and better knowing the bricks that it is built out of.


## How to learn

I was not in tech at the time I was learning.
We did not have a family budget that allowed for throwing money at this problem.
Then, like now, there was no shortage of paid content (courses, books, etc.) promising shortcuts.
I was not opposed to spending some money, but I started with all the free resources I could find.
Here is a sample of the material I used to learn.
It’s only a partial list, but these are some of the better sources I can recommend.
I will not list the junk content I encountered but suffice it to say there is a lot out there.



* [Learn Enough](https://www.learnenough.com/courses) -I started with these short tutorials about web development topics to fill in some gaps. They are paid courses now. At the time, they were being developed, and the drafts were free. It's been years, and I think they were even sold to another company. I used these kinds of tutorials to fill in the gaps of HTML, CSS, JavaScript, Git, etc.
* [freecodecamp.org](https://freecodecamp.org) - Free education content. Can't speak highly enough of this organization. I did not follow through their curriculum as recommended but I read and used a lot of the pieces.
* [Frontend Masters - Brian Holt React Course](https://frontendmasters.com/courses/complete-react-v8/) - Frontend masters is a fantastic educational resource for professional development. It is paid and pretty expensive. It is targeted at  developers with existing experience trying to learn a new thing. They offered a free weekend preview or another promotion that I took advantage of. I binged the course because it was only free for the weekend. It was like drinking from a firehose. I have always liked to learn by jumping in the deep end, especially where the risk of failing publicly is low. Frontend Masters is great. I highly recommend them. Their courses are excellent. But as I mentioned they are not really targeted at or priced for beginners, so beware.
* [Wes Bos](https://wesbos.com/courses) - The first web development course I paid for was Wes Bos's Advanced React course. Should I have started with his beginner React course, or better yet, his Beginner JavaScript course? Probably yes, but as I said I like to jump in the deep end. Wes is great. He is a good teacher and his courses are worth the time and money.


## A winding path

Like many complicated things, learning to code is not a linear process.
Looking back, I can see the path I should have taken that was unclear when I first started my journey.
My experience is no different from the many people who are learning these skills independently.
Few industries approach similarly hard things without a university/college program or a skilled mentor (i.e. new electricians work under a master electrician, or a new wilderness guide works under a seasoned veteran guide) to teach them.

When are you a developer? I cannot say.
Some gatekeepers guard the term jealously.
But if you build things for the web and that is what you want to be, own it, and then make it true.
There will always be more to learn.
I distinctly remember a moment when I suddenly had this insight: _"Oh, so a Promise is just like a regular Object, and the value just drops in sometime in the future"._
So many things clicked into place with that one thought.
Was I a developer before then with such an incomplete mental model of asynchronous programming? Am I one now with all the things I have yet to learn? The answer to both questions is _"yes"_.
But the most important thing is that I have learned how to learn what I need when I need it, so yes, I call myself a developer.



## Build real things

At one point, I wrote a small web app to manage some data for my team.
It was a basic HTML page with forms served from [Apps Script](https://www.google.com/script/start/).
When I was later learning React, I figured out a way to rewrite it with React and serve it from GAS.
Which was not easy to do, and I may be the only one who ever figured out how to do it (probably not, but I felt like a conqueror).
I had accomplished something worthwhile.
Now we could do so much more with this tool since it was written in React like a professional web app.
In reality, this was wasted effort.
In fact, this made the app more fragile and harder to maintain.
But I would not have seen that unless it was a real app used by real people.


Building real things is the most critical part of learning to code.
Building sample apps is helpful for learning concepts, but problems only show up with real use.
If you are on your own and don't have anyone to build things for, it is even useful to build things for yourself.
Simple tools, scripts, web sites, can turn into powerful feedback loops for learning if you use them to do a job.
Look for those opportunities wherever you can.


## Conclusion

Getting clear on your goals is essential.
Becoming a professional web developer on your own is a slog.
You should know that.
And anyone who says otherwise is lying.
If your goal is to solve problems using the web, it is much more achievable.
Don’t get lost learning the next big thing.
I wish I had focused on learning the fundamentals of the web platform earlier on.

I ultimately think that the modern web development hype cycle is driven by exploiting the insecurity of developers.
Looking back on my journey, I realized that when I was in that cycle, I felt the urgency to learn the next thing: React, Redux, GraphQL, Gatsby... because I felt like I could get the basics and put those words on my resume I stood a better chance of finding a job.
It was because I felt genuinely learning the fundamentals was out of reach, and I needed to keep up with the latest thing to stand any chance.
Now I don't feel that urgency, not because I feel smarter, but because I know enough, and I can learn anything I need to when I need to.

If you want to learn some web fundamentals check out these resources:
* [MDN:Learn Web Development](https://developer.mozilla.org/en-US/docs/Learn) - This set of articles aims to guide complete beginners to web development with all that they need to start coding websites.
* [W3Cx](https://w3cx.org/) - Master the foundational programming languages for Web development, HTML5, CSS and JavaScript.
* [enhance.dev](https://enhance.dev) - A tool that makes it easy to build functional web apps easier than anything I know of.

[^1]: That is taking GitHub user growth as a proxy for developers in general ([wikipedia](https://en.wikipedia.org/wiki/Timeline_of_GitHub))
