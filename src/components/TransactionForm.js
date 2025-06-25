import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, HelperText, RadioButton, Text, Menu, Divider, TouchableRipple, Avatar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CATEGORIES, TRANSACTION_TYPES, PAYMENT_MODES } from '../constants/categories';
import { validateTransaction } from '../utils/validation';
import { theme, spacing } from '../constants/theme';

const TransactionForm = ({ onSubmit, initialValues = {} }) => {
  const [transaction, setTransaction] = useState({
    date: new Date(),
    amount: '',
    description: '',
    location: '',
    type: 'payout',
    category: '',
    paymentMode: '',
    ...initialValues,
  });
  
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  
  const handleChange = (name, value) => {
    setTransaction({
      ...transaction,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };
  
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('date', selectedDate);
    }
  };
  
  const handleSubmit = () => {
    const validation = validateTransaction(transaction);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    // Convert amount to number
    const formattedTransaction = {
      ...transaction,
      amount: parseFloat(transaction.amount),
    };
    
    onSubmit(formattedTransaction);
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Date</Text>
        <Button 
          mode="outlined" 
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          {transaction.date.toLocaleDateString()}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={transaction.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {errors.date && <HelperText type="error">{errors.date}</HelperText>}
      </View>
      
      <View style={styles.formGroup}>
        <TextInput
          label="Amount"
          value={transaction.amount.toString()}
          onChangeText={(value) => handleChange('amount', value)}
          keyboardType="numeric"
          mode="outlined"
          error={!!errors.amount}
          left={<TextInput.Affix text="$" />}
        />
        {errors.amount && <HelperText type="error">{errors.amount}</HelperText>}
      </View>
      
      <View style={styles.formGroup}>
        <TextInput
          label="Description"
          value={transaction.description}
          onChangeText={(value) => handleChange('description', value)}
          mode="outlined"
          error={!!errors.description}
        />
        {errors.description && <HelperText type="error">{errors.description}</HelperText>}
      </View>
      
      <View style={styles.formGroup}>
        <TextInput
          label="Location"
          value={transaction.location}
          onChangeText={(value) => handleChange('location', value)}
          mode="outlined"
          error={!!errors.location}
        />
        {errors.location && <HelperText type="error">{errors.location}</HelperText>}
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Transaction Type</Text>
        <View style={styles.transactionTypeContainer}>
          {TRANSACTION_TYPES.map((type) => (
            <TouchableRipple
              key={type.id}
              onPress={() => handleChange('type', type.id)}
              style={[
                styles.typeOption,
                transaction.type === type.id && { 
                  backgroundColor: `${type.color}20`, 
                  borderColor: type.color 
                }
              ]}
            >
              <View style={styles.typeContent}>
                <RadioButton
                  value={type.id}
                  status={transaction.type === type.id ? 'checked' : 'unchecked'}
                  onPress={() => handleChange('type', type.id)}
                  color={type.color}
                />
                <Text style={[
                  styles.typeLabel,
                  transaction.type === type.id && { color: type.color, fontWeight: '500' }
                ]}>
                  {type.label}
                </Text>
              </View>
            </TouchableRipple>
          ))}
        </View>
        {errors.type && <HelperText type="error">{errors.type}</HelperText>}
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Payment Mode</Text>
        <View style={styles.paymentModeContainer}>
          {PAYMENT_MODES.map((mode) => (
            <TouchableRipple
              key={mode.id}
              onPress={() => handleChange('paymentMode', mode.id)}
              style={[
                styles.paymentOption,
                transaction.paymentMode === mode.id && { 
                  backgroundColor: `${theme.colors.primary}20`, 
                  borderColor: theme.colors.primary 
                }
              ]}
            >
              <View style={styles.paymentContent}>
                <Avatar.Icon 
                  size={24} 
                  icon={mode.icon} 
                  style={[
                    styles.paymentIcon,
                    transaction.paymentMode === mode.id && { 
                      backgroundColor: theme.colors.primary 
                    }
                  ]} 
                  color="#fff"
                />
                <Text style={[
                  styles.paymentLabel,
                  transaction.paymentMode === mode.id && { 
                    color: theme.colors.primary, 
                    fontWeight: '500' 
                  }
                ]}>
                  {mode.label}
                </Text>
              </View>
            </TouchableRipple>
          ))}
        </View>
        {errors.paymentMode && <HelperText type="error">{errors.paymentMode}</HelperText>}
      </View>
      
      <View style={styles.formGroup}>
        <Menu
          visible={categoryMenuVisible}
          onDismiss={() => setCategoryMenuVisible(false)}
          anchor={
            <Button 
              mode="outlined" 
              onPress={() => setCategoryMenuVisible(true)}
              style={styles.categoryButton}
              contentStyle={styles.categoryButtonContent}
              icon={transaction.category ? getCategoryIcon(transaction.category) : 'tag'}
            >
              {transaction.category ? 
                getCategoryLabel(transaction.category) : 
                'Select Category'}
            </Button>
          }
        >
          {CATEGORIES.map((category) => (
            <Menu.Item
              key={category.id}
              onPress={() => {
                handleChange('category', category.id);
                setCategoryMenuVisible(false);
              }}
              title={category.label}
              leadingIcon={category.icon}
            />
          ))}
        </Menu>
        {errors.category && <HelperText type="error">{errors.category}</HelperText>}
      </View>
      
      <Button 
        mode="contained" 
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        Add Transaction
      </Button>
    </ScrollView>
  );
};

const getCategoryIcon = (categoryId) => {
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.icon : 'tag';
};

const getCategoryLabel = (categoryId) => {
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.label : 'Select Category';
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.m,
  },
  formGroup: {
    marginBottom: spacing.m,
  },
  label: {
    fontSize: 16,
    marginBottom: spacing.xs,
    color: theme.colors.text,
  },
  dateButton: {
    marginTop: spacing.xs,
  },
  transactionTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  typeOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: theme.roundness,
    marginHorizontal: spacing.xs,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.xs,
  },
  typeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeLabel: {
    marginLeft: 4,
  },
  paymentModeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  paymentOption: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: theme.roundness,
    margin: '1.5%',
    paddingVertical: spacing.s,
  },
  paymentContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentIcon: {
    backgroundColor: '#bdc3c7',
    marginBottom: spacing.xs,
  },
  paymentLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  categoryButton: {
    marginTop: spacing.xs,
  },
  categoryButtonContent: {
    justifyContent: 'flex-start',
  },
  submitButton: {
    marginTop: spacing.m,
    marginBottom: spacing.xl,
    paddingVertical: spacing.xs,
  },
});

export default TransactionForm;