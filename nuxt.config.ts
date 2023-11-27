// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s - Kento',
    },
  },
  auth: {
    /* globalAppMiddleware: {
      allow404WithoutAuth: true,
      isEnabled: true,
    }, */
    provider: {
      defaultProvider: 'kento-auth',
      type: 'authjs',
    },
    session: {
      enableRefreshOnWindowFocus: true,
      enableRefreshPeriodically: true,
    },
  },
  colorMode: {
    classSuffix: '',
    fallback: 'light',
    preference: 'system',
  },
  css: ['@unocss/reset/tailwind-compat.css', '~/assets/css/main.css'],
  devtools: { enabled: true },
  imports: {
    dirs: ['composables/**'],
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
    'nuxt-icon',
    '@vee-validate/nuxt',
    '@sidebase/nuxt-auth',
  ],
  runtimeConfig: {
    auth: {
      secret: '',
    },
  },
  veeValidate: {
    autoImports: true,
  },
});
