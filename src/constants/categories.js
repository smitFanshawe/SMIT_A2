export const CATEGORIES = [
  { id: 'shopping', label: 'Shopping', icon: 'cart' },
  { id: 'food', label: 'Food & Dining', icon: 'food' },
  { id: 'transportation', label: 'Transportation', icon: 'car' },
  { id: 'entertainment', label: 'Entertainment', icon: 'movie' },
  { id: 'utilities', label: 'Utilities', icon: 'lightbulb' },
  { id: 'health', label: 'Health', icon: 'medical-bag' },
  { id: 'travel', label: 'Travel', icon: 'airplane' },
  { id: 'education', label: 'Education', icon: 'school' },
  { id: 'personal', label: 'Personal', icon: 'account' },
  { id: 'salary', label: 'Salary', icon: 'cash-plus' },
  { id: 'investment', label: 'Investment', icon: 'chart-line' },
  { id: 'other', label: 'Other', icon: 'dots-horizontal' },
];

export const TRANSACTION_TYPES = [
  { id: 'payout', label: 'Payout', color: '#e74c3c', icon: 'arrow-up' },
  { id: 'payin', label: 'Pay-in', color: '#2ecc71', icon: 'arrow-down' },
];

export const PAYMENT_MODES = [
  { id: 'cash', label: 'Cash', icon: 'cash' },
  { id: 'credit_card', label: 'Credit Card', icon: 'credit-card' },
  { id: 'debit_card', label: 'Debit Card', icon: 'credit-card-outline' },
  { id: 'paypal', label: 'PAYPAL', icon: 'cellphone' },
  { id: 'bank_transfer', label: 'Bank Transfer', icon: 'bank' },
];

export const getCategoryIcon = (categoryId) => {
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.icon : 'help-circle';
};

export const getCategoryLabel = (categoryId) => {
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.label : 'Unknown';
};

export const getTransactionTypeColor = (type) => {
  const transactionType = TRANSACTION_TYPES.find(t => t.id === type);
  return transactionType ? transactionType.color : '#bdc3c7';
};

export const getTransactionTypeLabel = (typeId) => {
  const type = TRANSACTION_TYPES.find(t => t.id === typeId);
  return type ? type.label : 'Unknown';
};

export const getPaymentModeIcon = (modeId) => {
  const mode = PAYMENT_MODES.find(m => m.id === modeId);
  return mode ? mode.icon : 'help-circle';
};

export const getPaymentModeLabel = (modeId) => {
  const mode = PAYMENT_MODES.find(m => m.id === modeId);
  return mode ? mode.label : 'Unknown';
};