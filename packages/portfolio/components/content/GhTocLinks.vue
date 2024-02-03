<script setup lang="ts">
import type { TocLink } from '@nuxt/content/dist/runtime/types'

interface Props {
  links: Array<TocLink>
  level?: number
  activeId: string
}

const route = useRoute()

withDefaults(defineProps<Props>(), {
  level: 0,
})
</script>

<template>
  <ul>
    <li v-for="link in links" :key="link.id">
      <NuxtLink
        :to="{ path: route.path, hash: `#${link.id}` }"
        :class="{ 'ml-4': level, 'text-green-600 dark:text-green-400': activeId === link.id }"
      >
        {{ link.text }}
      </NuxtLink>
      <GhTocLinks v-if="link.children" :links="link.children" :level="level + 1" :active-id="activeId" />
    </li>
  </ul>
</template>
