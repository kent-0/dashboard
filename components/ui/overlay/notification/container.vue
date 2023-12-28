<template>
  <div
    class="fixed right-0 top-0 z-999 max-h-screen w-full flex flex-col gap-5 overflow-y-hidden p-5 sm:max-w-sm"
  >
    <transition-group
      enter-active-class="transition ease-out duration-500"
      enter-from-class="transform -translate-y-12 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-12 opacity-0"
    >
      <ui-overlay-notification-item
        v-for="notification in notifications.notifications.value"
        :key="notification.id"
        :title="notification.title"
        :actions="notification.actions"
        :message="notification.message"
        :type="notification.type"
        :remove-notification="() => notifications.removeNotification(notification)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
  const notifications = useNotification();
</script>
