import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setIsFormValid(username.trim().length > 0 && password.length >= 6);
  }, [username, password]);

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [username, password]);

  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert(
        'Invalid Input',
        'Please enter valid username and password (minimum 6 characters)'
      );
      return;
    }

    const result = await login({
      username: username.trim(),
      password,
    });

    if (result.success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Login Failed', result.message || 'Invalid credentials');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>

          {/* Header */}
          <View style={styles.header}>

            {/* Top Row */}
            <View style={styles.headerRow}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push('/')}
              >
                <IconSymbol name="chevron.left" size={24} color="#2E7D32" />
              </TouchableOpacity>

              <Text style={styles.title}>Welcome Back</Text>

              {/* Spacer for centering */}
              <View style={styles.headerSpacer} />
            </View>

            <Text style={styles.subtitle}>Sign in to manage your tasks</Text>

            {/* Profile Icon */}
            <View style={styles.profileIconContainer}>
              <IconSymbol name="person.fill" size={48} color="#2E7D32" />
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={[
                  styles.input,
                  username.length > 0 && styles.inputFocused,
                ]}
                placeholder="Enter your username"
                placeholderTextColor={Colors.light.tabIconDefault}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  password.length > 0 && styles.inputFocused,
                ]}
                placeholder="Enter your password"
                placeholderTextColor={Colors.light.tabIconDefault}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onSubmitEditing={handleLogin}
                editable={!isLoading}
              />
            </View>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.loginButton,
                !isFormValid && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>Log In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.bottomLinks}>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <View style={styles.signupLinkContainer}>
                <Text style={styles.signupLinkText}>
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                  <Text style={styles.signupLink}> Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 24,
  },
  content: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 28,
  },

  /* Header alignment */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  /* 🔼 Subtitle moved UP */
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,        // was 6
    marginBottom: 6,
  },

  profileIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 14,
  },

  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
  },
  inputFocused: {
    borderColor: '#2E7D32',
    backgroundColor: '#FFFFFF',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
  },
  loginButton: {
    height: 52,
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomLinks: {
    marginTop: 28,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#2E7D32',
    marginBottom: 12,
  },
  signupLinkContainer: {
    flexDirection: 'row',
  },
  signupLinkText: {
    color: '#666',
  },
  signupLink: {
    color: '#2E7D32',
    fontWeight: '600',
  },
});
