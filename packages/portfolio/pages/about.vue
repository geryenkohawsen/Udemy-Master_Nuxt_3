<script setup lang="ts">
// definePageMeta({
//   layout: 'another',
// });

// function enableCustomLayout(): void {
//   setPageLayout("another");
// }

useHead({
  title: 'About', // same as using useSeoMeta() composables
})
</script>

<template>
  <div>About page</div>
  <!-- <div>
    <button @click="enableCustomLayout">Update layout</button>
  </div> -->
</template>
