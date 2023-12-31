<template>
  <main>
    <slot />
    <footer class="flex flex-col bg-components-card p-5 dark:bg-components-cardDark">
      <div class="mx-auto flex flex-col items-center justify-between gap-3 container md:flex-row">
        <div class="flex flex-col items-center gap-2 text-center md:(flex flex-row text-left)">
          <nuxt-img src="/icon.png" class="size-10 rounded-md" />
          <div class="h-fit flex flex-col">
            <h2 class="text-lg font-semibold">Kento</h2>
            <small>All rights reserved &copy; {{ new Date().getFullYear() }}</small>
          </div>
        </div>
        <ul class="grid grid-cols-3 place-items-center gap-2 text-center md:grid-cols-6">
          <li>
            <nuxt-link
              to="/"
              class="transition duration-300 hover:text-brand hover:dark:text-brand-dark"
            >
              Home
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="transition duration-300 hover:text-brand hover:dark:text-brand-dark"
            >
              About
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="transition duration-300 hover:text-brand hover:dark:text-brand-dark"
            >
              Blog
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="transition duration-300 hover:text-brand hover:dark:text-brand-dark"
            >
              Terms
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="transition duration-300 hover:text-brand hover:dark:text-brand-dark"
            >
              Privacy
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="transition duration-300 hover:text-brand hover:dark:text-brand-dark"
            >
              Contact us
            </nuxt-link>
          </li>
        </ul>
        <div class="hidden flex-col lg:flex">
          <h2 class="font-semibold">System status</h2>
          <div class="flex items-center space-x-2">
            <small>Operational</small>
            <icon name="lucide:check-circle" class="text-brand dark:text-brand-dark" />
          </div>
        </div>
      </div>
    </footer>
  </main>
</template>
