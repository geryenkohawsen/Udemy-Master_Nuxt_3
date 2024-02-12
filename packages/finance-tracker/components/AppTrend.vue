<script setup lang="ts">
interface Props {
  /**
   * title of the trend card
   */
  title: string
  /**
   * current trend amount
   */
  amount: number
  /**
   * previous trend amount
   */
  lastAmount: number
  /**
   * loading flag
   */
  isLoading: boolean
}
const props = defineProps<Props>()

/**
 *current trend flag
 */
const isTrendingUp = computed(() => props.amount >= props.lastAmount)

/**
 * icon to use base on current trend
 */
const icon = computed(() => (isTrendingUp.value ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down'))

// current trend percentage
const percentageTrend = computed(() => {
  if (props.amount === 0 || props.lastAmount === 0) return '##%'

  const higher = Math.max(props.amount, props.lastAmount)
  const lower = Math.min(props.amount, props.lastAmount)
  const ratio = (higher - lower) / lower
  const roundedRatioPercentage = Math.ceil(ratio * 100)
  return roundedRatioPercentage
})
</script>

<template>
  <div>
    <div class="font-bold" :class="{ green: isTrendingUp, red: !isTrendingUp }">{{ props.title }}</div>
    <div class="mb-2 text-2xl font-extrabold text-black dark:text-white">
      <USkeleton v-if="props.isLoading" class="h-8 w-full" />
      <div v-else>{{ props.amount }}</div>
    </div>
    <div>
      <USkeleton v-if="props.isLoading" class="h-6 w-full" />
      <div v-else class="flex items-center space-x-1 text-sm">
        <UIcon :name="icon" class="h-6 w-6" :class="{ green: isTrendingUp, red: !isTrendingUp }" />
        <div class="text-gray-500 dark:text-gray-400">
          <span :class="{ green: isTrendingUp, red: !isTrendingUp }">{{ percentageTrend }}%</span> vs last period
        </div>
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
