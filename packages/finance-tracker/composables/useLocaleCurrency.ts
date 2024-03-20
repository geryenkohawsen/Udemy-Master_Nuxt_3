// TODO: add support for other currencies

/**
 * Returns the amount in the locale currency format with locale currency symbol
 * @param amount amount to be formatted
 */
export const useLocaleCurrency = (amount: Ref<number>): string => {
  const currency = computed(() => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount.value)
  })

  return currency.value
}
