import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { FAB } from 'react-native-paper';
import { useTransactions } from '../context/TransactionContext';
import Header from '../components/Header';
import TransactionCard from '../components/TransactionCard';
import EmptyState from '../components/EmptyState';
import { theme, spacing } from '../constants/theme';

const DashboardScreen = ({ navigation }) => {
  const { transactions } = useTransactions();

  const handleAddTransaction = () => {
    navigation.navigate('AddTransaction');
  };

  const handleTransactionPress = (transaction) => {
    navigation.navigate('TransactionDetail', { transactionId: transaction.id });
  };

  const renderItem = ({ item }) => (
    <TransactionCard
      transaction={item}
      onPress={() => handleTransactionPress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Dashboard" 
        navigation={navigation} 
        showBalance={true} 
      />
      
      {transactions.length === 0 ? (
        <EmptyState
          message="You don't have any transactions yet. Start by adding your first transaction."
          buttonText="Add Transaction"
          onButtonPress={handleAddTransaction}
          icon="cash-multiple"
        />
      ) : (
        <>
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.creditContainer}>
            <Text style={styles.creditText}>
              App made by: Smit Patel 1280935
            </Text>
          </View>
        </>
      )}
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddTransaction}
        color="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: spacing.m,
    paddingBottom: spacing.xxl * 2, // Extra space for FAB
  },
  fab: {
    position: 'absolute',
    margin: spacing.m,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
  creditContainer: {
    position: 'absolute',
    bottom: spacing.m,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: spacing.s,
  },
  creditText: {
    fontSize: 12,
    color: theme.colors.placeholder,
    fontStyle: 'italic',
  },
});

export default DashboardScreen;