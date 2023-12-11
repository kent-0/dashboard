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
          label="First name"
          type="text"
          icon-left="lucide:book-a"
          placeholder="John"
          name="first_name"
          autocomplete="given-name"
        />
        <UiFormInput
          label="Username"
          type="text"
          icon-left="lucide:book-a"
          placeholder="Doe"
          name="last_name"
          autocomplete="family-name"
        />
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
          type="submit"
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

  definePageMeta({
    auth: {
      navigateAuthenticatedTo: '/',
      unauthenticatedOnly: true,
    },
  });

  const notifications = useNotification();

  const schema = toTypedSchema(
    yup.object({
      confirmPassword: yup
        .string()
        .required()
        .label('Password confirmation')
        .oneOf([yup.ref('password')], 'The password confirmation does not match.'),
      email: yup.string().required().label('Email').email(),
      first_name: yup
        .string()
        .required()
        .label('First name')
        .min(3, 'The first name must be longer than 3 characters.')
        .max(30, 'The first name should be less than 30 characters.'),
      last_name: yup
        .string()
        .required()
        .label('Last name')
        .min(3, 'The last name must be longer than 3 characters.')
        .max(30, 'The last name should be less than 30 characters.'),
      password: yup.string().required().label('Password').min(8).max(100),
      username: yup
        .string()
        .required()
        .min(3)
        .max(20)
        .label('Username')
        .matches(/^[A-Za-z0-9_-]+$/, 'The user name must be alphanumeric with no blank spaces.'),
    })
  );

  const { meta, values } = useForm({
    validationSchema: schema,
  });

  const { signUp } = useAuth();
  const route = useRoute();

  const submit = async () => {
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

    await signUp(
      {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
        username: values.username,
      },
      {
        callbackUrl: (route.query?.callbackUrl as string) ?? '/',
        redirect: true,
      }
    ).catch((err) => {
      return notifications.addNotification({
        message: err.data.statusMessage,
        title: 'An error has occurred',
        type: 'error',
      });
    });
  };
</script>
