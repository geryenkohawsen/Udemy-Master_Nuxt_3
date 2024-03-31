<script setup lang="ts">
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const dayjs = useDayjs()

// We need to get the actual avatar URL
const { toastSuccess, toastError } = useAppToast()

const uploading = ref(false)
const fileInput = ref() // Reference to an input with ref="fileInput" attribute

async function saveAvatar() {
  if (!user.value) {
    toastError({
      title: 'Cannot retrieve user data',
      description: 'Maybe try reloading the page?',
    })
    return
  }
  // 1. Get the uploaded file
  //    a) If no file uploaded, show toast error
  // 2. Generate the new filename
  const avatarFile = fileInput.value.input.files[0]

  if (!avatarFile) {
    toastError({
      title: 'Select a file to upload first',
    })
    return
  }

  uploading.value = true

  const uploadTime = dayjs(new Date()).format('YYYYMMDDTHHmmss')
  const fileExtension = avatarFile.name.split('.').pop()
  const avatarFileName = `avatar-${user.value.email}-${uploadTime}.${fileExtension}`

  // 1. Grab the current avatar URL
  const currentAvatarUrl = user.value?.user_metadata?.['avatar_url']
  // 2. Upload the image to avatars bucket
  const { error } = await supabase.storage.from('avatars').upload(avatarFileName, avatarFile)

  if (error) {
    toastError({
      title: 'Error uploading avatar',
      description: error.message,
    })
  }
  // 3. Update the user metadata with the avatar URL
  await supabase.auth.updateUser({
    data: {
      avatar_url: avatarFileName,
    },
  })
  // 4. (OPTIONALLY) remove the old avatar file
  if (currentAvatarUrl) {
    const { error } = await supabase.storage.from('avatars').remove([currentAvatarUrl])
    if (error) {
      toastError({
        title: 'Error updating avatar',
        description: error.message,
      })
    }
  }
  // 5. Reset the file input
  fileInput.value.input.value = null

  toastSuccess({
    title: 'Avatar updated',
    description: 'Your avatar has been updated!',
  })
  uploading.value = false
}
</script>

<template>
  <div>
    <div class="mb-4">
      <UFormGroup label="Current avatar" class="w-full" help="This would be blank by default">
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="3xl" />
      </UFormGroup>
    </div>

    <div class="mb-4">
      <UFormGroup label="New avatar" class="w-full" name="avatar" help="After choosing an image click Save to actually upload the new avatar">
        <UInput ref="fileInput" type="file" />
      </UFormGroup>
    </div>

    <UButton type="submit" color="black" variant="solid" label="Save" :loading="uploading" :disabled="uploading" @click="saveAvatar" />
  </div>
</template>
