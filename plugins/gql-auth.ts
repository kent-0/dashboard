export default defineNuxtPlugin((nuxtApp) => {
  const cookie = useCookie('auth:token');
  nuxtApp.hook('apollo:auth', ({ token }) => {
    token.value = cookie.value!;
  });
});
