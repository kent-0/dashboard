<template>
  <nuxt-layout name="auth-account">
    <main class="flex flex flex-col space-y-5">
      <div class="w-full rounded-md bg-components-card p-5 dark:bg-components-cardDark">
        <ui-layout-divider direction="left">
          <h2 class="text-lg font-semibold">Avatar</h2>
        </ui-layout-divider>
        <div class="flex flex-col items-center justify-between gap-5 md:flex-row">
          <p class="max-w-md opacity-50">
            Your avatar is used to identify you across the platform and is visible to other users.
            To change your avatar, click on it and select a new one. The image file size must be
            less than 2MB and the format must be JPG, PNG or GIF.
          </p>
          <UiElementsAvatar
            :name="`${data?.first_name} ${data?.last_name}`"
            class="h-30 w-30 hover:(ring-2 ring-brand dark:ring-brand-dark)"
          />
        </div>
      </div>
      <auth-account-forms-personal-info />
      <div
        class="h-fit w-full rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark"
      >
        <ui-layout-divider direction="left">
          <h2 class="text-lg font-semibold">Email</h2>
        </ui-layout-divider>
        <p class="opacity-50">
          Your email address is used to identify you across the platform. It is visible to other
          users and cant be changed at any time. This email address is also used to send you
          notifications and newsletters.
        </p>
        <ui-overlay-notification-individual
          v-if="!data?.email.is_confirmed"
          title="Confirm email"
          message="Please confirm your email address to use all your account features."
          type="warning"
          :actions="[
            {
              label: 'Confirm',
              iconLeft: 'lucide:check',
              variant: 'solid',
              onClick: () => modal.open(),
            },
          ]"
        />
        <ui-overlay-notification-individual
          v-if="data?.email.is_confirmed"
          title="Email confirmed"
          message="Now you can use all your account features."
          type="success"
        />
        <auth-account-forms-email-confirm :disclosure="modal" />
        <p
          class="rounded-mg rounded-md bg-components-element p-3 text-center dark:bg-components-elementDark"
        >
          {{ data?.email.value }}
        </p>
      </div>
    </main>
  </nuxt-layout>
</template>

<script lang="ts" setup>
  const { data } = useAuth();
  const modal = useModal();

  useHead({
    meta: [
      {
        content: 'My account page',
        name: 'description',
      },
    ],
    title: `My account - ${data.value?.first_name} ${data.value?.last_name}`,
  });
</script>
