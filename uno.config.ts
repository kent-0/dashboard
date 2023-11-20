import { theme } from '@unocss/preset-mini';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { defineConfig, presetUno, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
    presetWebFonts({
      provider: 'google',
    }),
  ],
  theme: {
    colors: {
      brand: {
        ...theme.colors.emerald,
        DEFAULT: theme.colors.emerald['500'],
        secondary: theme.colors.emerald['400'],
        tertiary: theme.colors.emerald['300'],
      },
      'brand-dark': {
        ...theme.colors.emerald,
        DEFAULT: theme.colors.emerald['600'],
        secondary: theme.colors.emerald['500'],
        tertiary: theme.colors.emerald['400'],
      },
      components: {
        background: theme.colors.white,
        cards: theme.colors.gray['100'],
        elements: theme.colors.gray['200'],
        extra: theme.colors.gray['400'],
      },
      'components-dark': {
        background: theme.colors.gray['900'],
        cards: theme.colors.gray['800'],
        elements: theme.colors.gray['700'],
        extra: theme.colors.gray['600'],
      },
    },
  },
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
