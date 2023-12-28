<template>
  <main class="mx-auto max-w-2xl flex flex-col p-5 space-y-5">
    <header
      class="h-52 flex flex-col items-center justify-center p-5 text-center bg-hero-graph-paper-components-element space-y-5 dark:bg-hero-graph-paper-components-cardDark"
    >
      <div class="flex flex-col">
        <h1 class="text-3xl font-title md:text-4xl">
          {{ data?.first_name }} {{ data?.last_name }}
        </h1>
        <p class="opacity-50">Setup your account and manage your personal information.</p>
      </div>
      <UiButtonError
        variant="soft"
        aria-label="Close the current user session"
        @click="signOut({ callbackUrl: '/auth', redirect: true })"
      >
        Sign Out
      </UiButtonError>
    </header>
    <article>
      <slot />
    </article>
  </main>
</template>

<script lang="ts" setup>
  const { data, signOut } = useAuth();
</script>
