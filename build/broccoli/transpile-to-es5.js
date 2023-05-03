'use strict';

const babel = require('broccoli-babel-transpiler');
const debugMacros = require('babel-plugin-debug-macros');

const PRODUCTION = process.env.EMBER_ENV === 'production';

/**
 * Transpiles a tree of ES2015+ JavaScript files to ES5 with Babel.
 */
module.exports = function transpileToES5(inputNode, modules = false) {
  let plugins = [];

  if (!PRODUCTION) {
    // Compile out @glimmer/env for tests
    plugins.push([
      debugMacros,
      {
        flags: [
          {
            source: '@glimmer/env',
            flags: {
              DEBUG: true,
            },
          },
        ],
      },
    ]);
  }

  const options = {
    annotation: 'Babel - Default Target',
    sourceMaps: 'inline',
    presets: [
      [
        '@babel/preset-env',
        {
          targets: 'last 2 versions, > 0.5%',
          modules,
        },
      ],
    ],
    plugins,
  };

  if (modules === 'amd') {
    const ensurePosix = require('ensure-posix-path');
    const path = require('path');
    options.moduleIds = true;
    options.getModuleId = (modulePath) => ensurePosix(path.relative(process.cwd(), modulePath));
  }

  return babel(inputNode, options);
};
