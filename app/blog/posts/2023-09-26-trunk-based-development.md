---
title: "Trunk Based Development"
image: "/_public/blog/post-assets/large-tree.jpeg"
image_alt: "Large Tree"
category: enhance, best-practice
description: "Trunk Based Development is the best way to work with teams to build software. TBD means teams work on a single main branch (like the trunk of a tree), and changes are integrated back into that main branch as soon as possible."
author: 'Ryan Bethel'
avatar: 'ryanbethel.png'
twitter: 'ryanbethel'
mastodon: "@ryanbethel@indieweb.social"
published: "September 26, 2023"
---


People often ask what is the best way to manage different development and staging environments on a team.
At [Begin](https://begin.com), we do Trunk Based Development, and we recommend it as a best practice.


## Trunk Based Development: TL;DR

Trunk Based Development (TBD) means teams work on a single main branch (like the trunk of a tree).
Changes are integrated back into that main branch as soon as possible.
This means:


* **Changes are released regularly in small increments**.
* **Feature branches are short-lived** and merged back to the main branch as quickly as possible.
* **Longer running features are broken down into smaller tasks** that can be merged into the trunk regularly.
* **Feature flags** are used to release parts of a new feature without users seeing it until it is ready.
* **Continuous Integration** uses automated tests and release processes to make sure that small changes can be released with minimal friction.
* **Avoids nightmare merges** from long-lived feature branches.


## How we do TBD

Trunk Based Development can be implemented in many ways with many different tools.
The details are less critical than the overall approach.
But for those deploying [Enhance](https://enhance.dev) projects on [Begin.com](https://begin.com) (or with [Architect](https://arc.codes) directly to AWS) this is how we do it.


Each website has a production and a staging environment with different domains.
When code is pushed to the “main” branch, if tests pass, it is automatically deployed to staging.
When a new Git Tag is created with a semver label, that tagged commit is deployed to the production environment if tests pass.
In other words:



1. `git push main` triggers a GitHub action that runs tests with `npm test` and then deploys to staging with `begin deploy --env staging`.
2. `npm version patch && git push main` triggers a GitHub action that runs tests with `npm test` and then deploys to production with `begin deploy --env production`.


### Testing

The key to testing is to keep it simple to start.
Don't let perfect be the enemy of good.
Anything is better than nothing.
We recommend using something like [tape](https://github.com/ljharb/tape).
Taylor Beseda has written some more recommendations here ([tools-for-testing-functional-web-apps](https://begin.com/blog/posts/2021-12-09-tools-for-testing-functional-web-apps)).
For continuous integration, make sure that the tests can be run automatically (i.e. with GitHub Actions) to prevent accidentally deploying code that does not pass.


When you start a new project, a good practice is to add at least one test.
That may be as simple as making a GET request to the site and testing for a 200 response.
With that one test in place, it lowers the barrier to incrementally adding a new test when fixing a bug or adding a feature.


### Feature Flags

Feature flags are a way to incrementally add new features to a site while making sure that users or team members do not see the feature until it is ready for them to try.
To use feature flags, the code for the new and old experience is in a conditional selected by the state of the flag.
It is important to keep the size of the code behind a feature flag as small as possible.
If there are thousands of lines of code on each side of the conditional, you are not really on the trunk anymore.
You are planting a new tree.

<begin-code filename="/app/pages/mypage.mjs">

```javascript
export function MyPage({html, state}){
  let header
  if (featureFlagEnabled("newHeader")) {
    header = newHeader
  } else {
    header = oldHeader
  }
  return html`${header}<rest-of-page></rest-of-page>`
}
```

</begin-code>


The second part of feature flags is exposing the feature to only the group of users you want to see it (often called segmentation).
In some cases, that group of users may be team members or a few hand picked users for early feedback.
In this case, it may work to have them take some an intentional action to opt into the new feature(i.e.
query parameters `https://staging.example.com?feature=newHeader`).


But many times the segmentation needs to be transparent to users.
We can do this with the user session.
For logged-in users we can assign the feature group in the database (i.e. `{username:"jane", features:["newHeader"]}`).
When the user logs in, the features are added to the session ( i.e. `return {session: {authorized:true, features:["newHeader"]}}`).
The session can also be used to segment non-authenticated users.
When a new request is received, the session is checked for feature flags to see if they are already segmented.
If they are not, new features can be assigned based on segmentation criteria (i.e. 10% randomly assigned).


The use of feature flags in large teams or large projects can be complex.
There are many third-party providers that can help manage them (i.e. [Launch Darkly](https://launchdarkly.com/)).
We recommend starting with the simplest thing that can possibly work.



### Continuous Integration

A critical feature of Trunk Based Development is that it should be easy to release changes.
We use GitHub Actions for automating releases.
The example below shows a streamlined `build.yml` for releasing a website.
Pushing to the main branch will trigger tests and, if they pass, deploy to the staging environment using the begin CLI.
Simon MacDonald wrote more about this process in [Using GitHub Actions with Architect — Begin Blog](https://begin.com/blog/posts/2022-04-22-using-github-actions-with-architect).


<begin-code filename=".github/workflow/build.yml">

```yaml
name: Node CI

# Push tests pushes; PR tests merges
on: [ push, pull_request ]

defaults:
  run:
    shell: bash

jobs:
# Deploy the build
  deploy_staging:
    name: Deploy staging
    if: github.ref == 'refs/heads/main' && github.event_name == 'push' # Don't run twice for PRs (for now)
    runs-on: ubuntu-latest
    concurrency:
      group: staging_${{ github.repository }}

    steps:
      - name: Check out repo
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 16

      - name: Install
        run: npm install

      - name: Run tests
        run: npm run test

      - name: Deploy to staging
        uses: beginner-corp/actions/deploy@main
        with:
          begin_token: ${{ secrets.BEGIN_TOKEN }}
          begin_env_name: staging
          channel: 'main'

# Deploy the build
  deploy_production:
    name: Deploy production
    if: startsWith(github.ref, 'refs/tags/v') && github.event_name == 'push' # Don't run twice for PRs (for now)
    runs-on: ubuntu-latest
    concurrency:
      group: production_${{ github.repository }}

    steps:
      - name: Check out repo
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 16

      - name: Install
        run: npm install

      - name: Run tests
        run: npm run test

      - name: Deploy to production
        uses: beginner-corp/actions/deploy@main
        with:
          begin_token: ${{ secrets.BEGIN_TOKEN }}
          begin_env_name: production
          channel: 'main'
```

</begin-code>

### Non-websites

Most of the examples above deal with websites.
A similar approach can be applied to most types of projects.
For example, if you are developing an NPM package, you can set up GitHub actions CI so that creating a tag will run tests and publish the package to NPM.
For the repo where we develop the `begin` CLI we have GitHub actions set up so that pushing to the main branch creates a release that can be used by team members (the equivalent of a staging), and then tagging will create a production release that users will get by running `begin update`.



## Further Reading

This post is only a small primer on Trunk Based Development.
You can read more about it, and other related best practices in these resources:



* [Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation](https://www.amazon.com/Continuous-Delivery-Deployment-Automation-Addison-Wesley-ebook/dp/B003YMNVC0) by Jez Humble and David Farley.
* [Accelerate](https://www.amazon.com/Accelerate-Building-Performing-Technology-Organizations/dp/B07BMBYHXL) by Nicole Forsgren PhD, Jez Humble, and Gene Kim
* [Software Engineering](https://www.amazon.com/Modern-Software-Engineering-Better-Faster/dp/B0BLXCXT3R) by  David Farley
* [DORA Reports](https://dora.dev/publications/)
