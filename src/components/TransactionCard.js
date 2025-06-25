import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';
import { useTransactions } from '../context/TransactionContext';
import { getAmountWithSign, getAmountColor } from '../utils/helpers';
import { getCategoryIcon, getCategoryLabel, getPaymentModeIcon } from '../constants/categories';
import { spacing } from '../constants/theme';

const TransactionCard = ({ transaction, onPress }) => {
  const { getFormattedDate } = useTransactions();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Avatar.Icon 
            size={48} 
            icon={getCategoryIcon(transaction.category)} 
            style={[styles.avatar, { backgroundColor: getAmountColor(transaction) }]} 
          />
          <View style={styles.details}>
            <Text style={styles.description} numberOfLines={1}>
              {transaction.description}
            </Text>
            <Text style={styles.location} numberOfLines={1}>
              {transaction.location}
            </Text>
            <View style={styles.metaContainer}>
              <Text style={styles.category}>
                {getCategoryLabel(transaction.category)}
              </Text>
              <Avatar.Icon 
                size={16} 
                icon={getPaymentModeIcon(transaction.paymentMode)} 
                style={styles.paymentIcon} 
              />
            </View>
          </View>
          <View style={styles.rightContent}>
            <Text style={[styles.amount, { color: getAmountColor(transaction) }]}>
              {getAmountWithSign(transaction)}
            </Text>
            <Text style={styles.date}>
              {getFormattedDate(transaction.date)}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.s,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.s,
  },
  avatar: {
    marginRight: spacing.m,
  },
  details: {
    flex: 1,
    marginRight: spacing.s,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  category: {
    fontSize: 12,
    color: '#888',
    marginRight: spacing.s,
  },
  paymentIcon: {
    backgroundColor: 'transparent',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default TransactionCard;