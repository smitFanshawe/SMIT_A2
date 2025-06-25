import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Divider, Avatar } from 'react-native-paper';
import { useTransactions } from '../context/TransactionContext';
import Header from '../components/Header';
import { formatCurrency } from '../utils/helpers';
import { 
  getCategoryIcon, 
  getCategoryLabel, 
  getTransactionTypeColor, 
  getTransactionTypeLabel,
  getPaymentModeIcon,
  getPaymentModeLabel
} from '../constants/categories';
import { theme, spacing } from '../constants/theme';

const TransactionDetailScreen = ({ route, navigation }) => {
  const { transactionId } = route.params;
  const { getTransaction, getFormattedDate } = useTransactions();
  
  const transaction = getTransaction(transactionId);
  
  if (!transaction) {
    return (
      <View style={styles.container}>
        <Header 
          title="Transaction Details" 
          navigation={navigation} 
          showBackAction={true} 
        />
        <View style={styles.errorContainer}>
          <Text>Transaction not found</Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Header 
        title="Transaction Details" 
        navigation={navigation} 
        showBackAction={true} 
      />
      
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <View style={styles.headerContainer}>
            <Avatar.Icon 
              size={60} 
              icon={getCategoryIcon(transaction.category)} 
              style={[styles.categoryIcon, { backgroundColor: getTransactionTypeColor(transaction.type) }]} 
            />
            <View style={styles.headerContent}>
              <Text style={styles.description}>
                {transaction.description}
              </Text>
              <Text style={styles.date}>
                {getFormattedDate(transaction.date)}
              </Text>
            </View>
          </View>
          
          <Divider style={styles.divider} />
          
          <Card.Content>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text 
                style={[styles.detailValue, { color: getTransactionTypeColor(transaction.type) }]}
              >
                {formatCurrency(transaction.amount)}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction Type</Text>
              <View style={styles.typeContainer}>
                <Text 
                  style={[styles.typeLabel, { backgroundColor: getTransactionTypeColor(transaction.type) }]}
                >
                  {getTransactionTypeLabel(transaction.type)}
                </Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Mode</Text>
              <View style={styles.paymentModeContainer}>
                <Avatar.Icon 
                  size={20} 
                  icon={getPaymentModeIcon(transaction.paymentMode)} 
                  style={styles.paymentModeIcon} 
                />
                <Text style={styles.paymentModeLabel}>
                  {getPaymentModeLabel(transaction.paymentMode)}
                </Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>
                {getCategoryLabel(transaction.category)}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>
                {transaction.location}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>
                {getFormattedDate(transaction.date)}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: spacing.m,
  },
  card: {
    marginBottom: spacing.m,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.m,
  },
  categoryIcon: {
    marginRight: spacing.m,
  },
  headerContent: {
    flex: 1,
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  date: {
    color: theme.colors.placeholder,
  },
  divider: {
    marginVertical: spacing.s,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.disabled,
  },
  detailLabel: {
    fontSize: 16,
    color: theme.colors.text,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  typeContainer: {
    flexDirection: 'row',
  },
  typeLabel: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    color: '#fff',
    fontWeight: '500',
  },
  paymentModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentModeIcon: {
    backgroundColor: theme.colors.primary,
    marginRight: spacing.xs,
  },
  paymentModeLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionDetailScreen;