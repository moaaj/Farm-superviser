import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        {/* Logo / Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <IconSymbol name="leaf.fill" size={80} color="#2E7D32" />
          </View>

          <Text style={styles.title}>Supervisor App</Text>

          <Text style={styles.subtitle}>
            Manage your agricultural operations with ease
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
            activeOpacity={0.8}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Need help getting started?{' '}
            </Text>
            <TouchableOpacity>
              <Text style={styles.helpLink}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  actionContainer: {
    marginTop: 40, // moved buttons upward
  },
  loginButton: {
    height: 52,
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#2E7D32',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    height: 52,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2E7D32',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signupButtonText: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: '600',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  helpText: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
  },
  helpLink: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
});
