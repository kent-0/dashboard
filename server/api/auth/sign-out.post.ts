interface SignOutResponse {
  data: {
    logOut: string;
  };
}

const signOutQuery = `
  mutation Mutation {
    logOut
  }    
`;

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const authHeaderValue = getRequestHeader(event, 'authorization');

  if (typeof authHeaderValue === 'undefined') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Need to pass valid Bearer-authorization header to access this endpoint',
    });
  }

  const signOutResponse = await $fetch<SignOutResponse>(config.public.apiOrigin, {
    body: {
      query: signOutQuery,
    },
    headers: {
      authorization: authHeaderValue,
    },
    method: 'POST',
  }).catch(() => null);

  if (!signOutResponse?.data) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to access this endpoint.',
    });
  }

  return {
    message: signOutResponse.data.logOut,
  };
});
