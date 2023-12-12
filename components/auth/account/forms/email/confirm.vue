<template>
  <form
    class="h-fit w-full rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark"
    @submit.prevent="submit"
  >
    <ui-layout-divider direction="left">
      <h2 class="text-lg font-semibold">Confirm email</h2>
    </ui-layout-divider>
    <template v-if="!data?.email.is_confirmed">
      <p class="opacity-50">
        Seem like you haven't confirmed your email address yet. Please check your inbox and paste
        the confirmation code below. If you haven't received the email, please check your spam
        folder.
      </p>
      <ui-form-input
        type="text"
        label="Activation code"
        name="code"
        icon-left="lucide:braces"
        placeholder="123ABC456"
        autocomplete="off"
      />
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
    </template>
    <div
      v-show="data?.email.is_confirmed"
      class="h-full w-full flex flex flex-col items-center justify-center text-center space-y-3"
    >
      <Icon name="lucide:check-check" class="text-5xl" />
      <p>Your email address has been confirmed. You can now use all the features.</p>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import ConfirmEmailMutation from '@/graphql/mutations/email/confirm.gql';
  import { toTypedSchema } from '@vee-validate/yup';
  import { object, string } from 'yup';

  const notifications = useNotification();
  const mutation = useMutation(ConfirmEmailMutation);
  const { data, getSession } = useAuth();

  const form = useForm({
    initialValues: {
      code: '',
    },
    validationSchema: toTypedSchema(
      object({
        code: string().required().label('Activation code').min(9).max(9),
      })
    ),
  });

  const submit = async () => {
    await mutation
      .mutate({ input: { ...form.values, email: data.value?.email.value } })
      .catch(() => null);

    if (mutation.error.value) {
      return notifications.addNotification({
        message: mutation.error.value.message,
        title: 'Error',
        type: 'error',
      });
    }

    await getSession({ force: true });
    notifications.addNotification({
      message: 'Your email address has been confirmed.',
      title: 'Success',
      type: 'success',
    });
  };
</script>
