<template>
  <form
    class="w-full rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark"
    @submit.prevent="submit"
  >
    <ui-layout-divider direction="left">
      <h2 class="text-lg font-semibold">Personal information</h2>
    </ui-layout-divider>
    <p class="opacity-50">
      Your personal information is used to identify you across the platform. It is visible to other
      users and can be changed at any time. Remember respect the rules of the platform and do not
      use offensive words.
    </p>
    <div class="grid grid-cols-3 gap-5">
      <ui-form-input
        type="text"
        label="First name"
        name="first_name"
        icon-left="lucide:file-signature"
        :placeholder="data?.first_name"
        autocomplete="given-name"
        prefix="personal"
        :required="true"
      />
      <ui-form-input
        type="text"
        label="Last name"
        name="last_name"
        icon-left="lucide:file-signature"
        :placeholder="data?.last_name"
        autocomplete="family-name"
        prefix="personal"
        :required="true"
      />
      <ui-form-input
        type="text"
        label="Username"
        name="username"
        icon-left="lucide:at-sign"
        :placeholder="data?.username"
        autocomplete="username"
        prefix="personal"
        :required="true"
      />
      <ui-form-input
        class="col-span-3"
        type="text"
        label="Biography"
        name="biography"
        icon-left="lucide:pen-line"
        :placeholder="data?.biography ?? 'I not have a biography yet. 😢'"
        autocomplete="off"
        prefix="personal"
      />
    </div>
    <ui-layout-divider />
    <div class="flex justify-end">
      <ui-button
        icon-left="lucide:save-all"
        variant="solid"
        aria-label="Save the new user info"
        type="submit"
        :is-disabled="form.meta.value.pending || !form.meta.value.valid"
      >
        Save changes
      </ui-button>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import UpdateUserMutation from '~/graphql/mutations/user/update.gql';

  import { toTypedSchema } from '@vee-validate/yup';
  import { object, string } from 'yup';

  import type { ClientDefault } from '#gql/types';

  const notifications = useNotification();
  const mutation = useMutation<
    ClientDefault.AuthUserObject,
    ClientDefault.MutationAccountUpdateArgs
  >(UpdateUserMutation);
  const { data, getSession } = useAuth();

  const form = useForm({
    initialValues: {
      biography: data.value?.biography,
      first_name: data.value?.first_name,
      last_name: data.value?.last_name,
      username: data.value?.username,
    },
    validationSchema: toTypedSchema(
      object({
        biography: string().label('Biography').max(300).nullable(),
        first_name: string().required().label('First name').min(3).max(30),
        last_name: string().required().label('Last name').min(3).max(30),
        username: string()
          .required()
          .min(3)
          .max(20)
          .label('Username')
          .matches(/^[A-Za-z0-9_-]+$/, 'The user name must be alphanumeric with no blank spaces.'),
      })
    ),
  });

  const submit = async () => {
    await mutation
      .mutate({
        input: {
          biography: form.values.biography,
          first_name: form.values.first_name,
          last_name: form.values.last_name,
          username: form.values.username,
        },
      })
      .catch(() => null);

    if (mutation.error.value) {
      return notifications.addNotification({
        message: mutation.error.value?.message,
        title: 'Error',
        type: 'error',
      });
    }

    await getSession({ force: true });
    notifications.addNotification({
      message: 'Your personal information has been updated.',
      title: 'Success',
      type: 'success',
    });
  };
</script>
