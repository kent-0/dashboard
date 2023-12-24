<template>
  <button
    :class="[
      'flex items-center justify-center rounded-lg p-3 transition-all duration-300 space-x-2 text-center h-fit',
      'disabled:(opacity-50 cursor-not-allowed pointer-events-none)',
      {
        'bg-transparent text-error dark:text-error-dark hover:(bg-error/30 dark:bg-error-dark/30) active:(bg-error/20 dark:bg-error-dark/20)':
          variant === 'ghost',
        'bg-transparent text-error border border-error dark:(border-error-dark text-error-dark) hover:(border-error-secondary dark:border-error-secondaryDark bg-error/30 dark:bg-error-dark/30) active:(border-error-tertiary dark:border-error-tertiaryDark bg-error/10 dark:bg-error-dark/10)':
          variant === 'outline',
        'bg-error/20 hover:(bg-error/30 dark:bg-error-dark/30) text-error dark:(bg-error-dark/20 text-error-dark) active:(bg-error/10 dark:bg-error-dark/10)':
          variant === 'soft',
        'bg-error dark:(bg-error-dark text-error-accentDark) text-error-accent hover:(bg-error-secondary dark:bg-error-secondaryDark) active:(bg-error-tertiary dark:bg-error-tertiaryDark)':
          variant === 'solid',
      },
    ]"
    :disabled="isDisabled || isLoading"
    :aria-label="$props['aria-label']"
    type="button"
  >
    <Icon v-if="!isLoading" :name="icon" />
    <Icon v-if="isLoading" name="lucide:loader" class="animate-spin" />
  </button>
</template>

<script setup lang="ts">
  defineProps<{
    // eslint-disable-next-line vue/prop-name-casing -- Weird error with Volar Typescript
    'aria-label': string;
    icon: `lucide:${string}`;
    isDisabled?: boolean;
    isLoading?: boolean;
    variant: 'ghost' | 'outline' | 'soft' | 'solid';
  }>();
</script>
