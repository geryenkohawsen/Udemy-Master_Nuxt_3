<script setup lang="ts">
const isOpen = defineModel<boolean>('isOpen')
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>Add Transaction</template>
      <div>Hello!</div>
    </UCard>
  </UModal>
</template>
