import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTransactions } from '../context/TransactionContext';
import Header from '../components/Header';
import TransactionForm from '../components/TransactionForm';
import { theme } from '../constants/theme';

const AddTransactionScreen = ({ navigation }) => {
  const { addTransaction } = useTransactions();
  
  const handleSubmit = (transaction) => {
    addTransaction(transaction);
    navigation.navigate('Dashboard');
  };
  
  return (
    <View style={styles.container}>
      <Header 
        title="Add Transaction" 
        navigation={navigation} 
        showBackAction={true} 
      />
      
      <TransactionForm onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default AddTransactionScreen;