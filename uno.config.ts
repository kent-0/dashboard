import { presetForms } from '@julr/unocss-preset-forms';
import { presetHeroPatterns } from '@julr/unocss-preset-heropatterns';
import { theme } from '@unocss/preset-mini';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { defineConfig, presetUno, presetWebFonts } from 'unocss';
import { presetAnimateCSS } from 'unocss-preset-animatecss';

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
    presetWebFonts({
      fonts: {
        title: 'Noto Serif Display',
      },
      provider: 'google',
    }),
    presetHeroPatterns(),
    presetForms(),
    presetAnimateCSS(),
  ],
  theme: {
    colors: {
      brand: {
        ...theme.colors.emerald,
        DEFAULT: theme.colors.emerald['400'],
        accent: theme.colors.emerald['900'],
        accentDark: theme.colors.emerald['950'],
        dark: theme.colors.emerald['500'],
        secondary: theme.colors.emerald['500'],
        secondaryDark: theme.colors.emerald['400'],
        tertiary: theme.colors.emerald['300'],
        tertiaryDark: theme.colors.emerald['200'],
      },
      components: {
        background: theme.colors.light,
        backgroundDark: theme.colors.dark['900'],
        card: theme.colors.light['100'],
        cardDark: theme.colors.dark['800'],
        element: theme.colors.light['200'],
        elementDark: theme.colors.dark['700'],
        extra: theme.colors.light['400'],
        extraDark: theme.colors.dark['600'],
      },
    },
  },
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
