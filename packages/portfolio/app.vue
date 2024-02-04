<script setup lang="ts">
// const layout = 'another';
</script>

<template>
  <!-- <NuxtLayout :name="layout"> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0.3;
  filter: blur(1rem);
  transform: rotate3d(1, 1, 1, 10deg);
}
</style>
