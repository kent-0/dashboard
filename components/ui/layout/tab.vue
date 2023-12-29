<template>
  <nav
    ref="tabContainer"
    role="tablist"
    class="flex items-center gap-1 overflow-x-auto scroll-smooth rounded-lg bg-components-element p-1 dark:bg-components-elementDark"
    :class="{
      'w-full': filled,
      'w-fit': !filled,
    }"
  >
    <nuxt-link
      v-for="item in items"
      :key="item.href"
      role="tab"
      :aria-selected="item.href === $route.path"
      class="flex items-center justify-center gap-2 p-2 text-center transition duration-300 hover:opacity-50"
      :class="{
        'w-full': filled,
        'w-fit': !filled,
      }"
      :href="item.href"
      active-class="bg-components-card dark:bg-components-cardDark rounded-md text-brand dark:text-brand-dark"
    >
      <icon :name="item.icon" />
      <span>{{ item.label }}</span>
    </nuxt-link>
  </nav>
</template>

<script setup lang="ts">
  defineProps<{
    filled?: boolean;
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
