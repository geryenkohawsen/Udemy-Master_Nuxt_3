<script setup lang="ts">
import { z } from 'zod'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { toastSuccess, toastError } = useAppToast()
const pending = ref(false)
const state = ref({
  transactionView: user.value?.user_metadata?.['transaction_view'], // Initialization goes here
})

const schema = z.object({
  transactionView: z.nativeEnum(TransactionViewOptions), // ZOD constraints goes here
})

async function saveSettings() {
  pending.value = true

  // Only add `full_name` and `email` if it's different from the current profile in the database
  const data = {
    ...(state.value.transactionView !== user.value?.user_metadata?.['transaction_view'] && { transaction_view: state.value.transactionView }),
  }

  // Return immediately if there are no changes
  if (Object.keys(data).length === 0) {
    toastSuccess({
      title: 'Settings updated??',
      description: 'There were no changes though 🤔',
    })
    pending.value = false
    return
  }

  // If there are changes to the current profile data
  const { error } = await supabase.auth.updateUser({
    data: {
      transaction_view: state.value.transactionView,
    },
  })

  if (error) {
    toastError({
      title: 'Error updating settings',
      description: error.message,
    })
  } else {
    toastSuccess({
      title: 'Settings updated',
      description: 'Your settings has been updated!',
    })
  }

  pending.value = false
}
</script>

<template>
  <UForm :state="state" :schema="schema" @submit="saveSettings">
    <UFormGroup label="Transaction View" class="mb-4" help="Choose how you would like to view transactions">
      <USelect v-model="state.transactionView" :options="CONST.TRANSACTION_VIEW_OPTIONS" />
    </UFormGroup>

    <UButton type="submit" color="black" variant="solid" label="Save" :loading="pending" :disabled="pending" />
  </UForm>
</template>
