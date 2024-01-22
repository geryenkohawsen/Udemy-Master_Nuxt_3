<script setup lang="ts">
const route = useRoute();
// console.log('route --> ', route);
</script>

<template>
  <div>We are inside a blog!!!</div>
  <div>Post id is {{ route.params.id }}</div>
</template>
