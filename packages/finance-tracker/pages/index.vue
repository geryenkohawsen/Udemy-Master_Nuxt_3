<script setup lang="ts">
const selectedTransactionView = ref(transactionViewOptions[1])

const supabase = useSupabaseClient()
const transactions = ref<Transaction[]>([])

const { data, pending } = await useAsyncData('transactions', async () => {
  const { data, error } = await supabase.from('transactions').select()
  if (error) {
    console.log('error → ', error)
    return []
  }
  return data
})

if (data.value) transactions.value = data.value

// sorted transactions base on date
const transactionsGroupedByDate = computed(() => {
  const grouped = {} as { [key: string]: Transaction[] }

  for (const transaction of transactions.value) {
    // take only date data from tie ISO format
    const date = new Date(transaction.created_at).toISOString().split('T')[0]

    // add date as object key if there is none yet
    if (!grouped[date]) grouped[date] = []

    // add transaction to grouped object
    grouped[date].push(transaction)
  }

  return grouped
})

console.log('transactionsGroupedByDate → ', transactionsGroupedByDate.value)
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
      <AppTransaction v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" />
    </section>
  </div>
</template>
