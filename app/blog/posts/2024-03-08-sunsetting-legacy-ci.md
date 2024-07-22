---
title: "Sunsetting Begin’s legacy CI service"
image: '/_public/blog/post-assets/arc57.png'
image_alt: "Sunset"
category: begin
description: "Learn more about how to migrate to Begin Deploy, AWS, or other services"
author: 'Brian LeRoux'
avatar: 'brian.jpg'
mastodon: "@brianleroux@indieweb.social"
published: "March 8, 2024"
---

In late 2022 we [announced a next-generation version of our service called Begin Deploy](https://begin.com/blog/posts/2022-08-31-new-begin-and-enhance-html-framework). As part of that announcement we also committed to continuing to keep our legacy CI service (found at ci.begin.com) online in perpetuity for existing users.

The legacy CI service is an expansive codebase authored around AWS SDK v2. Unfortunately, AWS has deprecated that SDK and is making it unavailable in Lambda environments in a few short months. This means we can no longer operate our legacy CI service without a large rewrite, and as a small startup we unfortunately do not have the resources to do so.

We would strongly prefer to continue operating our legacy CI service in perpetuity, but due to AWS’s deprecations, we must unfortunately announce that **effective May 1, 2024, Begin’s legacy CI service will no longer be available**. Any applications deployed using that service should migrate to Begin Deploy, AWS, or the service of your choosing.

**We deeply apologize for any inconvenience this transition may cause.** We understand the challenges that come with changes of this nature and we are committed to assisting you through this transition.


## Migrating to GitHub Actions

For remaining legacy CI users, we recommend migrating to GitHub Actions for your CI/CD needs. GitHub Actions offers a flexible, powerful alternative that integrates seamlessly with your development workflow. You can use GitHub Actions to deploy your app with Begin Deploy, or deploy it directly to AWS, depending on your project's requirements.

Learn more about [migrating to GitHub Actions](/deploy/docs/additional-resources/legacy-ci-migration).


## Migration assistance and resources

We want to assure you that the migration process will be straightforward. Our platforms have always prioritized backward compatibility and AWS portability, aiming to make transitions as smooth as possible for our users.

Our team is here to support you through this transition. We are linking documentation and resources to guide you in migrating your CI workflows to GitHub Actions below. Additionally, our team is available via [Discord](https://discord.gg/y5A2eTsCRX) and [email](https://begin-help.zendesk.com/hc/en-us/requests/new) to answer any questions and assist with any challenges you may encounter during the migration process.

We look forward to assisting you through this transition and thank you for your understanding, patience, and continued support!

- [Learn more about Architect backwards compatibility here](/deploy/docs/additional-resources/legacy-ci-migration#architect-compatibility)
- [Instructions for using GitHub Actions with Begin Deploy can be found here](/deploy/docs/additional-resources/legacy-ci-migration#migrating-to-begin-deploy-%26-github-actions)
- [Instructions for using GitHub Actions with AWS can be found here](/deploy/docs/additional-resources/legacy-ci-migration#migrating-to-aws-%26-github-actions)
- Please [sign up for our Discord ](https://discord.gg/y5A2eTsCRX) and find us in the #begin channel


## What happens if you do nothing

If you do not take any action, any applications deployed with Begin’s legacy CI service will become permanently unavailable on or after May 1, 2024.


## How we’re mitigating similar issues in the future

So as not to be impacted by future deprecations or breaking changes in the AWS SDK, we now maintain our own entirely open source AWS SDK for Node.js called [`aws-lite`](https://aws-lite.org). Learn more about it at [aws-lite.org](https://aws-lite.org). We are presently moving our systems over to utilizing `aws-lite`, and do not expect Begin Deploy to be impacted by any changes or deprecations coming out of AWS JavaScript SDK groups.
