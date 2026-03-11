import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';

import { DataContext } from '@/hooks/DataContext';
import { getToken, saveToken } from '@/hooks/authStorage';

const API_URLS = ['http://10.0.2.2:8080', 'http://localhost:8080'];

const requestLogin = async (username: string, password: string) => {
  let lastError = null;

  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const payload = await response.json();
      return { response, payload };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};

const LoginScreen = () => {
  const [username, setUsername] = useState('teacher1');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { fetchChildOverview } = useContext(DataContext);

  React.useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        await fetchChildOverview();
        router.replace('/(tabs)/attendance');
      }
    };

    checkToken();
  }, [fetchChildOverview]);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const { response, payload } = await requestLogin(username, password);
      const token = payload?.token;

      if (!response.ok || !token) {
        setError(payload?.message || 'Login failed. Please check credentials.');
        return;
      }

      await saveToken(token);
      await fetchChildOverview();
      router.replace('/(tabs)/attendance');
    } catch {
      setError('Unable to reach server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Welcome back! Please login to continue.</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholder="Username"
          placeholderTextColor="#9aa4b2"
          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#9aa4b2"
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6fb',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#475569',
    marginTop: 6,
    marginBottom: 18,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    color: '#0f172a',
  },
  error: {
    color: '#b91c1c',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default LoginScreen;
