export interface Transaction {
  id: number
  created_at: string
  amount: number
  type: 'Income' | 'Expense' | 'Saving' | 'Investment'
  description?: string
  category?: string
}

export interface NewTransaction {
  created_at: string
  amount: number
  type: 'Income' | 'Expense' | 'Saving' | 'Investment'
  description?: string
  category?: string
}
