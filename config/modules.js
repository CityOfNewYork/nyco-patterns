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

const modules = [
  {
    file: './src/scss/patterns-default.scss',
    outDir: './dist/styles/',
    outFile: 'nyco-patterns-default.css',
    sourceMapEmbed: sass.sourceMapEmbed,
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/scss/_tailwind.scss',
    outDir: './dist/styles/',
    outFile: 'tailwind.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  },
  {
    file: './src/scss/_tailwind.scss',
    outDir: './dist/styles/',
    outFile: '_tailwind.scss',
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
    includePaths: sass.includePaths
  },
  {
    file: './src/objects/mailchimp/_mailchimp.scss',
    outDir: './dist/objects/mailchimp/',
    outFile: 'mailchimp.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  }
];

module.exports = modules;
