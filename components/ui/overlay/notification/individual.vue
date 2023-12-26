<template>
  <div
    class="h-fit w-full flex items-center rounded-lg bg-components-element p-5 space-x-5 dark:bg-components-elementDark"
  >
    <div
      class="flex items-center justify-center text-2xl"
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
        'space-y-2': !!message,
      }"
    >
      <div class="flex flex-col">
        <span class="line-clamp-2">{{ title }}</span>
        <small v-show="!!message" class="line-clamp-10 opacity-50">{{ message }}</small>
      </div>
      <div v-show="actions.length > 0" class="flex flex-wrap gap-2">
        <ui-button
          v-for="action in actions"
          :key="action.label"
          :variant="action.variant ?? 'ghost'"
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
  withDefaults(
    defineProps<{
      actions?: (NotificationActions & { variant?: 'ghost' | 'outline' | 'soft' | 'solid' })[];
      message?: string;
      title: string;
      type?: 'error' | 'info' | 'success' | 'warning';
    }>(),
    {
      actions: () => [],
      message: undefined,
      type: 'info',
    }
  );
</script>
