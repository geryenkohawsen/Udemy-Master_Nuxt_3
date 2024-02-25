<script setup lang="ts">
const selectedTransactionView = ref(CONST.TRANSACTION_VIEW_OPTIONS[1])

const supabase = useSupabaseClient()
const transactions = ref<Transaction[] | undefined>([])
const isLoading = ref<boolean>(false)
const isPageValid = ref<boolean>(false)
const isModalOpen = ref<boolean>(false)

const income = computed(() => transactions.value?.filter(t => t.type === 'income'))
const incomeCount = computed(() => income.value?.length)
const incomeTotal = computed(() => income.value?.reduce((sum, t) => sum + t.amount, 0))
const expense = computed(() => transactions.value?.filter(t => t.type === 'expense'))
const expenseCount = computed(() => expense.value?.length)
const expenseTotal = computed(() => income.value?.reduce((sum, t) => sum + t.amount, 0))

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
        <USelectMenu v-model="selectedTransactionView" :options="CONST.TRANSACTION_VIEW_OPTIONS" />
      </div>
    </section>

    <section class="mb-10 grid grid-cols-1 sm:grid-cols-2 sm:gap-16 lg:grid-cols-4">
      <AppTrend v-if="incomeTotal" title="Income" :amount="incomeTotal" :last-amount="3000" :is-loading="isLoading" />
      <USkeleton v-else class="h-full w-full" />
      <AppTrend v-if="expenseTotal" title="Expense" :amount="expenseTotal" :last-amount="5000" :is-loading="isLoading" />
      <USkeleton v-else class="h-full w-full" />
      <AppTrend title="Investments" :amount="4000" :last-amount="3000" :is-loading="isLoading" />
      <AppTrend title="Saving" :amount="4000" :last-amount="4200" :is-loading="isLoading" />
    </section>

    <section class="mb-10 flex justify-between">
      <div>
        <h2 class="text-2xl font-extrabold">Transactions</h2>
        <div class="text-gray-500 dark:text-gray-400">You have {{ incomeCount }} incomes and {{ expenseCount }} expense this period</div>
      </div>
      <div>
        <AppTransactionModal v-model:is-open="isModalOpen" />
        <UButton icon="i-heroicons-plus-circle" color="white" variant="solid" label="Add" @click="isModalOpen = true" />
      </div>
    </section>

    <section v-if="isLoading">
      <USkeleton v-for="i in 4" :key="i" class="mb-2 h-8 w-full" />
    </section>
    <section v-else>
      <div v-for="(transactionsByDate, date) in transactionsGroupedByDate" :key="date">
        <AppDailyTransactionSummary :date="date.toString()" :transactions="transactionsByDate" />
        <AppTransaction v-for="transaction in transactionsByDate" :key="transaction.id" :transaction="transaction" @deleted="refreshTransactions" />
      </div>
    </section>
  </div>
</template>
