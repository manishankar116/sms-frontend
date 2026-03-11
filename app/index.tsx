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
      const response = await fetch('http://10.0.2.2:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      const token = data?.token || data?.jwtToken || data?.accessToken;

      if (!response.ok || !token) {
        setError(data?.message || 'Login failed. Please check credentials.');
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
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue to attendance</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholder="Username"
          placeholderTextColor="#8ea6d9"
          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#8ea6d9"
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
    backgroundColor: '#0d47a1',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1565c0',
    borderRadius: 16,
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#d6e4ff',
    marginTop: 6,
    marginBottom: 18,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    color: '#12326b',
  },
  error: {
    color: '#ffd4d4',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1e88e5',
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
