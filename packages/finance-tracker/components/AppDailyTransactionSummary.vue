<script setup lang="ts">
const props = defineProps<{
  /**
   * Transaction date
   */
  date: string // TODO: use dayJS to change date format
  /**
   * Transaction history
   */
  transactions: Transaction[]
}>()

const dateSummary = computed(() => {
  let sum = 0

  for (const transaction of props.transactions) {
    if (transaction.type.toLowerCase() === 'income') {
      sum += transaction.amount
    } else {
      sum -= transaction.amount
    }
  }

  return sum
})

const currency = useLocaleCurrency(dateSummary.value)
</script>

<template>
  <div class="grid grid-cols-2 border-b border-gray-200 py-4 text-gray-500 dark:border-gray-600 dark:text-gray-400">
    <div class="flex items-center">
      {{ date }}
    </div>

    <div class="mr-10 flex items-center justify-end">{{ currency }}</div>
  </div>
</template>
