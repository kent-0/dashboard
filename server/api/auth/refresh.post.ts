import type { ClientDefault, GQLResponse } from '#gql/types';

const query = `
  mutation RefreshSession($refreshToken: String!) {
    refreshSession(refresh_token: $refreshToken) {
      access_token
      refresh_token
    }
  }  
`;

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<{ refreshToken: string }>(event);

  if (!body.refreshToken) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized, the refresh token is missing.',
    });
  }

  const refreshTokenResponse = await $fetch<
    GQLResponse<'refreshSession', ClientDefault.AuthSignInObject>
  >(config.public.apiOrigin, {
    body: {
      query,
      variables: {
        refreshToken: body.refreshToken,
      },
    },
    method: 'POST',
  }).catch(() => null);

  if (!refreshTokenResponse?.data) {
    throw createError({
      statusCode: 403,
      statusMessage: 'The refresh token is revoked or expired. Please sign in again.',
    });
  }

  return {
    tokens: {
      accessToken: refreshTokenResponse.data.refreshSession.access_token,
      refreshToken: refreshTokenResponse.data.refreshSession.refresh_token,
    },
  };
});
