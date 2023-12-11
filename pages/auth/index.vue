<template>
  <div class="w-full flex">
    <div
      class="min-h-screen w-1/2 bg-[url(/auth/banner-sign-in.png)] bg-cover bg-center bg-no-repeat"
    ></div>
    <div class="w-1/2 flex flex-col items-center justify-center py-5">
      <form class="max-w-110 flex flex-col space-y-5" @submit.prevent="submit">
        <UiLayoutDivider direction="right">Kento</UiLayoutDivider>
        <h1 class="text-5xl font-title">Welcome back!</h1>
        <p>
          Please sign in to your account to continue using our services. If you don't have an
          account yet, you can create one by clicking the button below.
        </p>
        <ui-overlay-notification-individual
          v-if="route.query?.error === 'CredentialsSignin'"
          title="Crendetials wrong"
          message="The username or password you entered is incorrect. Please check your credentials and try again."
          type="warning"
        />
        <UiFormInput
          autocomplete="username"
          label="Username"
          type="text"
          icon-left="lucide:user"
          placeholder="mycoolusernamehere"
          name="username"
        />
        <UiFormInput
          autocomplete="current-password"
          label="Password"
          icon-left="lucide:key"
          type="password"
          placeholder="My super secret password"
          name="password"
        />
        <ui-button
          :is-disabled="meta.pending || !meta.valid"
          aria-label="Sign in with current existing user"
          variant="solid"
          type="submit"
        >
          Sign In
        </ui-button>
        <ui-button-link
          :is-disabled="meta.pending"
          aria-label="Create a new user account"
          variant="soft"
          to="/auth/sign-up"
        >
          Sign Up
        </ui-button-link>
        <UiLayoutDivider>Or login using social networks</UiLayoutDivider>
        <div class="grid grid-cols-2 gap-5">
          <ui-button
            variant="ghost"
            icon-left="lucide:github"
            aria-label="Login with Github account"
            :is-disabled="meta.pending"
          >
            Github
          </ui-button>
          <ui-button
            variant="ghost"
            icon-left="lucide:twitter"
            aria-label="Login with Twitter account"
            :is-disabled="meta.pending"
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

  definePageMeta({
    auth: {
      navigateAuthenticatedTo: '/',
      unauthenticatedOnly: true,
    },
  });

  const notifications = useNotification();
  const route = useRoute();

  const schema = toTypedSchema(
    yup.object({
      password: yup
        .string()
        .required('The password is required.')
        .min(8)
        .max(100)
        .label('Password'),
      username: yup
        .string()
        .required()
        .min(3)
        .max(20)
        .matches(/^[A-Za-z0-9_-]+$/, 'The user name must be alphanumeric with no blank spaces.')
        .label('Username'),
    })
  );

  const { meta, values } = useForm({
    validationSchema: schema,
  });

  const { signIn } = useAuth();

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

    await signIn(values, {
      callbackUrl: (route.query?.callbackUrl as string) ?? '/',
      redirect: true,
    });
  };
</script>
