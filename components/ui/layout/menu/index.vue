<template>
  <div class="flex flex-col space-y-2">
    <ui-layout-divider v-if="title" direction="left">{{ title }}</ui-layout-divider>
    <ul v-for="item in items" :key="item.title">
      <li
        class="flex cursor-pointer items-center rounded-md px-3 py-1 transition duration-300 space-x-2 hover:(bg-components-element text-brand dark:bg-components-elementDark dark:text-brand-dark)"
      >
        <icon :name="item.icon" />
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    items: Array<{
      icon: string;
      title: string;
    }>;
    title?: string;
  }>();
</script>
