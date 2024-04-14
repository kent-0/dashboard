import unocss from '@unocss/eslint-config/flat';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  { ...unocss, name: 'unocss' },
  { ...eslintPluginPrettier, name: 'prettier' },
  {
    name: 'perfectionist',
    plugins: { perfectionist },
    rules: {
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
    },
  }
);
