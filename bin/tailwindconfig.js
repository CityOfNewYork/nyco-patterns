const fs = require('fs');

const resolveConfig = require('tailwindcss/resolveConfig');
const config = require(`${process.env.PWD}/config/tailwindcss`);

const alerts = require('@nycopportunity/pttrn/config/alerts');
const cnsl = require('@nycopportunity/pttrn/bin/util/console');

module.exports = {
  run: () => {
    try {
      let fullConfig = resolveConfig(config);
      let file = './dist/utilities/tailwindcss/tailwindcss.json';

      fullConfig = JSON.stringify(fullConfig, null, 2);

      fs.writeFileSync(file, fullConfig);

      cnsl.describe(`${alerts.success} Tailwindcss config written to ${alerts.str.path(file)}`);
    } catch (error) {
      cnsl.error(`Tailwindcss config failed (write): ${err.stack}`);
    }
  }
};