<template>
  <div class="relative">
    <div
      ref="reference"
      role="button"
      class="bg-transparent"
      type="button"
      @click="floatingOpen = !floatingOpen"
    >
      <slot name="trigger" />
    </div>
    <Transition
      enter-active-class="transition-opacity ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="floatingOpen" ref="floating" class="shadow-lg" :style="floatingStyles">
        <slot name="content" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { type Placement, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue';

  const reference = ref<HTMLElement | null>(null);
  const floating = ref<HTMLElement | null>(null);
  const floatingOpen = ref(false);
  const { isClickedOutside } = useClickOutside(reference);

  const props = defineProps<{
    placement?: Placement;
  }>();

  const { floatingStyles } = useFloating(reference as never, floating as never, {
    middleware: [
      flip({ fallbackPlacements: ['bottom-end', 'left', 'right'] }),
      offset(10),
      shift(),
    ],
    open: floatingOpen.value,
    placement: props.placement || 'bottom',
    whileElementsMounted: autoUpdate,
  });

  watch(isClickedOutside, (value) => {
    if (value) {
      floatingOpen.value = false;
    }
  });

  watch(floatingOpen, (isOpen) => {
    if (!isOpen) {
      floatingOpen.value = false;
    }
  });
</script>
