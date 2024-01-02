<template>
  <nuxt-layout name="dashboard">
    <h1>Dashboard</h1>
  </nuxt-layout>
</template>

<script lang="ts" setup>
  useHead({
    meta: [
      {
        content: 'Home page of the dashboard to manage your account and your projects.',
        name: 'description',
      },
    ],
    title: 'Dashboard',
  });
</script>
