{{ this.package.nice }} integrates the [Feather](https://feathericons.com) open source icon set for use as user interface icons. The classname `icon-ui` is needed to set the stroke width and default dimensions for UI icons. By default the dimensions for these icons are **{{ this.tokens.icons.icon-ui }}** (width and height).

When integrating UI icons it is recommended to install the [Feather Icon Package](https://github.com/feathericons/feather) independently in your project via NPM. It contains a [JavaScript API](https://github.com/feathericons/feather#client-side-javascript), [Node.js API](https://github.com/feathericons/feather#node), and [SVG sprite](https://github.com/feathericons/feather#svg-sprite). Other front-end framework implementations include:

* [React Feather](https://github.com/feathericons/react-feather)
* [Vue.js Feather](https://github.com/fengyuanchen/vue-feather)
* [Svelte Feather](https://github.com/dylanblokhuis/svelte-feather-icons)
* [Angular Feather](https://www.npmjs.com/package/angular-feather)

Each package may have different methods of implementation to take into consideration. For prototyping svg files can be downloaded from [feathericons.com](https://feathericons.com) individually or from the project [Figma file](https://github.com/feathericons/feather#figma).

You may also use the <a href="{{ this.package.cdn.release }}{{ this.package.version }}{{ this.package.cdn.feather }}">sprite included with this repository</a>. The `<use>` tag's `xlink:href` attribute corresponds to the Feather icon slug which can be referenced on the [feathericons.com](https://feathericons.com) site. Every ID is prefixed with `#feather-`. Be sure to provide the appropriate attribution to the Feather project.