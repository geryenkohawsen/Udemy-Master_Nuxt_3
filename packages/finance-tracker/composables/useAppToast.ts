interface ToastProps {
  title: string
  description?: string
}

/**
 * Returns the amount in the locale currency format with locale currency symbol
 * @param amount amount to be formatted
 */
export const useAppToast = () => {
  const toast = useToast()

  return {
    toastSuccess: ({ title, description }: ToastProps): void => {
      toast.add({
        title,
        description,
        icon: 'i-heroicons-check-circle',
        color: 'green',
      })
    },
    toastError: ({ title, description }: ToastProps): void => {
      toast.add({
        title,
        description,
        icon: 'i-heroicons-exclamation-circle',
        color: 'red',
      })
    },
  }
}
