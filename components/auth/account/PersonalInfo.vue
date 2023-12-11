<template>
  <form
    class="w-full rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark"
    @submit.prevent="submit"
  >
    <UiLayoutDivider direction="left">
      <h2 class="text-lg font-semibold">Personal information</h2>
    </UiLayoutDivider>
    <p class="opacity-50">
      Your personal information is used to identify you across the platform. It is visible to other
      users and can be changed at any time. Remember respect the rules of the platform and do not
      use offensive words.
    </p>
    <div class="grid grid-cols-3 gap-5">
      <UiFormInput
        type="text"
        label="First name"
        name="first_name"
        icon-left="lucide:file-signature"
        :placeholder="data?.first_name"
        autocomplete="given-name"
      />
      <UiFormInput
        type="text"
        label="Last name"
        name="last_name"
        icon-left="lucide:file-signature"
        :placeholder="data?.last_name"
        autocomplete="family-name"
      />
      <UiFormInput
        type="text"
        label="Username"
        name="username"
        icon-left="lucide:at-sign"
        :placeholder="data?.username"
        autocomplete="username"
      />
    </div>
    <UiLayoutDivider />
    <div class="flex justify-end">
      <UiButton
        icon-left="lucide:save-all"
        variant="solid"
        aria-label="Save the new user info"
        type="submit"
        :is-disabled="form.meta.value.pending || !form.meta.value.valid"
      >
        Save changes
      </UiButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import UpdateUserMutation from '~/graphql/mutations/user/update.gql';

  import { toTypedSchema } from '@vee-validate/yup';
  import * as yup from 'yup';

  const { data, getSession } = useAuth();

  const form = useForm({
    initialValues: {
      first_name: data.value?.first_name,
      last_name: data.value?.last_name,
      username: data.value?.username,
    },
    validationSchema: toTypedSchema(
      yup.object({
        first_name: yup.string().required().label('First name').min(3).max(30),
        last_name: yup.string().required().label('Last name').min(3).max(30),
        username: yup
          .string()
          .required()
          .min(3)
          .max(20)
          .label('Username')
          .matches(/^[A-Za-z0-9_-]+$/, 'The user name must be alphanumeric with no blank spaces.'),
      })
    ),
  });

  const notifications = useNotification();
  const mutation = useMutation(UpdateUserMutation);

  const submit = async () => {
    await mutation.mutate({ input: form.values }).catch(() => null);

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
