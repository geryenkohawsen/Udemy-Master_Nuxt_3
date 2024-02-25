<script setup lang="ts">
const isOpen = defineModel<boolean>('isOpen')
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>Add Transaction</template>

      <div class="flex flex-col gap-4">
        <UFormGroup label="Transaction Type" :required="true" name="type">
          <USelect type="number" placeholder="Select the transaction Type" :options="CONST.TRANSACTION_TYPES" />
        </UFormGroup>

        <UFormGroup label="Amount" :required="true" name="amount">
          <UInput type="number" placeholder="Amount" />
        </UFormGroup>

        <UFormGroup label="Transaction Date" :required="true" name="created_at">
          <UInput type="date" icon="i-heroicons-calendar-day-20-solid" />
        </UFormGroup>

        <UFormGroup label="Description" :required="false" hint="Optional" name="description">
          <UInput placeholder="Description" />
        </UFormGroup>

        <UFormGroup label="Category" :required="true" name="category">
          <USelect placeholder="Category" :options="CONST.CATEGORIES" />
        </UFormGroup>

        <UButton type="submit" color="black" variant="solid" label="Save" />
      </div>
    </UCard>
  </UModal>
</template>
