<script setup lang="ts">
const route = useRoute()
console.log('route --> ', route.params.slug)
</script>

<template>
  <article
    class="prose dark:prose-invert prose-pre:bg-white prose-pre:text-gray-700 dark:prose-pre:bg-gray-800 dark:prose-pre:text-gray-300"
  >
    <ContentDoc />
  </article>
</template>
