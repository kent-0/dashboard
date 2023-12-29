<template>
  <main>
    <slot />
    <footer class="mt-3 flex flex-col bg-components-card p-5 dark:bg-components-cardDark">
      <div class="mx-auto flex items-center justify-between gap-3 container">
        <div class="flex items-center space-x-2">
          <nuxt-img src="/icon.png" class="size-10 rounded-md" />
          <div class="h-fit flex flex-col">
            <h2 class="text-lg font-semibold">Kento</h2>
            <small>All rights reserved &copy; {{ new Date().getFullYear() }}</small>
          </div>
        </div>
        <ul class="flex space-x-5">
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
              Terms and conditions
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="transition duration-300 hover:text-brand hover:dark:text-brand-dark"
            >
              Privacy policy
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
        <div class="flex flex-col">
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
