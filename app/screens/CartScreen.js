import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { Card, Button, Text, IconButton } from 'react-native-paper';
import { useCart } from '../contexts/CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, clearCart, total } = useCart();

  const handleRemoveItem = useCallback((cartId, itemName) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove ${itemName} from your cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            try {
              removeFromCart(cartId);
            } catch (error) {
              Alert.alert('Error', 'Failed to remove item from cart. Please try again.');
            }
          } 
        },
      ]
    );
  }, [removeFromCart]);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      Alert.alert('Your cart is empty', 'Add some products to your cart before checking out.');
      return;
    }
    
    Alert.alert(
      'Checkout',
      `Your total is $${total.toFixed(2)}. Proceed to payment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Proceed', 
          onPress: () => {
            // In a real app, you would navigate to a payment screen
            Alert.alert(
              'Order Placed!', 
              'Thank you for your purchase!',
              [
                { 
                  text: 'OK', 
                  onPress: () => {
                    clearCart();
                    navigation.navigate('Home');
                  } 
                }
              ]
            );
          } 
        },
      ]
    );
  }, [cartItems.length, total, clearCart, navigation]);

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <IconButton 
          icon="cart-off" 
          size={64} 
          color="#ccc"
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Home')}
          style={styles.continueShoppingButton}
        >
          Continue Shopping
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.itemContainer}>
              <Image 
                source={{ uri: item.image || 'https://via.placeholder.com/100' }} 
                style={styles.itemImage}
                resizeMode="cover"
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
              <IconButton
                icon="trash-can-outline"
                size={20}
                onPress={() => handleRemoveItem(item.cartId, item.name)}
                style={styles.removeButton}
                color="#f4511e"
              />
            </View>
          </Card>
        )}
        keyExtractor={(item) => item.cartId}
        contentContainerStyle={styles.listContent}
      />
      
      <Card style={styles.summaryCard}>
        <Card.Content>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>$0.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
          
          <Button 
            mode="contained" 
            onPress={handleCheckout}
            style={styles.checkoutButton}
            labelStyle={styles.checkoutButtonText}
          >
            Proceed to Checkout
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  continueShoppingButton: {
    width: '100%',
    maxWidth: 300,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#f4511e',
    fontWeight: 'bold',
  },
  removeButton: {
    margin: 0,
  },
  summaryCard: {
    margin: 8,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f4511e',
  },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: '#f4511e',
    borderRadius: 4,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
