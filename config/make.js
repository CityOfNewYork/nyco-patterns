/**
 * Dependencies
 */

// ...

/**
 * Config
 */

const templates = {
  markup: [
      "/",
      "/ {{ Pattern }}",
      "/"
    ].join("\n"),
  styles: [
      "/**",
      " * {{ Pattern }}",
      " */",
      "",
      "// Dependencies",
      "// @import 'config/variables';",
      "",
      "// Declarations",
      "// .{{ prefix }}{{ pattern }} { }"
    ].join("\n"),
  config: [
      "//",
      "// Variables",
      "//",
      "",
      "// Dependencies",
      "// @import 'config/variables';",
      "",
      "// Declarations",
      "// $var"
    ].join("\n"),
  views: [
      "- pattern = '{{ Pattern }}';",
      "",
      "/ Layout",
      "= extend('layouts/default');",
      "",
      "/ Variables",
      "= partial('partials/styles.slm');",
      "= partial('partials/links.slm');",
      "",
      "/ Partials",
      "= partial('partials/head.mixin.slm');",
      "= partial('partials/header.mixin.slm');",
      "= partial('partials/nav.mixin.slm');",
      "= partial('partials/section.mixin.slm');",
      "= partial('partials/section-full.mixin.slm');",
      "",
      "/ Content blocks",
      "= content('head');",
      "  = mixin('head', pattern);",
      "",
      "= content('header');",
      "  = mixin('header');",
      "",
      "= content('content');",
      "  h1 class='${class_demo_headers}' = pattern;",
      "",
      "  = mixin('section', '{{ type }}/{{ pattern }}/{{ pattern }}');"
    ].join("\n")
};

const files = {
  markup: '{{ pattern }}.slm',
  markdown: '{{ pattern }}.md',
  styles: '_{{ pattern }}.scss',
  config: '_{{ pattern }}.scss',
  views: '{{ pattern }}.slm'
};

const prefixes = {
  elements: '',
  components: 'c-',
  objects: 'o-'
};

const modules = {
  templates: templates,
  files: files,
  prefixes: prefixes
};

module.exports = modules;