/**
 * Dependencies
 */

// ...

/**
 * Config
 */

const sass = {
  sourceMapEmbed: true,
  precision: 2,
  includePaths: [
    './node_modules', './src'
  ]
};

module.exports = [
  {
    file: './src/scss/patterns-default.scss',
    outDir: './dist/styles/',
    outFile: 'nyco-patterns-default.css',
    sourceMapEmbed: sass.sourceMapEmbed,
    precision: sass.precision,
    includePaths: sass.includePaths,
    devModule: true
  },
  {
    file: './src/scss/_elements.scss',
    outDir: './dist/styles/',
    outFile: 'elements.css',
    sourceMapEmbed: sass.sourceMapEmbed,
    precision: sass.precision,
    includePaths: sass.includePaths,
    devModule: true
  },
  {
    file: './src/scss/_components.scss',
    outDir: './dist/styles/',
    outFile: 'components.css',
    sourceMapEmbed: sass.sourceMapEmbed,
    precision: sass.precision,
    includePaths: sass.includePaths,
    devModule: true
  },
  {
    file: './src/scss/_objects.scss',
    outDir: './dist/styles/',
    outFile: 'objects.css',
    sourceMapEmbed: sass.sourceMapEmbed,
    precision: sass.precision,
    includePaths: sass.includePaths,
    devModule: true
  },
  {
    file: './src/scss/_utilities.scss',
    outDir: './dist/styles/',
    outFile: 'utilities.css',
    sourceMapEmbed: sass.sourceMapEmbed,
    precision: sass.precision,
    includePaths: sass.includePaths,
    devModule: true
  },
  {
    file: './src/elements/buttons/_buttons.scss',
    outDir: './dist/elements/buttons/',
    outFile: 'buttons.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/elements/checkboxes/_checkboxes.scss',
    outDir: './dist/elements/checkboxes/',
    outFile: 'checkboxes.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/elements/code/_code.scss',
    outDir: './dist/elements/code/',
    outFile: 'code.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/elements/fonts/_fonts.scss',
    outDir: './dist/elements/fonts/',
    outFile: 'fonts.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/elements/icons/_icons.scss',
    outDir: './dist/elements/icons/',
    outFile: 'icons.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/elements/inputs/_inputs.scss',
    outDir: './dist/elements/inputs/',
    outFile: 'inputs.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/elements/layouts/_layouts.scss',
    outDir: './dist/elements/layouts/',
    outFile: 'layouts.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/elements/links/_links.scss',
    outDir: './dist/elements/links/',
    outFile: 'links.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/elements/radios/_radios.scss',
    outDir: './dist/elements/radios/',
    outFile: 'radios.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/elements/select/_select.scss',
    outDir: './dist/elements/select/',
    outFile: 'select.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/elements/tables/_tables.scss',
    outDir: './dist/elements/tables/',
    outFile: 'tables.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  // {
  //   file: './src/components/official/_official.scss',
  //   outDir: './dist/components/official/',
  //   outFile: 'official.css',
  //   precision: sass.precision,
  //   includePaths: sass.includePaths
  // },
  {
    file: './src/objects/content/_content.scss',
    outDir: './dist/objects/content/',
    outFile: 'content.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/objects/feed/_feed.scss',
    outDir: './dist/objects/feed/',
    outFile: 'feed.css',
    precision: sass.precision,
    includePaths: sass.includePaths,
    devModule: true
  },
  {
    file: './src/objects/footer/_footer.scss',
    outDir: './dist/objects/footer/',
    outFile: 'footer.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/objects/header/_header.scss',
    outDir: './dist/objects/header/',
    outFile: 'header.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/objects/mailchimp/_mailchimp.scss',
    outDir: './dist/objects/mailchimp/',
    outFile: 'mailchimp.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  // {
  //   file: './src/objects/map/_map.scss',
  //   outDir: './dist/objects/map/',
  //   outFile: 'map.css',
  //   precision: sass.precision,
  //   includePaths: sass.includePaths
  // },
  {
    file: './src/objects/navigation/_navigation.scss',
    outDir: './dist/objects/navigation/',
    outFile: 'navigation.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/utilities/animate/_animate.scss',
    outDir: './dist/utilities/animate/',
    outFile: 'animate.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/utilities/colors/_colors.scss',
    outDir: './dist/utilities/colors/',
    outFile: 'colors.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/utilities/colors/_colors.scss',
    outDir: './dist/utilities/colors/',
    outFile: 'colors.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/utilities/tailwindcss/_tailwindcss.scss',
    outDir: './dist/utilities/tailwindcss/',
    outFile: 'tailwindcss.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/utilities/tailwindcss/_tailwindcss.scss',
    outDir: './dist/utilities/tailwindcss/',
    outFile: '_tailwindcss.scss',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/utilities/type/_type.scss',
    outDir: './dist/utilities/type/',
    outFile: 'type.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  }
];
