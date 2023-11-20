// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('eslint-define-config');

/// <reference types='@eslint-types/typescript-eslint' />

module.exports = defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    '@unocss',
    'plugin:perfectionist/recommended-natural',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['pages/**/*.vue', 'app.vue', 'error.vue', 'layouts/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'vue', 'prettier', 'perfectionist'],
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    'import/order': 'off',
    'perfectionist/sort-imports': [
      'error',
      {
        'custom-groups': {
          value: {
            assets: '~/public/**',
            components: '~/components/**',
            composables: '~/composables/**',
            layouts: '~/layouts/**',
            middleware: '~/middleware/**',
            plugins: '~/plugins/**',
            server: '~/server/**',
            utils: '~/utils/**',
          },
        },
        groups: [
          'assets',
          'components',
          'composables',
          'layouts',
          'middleware',
          'plugins',
          'server',
          'utils',
          'builtin',
          'internal',
          'internal-type',
          'external',
          'external-type',
          'parent',
          'siblings',
        ],
        'internal-pattern': ['~/**', '#**'],
        'newlines-between': 'always',
        order: 'asc',
        type: 'natural',
      },
    ],
    'perfectionist/sort-vue-attributes': 'off',
    'prettier/prettier': 'error',
    'sort-imports': 'off',
    'sort-keys': 'off',
  },
});
