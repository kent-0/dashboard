interface SignInResponse {
  data?: {
    signIn: {
      access_token: string;
      refresh_token: string;
    };
  };
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const credentials = await readBody<{ password?: string; username?: string }>(event);

  if (!credentials?.password || !credentials?.username) {
    throw createError({
      statusCode: 403,
      statusMessage: 'The credentials are invalid.',
    });
  }

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
          password: credentials?.password,
          username: credentials?.username,
        },
      },
    },
    method: 'POST',
  }).catch(() => null);

  if (!authResponse?.data) {
    throw createError({
      statusCode: 403,
      statusMessage: 'The username or password is incorrect.',
    });
  }

  return {
    tokens: {
      accessToken: authResponse.data.signIn.access_token,
      refreshToken: authResponse.data.signIn.refresh_token,
    },
  };
});
