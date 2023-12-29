<template>
  <nuxt-layout name="auth-account">
    <div
      class="w-full flex flex-col rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark"
    >
      <ui-layout-divider direction="left">
        <h2 class="text-lg font-semibold">Theme</h2>
      </ui-layout-divider>
      <p class="opacity-50">
        The theme is the color scheme of the application. It is the color of the background, the
        text, the buttons, etc.
      </p>
      <div
        role="button"
        class="flex items-center rounded-md bg-components-element p-5 transition duration-300 space-x-3 dark:bg-components-elementDark hover:(ring-2 ring-brand dark:ring-brand-dark)"
        :class="{
          'ring-brand ring-2 dark:ring-brand-dark': theme.value === 'light',
        }"
        @click="theme.preference = 'light'"
      >
        <div class="h-20 w-1/3 rounded-md bg-components-card"></div>
        <div class="flex flex-col space-y-2">
          <h2 class="text-xl">Light mode</h2>
          <p>
            Uses light text on dark backgrounds, ideal for reducing eye strain in low-light
            environments and saving energy on OLED screens.
          </p>
        </div>
      </div>
      <div
        role="button"
        class="flex items-center rounded-md bg-components-element p-5 transition duration-300 space-x-3 dark:bg-components-elementDark hover:(ring-2 ring-brand dark:ring-brand-dark)"
        :class="{
          'ring-brand ring-2 dark:ring-brand-dark': theme.value === 'dark',
        }"
        @click="theme.preference = 'dark'"
      >
        <div class="h-20 w-1/3 rounded-md bg-components-cardDark"></div>
        <div class="flex flex-col space-y-2">
          <h2 class="text-xl">Dark mode</h2>
          <p>
            Employs dark text on light backgrounds, favored in well-lit settings for better
            readability and a traditional, clean appearance.
          </p>
        </div>
      </div>
    </div>
  </nuxt-layout>
</template>

<script lang="ts" setup>
  const theme = useColorMode();
</script>
