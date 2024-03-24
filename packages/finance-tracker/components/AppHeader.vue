<script setup lang="ts">
const user = useSupabaseUser()

watch(
  user,
  user => {
    if (user) {
      alert('Signed in!')
    }
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <header class="mt-10 flex items-center justify-between">
    <NuxtLink to="/" class="text-xl font-bold">Finance Tracker</NuxtLink>
    <div>
      <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
    </div>
  </header>
</template>
