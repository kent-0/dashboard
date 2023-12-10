import { NuxtAuthHandler } from '#auth';

import CredentialsProvider, { CredentialsConfig } from 'next-auth/providers/credentials';

interface SignInResponse {
  data?: {
    signIn: {
      access_token: string;
      refresh_token: string;
    };
  };
}

interface UserResponse {
  data: {
    accountMe: {
      email: {
        is_confirmed: boolean;
        value: string;
      };
      first_name: string;
      id: string;
      last_name: string;
      username: string;
    };
  };
}

const credentialsConfig: CredentialsConfig = {
  authorize: async (crendetials) => {
    const authQuery = `
      mutation SignIn($input: AuthSignInInput!) {
        signIn(input: $input) {
          access_token
          refresh_token
        }
      }
    `;

    const authResponse = await $fetch<SignInResponse>(config.public.apiOrigin, {
      body: {
        query: authQuery,
        variables: {
          input: {
            password: crendetials?.password,
            username: crendetials?.username,
          },
        },
      },
      method: 'POST',
    }).catch(() => null);

    if (!authResponse?.data) return null;

    const userQuery = `
      query AccountMe {
        accountMe {
          email {
            value
          }
          first_name
          id
          last_name
          username
        }
      }    
    `;

    const userResponse = await $fetch<UserResponse>(config.public.apiOrigin, {
      body: {
        query: userQuery,
      },
      headers: {
        authorization: `Bearer ${authResponse.data.signIn.access_token}`,
      },
      method: 'POST',
    }).catch(() => null);

    if (!userResponse?.data) return null;

    return {
      email: userResponse.data.accountMe.email.value,
      id: userResponse.data.accountMe.id,
      name: `${userResponse.data.accountMe.first_name} ${userResponse.data.accountMe.last_name}`,
      username: userResponse.data.accountMe.username,
    };
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
