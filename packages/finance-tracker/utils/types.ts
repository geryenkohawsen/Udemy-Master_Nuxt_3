export interface Transaction {
  id: number
  created_at: string
  amount: number
  type: 'income' | 'expense'
  description: string
  category: string
}
