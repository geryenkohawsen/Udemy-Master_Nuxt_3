<script setup lang="ts">
const route = useRoute()
console.log('route --> ', route.params.slug)
</script>

<template>
  <article
    class="prose max-w-none dark:prose-invert prose-pre:bg-white prose-pre:text-gray-700 dark:prose-pre:bg-gray-800 dark:prose-pre:text-gray-300"
  >
    <ContentDoc v-slot="{ doc }">
      {{ doc.body?.toc?.links }}
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </article>
</template>
