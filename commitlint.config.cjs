// @ts-check

/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-angular',
  rules: {
    'body-max-line-length': [0, 'always', 200],
  },
};
