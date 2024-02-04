<script setup lang="ts">
const props = defineProps<{
  limit?: number
}>()
</script>

<template>
  <GhBlogPosts v-slot="{ posts }" :limit="props.limit">
    <div v-for="post in posts" :key="post.id">
      <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
    </div>
  </GhBlogPosts>
</template>
