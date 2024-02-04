<script setup lang="ts">
import type { NuxtError } from '#app'

interface Props {
  error: NuxtError
}

defineProps<Props>()

const handleError = (): Promise<void> => clearError({ redirect: '/' })
</script>

<template>
  <section class="flex flex-col">
    <h1 class="mb-4 text-4xl">Opps {{ error.statusCode }}</h1>
    <h2 class="text-xl text-gray-500 dark:text-gray-400">{{ error.statusMessage }}</h2>
    <button
      class="rounded bg-emerald-600 px-4 py-2 font-bold uppercase text-white hover:bg-emerald-700 dark:bg-teal-700 dark:hover:bg-teal-800"
      @click="handleError"
    >
      go to home page
    </button>
  </section>
</template>
