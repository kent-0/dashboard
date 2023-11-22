<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-5 text-center bg-hero-hideout-components-card space-y-5 dark:bg-hero-hideout-components-cardDark"
  >
    <h1 class="animate-fade-in-down text-9xl font-bold font-title text-brand dark:text-brand-dark">
      {{ error.statusCode }}
    </h1>
    <h2 class="animate-fade-in-up text-5xl font-semibold font-title">
      {{ errorTitle }}
    </h2>
    <h4 class="max-w-2xl animate-fade-in-up text-lg">
      {{ errorDescription }}
    </h4>
    <div class="flex animate-fade-in-up gap-5">
      <ui-button
        icon-left="lucide:arrow-left"
        :variant="error.statusCode === 500 || error.statusCode === 503 ? 'ghost' : 'soft'"
        aria-label="Go to previous page"
        @click="router.back()"
      >
        Go back
      </ui-button>
      <ui-button
        v-if="error.statusCode === 500 || error.statusCode === 503"
        icon-left="lucide:refresh-cw"
        variant="solid"
        aria-label="Go to home page"
      >
        Retry
      </ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { NuxtError } from '#app';

  const router = useRouter();
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
