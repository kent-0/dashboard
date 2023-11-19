// @ts-check

const { defineConfig } = require('eslint-define-config');

/// <reference types="@eslint-types/typescript-eslint" />

module.exports = defineConfig({
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        '@nuxtjs/eslint-config-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
        '@unocss'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'parser': '@typescript-eslint/parser',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'vue',
        'prettier'
    ],
    'rules': {
        'prettier/prettier': 'error'
    }
});
