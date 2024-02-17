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
      <AppTrend title="Income" :amount="4000" :last-amount="3000" :is-loading="false" />
      <AppTrend title="Expense" :amount="4000" :last-amount="5000" :is-loading="false" />
      <AppTrend title="Investments" :amount="4000" :last-amount="3000" :is-loading="false" />
      <AppTrend title="Saving" :amount="4000" :last-amount="4200" :is-loading="false" />
    </section>

    <section>
      <AppTransaction />
      <AppTransaction />
      <AppTransaction />
      <AppTransaction />
    </section>
  </div>
</template>
