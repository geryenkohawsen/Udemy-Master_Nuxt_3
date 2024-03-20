export const useFetchTransactions = (period: ComputedRef<{ from: Date; to: Date }>) => {
  const supabase = useSupabaseClient()
  const transactions = ref<Transaction[] | undefined>([])
  const pending = ref<boolean>(false)

  const income = computed(() => transactions.value?.filter(t => t.type === 'Income'))
  const incomeCount = computed(() => income.value?.length)
  const incomeTotal = computed(() => income.value?.reduce((sum, t) => sum + t.amount, 0))
  const expense = computed(() => transactions.value?.filter(t => t.type === 'Expense'))
  const expenseCount = computed(() => expense.value?.length)
  const expenseTotal = computed(() => expense.value?.reduce((sum, t) => sum + t.amount, 0))

  const fetchTransactions = async (): Promise<Transaction[] | undefined> => {
    pending.value = true
    try {
      const { data } = await useAsyncData(
        `transactions-${period.value.from.toDateString()}-${period.value.to.toDateString()}`,
        async () => {
          const { data, error } = await supabase
            .from('transactions')
            .select()
            .gte('created_at', period.value.from.toISOString())
            .lte('created_at', period.value.to.toISOString())
            .order('created_at', { ascending: false })

          if (error) return []

          return data as Transaction[]
        }
      )

      if (data.value) return data.value
    } catch (error) {
      console.error('Fetch Transactions Error:', error)
      // TODO: Handle the error appropriately here
      // e.g., setErrorState(error), showErrorMessage(...)
      return undefined
    } finally {
      pending.value = false
    }
  }

  const refreshTransactions = async (): Promise<void> => {
    transactions.value = await fetchTransactions()
  }

  watch(period, async () => await refreshTransactions(), { immediate: true })

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

  return {
    transactions: {
      all: transactions,
      grouped: {
        byDate: transactionsGroupedByDate,
      },
      income,
      expense,
      incomeTotal,
      expenseTotal,
      incomeCount,
      expenseCount,
    },
    refreshTransactions,
    pending,
  }
}
