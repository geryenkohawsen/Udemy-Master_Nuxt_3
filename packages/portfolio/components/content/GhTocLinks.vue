<script setup lang="ts">
import type { TocLink } from '@nuxt/content/dist/runtime/types'

interface Props {
  links: Array<TocLink>
  level?: number
  activeId: string
}

const props = withDefaults(defineProps<Props>(), {
  level: 0,
})

const route = useRoute()
</script>

<template>
  <ul>
    <li v-for="link in props.links" :key="link.id">
      <NuxtLink
        :to="{ path: route.path, hash: `#${link.id}` }"
        :class="{ 'ml-4': props.level, 'text-green-600 dark:text-green-400': props.activeId === link.id }"
      >
        {{ link.text }}
      </NuxtLink>
      <GhTocLinks v-if="link.children" :links="link.children" :level="props.level + 1" :active-id="props.activeId" />
    </li>
  </ul>
</template>
