<template>
  <picture
    class="flex-shrink-0 cursor-pointer select-none rounded-full bg-components-element transition duration-300 dark:bg-components-elementDark"
  >
    <div
      v-show="!imageLoaded || isimageError || !src"
      :class="['h-full w-full flex items-center justify-center', $attrs.class]"
    >
      <span>
        {{
          name
            .split(' ')
            .map((n) => n[0])
            .join('')
        }}
      </span>
    </div>
    <nuxt-img
      v-if="src"
      v-show="!isimageError && imageLoaded"
      :class="['rounded-full flex-shrink-0', $attrs.class]"
      :src="src"
      @load="imageLoadedSuccessfully"
      @error="imageFailedToLoad"
    />
  </picture>
</template>

<script setup lang="ts">
  const isimageError = ref(false);
  const imageLoaded = ref(false);

  const imageFailedToLoad = () => {
    isimageError.value = true;
  };

  const imageLoadedSuccessfully = () => {
    imageLoaded.value = true;
  };

  withDefaults(defineProps<{ name: string; src?: string }>(), { name: 'Kento', src: undefined });
</script>
