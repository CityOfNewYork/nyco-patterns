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
    file: './src/utilities/tailwindcss/_tailwindcss.scss',
    outDir: './dist/styles/',
    outFile: 'tailwindcss.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/utilities/tailwindcss/_tailwindcss.scss',
    outDir: './dist/styles/',
    outFile: '_tailwindcss.scss',
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
  {
    file: './src/objects/footer/_footer.scss',
    outDir: './dist/objects/footer/',
    outFile: 'footer.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/objects/navigation/_navigation.scss',
    outDir: './dist/objects/navigation/',
    outFile: 'navigation.css',
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
    file: './src/objects/mailchimp/_mailchimp.scss',
    outDir: './dist/objects/mailchimp/',
    outFile: 'mailchimp.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  }
];
