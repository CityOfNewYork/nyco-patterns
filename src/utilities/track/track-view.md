Screen views can also be tracked for single page applications. The third data parameter will only be used for Webtrends.

p
  div class='code-block'
    pre
      = 'let track = new Track();\n';
      = '\n';
      = '// Tracking Screen Views (for single page apps)\n';
      = 'track.view("View", "Sample View", [\n';
      = '  {"WT.si_n": "View Data 1"},\n';
      = '  {"WT.si_p": "View Data 2"}\n';
      = ']);';