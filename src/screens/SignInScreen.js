import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { validateSignIn } from '../utils/validation';
import { theme, spacing } from '../constants/theme';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  
  const { signIn, loading, error: authError } = useAuth();
  
  const handleSignIn = async () => {
    const validation = validateSignIn(username, password);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    const success = await signIn(username, password);
    if (!success) {
      // Error is handled by the AuthContext
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>Expense Tracker</Text>
          <Text style={styles.tagline}>Manage your finances with ease</Text>
        </View>
        
        <View style={styles.formContainer}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
            error={!!errors.username}
            disabled={loading}
            left={<TextInput.Icon icon="account" />}
          />
          {errors.username && <HelperText type="error">{errors.username}</HelperText>}
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            mode="outlined"
            style={styles.input}
            error={!!errors.password}
            disabled={loading}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? "eye" : "eye-off"}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
          />
          {errors.password && <HelperText type="error">{errors.password}</HelperText>}
          
          {authError && (
            <HelperText type="error" style={styles.errorText}>
              {authError}
            </HelperText>
          )}
          
          <Button
            mode="contained"
            onPress={handleSignIn}
            style={styles.button}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator animating={true} color="#fff" size={20} />
            ) : (
              "Sign In"
            )}
          </Button>
          
          <Text style={styles.hint}>
            Use username: "admin" and password: "admin" to sign in
          </Text>
          
          <Text style={styles.credit}>
            App made by: Smit Patel 1280935
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginBottom: spacing.s,
  },
  button: {
    marginTop: spacing.m,
    paddingVertical: spacing.xs,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: spacing.m,
  },
  hint: {
    marginTop: spacing.l,
    textAlign: 'center',
    color: theme.colors.placeholder,
    fontSize: 14,
  },
  credit: {
    marginTop: spacing.xl,
    textAlign: 'center',
    color: theme.colors.placeholder,
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default SignInScreen;