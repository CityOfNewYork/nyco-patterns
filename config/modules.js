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
    file: './src/objects/feed/_feed.scss',
    outDir: './dist/objects/feed/',
    outFile: 'feed.css',
    precision: sass.precision,
    includePaths: sass.includePaths
  }
];

module.exports = modules;
