---
title: Why you should roll your own auth
image: "/_public/blog/post-assets/blue-lock.jpg"
image_alt: "Photograph of a padlock"
photographer: "Georg Bommeli"
photographer_url: "https://unsplash.com/@calina"
category: enhance
description: "Conventional wisdom states that rolling your own authentication system can be a significant undertaking that requires a lot of expertise in security and web development. In most cases, using a third-party authentication service is better than trying to build your own from scratch. However, there are some cases where rolling your own auth may be beneficial."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "May 10, 2023"
series: "Enhance Auth"
---

Conventional wisdom states that rolling your own authentication system can be a significant undertaking that requires a lot of expertise in security and web development. In most cases, using a third-party authentication service is better than trying to build your own from scratch. However, there are some cases where rolling your own auth may be beneficial, such as:


## Customization

If your authentication needs are unique or require specific customizations, rolling your own auth may be the better option. Third-party authentication services may not be able to meet your specific requirements.

Leaving your application to show a third-party dialog can be “jarring” for your users. Most third parties offer limited customization options or provide you with an API to make the authentication calls yourself. At this point the effort to build your own system may not be much different than customizing a third party solution.

## Compliance

If your business operates in a highly regulated industry, you may need to comply with specific security and privacy regulations that third-party authentication services may not meet. In this case, rolling your own auth may be necessary to ensure compliance. Additionally, your application may have region specific regulations as to where the data must be hosted.

## Control

By rolling your own authentication system, you have complete control over the entire authentication process, from user data storage to encryption. This can be beneficial for businesses that need complete control over their authentication systems.

Two important points about control is that owning your own auth solution:



1. Allows you to avoid slow API calls to third party services to retrieve user information. Slow is a relative term, but a sub 10 ms query to your cloud hosted database will beat an API call every day of the week.
2. Retains ownership of your user database.


## Cost

Depending on your authentication needs and the volume of users, rolling your own auth may be more cost-effective than using a third-party authentication service. Third-party authentication services can be expensive, especially for large businesses with many users.

Overall, rolling your own authentication system is a viable option. Especially when you consider your own authentication requirements, compliance, control and cost issues. However, building your own auth requires specialized security and web development expertise, and the risks of building an insecure authentication system can be significant. Therefore, weighing the pros and cons carefully and seeking expert advice before deciding to roll your own auth is essential.

In other words,

![old man giving link a sword in the legend of zelda](/_public/blog/post-assets/dangerous-to-go-alone.jpg)

Starting next week, we are embarking on a series of posts to teach you how to safely and securely implement your own authentication solution.

1. Username and password authentication
2. Confirming email addresses and phone numbers
3. Magic links and one-time passwords
4. OAuth

## Next Steps

* Join [the Enhance Discord](https://enhance.dev/discord) and share what you’ve built or ask for help.
* Let us know what features you would like to see covered in our Authentication series.
