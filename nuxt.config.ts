// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  apollo: {
    clients: {
      default: {
        cookieAttributes: {
          httpOnly: true,
        },
        httpEndpoint: process.env.NUXT_PUBLIC_API_ORIGIN!,
        httpLinkOptions: {
          credentials: 'include',
        },
      },
    },
  },
  app: {
    head: {
      titleTemplate: '%s - Kento',
    },
  },
  auth: {
    globalAppMiddleware: {
      addDefaultCallbackUrl: '/auth',
      allow404WithoutAuth: true,
      isEnabled: true,
    },
    provider: {
      endpoints: {
        getSession: {
          method: 'get',
          path: '/session',
        },
        /*         refresh: {
          method: 'post',
          path: '/refresh',
        }, */
        signIn: {
          method: 'post',
          path: '/sign-in',
        },
        signOut: {
          method: 'post',
          path: '/sign-out',
        },
        signUp: {
          method: 'post',
          path: '/sign-up',
        },
      },
      pages: {
        login: '/auth',
      },
      /*       refreshToken: {
        maxAgeInSeconds: 14 * 24 * 60 * 60,
        signInResponseRefreshTokenPointer: '/tokens/refreshToken',
      }, */
      sessionDataType: {
        biography: 'string | null',
        email: {
          is_confirmed: 'boolean',
          value: 'string',
        },
        first_name: 'string',
        id: 'string',
        last_name: 'string',
        projects:
          "{ project: { owner: { biography: 'string | null', first_name: 'string', id: 'string', last_name: 'string', username: 'string', }, }, roles: { name: 'string', permissions_denied: 'array', permissions_granted: 'array', }, user: { biography: 'string | null', first_name: 'string', id: 'string', last_name: 'string', username: 'string' } }[]",
        username: 'string',
      },
      token: {
        maxAgeInSeconds: 8 * 60 * 60,
        signInResponseTokenPointer: '/tokens/accessToken',
      },
      type: 'local',
    },
    session: {
      enableRefreshOnWindowFocus: true,
      enableRefreshPeriodically: 60_000,
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
    '@nuxtjs/apollo',
  ],
  runtimeConfig: {
    auth: {
      secret: '',
    },
    public: {
      apiOrigin: '',
    },
  },
  veeValidate: {
    autoImports: true,
  },
});
