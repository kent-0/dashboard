<template>
  <div
    class="flex items-center"
    :class="{
      'gap-5': $slots.default !== undefined,
    }"
  >
    <hr
      v-show="direction !== 'left'"
      class="w-full border-components-extra dark:border-components-extraDark"
    />
    <small v-show="$slots.default !== undefined" class="shrink-0 opacity-70">
      <slot></slot>
    </small>
    <hr
      v-show="direction !== 'right'"
      class="w-full border-components-extra dark:border-components-extraDark"
    />
  </div>
</template>
<script setup lang="ts">
  defineProps<{
    direction?: 'left' | 'right';
  }>();
</script>
