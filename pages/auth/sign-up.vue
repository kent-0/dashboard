<template>
  <div class="w-full flex">
    <div
      class="min-h-screen w-1/2 bg-[url(/auth/banner-sign-up.png)] bg-cover bg-center bg-no-repeat"
    ></div>
    <div class="w-1/2 flex flex-col items-center justify-center py-5">
      <form class="max-w-110 flex flex-col space-y-5">
        <UiLayoutDivider direction="right">Kento</UiLayoutDivider>
        <h1 class="text-5xl font-title">We're glad to have you here.</h1>
        <p>
          Please complete the required fields to register your user account and manage your projects
          like never before.
        </p>
        <UiFormInput
          label="Username"
          type="text"
          icon-left="lucide:user"
          v-bind="username"
          :has-error="!!errors.username"
          :hint="errors.username"
        />
        <UiFormInput
          label="Email"
          icon-left="lucide:mail"
          type="email"
          v-bind="email"
          :has-error="!!errors.email"
          :hint="errors.email"
        />
        <UiFormInput
          label="Password"
          icon-left="lucide:key"
          type="password"
          v-bind="password"
          :has-error="!!errors.password"
          :hint="errors.password"
        />
        <UiFormInput
          label="Confirm password"
          icon-left="lucide:key"
          type="password"
          v-bind="passwordConfirm"
          :has-error="!!errors.confirmPassword"
          :hint="errors.confirmPassword as string"
        />
        <ui-button aria-label="Create a new user account" variant="solid">
          Join to the platform
        </ui-button>
        <UiLayoutDivider>Already have an account?</UiLayoutDivider>
        <ui-button-link aria-label="Go to sign in page" to="/auth" variant="soft">
          Sign In
        </ui-button-link>
        <UiLayoutDivider direction="left">Authentication</UiLayoutDivider>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { toTypedSchema } from '@vee-validate/yup';
  import * as yup from 'yup';

  useHead({
    meta: [
      {
        content: 'Register your user account and manage your projects like never before.',
        name: 'description',
      },
    ],
    title: 'Sign Up',
  });

  const schema = toTypedSchema(
    yup.object({
      confirmPassword: yup
        .string()
        .required('The password confirmation is required.')
        .oneOf([yup.ref('password')], 'Passwords must match.'),
      email: yup
        .string()
        .required('The email is required.')
        .email('Please enter a valid email address.'),
      password: yup
        .string()
        .required('The password is required.')
        .min(8, 'The password must be at least 8 characters.')
        .max(20, 'The password must lower than 20 characters.'),
      username: yup
        .string()
        .required('The username is required.')
        .min(3, 'The username must be at least 3 characters.')
        .max(20, 'The username must lower than 20 characters.'),
    })
  );

  const { defineInputBinds, errors } = useForm({
    validationSchema: schema,
  });

  const username = defineInputBinds('username');
  const email = defineInputBinds('email');
  const password = defineInputBinds('password');
  const passwordConfirm = defineInputBinds('confirmPassword');
</script>
