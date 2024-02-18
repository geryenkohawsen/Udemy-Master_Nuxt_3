<script setup lang="ts">
const selectedTransactionView = ref(transactionViewOptions[1])

const supabase = useSupabaseClient()
const transactions = ref<Transaction[] | undefined>([])
const isLoading = ref<boolean>(false)

const fetchTransactions = async (): Promise<Transaction[] | undefined> => {
  isLoading.value = true
  try {
    const { data } = await useAsyncData('transactions', async () => {
      const { data, error } = await supabase.from('transactions').select()

      if (error) return []

      return data as Transaction[]
    })

    if (data.value) return data.value
  } catch (error) {
    console.error('Fetch Transactions Error:', error)
    // TODO: Handle the error appropriately here
    // e.g., setErrorState(error), showErrorMessage(...)
    return undefined
  } finally {
    isLoading.value = false
  }
}

const refreshTransactions = async (): Promise<void> => {
  transactions.value = await fetchTransactions()
}
await refreshTransactions()

// sorted transactions base on date
const transactionsGroupedByDate = computed(() => {
  if (!transactions.value) return undefined

  const grouped = {} as { [key: string]: Transaction[] }

  for (const transaction of transactions.value) {
    // take only date data from tie ISO format
    const date = new Date(transaction.created_at).toISOString().split('T')[0]

    // add date as object key if there is none yet
    if (!grouped[date]) grouped[date] = []

    // add transaction to grouped object
    grouped[date].push(transaction)
  }

  // TODO: sort key from latest date
  console.log('grouped → ', grouped)

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
      <AppTrend title="Income" :amount="4000" :last-amount="3000" :is-loading="isLoading" />
      <AppTrend title="Expense" :amount="4000" :last-amount="5000" :is-loading="isLoading" />
      <AppTrend title="Investments" :amount="4000" :last-amount="3000" :is-loading="isLoading" />
      <AppTrend title="Saving" :amount="4000" :last-amount="4200" :is-loading="isLoading" />
    </section>

    <section v-if="isLoading">
      <USkeleton v-for="i in 4" :key="i" class="mb-2 h-8 w-full" />
    </section>
    <section v-else>
      <div v-for="(transactionsByDate, date) in transactionsGroupedByDate" :key="date">
        <AppDailyTransactionSummary :date="date.toString()" :transactions="transactionsByDate" />
        <AppTransaction
          v-for="transaction in transactionsByDate"
          :key="transaction.id"
          :transaction="transaction"
          @deleted="refreshTransactions"
        />
      </div>
    </section>
  </div>
</template>
