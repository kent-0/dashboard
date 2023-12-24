import type { ClientDefault, GQLResponse } from '#gql/types';

const query = `
  mutation SignUp($input: AuthSignUpInput!) {
    signUp(input: $input) {
      biography
      email {
        is_confirmed
        value
      }
      first_name
      id
      last_name
      username
      projects {
        id
      }
    }
  }
`;

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const signUpResponse = await $fetch<GQLResponse<'signUp', ClientDefault.AuthUserMinimalObject>>(
    config.public.apiOrigin,
    {
      body: {
        query,
        variables: {
          input: body,
        },
      },
      method: 'POST',
    }
  ).catch(() => null);

  if (!signUpResponse?.data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You are not allowed to sign up with these credentials.',
    });
  }

  return signUpResponse.data.signUp;
});
