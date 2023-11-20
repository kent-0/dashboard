<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-5 text-center bg-hero-hideout-components-card space-y-5 dark:bg-hero-hideout-components-cardDark"
  >
    <h1
      class="text-9xl font-bold font-title text-brand animate__animated animate__fadeInDown dark:text-brand-dark"
    >
      {{ error.statusCode }}
    </h1>
    <h2 class="text-5xl font-semibold font-title animate__animated animate__fadeInUp">
      {{ errorTitle }}
    </h2>
    <h4 class="max-w-2xl text-lg animate__animated animate__fadeInUp">
      {{ errorDescription }}
    </h4>
  </div>
</template>

<script setup lang="ts">
  import type { NuxtError } from '#app';

  const props = defineProps<{
    error: NuxtError;
  }>();

  const errorTitle = ref('Unknown error');
  const errorDescription = ref('An unknown error occurred. Please try again later.');

  switch (props.error.statusCode) {
    case 404:
      errorTitle.value = 'Page not found';
      errorDescription.value =
        'The page you are looking for might have been removed had its name changed or is temporarily unavailable.';
      break;
    case 500:
      errorTitle.value = 'Server error';
      errorDescription.value =
        "An error occurred and your request couldn't be completed. Please try again later.";
      break;
    case 503:
      errorTitle.value = 'Service unavailable';
      errorDescription.value =
        'The server is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later.';
      break;
    case 403:
      errorTitle.value = 'Forbidden';
      errorDescription.value = "You don't have permission to access this resource.";
      break;
    case 401:
      errorTitle.value = 'Unauthorized';
      errorDescription.value = "You don't have permission to access this resource.";
      break;
    default:
      errorTitle.value = 'Unknown error';
      errorDescription.value = 'An unknown error occurred. Please try again later.';
      break;
  }
</script>
