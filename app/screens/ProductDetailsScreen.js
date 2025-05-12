import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

export default function ProductDetailsScreen({ route, navigation }) {
  const { productId } = route.params;
  
  // In a real app, you would fetch this data from an API
  const product = {
    id: productId,
    name: 'Luxury Face Cream',
    price: 49.99,
    description: 'A luxurious face cream that nourishes and hydrates your skin.',
    image: 'https://via.placeholder.com/300',
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          // Add to cart logic here
        }}
      >
        Add to Cart
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#f4511e',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    marginTop: 'auto',
  },
});
