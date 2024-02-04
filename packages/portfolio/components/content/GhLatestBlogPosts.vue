<script setup lang="ts">
interface Props {
  limit?: number
}

const props = defineProps<Props>()
</script>

<template>
  <GhBlogPosts v-slot="{ posts }" :limit="props.limit">
    <div v-for="post in posts" :key="post.id">
      <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
    </div>
  </GhBlogPosts>
</template>
