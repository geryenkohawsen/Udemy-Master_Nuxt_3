// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/eslint-module', '@nuxt/ui', '@nuxtjs/supabase', 'dayjs-nuxt'],
  components: [{ path: '~/components', pathPrefix: false }],
  imports: {
    dirs: ['types/**'],
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL ?? 'http://localhost:3000'
    },
  },
  eslint: {
    lintOnStart: false,
  },
  supabase: {
    redirect: true, // false for development
  },
  dayjs: {
    locales: ['ja'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'ja',
    defaultTimezone: 'Asia/Japan',
  },
})
