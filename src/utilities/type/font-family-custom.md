## Custom Font Families

Custom Font Families can be used with an extended stylesheet in your project. Fonts can be added either by self-hosting and using custom CSS `@font-face` declarations or importing from [Google Fonts](https://fonts.google.com/) (or any other CDN) using the CSS `@import` method.

After the desired font family is imported, the default font-family declarations can be overridden in the custom stylesheet using the following CSS.

```css
/* Replace IBM Plex */
html, body {
  font-family: 'Secondary Custom Font'
}

/* Replace Helvetica */
h1, .h1, h2, .h2, h3, .h3,
blockquote, .blockquote, .jumbo {
  font-family: 'Primary Custom Font'
}
```
