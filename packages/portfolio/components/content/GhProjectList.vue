<script setup lang="ts">
const { data, pending, error } = await useFetch<Array<GitHubRepo>>('https://api.github.com/users/geryenkohawsen/repos')
const reposRawData = computed(() =>
  data.value?.filter(repo => repo.description).sort((a, b) => b.stargazers_count - a.stargazers_count)
) // use only repositories that have a description
console.log('reposRawData --> ', reposRawData.value)
</script>

<template>
  <div class="not-prose">
    <section v-if="pending">Loading...</section>
    <section v-else-if="error">Something went wrong Try again!</section>
    <section v-else>
      <ul class="grid grid-cols-1 gap-4">
        <li
          v-for="repo in reposRawData"
          :key="repo.id"
          class="rounded-sm border border-gray-200 p-4 font-mono hover:bg-gray-100"
        >
          <a :href="repo.html_url" target="_blank">
            <div class="flex items-center justify-between">
              <div class="text-sm font-semibold">
                {{ repo.name }}
              </div>
              <div>{{ repo.stargazers_count }}⭐</div>
            </div>
            <p class="text-sm">
              {{ repo.description }}
            </p>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>
