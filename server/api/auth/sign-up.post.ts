interface SignUpResponse {
  data: {
    signUp: {
      biography: string;
      email: {
        is_confirmed: boolean;
        value: string;
      };
      first_name: string;
      id: string;
      last_name: string;
      projects: Array<{
        id: string;
      }>;
      username: string;
    };
  };
}

const signOutQuery = `
  mutation Mutation {
    logOut
  }    
`;

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const signOutResponse = await $fetch<SignUpResponse>(config.public.apiOrigin, {
    body: {
      query: signOutQuery,
      variables: {
        input: body,
      },
    },
    method: 'POST',
  }).catch(() => null);

  if (!signOutResponse?.data) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to access this endpoint.',
    });
  }

  return signOutResponse.data.signUp;
});
