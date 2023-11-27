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
        background: theme.colors.light['100'],
        backgroundDark: theme.colors.dark['900'],
        card: theme.colors.light['500'],
        cardDark: theme.colors.dark['800'],
        element: theme.colors.light['400'],
        elementDark: theme.colors.dark['700'],
        extra: theme.colors.light['600'],
        extraDark: theme.colors.dark['600'],
      },
      error: {
        ...theme.colors.red,
        DEFAULT: theme.colors.red['400'],
        accent: theme.colors.red['900'],
        accentDark: theme.colors.red['950'],
        dark: theme.colors.red['500'],
        secondary: theme.colors.red['500'],
        secondaryDark: theme.colors.red['400'],
        tertiary: theme.colors.red['300'],
        tertiaryDark: theme.colors.red['200'],
      },
      success: {
        ...theme.colors.green,
        DEFAULT: theme.colors.green['400'],
        accent: theme.colors.green['900'],
        accentDark: theme.colors.green['950'],
        dark: theme.colors.green['500'],
        secondary: theme.colors.green['500'],
        secondaryDark: theme.colors.green['400'],
        tertiary: theme.colors.green['300'],
        tertiaryDark: theme.colors.green['200'],
      },
      warning: {
        ...theme.colors.yellow,
        DEFAULT: theme.colors.yellow['400'],
        accent: theme.colors.yellow['900'],
        accentDark: theme.colors.yellow['950'],
        dark: theme.colors.yellow['500'],
        secondary: theme.colors.yellow['500'],
        secondaryDark: theme.colors.yellow['400'],
        tertiary: theme.colors.yellow['300'],
        tertiaryDark: theme.colors.yellow['200'],
      },
    },
  },
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
