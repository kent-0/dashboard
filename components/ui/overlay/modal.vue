<template>
  <client-only>
    <teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="disclosure.isOpen.value"
          class="fixed inset-0 backdrop-brightness-40"
          @click="disclosure.close"
        ></div>
      </transition>

      <transition
        enter-active-class="transition ease-out duration-300 transform"
        enter-from-class="opacity-0 translate-y-full md:translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200 transform"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-full md:translate-y-4"
      >
        <div
          v-if="disclosure.isOpen.value"
          role="modal"
          class="fixed inset-0 flex items-end justify-center md:items-center"
        >
          <section
            class="z-60 flex flex-col rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark"
            :class="$attrs.class"
          >
            <header class="flex items-center justify-between gap-2">
              <h1 class="line-clamp-1 text-lg font-semibold">{{ title }}</h1>
              <ui-button-icon
                icon="lucide:x"
                variant="ghost"
                aria-label="Close the current upen modal"
                @click="disclosure.close"
              />
            </header>
            <ui-layout-divider />
            <section>
              <slot name="content" />
            </section>
            <ui-layout-divider />
            <footer>
              <slot name="footer" />
            </footer>
          </section>
        </div>
      </transition>
    </teleport>
  </client-only>
</template>

<script lang="ts" setup>
  defineProps<{
    disclosure: ReturnType<typeof useModal>;
    title: string;
  }>();

  defineOptions({
    inheritAttrs: false,
  });
</script>
