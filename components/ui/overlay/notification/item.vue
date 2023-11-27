<template>
  <div
    class="max-w-sm w-full flex items-center rounded-lg bg-components-card p-5 space-x-5 dark:bg-components-cardDark"
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
      <icon v-show="type === 'loading'" name="lucide:loader" class="animate-spin" />
    </div>
    <div
      class="w-full flex flex-col"
      :class="{
        'gap-2': message !== null || actions.length > 0,
      }"
    >
      <div class="flex justify-between space-x-1">
        <span class="line-clamp-2">{{ title }}</span>
        <div
          class="flex cursor-pointer items-center justify-center p-1 opacity-70 transition duration-300 hover:(opacity-100)"
        >
          <icon name="lucide:x" />
        </div>
      </div>
      <hr class="border-components-element dark:border-components-elementDark" />
      <p v-show="message !== null" class="line-clamp-10 text-sm">{{ message }}</p>
      <div v-show="actions.length > 0" class="flex flex-wrap gap-2">
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
  withDefaults(
    defineProps<{
      actions?: Array<
        UnwrapRefSimple<{
          iconLeft?: `lucide:${string}`;
          iconRight?: `lucide:${string}`;
          label: string;
          onClick: () => void;
        }>
      >;
      message?: string;
      title: string;
      type?: 'error' | 'info' | 'loading' | 'success' | 'warning';
    }>(),
    {
      // eslint-disable-next-line vue/require-valid-default-prop
      actions: [],
      message: null,
      type: 'info',
    }
  );
</script>
