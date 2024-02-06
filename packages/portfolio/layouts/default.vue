<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'

useHead({
  titleTemplate: '%s - Geryenko Hawsen',
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', // TODO: Change to Nuxt Google Font module
      crossorigin: '',
    },
  ],
})
</script>

<template>
  <div class="container mx-auto max-w-4xl">
    <header class="mt-5 flex items-start justify-between md:items-center">
      <div class="flex items-center md:space-x-12">
        <div class="hidden md:block">
          <NuxtLink to="/" class="p-2 text-xl font-semibold hover:bg-gray-200">Gery</NuxtLink>
        </div>
        <GhMenu />
      </div>
      <ClientOnly>
        <!-- render color change on client only because color preference is store on the browser -->
        <GhColorMode />
      </ClientOnly>
    </header>

    <main class="mt-10 p-2">
      <slot />
    </main>
    <SpeedInsights />
  </div>
</template>

<style>
body {
  font-family: 'Roboto', sans-serif;
}

body {
  @apply bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300;
}
</style>
