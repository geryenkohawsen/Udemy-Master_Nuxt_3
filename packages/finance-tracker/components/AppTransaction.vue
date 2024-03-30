<script setup lang="ts">
const props = defineProps<{
  /**
   * Transaction history
   */
  transaction: Transaction
}>()

const emit = defineEmits(['deleted'])

const isIncome = computed(() => props.transaction.type === 'Income')
const currency = useLocaleCurrency(props.transaction.amount)

const isLoading = ref(false)
const toast = useToast()
const supabase = useSupabaseClient()

async function deleteTransaction(): Promise<void> {
  isLoading.value = true

  try {
    await supabase.from('transactions').delete().eq('id', props.transaction.id)
    toast.add({
      title: 'Transaction delete!',
      icon: 'i-heroicons-check-circle',
      color: 'green',
    })
    emit('deleted', props.transaction.id)
  } catch (error) {
    toast.add({
      title: 'Transaction delete!',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
    })
  } finally {
    isLoading.value = false
  }
}

const optionItems = [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: (): void => console.log('Edit'),
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: deleteTransaction,
    },
  ],
]
</script>

<template>
  <div class="grid grid-cols-3 border-b border-gray-200 py-4 text-gray-900 dark:border-gray-600 dark:text-gray-100">
    <div class="col-span-2 flex items-center justify-between space-x-4">
      <div class="flex items-center">
        <UIcon :name="isIncome ? 'i-heroicons-arrow-up-right' : 'i-heroicons-arrow-down-left'" :class="isIncome ? 'text-green-600' : 'text-red-600'" />
        <div>{{ props.transaction.description }}</div>
      </div>

      <div>
        <UBadge v-if="props.transaction.category" color="white">{{ props.transaction.category }}</UBadge>
      </div>
    </div>

    <div class="flex items-center justify-end gap-x-2">
      <div>{{ currency }}</div>
      <div>
        <UDropdown :items="optionItems" :popper="{ placement: 'bottom-start' }">
          <UButton color="white" variant="ghost" trailing-icon="i-heroicons-ellipsis-horizontal" :loading="isLoading" />
        </UDropdown>
      </div>
    </div>
  </div>
</template>
