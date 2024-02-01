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
      <div class="grid grid-cols-6 gap-16">
        <div :class="{ 'col-span-4': doc.toc, 'col-span-6': !doc.toc }">
          <ContentRenderer :value="doc" />
        </div>
        <div v-if="doc.body?.toc?.links" class="not-prose col-span-2">
          <aside class="sticky top-8">
            <div class="mb-2 font-semibold">Table of Contents</div>
            <nav>
              <GhTocLinks :links="doc.body?.toc?.links" />
            </nav>
          </aside>
        </div>
      </div>
    </ContentDoc>
  </article>
</template>
