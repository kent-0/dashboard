<template>
  <div class="flex flex-col space-y-1" :class="$attrs.class">
    <div
      class="flex items-center justify-between gap-2 rounded-md bg-components-element dark:bg-components-elementDark"
      :class="{
        'py-2': type !== 'password' && !iconLeft && !iconRight,
      }"
    >
      <div
        v-if="iconLeft"
        class="flex items-center justify-center border-r-2 border-r-components-card p-5 transition duration-300 dark:border-r-components-cardDark"
        :class="{
          'text-error dark:text-error-dark': hasError || errorMessage,
          'text-warning dark:text-warning-dark': hasWarning && !hasError,
          'text-brand dark:text-brand-dark': isFocused && !hasError && !hasWarning,
        }"
      >
        <Icon :name="iconLeft" />
      </div>
      <div class="relative h-full w-full flex items-end py-2" :class="{ 'pl-4': !iconLeft }">
        <label
          class="absolute transition-all duration-300"
          :class="{
            'top-3 text-xs': isFocused || value,
            'top-4': !isFocused && !value,
            'text-error dark:text-error-dark': hasError || errorMessage,
            'text-warning dark:text-warning-dark': hasWarning && !hasError,
            'text-brand dark:text-brand-dark': isFocused && !hasError && !hasWarning,
            'opacity-50': !errorMessage && !hasError && !hasWarning && !isFocused,
          }"
          :for="`_${$props.prefix}_input_${name}_`"
        >
          {{ label }}
        </label>
        <input
          :id="`_${$props.prefix}_input_${name}_`"
          v-bind="{ ...$attrs, class: undefined }"
          v-model="value"
          :type="isShowPassword ? 'text' : type || 'text'"
          :disabled="disabled"
          :label="label"
          :placeholder="placeholder"
          :name="name"
          :readonly="readonly"
          class="w-full border-none bg-transparent p-0 outline-none placeholder:opacity-0 focus:ring-0 focus:placeholder:opacity-100"
          @focus="isFocused = true"
          @blur="
            isFocused = false;
            handleBlur($event, true);
          "
          @change="handleChange($event, !!errorMessage)"
        />
      </div>
      <div
        v-if="iconRight && type !== 'password'"
        class="flex items-center justify-center border-l-2 border-l-components-card p-5 dark:border-l-components-cardDark"
        :class="{
          'text-error dark:text-error-dark': hasError || errorMessage,
          'text-warning dark:text-warning-dark': hasWarning && !hasError,
          'text-brand dark:text-brand-dark': isFocused && !hasError && !hasWarning,
        }"
      >
        <Icon :name="iconRight" />
      </div>
      <div
        v-if="type === 'password'"
        class="flex items-center justify-center border-l-2 border-l-components-card p-5 dark:border-l-components-cardDark"
        @click="isShowPassword = !isShowPassword"
      >
        <Icon :name="isShowPassword ? 'lucide:eye-off' : 'lucide:eye'" />
      </div>
    </div>
    <div
      v-show="errorMessage && !hasError && !hasWarning"
      class="flex select-none items-center text-error space-x-2 dark:text-error-dark"
    >
      <icon name="lucide:alert-circle" />
      <small>
        {{ errorMessage }}
      </small>
    </div>
    <div
      v-show="!errorMessage && hasError && !hasWarning"
      class="flex select-none items-center text-error space-x-2 dark:text-error-dark"
    >
      <icon name="lucide:alert-circle" />
      <small>
        {{ errorMessage }}
      </small>
    </div>
    <div
      v-show="!errorMessage && !hasError && hasWarning"
      class="flex select-none items-center text-warning space-x-2 dark:text-warning-dark"
    >
      <icon name="lucide:alert-circle" />
      <small>
        {{ hint }}
      </small>
    </div>
  </div>
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
    prefix: string;
    readonly?: boolean;
    type: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
  }>();

  const isFocused = ref(false);
  const isShowPassword = ref(false);

  const inputName = toRef(props, 'name');
  const { errorMessage, handleBlur, handleChange, value } = useField(inputName);
</script>
