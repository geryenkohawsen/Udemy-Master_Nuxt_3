<script setup lang="ts">
const { data: repoRawData, pending, error } = await useFetch('https://api.github.com/users/geryenkohawsen/repos')
console.log('repoRawData --> ', repoRawData.value)
</script>

<template>
  <div>Project List</div>
  <section v-if="pending">Loading...</section>
  <section v-else-if="error">Something went wrong Try again!</section>
  <section v-else>Here are the repos!</section>
</template>
