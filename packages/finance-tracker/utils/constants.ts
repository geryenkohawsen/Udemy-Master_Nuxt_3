export enum TransactionViewOptions {
  Yearly = 'Yearly',
  Monthly = 'Monthly',
  Daily = 'Daily',
}

export enum ExpenseCategories {
  Food = 'Food',
  Housing = 'Housing',
  Car = 'Car',
  Entertainment = 'Entertainment',
  Transport = 'Transport',
}

export enum TransactionTypes {
  Income = 'Income',
  Expense = 'Expense',
  Saving = 'Saving',
  Investment = 'Investment',
}

// Convert enum values to arrays and assign to the CONST object
export const CONST = {
  EXPENSE_CATEGORIES: Object.values(ExpenseCategories),
  TRANSACTION_VIEW_OPTIONS: Object.values(TransactionViewOptions),
  TRANSACTION_TYPES: Object.values(TransactionTypes),
}

// Usage example
// console.log(CONST.TRANSACTION_VIEW_OPTIONS) // ["Yearly", "Monthly", "Daily"]
