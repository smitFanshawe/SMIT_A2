import React, { createContext, useState, useContext } from 'react';
import { format } from 'date-fns';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      date: new Date(2023, 10, 1),
      amount: 45.99,
      description: 'Grocery shopping',
      location: 'Walmart',
      type: 'payout',
      category: 'shopping',
      paymentMode: 'credit_card'
    },
    {
      id: '2',
      date: new Date(2023, 10, 2),
      amount: 2500.00,
      description: 'Salary deposit',
      location: 'Bank transfer',
      type: 'payin',
      category: 'salary',
      paymentMode: 'bank_transfer'
    },
    {
      id: '3',
      date: new Date(2023, 10, 3),
      amount: 15.75,
      description: 'Refund for damaged item',
      location: 'Amazon',
      type: 'payin',
      category: 'shopping',
      paymentMode: 'credit_card'
    },
  ]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    
    setTransactions([newTransaction, ...transactions]);
    return newTransaction;
  };

  const getTransaction = (id) => {
    return transactions.find(transaction => transaction.id === id);
  };

  const getFormattedDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const getTotalBalance = () => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === 'payin') {
        return total + transaction.amount;
      } else {
        return total - transaction.amount;
      }
    }, 0);
  };

  return (
    <TransactionContext.Provider
      value={ {
        transactions,
        addTransaction,
        getTransaction,
        getFormattedDate,
        getTotalBalance,
      } }
    >
      {children}
    </TransactionContext.Provider>
  );
};