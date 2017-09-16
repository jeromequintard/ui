module.exports = function(wallaby) {
  return {
    files: [
      'src/**/*.js?(x)',
      '!src/**/*.spec.js?(x)',
    ],
    tests: [
      'src/**/*.spec.js?(x)',
    ],
    env: {
      type: 'node',
      runner: 'node',
    },
    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel(),
    },
    testFramework: 'jest',
    debug: true,

    setup: (wallaby) => {
      /* eslint-disable global-require */
      const conf = require('./package.json').jest;
      /* eslint-enable global-require */

      ['^lib/(.*)$',
        '^components/(.*)',
        '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$',
        '\\.(css|scss)$'].forEach((pattern) => {
          console.info(pattern);
          conf.moduleNameMapper[pattern] = conf.moduleNameMapper[pattern].replace('<rootDir>', wallaby.projectCacheDir);
        });

      wallaby.testFramework.configure(conf);
    },
  };
};
