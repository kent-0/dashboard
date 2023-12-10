<template>
  <button
    :class="[
      'flex items-center justify-center rounded-lg px-5 py-2 transition-all duration-300 space-x-2 text-center',
      'disabled:(opacity-50 cursor-not-allowed pointer-events-none)',
      {
        'bg-transparent text-brand dark:text-brand-dark hover:(bg-brand/30 dark:bg-brand-dark/30) active:(bg-brand/20 dark:bg-brand-dark/20)':
          variant === 'ghost',
        'bg-transparent text-brand border border-brand dark:(border-brand-dark text-brand-dark) hover:(border-brand-secondary dark:border-brand-secondaryDark bg-brand/30 dark:bg-brand-dark/30) active:(border-brand-tertiary dark:border-brand-tertiaryDark bg-brand/10 dark:bg-brand-dark/10)':
          variant === 'outline',
        'bg-brand/20 hover:(bg-brand/30 dark:bg-brand-dark/30) text-brand dark:(bg-brand-dark/20 text-brand-dark) active:(bg-brand/10 dark:bg-brand-dark/10)':
          variant === 'soft',
        'bg-brand dark:(bg-brand-dark text-brand-accentDark) text-brand-accent hover:(bg-brand-secondary dark:bg-brand-secondaryDark) active:(bg-brand-tertiary dark:bg-brand-tertiaryDark)':
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
