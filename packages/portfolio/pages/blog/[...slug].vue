<script setup lang="ts">
const route = useRoute()
console.log('route --> ', route.params.slug)
</script>

<template>
  <article>
    <ContentDoc />
  </article>
</template>
