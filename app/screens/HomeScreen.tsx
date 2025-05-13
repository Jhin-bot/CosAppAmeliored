import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Card, Text, ActivityIndicator } from 'react-native-paper';
import { useTheme as usePaperTheme } from 'react-native-paper';
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

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard = React.memo(({ product, onPress }: ProductCardProps) => {
  const theme = usePaperTheme();
  const colors = theme.colors;

  return (
    <Card
      style={[styles.card, { backgroundColor: colors.surface }]}
      onPress={onPress}
      mode="elevated"
    >
      <Card.Cover
        source={{ uri: product.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleMedium" style={[styles.productName, { color: colors.onSurface }]}>
          {product.name}
        </Text>
        <Text
          variant="bodyMedium"
          style={[styles.productDescription, { color: colors.onSurfaceVariant }]}
          numberOfLines={2}
        >
          {product.description}
        </Text>
        <Text variant="titleSmall" style={[styles.productPrice, { color: colors.primary }]}>
          ${product.price.toFixed(2)}
        </Text>
      </Card.Content>
    </Card>
  );
});

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const paperTheme = usePaperTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();

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

  // Render product item
  const renderProductItem = useCallback(({ item }: { item: Product }) => (
    <View style={styles.productItemContainer}>
      <ProductCard 
        product={item}
        onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
      />
    </View>
  ), [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: paperTheme.colors.background }]}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[paperTheme.colors.primary]}
            tintColor={paperTheme.colors.primary}
          />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={{ color: paperTheme.colors.onSurface }}>No products available</Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <Text style={[styles.sectionTitle, { color: paperTheme.colors.onBackground, marginBottom: 16 }]}>
            Featured Products
          </Text>
        }
      />
      {loading && (
        <View style={[styles.loadingContainer, { backgroundColor: paperTheme.colors.background + 'E6' }]}>
          <ActivityIndicator animating={true} size="large" color={paperTheme.colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    height: 200,
  },
  cardContent: {
    padding: 12,
  },
  productName: {
    marginTop: 4,
    fontWeight: '600',
  },
  productDescription: {
    marginTop: 6,
    opacity: 0.8,
    lineHeight: 20,
  },
  productPrice: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  productItemContainer: {
    flex: 1,
  },
});
