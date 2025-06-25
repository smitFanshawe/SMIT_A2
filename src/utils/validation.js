export const validateTransaction = (transaction) => {
  const errors = {};

  if (!transaction.date) {
    errors.date = 'Date is required';
  }

  if (!transaction.amount) {
    errors.amount = 'Amount is required';
  } else if (isNaN(transaction.amount) || transaction.amount <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  if (!transaction.description) {
    errors.description = 'Description is required';
  } else if (transaction.description.length < 3) {
    errors.description = 'Description must be at least 3 characters';
  }

  if (!transaction.location) {
    errors.location = 'Location is required';
  }

  if (!transaction.type) {
    errors.type = 'Transaction type is required';
  }

  if (!transaction.category) {
    errors.category = 'Category is required';
  }

  if (!transaction.paymentMode) {
    errors.paymentMode = 'Payment mode is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSignIn = (username, password) => {
  const errors = {};

  if (!username) {
    errors.username = 'Username is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};