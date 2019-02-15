h3 The SVG Sprite

p To use the inline SVGS, include the main icon sprite (<code>dist/icons.svg</code>) in your page markup.

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

p To manage the size of the icons, use the icon size utilities. The sizes are based on the 8px grid and include the following sizes;

ul
  li
    p <code>.icon-xsmall</code> 8px 8px
  li
    p <code>.icon-small</code> 16px 16px
  li
    p <code>.icon-medium</code> 32px 32px
  li
    p <code>.icon-large</code> 136px 136px
  li
    p <code>.icon-xlarge</code> 256px 256px
  li
    p <code>.icon-mega</code> 512px 512px

p <b>Accessibility Note</b>: If the SVG graphic doesn't serve a function, it may not be useful to screen readers. Therefore, it may be hidden using the <code>aria-hidden="true"</code> attribute.