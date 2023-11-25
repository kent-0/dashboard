<template>
  <label class="group flex flex-col space-y-1">
    <span>{{ label }}</span>
    <span class="flex space-x-0.2">
      <span
        v-if="iconLeft"
        :class="{
          'text-brand dark:text-brand-dark opacity-100': isFocused,
        }"
        class="rounded-l-lg bg-components-element px-4 py-3 transition duration-300 dark:bg-components-elementDark"
      >
        <icon :name="iconLeft" />
      </span>
      <input
        :class="{
          'rounded-l-lg': !iconLeft,
          'rounded-r-lg': !iconRight,
          'rounded-lg': !iconLeft && !iconRight,
          'rounded-none': iconLeft && iconRight,
          'rounded-r-none': type === 'password',
        }"
        class="w-full border-none bg-components-element py-3 outline-none transition duration-300 disabled:(pointer-events-none cursor-not-allowed opacity-70) space-y-1 dark:bg-components-elementDark focus:ring-brand dark:focus:ring-brand-dark"
        :type="isShowPassword ? 'text' : type || 'text'"
        v-bind="$attrs"
        :disabled="disabled"
        :label="label"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <span
        v-if="iconRight && type !== 'password'"
        :class="{
          'text-brand dark:text-brand-dark opacity-100': isFocused,
        }"
        class="border-l-2 border-l-components-card rounded-r-lg bg-components-element px-4 py-3 transition duration-300 dark:border-l-components-cardDark dark:bg-components-elementDark"
      >
        <icon :name="iconRight" />
      </span>
      <span
        v-if="type === 'password'"
        class="cursor-pointer rounded-r-lg bg-components-element px-4 py-3 transition duration-300 dark:bg-components-elementDark"
        @click="isShowPassword = !isShowPassword"
      >
        <icon :name="isShowPassword ? 'lucide:eye-off' : 'lucide:eye'" />
      </span>
    </span>
  </label>
</template>
<script setup lang="ts">
  defineOptions({
    inheritAttrs: false,
  });

  defineProps<{
    disabled?: boolean;
    iconLeft?: `lucide:${string}`;
    iconRight?: `lucide:${string}`;
    label: string;
    name?: string;
    placeholder?: string;
    readonly?: boolean;
    type: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
  }>();

  const isFocused = ref(false);
  const isShowPassword = ref(false);
</script>
