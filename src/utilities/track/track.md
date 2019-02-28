p Tracking bus for Google Analytics event tracking and Webtrends multitrack. If global gtag or Webtrends functions are not present this will not send.

p
  div class='code-block'
    pre
      = 'new Track();';

p This will initialize basic tracking for links with the <code>data-js="track"</code> attribute. An event key as well as data must be passed and should be set to the attributes <code>data-track-key</code> and <code>data-track-data</code>. The data should be structured as an array of objects;

p
  div class='code-block'
    pre
      = '[\n';
      = '  {\n';
      = '    "event": "sample-event"\n';
      = '  }\n';
      = ']\n';

p You can pass any data you would like. However, for Webtrends multitrack a basic click event must have the <code>event</code> attribute set, if it does not exist the event will not register.

p Additionally, the script will add the path name to the <code>event</code>. For example, the <code>event</code> for the sample click tracking demo on this page is set to "sample-event" so the script will prepend "track" which is the <code>window.location.path</code>. It would then pass "track/sample-event" to Webtrends and Google Analytics.

p Below are examples of passing events to the tracking methods directly;

p
  div class='code-block'
    pre
      = 'let track = new Track();\n';
      = '\n';
      = '// Tracking Click Events\n';
      = 'track.click("Track Click", [\n';
      = '  {"event": "track-click"}\n';
      = ']);\n';

p This uses the <code>.matches()</code> method which will require a polyfill for IE11 (and other older browser) support. The utility does not ship with a polyfill by default. See <a href='https://polyfill.io/v2/docs/features/#Element_prototype_matches'>Element Prototype Matches on MDN</a> for a suitable polyfill.