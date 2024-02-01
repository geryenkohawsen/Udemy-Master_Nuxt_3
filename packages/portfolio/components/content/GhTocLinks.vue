<script setup lang="ts">
import type { TocLink } from '@nuxt/content/dist/runtime/types'

interface Props {
  links?: Array<TocLink>
  level?: {
    type: number
    default: number
  }
}

const route = useRoute()

withDefaults(defineProps<Props>(), {
  links: () => [],
  level: () => {
    return {
      type: 0,
      default: 0,
    }
  },
})
</script>

<template>
  <ul>
    <li v-for="link in links" :key="link.id">
      <NuxtLink :to="{ path: route.path, hash: `#${link.id}` }" :class="{ 'ml-4': level }">
        {{ link.text }}
      </NuxtLink>
      <GhTocLinks :links="link.children" />
    </li>
  </ul>
</template>
