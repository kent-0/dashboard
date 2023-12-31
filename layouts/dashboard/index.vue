<template>
  <main class="flex">
    <aside class="w-1/5 flex bg-components-card dark:bg-components-cardDark">
      <div class="w-[25%] bg-components-element dark:bg-components-elementDark"></div>
      <div class="w-[75%] flex flex-col p-3 space-y-4">
        <div
          class="flex items-center gap-2 rounded-md bg-components-element p-3 dark:bg-components-elementDark"
        >
          <nuxt-img src="/icon.png" class="size-10 rounded-md" />
          <div class="flex flex-col">
            <h4 class="text-lg font-bold">Kento</h4>
            <small class="text-brand font-semibold">Dashboard</small>
          </div>
        </div>
        <dashboard-sidebar-menu-section :items="sidebarMainMenu" title="Home" />
        <dashboard-sidebar-menu-section :items="sidebarSupportMenu" title="Support" />
      </div>
    </aside>
    <article class="min-h-screen w-[80%]">
      <header
        class="flex items-center justify-between gap-2 border-l border-l-components-element bg-components-card p-5 dark:(border-l-components-elementDark bg-components-cardDark)"
      >
        <ui-form-input
          type="text"
          variant="soft"
          prefix="layout_form"
          name="search"
          placeholder="Search projects, tasks, pages, etc..."
          icon-left="lucide:search"
          class="w-1/3"
        />
        <div class="flex items-center space-x-2">
          <div class="flex items-center space-x-1">
            <ui-button-icon
              icon="lucide:help-circle"
              variant="ghost"
              aria-label="Notification center"
            />
            <ui-button-icon
              icon="lucide:message-circle"
              variant="ghost"
              aria-label="Notification center"
            />
            <ui-button-icon icon="lucide:bell" variant="ghost" aria-label="Notification center" />
          </div>
          <ui-elements-avatar
            src="https://i.scdn.co/image/ab67616d00001e029d65793a76e1c7702584281d"
            class="size-9 hover:(ring-2 ring-brand dark:ring-brand-dark)"
            :name="`${session?.first_name} ${session?.last_name}`"
          />
        </div>
      </header>
      <slot />
    </article>
  </main>
</template>

<script lang="ts" setup>
  const { data: session } = useAuth();

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
