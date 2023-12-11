<template>
  <form
    class="w-full rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark"
    @submit.prevent="form.handleSubmit"
  >
    <UiLayoutDivider direction="left">
      <h2 class="text-lg font-semibold">Confirm email</h2>
    </UiLayoutDivider>
    <p class="opacity-50">
      Seem like you haven't confirmed your email address yet. Please check your inbox and paste the
      confirmation code below. If you haven't received the email, please check your spam folder.
    </p>
    <UiFormInput
      type="email"
      label="Activation token"
      name="email_token"
      icon-left="lucide:braces"
      placeholder="123ABC456"
    />
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
  import { toTypedSchema } from '@vee-validate/yup';
  import * as yup from 'yup';

  const form = useForm({
    initialValues: {
      email_token: '',
    },
    validationSchema: toTypedSchema(
      yup.object({
        email_token: yup.string().required().label('Activation token').min(6).max(6),
      })
    ),
  });
</script>
