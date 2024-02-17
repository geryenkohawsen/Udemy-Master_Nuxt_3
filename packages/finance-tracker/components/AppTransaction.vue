<script setup lang="ts">
interface Props {
  /**
   * Transaction history
   */
  transaction: Transaction
}
const props = defineProps<Props>()

const currency = useLocaleCurrency(props.transaction.amount)
const items = [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: (): void => console.log('Edit'),
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: (): void => console.log('Delete'),
    },
  ],
]
</script>

<template>
  <div class="grid grid-cols-2 border-b border-gray-200 py-4 text-gray-900 dark:border-gray-600 dark:text-gray-100">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <UIcon name="i-heroicons-arrow-up-right" class="text-green-600" />
        <div>{{ props.transaction.description }}</div>
      </div>

      <div>
        <UBadge v-if="props.transaction.description" color="white">{{ props.transaction.category }}</UBadge>
      </div>
    </div>

    <div class="flex items-center justify-end gap-x-2">
      <div>{{ currency }}</div>
      <div>
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton color="white" variant="ghost" trailing-icon="i-heroicons-ellipsis-horizontal" />
        </UDropdown>
      </div>
    </div>
  </div>
</template>
