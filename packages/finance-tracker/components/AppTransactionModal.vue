<script setup lang="ts">
import { z } from 'zod'

const props = defineProps<{
  transaction?: Transaction
}>()
const emit = defineEmits(['saved'])
const isEditing = computed(() => !!props.transaction)

const isOpen = defineModel<boolean>('isOpen', {
  set(value) {
    if (!value) resetForm()
    else return value
  },
})

const formDefaultSchema = z.object({
  amount: z.number().positive('Amount needs to be more than 0'),
  created_at: z.string(),
  description: z.string().optional(),
})

const incomeSchema = z.object({
  type: z.literal('Income'),
})

const expenseSchema = z.object({
  type: z.literal('Expense'),
  category: z.enum(['Food', 'Housing', 'Car', 'Entertainment', 'Transport']),
})

const savingSchema = z.object({
  type: z.literal('Saving'),
})

const investmentSchema = z.object({
  type: z.literal('Investment'),
})

const formSchema = z.intersection(z.discriminatedUnion('type', [incomeSchema, expenseSchema, savingSchema, investmentSchema]), formDefaultSchema)

const form = ref()
const isLoading = ref(false)
const supabase = useSupabaseClient<Database>()
const { toastSuccess, toastError } = useAppToast()

async function save() {
  if (form.value.errors.length) return

  isLoading.value = true
  try {
    const { error } = await supabase.from('transactions').upsert({ ...formState.value, id: props.transaction?.id } as any)

    if (!error) {
      toastSuccess({
        title: 'Transaction Saved',
      })
      isOpen.value = false
      emit('saved')
    }
  } catch (error: any) {
    toastError({
      title: 'Transaction not saved',
      description: error.message,
    })
  } finally {
    isLoading.value = false
  }

  // Store into Supabase
}

const initialState = {
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined,
}
const formState = ref<NewTransaction>(
  isEditing.value
    ? {
        type: props.transaction?.type,
        amount: props.transaction?.amount,
        created_at: props.transaction?.created_at,
        description: props.transaction?.description,
        category: props.transaction?.category,
      }
    : { ...initialState }
)

function resetForm() {
  Object.assign(formState.value, initialState)
  form.value.clear()
}
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>{{ isEditing ? 'Edit' : 'Add' }} Transaction</template>

      <UForm ref="form" :state="formState" :schema="formSchema" class="flex flex-col gap-4" @submit="save">
        <UFormGroup label="Transaction Type" :required="true" name="type">
          <USelect v-model="formState.type" type="number" placeholder="Select the transaction Type" :disabled="isEditing" :options="CONST.TRANSACTION_TYPES" />
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

        <UFormGroup v-if="formState.type === 'Expense'" label="Category" :required="true" name="category">
          <USelect v-model="formState.category" placeholder="Category" :options="CONST.EXPENSE_CATEGORIES" />
        </UFormGroup>

        <UButton type="submit" color="black" variant="solid" label="Save" :loading="isLoading" />
      </UForm>
    </UCard>
  </UModal>
</template>
