<script setup lang="ts">
interface Props {
  title: string
  amount: number
  lastAmount: number
  color: 'green' | 'red'
  isLoading: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <div class="font-bold" :class="[props.color]">{{ props.title }}</div>
    <div class="mb-2 text-2xl font-extrabold text-black dark:text-white">
      <USkeleton v-if="props.isLoading" class="h-8 w-full" />
      <div v-else>{{ props.amount }}</div>
    </div>
    <div>
      <USkeleton v-if="props.isLoading" class="h-6 w-full" />
      <div v-else class="flex items-center space-x-1 text-sm">
        <UIcon name="i-heroicons-arrow-trending-up" class="h-6 w-6" :class="[props.color]" />
        <div class="text-gray-500 dark:text-gray-400">30% vs last period</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.green {
  @apply text-green-600 dark:text-green-400;
}
.red {
  @apply text-red-600 dark:text-red-400;
}
</style>
