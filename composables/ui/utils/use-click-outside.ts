import { type Ref, onUnmounted, ref, watch } from 'vue';

export default function useClickOutside(elementRef: Ref<HTMLElement | null>) {
  const isClickedOutside = ref(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      isClickedOutside.value = true;
    } else {
      isClickedOutside.value = false;
    }
  };

  watch(
    elementRef,
    (newValue, oldValue) => {
      if (oldValue) {
        window.removeEventListener('click', handleClickOutside);
      }
      if (newValue) {
        window.addEventListener('click', handleClickOutside);
      }
    },
    { flush: 'post', immediate: true }
  );

  onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside);
  });

  return { isClickedOutside };
}
