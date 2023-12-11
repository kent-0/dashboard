<template>
  <form
    class="h-fit w-full rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark"
    @submit.prevent="form.handleSubmit"
  >
    <UiLayoutDivider direction="left">
      <h2 class="text-lg font-semibold">Email</h2>
    </UiLayoutDivider>
    <p class="opacity-50">
      Your email address is used to identify you across the platform. It is visible to other users
      and can be changed at any time. When you change your email address, you will receive a
      confirmation email to the new address.
    </p>
    <UiFormInput
      type="email"
      label="Email address"
      name="email"
      icon-left="lucide:mail"
      :placeholder="session?.email.value"
    />
    <UiLayoutDivider />
    <div class="flex justify-end">
      <UiButton
        type="submit"
        icon-left="lucide:save-all"
        variant="solid"
        aria-label="Save the new user info"
        :is-disabled="form.meta.value.pending || !form.meta.value.valid"
      >
        Save changes
      </UiButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import { toTypedSchema } from '@vee-validate/yup';
  import * as yup from 'yup';

  const { getSession } = useAuth();
  const session = await getSession();

  const form = useForm({
    initialValues: {
      email: session?.email.value,
    },
    validationSchema: toTypedSchema(
      yup.object({
        email: yup.string().required().label('Email address').email(),
      })
    ),
  });
</script>
