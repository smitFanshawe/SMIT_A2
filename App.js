import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { TransactionProvider } from './src/context/TransactionContext';
import { theme } from './src/constants/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <TransactionProvider>
            <NavigationContainer>
              <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
              <AppNavigator />
            </NavigationContainer>
          </TransactionProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}