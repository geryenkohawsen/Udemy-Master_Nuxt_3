<script setup lang="ts">
const activeId = ref<string>('')

onMounted(() => {
  const callback = (entries: IntersectionObserverEntry[]) => {
    // TODO: make into an array that catch all content below the headings
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id
        console.log('activeId.value → ', activeId.value)
        break
      }
    }
  }

  const observer = new IntersectionObserver(callback, {
    root: null, // make whole document as root
    threshold: 0.5, // 50% of the element should be visible
  })

  const elements = document.querySelectorAll('h2, h3')
  elements.forEach(element => observer.observe(element))

  // Clean up the observer when the component unmounts (moving to a new page)
  onBeforeUnmount(() => {
    elements.forEach(element => observer.unobserve(element))
  })
})
</script>

<template>
  <article
    class="prose max-w-none dark:prose-invert prose-pre:bg-white prose-pre:text-gray-700 dark:prose-pre:bg-gray-800 dark:prose-pre:text-gray-300"
  >
    <ContentDoc>
      <template #not-found>
        <h1>Document not found... (404)</h1>
        <p>This blog post is not available</p>
      </template>
      <template #default="{ doc }">
        <div class="grid grid-cols-6 gap-16">
          <div :class="{ 'col-span-4': doc.toc, 'col-span-6': !doc.toc }">
            <ContentRenderer :value="doc" />
          </div>
          <div v-if="doc.body?.toc?.links" class="not-prose col-span-2">
            <aside class="sticky top-8">
              <div class="mb-2 font-semibold">Table of Contents</div>
              <nav>
                <GhTocLinks :links="doc.body?.toc?.links" :active-id="activeId" />
              </nav>
            </aside>
          </div>
        </div>
      </template>
    </ContentDoc>
  </article>
</template>
