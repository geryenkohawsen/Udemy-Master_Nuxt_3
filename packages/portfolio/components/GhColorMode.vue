<script setup lang="ts">
const colorMode = useColorMode()
const showNextModeLabel = ref(false)

const modes = ['system', 'light', 'dark']

const nextModeIcons: { [index: string]: string } = {
  system: '🌓',
  light: '🌕',
  dark: '🌑',
}

const nextMode = computed(() => {
  const currentModeIndex = modes.indexOf(colorMode.preference)

  let nextModeIndex = null
  if (currentModeIndex + 1 === modes.length) {
    nextModeIndex = 0
  } else {
    nextModeIndex = currentModeIndex + 1
  }

  return modes[nextModeIndex]
})

const nextModeIcon = computed(() => nextModeIcons[nextMode.value])

function toggleMode(): void {
  colorMode.preference = nextMode.value
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <div v-if="showNextModeLabel" class="text-xs text-gray-500">Change to {{ nextMode }}</div>
    <button
      class="px-2 py-1 text-4xl text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 md:text-base"
      @click="toggleMode"
      @mouseenter="showNextModeLabel = true"
      @mouseleave="showNextModeLabel = false"
    >
      {{ nextModeIcon }}
    </button>
  </div>
</template>
