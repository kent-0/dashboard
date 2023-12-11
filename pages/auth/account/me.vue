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
    <AuthAccountPersonalInfo />
    <div class="grid grid-cols-2 gap-5">
      <AuthAccountEmailUpdate />
      <AuthAccountEmailConfirm />
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
