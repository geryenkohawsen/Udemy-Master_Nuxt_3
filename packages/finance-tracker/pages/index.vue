<script setup lang="ts">
const selectedTransactionView = ref(transactionViewOptions[1])
</script>

<template>
  <section class="mb-10 flex items-center justify-between">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selectedTransactionView" :options="transactionViewOptions" />
    </div>
  </section>
</template>
