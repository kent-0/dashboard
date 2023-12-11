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

const signUpQuery = `
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

  const signUpResponse = await $fetch<SignUpResponse>(config.public.apiOrigin, {
    body: {
      query: signUpQuery,
      variables: {
        input: body,
      },
    },
    method: 'POST',
  }).catch(() => null);

  if (!signUpResponse?.data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You are not allowed to sign up with these credentials.',
    });
  }

  return signUpResponse.data.signUp;
});
