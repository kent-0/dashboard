<template>
  <div class="w-full flex">
    <div
      class="h-screen w-1/2 bg-[url(/auth/banner-sign-up.png)] bg-cover bg-center bg-no-repeat"
    ></div>
    <div class="h-screen w-1/2 flex flex-col items-center justify-center">
      <div class="max-w-110 w-full flex flex-col gap-5">
        <h1 class="text-5xl font-title">We're glad to have you here.</h1>
        <p>
          Please complete the required fields to register your user account and manage your projects
          like never before.
        </p>
        <UiFormInput label="Username" type="text" icon-left="lucide:user" />
        <UiFormInput label="Email" icon-left="lucide:mail" type="email" />
        <UiFormInput label="Password" icon-left="lucide:key" type="password" />
        <UiFormInput label="Confirm password" icon-left="lucide:key" type="password" />
        <ui-button variant="solid">Sign Up</ui-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
