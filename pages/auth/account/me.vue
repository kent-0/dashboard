<template>
  <main class="flex flex flex-col space-y-5">
    <div class="w-full rounded-md bg-components-card p-5 dark:bg-components-cardDark">
      <UiLayoutDivider direction="left">
        <h2 class="text-lg font-semibold">Avatar</h2>
      </UiLayoutDivider>
      <div class="flex items-center justify-between gap-5">
        <p class="max-w-lg opacity-50">
          Your avatar is used to identify you across the platform. It is visible to other users and
          can be changed at any time. It is recommended to use a square image. The image will be
          resized to 512x512 pixels. The maximum file size is 2MB.
        </p>
        <NuxtImg
          :src="avatar"
          class="h-30 w-30 cursor-pointer rounded-full ring-4 ring-brand transition duration-300 hover:ring-6 dark:ring-brand-dark"
        />
      </div>
    </div>
    <div class="w-full rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark">
      <UiLayoutDivider direction="left">
        <h2 class="text-lg font-semibold">Personal information</h2>
      </UiLayoutDivider>
      <p class="opacity-50">
        Your personal information is used to identify you across the platform. It is visible to
        other users and can be changed at any time. Remember respect the rules of the platform and
        do not use offensive words.
      </p>
      <form class="grid grid-cols-3 gap-5">
        <UiFormInput
          type="text"
          label="First name"
          name="fist_name"
          icon-left="lucide:file-signature"
          :placeholder="session?.first_name"
          autocomplete="given-name"
        />
        <UiFormInput
          type="text"
          label="Last name"
          name="last_name"
          icon-left="lucide:file-signature"
          :placeholder="session?.last_name"
          autocomplete="family-name"
        />
        <UiFormInput
          type="text"
          label="Username"
          name="username"
          icon-left="lucide:at-sign"
          :placeholder="session?.username"
          autocomplete="username"
        />
      </form>
      <UiLayoutDivider />
      <div class="flex justify-end">
        <UiButton icon-left="lucide:save-all" variant="solid" aria-label="Save the new user info">
          Save changes
        </UiButton>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-5">
      <div
        class="h-fit w-full rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark"
      >
        <UiLayoutDivider direction="left">
          <h2 class="text-lg font-semibold">Email</h2>
        </UiLayoutDivider>
        <p class="opacity-50">
          Your email address is used to identify you across the platform. It is visible to other
          users and can be changed at any time. When you change your email address, you will receive
          a confirmation email to the new address.
        </p>
        <form>
          <UiFormInput
            type="email"
            label="Email address"
            name="email"
            icon-left="lucide:mail"
            :placeholder="session?.email.value"
          />
        </form>
        <UiLayoutDivider />
        <div class="flex justify-end">
          <UiButton icon-left="lucide:save-all" variant="solid" aria-label="Save the new user info">
            Save changes
          </UiButton>
        </div>
      </div>
      <div class="w-full rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark">
        <UiLayoutDivider direction="left">
          <h2 class="text-lg font-semibold">Confirm email</h2>
        </UiLayoutDivider>
        <p class="opacity-50">
          Seem like you haven't confirmed your email address yet. Please check your inbox and paste
          the confirmation code below. If you haven't received the email, please check your spam
          folder.
        </p>
        <form>
          <UiFormInput
            type="email"
            label="Activation token"
            name="email_token"
            icon-left="lucide:braces"
            placeholder="123ABC456"
          />
        </form>
        <UiLayoutDivider />
        <div class="flex justify-end">
          <UiButton icon-left="lucide:save-all" variant="solid" aria-label="Save the new user info">
            Save changes
          </UiButton>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
  const { getSession } = useAuth();
  const session = await getSession();
  const avatar =
    'https://cdn.discordapp.com/avatars/1095572785482444860/1f27c2ff29fbb5ea83021e43bc646aea.png?size=512';

  useHead({
    meta: [
      {
        content: 'My account page',
        name: 'description',
      },
    ],
    title: `My account - ${session?.first_name} ${session?.last_name}`,
  });

  definePageMeta({
    layout: 'auth-account',
  });
</script>

<style scoped></style>
