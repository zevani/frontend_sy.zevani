import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const API_URL = 'http://192.168.1.64:3000';  // Make sure it's the correct API URL

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true); // Start loading when request is made
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
        // If login is successful, navigate to Dashboard
        navigation.navigate('Dashboard');
      } else {
        // Handle server errors or invalid credentials
        alert(data.message || 'Invalid email or password');
      }
    } catch (error) {
      alert('Error connecting to server');
    } finally {
      setLoading(false); // Stop loading after request finishes
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
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Register</Text>
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: '#fff',
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
});

export default LoginScreen;
