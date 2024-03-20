<script setup lang="ts">
const selectedTransactionView = ref(CONST.TRANSACTION_VIEW_OPTIONS[1])
const dates = useSelectedTimePeriod(selectedTransactionView.value)
const isModalOpen = ref<boolean>(false)

const {
  pending,
  refreshTransactions,
  transactions: {
    incomeCount,
    expenseCount,
    incomeTotal,
    expenseTotal,
    grouped: { byDate },
  },
} = useFetchTransactions()

await refreshTransactions()
</script>

<template>
  <div id="page-index">
    <section class="mb-10 flex items-center justify-between">
      <h1 class="text-4xl font-extrabold">Summary</h1>
      <div>
        <USelectMenu v-model="selectedTransactionView" :options="CONST.TRANSACTION_VIEW_OPTIONS" />
      </div>
    </section>

    <section class="mb-10 grid grid-cols-1 sm:grid-cols-2 sm:gap-16 lg:grid-cols-4">
      <AppTrend v-if="incomeTotal" title="Income" :amount="incomeTotal" :last-amount="3000" :is-loading="pending" />
      <USkeleton v-else class="h-full w-full" />
      <AppTrend v-if="expenseTotal" title="Expense" :amount="expenseTotal" :last-amount="5000" :is-loading="pending" />
      <USkeleton v-else class="h-full w-full" />
      <AppTrend title="Investments" :amount="4000" :last-amount="3000" :is-loading="pending" />
      <AppTrend title="Saving" :amount="4000" :last-amount="4200" :is-loading="pending" />
    </section>

    <section class="mb-10 flex justify-between">
      <div>
        <h2 class="text-2xl font-extrabold">Transactions</h2>
        <div class="text-gray-500 dark:text-gray-400">You have {{ incomeCount }} incomes and {{ expenseCount }} expense this period</div>
      </div>
      <div>
        <AppTransactionModal v-model:is-open="isModalOpen" @saved="refreshTransactions" />
        <UButton icon="i-heroicons-plus-circle" color="white" variant="solid" label="Add" @click="isModalOpen = true" />
      </div>
    </section>

    <section v-if="pending">
      <USkeleton v-for="i in 4" :key="i" class="mb-2 h-8 w-full" />
    </section>
    <section v-else>
      <div v-for="(transactionsByDate, date) in byDate" :key="date">
        <AppDailyTransactionSummary :date="date.toString()" :transactions="transactionsByDate" />
        <AppTransaction v-for="transaction in transactionsByDate" :key="transaction.id" :transaction="transaction" @deleted="refreshTransactions" />
      </div>
    </section>
  </div>
</template>
