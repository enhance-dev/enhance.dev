---
title: Webmention Support in Enhance Blog Template
image: "/_public/blog/post-assets/webmention-1.png"
image_alt: "I didn't really decide that I wanted to be an astronaut for sure until the end of college. But even in elementary school and junior high, I was very interested in space and in the space program. I had
both male and female heroes. One was a high school science teacher who was very important in
encouraging me to pursue science. Because I was a tennis player, Billie Jean King was a hero of
mine. And the early astronauts, John Glenn and Neil Armstrong, were heroes of mine as well."
category: enhance, blog, webmentions
description: "We want to make it easier for folks to participate in the open and indie web. Our first step towards this goal was the publication of our Enhance Blog Template which enables you to publish your site and own your content. Our next step is adding support for incoming and outgoing webmentions to the blog template."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "April 19, 2023"
---

We want to make it easier for folks to participate in the open and [indie web](https://indieweb.org/). Our first step towards this goal was the publication of our [Enhance Blog Template](https://begin.com/blog/posts/2023-03-17-introducing-the-enhance-blog-template) which enables you to publish your site and own your content. Our next step is adding support for incoming and outgoing webmentions to the blog template.

## What is a Webmention?

A [webmention](https://www.w3.org/TR/webmention/) is a simple way to notify any URL when you mention it on your site. When you link to another site, you send it a webmention (if it accepts them). Conversely, when a site links to your content, you can provide them with an endpoint where they can send you a mention.

Let’s walk through an example of two sites supporting webmentions talking to each other.

* I have a website where I write short reviews about books I read. I really do at [bookrecs.org](https://bookrecs.org/).
* My friend Cole has his website where he also writes a review about a book we’ve both read. In his review, he includes a permalink back to my original review.
* When Cole publishes his article, his site automatically notifies me that his post has linked to my original post.
* My site verifies that Cole’s post contains a link to my book review and stores information about Cole’s post so I can decide whether or not to include it as a mention in my review.

That’s two independent websites talking directly to one another without needing a centralized service.

![it's magic](/_public/blog/post-assets/its-magic.jpg)

Sometimes the web is just magic.

## How it works

* Adds microformat support for [h-card](https://microformats.org/wiki/h-card) and [h-entry](https://microformats.org/wiki/h-entry).
* `/webmention` route to accept incoming mentions.
* `/admin` routes to approve incoming mentions.
* Scheduled function to send outgoing mentions

## Microformats

> [microformats](https://microformats.org/wiki/Main_Page) are HTML for marking up people, organizations, events, locations, blog posts, products, reviews, resumes, recipes etc. Sites use microformats to publish a standard API that is consumed and used by search engines, browsers, and other websites

When you send a webmention to a remote server, it will verify that your site links to the remote server. One way to make it easier for the mentioned site to display our webmention is to follow the h-card and h-entry microformats. The blog template will automatically wrap your blog post in an h-entry and include an h-card on every page.

### h-card

You’ll first need to provide the data for your h-card. Open up the file `app/api/h-card.json`, then add whatever information you feel comfortable sharing online. At a minimum, we suggest adding your name, photo and URL.

For example:

```json
{
    "name":"Sally Ride",
    "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sally_Ride_%281984%29.jpg/1024px-Sally_Ride_%281984%29.jpg",
    "url": "https://en.wikipedia.org/wiki/Sally_Ride"
}
```

> If you don’t have a photo hosted on the web we suggest you use your GitHub avatar which follows the format: `https://github.com/username.png`

See this [example](https://github.com/enhance-dev/enhance-blog-template/blob/main/app/api/h-card.json.example) of all the properties you can add to your h-card.json file.

### h–entry

When the blog template generates the HTML for your blog post, it applies the CSS classes required for it to be considered a valid h-entry.

```html
<article class="h-entry">
  <h1 class="p-name">h-card Test</h1>
  <p class="dt-published">April 6, 2023</p>
  <section slot="e-content">
    <p>Testing having a blog post that has a h-card and h-entry.</p>
  </section>
  <section class="p-summary hidden">Testing h-card and h-entry.</section>
</article>
```
> A quick explainer on microformat class names:
>
> - **p-name** - entry name/title
> - **e-content** - full content of the entry
> - **dt-published** - when the entry was published
> - **p-summary** - short entry summary
>
> For more information see [h-entry core properties](https://microformats.org/wiki/h-entry#Core_Properties).


## `/webmention` Route

The blog template will automatically add a `link` tag with a `rel` of `webmention` in the `head` of your application that points to your webmention route. This is one of the ways remote services can [discover your webmention route](https://www.w3.org/TR/webmention/#sender-discovers-receiver-webmention-endpoint).

This endpoint supports POSTing `application/x-www-form-urlencoded` content type and verifies that the incoming data has a `source` and `target` properties. If it does, the incoming webmention is accepted and stored in our database for approval in our admin interface.

## Admin Interface

### Admin password

The `/admin` route is secured with a password. To configure the password on your blog, you will need to create an environment variable.

![login to admin interface](/_public/blog/post-assets/webmention-2.png)


```bash
begin env create --env staging --name SECRET_PASSWORD --value yoursecretpassword
```

After you are logged in, the admin interface is where you can approve or reject webmentions.

![list of webmentions](/_public/blog/post-assets/webmention-3.png)

Once approved, a webmention will appear below the post it mentions.

![sample webmention](/_public/blog/post-assets/webmention-4.png)

## Outgoing Webmentions

By default, the blog template is set up to check for new posts on your site once per day. If it does detect a new post, it will inspect it for external links. Any external links found are checked to see if they accept webmentions. If the mentioned site does, a webmention is sent.

For high-traffic sites, you can increase this polling interval. In your app’s `.arc` file find the `@scheduled` section:

```arc
@scheduled
check-rss
  rate 1 day
  src jobs/scheduled/check-rss
```
Modify the `rate` property so the check is made more frequently. For example, this will check your site every hour:

```arc
@scheduled
check-rss
  rate 1 hour
  src jobs/scheduled/check-rss
```

The function supports any valid [rate expression](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html#RateExpressions).

## Further Reading

* Dig into the details of the [Enhance Blog Template](https://begin.com/blog/posts/2023-03-17-introducing-the-enhance-blog-template).
* [Customize](https://begin.com/blog/posts/2023-04-06-customizing-the-enhance-blog-template) the style of your blog.
* Grab a [domain name](https://begin.com/blog/posts/2023-04-03-begin-domains)!

## Next Steps

* Join the [Enhance Discord](https://enhance.dev/discord) and share what you’ve built or ask for help.
* Let us know what features you would like to see next. Maybe [POSSE](https://indieweb.org/POSSE)?
