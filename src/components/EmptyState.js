import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Avatar } from 'react-native-paper';
import { theme, spacing } from '../constants/theme';

const EmptyState = ({ message, buttonText, onButtonPress, icon = 'cash-multiple' }) => {
  return (
    <View style={styles.container}>
      <Avatar.Icon 
        size={80} 
        icon={icon} 
        style={styles.icon} 
        color={theme.colors.primary}
      />
      <Text style={styles.message}>{message}</Text>
      {buttonText && onButtonPress && (
        <Button 
          mode="contained" 
          onPress={onButtonPress}
          style={styles.button}
        >
          {buttonText}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  icon: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    marginBottom: spacing.l,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.l,
    color: theme.colors.text,
  },
  button: {
    paddingHorizontal: spacing.m,
  },
});

export default EmptyState;