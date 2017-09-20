# Charts Module

Chart Features
- [x] Reusable line and bar charts
- [x] Plot types can be combined
- [x] Responsive charts
- [x] Custom colors and axis labels
- [x] Easy to read SVG and class structure
- [ ] Custom domain formats and input
- [ ] Labelling formats with unit types near numbers ($, %, etc.)
- [ ] Add value labels to the top of bars or dots?
- [ ] Formatting for values other than dates
- [ ] Should all domains be ordinal scales to handle the variety of formats?
- [ ] Ability to color values, should this be by class styling?
- [ ] Legend or rely on html markup?
- [ ] Tooltip for exploring specific values
- [ ] Zero lines for charts with negative values
- [ ] Custom lines with labels
- [ ] Stacked bar charts

Module Features
- [x] Responsive features don't work because the window event is overridden by the
last chart created. Would like to convert the code base to an ES6 module to help
prevent issues like this.
- [ ] Need to explore breaking up the larger code base as individual modules so
the library doesn't become too unruly.
- [x] Currently, the bundling and distribution is set up with Webpack, but I would
like to change to Rollup because it seems better suited for writing modern libaries.
If we were creating a single page web app, Webpack would probably be the way to go.

Other chart features from previous libary that chould be cherry picked in the future.
- [ ] Trendlines
- [ ] Area plots
- [ ] Dot plots
- [ ] Optional left or right y axis
- [ ] Exporting chart as SVG or PNG
- [ ] Clickable plots for creating focus on specific data

![Chart Screenshot](/img/screenshot-localhost-80802017-06-1410-53-53.png)