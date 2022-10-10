---
title: Editor Setup
links:
  - es6-string-html: https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html
  - literally-html: https://marketplace.visualstudio.com/items?itemName=webreflection.literally-html
---

Enhance components get passed a tagged template literal function <code>html``</code> for defining HTML templates; this can be challenging for some editors to highlight so we recommend the following editor extensions to improve the authoring experience.

## VS Code Extensions

- [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)
- [literally-html](https://marketplace.visualstudio.com/items?itemName=webreflection.literally-html)

<doc-callout level="caution">

VS Code devs may need to disable the [Babel JavaScript extension](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel) for syntax highlighting to work

</doc-callout>

## Vim

- [vim-javascript](https://github.com/pangloss/vim-javascript.git)
- [vim-html-template-literals](https://github.com/jonsmithers/vim-html-template-literals.git)

## Neovim

- [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)

<doc-callout level="info">

You will need to install Treesitter’s [HTML](https://github.com/tree-sitter/tree-sitter-html), [CSS](https://github.com/tree-sitter/tree-sitter-css), and [Javascript](https://github.com/tree-sitter/tree-sitter-javascript) language parsers.

</doc-callout>

## Sublime Text

Add the "[Ecmascript Syntax](https://github.com/bathos/Ecmascript-Sublime/)" package via Package Control
