<script setup lang="ts">
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

const colorMode = useColorMode()

console.log(colorMode.preference)
colorMode.preference = 'light'
</script>

<template>
  <div class="container mx-auto max-w-2xl">
    <header class="mt-5 flex items-center justify-between">
      <div>
        <NuxtLink to="/" class="p-2 text-xl font-semibold hover:bg-gray-200">Gery</NuxtLink>
      </div>
      <GhMenu />
    </header>

    <main class="mt-10 p-2">
      <slot />
    </main>
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
