---
title: "I just wanted to buy pants. How excessive JavaScript is costing you money"
image: "/_public/blog/post-assets/pants.jpg"
category: enhance, webdev, webcomponents, lit
description: "A cautionary tale about our over dependence on client-side JavaScript."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "January 24, 2023"
---

![Pants](/_public/blog/post-assets/pants.jpg)
<small>Original photo by [Hermes Rivera](https://unsplash.com/@hermez777) on [Unsplash](https://unsplash.com/photos/F4qWxfcd5I0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
</small>

Before the holidays, I was in the market to pick up a new pair of dress pants. Like you, I was pressed for time juggling work, family and social obligations, so I leaned on a time-honored tradition of people with more programming knowledge than fashion sense. Buy the same pair of dress pants you have, but this time in a different color. Unfortunately, this was only the beginning of my journey and involved more of my technical skills than should have been required to buy a damn pair of slacks.

## Buying Pants

Since I already knew what pants I wanted, I headed to the multi-national clothing store’s website. I quickly added the item in the color and size I wanted to my shopping cart. I started the checkout process by providing my first and last name. Then I was presented with one of those address fields that suggests a list of addresses you can select as you start typing. I clicked on the correct address, and it filled out the address, city, province and postal code fields for me, which I appreciated as it saved me some typing. Then I filled out my credit card information and clicked *"Purchase"*.

The purchase failed, and the form reported that I needed to fill out my first or last name. Weird, that’s literally the first thing I did, and visually, I could see my name in both of those fields, but whatever, I re-typed my name and clicked *"Purchase"* again.

It failed for a second time with the same error. At this point, I thought that it must be a problem with my ad blocker as it [occasionally](https://ilakovac.com/teespring-ublock-issue/) [causes](https://experienceleague.adobe.com/docs/commerce-knowledge-base/kb/troubleshooting/known-issues-patches-attached/checkout-pages-not-loading-when-ad-blocker-is-enabled.html?lang=en) [issues](https://github.com/braintree/braintree-web/issues/402) with shopping carts, even though your checkout experience should work even when your user has an ad blocker. So I disabled my ad blocker, refreshed the page, filled out the form again, and clicked on the *"Purchase"* button one more time.

Same. Damn. Error.

> *"The definition of insanity is doing the same thing over and over again and expecting a different result."*
>
> [Probably not Albert Einstein](https://quoteinvestigator.com/2017/03/23/same/)

## Digging into someone else’s website

Now that I could reproduce the error with the ad blocker turned off, I formulated a theory of what was wrong with the site. I surmised that the input fields for first and last names must be a [React Controlled Component](https://reactjs.org/docs/forms.html#controlled-components) that wasn’t correctly updating React state with their input values. At least, that was my guess based on no evidence other than my twenty years of experience building for the web.

So I opened the dev tools in my browser, navigated to the network control panel, selected JavaScript in the filter and reloaded the page. The total amount of JavaScript loaded by this checkout page:

<div class="flex justify-center font-bold text5 mt2 mb2">
4.7 MB of JavaScript
</div>

That’s right, 4.7 MB of JavaScript code was downloaded, parsed, interpreted and compiled so I could fill out a form. If you think that sounds reasonable, I’ve got news for you. It isn’t.

Being presented with 4.7 MB of obfuscated, minimized JavaScript code, I decided it wasn’t worth the effort to debug the root cause of the issue. Instead, I figured I could disable JavaScript and submit the HTML form, have the server side do validation and fulfill my order. So I turned off JavaScript and refreshed the page.

Nope, nada, zippo, zut, nothing. No HTML form fallback. Instead, all I got was a blank page. There was no way to checkout without JavaScript.

## Am I being unreasonable?

At this point, I have to ask the question, _“Am I being unreasonable in expecting the site to work with JavaScript?”_ I mean, [everyone has JavaScript enabled, right](https://kryogenix.org/code/browser/everyonehasjs.html)?

As the above link indicates, there are many reasons why JavaScript may fail in a browser, including but not limited to ad blockers and corporate firewalls. Even without JavaScript, the website owners could have provided an HTML form-based fallback solution so that I could still order my pants. You might think that’s a ton of extra work (it isn’t), and there is no precedence in the real world.

Except there is, and it is called a Credit Card.

![credit cards](/_public/blog/post-assets/credit-cards.jpg)
<small>Original photo by [Avery Evans](https://unsplash.com/@averye457) on [Unsplash](https://unsplash.com/photos/RJQE64NmC_o?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
</small>

Credit cards are a real-life progressive enhancement success story. When credit cards were first introduced, they used these clunky carbon copy swiper machines to make a copy of your credit card number. You then signed the original receipt, which you got to keep with copies going to the store and the bank.

![carbon copy](/_public/blog/post-assets/carbon-copy.jpg)

> I told my daughter that this is how things used to work, and she looked at me like I was nuts. If you are of a certain age, you will fondly remember the [chu-chunk sound](https://www.youtube.com/watch?v=HB81UgdqgT0) these machines made.

Later on, a magnetic strip was added to reduce the paperwork needed to record the transaction. Then it was followed up by the chip and pin approach and finally where we are today with tap to pay. Credit cards have gotten progressively easier to use and more secure.

However, if something goes wrong with the tap-to-pay reader, you can always use chip and pin instead. I’ve seen places drag out those old carbon copy swipers in some rare cases, like when the power is out.

They’ve got it figured out. Once you decide to give them money, they don’t give you any reason not to spend it. So why do we give folks a reason to leave our websites without completing their purchase when we have a reasonable fallback?

## Is this common?

Sadly, yes.

[Canadian Tire](https://www.canadiantire.ca/en.html) is one of my frequently visited retailers, especially during the pandemic. For those of you who are not familiar with Canadian Tire it is a big box store. It sells more than tires just like Wal-Mart sells more than just walls.

Taking a quick look at its checkout page, I see:

1. 4.5 MB of JavaScript loaded
2. Shopping cart information doesn’t load when ad block is enabled
3. Blank white screen when JavaScript is disabled

Nintendo eStore?

1. 4.5 MB of JavaScript loaded
2. Works with ad block enabled
3. Blank white screen when JavaScript is disabled

Home Depot?

1. 4.5 MB of JavaScript loaded
2. Works with ad block enabled
3. Blank white screen when JavaScript is disabled

The above is **unacceptable**. Large code bundles correlate to longer load times. Longer load times lead to [smaller conversion rates](https://www.cloudflare.com/learning/performance/more/website-performance-conversion-rates/). Maybe major brands like these can afford to drive away customers but can you?

## Where do we go from here?

First, start [performance budgeting](https://addyosmani.com/blog/performance-budgets/) your sites to avoid adding excessive amounts of JavaScript.

Second, test your site with an ad blocker turned on. Recent reports indicated that [26%](https://www.statista.com/topics/3201/ad-blocking/#topicOverview) to [40%](https://www.insiderintelligence.com/insights/ad-blocking/) of web surfers use an ad blocker. You don’t want to drive customers away because your checkout flow depends on some third-party JavaScript that is routinely blocked.

Finally, if you are building an eCommerce site, think about building out HTML first to ensure that there is always a way for people to pay you. I hear that’s an essential step in making money. If you are thinking about building a new site, why not give the HTML first framework, [Enhance](https://enhance.dev/docs/) a spin?

Oh, and I never did buy those pants.

## Addendum

Since my epic failure to secure some pants, the multi-national retailer has fixed the bug that prevented me from completing my order. They’ve also slimmed down the total JavaScript payload from 4.7 MB to 2.3 MB, which is an improvement but still not great. It still doesn’t work without JavaScript.
