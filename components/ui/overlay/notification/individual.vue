<template>
  <div
    class="h-fit w-full flex items-center rounded-lg bg-components-card p-5 space-x-5 dark:bg-components-cardDark"
  >
    <div
      class="flex items-center justify-center"
      :class="{
        'text-error dark:text-error-dark': type === 'error',
        'text-warning dark:text-warning-dark': type === 'warning',
        'text-success dark:text-success-dark': type === 'success',
      }"
    >
      <icon v-show="type === 'info' || !type" name="lucide:info" />
      <icon v-show="type === 'success'" name="lucide:check" />
      <icon v-show="type === 'warning'" name="lucide:alert-triangle" />
      <icon v-show="type === 'error'" name="lucide:x-circle" />
    </div>
    <div
      class="w-full flex flex-col"
      :class="{
        'gap-1': !!message,
      }"
    >
      <span class="line-clamp-2">{{ title }}</span>
      <hr class="border-components-element dark:border-components-elementDark" />
      <p v-show="!!message" class="line-clamp-10 text-sm">{{ message }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
  withDefaults(
    defineProps<{
      message?: string;
      title: string;
      type?: 'error' | 'info' | 'success' | 'warning';
    }>(),
    {
      message: undefined,
      type: 'info',
    }
  );
</script>
