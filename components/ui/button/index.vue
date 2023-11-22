<template>
  <button
    :class="[
      'flex items-center rounded-md px-4 py-2 transition-all duration-300 space-x-1',
      'disabled:(opacity-50 cursor-not-allowed pointer-events-none)',
      {
        'bg-transparent text-brand-accent active:(bg-brand-200 dark:bg-brand-dark/60) hover:(bg-brand-100 dark:bg-brand-dark/50) dark:text-brand-dark':
          variant === 'ghost',
        'bg-transparent border border-brand text-brand transition-all duration-300 space-x-1 dark:(border-brand-dark active:bg-brand-dark/70 hover:bg-brand-dark/50) active:(bg-brand-100) hover:(bg-brand-50)':
          variant === 'outline',
        'bg-brand-100 text-brand-accent active:(bg-brand-300 dark:bg-brand-dark/70) dark:(bg-brand-dark/50 text-brand) hover:(bg-brand-200 dark:bg-brand-dark/60)':
          variant === 'soft',
        'active:dark:bg-brand-tertiaryDark hover:dark:bg-brand-secondaryDark dark:text-brand-accent bg-brand text-white active:bg-brand-tertiary dark:bg-brand-dark hover:(bg-brand-secondary)':
          variant === 'solid',
      },
    ]"
    :disabled="isDisabled || isLoading"
    :aria-label="ariaLabel"
    type="button"
  >
    <icon v-if="iconLeft && !isLoading" :name="iconLeft"></icon>
    <icon v-if="isLoading" name="lucide:loader" class="animate-spin"></icon>
    <span class="font-semibold">
      <slot />
    </span>
    <icon v-if="iconRight" :name="iconRight"></icon>
  </button>
</template>

<script setup lang="ts">
  defineProps<{
    ariaLabel: string;
    iconLeft?: `lucide:${string}`;
    iconRight?: `lucide:${string}`;
    isDisabled?: boolean;
    isLoading?: boolean;
    variant: 'ghost' | 'outline' | 'soft' | 'solid';
  }>();
</script>
