<template>
  <nuxt-layout>
    <nuxt-loading-indicator :color="colorLoadingIndicator" />
    <nuxt-page />
    <client-only>
      <ui-overlay-notification-container />
    </client-only>
  </nuxt-layout>
</template>
\
<script setup lang="ts">
  import { theme } from '@unocss/preset-mini';

  const colorLoadingIndicator = theme.colors.emerald['400'];
</script>
