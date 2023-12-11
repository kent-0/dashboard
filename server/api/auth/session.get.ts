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

const userQuery = `
  query AccountMe {
    accountMe {
      biography
      email {
        is_confirmed
        value
      }
      first_name
      id
      last_name
      projects {
        id
        project {
          description
          end_date
          id
          name
          owner {
            biography
            first_name
            id
            last_name
            username
          }
          start_date
        }
        roles {
          id
          name
          permissions_denied
          permissions_granted
        }
        user {
          biography
          first_name
          id
          last_name
          username
        }
      }
      username
    }
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

  const userResponse = await $fetch<UserResponse>(config.public.apiOrigin, {
    body: {
      query: userQuery,
    },
    headers: {
      authorization: authHeaderValue,
    },
    method: 'POST',
  }).catch(() => null);

  if (!userResponse?.data) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to access this endpoint.',
    });
  }

  return userResponse.data.accountMe;
});
