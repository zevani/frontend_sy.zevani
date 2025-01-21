import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Ambil data buku dari database (contoh statis untuk sekarang)
    setBooks([
      { id: '1', title: 'Pendidikan Kewarganegaraan', author: 'Setiati Widihastuti', image: 'https://i.pinimg.com/736x/4d/c6/b0/4dc6b0e2cbb7e01985b0f551b41045e6.jpg' },
      { id: '2', title: 'Seni Budaya', author: 'Fajar Rahayunningsih ', image: 'https://marketplace.canva.com/EAFw8QH_LPA/1/0/1003w/canva-biru-dan-hijau-ilustrasi-sampul-buku-seni-budaya-WzuYMC2MClk.jpg' },
      { id: '3', title: 'Modul Ilmu Pengetahuan', author: 'Ketut Susilo ', image: 'https://marketplace.canva.com/EAGHQ1y1Yz0/1/0/1003w/canva-sampul-buku-modul-ajar-ilmu-pengetahuan-alam-biru-dan-hijau-ilustrasi-lucu-JWEDjOSnDQI.jpg' },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PILIHAN BUKU</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Image source={{ uri: item.image }} style={styles.bookImage} />
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <Button
              title="Pinjam Buku"
              onPress={() => navigation.navigate('Loan', { book: item })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff0f5',
    },
    title: {
      fontSize: 28,
      marginBottom: 16,
      textAlign: 'center',
      color: '#800080',
    },
    bookItem: {
      marginBottom: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      backgroundColor: '#ffe4e1',
      alignItems: 'center',  // Memusatkan konten horizontal
    },
    bookImage: {
      width: 100,
      height: 150,
      marginBottom: 8,
      borderRadius: 8,
      alignSelf: 'center', // Memusatkan gambar
    },
    bookTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    bookAuthor: {
      fontSize: 16,
      color: '#555',
    },
  });

export default DashboardScreen;
