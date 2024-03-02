<script setup lang="ts">
const isOpen = defineModel<boolean>('isOpen')

const formState = ref({
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined,
})
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>Add Transaction</template>

      <UForm :state-="formState" class="flex flex-col gap-4">
        <UFormGroup label="Transaction Type" :required="true" name="type">
          <USelect v-model="formState.type" type="number" placeholder="Select the transaction Type" :options="CONST.TRANSACTION_TYPES" />
        </UFormGroup>

        <UFormGroup label="Amount" :required="true" name="amount">
          <UInput v-model.number="formState.amount" type="number" placeholder="Amount" />
        </UFormGroup>

        <UFormGroup label="Transaction Date" :required="true" name="created_at">
          <UInput v-model="formState.created_at" type="date" icon="i-heroicons-calendar-day-20-solid" />
        </UFormGroup>

        <UFormGroup label="Description" :required="false" hint="Optional" name="description">
          <UInput v-model="formState.description" placeholder="Description" />
        </UFormGroup>

        <UFormGroup label="Category" :required="true" name="category">
          <USelect v-model="formState.category" placeholder="Category" :options="CONST.CATEGORIES" />
        </UFormGroup>

        <UButton type="submit" color="black" variant="solid" label="Save" />
      </UForm>
    </UCard>
  </UModal>
</template>
