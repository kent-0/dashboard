<template>
  <label class="relative flex flex-col pb-2 space-y-1" :class="$attrs.class">
    <span
      class="absolute transition-all duration-300"
      :class="{
        'text-xs top-3 opacity-70': isFocused || value,
        'top-5': !isFocused && !value,
        'text-brand dark:text-brand-dark opacity-100': isFocused && !hasError && !hasWarning,
        'text-error dark:text-error-dark opacity-100': hasError || errors.length > 0,
        'text-warning dark:text-warning-dark opacity-100': hasWarning,
        'left-15 ': iconLeft,
        'left-3': !iconLeft,
      }"
    >
      {{ label }}
    </span>
    <span class="flex space-x-0.2">
      <span
        v-if="iconLeft"
        :class="{
          'text-brand dark:text-brand-dark opacity-100': isFocused && !hasError && !hasWarning,
          'text-error dark:text-error-dark opacity-100': hasError || errors.length > 0,
          'text-warning dark:text-warning-dark opacity-100': hasWarning,
        }"
        class="flex items-center justify-center rounded-l-lg bg-components-element px-4 py-3 transition duration-300 dark:bg-components-elementDark"
      >
        <icon :name="iconLeft" />
      </span>
      <input
        v-bind="{ ...$attrs, class: undefined }"
        v-model="value"
        :class="{
          'rounded-l-lg': !iconLeft,
          'rounded-r-lg': !iconRight,
          'rounded-lg': !iconLeft && !iconRight,
          'rounded-none': iconLeft && iconRight,
          'rounded-r-none': type === 'password',
          'focus:ring-brand dark:focus:ring-brand-dark': !hasError && !hasWarning,
          'focus:ring-error dark:focus:ring-error-dark': hasError || errors.length > 0,
          'focus:ring-warning dark:focus:ring-warning-dark': hasWarning,
        }"
        class="w-full border-none bg-components-element pb-2 pt-6 outline-none transition duration-300 disabled:(pointer-events-none cursor-not-allowed opacity-70) space-y-1 dark:bg-components-elementDark placeholder:opacity-0 focus:placeholder:opacity-100"
        :type="isShowPassword ? 'text' : type || 'text'"
        :disabled="disabled"
        :label="label"
        :placeholder="placeholder"
        :name="name"
        :readonly="readonly"
        @focus="isFocused = true"
        @blur="
          isFocused = false;
          handleBlur($event, true);
        "
        @change="handleChange($event, !!errorMessage)"
      />
      <span
        v-if="iconRight && type !== 'password'"
        :class="{
          'text-brand dark:text-brand-dark opacity-100': isFocused,
        }"
        class="flex items-center justify-center border-l-2 border-l-components-card rounded-r-lg bg-components-element px-4 py-3 transition duration-300 dark:border-l-components-cardDark dark:bg-components-elementDark"
      >
        <icon :name="iconRight" />
      </span>
      <span
        v-if="type === 'password'"
        class="flex cursor-pointer items-center justify-center rounded-r-lg bg-components-element px-4 py-3 transition duration-300 dark:bg-components-elementDark"
        @click="isShowPassword = !isShowPassword"
      >
        <icon :name="isShowPassword ? 'lucide:eye-off' : 'lucide:eye'" />
      </span>
    </span>

    <small
      v-if="errors.length === 0"
      class="absolute left-1 flex items-center transition-all duration-300 -bottom-4 space-x-1"
      :class="{
        'opacity-100': hint,
        'opacity-0': !hint,
        'text-error dark:text-error-dark': hasError,
        'text-warning dark:text-warning-dark': hasWarning,
        'text-black dark:text-white': !hasError && !hasWarning,
        'opacity-70': hint && !hasError && !hasWarning,
      }"
    >
      <icon v-if="hasError" name="lucide:alert-circle" />
      <icon v-if="hasWarning" name="lucide:alert-triangle" />
      <span class="line-clamp-1">{{ hint }}</span>
    </small>

    <client-only>
      <transition-group
        v-if="errors.length > 0"
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <small
          :key="errors[0]"
          class="absolute left-1 flex items-center text-error transition-all duration-300 -bottom-4 space-x-1 dark:text-error-dark"
        >
          <icon name="lucide:alert-circle" />
          <span class="line-clamp-1">{{ errors[0] }}</span>
        </small>
      </transition-group>
    </client-only>
  </label>
</template>
<script setup lang="ts">
  import { useField } from 'vee-validate';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps<{
    autocomplete?:
      | 'current-password'
      | 'email'
      | 'family-name'
      | 'given-name'
      | 'new-password'
      | 'off'
      | 'on'
      | 'username';
    disabled?: boolean;
    hasError?: boolean;
    hasWarning?: boolean;
    hint?: string;
    iconLeft?: `lucide:${string}`;
    iconRight?: `lucide:${string}`;
    label: string;
    name: string;
    placeholder?: string;
    readonly?: boolean;
    type: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
  }>();

  const isFocused = ref(false);
  const isShowPassword = ref(false);

  const inputName = toRef(props, 'name');
  const { errorMessage, errors, handleBlur, handleChange, value } = useField(inputName);
</script>
