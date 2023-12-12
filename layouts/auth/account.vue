<template>
  <main class="mx-auto p-10 container space-y-5">
    <header
      class="flex items-center justify-between gap-4 p-5 bg-hero-graph-paper-components-card dark:bg-hero-graph-paper-components-cardDark"
    >
      <div class="flex flex-col space-y-2">
        <h1 class="text-4xl font-bold font-title">My account</h1>
        <p class="text-xl">Welcome, {{ data?.first_name }} {{ data?.last_name }}</p>
      </div>
      <ui-buttonError
        variant="soft"
        aria-label="Close the current user session"
        @click="signOut({ redirect: true, callbackUrl: '/auth' })"
      >
        Sign Out
      </ui-buttonError>
    </header>
    <ui-layout-divider>Settings</ui-layout-divider>
    <section class="w-full flex gap-5">
      <aside
        class="rounded-mg sticky top-5 h-fit w-1/3 flex flex-col rounded-md bg-components-card p-5 space-y-3 dark:bg-components-cardDark"
      >
        <template v-for="section in menu" :key="section.title">
          <ui-layout-divider direction="left">{{ section.title }}</ui-layout-divider>
          <ul class="space-y-2">
            <li v-for="item in section.items" :key="item.href" class="flex">
              <nuxt-link
                class="w-full flex items-center rounded-md px-4 py-2 transition duration-300 space-x-2 hover:(bg-brand/10 text-brand dark:bg-brand-dark/20 dark:text-brand-dark)"
                active-class="bg-brand/20 dark:bg-brand-dark/30 text-brand dark:text-brand-dark font-medium"
                :href="item.href"
              >
                <Icon :name="item.icon" />
                <span>{{ item.title }}</span>
              </nuxt-link>
            </li>
          </ul>
        </template>
      </aside>
      <main class="w-2/3">
        <slot />
      </main>
    </section>
  </main>
</template>

<script lang="ts" setup>
  const { data, signOut } = useAuth();

  const menu = [
    {
      items: [
        {
          href: 'me',
          icon: 'lucide:file-signature',
          title: 'Personal information',
        },
        {
          href: 'projects',
          icon: 'lucide:folder',
          title: 'Manage projects',
        },
        {
          href: 'danger-zone',
          icon: 'lucide:alert-circle',
          title: 'Danger zone',
        },
      ],
      title: 'Account',
    },
    {
      items: [
        {
          href: 'security-password',
          icon: 'lucide:lock',
          title: 'Password',
        },
        {
          href: 'security-sessions',
          icon: 'lucide:users',
          title: 'Active sessions',
        },
        {
          href: 'security-audit-logs',
          icon: 'lucide:file-search',
          title: 'Audit logs',
        },
      ],
      title: 'Security',
    },
    {
      items: [
        {
          href: 'email-notifications',
          icon: 'lucide:bell',
          title: 'Notifications',
        },
      ],
      title: 'Email',
    },
  ];
</script>
