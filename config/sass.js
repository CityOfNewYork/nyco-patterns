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
    './src/',
    './node_modules',
    './node_modules/@nycopportunity'
  ]
};

module.exports = [
  {
    file: './src/scss/default.scss',
    outDir: './dist/styles/',
    outFile: 'nyco.css',
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
