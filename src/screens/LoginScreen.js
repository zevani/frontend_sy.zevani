import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const API_URL = 'http://192.168.1.64:3000'; // Pastikan ini adalah URL API yang benar

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState(''); // State untuk menampilkan error
  const navigation = useNavigation();

  const handleLogin = async () => {
    setError(''); // Reset pesan error setiap kali login dicoba
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    setLoading(true); // Start loading ketika request dilakukan
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data); // Debugging log
        navigation.navigate('Dashboard'); // Navigasi ke Dashboard jika login berhasil
      } else {
        console.log('Login failed:', data); // Debugging log
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error); // Debugging log
      setError('Error connecting to server');
    } finally {
      setLoading(false); // Stop loading setelah request selesai
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://png.pngtree.com/png-clipart/20230916/original/pngtree-international-literacy-day-illustration-people-are-reading-books-to-celebrate-on-png-image_12240071.png',
        }}
        style={styles.illustration}
      />
      <Text style={styles.title}>Login</Text>

      {/* Input Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Input Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Pesan Error */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Register Button */}
      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonTextSecondary}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  illustration: {
    width: 300,
    height: 300,
    marginBottom: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  button: {
    width: '80%',
    padding: 12,
    marginBottom: 16,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    width: '80%',
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#4CAF50',
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
