export interface Transaction {
  id: number
  created_at: string
  amount: number
  type: 'Income' | 'Expense'
  description: string
  category: string
}
