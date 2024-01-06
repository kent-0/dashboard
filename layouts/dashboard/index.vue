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
      <header class="flex items-center justify-between gap-2 p-5">
        <div></div>
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
          <ui-layout-popover class="rounded-full">
            <template #trigger>
              <ui-elements-avatar
                src="https://i.scdn.co/image/ab67616d00001e029d65793a76e1c7702584281d"
                class="size-9 hover:(ring-2 ring-brand dark:ring-brand-dark)"
                :name="`${session?.first_name} ${session?.last_name}`"
              />
            </template>
            <template #content>
              <div class="w-full flex flex-col space-y-3">
                <div class="w-full flex items-center space-x-2">
                  <ui-elements-avatar
                    src="https://i.scdn.co/image/ab67616d00001e029d65793a76e1c7702584281d"
                    :name="`${session?.first_name} ${session?.last_name}`"
                    class="size-16"
                  />
                  <div class="flex flex-col">
                    <h2 class="text-lg font-semibold">
                      {{ session?.first_name }} {{ session?.last_name }}
                    </h2>
                    <small class="opacity-50">
                      {{ session?.email.value }} - @{{ session?.username }}
                    </small>
                  </div>
                </div>
                <ui-layout-menu-link :items="userMenu" />
                <ui-layout-divider></ui-layout-divider>
                <ui-layout-menu :items="userMenuActions" />
              </div>
            </template>
          </ui-layout-popover>
        </div>
      </header>
      <slot />
    </article>
  </main>
</template>

<script lang="ts" setup>
  const { data: session, signOut } = useAuth();

  const sidebarMainMenu = [
    {
      icon: 'lucide:home',
      title: 'Resume',
      to: '/dashboard',
    },
    {
      icon: 'lucide:rocket',
      title: 'Work',
      to: '/',
    },
    {
      icon: 'lucide:users',
      title: 'Projects',
      to: '/',
    },
    {
      icon: 'lucide:bar-chart',
      title: 'Stats',
      to: '/',
    },
  ];

  const sidebarSupportMenu = [
    {
      icon: 'lucide:help-circle',
      title: 'Help',
      to: '/',
    },
    {
      icon: 'lucide:sparkle',
      title: 'Release notes',
      to: '/',
    },
  ];

  const userMenu = [
    {
      icon: 'lucide:settings',
      title: 'Account settings',
      to: '/auth/account',
    },
    {
      icon: 'lucide:help-circle',
      title: 'Help',
      to: '/',
    },
  ];

  const userMenuActions = [
    {
      click: () => signOut({ callbackUrl: '/auth', redirect: true }),
      icon: 'lucide:log-out',
      title: 'Logout',
      type: 'danger' as const,
    },
  ];
</script>
