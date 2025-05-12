import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from 'react-native-paper';

const products = [
  {
    id: '1',
    name: 'Luxury Face Cream',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Organic Serum',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
  },
  // Add more products as needed
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
          >
            <Card.Content>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#f4511e',
  },
});
