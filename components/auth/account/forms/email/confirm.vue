<template>
  <ui-overlay-modal class="w-full lg:w-sm" title="Confirm email account" :disclosure="disclosure">
    <template #content>
      <form class="flex flex-col space-y-3" @submit.prevent="submit">
        <p>
          We have sent you a confirmation code to your email address. Please enter it below to
          confirm your email account.
        </p>
        <ui-form-input
          type="text"
          label="Activation code"
          name="code"
          icon-left="lucide:braces"
          placeholder="123ABC456"
          autocomplete="off"
          prefix="email"
        />
        <ui-button
          label="Confirm"
          variant="solid"
          class="w-full"
          type="submit"
          aria-label="Confirm email account"
          :is-disabled="!form.meta.value.valid"
          :is-loading="mutation.loading.value"
        >
          Confirm
        </ui-button>
      </form>
    </template>
    <template #footer>
      <small class="opacity-50">
        By clicking on the button below, you accept our Terms of Service and Privacy Policy.
      </small>
    </template>
  </ui-overlay-modal>
</template>

<script lang="ts" setup>
  import ConfirmEmailMutation from '@/graphql/mutations/email/confirm.gql';
  import { object, string } from 'yup';

  import type { ClientDefault } from '#gql/types';

  const notifications = useNotification();
  const { data, getSession } = useAuth();
  const mutation = useMutation<
    ClientDefault.AuthUserEmailObject,
    ClientDefault.MutationConfirmEmailArgs
  >(ConfirmEmailMutation);

  const props = defineProps<{
    disclosure: ReturnType<typeof useModal>;
  }>();

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
      .mutate({ input: { code: form.values.code!, email: data.value!.email.value } })
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

    props.disclosure.close();
  };
</script>
