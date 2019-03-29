/**
 * Dependencies
 */

const Fs = require('fs');
const Path = require('path');
const Postcss = require('postcss');
const config = require('../config/postcss');
const modules = require('../config/modules');
const alerts = require('../config/alerts');
const notifier = require('node-notifier');

/**
 * Init
 */

modules.forEach(function(module, index) {
  let bundle = Path.join(__dirname, '../', module.outDir, module.outFile);
  Fs.readFile(bundle, (err, css) => {
    Postcss(config.plugins)
      .process(css, {
        from: bundle,
        to: bundle
      })
      .then(result => {
        Fs.writeFile(bundle, result.css, (err) => {
          if (err) {
            console.log(`${alerts.error} ${err}`);
          } else {
            console.log(`${alerts.success} PostCss processed ${module.outDir}${module.outFile}`);
            if(index == modules.length-1 && process.env.NOTIFY == 'true'){
              notifier.notify({
                title: 'NYCO Patterns',
                message: 'PostCss processing complete! 🎉'
              });
            }
          }
        });
      });
  });
});


