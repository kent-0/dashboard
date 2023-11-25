<template>
  <div class="flex items-center gap-5">
    <hr
      v-show="direction !== 'left'"
      class="w-full border-components-extra dark:border-components-extraDark"
    />
    <small class="shrink-0 opacity-70">
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
