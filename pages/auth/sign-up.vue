<template>
  <div class="w-full flex">
    <div
      class="min-h-screen w-1/2 bg-[url(/auth/banner-sign-up.png)] bg-cover bg-center bg-no-repeat"
    ></div>
    <div class="w-1/2 flex flex-col items-center justify-center py-5">
      <form class="max-w-110 flex flex-col space-y-5">
        <UiLayoutDivider direction="right">Kento</UiLayoutDivider>
        <h1 class="text-5xl font-title">We're glad to have you here.</h1>
        <p>
          Please complete the required fields to register your user account and manage your projects
          like never before.
        </p>
        <UiFormInput label="Username" type="text" icon-left="lucide:user" />
        <UiFormInput label="Email" icon-left="lucide:mail" type="email" />
        <UiFormInput label="Password" icon-left="lucide:key" type="password" />
        <UiFormInput label="Confirm password" icon-left="lucide:key" type="password" />
        <ui-button aria-label="Create a new user account" variant="solid">
          Join to the platform
        </ui-button>
        <UiLayoutDivider>Already have an account?</UiLayoutDivider>
        <ui-button-link aria-label="Go to sign in page" to="/auth" variant="soft">
          Sign In
        </ui-button-link>
        <UiLayoutDivider direction="left">Authentication</UiLayoutDivider>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
