// @ts-check

/** @type {import('lint-staged').Config} */
module.exports = {
  '*.{cjs,js,ts,vue}': 'eslint --fix',
  '*.{cjs,js,ts,css,md}': 'prettier --ignore-unknown --write',
};
