---
title: Logical Properties
---

Enhance Styles' utility class system makes use of [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties), which account for every flavor of [writing mode](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Writing_Modes), as opposed to just left to right (LTR).

For those who are used to thinking of CSS properties with physical directions (e.g. `margin-top`), getting used to logical properties (e.g. `margin-block-start`) can take some work, but we believe it’s an extremely worthwhile practice. This also makes Enhance Styles well suited for designers and developers working in writing modes other than LTR, or even with multiple writing modes.

Enhance Styles uses logical properties in its utility classes for margins, padding, borders, insets, width, height, and text alignment.

The table below provides a quick comparison between the logical directions and their physical equivalents in LTR.

| Logical direction | Equivalent in LTR |
|-|-|
| block | top + bottom |
| block-start | top |
| block-end | bottom |
| inline | left + right |
| inline-start | left |
| inline-end | right |

These logical properties are also accounted for in our class naming. For example:

| Class | Effect | Equivalent in LTR |
|-|-|-|
| `.mi-auto` | `margin-inline: auto` | `margin-left: auto; margin-right: auto` |
| `.pbe<N>` | `padding-block-end: <N>` | `padding-bottom: <N>` |
| `.inset-is-0` | `inset-inline-start: 0` | `left: 0` |
| `.text-end` | `text-align: end` | `text-align: right`

