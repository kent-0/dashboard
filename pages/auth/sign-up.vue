<template>
  <div class="w-full flex">
    <div
      class="min-h-screen w-1/2 bg-[url(/auth/banner-sign-up.png)] bg-cover bg-center bg-no-repeat"
    ></div>
    <div class="w-1/2 flex flex-col items-center justify-center py-5">
      <form class="max-w-110 flex flex-col space-y-5" @submit.prevent="submit">
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
          placeholder="mycoolusernamehere"
          name="username"
        />
        <UiFormInput
          label="Email"
          icon-left="lucide:mail"
          type="email"
          placeholder="example@kento.app"
          name="email"
        />
        <UiFormInput
          label="Password"
          icon-left="lucide:key"
          type="password"
          placeholder="My super secret password"
          name="password"
        />
        <UiFormInput
          label="Confirm password"
          icon-left="lucide:key"
          type="password"
          placeholder="My super secret password confirmation"
          name="confirmPassword"
        />
        <ui-button
          :is-disabled="meta.pending || !meta.valid"
          aria-label="Create a new user account"
          variant="solid"
        >
          Join to the platform
        </ui-button>
        <UiLayoutDivider>Already have an account?</UiLayoutDivider>
        <ui-button-link
          :is-disabled="meta.pending"
          aria-label="Go to sign in page"
          to="/auth"
          variant="soft"
        >
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

  const notifications = useNotification();

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
        .max(100, 'The password must lower than 100 characters.'),
      username: yup
        .string()
        .required('The username is required.')
        .min(3, 'The username must be at least 3 characters.')
        .max(20, 'The username must lower than 20 characters.')
        .matches(/^[A-Za-z0-9_-]+$/, 'The user name must be alphanumeric with no blank spaces.'),
    })
  );

  const { meta } = useForm({
    validationSchema: schema,
  });

  const submit = () => {
    if (!meta.value.valid) {
      return notifications.addNotification({
        message: 'Please check the form and try again.',
        title: 'Missing required fields',
        type: 'error',
      });
    }

    if (meta.value.pending) {
      return notifications.addNotification({
        message: 'Please wait for the current request to finish.',
        title: 'Request in progress',
        type: 'warning',
      });
    }
  };
</script>
