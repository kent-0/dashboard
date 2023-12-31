<template>
  <main class="flex gap-5">
    <aside class="w-1/5 flex bg-components-card dark:bg-components-cardDark">
      <div class="w-[25%] bg-components-element dark:bg-components-elementDark"></div>
      <div class="w-[75%] flex flex-col p-3 space-y-4">
        <div
          class="flex items-center gap-2 rounded-md bg-components-element p-3 dark:bg-components-elementDark"
        >
          <nuxt-img src="/icon.png" class="size-10 rounded-md" />
          <div class="flex flex-col">
            <h4 class="text-lg font-bold">Kento</h4>
            <small class="text-brand font-semibold">/ Dashboard</small>
          </div>
        </div>
        <dashboard-sidebar-menu-section :items="sidebarMainMenu" title="Home" />
        <dashboard-sidebar-menu-section :items="sidebarSupportMenu" title="Support" />
      </div>
    </aside>
    <article class="min-h-screen w-[80%]">
      <nav>
        <span>Nav</span>
      </nav>
      <slot />
    </article>
  </main>
</template>

<script lang="ts" setup>
  const sidebarMainMenu = [
    {
      icon: 'lucide:home',
      title: 'Resume',
      to: '/dashboard',
    },
    {
      icon: 'lucide:rocket',
      title: 'Work',
      to: '/dashboard/work',
    },
    {
      icon: 'lucide:users',
      title: 'Projects',
      to: '/dashboard/projects',
    },
    {
      icon: 'lucide:bar-chart',
      title: 'Stats',
      to: '/dashboard/stats',
    },
  ];

  const sidebarSupportMenu = [
    {
      icon: 'lucide:settings',
      title: 'Account settings',
      to: '/auth/account',
    },
    {
      icon: 'lucide:help-circle',
      title: 'Help',
      to: '/help',
    },
    {
      icon: 'lucide:sparkle',
      title: 'Release notes',
      to: '/help',
    },
  ];
</script>
