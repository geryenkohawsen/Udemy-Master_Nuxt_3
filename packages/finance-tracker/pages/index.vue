<script setup lang="ts">
const selectedTransactionView = ref(transactionViewOptions[1])
</script>

<template>
  <div id="page-index">
    <section class="mb-10 flex items-center justify-between">
      <h1 class="text-4xl font-extrabold">Summary</h1>
      <div>
        <USelectMenu v-model="selectedTransactionView" :options="transactionViewOptions" />
      </div>
    </section>

    <section class="mb-10 grid grid-cols-1 sm:grid-cols-2 sm:gap-16 lg:grid-cols-4">
      <AppTrend color="green" title="Income" :amount="4000" :last-amount="3000" :is-loading="false" />
      <AppTrend color="red" title="Income" :amount="4000" :last-amount="3000" :is-loading="false" />
      <AppTrend color="green" title="Income" :amount="4000" :last-amount="3000" :is-loading="false" />
      <AppTrend color="red" title="Income" :amount="4000" :last-amount="3000" :is-loading="true" />
    </section>
  </div>
</template>
