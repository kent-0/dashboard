<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-5 text-center bg-hero-hideout-components-card space-y-5 dark:bg-hero-hideout-components-cardDark"
  >
    <h1
      class="text-9xl font-bold font-title text-brand animate__animated animate__fadeInDown dark:text-brand-dark"
    >
      {{ error.statusCode }}
    </h1>

    <template v-if="error.statusCode === 404">
      <h2 class="text-5xl font-semibold font-title animate__animated animate__fadeInUp">
        Page not found
      </h2>
      <h3 class="max-w-2xl text-2xl animate__animated animate__fadeInUp">
        The page you are looking for might have been removed had its name changed or is temporarily
        unavailable.
      </h3>
    </template>

    <template v-if="error.statusCode === 500">
      <h2 class="text-5xl font-semibold font-title animate__animated animate__fadeInUp">
        Server error
      </h2>
      <h3 class="max-w-2xl text-2xl animate__animated animate__fadeInUp">
        An error occurred and your request couldn't be completed. Please try again later.
      </h3>
    </template>

    <template v-if="error.statusCode === 503">
      <h2 class="text-5xl font-semibold font-title animate__animated animate__fadeInUp">
        Service unavailable
      </h2>
      <h3 class="max-w-2xl text-2xl animate__animated animate__fadeInUp">
        The server is temporarily unable to service your request due to maintenance downtime or
        capacity problems. Please try again later.
      </h3>
    </template>
  </div>
</template>

<script setup lang="ts">
  import type { NuxtError } from '#app';

  defineProps<{
    error: NuxtError;
  }>();
</script>
