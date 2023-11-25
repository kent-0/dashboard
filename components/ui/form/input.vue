<template>
  <label>
    <span>Input label</span>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script setup lang="ts">
  defineOptions({
    inheritAttrs: false,
  });
</script>
