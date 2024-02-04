<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({}),
  },
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <section>
      <h1 class="mb-4 text-4xl">Opps {{ error.statusCode }}</h1>
      <h2 class="text-xl text-gray-500 dark:text-gray-400">{{ error.statusMessage }}</h2>
    </section>
  </NuxtLayout>
</template>
