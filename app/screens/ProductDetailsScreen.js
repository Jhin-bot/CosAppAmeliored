import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
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

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const { addToCart } = useCart();
  const theme = useTheme();
  
  // Find the product by ID
  const product = useMemo(() => PRODUCTS.find(p => p.id === productId), [productId]);
  
  const handleAddToCart = useCallback(() => {
    try {
      addToCart(product);
      Alert.alert('Success', `${product.name} added to cart!`);
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart. Please try again.');
    }
  }, [addToCart, product]);

  const dynamicStyles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    scrollContent: {
      flexGrow: 1,
    },
    image: {
      width: '100%',
      height: 300,
      borderRadius: 12,
      marginBottom: 24,
      backgroundColor: theme.colors.surfaceVariant,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.colors.onBackground,
    },
    price: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.colors.primary,
      marginBottom: 24,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 32,
    },
    button: {
      marginTop: 'auto',
      paddingVertical: 8,
      borderRadius: 8,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.onBackground,
      marginBottom: 12,
    },
    sectionContent: {
      color: theme.colors.onSurfaceVariant,
      lineHeight: 22,
    },
  }), [theme]);

  if (!product) {
    return (
      <View style={dynamicStyles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={dynamicStyles.scrollContent}
      >
        <Image 
          source={{ uri: product.image }} 
          style={dynamicStyles.image} 
          resizeMode="contain" 
        />
        
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.title}>{product.name}</Text>
          <Text style={dynamicStyles.price}>${product.price.toFixed(2)}</Text>
          <Text style={dynamicStyles.description}>{product.description}</Text>
        </View>
        
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Product Details</Text>
          <Text style={dynamicStyles.sectionContent}>
            Our {product.name} is formulated with premium ingredients to provide exceptional care for your skin. 
            Suitable for all skin types, this product is dermatologically tested and cruelty-free.
          </Text>
        </View>
        
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>How to Use</Text>
          <Text style={dynamicStyles.sectionContent}>
            • Apply a small amount to clean, dry skin
            {'\n'}• Gently massage in an upward motion
            {'\n'}• Use daily for best results
          </Text>
        </View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[dynamicStyles.button, { backgroundColor: theme.colors.primary }]}
          labelStyle={{ color: theme.colors.onPrimary }}
          onPress={handleAddToCart}
          icon="cart-plus"
          contentStyle={styles.buttonContent}
        >
          Add to Cart (${product.price.toFixed(2)})
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  buttonContainer: {
    padding: 16,
  },
  buttonContent: {
    height: 48,
  },
});

export default React.memo(ProductDetailsScreen);
