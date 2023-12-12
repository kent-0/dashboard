<template>
  <main class="flex flex flex-col space-y-5">
    <div class="w-full rounded-md bg-components-card p-5 dark:bg-components-cardDark">
      <UiLayoutDivider direction="left">
        <h2 class="text-lg font-semibold">Avatar</h2>
      </UiLayoutDivider>
      <div class="flex items-center justify-between gap-5">
        <p class="max-w-lg opacity-50">
          Your avatar is used to identify you across the platform and is visible to other users. To
          change your avatar, click on it and select a new one. The image file size must be less
          than 2MB and the format must be JPG, PNG or GIF.
        </p>
        <NuxtImg
          :src="avatar"
          class="h-30 w-30 cursor-pointer rounded-full ring-4 ring-brand transition duration-300 hover:ring-6 dark:ring-brand-dark"
        />
      </div>
    </div>
    <AuthAccountFormsPersonalInfo />
    <div class="grid grid-cols-2 gap-5">
      <div
        class="h-fit w-full rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark"
      >
        <UiLayoutDivider direction="left">
          <h2 class="text-lg font-semibold">Email</h2>
        </UiLayoutDivider>
        <p class="opacity-50">
          Your email address is used to identify you across the platform. It is visible to other
          users and cant be changed at any time. This email address is also used to send you
          notifications and newsletters.
        </p>
        <p
          class="rounded-mg rounded-md bg-components-element p-3 text-center dark:bg-components-elementDark"
        >
          {{ data?.email.value }}
        </p>
      </div>
      <AuthAccountFormsEmailConfirm />
    </div>
  </main>
</template>

<script lang="ts" setup>
  const { data } = useAuth();
  const avatar =
    'https://cdn.discordapp.com/avatars/1095572785482444860/1f27c2ff29fbb5ea83021e43bc646aea.png?size=512';

  useHead({
    meta: [
      {
        content: 'My account page',
        name: 'description',
      },
    ],
    title: `My account - ${data.value?.first_name} ${data.value?.last_name}`,
  });

  definePageMeta({
    layout: 'auth-account',
  });
</script>
