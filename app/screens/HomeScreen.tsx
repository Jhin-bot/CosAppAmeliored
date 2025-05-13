import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, RefreshControl } from 'react-native';
import { Card, Text, ActivityIndicator, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ProductDetails: { productId: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetails'>;

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

// Products data - in a real app, this would come from an API
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Luxury Face Cream',
    price: 49.99,
    image: 'https://via.placeholder.com/300',
    description: 'A luxurious face cream that nourishes and hydrates your skin with natural ingredients and advanced peptides for a youthful glow.',
  },
  {
    id: '2',
    name: 'Organic Serum',
    price: 39.99,
    image: 'https://via.placeholder.com/300',
    description: 'An organic serum packed with antioxidants and vitamins to rejuvenate and protect your skin.',
  },
  {
    id: '3',
    name: 'Vitamin C Brightening Toner',
    price: 29.99,
    image: 'https://via.placeholder.com/300',
    description: 'A refreshing toner that brightens and evens out skin tone with vitamin C and natural extracts.',
  },
  {
    id: '4',
    name: 'Hyaluronic Acid Moisturizer',
    price: 44.99,
    image: 'https://via.placeholder.com/300',
    description: 'Deeply hydrating moisturizer with hyaluronic acid for plump, dewy skin.',
  },
  {
    id: '5',
    name: 'Retinol Night Cream',
    price: 54.99,
    image: 'https://via.placeholder.com/300',
    description: 'Powerful retinol cream that reduces fine lines and wrinkles while you sleep.',
  },
  {
    id: '6',
    name: 'Sunscreen SPF 50+',
    price: 34.99,
    image: 'https://via.placeholder.com/300',
    description: 'Broad spectrum sunscreen that protects against UVA/UVB rays without leaving a white cast.',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Simulate loading products from an API
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(PRODUCTS);
    } catch (error) {
      console.error('Failed to load products', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadProducts();
  }, [loadProducts]);

  // Render loading indicator
  if (loading && !refreshing) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Render product item
  const renderProductItem = ({ item }: { item: Product }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
      accessibilityLabel={item.name}
      accessibilityHint={`View details for ${item.name}`}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
      <Card.Content>
        <Text 
          variant="titleMedium" 
          style={styles.title} 
          numberOfLines={1} 
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        <Text variant="bodyLarge" style={styles.price}>
          ${item.price.toFixed(2)}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge">No products available</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  listContent: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  card: {
    flex: 1,
    margin: 8,
    maxWidth: '47%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  title: {
    marginTop: 8,
    fontWeight: '600',
  },
  price: {
    color: '#f4511e',
    fontWeight: 'bold',
    marginTop: 4,
  },
});
