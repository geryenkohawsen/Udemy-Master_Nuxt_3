import type { Style } from 'nuxt/dist/head/runtime/components';
<script setup lang="ts">
const { data } = await useAsyncData('blog-list', () =>
  queryContent('/blog')
    .where({
      _path: {
        $ne: '/blog', // remove blog index.md
      },
    })
    .only(['_path', 'title', 'publishedAt'])
    .sort({ publishedAt: -1 }) // sort by publishedAt from newest
    .find()
)

const posts = computed(() => {
  if (!data.value) {
    return []
  }

  const result = []
  let lastYear = null

  for (const post of data.value) {
    const year = new Date(post.publishedAt).getFullYear()
    post.year = year

    // logic to determine whether if year should be shown or not
    const displayYear = year !== lastYear
    post.displayYear = displayYear // set displayYear as true if current post's year is not the same as last year

    // add new post object to the result array
    result.push(post)

    // change last year to current year of the current post
    lastYear = year
  }

  return result
})

console.log('posts --> ', posts)
</script>

<template>
  <section class="not-prose font-mono">
    <div class="column text-sm text-gray-400">
      <div>date</div>
      <div>title</div>
    </div>
    <ul>
      <li v-for="post in posts" :key="post._path">
        <NuxtLink :to="post._path" class="column hover:bg-gray-100 dark:hover:bg-gray-800">
          <div
            :class="{
              'text-white dark:text-gray-900': !post.displayYear,
              'text-gray-400 dark:text-gray-500': post.displayYear,
            }"
          >
            {{ post.year }}
          </div>
          <div>{{ post.title }}</div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.column {
  @apply flex items-center space-x-8 border-b border-gray-200 py-2 dark:border-l-gray-700;
}
</style>
