{{ this.package.nice }} uses two sans-serif font-families by default; [IBM Plex](https://www.ibm.com/plex/) and **Helvetica**.

* **Helvetica** is not included as a dependency as it requires a license to host and distribute. The display of Helvetica depends on the presence of the font family installed on the user's system and will fall back to the default system sans-serif if not present.

* **IBM Plex** is an [open source](https://github.com/IBM/plex) font and is included as a dependency.

Body text such as `<p>` tags are set to IBM Plex Sans while `<h1>`, `<h2>`, `<h3>`, `<jumbo>` and `<blockquote>` are all set to Helvetica.

### Installing Fonts (Self-hosting)

To install fonts in a project, copy font files in the <a href="{{ this.package.cdn.release }}{{ this.package.version }}{{ this.package.cdn.fonts }}">{{ this.package.cdn.fonts }}</a> directory to the following path relative to the stylesheet; `../fonts/...`.

```
styles/nyco.css
fonts/IBM-Plex-Sans/...
```

If compiling styles from the source, the path to font family files can be changed using the [asset paths variable](installation#heading-asset-paths-and-cdn) in your main Sass stylesheet.

### Google Fonts

IBM Plex is also available via [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Sans?query=ibm+ple&preview.text_type=custom&sidebar.open=true&selection.family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700) and can be imported with the following HTML `<link>` tag;

```html
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
```

Or the following CSS `@import` rule;

```html
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
</style>
```

Be sure to check Google Fonts for the latest import methods.
