import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const LoanScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { book } = route.params || {}; 

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No book selected for loan.</Text>
        <Button title="Back to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      </View>
    );
  }

  const handleLoan = () => {
    // Logika untuk meminjam buku
    console.log(`Book loaned: ${book.title}`);
    navigation.navigate('Dashboard');
  };

  const loanPeriod = 7; 
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + loanPeriod); // Set due date

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loan Book</Text>
      <Text style={styles.detail}>Title: {book.title}</Text>
      <Text style={styles.detail}>Author: {book.author}</Text>
      <Text style={styles.detail}>Loan Period: {loanPeriod} days</Text>
      <Text style={styles.detail}>Due Date: {dueDate.toLocaleDateString()}</Text>
      <Button title="Confirm Loan" onPress={handleLoan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5fffa',
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    color: '#2e8b57',
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 20,
    marginBottom: 8,
    color: '#4682b4',
  },
});

export default LoanScreen;
