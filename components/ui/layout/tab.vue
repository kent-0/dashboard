<template>
  <div
    ref="tabContainer"
    role="tablist"
    class="w-full flex items-center gap-1 overflow-x-auto scroll-smooth rounded-lg bg-components-element p-1 dark:bg-components-elementDark"
  >
    <nuxt-link
      v-for="item in items"
      :key="item.href"
      role="tab"
      :aria-selected="item.href === $route.path"
      class="flex items-center gap-2 p-2 transition duration-300 hover:opacity-70"
      :href="item.href"
      active-class="bg-components-card dark:bg-components-cardDark rounded-md text-brand dark:text-brand-dark"
    >
      <icon :name="item.icon" />
      <span>{{ item.label }}</span>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    items: Array<{
      href: string;
      icon: string;
      label: string;
    }>;
  }>();

  // check if tab container has scroll
  const tabContainer = ref<HTMLElement | null>(null);
  const hasScroll = ref(false);

  onMounted(() => {
    const container = tabContainer.value;
    if (container) {
      hasScroll.value = container.scrollWidth > container.clientWidth;
    }
  });
</script>

<style scoped>
  [role='tablist'] {
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
