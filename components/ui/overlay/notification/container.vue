<template>
  <div
    class="fixed right-0 top-0 max-h-screen max-w-sm w-full flex flex-col gap-5 overflow-y-hidden p-5"
  >
    <transition-group
      enter-active-class="transition ease-out duration-500"
      enter-from-class="transform translate-y-12 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ui-overlay-notification-item
        v-for="notification in notifications.notifications.value"
        :key="notification.id"
        :title="notification.title"
        :actions="notification.actions"
        :message="notification.message"
        :type="notification.type"
        :remove-notification="notifications.removeNotification"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
  const notifications = useNotification();
</script>
