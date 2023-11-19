// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    classSuffix: '',
    fallback: 'light',
    preference: 'system',
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/eslint-module', '@nuxt/image', '@nuxtjs/color-mode'],
});
