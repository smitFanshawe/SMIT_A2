import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    background: '#f9f9f9',
    surface: '#ffffff',
    text: '#2c3e50',
    error: '#e74c3c',
    success: '#2ecc71',
    payout: '#e74c3c',
    payin: '#2ecc71',
    placeholder: '#bdc3c7',
    disabled: '#ecf0f1',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  roundness: 10,
  fonts: {
    ...DefaultTheme.fonts,
  },
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
  },
  small: {
    fontSize: 12,
  },
};