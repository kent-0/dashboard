// @ts-check

const { defineConfig } = require('eslint-define-config');

/// <reference types='@eslint-types/typescript-eslint' />

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
        '@unocss',
        'plugin:perfectionist/recommended'
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
        'prettier',
        'perfectionist'
    ],
    'rules': {
        'prettier/prettier': 'error',
        'perfectionist/sort-imports': [
            'error',
            {
                'type': 'natural',
                'order': 'asc',
                'internal-pattern': ['@/**'],
                'newlines-between': 'always',
                'groups': [
                    'react',
                    'next',
                    'external',
                    'external-type',
                    'builtin',
                    'parent',
                    'siblings',
                    'components',
                    'images',
                    'hooks',
                    'utils',
                    'directImport',
                    'internal',
                    'internal-type'
                ],
                'custom-groups': {
                    'value': {
                        'react': ['react', 'react-*'],
                        'next': 'next/**',
                        'images': ['@/public/**.{png,svg,jpg,jpeg,ico}'],
                        'components': '@/components/**',
                        'hooks': '@/lib/hooks/**',
                        'utils': '@/utils/**',
                        'directImport': './**'
                    }
                }
            }
        ],
        'import/order': 'off',
        'sort-imports': 'off',
        '@typescript-eslint/adjacent-overload-signatures': 'off',
        'sort-keys': 'off'
    }
});
