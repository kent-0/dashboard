<template>
  <div
    class="h-fit max-w-sm w-full flex items-center rounded-lg bg-components-element p-5 space-x-5 dark:bg-components-elementDark"
  >
    <div
      class="flex items-center justify-center text-2xl"
      :class="{
        'text-error dark:text-error-dark': type === 'error',
        'text-warning dark:text-warning-dark': type === 'warning',
        'text-success dark:text-success-dark': type === 'success',
      }"
    >
      <icon v-if="type === 'info' || !type" name="lucide:info" />
      <icon v-if="type === 'success'" name="lucide:check" />
      <icon v-if="type === 'warning'" name="lucide:alert-triangle" />
      <icon v-if="type === 'error'" name="lucide:x-circle" />
    </div>
    <div
      class="w-full flex flex-col"
      :class="{
        'gap-2': !!message || actions.length > 0,
      }"
    >
      <div class="flex justify-between space-x-1">
        <span class="line-clamp-2 font-semibold">{{ title }}</span>
        <div
          class="flex cursor-pointer items-center justify-center p-1 opacity-70 transition duration-300 hover:(opacity-100)"
          @click="removeNotification"
        >
          <icon name="lucide:x" />
        </div>
      </div>
      <p v-if="!!message" class="line-clamp-10 text-sm">{{ message }}</p>
      <div v-if="actions.length > 0" class="flex flex-wrap gap-2">
        <ui-button
          v-for="action in actions"
          :key="action.label"
          variant="ghost"
          class="w-fit"
          :aria-label="action.label"
          :icon-left="action.iconLeft"
          :icon-right="action.iconRight"
          @click="action.onClick"
        >
          {{ action.label }}
        </ui-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { NotificationOptions } from '~/composables/ui/overlay/use-notification';

  withDefaults(
    defineProps<
      NotificationOptions & {
        removeNotification: () => void;
      }
    >(),
    {
      actions: () => [],
      message: undefined,
      type: 'info',
    }
  );
</script>
