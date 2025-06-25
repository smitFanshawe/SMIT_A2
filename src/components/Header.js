import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { useTransactions } from '../context/TransactionContext';
import { formatCurrency } from '../utils/helpers';
import { theme, spacing } from '../constants/theme';

const Header = ({ title, navigation, showBalance = false, showBackAction = false }) => {
  const { signOut } = useAuth();
  const { getTotalBalance } = useTransactions();
  
  const handleSignOut = () => {
    signOut();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        {showBackAction && (
          <Appbar.BackAction onPress={handleBack} color="#fff" />
        )}
        <Appbar.Content title={title} color="#fff" />
        {!showBackAction && (
          <Appbar.Action icon="logout" onPress={handleSignOut} color="#fff" />
        )}
      </Appbar.Header>
      
      {showBalance && (
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={[
            styles.balanceAmount, 
            { color: getTotalBalance() >= 0 ? theme.colors.success : theme.colors.error }
          ]}>
            {formatCurrency(getTotalBalance())}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  header: {
    backgroundColor: theme.colors.primary,
    elevation: 0,
  },
  balanceContainer: {
    backgroundColor: '#fff',
    padding: spacing.m,
    alignItems: 'center',
    borderBottomLeftRadius: theme.roundness,
    borderBottomRightRadius: theme.roundness,
  },
  balanceLabel: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Header;