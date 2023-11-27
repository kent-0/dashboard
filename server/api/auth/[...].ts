import { NuxtAuthHandler } from '#auth';

import CredentialsProvider, { CredentialsConfig } from 'next-auth/providers/credentials';

const credentialsConfig: CredentialsConfig = {
  authorize: () => {
    return null;
  },
  credentials: {
    password: {
      label: 'Password',
      placeholder: 'Please enter a valid password',
      type: 'password',
    },
    username: {
      label: 'Username',
      placeholder: 'Please enter a valid email address',
      type: 'text',
    },
  },
  id: 'auth-internal',
  name: 'Kento Authentication System',
  type: 'credentials',
};

const config = useRuntimeConfig();

export default NuxtAuthHandler({
  pages: {
    newUser: '/auth/sign-up',
    signIn: '/auth',
  },
  providers: [
    // @ts-expect-error Thanks for this weird error.
    CredentialsProvider.default(credentialsConfig),
  ],
  secret: config.auth.secret,
});
