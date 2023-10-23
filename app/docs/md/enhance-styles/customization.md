---
title: Customization
---

It is possible to completely customize your project's utility classes. To do so you will need to do two things:

## 1. JSON config file

Add a `styleguide.json` (or choose another name) file to the root of your project.

<doc-link-callout link="https://raw.githubusercontent.com/enhance-dev/enhance-styles/main/config.json" mark="📄">
  Copy the default config to get started
</doc-link-callout>

## 2. Update `.arc`

Edit your project's `.arc` file to tell it where to grab the config.
Add these lines at the bottom of your `.arc` file in the root of your project.

```arc
@enhance-styles
config styleguide.json
```

<doc-link-callout link="https://github.com/enhance-dev/enhance-styles#readme" mark="💅🏽">
  Read more about the available styleguide customizations
</doc-link-callout>

## Cribsheet

Every Enhance app ships with a preconfigured, dynamic cribsheet to help you find the right class for the job.

Just start your project (`npm start`) and navigate to `/_styleguide/cribsheet`. Here you'll be able to search through all the utility classes and custom properties available to your app. Any customizations you make to your styleguide will automatically be reflected in your cribsheet.
