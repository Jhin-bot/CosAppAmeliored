import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useCart } from '../contexts/CartContext';

// Mock product data - in a real app, this would come from an API
const PRODUCTS = [
  {
    id: '1',
    name: 'Luxury Face Cream',
    price: 49.99,
    description: 'A luxurious face cream that nourishes and hydrates your skin with natural ingredients and advanced peptides for a youthful glow.',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: '2',
    name: 'Organic Serum',
    price: 39.99,
    description: 'An organic serum packed with antioxidants and vitamins to rejuvenate and protect your skin.',
    image: 'https://via.placeholder.com/300',
  },
];

export default function ProductDetailsScreen({ route, navigation }) {
  const { productId } = route.params;
  const { addToCart } = useCart();
  
  // Find the product by ID
  const product = PRODUCTS.find(p => p.id === productId);
  
  const handleAddToCart = useCallback(() => {
    try {
      addToCart(product);
      Alert.alert('Success', `${product.name} added to cart!`);
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart. Please try again.');
    }
  }, [addToCart, product]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleAddToCart}
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
