// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  components: [{ path: '~/components', pathPrefix: false }],
  imports: {
    dirs: ['types/*.ts'],
  },
  colorMode: {
    classSuffix: '',
  },
})
