h3 The SVG Sprite

p To use the inline SVGS, include the main icon sprite (<code>dist/icons.svg</code>) in your page markup. NYCO Patterns uses an AJAX method to cache the sprite file while not including it in the page cache to decrease the size of each page. To import the icon through the global NYCO Patterns Patterns script use the following code:

p
  div class='code-block'
    pre
      = "var nyco = new NycoPatterns();\n"
      = "nyco.icons();\n"

p The script expects the icon sprite path to be named <code>icons.svg</code> and live in the root directory of the site. To overwrite this, pass a path to the method:

p
  div class='code-block'
    pre
      = "nyco.icons('path/to/icons.svg');\n"

p The ES6, CommonJS, and IFFE modules all require global activation to be written into your main script:

p
  div class='code-block'
    pre
      = "import Icons from 'components/icons/Icons.common';\n"
      = "new Icons(); // or new Icons('path/to/icons.svg');\n"

p This uses the <code>fetch</code> method which will require a polyfill for IE11 (and other older browser) support. The script does not ship with a polyfill by default. See <a href='https://polyfill.io'>Polyfill.io</a> for a suitable polyfill.

h3 Markup

p There are a few options for using icons after the sprite has been loaded on the page:

h4 Inline SVG’s

p The first option allows you to inline an SVG with the <code>use</code> tag. This is the preferred method for ACCESS NYC. Note that you can change the color of inline SVG icon shapes that have their fill set as currentColor by using a text color utility. Also, note the role="img" attribute, title tag, and title tag id for accessibility support.

div class='code-block'
  pre
    = '<svg class="icon-logo-nyco icon-xlarge text-color-blue-dark" role="img">\n'
    = '  <title id="icon-logo-nyco-title">The NYC Opportunity Logo</title>\n'
    = '  <use xlink:href="#icon-logo-nyco"></use>\n'
    = '</svg>\n'

h4 Background Images

p The second option does not require the icon sprite to be added to the page through the JavaScript module. It uses background images that reference the icons on the CDN. This option uses a utility class that sets the background image of the icon <code>.bg-{{ Icon ID Here }}</code>. Icons with background images require less markup but their shape fill color will default to black or whatever fill color the shape is set to. Note the <code>role="img"</code> and alt text attributes for accessibility.

div class='code-block'
  pre
    = '<div class="icon-logo-nyco" role="img" alt="The NYC Opportunity Logo"></div>'

h4 img tag

p The third option is to use the individual SVG path as a source attribute in an image tag. Note the alt text attribute for accessibility.

div class='code-block'
  pre
    = '<img src="svgs/icon-logo-nyco.svg" alt="The NYC Opportunity Logo">'

h3 Icon sizes

p To manage the size of the icons, use the icon size utilities. The dimensions are based on the 8px grid and include the following sizes;

p
  .table.w-full
    table
      tbody
        tr
          td icon-1
          td 8px 8px
        tr
          td icon-2
          td 16px 16px
        tr
          td icon-3
          td 24px 24px
        tr
          td icon-4
          td 32px 32px
        tr
          td icon-5
          td 40px 40px
        tr
          td icon-6
          td 48px 48px
        tr
          td icon-7
          td 56px 56px
        tr
          td icon-8
          td 64px 64px
        tr
          td icon-9
          td 72px 72px
        tr
          td icon-10
          td 80px 80px
        tr
          td icon-11
          td 88px 88px
        tr
          td icon-12
          td 96px 96px
        tr
          td icon-large
          td 136px 136px
        tr
          td icon-xlarge
          td 256px 256px

p <b>Accessibility Note</b>: If the SVG graphic doesn't serve a function, it may not be useful to screen readers. Therefore, it may be hidden using the <code>aria-hidden="true"</code> attribute.