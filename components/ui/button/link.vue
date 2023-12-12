<template>
  <nuxt-link
    role="button"
    v-bind="{
      ...$props,
      prefetch: $props.prefetch ?? undefined,
      // TODO: Fix the warning when is using with prefetch prop
      noPrefetch: undefined,
    }"
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
        link: 'bg-transparent text-brand dark:text-brand-dark hover:(underline text-brand-600 dark:text-brand-700) active:(text-brand-700 dark:text-brand-600)',
      },
    ]"
    :disabled="isDisabled || isLoading"
    :aria-label="$props['aria-label']"
  >
    <icon v-if="iconLeft && !isLoading" :name="iconLeft" />
    <icon v-if="isLoading" name="lucide:loader" class="animate-spin" />
    <span class="font-semibold">
      <slot />
    </span>
    <icon v-if="iconRight" :name="iconRight" />
  </nuxt-link>
</template>

<script setup lang="ts">
  import type { NuxtLinkProps } from '#app/components/nuxt-link';

  defineProps<
    {
      // eslint-disable-next-line vue/prop-name-casing -- Weird error with Volar Typescript
      'aria-label': string;
      iconLeft?: `lucide:${string}`;
      iconRight?: `lucide:${string}`;
      isDisabled?: boolean;
      isLoading?: boolean;
      variant: 'ghost' | 'link' | 'outline' | 'soft' | 'solid';
    } & NuxtLinkProps
  >();
</script>
