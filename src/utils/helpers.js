import { getTransactionTypeColor } from '../constants/categories';

export const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`;
};

export const getAmountWithSign = (transaction) => {
  const formattedAmount = formatCurrency(transaction.amount);
  
  if (transaction.type === 'payout') {
    return `- ${formattedAmount}`;
  } else if (transaction.type === 'payin') {
    return `+ ${formattedAmount}`;
  } else {
    return formattedAmount;
  }
};

export const getAmountColor = (transaction) => {
  return getTransactionTypeColor(transaction.type);
};

export const groupTransactionsByDate = (transactions) => {
  const grouped = {};
  
  transactions.forEach(transaction => {
    const dateString = new Date(transaction.date).toDateString();
    
    if (!grouped[dateString]) {
      grouped[dateString] = [];
    }
    
    grouped[dateString].push(transaction);
  });
  
  return Object.entries(grouped).map(([date, transactions]) => ({
    date,
    data: transactions,
  }));
};