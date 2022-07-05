---
title: Getting Started
---

> 👋 This doc lives outside of learn/start-here/, but is linked from that part of the sidebar tree.

It's easy to get started!

## Installation

Install the thing.

## New project

Create an all new project with the thing from the previous step.

### Make the folders

Folders will hold some files you will create in the next step.

### Add some files

Files should have things in them you want to be in them.

## Run it!

Probably run a command from the thing in the first step.

---

This page is artificially long to test sticky sidebar and document table of contents.

.

.

.

.

.

.

```javascript
function parseItems(items, root, activePath) {
  return items.map((item) => {
    if (typeof item === 'string') {
      // create full item from shorthand item
      item = {
        type: 'doc',
        slug: item,
        path: `/${root}/${item}`,
        label: unslug(item),
      };
    } else {
      if (!item.type) item.type = 'doc';
      if (!item.path) item.path = `/${root}/${item.slug}`;
      if (!item.label && item.slug) item.label = unslug(item.slug);
    }

    if (item.items)
      item.items = parseItems(item.items, `${root}/${item.slug}`, activePath);

    item.active = item.path === activePath;

    return item;
  });
}
```

.

.

.

.

.

.

This page is artificially long to test sticky sidebar and document table of contents.

## The bottom
