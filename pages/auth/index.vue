<template>
  <div class="w-full flex">
    <div
      class="min-h-screen w-1/2 bg-[url(/auth/banner-sign-up.png)] bg-cover bg-center bg-no-repeat"
    ></div>
    <div class="w-1/2 flex flex-col items-center justify-center py-5">
      <form class="max-w-110 flex flex-col space-y-5">
        <UiLayoutDivider direction="right">Kento</UiLayoutDivider>
        <h1 class="text-5xl font-title">Welcome back!</h1>
        <p>
          Please sign in to your account to continue using our services. If you don't have an
          account yet, you can create one by clicking the button below.
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
          label="Password"
          icon-left="lucide:key"
          type="password"
          v-bind="password"
          :has-error="!!errors.password"
          :hint="errors.password"
        />
        <ui-button aria-label="Sign in with current existing user" variant="solid">
          Sign In
        </ui-button>
        <ui-button-link aria-label="Create a new user account" variant="soft" to="/auth/sign-up">
          Sign Up
        </ui-button-link>
        <UiLayoutDivider>Or login using social networks</UiLayoutDivider>
        <div class="grid grid-cols-2 gap-5">
          <ui-button
            variant="ghost"
            icon-left="lucide:github"
            aria-label="Login with Github account"
          >
            Github
          </ui-button>
          <ui-button
            variant="ghost"
            icon-left="lucide:twitter"
            aria-label="Login with Twitter account"
          >
            Twitter
          </ui-button>
        </div>
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
        content: 'Sign in to your account to continue using our services.',
        name: 'description',
      },
    ],
    title: 'Sign In',
  });

  const schema = toTypedSchema(
    yup.object({
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
  const password = defineInputBinds('password');
</script>
