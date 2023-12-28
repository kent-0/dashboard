<template>
  <div class="relative">
    <div
      ref="select"
      class="w-full flex cursor-pointer select-none items-center rounded-md p-3"
      :class="{
        'bg-components-background/20 dark:bg-components-backgroundDark/40': variant === 'light',
        'bg-components-element dark:bg-components-elementDark': variant === 'soft' || !variant,
        'hover:(bg-components-element/50 dark:bg-components-elementDark/50)':
          variant === 'soft' && hoverTransition && !isOpen,
      }"
      @click="isOpen = !isOpen"
    >
      <div class="w-full flex items-center space-x-1">
        <icon v-if="!customLabel && selectedOption?.icon" :name="selectedOption.icon" />
        <input
          type="text"
          readonly
          class="w-full cursor-pointer border-none bg-transparent p-0 focus:ring-0"
          placeholder="Select an option"
          :value="customLabel ?? selectedOption?.label"
        />
      </div>
      <icon name="lucide:chevron-down" />
    </div>
    <transition
      enter-active-class="transition ease-out"
      leave-active-class="transition ease-in"
      enter-from-class="transform -translate-y-1 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-1 opacity-0"
    >
      <ul
        v-if="isOpen"
        class="z-full absolute top-14 z-10 w-fit flex flex-col gap-1 rounded-md p-1 shadow-md"
        :class="{
          'bg-components-background/20 dark:bg-components-backgroundDark/40': variant === 'light',
          'bg-components-element dark:bg-components-elementDark': variant === 'soft' || !variant,
        }"
      >
        <li
          v-for="option in options"
          :key="`${option.label}-${option.value}`"
          class="cursor-pointer select-none rounded-sm px-2 py-1 hover:(bg-components-card/50 dark:bg-components-cardDark/50)"
          :class="{
            'bg-components-card/50 dark:bg-components-cardDark/50 font-medium text-brand dark:text-brand-dark':
              modelValue === option.value,
          }"
          @click="updateValue(option)"
        >
          <div class="flex items-center">
            <icon
              v-if="option.icon"
              :name="option.icon"
              class="mr-2"
              :class="{
                'text-brand dark:text-brand-dark': modelValue === option.value,
              }"
            />
            <span>{{ option.label }}</span>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
  const select = ref<HTMLDivElement | null>(null);
  const isOpen = ref(false);
  const { isClickedOutside } = useClickOutside(select);

  const props = defineProps<{
    customLabel?: string;
    hoverTransition?: boolean;
    modelValue: boolean | number | string;
    options: Array<{
      icon?: string;
      label: string;
      value: boolean | number | string;
    }>;
    variant?: 'light' | 'soft';
  }>();

  const selectedOption = ref<{
    icon?: string;
    label: string;
    value: boolean | number | string;
  } | null>(props.options.find((option) => option.value === props.modelValue) ?? null);

  watch(isClickedOutside, (newValue) => {
    if (newValue) {
      isOpen.value = false;
    }
  });

  watch(
    () => props.modelValue,
    (newValue) => {
      selectedOption.value = props.options.find((option) => option.value === newValue) ?? null;
    }
  );

  const emit = defineEmits(['update:modelValue']);

  const updateValue = (option: {
    icon?: string;
    label: string;
    value: boolean | number | string;
  }) => {
    emit('update:modelValue', option.value);
    selectedOption.value = option;
    isOpen.value = false;
  };
</script>
