<template>
  <picture
    class="flex-shrink-0 cursor-pointer select-none rounded-full bg-components-element dark:bg-components-elementDark"
  >
    <div
      v-show="!imageLoaded || isimageError || !src"
      :class="[
        'flex items-center justify-center rounded-full transition duration-300 flex-shrink-0',
        $attrs.class,
      ]"
    >
      <small>
        {{
          name
            .split(' ')
            .map((n) => n[0])
            .join('')
        }}
      </small>
    </div>
    <nuxt-img
      v-if="src"
      v-show="!isimageError && imageLoaded"
      :class="['rounded-full flex-shrink-0 transition duration-300', $attrs.class]"
      :src="src"
      @load="imageLoadedSuccessfully"
      @error="imageFailedToLoad"
    />
  </picture>
</template>

<script setup lang="ts">
  defineOptions({
    inheritAttrs: false,
  });

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
