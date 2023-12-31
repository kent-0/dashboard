<template>
  <div
    class="flex"
    :class="[
      $attrs.class,
      {
        'flex-col space-y-1': direction === 'vertical' || !direction,
        'flex-row items-center space-x-4': direction === 'horizontal',
      },
    ]"
  >
    <label :for="`_${$props.prefix}_input_${name}_`">
      {{ label }} <span v-show="required" class="text-error dark:text-error-dark">*</span>
    </label>
    <div
      class="w-full flex border-2 rounded-md py-2 transition duration-300 focus:ring-0"
      :class="{
        'focus:border-components-element border-components-element dark:border-components-elementDark focus:dark:border-components-elementDark':
          !hasError && !hasWarning && !errorMessage,
        'focus:(border-error dark:border-error-dark) border-error dark:border-error-dark':
          errorMessage || hasError,
        'focus:(border-warning dark:border-warning-dark) border-warning dark:border-warning-dark':
          hasWarning,
        'opacity-50 cursor-not-allowed bg-components-element dark:bg-components-elementDark border-0':
          disabled,
        'bg-components-background/20 dark:bg-components-backgroundDark/40': variant === 'light',
        'bg-components-element dark:bg-components-elementDark hover:(bg-components-element/50 dark:bg-components-elementDark/50)':
          variant === 'soft' || !variant,
      }"
    >
      <div
        v-if="iconLeft"
        class="w-10 flex items-center justify-center"
        :class="{
          'text-error dark:text-error-dark': hasError || errorMessage,
          'text-warning dark:text-warning-dark': hasWarning && !hasError,
        }"
      >
        <Icon :name="iconLeft" />
      </div>
      <input
        :id="`_${$props.prefix}_input_${name}_`"
        v-bind="{ ...$attrs, class: undefined }"
        v-model="value"
        class="w-full rounded-md border-none bg-transparent p-0 outline-none disabled:cursor-not-allowed focus:ring-0"
        :class="{
          'px-2': !iconLeft && !iconRight,
          'pl-2': !iconLeft,
          'pr-2': !iconRight,
        }"
        :type="isShowPassword ? 'text' : type || 'text'"
        :disabled="disabled"
        :label="label"
        :aria-invalid="!!errorMessage || hasError"
        :placeholder="placeholder"
        :name="name"
        :readonly="$props.readonly"
        :required="required"
        @focus="isFocused = true"
        @blur="
          isFocused = false;
          handleBlur($event, true);
        "
        @change="handleChange($event, !!errorMessage)"
      />
      <div
        v-if="iconRight && type !== 'password'"
        class="w-10 flex items-center justify-center"
        :class="{
          'text-error dark:text-error-dark': hasError || errorMessage,
          'text-warning dark:text-warning-dark': hasWarning && !hasError,
        }"
      >
        <Icon :name="iconRight" />
      </div>
      <div
        v-if="!iconRight && type === 'password'"
        class="w-10 flex items-center justify-center"
        :class="{
          'text-error dark:text-error-dark': hasError || errorMessage,
          'text-warning dark:text-warning-dark': hasWarning && !hasError,
        }"
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
    direction?: 'horizontal' | 'vertical';
    disabled?: boolean;
    hasError?: boolean;
    hasWarning?: boolean;
    hint?: string;
    iconLeft?: `lucide:${string}`;
    iconRight?: `lucide:${string}`;
    label?: string;
    name: string;
    placeholder?: string;
    prefix: string;
    readonly?: boolean;
    required?: boolean;
    type: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
    variant?: 'light' | 'soft';
  }>();

  const isFocused = ref(false);
  const isShowPassword = ref(false);

  const inputName = toRef(props, 'name');
  const { errorMessage, handleBlur, handleChange, value } = useField(inputName);
</script>
