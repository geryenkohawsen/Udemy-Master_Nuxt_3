<script setup lang="ts">
import { z } from 'zod'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { toastSuccess, toastError } = useAppToast()
const pending = ref(false)

const state = ref({
  name: user.value?.user_metadata?.['full_name'],
  email: user.value?.email,
})

const schema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
})

async function saveProfile() {
  pending.value = true

  // Only add `full_name` and `email` if it's different from the current profile in the database
  const data = {
    ...(state.value.name !== user.value?.user_metadata?.['full_name'] && { full_name: state.value.name }),
    ...(state.value.email !== user.value?.email && { email: state.value.email }),
  }

  // Return immediately if there are no changes
  if (Object.keys(data).length === 0) {
    toastSuccess({
      title: 'Profile updated??',
      description: 'There were no changes though 🤔',
    })
    pending.value = false
    return
  }

  // If there are changes to the current profile data
  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: state.value.name,
    },
  })

  if (error) {
    toastError({
      title: 'Error updating profile',
      description: error.message,
    })
  } else {
    toastSuccess({
      title: 'Profile updated',
      description: 'Your profile has been updated!',
    })
  }

  pending.value = false
}
</script>

<template>
  <UForm :state="state" :schema="schema" @submit="saveProfile">
    <UFormGroup class="mb-4" label="Full Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup
      class="mb-4"
      label="Email"
      name="email"
      help="You will receive a confirmation email on both the old and the new addresses if you modify the email address"
    >
      <UInput v-model="state.email" />
    </UFormGroup>

    <UButton type="submit" color="black" variant="solid" label="Save" :pending="pending" :disabled="pending" />
  </UForm>
</template>
