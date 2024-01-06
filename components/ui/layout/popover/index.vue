<template>
  <div
    ref="reference"
    :class="$attrs.class"
    role="button"
    aria-label="Represent an element with popover trigger"
    @click="toggleOpen"
  >
    <slot name="trigger" />
  </div>
  <div
    v-show="open && isPositioned"
    ref="floating"
    class="rounded-md bg-components-card p-5 dark:bg-components-cardDark"
    :style="floatingStyles"
  >
    <slot name="content" />
  </div>
</template>

<script lang="ts" setup>
  import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue';

  const reference = ref<HTMLElement | null>(null);
  const floating = ref<HTMLElement | null>(null);

  /* const { isClickedOutside } = useClickOutside(reference); */
  const open = ref(false);

  const toggleOpen = () => {
    open.value = !open.value;
  };

  const { floatingStyles, isPositioned } = useFloating(reference, floating, {
    middleware: [
      shift(),
      flip({ fallbackPlacements: ['bottom-end', 'left', 'right'], padding: 5 }),
      offset(15),
    ],
    open,
    placement: 'bottom',
    whileElementsMounted: autoUpdate,
  });

  /* watch(isClickedOutside, (value) => {
    if (value) open.value = false;
  }); */

  defineOptions({
    inheritAttrs: false,
  });
</script>
