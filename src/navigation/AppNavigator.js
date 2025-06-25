import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import SignInScreen from '../screens/SignInScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import { theme } from '../constants/theme';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the default navigation header
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen} 
        />
      ) : (
        <>
          <Stack.Screen 
            name="Dashboard" 
            component={DashboardScreen} 
          />
          <Stack.Screen 
            name="TransactionDetail" 
            component={TransactionDetailScreen} 
          />
          <Stack.Screen 
            name="AddTransaction" 
            component={AddTransactionScreen} 
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;