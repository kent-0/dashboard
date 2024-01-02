<template>
  <div class="flex flex-col space-y-2">
    <ui-layout-divider v-if="title" direction="left">{{ title }}</ui-layout-divider>
    <ul v-for="item in items" :key="item.to as string">
      <li>
        <nuxt-link
          :aria-selected="item.to === $route.path"
          :to="item.to"
          class="flex items-center rounded-md px-3 py-1 transition duration-300 space-x-2 hover:(bg-components-element text-brand dark:bg-components-elementDark dark:text-brand-dark)"
          exact-active-class="text-brand dark:text-brand-dark hover:opacity-70 dark:bg-brand-dark/10 bg-brand-dark/10"
        >
          <icon :name="item.icon" />
          <span>{{ item.title }}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import type { RouteLocationRaw } from '#vue-router';

  defineProps<{
    items: Array<{
      icon: string;
      title: string;
      to: RouteLocationRaw;
    }>;
    title?: string;
  }>();
</script>
