<template>
  <button
    :class="[
      'flex items-center justify-center rounded-lg px-5 py-2 transition-all duration-300 space-x-2 text-center',
      'disabled:(opacity-50 cursor-not-allowed pointer-events-none)',
      {
        'bg-transparent text-warning dark:text-warning-dark hover:(bg-warning/30 dark:bg-warning-dark/30) active:(bg-warning/20 dark:bg-warning-dark/20)':
          variant === 'ghost',
        'bg-transparent text-warning border border-warning dark:(border-warning-dark text-warning-dark) hover:(border-warning-secondary dark:border-warning-secondaryDark bg-warning/30 dark:bg-warning-dark/30) active:(border-warning-tertiary dark:border-warning-tertiaryDark bg-warning/10 dark:bg-warning-dark/10)':
          variant === 'outline',
        'bg-warning/20 hover:(bg-warning/30 dark:bg-warning-dark/30) text-warning dark:(bg-warning-dark/20 text-warning-dark) active:(bg-warning/10 dark:bg-warning-dark/10)':
          variant === 'soft',
        'bg-warning dark:(bg-warning-dark text-warning-accentDark) text-warning-accent hover:(bg-warning-secondary dark:bg-warning-secondaryDark) active:(bg-warning-tertiary dark:bg-warning-tertiaryDark)':
          variant === 'solid',
      },
    ]"
    :disabled="isDisabled || isLoading"
    :aria-label="$props['aria-label']"
    type="button"
  >
    <icon v-if="iconLeft && !isLoading" :name="iconLeft" />
    <icon v-if="isLoading" name="lucide:loader" class="animate-spin" />
    <span class="font-semibold">
      <slot />
    </span>
    <icon v-if="iconRight" :name="iconRight" />
  </button>
</template>

<script setup lang="ts">
  defineProps<{
    // eslint-disable-next-line vue/prop-name-casing -- Weird error with Volar Typescript
    'aria-label': string;
    iconLeft?: `lucide:${string}`;
    iconRight?: `lucide:${string}`;
    isDisabled?: boolean;
    isLoading?: boolean;
    variant: 'ghost' | 'outline' | 'soft' | 'solid';
  }>();
</script>
