<template>
  <div
    ref="reference"
    :class="$attrs.class"
    aria-label="Represent an element that has a tooltip"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <slot />
  </div>
  <transition
    enter-active-class="transition-opacity duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="open && isPositioned"
      ref="floating"
      role="tooltip"
      class="rounded-md bg-components-card px-3 py-1 text-xs !m-0 dark:bg-components-cardDark"
      :style="floatingStyles"
    >
      {{ title }}
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue';

  const reference = ref<HTMLElement | null>(null);
  const floating = ref<HTMLElement | null>(null);

  const open = ref(false);

  const { floatingStyles, isPositioned } = useFloating(reference, floating, {
    middleware: [shift(), flip({ fallbackPlacements: ['bottom', 'left', 'right'] }), offset(5)],
    open,
    placement: 'top',
    whileElementsMounted: autoUpdate,
  });

  defineOptions({
    inheritAttrs: false,
  });

  defineProps<{
    title: string;
  }>();
</script>
