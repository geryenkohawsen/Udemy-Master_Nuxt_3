// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/eslint-module', '@nuxt/ui', '@nuxtjs/supabase'],
  components: [{ path: '~/components', pathPrefix: false }],
  eslint: {
    lintOnStart: false,
  },
  supabase: {
    redirect: false, // false for development
  },
})
