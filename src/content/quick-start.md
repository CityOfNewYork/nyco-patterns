## Static page using CDN installation

The following is a static page sample that integrates {{ this.package.nice }} using the CDN method. This is the quickest way to get started prototyping but it is preferred to use the [NPM method of installation](installation) for most long-term projects.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello {{ this.package.nice }}</title>

    <link rel='shortcut icon' href="{{ this.package.cdn.url }}@v{{ this.package.version }}{{ this.package.cdn.favicon }}">

    <link href="https://fonts.gstatic.com" rel="preconnect">
    <link href={{ this.tokens.googlefonts }} rel="stylesheet">
    <link href="{{ this.package.cdn.url }}@v{{ this.package.version }}{{ this.package.cdn.styles }}" rel="stylesheet">
  </head>

  <body class="color-light-background">
    <header class="layout-content px-3">
      <div class="mx-auto">
        <svg class="{{ this.package.svgs.primary }}">
          <use xlink:href="#{{ this.package.svgs.primary }}"></use>
        </svg>

        <h1>Hello {{ this.package.nice }}!</h1>
      </div>
    </header>

    <main class="layout-content p-3">
      <div class="mx-auto">
        <p>This demo uses the CDN method of installation including the CSS, Google Fonts, JavaScript, and SVGs. Sample pattern HTML can be copied and pasted into this page and they should work without any extra steps!</p>

        <p>
          <a class="btn btn-primary inline-block" href="https://nycopatterns.cityofnewyork.us">View Patterns</a>
        </p>
      </div>
    </main>

    <footer>
      <p>
        <small>© City of New York, 2021 All Rights Reserved.</small><br>
        <small>NYC is a trademark and service mark of the City of New York.</small>
      </p>

        <p>
          <small class="flex items-center">
            <svg class="icon-ui mie-1">
              <use xlink:href="#feather-type"></use>
            </svg>

            Font-families used include system Helvetica and <a href="https://www.ibm.com/plex/">IBM Plex</a>.
          </small>
        </p>

        <p>
          <small class="flex items-center">
            <svg class="icon-ui mie-1">
              <use xlink:href="#feather-feather"></use>
            </svg>

            UI Icons are sourced from the <a href="https://feathericons.com/">Feather Icons set</a>.
          </small>
        </p>
    </footer>

    <script src="{{ this.package.cdn.url }}@v{{ this.package.version }}{{ this.package.cdn.scripts }}"></script>

    <script>
      var nyco = new {{ this.package.instantiations.scripts }}();

      nyco.icons('{{ this.package.cdn.url }}@v{{ this.package.version }}{{ this.package.cdn.svg }}');
      nyco.icons('{{ this.package.cdn.url }}@v{{ this.package.version }}{{ this.package.cdn.feather }}');
    </script>
  </body>
</html>
```

View the [installation documentation](installation) for more details.