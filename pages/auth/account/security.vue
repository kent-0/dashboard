<template>
  <nuxt-layout name="auth-account">
    <div
      class="w-full flex flex-col rounded-md bg-components-card p-5 space-y-2 dark:bg-components-cardDark"
    >
      <ui-layout-divider direction="left">
        <h2 class="text-lg font-semibold">Password</h2>
      </ui-layout-divider>
      <p class="opacity-50">
        Change your password to something thatasdsad is harasdasdd to guess and unique to this
        account. Never use the same password on multiple sites.
      </p>
      <form class="flex flex-col space-y-3" @submit.prevent="submit">
        <ui-form-input
          label="Current password"
          type="password"
          name="currentPassword"
          prefix="change_password"
        />
        <ui-form-input
          label="New password"
          type="password"
          name="newPassword"
          prefix="change_password"
        />
        <ui-button
          class="self-end"
          type="submit"
          variant="solid"
          aria-label="Confirm the change of the current password"
          icon-left="lucide:save"
          :is-disabled="!form.meta.value.valid"
          :is-loading="mutation.loading.value"
        >
          Change password
        </ui-button>
      </form>
    </div>
  </nuxt-layout>
</template>

<script lang="ts" setup>
  import ChangePasswordMutation from '@/graphql/mutations/password/change-password.gql';
  import * as yup from 'yup';

  import type { ClientDefault } from '#gql/types';

  const { getSession } = useAuth();
  const notifications = useNotification();
  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validationSchema: yup.object({
      currentPassword: yup.string().label('Current password').required(),
      newPassword: yup.string().label('New password').required(),
    }),
  });

  const mutation = useMutation<
    { changePassword: string },
    ClientDefault.MutationChangePasswordArgs
  >(ChangePasswordMutation);

  const submit = async () => {
    const response = await mutation
      .mutate({
        input: {
          currentPassword: form.values.currentPassword,
          newPassword: form.values.newPassword,
        },
      })
      .catch(() => null);

    if (mutation.error.value) {
      return form.setErrors({
        currentPassword: mutation.error.value.message,
      });
    }

    await getSession({ force: true });
    notifications.addNotification({
      message: response?.data?.changePassword,
      title: 'Success',
      type: 'success',
    });
  };

  useHead({
    meta: [
      {
        content: 'Change my current user password',
        name: 'description',
      },
    ],
    title: `Password`,
  });
</script>
