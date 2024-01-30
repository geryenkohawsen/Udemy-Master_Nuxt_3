// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxt/content'],
  components: [{ path: '~/components', pathPrefix: false }],
  imports: {
    dirs: ['types/*.ts'],
  },
  eslint: {
    lintOnStart: false,
  },
  colorMode: {
    classSuffix: '',
  },
})
